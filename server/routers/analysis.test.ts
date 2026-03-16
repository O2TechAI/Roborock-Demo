import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "../routers";
import type { TrpcContext } from "../_core/context";

// Mock the LLM module
vi.mock("../_core/llm", () => ({
  invokeLLM: vi.fn(),
}));

import { invokeLLM } from "../_core/llm";

const mockInvokeLLM = vi.mocked(invokeLLM);

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

const MOCK_ANALYSIS_RESULT = {
  product: "iPhone 15 Pro",
  units: 1000,
  weightPerUnit: "187 g",
  totalWeight: "187 kg",
  assemblyCount: 6,
  componentCount: 32,
  recoveryRate: "91.5%",
  teardownTree: {
    id: "root",
    label: "iPhone 15 Pro",
    labelCn: "iPhone 15 Pro",
    category: "root",
    weight: "187 g",
    status: "raw-material",
    children: [
      {
        id: "display-assembly",
        label: "Display Assembly",
        labelCn: "显示组件",
        category: "assembly",
        weight: "42 g",
        status: "third-party",
        sellableValue: 45.0,
        children: [
          {
            id: "oled-panel",
            label: "OLED Panel",
            labelCn: "OLED面板",
            category: "component",
            material: "Glass, OLED",
            weight: "28 g",
            status: "third-party",
            sellableValue: 35.0,
          },
        ],
      },
    ],
  },
  tradingSellableParts: [
    {
      component: "OLED Panel",
      qty: 1000,
      unitValue: 35.0,
      subtotal: 35000,
      notes: "Tested working",
      assembly: "Display",
    },
  ],
  tradingSellablePartsTotal: 35.0,
  tradingSellablePartsBatch: 35000,
  rawMaterialRecovery: [
    {
      category: "Metals",
      material: "Aluminum (6000 series)",
      weightKg: 0.045,
      unitPrice: "$2.50/kg",
      revenue: 0.11,
    },
  ],
  rawMaterialTotal: 0.11,
  rawMaterialBatch: 110,
  costBreakdown: [
    {
      category: "Disassembly Labor",
      assumption: "15 min/unit @ $25/hr",
      totalCost: 6250,
      perUnit: 6.25,
    },
  ],
  totalCostPerUnit: 6.25,
  totalCostBatch: 6250,
  serviceFeeDealSummary: [
    { item: "Service Fee Revenue", total: 10000 },
    { item: "Total Profit", total: 3860 },
  ],
  tradingDealSummary: [
    { item: "Sellable Parts Revenue", total: 35000 },
    { item: "Net Position", total: 28640 },
  ],
  summary:
    "Analysis of 1,000 iPhone 15 Pro units. Estimated recovery rate: 91.5%. Total recoverable value per unit: $35.11.",
};

describe("analysis.analyze", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls LLM and returns structured analysis result", async () => {
    mockInvokeLLM.mockResolvedValueOnce({
      id: "test-id",
      created: Date.now(),
      model: "gemini-2.5-flash",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: JSON.stringify(MOCK_ANALYSIS_RESULT),
          },
          finish_reason: "stop",
        },
      ],
    });

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.analysis.analyze({
      product: "iPhone 15 Pro",
      units: 1000,
    });

    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data.product).toBe("iPhone 15 Pro");
    expect(result.data.units).toBe(1000);
    expect(result.data.teardownTree).toBeDefined();
    expect(result.data.teardownTree.children).toHaveLength(1);
    expect(result.data.tradingSellableParts).toHaveLength(1);
    expect(result.data.rawMaterialRecovery).toHaveLength(1);
    expect(result.data.costBreakdown).toHaveLength(1);

    // Verify LLM was called with correct parameters
    expect(mockInvokeLLM).toHaveBeenCalledOnce();
    const llmCall = mockInvokeLLM.mock.calls[0][0];
    expect(llmCall.messages).toHaveLength(2);
    expect(llmCall.messages[0].role).toBe("system");
    expect(llmCall.messages[1].role).toBe("user");
    expect(llmCall.messages[1].content).toContain("iPhone 15 Pro");
    expect(llmCall.messages[1].content).toContain("1000");
    expect(llmCall.response_format).toBeDefined();
  });

  it("throws error when LLM returns empty response", async () => {
    mockInvokeLLM.mockResolvedValueOnce({
      id: "test-id",
      created: Date.now(),
      model: "gemini-2.5-flash",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: "",
          },
          finish_reason: "stop",
        },
      ],
    });

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.analysis.analyze({ product: "Test Product", units: 100 })
    ).rejects.toThrow();
  });

  it("throws error when LLM call fails", async () => {
    mockInvokeLLM.mockRejectedValueOnce(new Error("API rate limit exceeded"));

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.analysis.analyze({ product: "Test Product", units: 100 })
    ).rejects.toThrow("Analysis failed");
  });

  it("validates input - rejects empty product name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.analysis.analyze({ product: "", units: 100 })
    ).rejects.toThrow();
  });

  it("validates input - rejects zero units", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.analysis.analyze({ product: "iPhone", units: 0 })
    ).rejects.toThrow();
  });

  it("validates input - rejects units exceeding max", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.analysis.analyze({ product: "iPhone", units: 200000 })
    ).rejects.toThrow();
  });
});

/**
 * Analysis Router — AI-powered e-waste product teardown analysis
 * 
 * Uses the built-in LLM to analyze any electronic product and generate:
 * - Teardown tree hierarchy
 * - Sellable parts revenue (Trading mode)
 * - Raw material recovery values
 * - Cost breakdown
 * - Deal summaries for both Service Fee and Trading modes
 */

import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";
import type { AnalysisResult } from "@shared/analysisTypes";

const SYSTEM_PROMPT = `You are O2 AI, an expert e-waste recycling analysis system. You analyze electronic products and generate detailed teardown breakdowns for recycling operations.

When given a product and quantity, you must generate a comprehensive JSON analysis including:

1. **Teardown Tree**: A hierarchical breakdown of the product into assemblies → subassemblies → components. Each node needs:
   - id: unique kebab-case identifier
   - label: English component name
   - labelCn: Chinese component name
   - category: "root" | "assembly" | "subassembly" | "component"
   - material: material composition (for components)
   - weight: weight in grams (e.g. "380 g")
   - status: disposal classification:
     * "destroy-brand" — contains brand IP, must be destroyed
     * "raw-material" — recoverable as raw material
     * "raw-material-hazmat" — hazardous material requiring special handling (batteries, etc.)
     * "third-party" — sellable to third-party markets
     * "non-recyclable" — cannot be recycled
   - sellableValue: per-unit dollar value (only for "third-party" status items)
   - children: nested components

2. **Financial Analysis**:
   - tradingSellableParts: list of third-party sellable components with qty, unit value, subtotal
   - rawMaterialRecovery: recovered materials with weight, unit price, revenue
   - costBreakdown: labor, logistics, compliance, warehouse costs
   - Deal summaries for both Service Fee and Trading modes

Key rules:
- Create realistic, detailed breakdowns with 5-7 main assemblies
- Each assembly should have 3-8 components, some with sub-assemblies
- Use real component names, materials, and realistic market values
- Weight values must be realistic for the product type
- PCB boards with brand firmware should be "destroy-brand"
- Batteries are always "raw-material-hazmat"
- Motors, sensors, connectors are typically "third-party" (sellable)
- Plastic housings with brand logos are "destroy-brand"
- Plain structural materials are "raw-material"
- Filters, rubber seals, worn parts are "non-recyclable"
- Labor rate: $25/hr, disassembly rate varies by product complexity
- Include precious metals recovery (Au, Ag from PCBs) in raw materials
- Service Fee mode: company charges client for processing + keeps recovered assets
- Trading mode: company buys the e-waste from client, resells parts + materials

Return ONLY valid JSON matching the AnalysisResult schema. No markdown, no explanation.`;

const JSON_SCHEMA = {
  name: "analysis_result",
  strict: true,
  schema: {
    type: "object",
    properties: {
      product: { type: "string", description: "Product name" },
      units: { type: "integer", description: "Number of units" },
      weightPerUnit: { type: "string", description: "Weight per unit, e.g. '3,700 g'" },
      totalWeight: { type: "string", description: "Total weight, e.g. '1,850 kg'" },
      assemblyCount: { type: "integer", description: "Number of main assemblies" },
      componentCount: { type: "integer", description: "Total number of components" },
      recoveryRate: { type: "string", description: "Recovery rate percentage, e.g. '94.2%'" },
      teardownTree: {
        type: "object",
        description: "Root node of the teardown tree",
        properties: {
          id: { type: "string" },
          label: { type: "string" },
          labelCn: { type: "string" },
          category: { type: "string", enum: ["root"] },
          weight: { type: "string" },
          status: { type: "string", enum: ["raw-material"] },
          children: {
            type: "array",
            description: "Assembly-level children",
            items: { type: "object", additionalProperties: true }
          }
        },
        required: ["id", "label", "labelCn", "category", "weight", "status", "children"],
        additionalProperties: false
      },
      tradingSellableParts: {
        type: "array",
        items: {
          type: "object",
          properties: {
            component: { type: "string" },
            qty: { type: "integer" },
            unitValue: { type: "number" },
            subtotal: { type: "number" },
            notes: { type: "string" },
            assembly: { type: "string" }
          },
          required: ["component", "qty", "unitValue", "subtotal", "notes", "assembly"],
          additionalProperties: false
        }
      },
      tradingSellablePartsTotal: { type: "number" },
      tradingSellablePartsBatch: { type: "number" },
      rawMaterialRecovery: {
        type: "array",
        items: {
          type: "object",
          properties: {
            category: { type: "string" },
            material: { type: "string" },
            weightKg: { type: "number" },
            unitPrice: { type: "string" },
            revenue: { type: "number" }
          },
          required: ["category", "material", "weightKg", "unitPrice", "revenue"],
          additionalProperties: false
        }
      },
      rawMaterialTotal: { type: "number" },
      rawMaterialBatch: { type: "number" },
      costBreakdown: {
        type: "array",
        items: {
          type: "object",
          properties: {
            category: { type: "string" },
            assumption: { type: "string" },
            totalCost: { type: "number" },
            perUnit: { type: "number" }
          },
          required: ["category", "assumption", "totalCost", "perUnit"],
          additionalProperties: false
        }
      },
      totalCostPerUnit: { type: "number" },
      totalCostBatch: { type: "number" },
      serviceFeeDealSummary: {
        type: "array",
        items: {
          type: "object",
          properties: {
            item: { type: "string" },
            total: { type: "number" },
            isNegative: { type: "boolean" }
          },
          required: ["item", "total"],
          additionalProperties: false
        }
      },
      tradingDealSummary: {
        type: "array",
        items: {
          type: "object",
          properties: {
            item: { type: "string" },
            total: { type: "number" },
            isNegative: { type: "boolean" }
          },
          required: ["item", "total"],
          additionalProperties: false
        }
      },
      summary: { type: "string", description: "Human-readable analysis summary in markdown" }
    },
    required: [
      "product", "units", "weightPerUnit", "totalWeight",
      "assemblyCount", "componentCount", "recoveryRate",
      "teardownTree", "tradingSellableParts", "tradingSellablePartsTotal",
      "tradingSellablePartsBatch", "rawMaterialRecovery", "rawMaterialTotal",
      "rawMaterialBatch", "costBreakdown", "totalCostPerUnit", "totalCostBatch",
      "serviceFeeDealSummary", "tradingDealSummary", "summary"
    ],
    additionalProperties: false
  }
};

export const analysisRouter = router({
  /**
   * Analyze a product for e-waste recycling.
   * Returns a full teardown tree + financial analysis.
   */
  analyze: publicProcedure
    .input(z.object({
      product: z.string().min(1).max(200),
      units: z.number().int().min(1).max(100000),
    }))
    .mutation(async ({ input }) => {
      const { product, units } = input;

      const userMessage = `Analyze the following product for e-waste recycling:

Product: ${product}
Quantity: ${units} units

Generate a complete teardown analysis with:
- Detailed hierarchical teardown tree (5-7 main assemblies, each with 3-8 components, some with sub-assemblies for 3-4 levels of depth)
- Sellable parts list for Trading mode
- Raw material recovery values
- Cost breakdown (labor at $25/hr, logistics, compliance, warehouse)
- Deal summaries for both Service Fee and Trading modes

Service Fee mode: The recycling company charges the client a service fee to process the e-waste. Revenue = service fee + recovered asset value. Aim for ~35% net margin.
Trading mode: The recycling company buys the e-waste from the client at a negotiated buyout price, then recovers value from parts and materials. Show realistic economics (may show a loss at lower volumes).

Make the teardown technically accurate for this specific product. Use real component names, realistic weights, and current market prices.`;

      try {
        const response = await invokeLLM({
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userMessage },
          ],
          response_format: {
            type: "json_schema",
            json_schema: JSON_SCHEMA as any,
          },
          maxTokens: 16384,
        });

        const content = response.choices[0]?.message?.content;
        if (!content || typeof content !== 'string') {
          throw new Error("Empty response from LLM");
        }

        // Parse the JSON response
        const analysis: AnalysisResult = JSON.parse(content);
        
        return {
          success: true as const,
          data: analysis,
        };
      } catch (error: any) {
        console.error("[Analysis] LLM error:", error.message);
        throw new Error(`Analysis failed: ${error.message}`);
      }
    }),
});

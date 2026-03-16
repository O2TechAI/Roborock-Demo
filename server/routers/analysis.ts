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

const SYSTEM_PROMPT = `You are O2 AI, an expert e-waste recycling analysis system with deep industry knowledge. Given a product and quantity, return a JSON analysis.

RULES:
- 5-7 main assemblies per product
- Each assembly has 3-8 sub-components. Key sub-assemblies (battery packs, motors, PCBs, display modules) should have their own children (2-5 items), creating 3-4 levels of depth.
- Use REAL component names, manufacturer references where known (e.g. "Nidec brushless motor", "TI BQ40Z50 BMS IC", "Samsung AMOLED panel"), realistic weights in grams, and accurate materials.
- Status types: "destroy-brand" (branded IP, firmware), "raw-material" (recoverable metals/plastics), "raw-material-hazmat" (Li-ion cells, electrolyte, lead solder), "third-party" (resalable motors, sensors, modules), "non-recyclable" (filters, worn rubber, adhesive residue)
- Classification rules: PCBs with firmware/data → destroy-brand; Li-ion cells → raw-material-hazmat; working motors/sensors/modules → third-party; structural metals/plastics → raw-material; worn consumables → non-recyclable
- Labor rate $25/hr, 2 units/hr disassembly. Service Fee mode: charge client processing fee + keep recovered assets (~35% net margin). Trading mode: buy e-waste at buyout price, resell parts + materials.
- Each node needs: id (kebab-case), label, labelCn (Chinese name), category ("root"|"assembly"|"subassembly"|"component"), weight (string like "350 g"), status, material (leaf nodes only), sellableValue (number, third-party only), children (array, omit for leaf nodes).
- Financial tables must be internally consistent: sellable parts total = sum of subtotals; raw material batch = total * units; cost batch = sum of all cost items.

Return ONLY valid JSON. No markdown fences, no explanation.`;

const buildUserPrompt = (product: string, units: number) => `Analyze for e-waste recycling:

Product: ${product}
Quantity: ${units} units

Return JSON with this exact structure:
{
  "product": "${product}",
  "units": ${units},
  "weightPerUnit": "e.g. 3700 g",
  "totalWeight": "e.g. 1850 kg",
  "assemblyCount": 6,
  "componentCount": 28,
  "recoveryRate": "e.g. 94.2%",
  "teardownTree": {
    "id": "root",
    "label": "${product}",
    "labelCn": "Chinese name",
    "category": "root",
    "weight": "total weight",
    "status": "raw-material",
    "children": [
      {
        "id": "assembly-id",
        "label": "Assembly Name",
        "labelCn": "Chinese",
        "category": "assembly",
        "weight": "weight",
        "status": "raw-material",
        "children": [
          {
            "id": "component-id",
            "label": "Component",
            "labelCn": "Chinese",
            "category": "component",
            "material": "material type",
            "weight": "weight",
            "status": "third-party",
            "sellableValue": 12.50
          }
        ]
      }
    ]
  },
  "tradingSellableParts": [
    {"component": "Name", "qty": ${units}, "unitValue": 12.50, "subtotal": ${units * 12.5}, "notes": "condition", "assembly": "parent assembly"}
  ],
  "tradingSellablePartsTotal": 0,
  "tradingSellablePartsBatch": 0,
  "rawMaterialRecovery": [
    {"category": "Metals", "material": "Copper", "weightKg": 100, "unitPrice": "$8.50/kg", "revenue": 850}
  ],
  "rawMaterialTotal": 0,
  "rawMaterialBatch": 0,
  "costBreakdown": [
    {"category": "Labor", "assumption": "details", "totalCost": 5000, "perUnit": 10}
  ],
  "totalCostPerUnit": 0,
  "totalCostBatch": 0,
  "serviceFeeDealSummary": [
    {"item": "Processing Fee Revenue", "total": 10000},
    {"item": "Recovered Asset Value", "total": 5000},
    {"item": "Operating Costs", "total": -8000, "isNegative": true},
    {"item": "Net Profit", "total": 7000}
  ],
  "tradingDealSummary": [
    {"item": "Sellable Parts Revenue", "total": 10000},
    {"item": "Raw Material Revenue", "total": 5000},
    {"item": "Buyout Cost", "total": -8000, "isNegative": true},
    {"item": "Operating Costs", "total": -6000, "isNegative": true},
    {"item": "Net Profit/Loss", "total": 1000}
  ],
  "summary": "Brief plain text summary of the analysis (no markdown, no special characters)"
}

IMPORTANT: Create a detailed teardown tree with 3-4 levels of depth for key assemblies (batteries, motors, PCBs, displays). Use real component names and materials. Fill all financial totals correctly and consistently. Make it technically accurate for ${product}.`;

/**
 * Attempt to extract valid JSON from a potentially malformed LLM response.
 * Handles common issues like markdown fences, trailing commas, truncation.
 */
function extractJSON(raw: string): any {
  // Strip markdown fences
  let cleaned = raw.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '');
  }

  // First try direct parse
  try {
    return JSON.parse(cleaned);
  } catch (_) {
    // Try to fix common issues
  }

  // Try to fix truncated JSON by closing open structures
  try {
    let fixed = cleaned;
    // Count open/close braces and brackets
    let braces = 0, brackets = 0;
    let inString = false, escape = false;
    for (const ch of fixed) {
      if (escape) { escape = false; continue; }
      if (ch === '\\') { escape = true; continue; }
      if (ch === '"') { inString = !inString; continue; }
      if (inString) continue;
      if (ch === '{') braces++;
      if (ch === '}') braces--;
      if (ch === '[') brackets++;
      if (ch === ']') brackets--;
    }

    // Remove trailing comma before closing
    fixed = fixed.replace(/,\s*$/, '');

    // Close any open structures
    while (brackets > 0) { fixed += ']'; brackets--; }
    while (braces > 0) { fixed += '}'; braces--; }

    return JSON.parse(fixed);
  } catch (_) {
    // Final attempt: find the outermost { ... } and try that
  }

  // Try to find the largest valid JSON object
  const firstBrace = cleaned.indexOf('{');
  if (firstBrace >= 0) {
    let depth = 0;
    let inStr = false;
    let esc = false;
    let lastValidEnd = -1;
    for (let i = firstBrace; i < cleaned.length; i++) {
      const ch = cleaned[i];
      if (esc) { esc = false; continue; }
      if (ch === '\\') { esc = true; continue; }
      if (ch === '"') { inStr = !inStr; continue; }
      if (inStr) continue;
      if (ch === '{') depth++;
      if (ch === '}') { depth--; if (depth === 0) { lastValidEnd = i; break; } }
    }
    if (lastValidEnd > 0) {
      try {
        return JSON.parse(cleaned.substring(firstBrace, lastValidEnd + 1));
      } catch (_) {}
    }
  }

  throw new Error("Could not parse LLM response as JSON");
}

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
      const userMessage = buildUserPrompt(product, units);

      try {
        const response = await invokeLLM({
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userMessage },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "analysis_result",
              strict: false,
              schema: {
                type: "object",
                properties: {
                  product: { type: "string" },
                  units: { type: "integer" },
                  weightPerUnit: { type: "string" },
                  totalWeight: { type: "string" },
                  assemblyCount: { type: "integer" },
                  componentCount: { type: "integer" },
                  recoveryRate: { type: "string" },
                  teardownTree: { type: "object" },
                  tradingSellableParts: { type: "array" },
                  tradingSellablePartsTotal: { type: "number" },
                  tradingSellablePartsBatch: { type: "number" },
                  rawMaterialRecovery: { type: "array" },
                  rawMaterialTotal: { type: "number" },
                  rawMaterialBatch: { type: "number" },
                  costBreakdown: { type: "array" },
                  totalCostPerUnit: { type: "number" },
                  totalCostBatch: { type: "number" },
                  serviceFeeDealSummary: { type: "array" },
                  tradingDealSummary: { type: "array" },
                  summary: { type: "string" },
                },
                required: [
                  "product", "units", "teardownTree",
                  "tradingSellableParts", "rawMaterialRecovery",
                  "costBreakdown", "serviceFeeDealSummary", "tradingDealSummary", "summary"
                ],
              }
            } as any,
          },
        });

        const content = response.choices[0]?.message?.content;
        if (!content || typeof content !== 'string') {
          throw new Error("Empty response from LLM");
        }

        // Parse with robust JSON extraction
        const analysis: AnalysisResult = extractJSON(content);
        
        // Validate essential fields exist
        if (!analysis.teardownTree || !analysis.teardownTree.children) {
          throw new Error("Invalid analysis: missing teardown tree");
        }

        // Ensure defaults for optional numeric fields
        analysis.assemblyCount = analysis.assemblyCount || analysis.teardownTree.children.length;
        analysis.componentCount = analysis.componentCount || countNodes(analysis.teardownTree);
        analysis.tradingSellablePartsTotal = analysis.tradingSellablePartsTotal || 
          (analysis.tradingSellableParts || []).reduce((s: number, p: any) => s + (p.subtotal || 0), 0);
        analysis.tradingSellablePartsBatch = analysis.tradingSellablePartsBatch || analysis.tradingSellablePartsTotal;
        analysis.rawMaterialTotal = analysis.rawMaterialTotal || 
          (analysis.rawMaterialRecovery || []).reduce((s: number, r: any) => s + (r.revenue || 0), 0);
        analysis.rawMaterialBatch = analysis.rawMaterialBatch || analysis.rawMaterialTotal;
        analysis.totalCostBatch = analysis.totalCostBatch || 
          (analysis.costBreakdown || []).reduce((s: number, c: any) => s + (c.totalCost || 0), 0);
        analysis.totalCostPerUnit = analysis.totalCostPerUnit || 
          (analysis.units ? analysis.totalCostBatch / analysis.units : 0);

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

/** Count all nodes in a teardown tree */
function countNodes(node: any): number {
  let count = 1;
  if (node.children) {
    for (const child of node.children) {
      count += countNodes(child);
    }
  }
  return count;
}

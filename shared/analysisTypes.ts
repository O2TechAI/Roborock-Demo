/**
 * Shared types for AI analysis responses.
 * Used by both server (LLM structured output) and client (rendering).
 */

export type DisposalStatus =
  | 'destroy-brand'
  | 'raw-material'
  | 'raw-material-hazmat'
  | 'third-party'
  | 'non-recyclable';

export interface TeardownNodeData {
  id: string;
  label: string;
  labelCn?: string;
  category: 'root' | 'assembly' | 'subassembly' | 'component';
  material?: string;
  weight?: string;
  status: DisposalStatus;
  sellableValue?: number;
  children?: TeardownNodeData[];
}

export interface SellablePartData {
  component: string;
  qty: number;
  unitValue: number;
  subtotal: number;
  notes: string;
  assembly: string;
}

export interface RawMaterialData {
  category: string;
  material: string;
  weightKg: number;
  unitPrice: string;
  revenue: number;
}

export interface CostData {
  category: string;
  assumption: string;
  totalCost: number;
  perUnit: number;
}

export interface DealSummaryData {
  item: string;
  total: number;
  isNegative?: boolean;
}

export interface AnalysisResult {
  product: string;
  units: number;
  weightPerUnit: string;
  totalWeight: string;
  assemblyCount: number;
  componentCount: number;
  recoveryRate: string;
  teardownTree: TeardownNodeData;
  tradingSellableParts: SellablePartData[];
  tradingSellablePartsTotal: number;
  tradingSellablePartsBatch: number;
  rawMaterialRecovery: RawMaterialData[];
  rawMaterialTotal: number;
  rawMaterialBatch: number;
  costBreakdown: CostData[];
  totalCostPerUnit: number;
  totalCostBatch: number;
  serviceFeeDealSummary: DealSummaryData[];
  tradingDealSummary: DealSummaryData[];
  summary: string;
}

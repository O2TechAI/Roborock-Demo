/**
 * O2 AI Demo — Complete Data Model
 * 
 * Based on real Roborock S7 teardown script.
 * Two modes: Service Fee (raw material only) and Trading (parts resale + raw material).
 * Teardown tree is shared; financial tables differ by mode.
 */

// ============================================================
// TYPES
// ============================================================

export type ModeType = 'service' | 'trading';

export type DisposalStatus = 
  | 'destroy-brand'      // DESTROY – Brand/IP
  | 'raw-material'       // RAW MATERIAL
  | 'raw-material-hazmat' // RAW MATERIAL – Hazmat
  | 'third-party'        // THIRD-PARTY / TRADABLE
  | 'non-recyclable';    // NON-RECYCLABLE

export interface TeardownNode {
  id: string;
  label: string;
  labelCn?: string;
  category: 'root' | 'assembly' | 'subassembly' | 'component';
  material?: string;
  weight?: string;        // e.g. "380 g"
  status: DisposalStatus;
  sellableValue?: number; // Trading mode only, per unit $
  children?: TeardownNode[];
}

export interface SellablePartRow {
  component: string;
  qty: number;
  unitValue: number;
  subtotal: number;
  notes: string;
  assembly: string;
}

export interface RawMaterialRow {
  category: string;
  material: string;
  weightKg: number;
  unitPrice: string;
  revenue: number;
}

export interface CostRow {
  category: string;
  categoryCn: string;
  assumption: string;
  totalCost: number;
  perUnit: number;
}

export interface ServiceFeeRow {
  item: string;
  perUnit: number;
  total: number;
  isPercent?: boolean;
  percentValue?: string;
}

export interface DealSummaryRow {
  item: string;
  total: number;
  isNegative?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'thinking';
  content: string;
  timestamp?: number;
}

export interface ExampleQuery {
  product: string;
  description: string;
  units: number;
}

// ============================================================
// EXAMPLE QUERIES
// ============================================================

export const exampleQueries: ExampleQuery[] = [
  { product: 'Roborock S7', description: 'Recycle 500 units, robot vacuum teardown', units: 500 },
  { product: 'iPhone 15 Pro', description: 'Recycle 1000 units, smartphone disassembly', units: 1000 },
  { product: 'MacBook Pro 14" M3', description: 'Recycle 200 units, laptop teardown', units: 200 },
];

// ============================================================
// AI THINKING STEPS (simulated analysis)
// ============================================================

export const aiThinkingSteps: string[] = [
  'Identifying product: Roborock S7 Robot Vacuum...',
  'Loading component database for Roborock S7 (3.7 kg, 7 major assemblies)...',
  'Analyzing teardown topology: 7 assemblies, 28 sub-components identified...',
  'Cross-referencing component market prices (Q1 2026 spot rates)...',
  'Calculating raw material recovery values (Au, Ag, Cu, Li, Steel, ABS)...',
  'Estimating labor costs: $25/hr, 2 units/hr disassembly rate...',
  'Computing logistics, compliance, and warehousing overhead...',
  'Generating teardown topology and financial analysis...',
];

export const aiAnalysisResult = `**Analysis Complete — Roborock S7 (500 units)**

Product identified as Roborock S7 Robot Vacuum (3.7 kg/unit).

Teardown topology generated with **7 major assemblies** and **28 recoverable components**.

Key findings:
• 10 components identified as third-party tradable
• 14 components recoverable as raw materials
• 3 components require brand destruction (IP compliance)
• 2 components non-recyclable (HEPA filter, rubber strip)

The teardown flow diagram and financial analysis are now available on the right panel.`;

// ============================================================
// TEARDOWN TREE (shared structure, status differs by mode)
// ============================================================

export const teardownTree: TeardownNode = {
  id: 'root',
  label: 'Roborock S7',
  labelCn: '整机',
  category: 'root',
  weight: '3,700 g',
  status: 'raw-material',
  children: [
    {
      id: 'top-assembly',
      label: 'Top Assembly',
      labelCn: '上部组件',
      category: 'assembly',
      status: 'raw-material',
      children: [
        {
          id: 'top-cover',
          label: 'Top Cover',
          labelCn: 'ABS/PC 注塑外壳',
          category: 'component',
          material: 'ABS/PC Plastic',
          weight: '380 g',
          status: 'destroy-brand',
        },
        {
          id: 'lidar-housing',
          label: 'LiDAR Turret Housing',
          labelCn: 'PC/PMMA 光学塑料罩',
          category: 'component',
          material: 'PC / PMMA Plastic',
          weight: '90 g',
          status: 'raw-material',
        },
        {
          id: 'lidar-module',
          label: 'LiDAR Module',
          labelCn: '激光雷达模块',
          category: 'subassembly',
          status: 'raw-material',
          children: [
            {
              id: 'lidar-pcb',
              label: 'LiDAR Control PCB',
              labelCn: 'STM32 雷达控制板',
              category: 'component',
              material: 'High-grade PCB (Cu/Au)',
              weight: '35 g',
              status: 'destroy-brand',
            },
            {
              id: 'lidar-motor',
              label: 'LiDAR Rotation Motor',
              labelCn: 'Nidec 无铁芯直流电机',
              category: 'component',
              material: 'Coreless DC Motor',
              weight: '15 g',
              status: 'third-party',
              sellableValue: 1.20,
            },
          ],
        },
      ],
    },
    {
      id: 'sensor-system',
      label: 'Upper Sensor System',
      labelCn: '上部传感系统',
      category: 'assembly',
      status: 'raw-material',
      children: [
        {
          id: 'bumper-switch',
          label: 'Bumper Micro Switch',
          labelCn: 'Omron 微动开关',
          category: 'component',
          material: 'Omron D2FC-F-type',
          weight: '5 g',
          status: 'third-party',
          sellableValue: 0.40,
        },
        {
          id: 'cliff-sensor',
          label: 'Cliff / Obstacle Sensor Board',
          labelCn: 'IR 传感板',
          category: 'component',
          material: 'IR Reflective Sensor PCB',
          weight: '12 g',
          status: 'third-party',
          sellableValue: 0.60,
        },
        {
          id: 'sensor-bracket',
          label: 'Sensor Mounting Bracket',
          labelCn: 'ABS 注塑支架',
          category: 'component',
          material: 'ABS Plastic',
          weight: '25 g',
          status: 'raw-material',
        },
      ],
    },
    {
      id: 'bottom-assembly',
      label: 'Bottom Assembly',
      labelCn: '底部组件',
      category: 'assembly',
      status: 'raw-material',
      children: [
        {
          id: 'bottom-chassis',
          label: 'Bottom Chassis',
          labelCn: '增强 ABS 结构件',
          category: 'component',
          material: 'Glass-filled ABS Plastic',
          weight: '420 g',
          status: 'raw-material',
        },
        {
          id: 'metal-brackets',
          label: 'Metal Brackets & Weights',
          labelCn: '冲压钢/铝件',
          category: 'component',
          material: 'Steel / Aluminum',
          weight: '180 g',
          status: 'raw-material',
        },
      ],
    },
    {
      id: 'power-system',
      label: 'Power System',
      labelCn: '能源系统',
      category: 'assembly',
      status: 'raw-material',
      children: [
        {
          id: 'battery-cells',
          label: 'Battery Cells (18650)',
          labelCn: 'ATL/Sunwoda 锂电芯',
          category: 'component',
          material: 'Li-ion Battery (Ni/Co/Cu)',
          weight: '240 g',
          status: 'raw-material-hazmat',
        },
        {
          id: 'bms-board',
          label: 'BMS Control Board',
          labelCn: 'TI 电池管理板',
          category: 'component',
          material: 'PCB (Cu)',
          weight: '18 g',
          status: 'destroy-brand',
        },
        {
          id: 'battery-harness',
          label: 'Battery Wiring Harness',
          labelCn: 'JST 接插件线束',
          category: 'component',
          material: 'Copper Wiring',
          weight: '20 g',
          status: 'third-party',
          sellableValue: 0.50,
        },
        {
          id: 'battery-enclosure',
          label: 'Battery Enclosure',
          labelCn: 'ABS + 薄钢壳',
          category: 'component',
          material: 'ABS Plastic + Steel',
          weight: '65 g',
          status: 'raw-material',
        },
      ],
    },
    {
      id: 'drive-system',
      label: 'Drive & Motion System',
      labelCn: '驱动与运动系统',
      category: 'assembly',
      status: 'raw-material',
      children: [
        {
          id: 'wheel-motors',
          label: 'Wheel Drive Motors (x2)',
          labelCn: 'Mabuchi RS 直流电机',
          category: 'component',
          material: 'Mabuchi RS-series DC Motors',
          weight: '60 g',
          status: 'third-party',
          sellableValue: 3.00,
        },
        {
          id: 'wheel-gearbox',
          label: 'Wheel Gearbox',
          labelCn: '粉末冶金齿轮箱',
          category: 'component',
          material: 'Powder-metal Steel',
          weight: '45 g',
          status: 'third-party',
          sellableValue: 0.80,
        },
        {
          id: 'main-brush-motor',
          label: 'Main Brush Motor',
          labelCn: 'Johnson 直流电机',
          category: 'component',
          material: 'Johnson-type DC Motor',
          weight: '35 g',
          status: 'third-party',
          sellableValue: 1.20,
        },
        {
          id: 'drive-shaft',
          label: 'Drive Shaft',
          labelCn: '钢轴',
          category: 'component',
          material: 'Steel',
          weight: '40 g',
          status: 'raw-material',
        },
        {
          id: 'side-brush-motor',
          label: 'Side Brush Motor',
          labelCn: 'N20 微型电机',
          category: 'component',
          material: 'N20-class Micro DC Motor',
          weight: '12 g',
          status: 'third-party',
          sellableValue: 0.80,
        },
        {
          id: 'side-brush-housing',
          label: 'Side Brush Housing',
          labelCn: 'ABS 塑料壳',
          category: 'component',
          material: 'ABS Plastic',
          weight: '30 g',
          status: 'raw-material',
        },
      ],
    },
    {
      id: 'cleaning-system',
      label: 'Cleaning & Suction System',
      labelCn: '清洁与吸尘系统',
      category: 'assembly',
      status: 'raw-material',
      children: [
        {
          id: 'suction-motor',
          label: 'Suction Fan Motor',
          labelCn: '高速 BLDC/DC 风机',
          category: 'component',
          material: 'High-speed BLDC/DC Motor',
          weight: '55 g',
          status: 'third-party',
          sellableValue: 1.50,
        },
        {
          id: 'roller-shaft',
          label: 'Roller Shaft',
          labelCn: '钢轴',
          category: 'component',
          material: 'Steel',
          weight: '45 g',
          status: 'raw-material',
        },
        {
          id: 'rubber-brush',
          label: 'Rubber Brush Strip',
          labelCn: 'TPE/橡胶刷条',
          category: 'component',
          material: 'TPE / Rubber Composite',
          weight: '35 g',
          status: 'non-recyclable',
        },
        {
          id: 'brush-frame',
          label: 'Brush Frame',
          labelCn: 'ABS 塑料框架',
          category: 'component',
          material: 'ABS Plastic',
          weight: '65 g',
          status: 'raw-material',
        },
        {
          id: 'dust-bin',
          label: 'Dust Bin',
          labelCn: '透明 PC 塑料尘盒',
          category: 'component',
          material: 'PC Plastic',
          weight: '120 g',
          status: 'raw-material',
        },
        {
          id: 'hepa-filter',
          label: 'HEPA Filter',
          labelCn: '玻璃纤维滤芯',
          category: 'component',
          material: 'Glass-fiber Filter Media',
          weight: '15 g',
          status: 'non-recyclable',
        },
      ],
    },
    {
      id: 'control-electronics',
      label: 'Control & Electronics',
      labelCn: '主控与电子系统',
      category: 'assembly',
      status: 'raw-material',
      children: [
        {
          id: 'main-pcb',
          label: 'Main Control Board',
          labelCn: 'Qualcomm/Rockchip 主控板',
          category: 'component',
          material: 'High-grade PCB (Cu/Au)',
          weight: '55 g',
          status: 'destroy-brand',
        },
        {
          id: 'internal-wiring',
          label: 'Internal Wiring',
          labelCn: 'PVC 包覆铜线',
          category: 'component',
          material: 'PVC-insulated Copper Wiring',
          weight: '40 g',
          status: 'third-party',
          sellableValue: 0.60,
        },
      ],
    },
  ],
};

// ============================================================
// TRADING MODE — Sellable Parts Revenue
// ============================================================

export const tradingSellableParts: SellablePartRow[] = [
  { component: 'Coreless DC Motor (Nidec)', qty: 1, unitValue: 1.20, subtotal: 1.20, notes: 'Coreless DC motor', assembly: 'LiDAR Module' },
  { component: 'Omron D2FC-F-type Micro Switch', qty: 1, unitValue: 0.40, subtotal: 0.40, notes: 'Omron-class', assembly: 'Upper Sensor System' },
  { component: 'IR Reflective Sensor PCB', qty: 1, unitValue: 0.60, subtotal: 0.60, notes: 'Sharp/Everlight', assembly: 'Upper Sensor System' },
  { component: 'JST Copper Wiring Harness', qty: 1, unitValue: 0.50, subtotal: 0.50, notes: 'JST-type', assembly: 'Power System' },
  { component: 'Mabuchi RS-series DC Motors x2', qty: 2, unitValue: 1.50, subtotal: 3.00, notes: 'Mabuchi RS-series', assembly: 'Drive & Motion System' },
  { component: 'Powder-metal Steel Gearbox', qty: 1, unitValue: 0.80, subtotal: 0.80, notes: 'Powder metal', assembly: 'Drive & Motion System' },
  { component: 'Johnson-type DC Motor', qty: 1, unitValue: 1.20, subtotal: 1.20, notes: 'Johnson-type', assembly: 'Drive & Motion System' },
  { component: 'N20-class Micro DC Motor', qty: 1, unitValue: 0.80, subtotal: 0.80, notes: 'N20-class', assembly: 'Drive & Motion System' },
  { component: 'High-speed BLDC/DC Fan Motor', qty: 1, unitValue: 1.50, subtotal: 1.50, notes: 'Generic BLDC/DC', assembly: 'Cleaning & Suction System' },
  { component: 'PVC-insulated Copper Wiring Set', qty: 1, unitValue: 0.60, subtotal: 0.60, notes: 'Scrap-grade', assembly: 'Control & Electronics' },
];

export const tradingSellablePartsTotal = 10.60;
export const tradingSellablePartsBatch = 5300.00; // 10.60 * 500

// ============================================================
// RAW MATERIAL RECOVERY (shared, same for both modes)
// ============================================================

export const rawMaterialRecovery: RawMaterialRow[] = [
  { category: 'Plastics', material: 'ABS / Glass-filled ABS', weightKg: 0.965, unitPrice: '$0.35/kg', revenue: 0.34 },
  { category: 'Plastics', material: 'PC / PMMA', weightKg: 0.210, unitPrice: '$0.60/kg', revenue: 0.13 },
  { category: 'Structural Metals', material: 'Steel', weightKg: 0.285, unitPrice: '$0.20/kg', revenue: 0.06 },
  { category: 'Structural Metals', material: 'Aluminum', weightKg: 0.040, unitPrice: '$1.80/kg', revenue: 0.07 },
  { category: 'Battery Materials', material: 'Li-ion Battery (Ni/Co/Cu)', weightKg: 0.240, unitPrice: '$2.20/kg', revenue: 0.53 },
  { category: 'PCB Metals', material: 'Gold (Au)', weightKg: 0.0000216, unitPrice: '$70/g', revenue: 1.51 },
  { category: 'PCB Metals', material: 'Silver (Ag)', weightKg: 0.000086, unitPrice: '$0.80/g', revenue: 0.07 },
  { category: 'PCB Metals', material: 'Copper (Cu)', weightKg: 0.0216, unitPrice: '$9.00/kg', revenue: 0.19 },
];

export const rawMaterialTotal = 2.90;
export const rawMaterialBatch = 1450.00; // 2.90 * 500

// ============================================================
// TRADING MODE — Total Recovery
// ============================================================

export const tradingTotalRecovery = [
  { source: 'Sellable Parts', value: 10.60 },
  { source: 'Raw Materials', value: 2.90 },
];
export const tradingTotalRecoverablePerUnit = 13.50;
export const tradingTotalRecoverableBatch = 6750.00;

// ============================================================
// COST BREAKDOWN (shared base, but service fee mode adds margin)
// ============================================================

export const costBreakdown: CostRow[] = [
  { category: 'Human / Labor', categoryCn: '人工', assumption: '250 labor-hours x $25', totalCost: 6250, perUnit: 12.50 },
  { category: 'Logistics', categoryCn: '物流', assumption: '$3.00 x 500 units', totalCost: 1500, perUnit: 3.00 },
  { category: 'Compliance', categoryCn: '合规', assumption: '$2.00 x 500 units', totalCost: 1000, perUnit: 2.00 },
  { category: 'Warehouse Ops', categoryCn: '仓储作业', assumption: '$2.50 x 500 units', totalCost: 1250, perUnit: 2.50 },
];

export const totalCostPerUnit = 20.00;
export const totalCostBatch = 10000;

// ============================================================
// SERVICE FEE MODE — Proposed Service Fee
// ============================================================

export const serviceFeeProposal: ServiceFeeRow[] = [
  { item: 'Direct Service Cost', perUnit: 20.00, total: 10000 },
  { item: 'Gross Profit Target', perUnit: 20.00, total: 10000 },
  { item: 'Gross Margin Target', perUnit: 0, total: 0, isPercent: true, percentValue: '50%' },
  { item: 'Total Other Costs', perUnit: -6.00, total: -3000 },
  { item: 'Net Profit Target', perUnit: 14.00, total: 7000 },
  { item: 'Net Margin Target', perUnit: 0, total: 0, isPercent: true, percentValue: '35%' },
  { item: 'Proposed Service Fee', perUnit: 40.00, total: 20000 },
];

// ============================================================
// DEAL SUMMARIES
// ============================================================

export const serviceFeeDealSummary: DealSummaryRow[] = [
  { item: 'Revenue from Service Fee', total: 20000 },
  { item: 'Revenue from Robots (Recovered Assets)', total: 6750 },
  { item: 'Total Revenue', total: 26750 },
  { item: 'Total Cost', total: -13000, isNegative: true },
  { item: 'Total Profit', total: 13750 },
];

export const tradingDealSummary: DealSummaryRow[] = [
  { item: 'Revenue from Sellable Parts', total: 5300 },
  { item: 'Revenue from Raw Materials', total: 1450 },
  { item: 'Total Revenue', total: 6750 },
  { item: 'Total Cost', total: -10000, isNegative: true },
  { item: 'Buyout Price to Client', total: -3500, isNegative: true },
  { item: 'Net Position', total: -6750 },
];

// Note: Trading mode the buyout price is negotiated. 
// In this demo, we show O2 offers $7/unit ($3,500 total) to buy the 500 units.
// Revenue from parts ($5,300) + materials ($1,450) = $6,750
// Costs = $10,000 + $3,500 buyout = $13,500
// Net = $6,750 - $13,500 = -$6,750 (loss at this scale — demonstrates why trading mode 
// requires higher volume or higher-value products)

// ============================================================
// QUOTATION GENERATION STEPS
// ============================================================

export const quotationSteps = [
  { label: 'Validating component database...', progress: 12 },
  { label: 'Calculating material spot prices (Q1 2026)...', progress: 28 },
  { label: 'Estimating labor & logistics...', progress: 45 },
  { label: 'Running compliance checks...', progress: 62 },
  { label: 'Computing profit margins...', progress: 78 },
  { label: 'Generating final quotation...', progress: 92 },
  { label: 'Quotation ready', progress: 100 },
];

/**
 * O2 AI Demo — Complete Data Model
 * 
 * Based on real Roborock S7 teardown script.
 * Two modes: Service Fee (raw material only) and Trading (parts resale + raw material).
 * Teardown tree is shared; financial tables differ by mode.
 * Enhanced with deep hierarchical breakdowns (3-4 levels).
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
  weight?: string;
  status: DisposalStatus;
  sellableValue?: number;
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
// AI THINKING STEPS (simulated analysis for Roborock fallback)
// ============================================================

export const aiThinkingSteps: string[] = [
  'Identifying product: Roborock S7 Robot Vacuum...',
  'Loading component database for Roborock S7 (3.7 kg, 7 major assemblies)...',
  'Analyzing teardown topology: 7 assemblies, 42 sub-components identified...',
  'Cross-referencing component market prices (Q1 2026 spot rates)...',
  'Calculating raw material recovery values (Au, Ag, Cu, Li, Steel, ABS)...',
  'Estimating labor costs: $25/hr, 2 units/hr disassembly rate...',
  'Computing logistics, compliance, and warehousing overhead...',
  'Generating teardown topology and financial analysis...',
];

export const aiAnalysisResult = `**Analysis Complete — Roborock S7 (500 units)**

Product identified as Roborock S7 Robot Vacuum (3.7 kg/unit).

Teardown topology generated with **7 major assemblies** and **42 recoverable components**.

Key findings:
• 17 components identified as third-party tradable
• 20 components recoverable as raw materials
• 4 components require brand destruction (IP compliance)
• 4 components non-recyclable (filters, rubber seals)

The teardown flow diagram and financial analysis are now available on the right panel.`;

// ============================================================
// TEARDOWN TREE — Enhanced with deep hierarchical breakdowns
// ============================================================

export const teardownTree: TeardownNode = {
  id: 'root',
  label: 'Roborock S7',
  labelCn: '整机',
  category: 'root',
  weight: '3,700 g',
  status: 'raw-material',
  children: [
    // ── 1. TOP ASSEMBLY ──
    {
      id: 'top-assembly',
      label: 'Top Assembly',
      labelCn: '上部组件',
      category: 'assembly',
      status: 'raw-material',
      children: [
        {
          id: 'top-cover',
          label: 'Top Cover Shell',
          labelCn: 'ABS/PC 注塑外壳',
          category: 'component',
          material: 'ABS/PC Plastic',
          weight: '280 g',
          status: 'destroy-brand',
        },
        {
          id: 'top-bumper-ring',
          label: 'Bumper Ring',
          labelCn: 'TPU 防撞环',
          category: 'component',
          material: 'TPU Rubber',
          weight: '65 g',
          status: 'raw-material',
        },
        {
          id: 'top-decorative-panel',
          label: 'Decorative Panel',
          labelCn: 'PMMA 装饰面板',
          category: 'component',
          material: 'PMMA Acrylic',
          weight: '35 g',
          status: 'destroy-brand',
        },
        {
          id: 'lidar-module',
          label: 'LiDAR Module',
          labelCn: '激光雷达模块',
          category: 'subassembly',
          status: 'raw-material',
          children: [
            {
              id: 'lidar-turret-housing',
              label: 'LiDAR Turret Housing',
              labelCn: 'PC/PMMA 光学塑料罩',
              category: 'component',
              material: 'PC / PMMA Plastic',
              weight: '55 g',
              status: 'raw-material',
            },
            {
              id: 'lidar-pcb',
              label: 'LiDAR Control PCB',
              labelCn: 'STM32 雷达控制板',
              category: 'component',
              material: 'High-grade PCB (Cu/Au)',
              weight: '25 g',
              status: 'destroy-brand',
            },
            {
              id: 'lidar-motor',
              label: 'LiDAR Rotation Motor',
              labelCn: 'Nidec 无铁芯直流电机',
              category: 'component',
              material: 'Coreless DC Motor',
              weight: '12 g',
              status: 'third-party',
              sellableValue: 1.20,
            },
            {
              id: 'lidar-laser-diode',
              label: 'Laser Diode + Lens',
              labelCn: '905nm 激光二极管',
              category: 'component',
              material: 'GaAs Semiconductor',
              weight: '3 g',
              status: 'third-party',
              sellableValue: 0.80,
            },
            {
              id: 'lidar-encoder',
              label: 'Optical Encoder Disc',
              labelCn: '光学编码盘',
              category: 'component',
              material: 'Glass / Metal',
              weight: '5 g',
              status: 'raw-material',
            },
          ],
        },
      ],
    },

    // ── 2. SENSOR SYSTEM ──
    {
      id: 'sensor-system',
      label: 'Sensor System',
      labelCn: '传感系统',
      category: 'assembly',
      status: 'raw-material',
      children: [
        {
          id: 'bumper-switch-array',
          label: 'Bumper Switch Array (x3)',
          labelCn: 'Omron 微动开关组',
          category: 'component',
          material: 'Omron D2FC-F-type',
          weight: '8 g',
          status: 'third-party',
          sellableValue: 0.60,
        },
        {
          id: 'cliff-sensor-board',
          label: 'Cliff Sensor Board (x4)',
          labelCn: 'IR 悬崖传感板',
          category: 'component',
          material: 'IR Reflective Sensor PCB',
          weight: '12 g',
          status: 'third-party',
          sellableValue: 0.80,
        },
        {
          id: 'wall-sensor',
          label: 'Wall Following Sensor',
          labelCn: '沿墙传感器',
          category: 'component',
          material: 'IR Proximity Sensor',
          weight: '5 g',
          status: 'third-party',
          sellableValue: 0.30,
        },
        {
          id: 'carpet-sensor',
          label: 'Carpet Detection Sensor',
          labelCn: '地毯检测传感器',
          category: 'component',
          material: 'Ultrasonic Sensor Module',
          weight: '8 g',
          status: 'third-party',
          sellableValue: 0.50,
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
        {
          id: 'sensor-flex-cable',
          label: 'Sensor Flex Cable',
          labelCn: 'FPC 柔性排线',
          category: 'component',
          material: 'Polyimide / Copper FPC',
          weight: '4 g',
          status: 'raw-material',
        },
      ],
    },

    // ── 3. STRUCTURAL CHASSIS ──
    {
      id: 'bottom-assembly',
      label: 'Structural Chassis',
      labelCn: '结构底盘',
      category: 'assembly',
      status: 'raw-material',
      children: [
        {
          id: 'bottom-chassis',
          label: 'Bottom Chassis Plate',
          labelCn: '增强 ABS 底板',
          category: 'component',
          material: 'Glass-filled ABS Plastic',
          weight: '350 g',
          status: 'raw-material',
        },
        {
          id: 'metal-weight-plate',
          label: 'Metal Weight Plate',
          labelCn: '冲压钢配重板',
          category: 'component',
          material: 'Cold-rolled Steel',
          weight: '120 g',
          status: 'raw-material',
        },
        {
          id: 'aluminum-heatsink',
          label: 'Aluminum Heat Sink',
          labelCn: '铝合金散热片',
          category: 'component',
          material: 'Aluminum 6061',
          weight: '45 g',
          status: 'raw-material',
        },
        {
          id: 'rubber-feet',
          label: 'Anti-vibration Rubber Feet (x4)',
          labelCn: '减震橡胶脚垫',
          category: 'component',
          material: 'Silicone Rubber',
          weight: '12 g',
          status: 'non-recyclable',
        },
        {
          id: 'screw-fastener-set',
          label: 'Screw & Fastener Set',
          labelCn: '螺丝紧固件组',
          category: 'component',
          material: 'Stainless Steel',
          weight: '30 g',
          status: 'raw-material',
        },
      ],
    },

    // ── 4. POWER SYSTEM ──
    {
      id: 'power-system',
      label: 'Power System',
      labelCn: '能源系统',
      category: 'assembly',
      status: 'raw-material',
      children: [
        {
          id: 'battery-pack',
          label: 'Battery Pack',
          labelCn: '锂电池组',
          category: 'subassembly',
          status: 'raw-material-hazmat',
          children: [
            {
              id: 'battery-cells',
              label: 'Li-ion Cells (18650 x6)',
              labelCn: 'ATL/Sunwoda 锂电芯',
              category: 'component',
              material: 'Li-ion NMC (Ni/Co/Mn)',
              weight: '240 g',
              status: 'raw-material-hazmat',
            },
            {
              id: 'battery-nickel-strips',
              label: 'Nickel Welding Strips',
              labelCn: '镍片焊接条',
              category: 'component',
              material: 'Pure Nickel Strip',
              weight: '8 g',
              status: 'raw-material',
            },
            {
              id: 'battery-enclosure',
              label: 'Battery Enclosure',
              labelCn: 'ABS + 薄钢壳',
              category: 'component',
              material: 'ABS Plastic + Steel',
              weight: '55 g',
              status: 'raw-material',
            },
          ],
        },
        {
          id: 'bms-board',
          label: 'BMS Control Board',
          labelCn: 'TI BQ40Z50 电池管理板',
          category: 'component',
          material: 'PCB (Cu/Au)',
          weight: '18 g',
          status: 'destroy-brand',
        },
        {
          id: 'battery-harness',
          label: 'Battery Wiring Harness',
          labelCn: 'JST 接插件线束',
          category: 'component',
          material: 'Copper Wiring + JST Connectors',
          weight: '15 g',
          status: 'third-party',
          sellableValue: 0.50,
        },
        {
          id: 'charging-contacts',
          label: 'Charging Contact Pins',
          labelCn: '充电触点弹簧针',
          category: 'component',
          material: 'Gold-plated Copper Spring Pins',
          weight: '6 g',
          status: 'raw-material',
        },
        {
          id: 'power-regulator',
          label: 'DC-DC Power Regulator',
          labelCn: 'DC-DC 电压调节器',
          category: 'component',
          material: 'PCB Module',
          weight: '10 g',
          status: 'third-party',
          sellableValue: 0.40,
        },
      ],
    },

    // ── 5. DRIVE & MOTION SYSTEM ──
    {
      id: 'drive-system',
      label: 'Drive & Motion System',
      labelCn: '驱动与运动系统',
      category: 'assembly',
      status: 'raw-material',
      children: [
        {
          id: 'wheel-module-left',
          label: 'Left Wheel Module',
          labelCn: '左轮模组',
          category: 'subassembly',
          status: 'raw-material',
          children: [
            {
              id: 'wheel-motor-left',
              label: 'DC Drive Motor',
              labelCn: 'Mabuchi RS 直流电机',
              category: 'component',
              material: 'Mabuchi RS-series DC Motor',
              weight: '32 g',
              status: 'third-party',
              sellableValue: 1.50,
            },
            {
              id: 'wheel-gearbox-left',
              label: 'Planetary Gearbox',
              labelCn: '行星齿轮箱',
              category: 'component',
              material: 'Powder-metal Steel',
              weight: '22 g',
              status: 'third-party',
              sellableValue: 0.40,
            },
            {
              id: 'wheel-encoder-left',
              label: 'Rotary Encoder',
              labelCn: '旋转编码器',
              category: 'component',
              material: 'Hall Effect Sensor PCB',
              weight: '5 g',
              status: 'raw-material',
            },
            {
              id: 'wheel-tire-left',
              label: 'Rubber Tire',
              labelCn: '橡胶轮胎',
              category: 'component',
              material: 'TPR Rubber',
              weight: '18 g',
              status: 'non-recyclable',
            },
          ],
        },
        {
          id: 'wheel-module-right',
          label: 'Right Wheel Module',
          labelCn: '右轮模组',
          category: 'subassembly',
          status: 'raw-material',
          children: [
            {
              id: 'wheel-motor-right',
              label: 'DC Drive Motor',
              labelCn: 'Mabuchi RS 直流电机',
              category: 'component',
              material: 'Mabuchi RS-series DC Motor',
              weight: '32 g',
              status: 'third-party',
              sellableValue: 1.50,
            },
            {
              id: 'wheel-gearbox-right',
              label: 'Planetary Gearbox',
              labelCn: '行星齿轮箱',
              category: 'component',
              material: 'Powder-metal Steel',
              weight: '22 g',
              status: 'third-party',
              sellableValue: 0.40,
            },
            {
              id: 'wheel-encoder-right',
              label: 'Rotary Encoder',
              labelCn: '旋转编码器',
              category: 'component',
              material: 'Hall Effect Sensor PCB',
              weight: '5 g',
              status: 'raw-material',
            },
            {
              id: 'wheel-tire-right',
              label: 'Rubber Tire',
              labelCn: '橡胶轮胎',
              category: 'component',
              material: 'TPR Rubber',
              weight: '18 g',
              status: 'non-recyclable',
            },
          ],
        },
        {
          id: 'caster-wheel',
          label: 'Front Caster Wheel',
          labelCn: '前万向轮',
          category: 'component',
          material: 'Nylon + Steel Bearing',
          weight: '25 g',
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
          id: 'side-brush-arm',
          label: 'Side Brush Arm',
          labelCn: '侧刷臂',
          category: 'component',
          material: 'ABS Plastic',
          weight: '15 g',
          status: 'raw-material',
        },
      ],
    },

    // ── 6. CLEANING & SUCTION SYSTEM ──
    {
      id: 'cleaning-system',
      label: 'Cleaning & Suction System',
      labelCn: '清洁与吸尘系统',
      category: 'assembly',
      status: 'raw-material',
      children: [
        {
          id: 'suction-motor',
          label: 'Suction Fan Motor (BLDC)',
          labelCn: '高速 BLDC 风机',
          category: 'component',
          material: 'High-speed BLDC Motor',
          weight: '55 g',
          status: 'third-party',
          sellableValue: 2.00,
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
          id: 'main-brush-roller',
          label: 'Main Brush Roller',
          labelCn: '主刷滚筒',
          category: 'subassembly',
          status: 'raw-material',
          children: [
            {
              id: 'roller-shaft',
              label: 'Roller Steel Shaft',
              labelCn: '钢轴',
              category: 'component',
              material: 'Stainless Steel',
              weight: '35 g',
              status: 'raw-material',
            },
            {
              id: 'rubber-brush-strip',
              label: 'Rubber Brush Strip',
              labelCn: 'TPE 橡胶刷条',
              category: 'component',
              material: 'TPE / Rubber Composite',
              weight: '30 g',
              status: 'non-recyclable',
            },
            {
              id: 'brush-end-caps',
              label: 'Brush End Caps (x2)',
              labelCn: 'ABS 端盖',
              category: 'component',
              material: 'ABS Plastic',
              weight: '10 g',
              status: 'raw-material',
            },
          ],
        },
        {
          id: 'mop-module',
          label: 'Sonic Mop Module',
          labelCn: '声波拖地模块',
          category: 'subassembly',
          status: 'raw-material',
          children: [
            {
              id: 'mop-vibration-motor',
              label: 'Sonic Vibration Motor',
              labelCn: '声波振动电机',
              category: 'component',
              material: 'Linear Resonant Actuator',
              weight: '20 g',
              status: 'third-party',
              sellableValue: 1.00,
            },
            {
              id: 'mop-plate',
              label: 'Mop Mounting Plate',
              labelCn: '拖布安装板',
              category: 'component',
              material: 'ABS Plastic',
              weight: '40 g',
              status: 'raw-material',
            },
            {
              id: 'mop-spring-mechanism',
              label: 'Mop Lift Spring',
              labelCn: '拖布升降弹簧',
              category: 'component',
              material: 'Spring Steel',
              weight: '8 g',
              status: 'raw-material',
            },
          ],
        },
        {
          id: 'dust-bin',
          label: 'Dust Bin',
          labelCn: '透明 PC 塑料尘盒',
          category: 'component',
          material: 'PC Plastic',
          weight: '95 g',
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
        {
          id: 'dust-bin-seal',
          label: 'Dust Bin Rubber Seal',
          labelCn: '尘盒密封圈',
          category: 'component',
          material: 'Silicone Rubber',
          weight: '5 g',
          status: 'raw-material',
        },
        {
          id: 'brush-frame',
          label: 'Brush Frame Housing',
          labelCn: 'ABS 塑料框架',
          category: 'component',
          material: 'ABS Plastic',
          weight: '55 g',
          status: 'raw-material',
        },
      ],
    },

    // ── 7. CONTROL & ELECTRONICS ──
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
          material: 'High-grade PCB (Cu/Au/Ag)',
          weight: '45 g',
          status: 'destroy-brand',
        },
        {
          id: 'wifi-module',
          label: 'Wi-Fi / BLE Module',
          labelCn: 'ESP32 无线模块',
          category: 'component',
          material: 'RF Module PCB',
          weight: '5 g',
          status: 'third-party',
          sellableValue: 0.60,
        },
        {
          id: 'speaker-unit',
          label: 'Speaker Unit',
          labelCn: '扬声器',
          category: 'component',
          material: 'Neodymium Magnet Speaker',
          weight: '12 g',
          status: 'raw-material',
        },
        {
          id: 'internal-wiring',
          label: 'Internal Wiring Harness',
          labelCn: 'PVC 包覆铜线束',
          category: 'component',
          material: 'PVC-insulated Copper Wiring',
          weight: '35 g',
          status: 'raw-material',
        },
        {
          id: 'led-indicator-board',
          label: 'LED Indicator Board',
          labelCn: 'LED 指示灯板',
          category: 'component',
          material: 'PCB + SMD LEDs',
          weight: '5 g',
          status: 'raw-material',
        },
        {
          id: 'button-panel',
          label: 'Button Panel',
          labelCn: '按键面板',
          category: 'component',
          material: 'Silicone + ABS',
          weight: '8 g',
          status: 'raw-material',
        },
      ],
    },
  ],
};

// ============================================================
// TRADING MODE — Sellable Parts Revenue (updated for enhanced tree)
// ============================================================

export const tradingSellableParts: SellablePartRow[] = [
  { component: 'LiDAR Rotation Motor (Nidec Coreless)', qty: 1, unitValue: 1.20, subtotal: 1.20, notes: 'Coreless DC motor', assembly: 'LiDAR Module' },
  { component: 'Laser Diode + Lens Assembly', qty: 1, unitValue: 0.80, subtotal: 0.80, notes: '905nm GaAs', assembly: 'LiDAR Module' },
  { component: 'Bumper Switch Array (Omron x3)', qty: 3, unitValue: 0.20, subtotal: 0.60, notes: 'Omron D2FC-F', assembly: 'Sensor System' },
  { component: 'Cliff Sensor Board (x4)', qty: 4, unitValue: 0.20, subtotal: 0.80, notes: 'Sharp/Everlight IR', assembly: 'Sensor System' },
  { component: 'Wall Following Sensor', qty: 1, unitValue: 0.30, subtotal: 0.30, notes: 'IR proximity', assembly: 'Sensor System' },
  { component: 'Carpet Detection Sensor', qty: 1, unitValue: 0.50, subtotal: 0.50, notes: 'Ultrasonic', assembly: 'Sensor System' },
  { component: 'Battery Wiring Harness (JST)', qty: 1, unitValue: 0.50, subtotal: 0.50, notes: 'JST connectors', assembly: 'Power System' },
  { component: 'DC-DC Power Regulator', qty: 1, unitValue: 0.40, subtotal: 0.40, notes: 'Step-down module', assembly: 'Power System' },
  { component: 'Mabuchi DC Drive Motor (L)', qty: 1, unitValue: 1.50, subtotal: 1.50, notes: 'Mabuchi RS-series', assembly: 'Left Wheel' },
  { component: 'Planetary Gearbox (L)', qty: 1, unitValue: 0.40, subtotal: 0.40, notes: 'Powder metal', assembly: 'Left Wheel' },
  { component: 'Mabuchi DC Drive Motor (R)', qty: 1, unitValue: 1.50, subtotal: 1.50, notes: 'Mabuchi RS-series', assembly: 'Right Wheel' },
  { component: 'Planetary Gearbox (R)', qty: 1, unitValue: 0.40, subtotal: 0.40, notes: 'Powder metal', assembly: 'Right Wheel' },
  { component: 'N20 Side Brush Motor', qty: 1, unitValue: 0.80, subtotal: 0.80, notes: 'N20-class micro', assembly: 'Drive System' },
  { component: 'BLDC Suction Fan Motor', qty: 1, unitValue: 2.00, subtotal: 2.00, notes: 'High-speed BLDC', assembly: 'Cleaning System' },
  { component: 'Johnson Main Brush Motor', qty: 1, unitValue: 1.20, subtotal: 1.20, notes: 'Johnson-type DC', assembly: 'Cleaning System' },
  { component: 'Sonic Vibration Motor', qty: 1, unitValue: 1.00, subtotal: 1.00, notes: 'Linear resonant', assembly: 'Mop Module' },
  { component: 'Wi-Fi / BLE Module (ESP32)', qty: 1, unitValue: 0.60, subtotal: 0.60, notes: 'RF module', assembly: 'Control Electronics' },
];

export const tradingSellablePartsTotal = 14.50;
export const tradingSellablePartsBatch = 7250.00;

// ============================================================
// RAW MATERIAL RECOVERY (updated for enhanced tree)
// ============================================================

export const rawMaterialRecovery: RawMaterialRow[] = [
  { category: 'Plastics', material: 'ABS / Glass-filled ABS', weightKg: 0.850, unitPrice: '$0.35/kg', revenue: 0.30 },
  { category: 'Plastics', material: 'PC / PMMA / Acrylic', weightKg: 0.185, unitPrice: '$0.60/kg', revenue: 0.11 },
  { category: 'Plastics', material: 'TPU / Nylon / Silicone', weightKg: 0.110, unitPrice: '$0.25/kg', revenue: 0.03 },
  { category: 'Structural Metals', material: 'Steel (cold-rolled + stainless)', weightKg: 0.255, unitPrice: '$0.20/kg', revenue: 0.05 },
  { category: 'Structural Metals', material: 'Aluminum 6061', weightKg: 0.045, unitPrice: '$1.80/kg', revenue: 0.08 },
  { category: 'Battery Materials', material: 'Li-ion NMC (Ni/Co/Mn)', weightKg: 0.240, unitPrice: '$2.20/kg', revenue: 0.53 },
  { category: 'Battery Materials', material: 'Nickel Strip', weightKg: 0.008, unitPrice: '$15.00/kg', revenue: 0.12 },
  { category: 'PCB Metals', material: 'Gold (Au)', weightKg: 0.0000216, unitPrice: '$70/g', revenue: 1.51 },
  { category: 'PCB Metals', material: 'Silver (Ag)', weightKg: 0.000086, unitPrice: '$0.80/g', revenue: 0.07 },
  { category: 'PCB Metals', material: 'Copper (Cu) — wiring + PCB', weightKg: 0.028, unitPrice: '$9.00/kg', revenue: 0.25 },
  { category: 'Magnets', material: 'Neodymium (NdFeB)', weightKg: 0.005, unitPrice: '$25.00/kg', revenue: 0.13 },
];

export const rawMaterialTotal = 3.18;
export const rawMaterialBatch = 1590.00;

// ============================================================
// TRADING MODE — Total Recovery
// ============================================================

export const tradingTotalRecovery = [
  { source: 'Sellable Parts', value: 14.50 },
  { source: 'Raw Materials', value: 3.18 },
];
export const tradingTotalRecoverablePerUnit = 17.68;
export const tradingTotalRecoverableBatch = 8840.00;

// ============================================================
// COST BREAKDOWN (shared base)
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
  { item: 'Revenue from Robots (Recovered Assets)', total: 8840 },
  { item: 'Total Revenue', total: 28840 },
  { item: 'Total Cost', total: -13000, isNegative: true },
  { item: 'Total Profit', total: 15840 },
];

export const tradingDealSummary: DealSummaryRow[] = [
  { item: 'Revenue from Sellable Parts', total: 7250 },
  { item: 'Revenue from Raw Materials', total: 1590 },
  { item: 'Total Revenue', total: 8840 },
  { item: 'Total Cost', total: -10000, isNegative: true },
  { item: 'Buyout Price to Client', total: -3500, isNegative: true },
  { item: 'Net Position', total: -4660 },
];

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

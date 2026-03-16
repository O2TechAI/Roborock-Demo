/**
 * O2 AI Demo — Complete Data Model
 * 
 * Based on real Roborock S7 teardown.
 * Two modes: Service Fee (raw material only) and Trading (parts resale + raw material).
 * Teardown tree is shared; financial tables differ by mode.
 * Deep hierarchical breakdowns (4-5 levels) with realistic material science.
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
// AI THINKING STEPS
// ============================================================

export const aiThinkingSteps: string[] = [
  'Identifying product: Roborock S7 Robot Vacuum...',
  'Loading component database for Roborock S7 (3.7 kg, 7 major assemblies)...',
  'Analyzing teardown topology: 7 assemblies, 58 sub-components identified...',
  'Cross-referencing component market prices (Q1 2026 spot rates)...',
  'Calculating raw material recovery values (Au, Ag, Cu, Li, Steel, ABS)...',
  'Estimating labor costs: $25/hr, 2 units/hr disassembly rate...',
  'Computing logistics, compliance, and warehousing overhead...',
  'Generating teardown topology and financial analysis...',
];

export const aiAnalysisResult = `**Analysis Complete — Roborock S7 (500 units)**

Product identified as Roborock S7 Robot Vacuum (3.7 kg/unit).

Teardown topology generated with **7 major assemblies** and **58 recoverable components** across 4-5 hierarchy levels.

Key findings:
• 19 components identified as third-party tradable
• 28 components recoverable as raw materials
• 6 components require brand destruction (IP compliance)
• 5 components non-recyclable (filters, rubber seals, worn consumables)

The teardown flow diagram and financial analysis are now available on the right panel.`;

// ============================================================
// TEARDOWN TREE — Deep hierarchical breakdowns (4-5 levels)
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
              category: 'subassembly',
              status: 'destroy-brand',
              children: [
                {
                  id: 'lidar-pcb-stm32',
                  label: 'STM32 MCU',
                  labelCn: 'STM32F103 微控制器',
                  category: 'component',
                  material: 'Silicon Die / BGA Package',
                  weight: '2 g',
                  status: 'destroy-brand',
                },
                {
                  id: 'lidar-pcb-substrate',
                  label: 'PCB Substrate (4-layer)',
                  labelCn: 'FR4 四层板基板',
                  category: 'component',
                  material: 'FR4 Epoxy / Cu traces',
                  weight: '18 g',
                  status: 'raw-material',
                },
                {
                  id: 'lidar-pcb-passives',
                  label: 'SMD Passives (R/C/L)',
                  labelCn: '贴片阻容感',
                  category: 'component',
                  material: 'Ceramic / Copper',
                  weight: '5 g',
                  status: 'raw-material',
                },
              ],
            },
            {
              id: 'lidar-motor',
              label: 'LiDAR Rotation Motor',
              labelCn: 'Nidec 无铁芯直流电机',
              category: 'subassembly',
              status: 'third-party',
              sellableValue: 1.20,
              children: [
                {
                  id: 'lidar-motor-stator',
                  label: 'Stator Coil Assembly',
                  labelCn: '定子线圈组件',
                  category: 'component',
                  material: 'Copper Magnet Wire',
                  weight: '4 g',
                  status: 'raw-material',
                },
                {
                  id: 'lidar-motor-rotor',
                  label: 'Rotor + NdFeB Magnets',
                  labelCn: '转子 + 钕铁硼磁铁',
                  category: 'component',
                  material: 'NdFeB Permanent Magnet',
                  weight: '3 g',
                  status: 'raw-material',
                },
                {
                  id: 'lidar-motor-bearings',
                  label: 'Micro Ball Bearings (x2)',
                  labelCn: '微型滚珠轴承',
                  category: 'component',
                  material: 'Chrome Steel (52100)',
                  weight: '2 g',
                  status: 'raw-material',
                },
                {
                  id: 'lidar-motor-housing',
                  label: 'Motor Housing',
                  labelCn: '电机外壳',
                  category: 'component',
                  material: 'Zinc Alloy Die-cast',
                  weight: '3 g',
                  status: 'raw-material',
                },
              ],
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
            {
              id: 'lidar-photodetector',
              label: 'APD Photodetector',
              labelCn: '雪崩光电二极管',
              category: 'component',
              material: 'InGaAs Semiconductor',
              weight: '1 g',
              status: 'third-party',
              sellableValue: 0.50,
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
          category: 'subassembly',
          status: 'third-party',
          sellableValue: 0.80,
          children: [
            {
              id: 'cliff-ir-emitter',
              label: 'IR LED Emitters (x4)',
              labelCn: '红外发射管',
              category: 'component',
              material: 'GaAlAs IR LED',
              weight: '2 g',
              status: 'raw-material',
            },
            {
              id: 'cliff-phototransistor',
              label: 'Phototransistors (x4)',
              labelCn: '光电晶体管',
              category: 'component',
              material: 'Silicon Phototransistor',
              weight: '2 g',
              status: 'raw-material',
            },
            {
              id: 'cliff-pcb',
              label: 'Cliff Sensor PCB',
              labelCn: '悬崖传感器电路板',
              category: 'component',
              material: 'FR4 PCB / Cu',
              weight: '8 g',
              status: 'raw-material',
            },
          ],
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
          category: 'subassembly',
          status: 'third-party',
          sellableValue: 0.50,
          children: [
            {
              id: 'carpet-piezo',
              label: 'Piezoelectric Transducer',
              labelCn: '压电换能器',
              category: 'component',
              material: 'PZT Ceramic',
              weight: '3 g',
              status: 'raw-material',
            },
            {
              id: 'carpet-driver-ic',
              label: 'Ultrasonic Driver IC',
              labelCn: '超声波驱动芯片',
              category: 'component',
              material: 'Silicon IC',
              weight: '1 g',
              status: 'raw-material',
            },
            {
              id: 'carpet-housing',
              label: 'Sensor Housing',
              labelCn: '传感器外壳',
              category: 'component',
              material: 'ABS Plastic',
              weight: '4 g',
              status: 'raw-material',
            },
          ],
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
              category: 'subassembly',
              status: 'raw-material-hazmat',
              children: [
                {
                  id: 'cell-cathode',
                  label: 'Cathode (NMC 622)',
                  labelCn: '正极 (镍锰钴)',
                  category: 'component',
                  material: 'LiNi₀.₆Mn₀.₂Co₀.₂O₂',
                  weight: '96 g',
                  status: 'raw-material-hazmat',
                },
                {
                  id: 'cell-anode',
                  label: 'Anode (Graphite)',
                  labelCn: '负极 (石墨)',
                  category: 'component',
                  material: 'Synthetic Graphite',
                  weight: '60 g',
                  status: 'raw-material',
                },
                {
                  id: 'cell-separator',
                  label: 'Separator Film',
                  labelCn: '隔膜',
                  category: 'component',
                  material: 'PE/PP Microporous Film',
                  weight: '12 g',
                  status: 'non-recyclable',
                },
                {
                  id: 'cell-electrolyte',
                  label: 'Electrolyte (LiPF₆)',
                  labelCn: '电解液',
                  category: 'component',
                  material: 'LiPF₆ in EC/DMC Solvent',
                  weight: '36 g',
                  status: 'raw-material-hazmat',
                },
                {
                  id: 'cell-casing',
                  label: 'Cell Steel Casing (x6)',
                  labelCn: '电芯钢壳',
                  category: 'component',
                  material: 'Nickel-plated Steel',
                  weight: '36 g',
                  status: 'raw-material',
                },
              ],
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
            {
              id: 'battery-thermal-pad',
              label: 'Thermal Interface Pad',
              labelCn: '导热硅胶垫',
              category: 'component',
              material: 'Silicone Thermal Pad',
              weight: '6 g',
              status: 'non-recyclable',
            },
          ],
        },
        {
          id: 'bms-board',
          label: 'BMS Control Board',
          labelCn: 'TI BQ40Z50 电池管理板',
          category: 'subassembly',
          status: 'destroy-brand',
          children: [
            {
              id: 'bms-ic',
              label: 'BMS IC (TI BQ40Z50)',
              labelCn: '电池管理芯片',
              category: 'component',
              material: 'Silicon IC / QFN Package',
              weight: '1 g',
              status: 'destroy-brand',
            },
            {
              id: 'bms-mosfets',
              label: 'Power MOSFETs (x4)',
              labelCn: '功率场效应管',
              category: 'component',
              material: 'Silicon / D-PAK',
              weight: '3 g',
              status: 'raw-material',
            },
            {
              id: 'bms-thermistors',
              label: 'NTC Thermistors (x2)',
              labelCn: 'NTC 热敏电阻',
              category: 'component',
              material: 'NTC Ceramic',
              weight: '1 g',
              status: 'raw-material',
            },
            {
              id: 'bms-pcb-substrate',
              label: 'BMS PCB Substrate',
              labelCn: 'BMS 电路板基板',
              category: 'component',
              material: 'FR4 PCB / Cu / Au',
              weight: '13 g',
              status: 'raw-material',
            },
          ],
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
              category: 'subassembly',
              status: 'third-party',
              sellableValue: 1.50,
              children: [
                {
                  id: 'wml-motor-armature',
                  label: 'Armature (Copper Windings)',
                  labelCn: '电枢铜绕组',
                  category: 'component',
                  material: 'Copper Magnet Wire',
                  weight: '10 g',
                  status: 'raw-material',
                },
                {
                  id: 'wml-motor-magnets',
                  label: 'Ferrite Magnets (x2)',
                  labelCn: '铁氧体磁铁',
                  category: 'component',
                  material: 'Strontium Ferrite',
                  weight: '8 g',
                  status: 'raw-material',
                },
                {
                  id: 'wml-motor-brushes',
                  label: 'Carbon Brushes (x2)',
                  labelCn: '碳刷',
                  category: 'component',
                  material: 'Carbon / Graphite',
                  weight: '2 g',
                  status: 'non-recyclable',
                },
                {
                  id: 'wml-motor-shaft',
                  label: 'Output Shaft',
                  labelCn: '输出轴',
                  category: 'component',
                  material: 'Hardened Steel',
                  weight: '5 g',
                  status: 'raw-material',
                },
                {
                  id: 'wml-motor-housing',
                  label: 'Motor Can',
                  labelCn: '电机外壳',
                  category: 'component',
                  material: 'Cold-rolled Steel',
                  weight: '7 g',
                  status: 'raw-material',
                },
              ],
            },
            {
              id: 'wheel-gearbox-left',
              label: 'Planetary Gearbox',
              labelCn: '行星齿轮箱',
              category: 'subassembly',
              status: 'third-party',
              sellableValue: 0.40,
              children: [
                {
                  id: 'wgl-sun-gear',
                  label: 'Sun Gear',
                  labelCn: '太阳齿轮',
                  category: 'component',
                  material: 'Powder-metal Steel',
                  weight: '4 g',
                  status: 'raw-material',
                },
                {
                  id: 'wgl-planet-gears',
                  label: 'Planet Gears (x3)',
                  labelCn: '行星齿轮',
                  category: 'component',
                  material: 'Powder-metal Steel',
                  weight: '9 g',
                  status: 'raw-material',
                },
                {
                  id: 'wgl-ring-gear',
                  label: 'Ring Gear + Housing',
                  labelCn: '齿圈 + 壳体',
                  category: 'component',
                  material: 'POM Plastic + Steel',
                  weight: '9 g',
                  status: 'raw-material',
                },
              ],
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
              label: 'Rubber Tire + Hub',
              labelCn: '橡胶轮胎 + 轮毂',
              category: 'component',
              material: 'TPR Rubber / ABS Hub',
              weight: '18 g',
              status: 'raw-material',
            },
            {
              id: 'wheel-spring-left',
              label: 'Suspension Spring',
              labelCn: '悬挂弹簧',
              category: 'component',
              material: 'Spring Steel',
              weight: '5 g',
              status: 'raw-material',
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
              category: 'subassembly',
              status: 'third-party',
              sellableValue: 1.50,
              children: [
                {
                  id: 'wmr-motor-armature',
                  label: 'Armature (Copper Windings)',
                  labelCn: '电枢铜绕组',
                  category: 'component',
                  material: 'Copper Magnet Wire',
                  weight: '10 g',
                  status: 'raw-material',
                },
                {
                  id: 'wmr-motor-magnets',
                  label: 'Ferrite Magnets (x2)',
                  labelCn: '铁氧体磁铁',
                  category: 'component',
                  material: 'Strontium Ferrite',
                  weight: '8 g',
                  status: 'raw-material',
                },
                {
                  id: 'wmr-motor-brushes',
                  label: 'Carbon Brushes (x2)',
                  labelCn: '碳刷',
                  category: 'component',
                  material: 'Carbon / Graphite',
                  weight: '2 g',
                  status: 'non-recyclable',
                },
                {
                  id: 'wmr-motor-shaft',
                  label: 'Output Shaft',
                  labelCn: '输出轴',
                  category: 'component',
                  material: 'Hardened Steel',
                  weight: '5 g',
                  status: 'raw-material',
                },
                {
                  id: 'wmr-motor-housing',
                  label: 'Motor Can',
                  labelCn: '电机外壳',
                  category: 'component',
                  material: 'Cold-rolled Steel',
                  weight: '7 g',
                  status: 'raw-material',
                },
              ],
            },
            {
              id: 'wheel-gearbox-right',
              label: 'Planetary Gearbox',
              labelCn: '行星齿轮箱',
              category: 'subassembly',
              status: 'third-party',
              sellableValue: 0.40,
              children: [
                {
                  id: 'wgr-sun-gear',
                  label: 'Sun Gear',
                  labelCn: '太阳齿轮',
                  category: 'component',
                  material: 'Powder-metal Steel',
                  weight: '4 g',
                  status: 'raw-material',
                },
                {
                  id: 'wgr-planet-gears',
                  label: 'Planet Gears (x3)',
                  labelCn: '行星齿轮',
                  category: 'component',
                  material: 'Powder-metal Steel',
                  weight: '9 g',
                  status: 'raw-material',
                },
                {
                  id: 'wgr-ring-gear',
                  label: 'Ring Gear + Housing',
                  labelCn: '齿圈 + 壳体',
                  category: 'component',
                  material: 'POM Plastic + Steel',
                  weight: '9 g',
                  status: 'raw-material',
                },
              ],
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
              label: 'Rubber Tire + Hub',
              labelCn: '橡胶轮胎 + 轮毂',
              category: 'component',
              material: 'TPR Rubber / ABS Hub',
              weight: '18 g',
              status: 'raw-material',
            },
            {
              id: 'wheel-spring-right',
              label: 'Suspension Spring',
              labelCn: '悬挂弹簧',
              category: 'component',
              material: 'Spring Steel',
              weight: '5 g',
              status: 'raw-material',
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
          category: 'subassembly',
          status: 'third-party',
          sellableValue: 2.00,
          children: [
            {
              id: 'bldc-stator',
              label: 'Stator (Laminated Core + Windings)',
              labelCn: '定子 (叠片铁芯 + 绕组)',
              category: 'component',
              material: 'Silicon Steel / Copper',
              weight: '18 g',
              status: 'raw-material',
            },
            {
              id: 'bldc-rotor',
              label: 'Rotor (NdFeB Magnets)',
              labelCn: '转子 (钕铁硼磁铁)',
              category: 'component',
              material: 'NdFeB Permanent Magnet',
              weight: '8 g',
              status: 'raw-material',
            },
            {
              id: 'bldc-impeller',
              label: 'Impeller Fan Blade',
              labelCn: '叶轮扇叶',
              category: 'component',
              material: 'Aluminum Alloy',
              weight: '12 g',
              status: 'raw-material',
            },
            {
              id: 'bldc-driver-pcb',
              label: 'ESC Driver Board',
              labelCn: '电调驱动板',
              category: 'component',
              material: 'PCB / MOSFETs',
              weight: '8 g',
              status: 'raw-material',
            },
            {
              id: 'bldc-bearings',
              label: 'Ceramic Ball Bearings (x2)',
              labelCn: '陶瓷滚珠轴承',
              category: 'component',
              material: 'Si₃N₄ Ceramic / Steel',
              weight: '4 g',
              status: 'raw-material',
            },
            {
              id: 'bldc-housing',
              label: 'Motor Housing + Volute',
              labelCn: '电机壳 + 蜗壳',
              category: 'component',
              material: 'ABS Plastic',
              weight: '5 g',
              status: 'raw-material',
            },
          ],
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
              category: 'subassembly',
              status: 'third-party',
              sellableValue: 1.00,
              children: [
                {
                  id: 'mop-lra-coil',
                  label: 'Voice Coil',
                  labelCn: '音圈',
                  category: 'component',
                  material: 'Copper Magnet Wire',
                  weight: '5 g',
                  status: 'raw-material',
                },
                {
                  id: 'mop-lra-magnet',
                  label: 'NdFeB Magnet',
                  labelCn: '钕铁硼磁铁',
                  category: 'component',
                  material: 'NdFeB N35',
                  weight: '6 g',
                  status: 'raw-material',
                },
                {
                  id: 'mop-lra-spring',
                  label: 'Resonant Spring',
                  labelCn: '谐振弹簧',
                  category: 'component',
                  material: 'Spring Steel',
                  weight: '3 g',
                  status: 'raw-material',
                },
                {
                  id: 'mop-lra-housing',
                  label: 'LRA Housing',
                  labelCn: 'LRA 外壳',
                  category: 'component',
                  material: 'Stainless Steel',
                  weight: '6 g',
                  status: 'raw-material',
                },
              ],
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
          category: 'subassembly',
          status: 'destroy-brand',
          children: [
            {
              id: 'main-soc',
              label: 'Application SoC',
              labelCn: '应用处理器',
              category: 'component',
              material: 'Silicon Die / BGA',
              weight: '3 g',
              status: 'destroy-brand',
            },
            {
              id: 'main-ram',
              label: 'DDR3 RAM (256MB)',
              labelCn: 'DDR3 内存',
              category: 'component',
              material: 'Silicon / BGA Package',
              weight: '2 g',
              status: 'destroy-brand',
            },
            {
              id: 'main-flash',
              label: 'eMMC Flash (4GB)',
              labelCn: 'eMMC 闪存',
              category: 'component',
              material: 'NAND Flash / BGA',
              weight: '1 g',
              status: 'destroy-brand',
            },
            {
              id: 'main-pcb-substrate',
              label: 'Main PCB Substrate (6-layer)',
              labelCn: '六层 FR4 主板',
              category: 'component',
              material: 'FR4 Epoxy / Cu / Au / Ag',
              weight: '35 g',
              status: 'raw-material',
            },
            {
              id: 'main-power-regulators',
              label: 'Voltage Regulators (x5)',
              labelCn: '电压调节器',
              category: 'component',
              material: 'Silicon IC / SOT-23',
              weight: '2 g',
              status: 'raw-material',
            },
            {
              id: 'main-passives',
              label: 'SMD Passives (R/C/L)',
              labelCn: '贴片阻容感',
              category: 'component',
              material: 'Ceramic / Copper / Ferrite',
              weight: '2 g',
              status: 'raw-material',
            },
          ],
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
// TRADING MODE — Sellable Parts Revenue (updated for deeper tree)
// ============================================================

export const tradingSellableParts: SellablePartRow[] = [
  { component: 'LiDAR Rotation Motor (Nidec Coreless)', qty: 1, unitValue: 1.20, subtotal: 1.20, notes: 'Coreless DC motor, tested', assembly: 'LiDAR Module' },
  { component: 'Laser Diode + Lens Assembly', qty: 1, unitValue: 0.80, subtotal: 0.80, notes: '905nm GaAs', assembly: 'LiDAR Module' },
  { component: 'APD Photodetector', qty: 1, unitValue: 0.50, subtotal: 0.50, notes: 'InGaAs APD', assembly: 'LiDAR Module' },
  { component: 'Bumper Switch Array (Omron x3)', qty: 3, unitValue: 0.20, subtotal: 0.60, notes: 'Omron D2FC-F', assembly: 'Sensor System' },
  { component: 'Cliff Sensor Board (x4)', qty: 4, unitValue: 0.20, subtotal: 0.80, notes: 'Sharp/Everlight IR', assembly: 'Sensor System' },
  { component: 'Wall Following Sensor', qty: 1, unitValue: 0.30, subtotal: 0.30, notes: 'IR proximity', assembly: 'Sensor System' },
  { component: 'Carpet Detection Sensor', qty: 1, unitValue: 0.50, subtotal: 0.50, notes: 'Ultrasonic piezo', assembly: 'Sensor System' },
  { component: 'Battery Wiring Harness (JST)', qty: 1, unitValue: 0.50, subtotal: 0.50, notes: 'JST connectors', assembly: 'Power System' },
  { component: 'DC-DC Power Regulator', qty: 1, unitValue: 0.40, subtotal: 0.40, notes: 'Step-down module', assembly: 'Power System' },
  { component: 'Mabuchi DC Drive Motor (L)', qty: 1, unitValue: 1.50, subtotal: 1.50, notes: 'Mabuchi RS-series', assembly: 'Left Wheel' },
  { component: 'Planetary Gearbox (L)', qty: 1, unitValue: 0.40, subtotal: 0.40, notes: 'Powder metal gears', assembly: 'Left Wheel' },
  { component: 'Mabuchi DC Drive Motor (R)', qty: 1, unitValue: 1.50, subtotal: 1.50, notes: 'Mabuchi RS-series', assembly: 'Right Wheel' },
  { component: 'Planetary Gearbox (R)', qty: 1, unitValue: 0.40, subtotal: 0.40, notes: 'Powder metal gears', assembly: 'Right Wheel' },
  { component: 'N20 Side Brush Motor', qty: 1, unitValue: 0.80, subtotal: 0.80, notes: 'N20-class micro', assembly: 'Drive System' },
  { component: 'BLDC Suction Fan Motor', qty: 1, unitValue: 2.00, subtotal: 2.00, notes: 'High-speed BLDC', assembly: 'Cleaning System' },
  { component: 'Johnson Main Brush Motor', qty: 1, unitValue: 1.20, subtotal: 1.20, notes: 'Johnson-type DC', assembly: 'Cleaning System' },
  { component: 'Sonic Vibration Motor (LRA)', qty: 1, unitValue: 1.00, subtotal: 1.00, notes: 'Linear resonant', assembly: 'Mop Module' },
  { component: 'Wi-Fi / BLE Module (ESP32)', qty: 1, unitValue: 0.60, subtotal: 0.60, notes: 'RF module', assembly: 'Control Electronics' },
];

export const tradingSellablePartsTotal = 15.00;
export const tradingSellablePartsBatch = 7500.00;

// ============================================================
// RAW MATERIAL RECOVERY (updated for deeper tree with cell-level breakdown)
// ============================================================

export const rawMaterialRecovery: RawMaterialRow[] = [
  { category: 'Plastics', material: 'ABS / Glass-filled ABS', weightKg: 0.880, unitPrice: '$0.35/kg', revenue: 0.31 },
  { category: 'Plastics', material: 'PC / PMMA / Acrylic', weightKg: 0.185, unitPrice: '$0.60/kg', revenue: 0.11 },
  { category: 'Plastics', material: 'TPU / Nylon / POM / Silicone', weightKg: 0.115, unitPrice: '$0.25/kg', revenue: 0.03 },
  { category: 'Structural Metals', material: 'Steel (cold-rolled + stainless + spring)', weightKg: 0.310, unitPrice: '$0.20/kg', revenue: 0.06 },
  { category: 'Structural Metals', material: 'Aluminum 6061', weightKg: 0.057, unitPrice: '$1.80/kg', revenue: 0.10 },
  { category: 'Battery - Cathode', material: 'NMC 622 (Ni/Co/Mn oxide)', weightKg: 0.096, unitPrice: '$8.50/kg', revenue: 0.82 },
  { category: 'Battery - Anode', material: 'Synthetic Graphite', weightKg: 0.060, unitPrice: '$1.20/kg', revenue: 0.07 },
  { category: 'Battery - Casing', material: 'Nickel-plated Steel (cells)', weightKg: 0.036, unitPrice: '$0.30/kg', revenue: 0.01 },
  { category: 'Battery - Hazmat', material: 'LiPF₆ Electrolyte (recovery credit)', weightKg: 0.036, unitPrice: '$3.00/kg', revenue: 0.11 },
  { category: 'Battery - Strips', material: 'Pure Nickel Strip', weightKg: 0.008, unitPrice: '$15.00/kg', revenue: 0.12 },
  { category: 'PCB Metals', material: 'Gold (Au) — IC pads, connectors', weightKg: 0.0000216, unitPrice: '$70/g', revenue: 1.51 },
  { category: 'PCB Metals', material: 'Silver (Ag) — solder, traces', weightKg: 0.000086, unitPrice: '$0.80/g', revenue: 0.07 },
  { category: 'PCB Metals', material: 'Copper (Cu) — wiring + PCB + windings', weightKg: 0.065, unitPrice: '$9.00/kg', revenue: 0.59 },
  { category: 'Magnets', material: 'Neodymium (NdFeB) — motors + speaker', weightKg: 0.020, unitPrice: '$25.00/kg', revenue: 0.50 },
  { category: 'Magnets', material: 'Strontium Ferrite — drive motors', weightKg: 0.016, unitPrice: '$0.50/kg', revenue: 0.01 },
];

export const rawMaterialTotal = 4.42;
export const rawMaterialBatch = 2210.00;

// ============================================================
// TRADING MODE — Total Recovery
// ============================================================

export const tradingTotalRecovery = [
  { source: 'Sellable Parts', value: 15.00 },
  { source: 'Raw Materials', value: 4.42 },
];
export const tradingTotalRecoverablePerUnit = 19.42;
export const tradingTotalRecoverableBatch = 9710.00;

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
  { item: 'Revenue from Robots (Recovered Assets)', total: 9710 },
  { item: 'Total Revenue', total: 29710 },
  { item: 'Total Cost', total: -13000, isNegative: true },
  { item: 'Total Profit', total: 16710 },
];

export const tradingDealSummary: DealSummaryRow[] = [
  { item: 'Revenue from Sellable Parts', total: 7500 },
  { item: 'Revenue from Raw Materials', total: 2210 },
  { item: 'Total Revenue', total: 9710 },
  { item: 'Total Cost', total: -10000, isNegative: true },
  { item: 'Buyout Price to Client', total: -3500, isNegative: true },
  { item: 'Net Position', total: -3790 },
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

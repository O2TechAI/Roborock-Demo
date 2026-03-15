/**
 * O2 AI Demo - Data Types & Mock Data
 * 
 * Two modes with distinct teardown trees:
 * - Service Fee: Raw material recovery only, shows labor/processing costs
 * - Trading: Raw material recovery + 3rd party component resale, shows market values
 */

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'mode-selection' | 'processing' | 'complete';
}

export interface TeardownNode {
  id: string;
  label: string;
  category: 'root' | 'assembly' | 'component' | 'material';
  weight?: string;
  value?: string;
  recyclable?: boolean;
  children?: TeardownNode[];
  materialType?: string;
  quantity?: number;
  /** Disposal path for Trading mode */
  disposalPath?: 'material-recovery' | '3rd-party-resale' | 'waste';
  /** Cost label for Service Fee mode */
  laborCost?: string;
}

export interface ProcessingMode {
  id: 'service' | 'trading';
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  benefits: string[];
  color: string;
}

export const processingModes: ProcessingMode[] = [
  {
    id: 'service',
    title: 'Service Fee',
    subtitle: 'We process, you pay',
    description: 'You pay us to process your e-waste. We handle disassembly, compliance, and reporting. Recovered raw materials are returned or sold on your behalf.',
    icon: 'wrench',
    benefits: [
      'Full compliance reporting',
      'Chain-of-custody tracking',
      'Raw material recovery',
      'Data destruction guarantee'
    ],
    color: 'blue'
  },
  {
    id: 'trading',
    title: 'Trading',
    subtitle: 'We buy, you earn',
    description: 'We buy your e-waste at market rates. We extract value through raw material recycling and reselling usable components to third parties.',
    icon: 'trending-up',
    benefits: [
      'Upfront cash payment',
      'Market-rate pricing',
      'No processing costs',
      'Instant quotation'
    ],
    color: 'emerald'
  }
];

// ============================================================
// SERVICE FEE MODE — Raw Material Recovery Only
// Tree ends at material level. Shows labor cost per assembly.
// ============================================================
export const serviceFeeTreeData: TeardownNode = {
  id: 'root',
  label: 'Roborock S7',
  category: 'root',
  weight: '3.7 kg',
  quantity: 500,
  children: [
    {
      id: 'electronics',
      label: 'Electronics Assembly',
      category: 'assembly',
      weight: '0.45 kg',
      laborCost: '$3.20/unit',
      children: [
        {
          id: 'pcb-gold',
          label: 'Gold Recovery (PCB)',
          category: 'material',
          weight: '0.15 kg',
          materialType: 'Gold / Palladium',
          value: '$4.80/unit',
          recyclable: true,
        },
        {
          id: 'copper-traces',
          label: 'Copper Recovery',
          category: 'material',
          weight: '0.12 kg',
          materialType: 'Copper',
          value: '$1.60/unit',
          recyclable: true,
        },
        {
          id: 'silicon-ic',
          label: 'Silicon & IC Chips',
          category: 'material',
          weight: '0.08 kg',
          materialType: 'Silicon / Rare Earth',
          value: '$2.40/unit',
          recyclable: true,
        },
        {
          id: 'e-waste-residue',
          label: 'E-Waste Residue',
          category: 'material',
          weight: '0.10 kg',
          materialType: 'Mixed (FR-4, solder)',
          value: '$0.30/unit',
          recyclable: false,
        },
      ]
    },
    {
      id: 'power',
      label: 'Power System',
      category: 'assembly',
      weight: '0.85 kg',
      laborCost: '$2.80/unit',
      children: [
        {
          id: 'lithium-cobalt',
          label: 'Lithium & Cobalt',
          category: 'material',
          weight: '0.35 kg',
          materialType: 'Li / Co / Ni',
          value: '$4.50/unit',
          recyclable: true,
        },
        {
          id: 'copper-wiring',
          label: 'Copper Wiring',
          category: 'material',
          weight: '0.20 kg',
          materialType: 'Copper',
          value: '$2.10/unit',
          recyclable: true,
        },
        {
          id: 'battery-casing',
          label: 'Battery Casing',
          category: 'material',
          weight: '0.30 kg',
          materialType: 'Steel / Aluminum',
          value: '$0.80/unit',
          recyclable: true,
        },
      ]
    },
    {
      id: 'motors',
      label: 'Motor Assembly',
      category: 'assembly',
      weight: '0.55 kg',
      laborCost: '$1.90/unit',
      children: [
        {
          id: 'motor-copper',
          label: 'Copper Windings',
          category: 'material',
          weight: '0.25 kg',
          materialType: 'Copper',
          value: '$2.80/unit',
          recyclable: true,
        },
        {
          id: 'neodymium',
          label: 'Neodymium Magnets',
          category: 'material',
          weight: '0.08 kg',
          materialType: 'Neodymium (NdFeB)',
          value: '$1.90/unit',
          recyclable: true,
        },
        {
          id: 'motor-steel',
          label: 'Steel Components',
          category: 'material',
          weight: '0.22 kg',
          materialType: 'Steel',
          value: '$0.50/unit',
          recyclable: true,
        },
      ]
    },
    {
      id: 'cleaning',
      label: 'Cleaning System',
      category: 'assembly',
      weight: '0.65 kg',
      laborCost: '$1.20/unit',
      children: [
        {
          id: 'pp-plastic',
          label: 'PP Plastic',
          category: 'material',
          weight: '0.35 kg',
          materialType: 'Polypropylene',
          value: '$0.60/unit',
          recyclable: true,
        },
        {
          id: 'rubber-waste',
          label: 'Rubber & Nylon',
          category: 'material',
          weight: '0.20 kg',
          materialType: 'Nylon / Rubber',
          value: '$0.15/unit',
          recyclable: false,
        },
        {
          id: 'mixed-clean',
          label: 'Mixed Metals',
          category: 'material',
          weight: '0.10 kg',
          materialType: 'Copper / Steel',
          value: '$0.45/unit',
          recyclable: true,
        },
      ]
    },
    {
      id: 'structural',
      label: 'Structural Parts',
      category: 'assembly',
      weight: '1.20 kg',
      laborCost: '$0.90/unit',
      children: [
        {
          id: 'abs-plastic',
          label: 'ABS Plastic',
          category: 'material',
          weight: '0.45 kg',
          materialType: 'ABS',
          value: '$1.20/unit',
          recyclable: true,
        },
        {
          id: 'pp-structural',
          label: 'PP Plastic',
          category: 'material',
          weight: '0.35 kg',
          materialType: 'Polypropylene',
          value: '$0.70/unit',
          recyclable: true,
        },
        {
          id: 'steel-aluminum',
          label: 'Steel & Aluminum',
          category: 'material',
          weight: '0.25 kg',
          materialType: 'Steel / Aluminum',
          value: '$0.70/unit',
          recyclable: true,
        },
        {
          id: 'rubber-silicone',
          label: 'Silicone & EPDM',
          category: 'material',
          weight: '0.15 kg',
          materialType: 'Silicone / EPDM',
          value: '$0.10/unit',
          recyclable: false,
        },
      ]
    }
  ]
};

// ============================================================
// TRADING MODE — Raw Material Recovery + 3rd Party Resale
// Some components are sold as-is to third parties (higher value).
// Others go to material recovery. Shows disposal path on each node.
// ============================================================
export const tradingTreeData: TeardownNode = {
  id: 'root',
  label: 'Roborock S7',
  category: 'root',
  weight: '3.7 kg',
  quantity: 500,
  children: [
    {
      id: 'electronics',
      label: 'Electronics Assembly',
      category: 'assembly',
      weight: '0.45 kg',
      value: '$18.50/unit',
      children: [
        {
          id: 'main-pcb',
          label: 'Main PCB',
          category: 'component',
          weight: '0.12 kg',
          value: '$6.80',
          disposalPath: '3rd-party-resale',
          materialType: 'FR-4 / Gold-plated',
          recyclable: true,
        },
        {
          id: 'lidar-unit',
          label: 'LiDAR Sensor Unit',
          category: 'component',
          weight: '0.05 kg',
          value: '$4.50',
          disposalPath: '3rd-party-resale',
          materialType: 'Optical Module',
          recyclable: true,
        },
        {
          id: 'wifi-bt-module',
          label: 'WiFi/BT Module',
          category: 'component',
          weight: '0.02 kg',
          value: '$2.20',
          disposalPath: '3rd-party-resale',
          materialType: 'RF Module',
          recyclable: true,
        },
        {
          id: 'sensor-array',
          label: 'Sensor Array',
          category: 'component',
          weight: '0.06 kg',
          value: '$2.80',
          disposalPath: '3rd-party-resale',
          materialType: 'IR / Cliff Sensors',
          recyclable: true,
        },
        {
          id: 'e-copper-recovery',
          label: 'Copper & Solder',
          category: 'material',
          weight: '0.20 kg',
          value: '$2.20',
          disposalPath: 'material-recovery',
          materialType: 'Copper / Tin',
          recyclable: true,
        },
      ]
    },
    {
      id: 'power',
      label: 'Power System',
      category: 'assembly',
      weight: '0.85 kg',
      value: '$12.40/unit',
      children: [
        {
          id: 'battery-pack',
          label: 'Li-ion Battery Pack',
          category: 'component',
          weight: '0.55 kg',
          value: '$7.20',
          disposalPath: '3rd-party-resale',
          materialType: '18650 Cells (x6)',
          recyclable: true,
        },
        {
          id: 'bms-board',
          label: 'BMS Board',
          category: 'component',
          weight: '0.05 kg',
          value: '$1.80',
          disposalPath: '3rd-party-resale',
          materialType: 'PCB / IC',
          recyclable: true,
        },
        {
          id: 'charging-circuit',
          label: 'Charging Circuit',
          category: 'component',
          weight: '0.08 kg',
          value: '$1.50',
          disposalPath: '3rd-party-resale',
          materialType: 'PCB / Copper',
          recyclable: true,
        },
        {
          id: 'power-copper',
          label: 'Copper Wiring',
          category: 'material',
          weight: '0.17 kg',
          value: '$1.90',
          disposalPath: 'material-recovery',
          materialType: 'Copper / PVC',
          recyclable: true,
        },
      ]
    },
    {
      id: 'motors',
      label: 'Motor Assembly',
      category: 'assembly',
      weight: '0.55 kg',
      value: '$9.80/unit',
      children: [
        {
          id: 'bldc-motor',
          label: 'BLDC Suction Motor',
          category: 'component',
          weight: '0.25 kg',
          value: '$5.20',
          disposalPath: '3rd-party-resale',
          materialType: 'Brushless DC Motor',
          recyclable: true,
        },
        {
          id: 'wheel-motors',
          label: 'Wheel Drive Motors (x2)',
          category: 'component',
          weight: '0.15 kg',
          value: '$2.40',
          disposalPath: '3rd-party-resale',
          materialType: 'DC Motors',
          recyclable: true,
        },
        {
          id: 'motor-metals',
          label: 'Copper & Steel Scrap',
          category: 'material',
          weight: '0.15 kg',
          value: '$2.20',
          disposalPath: 'material-recovery',
          materialType: 'Copper / Steel',
          recyclable: true,
        },
      ]
    },
    {
      id: 'cleaning',
      label: 'Cleaning System',
      category: 'assembly',
      weight: '0.65 kg',
      value: '$3.60/unit',
      children: [
        {
          id: 'sonic-mop',
          label: 'Sonic Mop Module',
          category: 'component',
          weight: '0.20 kg',
          value: '$1.80',
          disposalPath: '3rd-party-resale',
          materialType: 'Vibration Motor + Pad',
          recyclable: true,
        },
        {
          id: 'water-tank',
          label: 'Water Tank (PP)',
          category: 'material',
          weight: '0.25 kg',
          value: '$0.80',
          disposalPath: 'material-recovery',
          materialType: 'Polypropylene',
          recyclable: true,
        },
        {
          id: 'brush-waste',
          label: 'Brush Assembly',
          category: 'material',
          weight: '0.20 kg',
          value: '$0.20',
          disposalPath: 'waste',
          materialType: 'Nylon / Rubber',
          recyclable: false,
        },
        {
          id: 'clean-metals',
          label: 'Mixed Metals',
          category: 'material',
          weight: '0.10 kg',
          value: '$0.80',
          disposalPath: 'material-recovery',
          materialType: 'Copper / Steel',
          recyclable: true,
        },
      ]
    },
    {
      id: 'structural',
      label: 'Structural Parts',
      category: 'assembly',
      weight: '1.20 kg',
      value: '$3.10/unit',
      children: [
        {
          id: 'abs-housing',
          label: 'ABS Plastic',
          category: 'material',
          weight: '0.45 kg',
          value: '$1.20',
          disposalPath: 'material-recovery',
          materialType: 'ABS',
          recyclable: true,
        },
        {
          id: 'pp-plate',
          label: 'PP Plastic',
          category: 'material',
          weight: '0.35 kg',
          value: '$0.90',
          disposalPath: 'material-recovery',
          materialType: 'Polypropylene',
          recyclable: true,
        },
        {
          id: 'metal-frame',
          label: 'Metal Frame',
          category: 'material',
          weight: '0.25 kg',
          value: '$0.70',
          disposalPath: 'material-recovery',
          materialType: 'Steel / Aluminum',
          recyclable: true,
        },
        {
          id: 'rubber-parts',
          label: 'Rubber Components',
          category: 'material',
          weight: '0.15 kg',
          value: '$0.10',
          disposalPath: 'waste',
          materialType: 'Silicone / EPDM',
          recyclable: false,
        },
      ]
    }
  ]
};

export const serviceFeeSummary = {
  totalUnits: 500,
  totalWeight: '1,850 kg',
  components: 17,
  recoveryRate: '91.8%',
  totalLaborCost: '$5,000',
  materialValue: '$11,350',
};

export const tradingSummary = {
  totalUnits: 500,
  totalWeight: '1,850 kg',
  components: 22,
  recoveryRate: '94.2%',
  buyoutPrice: '$16,500',
  resaleValue: '$23,700',
};

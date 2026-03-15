/**
 * O2 AI Demo - Data Types & Mock Data
 * 
 * Design: "Precision Dark" enterprise SaaS
 * This file contains all the data structures and mock data for the demo flow.
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
  icon?: string;
  weight?: string;
  value?: string;
  recyclable?: boolean;
  children?: TeardownNode[];
  materialType?: string;
  quantity?: number;
  unitWeight?: string;
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
    description: 'You pay us to process your e-waste. We handle disassembly, compliance, and reporting. Full chain-of-custody documentation provided.',
    icon: 'wrench',
    benefits: [
      'Full compliance reporting',
      'Chain-of-custody tracking',
      'Environmental certificates',
      'Data destruction guarantee'
    ],
    color: 'teal'
  },
  {
    id: 'trading',
    title: 'Trading',
    subtitle: 'We buy, you earn',
    description: 'We buy your e-waste at market rates. We profit from resale/recycling of recovered materials. You get cash upfront.',
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

export const roborockTeardownData: TeardownNode = {
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
      value: '$12.50/unit',
      children: [
        {
          id: 'main-pcb',
          label: 'Main PCB',
          category: 'component',
          weight: '0.12 kg',
          materialType: 'FR-4 / Gold-plated',
          recyclable: true,
          value: '$4.80',
        },
        {
          id: 'wifi-module',
          label: 'WiFi Module',
          category: 'component',
          weight: '0.02 kg',
          materialType: 'Mixed Electronics',
          recyclable: true,
          value: '$1.20',
        },
        {
          id: 'sensors',
          label: 'Sensor Array',
          category: 'component',
          weight: '0.08 kg',
          materialType: 'Mixed Electronics',
          recyclable: true,
          value: '$3.50',
          children: [
            {
              id: 'lidar',
              label: 'LiDAR Unit',
              category: 'material',
              weight: '0.05 kg',
              materialType: 'Optical + PCB',
              recyclable: true,
              value: '$2.10',
            },
            {
              id: 'cliff-sensors',
              label: 'Cliff Sensors',
              category: 'material',
              weight: '0.03 kg',
              materialType: 'IR Sensors',
              recyclable: true,
              value: '$1.40',
            }
          ]
        },
        {
          id: 'mcu',
          label: 'MCU Board',
          category: 'component',
          weight: '0.03 kg',
          materialType: 'Silicon / Gold',
          recyclable: true,
          value: '$3.00',
        }
      ]
    },
    {
      id: 'power',
      label: 'Power System',
      category: 'assembly',
      weight: '0.85 kg',
      value: '$8.20/unit',
      children: [
        {
          id: 'battery',
          label: 'Li-ion Battery Pack',
          category: 'component',
          weight: '0.65 kg',
          materialType: 'Lithium / Cobalt',
          recyclable: true,
          value: '$5.80',
          children: [
            {
              id: 'cells',
              label: '18650 Cells (x6)',
              category: 'material',
              weight: '0.55 kg',
              materialType: 'Li-ion',
              recyclable: true,
              value: '$4.50',
            },
            {
              id: 'bms',
              label: 'BMS Board',
              category: 'material',
              weight: '0.05 kg',
              materialType: 'PCB / IC',
              recyclable: true,
              value: '$1.30',
            }
          ]
        },
        {
          id: 'charging',
          label: 'Charging Circuit',
          category: 'component',
          weight: '0.08 kg',
          materialType: 'PCB / Copper',
          recyclable: true,
          value: '$1.20',
        },
        {
          id: 'wiring',
          label: 'Wiring Harness',
          category: 'component',
          weight: '0.12 kg',
          materialType: 'Copper / PVC',
          recyclable: true,
          value: '$1.20',
        }
      ]
    },
    {
      id: 'motors',
      label: 'Motor Assembly',
      category: 'assembly',
      weight: '0.55 kg',
      value: '$6.40/unit',
      children: [
        {
          id: 'main-motor',
          label: 'BLDC Suction Motor',
          category: 'component',
          weight: '0.25 kg',
          materialType: 'Copper / Neodymium',
          recyclable: true,
          value: '$3.20',
        },
        {
          id: 'brush-motors',
          label: 'Brush Motors (x2)',
          category: 'component',
          weight: '0.15 kg',
          materialType: 'Copper / Steel',
          recyclable: true,
          value: '$1.80',
        },
        {
          id: 'wheel-motors',
          label: 'Wheel Drive Motors',
          category: 'component',
          weight: '0.15 kg',
          materialType: 'Copper / Steel',
          recyclable: true,
          value: '$1.40',
        }
      ]
    },
    {
      id: 'cleaning',
      label: 'Cleaning System',
      category: 'assembly',
      weight: '0.65 kg',
      value: '$2.80/unit',
      children: [
        {
          id: 'brush-system',
          label: 'Brush Assembly',
          category: 'component',
          weight: '0.20 kg',
          materialType: 'Nylon / Rubber',
          recyclable: false,
          value: '$0.60',
        },
        {
          id: 'water-tank',
          label: 'Water Tank',
          category: 'component',
          weight: '0.25 kg',
          materialType: 'PP Plastic',
          recyclable: true,
          value: '$0.80',
        },
        {
          id: 'mop-module',
          label: 'Sonic Mop Module',
          category: 'component',
          weight: '0.20 kg',
          materialType: 'Mixed',
          recyclable: true,
          value: '$1.40',
        }
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
          id: 'housing-top',
          label: 'Top Housing (ABS)',
          category: 'component',
          weight: '0.45 kg',
          materialType: 'ABS Plastic',
          recyclable: true,
          value: '$1.20',
        },
        {
          id: 'housing-bottom',
          label: 'Bottom Plate (PP)',
          category: 'component',
          weight: '0.35 kg',
          materialType: 'PP Plastic',
          recyclable: true,
          value: '$0.90',
        },
        {
          id: 'metal-frame',
          label: 'Metal Frame',
          category: 'component',
          weight: '0.25 kg',
          materialType: 'Steel / Aluminum',
          recyclable: true,
          value: '$0.70',
        },
        {
          id: 'rubber-parts',
          label: 'Rubber Components',
          category: 'component',
          weight: '0.15 kg',
          materialType: 'Silicone / EPDM',
          recyclable: false,
          value: '$0.30',
        }
      ]
    }
  ]
};

export const demoConversation: ChatMessage[] = [
  {
    id: '1',
    role: 'user',
    content: 'Recycle 500 Roborock S7 units',
    timestamp: new Date(),
    type: 'text',
  },
  {
    id: '2',
    role: 'assistant',
    content: 'I\'ve identified the Roborock S7 robot vacuum. Let me analyze the teardown topology for 500 units.\n\nTotal weight: ~1,850 kg\nEstimated components: 12 major assemblies\nRecoverable materials: 94.2%',
    timestamp: new Date(),
    type: 'text',
  },
  {
    id: '3',
    role: 'assistant',
    content: '',
    timestamp: new Date(),
    type: 'mode-selection',
  },
];

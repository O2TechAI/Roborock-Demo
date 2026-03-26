/**
 * 技术平台 Tab
 * SiPho, SiGe BiCMOS, RF-SOI, Power Management, CIS, MEMS
 */

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const platforms = [
  {
    name: "Silicon Photonics (SiPho)",
    badge: "核心增长引擎",
    badgeColor: "#26a69a",
    desc: "Tower的SiPho平台是公司增长最快的业务，也是当前AI基础设施光互连供应链中最关键的Foundry技术。公司是1.6T光模块SiPho芯片的主要供应商，与Nvidia、Coherent等行业领导者建立了深度合作。",
    details: [
      "FY2025 SiPho收入: $228M (同比+115%)",
      "1.6T Transceiver的主要SiPho Foundry供应商",
      "与Nvidia合作推进下一代AI数据中心1.6T光模块",
      "与Coherent联合演示400Gbps/lane数据传输",
      "新CPO (Co-Packaged Optics) Foundry平台已发布",
      "$920M CapEx计划中的核心投资方向",
      "目标: 2026年12月完成全部产能安装和认证",
      "产能目标: >5x Q4 2025年化出货量",
      "70%+产能已通过客户预付款锁定至2028年",
    ],
    nodes: "多种SiPho工艺节点",
  },
  {
    name: "SiGe BiCMOS & RF-SOI",
    badge: "成熟优势平台",
    badgeColor: "#4fc3f7",
    desc: "Tower的SiGe BiCMOS和RF-SOI平台服务于高速通信、5G基站、卫星通信和光纤接入等市场。这些平台提供高速、低噪声、高线性度的射频和高性能模拟解决方案。",
    details: [
      "SiGe BiCMOS: 高速数据通信、光网络PHY",
      "RF-SOI: 5G前端模块、天线调谐、开关",
      "RF-CMOS: 低成本射频解决方案",
      "覆盖sub-6GHz到mmWave频段",
      "多Fab qualified (Israel, US, Japan)",
      "与SiPho协同: 为光模块提供配套的EIC (Electronic IC)",
    ],
    nodes: "180nm / 130nm / 90nm",
  },
  {
    name: "Power Management (BCD)",
    badge: "高可靠性平台",
    badgeColor: "#ff9800",
    desc: "Tower的BCD (Bipolar-CMOS-DMOS)平台支持从低压到700V的全范围功率管理应用，是Automotive和Industrial市场的核心技术。新推出的AI Power技术瞄准Monolithic Smart Power Stage和DrMOS应用。",
    details: [
      "BCD工艺支持最高700V",
      "Automotive AEC-Q100全系列认证",
      "新AI Power技术: 瞄准$2.5B Smart Power Stage/DrMOS市场",
      "应用: 电源管理IC、电机驱动、LED驱动",
      "高可靠性: 满足Automotive和Industrial严苛要求",
    ],
    nodes: "180nm / 130nm BCD",
  },
  {
    name: "CMOS Image Sensor (CIS)",
    badge: "成像技术",
    badgeColor: "#ab47bc",
    desc: "Tower提供先进的CMOS图像传感器工艺，服务于手机摄像头、安防监控、医疗成像和Automotive视觉等应用。",
    details: [
      "高灵敏度、低噪声像素技术",
      "BSI (背照式) 和 FSI (前照式) 工艺",
      "应用: 手机、安防、医疗、Automotive ADAS",
      "与Non-Imaging Sensor技术协同",
    ],
    nodes: "110nm / 90nm / 65nm",
  },
  {
    name: "MEMS & Sensors",
    badge: "传感器平台",
    badgeColor: "#78909c",
    desc: "Tower的MEMS平台支持各类微机电系统器件的制造，包括加速度计、陀螺仪、压力传感器、麦克风等。",
    details: [
      "MEMS-CMOS集成工艺",
      "应用: 惯性传感器、压力传感器、MEMS麦克风",
      "Automotive和Consumer市场",
      "与Analog/Mixed-Signal工艺协同",
    ],
    nodes: "200mm MEMS",
  },
];

export default function TechPlatforms() {
  return (
    <div className="space-y-8">
      {/* Visual Banner */}
      <div className="relative rounded-lg overflow-hidden" style={{ height: "180px" }}>
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663281312208/YiJWbLAJwinkbnh5EMDaWC/tsem-abstract-circuit-SfmUEABgW4NHcWwzG3PsP3.webp"
          alt="Circuit Pathways"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.6) 50%, rgba(10,22,40,0.3) 100%)" }} />
        <div className="absolute inset-0 flex items-center p-8">
          <div>
            <h2 className="text-xl font-bold mb-2" style={{ color: "#e8edf3" }}>技术平台</h2>
            <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "#c8d6e5" }}>
              Tower Semiconductor拥有业界最广泛的Specialty Analog工艺平台组合。每个平台都经过数十年的迭代，积累了深厚的器件物理know-how和工艺IP。
            </p>
          </div>
        </div>
      </div>

      {/* Technology Revenue Mix */}
      <div className="data-card">
        <h3 className="text-base font-semibold mb-4" style={{ color: "#4fc3f7" }}>技术平台收入贡献 (FY2025E)</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="h-64 flex items-center justify-center">
            <Doughnut
              data={{
                labels: ["SiPho & SiGe", "RF (SOI/CMOS)", "Power Management", "CIS & Sensors", "Mixed-Signal/Other"],
                datasets: [{
                  data: [30, 20, 22, 15, 13],
                  backgroundColor: [
                    "rgba(79,195,247,0.8)",
                    "rgba(38,166,154,0.8)",
                    "rgba(255,152,0,0.8)",
                    "rgba(171,71,188,0.8)",
                    "rgba(120,144,156,0.8)",
                  ],
                  borderColor: "#0a1628",
                  borderWidth: 2,
                }],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                cutout: "60%",
                plugins: {
                  legend: {
                    position: "right",
                    labels: {
                      color: "#8fa3b8",
                      font: { size: 11 },
                      padding: 12,
                      usePointStyle: true,
                      pointStyleWidth: 10,
                    },
                  },
                  tooltip: {
                    backgroundColor: "#0f2035",
                    borderColor: "rgba(79,195,247,0.3)",
                    borderWidth: 1,
                    titleColor: "#e8edf3",
                    bodyColor: "#8fa3b8",
                    bodyFont: { family: "'IBM Plex Mono', monospace" },
                    callbacks: {
                      label: (ctx: any) => `${ctx.label}: ~${ctx.parsed}%`,
                    },
                  },
                },
              }}
            />
          </div>
          <div className="text-sm leading-relaxed" style={{ color: "#8fa3b8" }}>
            <p className="mb-3">
              Tower的收入来源高度多元化，横跨多个技术平台和终端市场。SiPho & SiGe是增长最快的板块，受益于AI数据中心和高速通信需求。Power Management板块受益于Automotive电气化和AI服务器电源需求。
            </p>
            <p>
              值得注意的是，SiPho在FY2025的收入占比约14.5%($228M/$1.57B)，但其增长速度(+115% YoY)远超其他平台，预计到FY2027-2028将成为公司最大的单一收入来源。
            </p>
          </div>
        </div>
      </div>

      {/* Platform Details */}
      {platforms.map((platform, idx) => (
        <div key={idx} className="data-card">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-base font-semibold" style={{ color: "#e8edf3" }}>{platform.name}</h3>
            <span className="text-xs px-2 py-0.5 rounded" style={{ background: `${platform.badgeColor}20`, color: platform.badgeColor }}>
              {platform.badge}
            </span>
            <span className="text-xs ml-auto" style={{ color: "#5a7089", fontFamily: "'IBM Plex Mono', monospace" }}>
              {platform.nodes}
            </span>
          </div>
          <p className="text-sm leading-relaxed mb-3" style={{ color: "#8fa3b8" }}>{platform.desc}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
            {platform.details.map((detail, i) => (
              <div key={i} className="flex gap-2 text-xs py-1" style={{ color: "#8fa3b8" }}>
                <span style={{ color: platform.badgeColor }}>-</span>
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Nvidia Partnership Highlight */}
      <div className="data-card" style={{ borderLeft: "3px solid #26a69a" }}>
        <h3 className="text-sm font-semibold mb-2" style={{ color: "#26a69a" }}>
          重要合作: Nvidia x Tower — 推进AI基础设施1.6T光模块
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "#c8d6e5" }}>
          2026年2月，Tower宣布与Nvidia合作，利用Tower的SiPho平台为Nvidia的下一代AI数据中心网络提供1.6T光模块。Nvidia正在推出其首款CPO交换机(Spectrum-X Ethernet和InfiniBand Quantum-X系列)，Tower的SiPho技术是实现这些高速光互连的关键使能技术。此外，Tower与Coherent在2026年3月联合演示了基于Tower生产级SiPho工艺的400Gbps/lane数据传输，进一步验证了其技术领先性。Tower还与Scintil Photonics合作推出了全球首个异质集成DWDM激光器，为CPO的下一代AI基础设施提供关键组件。
        </p>
      </div>
    </div>
  );
}

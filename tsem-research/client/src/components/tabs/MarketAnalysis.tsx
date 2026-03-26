/**
 * 市场分析 Tab
 * Silicon Photonics市场、Analog半导体市场、AI数据中心光互连趋势
 */

import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, Filler, ArcElement);

const chartDefaults = {
  color: "#8fa3b8",
  borderColor: "rgba(79,195,247,0.15)",
};

export default function MarketAnalysis() {
  return (
    <div className="space-y-8">
      {/* Visual Banner */}
      <div className="relative rounded-lg overflow-hidden" style={{ height: "180px" }}>
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663281312208/YiJWbLAJwinkbnh5EMDaWC/tsem-hero-datacenter-LcbKiXAZSrQHZe7mjNjobL.webp"
          alt="AI Data Center"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(10,22,40,0.9) 0%, rgba(10,22,40,0.5) 50%, rgba(10,22,40,0.3) 100%)" }} />
        <div className="absolute inset-0 flex items-center p-8">
          <div>
            <h2 className="text-xl font-bold mb-2" style={{ color: "#e8edf3" }}>市场分析</h2>
            <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "#c8d6e5" }}>
              Tower Semiconductor处于多个高增长半导体细分市场的交汇点。公司的核心增长引擎——Silicon Photonics (SiPho)技术——正受益于AI数据中心对高速光互连的爆发性需求。
            </p>
          </div>
        </div>
      </div>

      {/* Silicon Photonics Market */}
      <div className="data-card">
        <h3 className="text-base font-semibold mb-1" style={{ color: "#4fc3f7" }}>
          Silicon Photonics市场规模与增长预测
        </h3>
        <p className="text-xs mb-4" style={{ color: "#8fa3b8" }}>
          全球SiPho市场正经历指数级增长，受AI训练集群和推理基础设施对1.6T及更高速率光模块的需求驱动。市场规模预计从2025年的$2.65B增长至2030年的$9.65B，CAGR达29.5%。Tower作为1.6T Transceiver SiPho芯片的主要供应商，占据了该供应链的核心位置。
        </p>
        <div className="h-72">
          <Bar
            data={{
              labels: ["2023", "2024", "2025", "2026E", "2027E", "2028E", "2029E", "2030E"],
              datasets: [
                {
                  label: "Silicon Photonics市场规模 ($B)",
                  data: [1.63, 2.1, 2.65, 3.96, 5.2, 6.7, 8.1, 9.65],
                  backgroundColor: "rgba(79,195,247,0.6)",
                  borderColor: "#4fc3f7",
                  borderWidth: 1,
                  borderRadius: 3,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  backgroundColor: "#0f2035",
                  borderColor: "rgba(79,195,247,0.3)",
                  borderWidth: 1,
                  titleColor: "#e8edf3",
                  bodyColor: "#8fa3b8",
                  bodyFont: { family: "'IBM Plex Mono', monospace" },
                  callbacks: {
                    label: (ctx: any) => `$${ctx.parsed.y}B`,
                  },
                },
              },
              scales: {
                x: {
                  ticks: { color: "#8fa3b8", font: { family: "'IBM Plex Mono', monospace", size: 11 } },
                  grid: { color: "rgba(79,195,247,0.06)" },
                },
                y: {
                  ticks: {
                    color: "#8fa3b8",
                    font: { family: "'IBM Plex Mono', monospace", size: 11 },
                    callback: (v: any) => `$${v}B`,
                  },
                  grid: { color: "rgba(79,195,247,0.06)" },
                },
              },
            }}
          />
        </div>
        <div className="mt-3 text-xs" style={{ color: "#5a7089" }}>
          数据来源: MarketsandMarkets, Mordor Intelligence, Grand View Research | CAGR 29.5% (2025-2030)
        </div>
      </div>

      {/* Two Column: Optical Transceiver + AI Data Center */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Optical Transceiver Market */}
        <div className="data-card">
          <h3 className="text-base font-semibold mb-1" style={{ color: "#4fc3f7" }}>
            光模块(Optical Transceiver)市场
          </h3>
          <p className="text-xs mb-4" style={{ color: "#8fa3b8" }}>
            全球光模块市场预计从2025年的$11.5B增长至2035年的$47.6B。AI数据中心是核心驱动力，800G向1.6T的迁移正在加速。SiPho在1.6T时代相比EML(电吸收调制激光器)具有显著的功耗和集成度优势。
          </p>
          <div className="h-56">
            <Line
              data={{
                labels: ["2023", "2024", "2025", "2026E", "2028E", "2030E"],
                datasets: [
                  {
                    label: "光模块市场 ($B)",
                    data: [8.2, 10.1, 11.5, 14.8, 22.5, 32.0],
                    borderColor: "#26a69a",
                    backgroundColor: "rgba(38,166,154,0.1)",
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: "#26a69a",
                    pointBorderColor: "#26a69a",
                    pointRadius: 4,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: "#0f2035",
                    borderColor: "rgba(38,166,154,0.3)",
                    borderWidth: 1,
                    titleColor: "#e8edf3",
                    bodyColor: "#8fa3b8",
                    bodyFont: { family: "'IBM Plex Mono', monospace" },
                  },
                },
                scales: {
                  x: {
                    ticks: { color: "#8fa3b8", font: { family: "'IBM Plex Mono', monospace", size: 10 } },
                    grid: { color: "rgba(79,195,247,0.06)" },
                  },
                  y: {
                    ticks: {
                      color: "#8fa3b8",
                      font: { family: "'IBM Plex Mono', monospace", size: 10 },
                      callback: (v: any) => `$${v}B`,
                    },
                    grid: { color: "rgba(79,195,247,0.06)" },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* SiPho vs EML in 1.6T */}
        <div className="data-card">
          <h3 className="text-base font-semibold mb-1" style={{ color: "#4fc3f7" }}>
            1.6T Transceiver技术路线对比
          </h3>
          <p className="text-xs mb-4" style={{ color: "#8fa3b8" }}>
            在1.6T光模块时代，Silicon Photonics凭借更低功耗、更高集成度和更好的可扩展性，正在快速取代传统EML方案。Tower是SiPho foundry的领导者。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs" style={{ color: "#8fa3b8" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(79,195,247,0.15)" }}>
                  <th className="text-left py-2 pr-4 font-semibold" style={{ color: "#e8edf3" }}>指标</th>
                  <th className="text-center py-2 px-3 font-semibold" style={{ color: "#4fc3f7" }}>SiPho</th>
                  <th className="text-center py-2 px-3 font-semibold" style={{ color: "#8fa3b8" }}>EML</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["功耗 (per lane)", "低", "高"],
                  ["集成度", "高 (单片集成)", "中"],
                  ["可扩展性 (>1.6T)", "优秀", "受限"],
                  ["成本趋势", "随量产下降", "相对稳定"],
                  ["制造复杂度", "CMOS兼容", "III-V族"],
                  ["主要供应商", "Tower, GF", "Lumentum, Coherent"],
                  ["AI数据中心适配", "首选方案", "过渡方案"],
                ].map(([metric, sipho, eml], i) => (
                  <tr key={i} style={{ borderBottom: "1px solid rgba(79,195,247,0.06)" }}>
                    <td className="py-2 pr-4">{metric}</td>
                    <td className="text-center py-2 px-3" style={{ color: "#26a69a" }}>{sipho}</td>
                    <td className="text-center py-2 px-3">{eml}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Analog Semiconductor Market */}
      <div className="data-card">
        <h3 className="text-base font-semibold mb-1" style={{ color: "#4fc3f7" }}>
          Analog半导体市场概况
        </h3>
        <p className="text-xs mb-4" style={{ color: "#8fa3b8" }}>
          全球Analog半导体市场2024年规模约$87.5B，预计以7.4% CAGR增长至2034年。该市场的特点是产品生命周期长、客户粘性高、毛利率稳定。Tower在Specialty Analog Foundry领域占据领先地位，服务于Automotive、Industrial、Consumer、Medical等多个终端市场。与数字芯片不同，Analog芯片不追求最先进制程，而是依赖成熟工艺节点(180nm-65nm)的深度优化。
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-56">
            <Bar
              data={{
                labels: ["2020", "2021", "2022", "2023", "2024", "2025E", "2026E"],
                datasets: [
                  {
                    label: "Analog半导体市场 ($B)",
                    data: [56, 68, 78, 73, 87.5, 92, 97],
                    backgroundColor: "rgba(100,130,180,0.5)",
                    borderColor: "rgba(100,130,180,0.8)",
                    borderWidth: 1,
                    borderRadius: 3,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: "#0f2035",
                    borderColor: "rgba(79,195,247,0.3)",
                    borderWidth: 1,
                    titleColor: "#e8edf3",
                    bodyColor: "#8fa3b8",
                    bodyFont: { family: "'IBM Plex Mono', monospace" },
                  },
                },
                scales: {
                  x: {
                    ticks: { color: "#8fa3b8", font: { family: "'IBM Plex Mono', monospace", size: 10 } },
                    grid: { color: "rgba(79,195,247,0.06)" },
                  },
                  y: {
                    ticks: {
                      color: "#8fa3b8",
                      font: { family: "'IBM Plex Mono', monospace", size: 10 },
                      callback: (v: any) => `$${v}B`,
                    },
                    grid: { color: "rgba(79,195,247,0.06)" },
                  },
                },
              }}
            />
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3" style={{ color: "#e8edf3" }}>
              Tower的终端市场覆盖
            </h4>
            <div className="space-y-2">
              {[
                { name: "通信 & 数据中心", desc: "SiPho, SiGe BiCMOS, RF-SOI用于光模块和5G基站", pct: "35%" },
                { name: "Automotive", desc: "BCD, Power Management, ADAS传感器", pct: "20%" },
                { name: "Industrial & Medical", desc: "高压BCD, MEMS, 传感器", pct: "20%" },
                { name: "Consumer & Mobile", desc: "CMOS Image Sensor, RF前端", pct: "15%" },
                { name: "Aerospace & Defense", desc: "高可靠性Analog, 抗辐射器件", pct: "10%" },
              ].map((market) => (
                <div key={market.name} className="flex items-center gap-3 py-2" style={{ borderBottom: "1px solid rgba(79,195,247,0.06)" }}>
                  <div className="text-sm font-semibold" style={{ color: "#4fc3f7", fontFamily: "'IBM Plex Mono', monospace", minWidth: "40px" }}>
                    {market.pct}
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: "#e8edf3" }}>{market.name}</div>
                    <div className="text-xs" style={{ color: "#5a7089" }}>{market.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Key Market Insight */}
      <div className="data-card" style={{ borderLeft: "3px solid #4fc3f7" }}>
        <h3 className="text-sm font-semibold mb-2" style={{ color: "#4fc3f7" }}>
          核心市场洞察
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "#c8d6e5" }}>
          Tower Semiconductor的战略定位极为独特：公司不仅是传统Analog Foundry的领导者，更通过Silicon Photonics技术成为了AI基础设施供应链中不可或缺的一环。SiPho收入在FY2025达到$228M(同比增长115%)，仅占公司总收入的约14.5%，但这一比例正在快速上升。随着$920M CapEx计划的推进，SiPho产能将在2027年达到Q4 2025出货量的5倍以上，且超过70%的产能已通过客户预付款锁定至2028年。这意味着Tower正在从一个传统的Specialty Foundry转型为AI光互连供应链的核心基础设施提供商。
        </p>
      </div>
    </div>
  );
}

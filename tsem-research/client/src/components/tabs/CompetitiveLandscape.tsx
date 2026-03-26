/**
 * 竞争格局 Tab
 * Peer comparison, competitive positioning, moats
 */

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const tooltipStyle = {
  backgroundColor: "#0f2035",
  borderColor: "rgba(79,195,247,0.3)",
  borderWidth: 1,
  titleColor: "#e8edf3",
  bodyColor: "#8fa3b8",
  bodyFont: { family: "'IBM Plex Mono', monospace" as const },
};

const gridStyle = { color: "rgba(79,195,247,0.06)" };
const tickStyle = { color: "#8fa3b8", font: { family: "'IBM Plex Mono', monospace" as const, size: 10 } };

export default function CompetitiveLandscape() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-2" style={{ color: "#e8edf3" }}>竞争格局</h2>
        <p className="text-sm leading-relaxed" style={{ color: "#8fa3b8" }}>
          Tower Semiconductor在Specialty Analog Foundry领域占据独特的竞争地位。虽然公司在整体Foundry市场中的份额不到2%，但在多个高价值细分市场中处于领导地位，特别是Silicon Photonics Foundry市场。公司的竞争优势来源于深厚的工艺IP积累、客户Co-Development模式带来的高切换成本、以及多区域Fab布局。
        </p>
      </div>

      {/* Peer Comparison Table */}
      <div className="data-card">
        <h3 className="text-base font-semibold mb-3" style={{ color: "#4fc3f7" }}>Specialty Foundry同业对比</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs" style={{ color: "#8fa3b8" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(79,195,247,0.2)" }}>
                {["公司", "Ticker", "FY Rev", "Gross Margin", "Market Cap", "主要优势", "SiPho能力"].map((h) => (
                  <th key={h} className="text-left py-2.5 pr-3 font-semibold whitespace-nowrap" style={{ color: "#e8edf3" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Tower Semi", "TSEM", "$1.57B", "23.2%", "$21.2B", "SiPho领导者, 最广工艺组合", "领先", "#4fc3f7"],
                ["GlobalFoundries", "GFS", "$6.75B", "25.8%", "$24.5B", "规模最大Specialty, RF领先", "有限", "#8fa3b8"],
                ["UMC", "UMC", "$7.2B", "33.5%", "$19.8B", "高产量300mm, 成本优势", "无", "#8fa3b8"],
                ["X-FAB", "XFAB", "$0.85B", "28.5%", "$2.8B", "Automotive/Industrial专精", "无", "#8fa3b8"],
                ["Hua Hong", "1347.HK", "$1.95B", "18.2%", "$8.5B", "中国市场, 政策支持", "无", "#8fa3b8"],
                ["VIS (Vanguard)", "5347.TW", "$1.1B", "30.2%", "$5.2B", "台湾200mm, 低成本", "无", "#8fa3b8"],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(79,195,247,0.06)" }}>
                  <td className="py-2.5 pr-3 font-medium" style={{ color: row[7] as string }}>{row[0]}</td>
                  <td className="py-2.5 pr-3" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{row[1]}</td>
                  <td className="py-2.5 pr-3" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{row[2]}</td>
                  <td className="py-2.5 pr-3" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{row[3]}</td>
                  <td className="py-2.5 pr-3" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{row[4]}</td>
                  <td className="py-2.5 pr-3">{row[5]}</td>
                  <td className="py-2.5" style={{ color: row[6] === "领先" ? "#26a69a" : row[6] === "有限" ? "#ff9800" : "#ef5350" }}>{row[6]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue Comparison Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="data-card">
          <h3 className="text-base font-semibold mb-1" style={{ color: "#4fc3f7" }}>Specialty Foundry收入规模对比</h3>
          <p className="text-xs mb-4" style={{ color: "#8fa3b8" }}>
            Tower在收入规模上位于Specialty Foundry的中间位置，但在估值倍数上享有显著溢价，反映了市场对其SiPho增长潜力的认可。
          </p>
          <div className="h-56">
            <Bar
              data={{
                labels: ["UMC", "GFS", "Hua Hong", "Tower", "VIS", "X-FAB"],
                datasets: [{
                  label: "FY Revenue ($B)",
                  data: [7.2, 6.75, 1.95, 1.57, 1.1, 0.85],
                  backgroundColor: [
                    "rgba(100,130,180,0.5)", "rgba(100,130,180,0.5)", "rgba(100,130,180,0.5)",
                    "rgba(79,195,247,0.7)", "rgba(100,130,180,0.5)", "rgba(100,130,180,0.5)",
                  ],
                  borderColor: [
                    "rgba(100,130,180,0.8)", "rgba(100,130,180,0.8)", "rgba(100,130,180,0.8)",
                    "#4fc3f7", "rgba(100,130,180,0.8)", "rgba(100,130,180,0.8)",
                  ],
                  borderWidth: 1,
                  borderRadius: 3,
                }],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: "y" as const,
                plugins: {
                  legend: { display: false },
                  tooltip: { ...tooltipStyle, callbacks: { label: (ctx: any) => `$${ctx.parsed.x}B` } },
                },
                scales: {
                  x: { ticks: { ...tickStyle, callback: (v: any) => `$${v}B` }, grid: gridStyle },
                  y: { ticks: tickStyle, grid: { display: false } },
                },
              }}
            />
          </div>
        </div>

        <div className="data-card">
          <h3 className="text-base font-semibold mb-1" style={{ color: "#4fc3f7" }}>EV/Revenue估值倍数对比</h3>
          <p className="text-xs mb-4" style={{ color: "#8fa3b8" }}>
            Tower的EV/Revenue倍数显著高于同业，反映了SiPho带来的高增长预期。
          </p>
          <div className="h-56">
            <Bar
              data={{
                labels: ["Tower", "GFS", "UMC", "X-FAB", "Hua Hong", "VIS"],
                datasets: [{
                  label: "EV/Revenue (TTM)",
                  data: [13.5, 3.6, 2.8, 3.3, 4.4, 4.7],
                  backgroundColor: [
                    "rgba(79,195,247,0.7)", "rgba(100,130,180,0.5)", "rgba(100,130,180,0.5)",
                    "rgba(100,130,180,0.5)", "rgba(100,130,180,0.5)", "rgba(100,130,180,0.5)",
                  ],
                  borderColor: [
                    "#4fc3f7", "rgba(100,130,180,0.8)", "rgba(100,130,180,0.8)",
                    "rgba(100,130,180,0.8)", "rgba(100,130,180,0.8)", "rgba(100,130,180,0.8)",
                  ],
                  borderWidth: 1,
                  borderRadius: 3,
                }],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: { ...tooltipStyle, callbacks: { label: (ctx: any) => `${ctx.parsed.y}x` } },
                },
                scales: {
                  x: { ticks: tickStyle, grid: gridStyle },
                  y: { ticks: { ...tickStyle, callback: (v: any) => `${v}x` }, grid: gridStyle },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Competitive Moats */}
      <div className="data-card">
        <h3 className="text-base font-semibold mb-4" style={{ color: "#4fc3f7" }}>Tower的竞争护城河分析</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "技术壁垒 (高)",
              color: "#26a69a",
              points: [
                "SiPho Foundry技术领先2-3年: Tower是唯一能大规模量产1.6T SiPho的Pure-Play Foundry",
                "30+年Analog工艺IP积累: BCD 700V、SiGe BiCMOS、RF-SOI等工艺需要长期迭代优化",
                "工艺复杂度: Specialty Analog不是简单的线宽缩小，而是器件物理的深度优化",
                "客户Co-Development: 定制化工艺开发创造了独特的技术锁定效应",
              ],
            },
            {
              title: "客户粘性 (高)",
              color: "#4fc3f7",
              points: [
                "Automotive认证周期: AEC-Q100认证需要12-24个月，转换成本极高",
                "产品生命周期长: Analog芯片产品周期通常10-20年，客户不轻易更换Foundry",
                "SiPho客户预付款: 70%+产能已通过预付款锁定至2028年",
                "多年期供货协议: 长期合同保障收入可见性",
              ],
            },
            {
              title: "规模与布局 (中-高)",
              color: "#ff9800",
              points: [
                "6座Fab横跨3大洲: 以色列、美国(2座)、日本(2座)、意大利",
                "200mm + 300mm双平台: 覆盖不同成本和技术需求",
                "STMicroelectronics合作: 共享Agrate 300mm Fab",
                "TPSCo全资控股: 日本300mm产能4倍扩张",
              ],
            },
            {
              title: "市场定位 (独特)",
              color: "#ab47bc",
              points: [
                "唯一同时拥有SiPho + SiGe + BCD + RF + CIS + MEMS的Specialty Foundry",
                "AI基础设施供应链的不可替代环节",
                "从传统Analog Foundry向AI光互连平台转型",
                "Nvidia、Coherent等Hyperscaler和Tier-1客户背书",
              ],
            },
          ].map((moat) => (
            <div key={moat.title} className="p-4 rounded" style={{ background: "rgba(79,195,247,0.04)", border: `1px solid ${moat.color}30` }}>
              <h4 className="text-sm font-semibold mb-3" style={{ color: moat.color }}>{moat.title}</h4>
              <ul className="space-y-2">
                {moat.points.map((point, i) => (
                  <li key={i} className="text-xs leading-relaxed flex gap-2" style={{ color: "#8fa3b8" }}>
                    <span style={{ color: moat.color }}>-</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* GlobalFoundries Patent Lawsuit */}
      <div className="data-card" style={{ borderLeft: "3px solid #ef5350" }}>
        <h3 className="text-sm font-semibold mb-2" style={{ color: "#ef5350" }}>
          风险关注: GlobalFoundries专利诉讼 (2026年3月)
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "#c8d6e5" }}>
          2026年3月26日，GlobalFoundries对Tower Semiconductor提起专利侵权诉讼，涉及11项专利，主要涵盖FinFET、SOI和其他半导体制造技术。这是Specialty Foundry领域竞争加剧的信号。虽然Tower不使用FinFET技术(其工艺节点为180nm-65nm)，但诉讼可能涉及某些基础工艺专利。诉讼结果存在不确定性，但考虑到Tower的技术独立性和工艺差异化，实际影响可能有限。需要持续关注诉讼进展。
        </p>
      </div>
    </div>
  );
}

/**
 * 估值与投资论点 Tab
 * Valuation, catalysts, risks, target price
 */

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
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, Filler);

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

export default function ValuationThesis() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-2" style={{ color: "#e8edf3" }}>估值与投资论点</h2>
        <p className="text-sm leading-relaxed" style={{ color: "#8fa3b8" }}>
          Tower Semiconductor正处于从传统Specialty Analog Foundry向AI光互连基础设施核心供应商转型的关键节点。$920M的SiPho CapEx投资将在2027年开始产生显著回报，推动公司收入和利润率进入新的增长轨道。当前估值已反映了部分增长预期，但长期上行空间仍然显著。
        </p>
      </div>

      {/* Investment Rating Box */}
      <div className="data-card" style={{ border: "1px solid rgba(38,166,154,0.4)", background: "linear-gradient(135deg, rgba(15,32,53,1), rgba(20,40,65,1))" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="text-center md:text-left">
            <div className="stat-label mb-1">投资评级</div>
            <div className="text-2xl font-bold" style={{ color: "#26a69a" }}>买入 (Buy)</div>
            <div className="text-xs mt-1" style={{ color: "#8fa3b8" }}>长期持有，逢低加仓</div>
          </div>
          <div className="text-center">
            <div className="stat-label mb-1">12个月目标价</div>
            <div className="text-3xl font-bold" style={{ color: "#4fc3f7", fontFamily: "'IBM Plex Mono', monospace" }}>$230</div>
            <div className="text-xs mt-1 positive" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              Upside: +21.9% (vs $188.74)
            </div>
          </div>
          <div className="text-center md:text-right">
            <div className="stat-label mb-1">长期目标价 (2028)</div>
            <div className="text-3xl font-bold" style={{ color: "#ff9800", fontFamily: "'IBM Plex Mono', monospace" }}>$350+</div>
            <div className="text-xs mt-1" style={{ color: "#ff9800", fontFamily: "'IBM Plex Mono', monospace" }}>
              Upside: +85%+ (SiPho Full Ramp)
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Projection */}
      <div className="data-card">
        <h3 className="text-base font-semibold mb-1" style={{ color: "#4fc3f7" }}>收入增长预测模型</h3>
        <p className="text-xs mb-4" style={{ color: "#8fa3b8" }}>
          基于SiPho产能5x扩张(2027年Full Starts)、基础业务稳健增长(5-8% CAGR)、以及新平台(CPO, AI Power)贡献，我们预计Tower收入将从FY2025的$1.57B增长至FY2028的$3.2B。
        </p>
        <div className="h-72">
          <Bar
            data={{
              labels: ["FY2024", "FY2025", "FY2026E", "FY2027E", "FY2028E"],
              datasets: [
                {
                  label: "Base Business ($M)",
                  data: [1340, 1342, 1420, 1500, 1580],
                  backgroundColor: "rgba(100,130,180,0.5)",
                  borderColor: "rgba(100,130,180,0.8)",
                  borderWidth: 1,
                  borderRadius: 3,
                },
                {
                  label: "SiPho Revenue ($M)",
                  data: [106, 228, 450, 900, 1400],
                  backgroundColor: "rgba(79,195,247,0.7)",
                  borderColor: "#4fc3f7",
                  borderWidth: 1,
                  borderRadius: 3,
                },
                {
                  label: "New Platforms ($M)",
                  data: [0, 0, 30, 100, 220],
                  backgroundColor: "rgba(38,166,154,0.6)",
                  borderColor: "#26a69a",
                  borderWidth: 1,
                  borderRadius: 3,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  labels: { color: "#8fa3b8", font: { size: 10 }, usePointStyle: true, pointStyleWidth: 8 },
                },
                tooltip: {
                  ...tooltipStyle,
                  callbacks: {
                    label: (ctx: any) => `${ctx.dataset.label}: $${ctx.parsed.y}M`,
                    footer: (items: any[]) => {
                      const total = items.reduce((sum: number, item: any) => sum + item.parsed.y, 0);
                      return `Total: $${total}M`;
                    },
                  },
                },
              },
              scales: {
                x: { stacked: true, ticks: tickStyle, grid: gridStyle },
                y: { stacked: true, ticks: { ...tickStyle, callback: (v: any) => `$${v}M` }, grid: gridStyle },
              },
            }}
          />
        </div>
        <div className="grid grid-cols-5 gap-2 mt-4 text-center">
          {[
            { year: "FY2024", total: "$1.44B", growth: "+0.9%" },
            { year: "FY2025", total: "$1.57B", growth: "+9.0%" },
            { year: "FY2026E", total: "$1.90B", growth: "+21%" },
            { year: "FY2027E", total: "$2.50B", growth: "+32%" },
            { year: "FY2028E", total: "$3.20B", growth: "+28%" },
          ].map((y) => (
            <div key={y.year}>
              <div className="text-xs" style={{ color: "#5a7089" }}>{y.year}</div>
              <div className="text-sm font-semibold" style={{ color: "#e8edf3", fontFamily: "'IBM Plex Mono', monospace" }}>{y.total}</div>
              <div className="text-xs positive" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{y.growth}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Valuation Scenarios */}
      <div className="data-card">
        <h3 className="text-base font-semibold mb-3" style={{ color: "#4fc3f7" }}>估值情景分析</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs" style={{ color: "#8fa3b8" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(79,195,247,0.2)" }}>
                {["情景", "FY2027E Revenue", "EV/Revenue", "Target EV", "Target Price", "Upside"].map((h) => (
                  <th key={h} className="text-left py-2.5 pr-4 font-semibold" style={{ color: "#e8edf3" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["牛市 (Bull)", "$2.8B", "10x", "$28.0B", "$280+", "+48%", "#26a69a"],
                ["基准 (Base)", "$2.5B", "9x", "$22.5B", "$230", "+22%", "#4fc3f7"],
                ["保守 (Bear)", "$2.2B", "7x", "$15.4B", "$165", "-13%", "#ef5350"],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(79,195,247,0.06)" }}>
                  <td className="py-2.5 pr-4 font-semibold" style={{ color: row[6] as string }}>{row[0]}</td>
                  <td className="py-2.5 pr-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{row[1]}</td>
                  <td className="py-2.5 pr-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{row[2]}</td>
                  <td className="py-2.5 pr-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{row[3]}</td>
                  <td className="py-2.5 pr-4 font-semibold" style={{ fontFamily: "'IBM Plex Mono', monospace", color: row[6] as string }}>{row[4]}</td>
                  <td className="py-2.5" style={{ fontFamily: "'IBM Plex Mono', monospace", color: row[6] as string }}>{row[5]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs mt-3" style={{ color: "#5a7089" }}>
          估值基于FY2027E Forward Revenue的EV/Revenue倍数。考虑到SiPho的高增长属性和客户预付款的收入可见性，我们认为9-10x的Forward EV/Revenue是合理的。
        </p>
      </div>

      {/* Analyst Consensus */}
      <div className="data-card">
        <h3 className="text-base font-semibold mb-3" style={{ color: "#4fc3f7" }}>Analyst共识与目标价</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="overflow-x-auto">
            <table className="w-full text-xs" style={{ color: "#8fa3b8" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(79,195,247,0.2)" }}>
                  {["机构", "评级", "目标价", "日期"].map((h) => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold" style={{ color: "#e8edf3" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Benchmark", "Buy", "$230", "2026.02"],
                  ["Susquehanna", "Positive", "$180", "2026.02"],
                  ["Needham", "Buy", "$175", "2026.01"],
                  ["Craig-Hallum", "Buy", "$165", "2025.11"],
                  ["Consensus Avg", "—", "$188", "—"],
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid rgba(79,195,247,0.06)" }}>
                    <td className="py-2 pr-4" style={{ color: i === 4 ? "#4fc3f7" : "#e8edf3" }}>{row[0]}</td>
                    <td className="py-2 pr-4" style={{ color: "#26a69a" }}>{row[1]}</td>
                    <td className="py-2 pr-4" style={{ fontFamily: "'IBM Plex Mono', monospace", color: i === 4 ? "#4fc3f7" : "#8fa3b8" }}>{row[2]}</td>
                    <td className="py-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-sm" style={{ color: "#8fa3b8" }}>
            <p className="mb-3">
              Benchmark的Cody Acree是最看好Tower的分析师，在Q4 2025财报后将目标价从$165大幅上调至$230，理由是SiPho增长超预期和$920M CapEx计划的战略意义。
            </p>
            <p>
              值得注意的是，当前股价($188.74)已接近Consensus平均目标价，说明市场已部分Price-in了近期增长。但我们认为长期(2027-2028)的SiPho Full Ramp潜力尚未被充分反映。
            </p>
          </div>
        </div>
      </div>

      {/* Catalysts */}
      <div className="data-card">
        <h3 className="text-base font-semibold mb-4" style={{ color: "#26a69a" }}>催化剂 (Catalysts)</h3>
        <div className="space-y-4">
          {[
            {
              title: "SiPho产能5x扩张完成 (2026 Q4)",
              timeline: "2026年12月",
              impact: "高",
              desc: "$920M CapEx计划的全部设备安装和认证目标在2026年Q4完成。一旦认证通过，2027年即可开始Full Starts，SiPho收入将出现阶跃式增长。",
            },
            {
              title: "Nvidia 1.6T光模块量产",
              timeline: "2026-2027",
              impact: "高",
              desc: "Nvidia的Spectrum-X和Quantum-X CPO交换机量产将直接拉动Tower SiPho wafer需求。Nvidia是Tower最重要的SiPho客户之一。",
            },
            {
              title: "TPSCo Fab 7全资控股 & 300mm扩产",
              timeline: "2026年",
              impact: "中-高",
              desc: "Tower获取日本Fab 7全资控股权后，将推进300mm产能4倍扩张，为SiPho和SiGe提供额外的大规模生产能力。",
            },
            {
              title: "CPO (Co-Packaged Optics)平台商业化",
              timeline: "2027-2028",
              impact: "中",
              desc: "Tower已发布CPO Foundry平台，与Scintil Photonics合作推出异质集成DWDM激光器。CPO是下一代AI数据中心互连的关键技术。",
            },
            {
              title: "AI Power技术进入$2.5B Smart Power Stage市场",
              timeline: "2026-2027",
              impact: "中",
              desc: "Tower新推出的AI Power技术瞄准Monolithic Smart Power Stage和DrMOS应用，为AI服务器电源管理提供解决方案。",
            },
            {
              title: "每季度收入和利润率环比增长 (2026全年)",
              timeline: "2026年全年",
              impact: "中",
              desc: "管理层明确的FY2026目标。如果每季度都能兑现，将持续推动股价上行。",
            },
          ].map((cat, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="shrink-0 mt-0.5">
                <span className="text-xs px-2 py-0.5 rounded" style={{
                  background: cat.impact === "高" ? "rgba(38,166,154,0.15)" : "rgba(79,195,247,0.15)",
                  color: cat.impact === "高" ? "#26a69a" : "#4fc3f7",
                  fontFamily: "'IBM Plex Mono', monospace",
                }}>
                  {cat.impact}
                </span>
              </div>
              <div className="flex-1 pb-3" style={{ borderBottom: i < 5 ? "1px solid rgba(79,195,247,0.06)" : "none" }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold" style={{ color: "#e8edf3" }}>{cat.title}</span>
                  <span className="text-xs" style={{ color: "#5a7089", fontFamily: "'IBM Plex Mono', monospace" }}>{cat.timeline}</span>
                </div>
                <p className="text-xs" style={{ color: "#8fa3b8" }}>{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risks */}
      <div className="data-card">
        <h3 className="text-base font-semibold mb-4" style={{ color: "#ef5350" }}>风险因素 (Risks)</h3>
        <div className="space-y-4">
          {[
            {
              title: "SiPho产能认证延迟风险",
              severity: "高",
              desc: "$920M CapEx的认证目标是2026年Q4。如果设备安装或工艺认证出现延迟，将直接影响2027年的收入预期。半导体设备交付和工艺Ramp-up存在固有的不确定性。",
            },
            {
              title: "GlobalFoundries专利诉讼",
              severity: "中",
              desc: "2026年3月GF对Tower提起11项专利侵权诉讼。虽然Tower的工艺节点与GF的FinFET专利差异较大，但诉讼过程可能带来法律费用和管理层注意力分散。",
            },
            {
              title: "Intel NM Fab协议破裂",
              severity: "中",
              desc: "Intel不履行NM代工协议，Tower失去了原计划的300mm产能。虽然客户已重定向至Fab 7，但短期内可能影响部分客户的交付时间线。",
            },
            {
              title: "估值溢价风险",
              severity: "中",
              desc: "当前EV/Revenue约13.5x(TTM)，显著高于Specialty Foundry同业(3-5x)。如果SiPho增长不及预期，估值可能面临压缩。",
            },
            {
              title: "客户集中度风险",
              severity: "中",
              desc: "SiPho收入可能高度集中于少数大客户(Nvidia、Coherent等)。任何主要客户的订单变化都可能对收入产生显著影响。",
            },
            {
              title: "地缘政治风险",
              severity: "低-中",
              desc: "Tower总部和Fab 1位于以色列，地区安全局势可能影响运营。但公司已通过多区域Fab布局(美国、日本、意大利)分散了风险。",
            },
            {
              title: "重资本支出周期下的FCF压力",
              severity: "低-中",
              desc: "FY2025 FCF为-$42M，FY2026预计CapEx仍将维持高位($500-600M)。虽然公司现金储备充足(~$1B)，但持续的负FCF可能引发部分投资者担忧。",
            },
          ].map((risk, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="shrink-0 mt-0.5">
                <span className="text-xs px-2 py-0.5 rounded" style={{
                  background: risk.severity === "高" ? "rgba(239,83,80,0.15)" : risk.severity === "中" ? "rgba(255,152,0,0.15)" : "rgba(120,144,156,0.15)",
                  color: risk.severity === "高" ? "#ef5350" : risk.severity === "中" ? "#ff9800" : "#78909c",
                  fontFamily: "'IBM Plex Mono', monospace",
                }}>
                  {risk.severity}
                </span>
              </div>
              <div className="flex-1 pb-3" style={{ borderBottom: i < 6 ? "1px solid rgba(79,195,247,0.06)" : "none" }}>
                <div className="text-sm font-semibold mb-1" style={{ color: "#e8edf3" }}>{risk.title}</div>
                <p className="text-xs" style={{ color: "#8fa3b8" }}>{risk.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Investment Thesis Summary */}
      <div className="data-card" style={{ borderLeft: "3px solid #4fc3f7" }}>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "#4fc3f7" }}>投资论点总结</h3>
        <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#c8d6e5" }}>
          <p>
            <strong style={{ color: "#e8edf3" }}>核心论点:</strong> Tower Semiconductor正在经历一次历史性的业务转型——从传统的Specialty Analog Foundry升级为AI光互连基础设施的核心供应商。SiPho技术使Tower成为了AI数据中心1.6T光模块供应链中不可替代的一环，这一战略定位在Pure-Play Foundry中是独一无二的。
          </p>
          <p>
            <strong style={{ color: "#e8edf3" }}>增长可见性:</strong> $920M CapEx计划中70%+的产能已通过客户预付款锁定至2028年，这提供了极高的收入可见性。2027年SiPho Full Starts后，公司收入有望从$1.57B(FY2025)增长至$2.5B+(FY2027)和$3.2B+(FY2028)。
          </p>
          <p>
            <strong style={{ color: "#e8edf3" }}>利润率扩张:</strong> SiPho产品的ASP和Incremental Margin显著高于传统Analog产品。随着SiPho收入占比从14.5%(FY2025)提升至40%+(FY2028)，公司整体Gross Margin有望从23%扩张至30%+。
          </p>
          <p>
            <strong style={{ color: "#e8edf3" }}>估值观点:</strong> 当前$188.74的股价对应FY2027E约9x EV/Revenue，考虑到30%+的收入增长和利润率扩张潜力，我们认为估值合理。12个月目标价$230(基于FY2027E 9x EV/Revenue)，长期目标价$350+(基于FY2028E SiPho Full Ramp)。
          </p>
          <p>
            <strong style={{ color: "#e8edf3" }}>主要风险:</strong> SiPho产能认证延迟、估值溢价压缩、客户集中度。建议投资者在充分理解这些风险的前提下，将Tower作为AI基础设施主题的核心持仓之一。
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-xs p-4 rounded" style={{ color: "#5a7089", background: "rgba(79,195,247,0.03)", border: "1px solid rgba(79,195,247,0.06)" }}>
        <strong>免责声明:</strong> 本报告仅供研究参考，不构成任何投资建议或买卖推荐。投资者应根据自身风险承受能力和投资目标做出独立判断。过往业绩不代表未来表现。所有预测和估值均基于公开信息和分析师假设，实际结果可能存在重大差异。Skyark Research不对因使用本报告而产生的任何损失承担责任。
      </div>
    </div>
  );
}

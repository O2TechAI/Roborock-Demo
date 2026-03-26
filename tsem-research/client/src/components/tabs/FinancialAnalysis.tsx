/**
 * 财务分析 Tab
 * Revenue, Profitability, Cash Flow, Margins, Quarterly Trends
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

export default function FinancialAnalysis() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-2" style={{ color: "#e8edf3" }}>财务分析</h2>
        <p className="text-sm leading-relaxed" style={{ color: "#8fa3b8" }}>
          Tower Semiconductor在FY2025实现了强劲的财务表现，全年收入$1.57B(同比+9%)，Q4收入创历史新高$440M。公司正处于大规模CapEx投资周期中($920M SiPho/SiGe扩产)，短期内FCF承压，但这些投资将在2027年开始产生显著的收入和利润贡献。
        </p>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "FY2025 Revenue", value: "$1.57B", change: "+9.0% YoY", positive: true },
          { label: "Q4 2025 Revenue", value: "$440M", change: "Record High", positive: true },
          { label: "Q4 Gross Margin", value: "26.8%", change: "+330bps QoQ", positive: true },
          { label: "FY2025 Net Profit", value: "$220M", change: "+5.8% YoY", positive: true },
          { label: "FY2025 EPS", value: "$1.94", change: "+4.9% YoY", positive: true },
          { label: "Q1 2026 Guide", value: "$412M", change: "+15% YoY", positive: true },
        ].map((m) => (
          <div key={m.label} className="data-card text-center">
            <div className="stat-label mb-1.5">{m.label}</div>
            <div className="stat-value text-lg">{m.value}</div>
            <div className={`text-xs mt-1 ${m.positive ? "positive" : "negative"}`} style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {m.change}
            </div>
          </div>
        ))}
      </div>

      {/* Annual Revenue Trend */}
      <div className="data-card">
        <h3 className="text-base font-semibold mb-1" style={{ color: "#4fc3f7" }}>年度收入趋势 (2018-2025)</h3>
        <p className="text-xs mb-4" style={{ color: "#8fa3b8" }}>
          Tower的收入在2021-2022年受益于全球芯片短缺周期达到峰值$1.68B，2023年经历行业下行后在2024-2025年强劲复苏。FY2025收入$1.57B，Q4 run-rate年化已达$1.76B。
        </p>
        <div className="h-64">
          <Bar
            data={{
              labels: ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"],
              datasets: [{
                label: "Revenue ($M)",
                data: [1300, 1230, 1270, 1510, 1680, 1420, 1440, 1570],
                backgroundColor: [
                  "rgba(100,130,180,0.5)", "rgba(100,130,180,0.5)", "rgba(100,130,180,0.5)",
                  "rgba(100,130,180,0.5)", "rgba(100,130,180,0.5)", "rgba(100,130,180,0.5)",
                  "rgba(100,130,180,0.5)", "rgba(79,195,247,0.7)",
                ],
                borderColor: [
                  "rgba(100,130,180,0.8)", "rgba(100,130,180,0.8)", "rgba(100,130,180,0.8)",
                  "rgba(100,130,180,0.8)", "rgba(100,130,180,0.8)", "rgba(100,130,180,0.8)",
                  "rgba(100,130,180,0.8)", "#4fc3f7",
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
                tooltip: { ...tooltipStyle, callbacks: { label: (ctx: any) => `$${ctx.parsed.y}M` } },
              },
              scales: {
                x: { ticks: tickStyle, grid: gridStyle },
                y: { ticks: { ...tickStyle, callback: (v: any) => `$${v}M` }, grid: gridStyle },
              },
            }}
          />
        </div>
      </div>

      {/* Quarterly Revenue Progression */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="data-card">
          <h3 className="text-base font-semibold mb-1" style={{ color: "#4fc3f7" }}>季度收入走势 (2024-2025)</h3>
          <p className="text-xs mb-4" style={{ color: "#8fa3b8" }}>
            2025年每季度均实现环比增长，Q4/Q1增长23%，体现强劲的需求加速。
          </p>
          <div className="h-56">
            <Line
              data={{
                labels: ["Q1'24", "Q2'24", "Q3'24", "Q4'24", "Q1'25", "Q2'25", "Q3'25", "Q4'25"],
                datasets: [{
                  label: "Revenue ($M)",
                  data: [342, 351, 370, 380, 357, 373, 396, 440],
                  borderColor: "#4fc3f7",
                  backgroundColor: "rgba(79,195,247,0.1)",
                  fill: true,
                  tension: 0.3,
                  pointBackgroundColor: "#4fc3f7",
                  pointRadius: 4,
                }],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: { ...tooltipStyle, callbacks: { label: (ctx: any) => `$${ctx.parsed.y}M` } },
                },
                scales: {
                  x: { ticks: tickStyle, grid: gridStyle },
                  y: { ticks: { ...tickStyle, callback: (v: any) => `$${v}M` }, grid: gridStyle, min: 300 },
                },
              }}
            />
          </div>
        </div>

        {/* Margin Trends */}
        <div className="data-card">
          <h3 className="text-base font-semibold mb-1" style={{ color: "#4fc3f7" }}>利润率趋势</h3>
          <p className="text-xs mb-4" style={{ color: "#8fa3b8" }}>
            Q4 2025 Gross Margin达26.8%，Operating Margin 16.1%，Net Margin 18.2%，均为近期高点。
          </p>
          <div className="h-56">
            <Line
              data={{
                labels: ["Q1'25", "Q2'25", "Q3'25", "Q4'25"],
                datasets: [
                  {
                    label: "Gross Margin",
                    data: [20.4, 21.7, 23.5, 26.8],
                    borderColor: "#4fc3f7",
                    pointBackgroundColor: "#4fc3f7",
                    pointRadius: 4,
                    tension: 0.3,
                  },
                  {
                    label: "Operating Margin",
                    data: [9.5, 11.0, 12.9, 16.1],
                    borderColor: "#26a69a",
                    pointBackgroundColor: "#26a69a",
                    pointRadius: 4,
                    tension: 0.3,
                  },
                  {
                    label: "Net Margin",
                    data: [10.6, 12.3, 13.6, 18.2],
                    borderColor: "#ff9800",
                    pointBackgroundColor: "#ff9800",
                    pointRadius: 4,
                    tension: 0.3,
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
                  tooltip: { ...tooltipStyle, callbacks: { label: (ctx: any) => `${ctx.dataset.label}: ${ctx.parsed.y}%` } },
                },
                scales: {
                  x: { ticks: tickStyle, grid: gridStyle },
                  y: { ticks: { ...tickStyle, callback: (v: any) => `${v}%` }, grid: gridStyle },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Income Statement Summary */}
      <div className="data-card">
        <h3 className="text-base font-semibold mb-3" style={{ color: "#4fc3f7" }}>损益表摘要</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs" style={{ color: "#8fa3b8" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(79,195,247,0.2)" }}>
                {["指标", "FY2023", "FY2024", "FY2025", "YoY变化"].map((h) => (
                  <th key={h} className="text-left py-2.5 pr-4 font-semibold" style={{ color: "#e8edf3" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Revenue", "$1.42B", "$1.44B", "$1.57B", "+9.0%", true],
                ["Gross Profit", "$296M", "$339M", "$364M", "+7.4%", true],
                ["Gross Margin", "20.8%", "23.5%", "23.2%", "-30bps", false],
                ["Operating Profit", "$147M", "$191M", "$194M", "+1.6%", true],
                ["Operating Margin", "10.4%", "13.3%", "12.4%", "-90bps", false],
                ["Net Profit", "$163M", "$208M", "$220M", "+5.8%", true],
                ["EPS (Diluted)", "$1.46", "$1.85", "$1.94", "+4.9%", true],
                ["Operating Cash Flow", "$406M", "$449M", "$395M*", "-12.0%", false],
                ["CapEx", "$305M", "$432M", "$437M", "+1.2%", false],
                ["Free Cash Flow", "$101M", "$17M", "-$42M*", "N/A", false],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(79,195,247,0.06)" }}>
                  <td className="py-2 pr-4 font-medium" style={{ color: "#e8edf3" }}>{row[0]}</td>
                  <td className="py-2 pr-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{row[1]}</td>
                  <td className="py-2 pr-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{row[2]}</td>
                  <td className="py-2 pr-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{row[3]}</td>
                  <td className="py-2" style={{ fontFamily: "'IBM Plex Mono', monospace", color: row[4] ? "#26a69a" : "#ef5350" }}>{row[4] as string}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-xs" style={{ color: "#5a7089" }}>
          * FY2025 Operating Cash Flow包含$105M Fab 3 Newport Beach租约延期预付款
        </div>
      </div>

      {/* Q4 2025 Quarterly Detail */}
      <div className="data-card">
        <h3 className="text-base font-semibold mb-3" style={{ color: "#4fc3f7" }}>Q4 2025季度详情 (创纪录季度)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="overflow-x-auto">
            <table className="w-full text-xs" style={{ color: "#8fa3b8" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(79,195,247,0.2)" }}>
                  {["指标", "Q4 2025", "Q3 2025", "QoQ变化"].map((h) => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold" style={{ color: "#e8edf3" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Revenue", "$440M", "$396M", "+11.1%"],
                  ["Gross Profit", "$118M", "$93M", "+26.9%"],
                  ["Gross Margin", "26.8%", "23.5%", "+330bps"],
                  ["Operating Profit", "$71M", "$51M", "+39.2%"],
                  ["Net Profit", "$80M", "$54M", "+48.1%"],
                  ["EPS (Diluted)", "$0.70", "$0.47", "+48.9%"],
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid rgba(79,195,247,0.06)" }}>
                    <td className="py-2 pr-4 font-medium" style={{ color: "#e8edf3" }}>{row[0]}</td>
                    <td className="py-2 pr-4" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#4fc3f7" }}>{row[1]}</td>
                    <td className="py-2 pr-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{row[2]}</td>
                    <td className="py-2" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#26a69a" }}>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2" style={{ color: "#e8edf3" }}>Q4亮点分析</h4>
            <div className="space-y-3 text-xs" style={{ color: "#8fa3b8" }}>
              <p>
                Q4 2025是Tower历史上收入最高的季度($440M)，同比增长14%，环比增长11%。公司成功实现了年初设定的"每季度环比增长、下半年加速"的目标。
              </p>
              <p>
                利润率显著改善是Q4最大亮点。Gross Margin从Q3的23.5%跳升至26.8%，反映了SiPho高ASP产品占比提升带来的强劲Incremental Margin。Operating Profit环比增长39%至$71M。
              </p>
              <p>
                Net Profit $80M(EPS $0.70)环比增长48%，部分受益于有利的税率和汇率。Q4 Operating Cash Flow为$40M，较低是因为包含了$105M的Fab 3租约预付款。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cash Flow & CapEx */}
      <div className="data-card">
        <h3 className="text-base font-semibold mb-1" style={{ color: "#4fc3f7" }}>现金流与资本支出</h3>
        <p className="text-xs mb-4" style={{ color: "#8fa3b8" }}>
          Tower正处于大规模CapEx投资周期中。$920M的SiPho/SiGe扩产计划导致FY2025 FCF转负(-$42M)。但这些投资将在2027年开始产生显著回报，届时SiPho产能将达到当前的5倍以上。
        </p>
        <div className="h-64">
          <Bar
            data={{
              labels: ["FY2022", "FY2023", "FY2024", "FY2025", "FY2026E"],
              datasets: [
                {
                  label: "Operating Cash Flow ($M)",
                  data: [420, 406, 449, 395, 500],
                  backgroundColor: "rgba(38,166,154,0.6)",
                  borderColor: "#26a69a",
                  borderWidth: 1,
                  borderRadius: 3,
                },
                {
                  label: "CapEx ($M)",
                  data: [200, 305, 432, 437, 550],
                  backgroundColor: "rgba(239,83,80,0.5)",
                  borderColor: "#ef5350",
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
                tooltip: { ...tooltipStyle, callbacks: { label: (ctx: any) => `${ctx.dataset.label}: $${ctx.parsed.y}M` } },
              },
              scales: {
                x: { ticks: tickStyle, grid: gridStyle },
                y: { ticks: { ...tickStyle, callback: (v: any) => `$${v}M` }, grid: gridStyle },
              },
            }}
          />
        </div>
      </div>

      {/* Balance Sheet Highlights */}
      <div className="data-card" style={{ borderLeft: "3px solid #4fc3f7" }}>
        <h3 className="text-sm font-semibold mb-2" style={{ color: "#4fc3f7" }}>资产负债表要点</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm" style={{ color: "#8fa3b8" }}>
          <div>
            <div className="stat-label mb-1">Cash & Short-term Deposits</div>
            <div className="stat-value text-base">~$1.0B</div>
            <div className="text-xs mt-1" style={{ color: "#5a7089" }}>充足的现金储备支撑CapEx计划</div>
          </div>
          <div>
            <div className="stat-label mb-1">Total Debt</div>
            <div className="stat-value text-base">~$500M</div>
            <div className="text-xs mt-1" style={{ color: "#5a7089" }}>Net Debt/EBITDA约1.0x，杠杆率健康</div>
          </div>
          <div>
            <div className="stat-label mb-1">Shares Outstanding</div>
            <div className="stat-value text-base">112.45M</div>
            <div className="text-xs mt-1" style={{ color: "#5a7089" }}>股本稳定，无重大稀释风险</div>
          </div>
        </div>
      </div>

      {/* Guidance */}
      <div className="data-card" style={{ borderLeft: "3px solid #26a69a" }}>
        <h3 className="text-sm font-semibold mb-2" style={{ color: "#26a69a" }}>管理层指引 & 展望</h3>
        <div className="space-y-3 text-sm" style={{ color: "#c8d6e5" }}>
          <p>
            <strong style={{ color: "#e8edf3" }}>Q1 2026 Revenue Guide:</strong> $412M (±5%)，同比增长15%。虽然环比Q4有所下降(季节性)，但同比增速加快。
          </p>
          <p>
            <strong style={{ color: "#e8edf3" }}>FY2026目标:</strong> 管理层明确表示目标为"2026年每季度收入和利润率环比增长"。这意味着FY2026收入有望达到$1.8-1.9B区间。
          </p>
          <p>
            <strong style={{ color: "#e8edf3" }}>长期展望:</strong> 随着$920M SiPho CapEx在2026年底完成认证、2027年开始Full Starts，公司收入有望在FY2027-2028实现显著跳升。Analyst估计FY2027收入可达$2.4-2.8B，FY2028可达$3.0-3.5B。
          </p>
        </div>
      </div>
    </div>
  );
}

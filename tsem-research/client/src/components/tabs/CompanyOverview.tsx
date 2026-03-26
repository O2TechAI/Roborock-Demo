/**
 * 公司概览 Tab
 * Tower Semiconductor业务模型、历史、管理层、Fab布局
 */

export default function CompanyOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-2" style={{ color: "#e8edf3" }}>公司概览</h2>
        <p className="text-sm leading-relaxed" style={{ color: "#8fa3b8" }}>
          Tower Semiconductor Ltd. (NASDAQ/TASE: TSEM) 成立于1993年，总部位于以色列Migdal Haemek，是全球领先的Specialty Analog半导体Foundry。公司专注于为Fabless公司和IDM客户提供高价值的定制化Analog工艺解决方案，涵盖SiPho、SiGe BiCMOS、RF-SOI/RF-CMOS、Power Management (BCD)、CMOS Image Sensor、MEMS等多个技术平台。公司拥有超过30年的Analog工艺积累，在全球运营6座晶圆厂。
        </p>
      </div>

      {/* Company Profile Card */}
      <div className="data-card">
        <h3 className="text-base font-semibold mb-4" style={{ color: "#4fc3f7" }}>公司基本信息</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
          {[
            ["公司全称", "Tower Semiconductor Ltd."],
            ["成立时间", "1993年"],
            ["总部", "Migdal Haemek, Israel"],
            ["CEO", "Russell Ellwanger (自2005年)"],
            ["CFO", "Oren Shirazi"],
            ["CTO", "Dr. Marco Racanelli"],
            ["上市交易所", "NASDAQ / TASE"],
            ["股票代码", "TSEM"],
            ["员工人数", "约5,500人"],
            ["行业分类", "Semiconductor Foundry (Specialty Analog)"],
            ["FY2025收入", "$1.57B"],
            ["市值", "~$21.2B (2026.03)"],
          ].map(([label, value]) => (
            <div key={label} className="flex items-baseline gap-2 py-1.5" style={{ borderBottom: "1px solid rgba(79,195,247,0.06)" }}>
              <span className="text-xs font-medium shrink-0" style={{ color: "#5a7089", minWidth: "100px" }}>{label}</span>
              <span className="text-sm" style={{ color: "#e8edf3", fontFamily: label.includes("代码") || label.includes("收入") || label.includes("市值") ? "'IBM Plex Mono', monospace" : "inherit" }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Business Model */}
      <div className="data-card">
        <h3 className="text-base font-semibold mb-3" style={{ color: "#4fc3f7" }}>商业模式</h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "#8fa3b8" }}>
          Tower采用Pure-Play Foundry模式，不设计或销售自有品牌芯片，而是为客户提供定制化的晶圆代工服务。与TSMC等以先进制程为主的Foundry不同，Tower专注于成熟工艺节点(180nm-65nm)的Specialty Analog技术，这些技术的核心竞争力在于器件物理优化、可靠性和工艺know-how，而非线宽缩小。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "收入模式",
              items: [
                "Per-Wafer定价 — 按晶圆收费，ASP因工艺复杂度而异",
                "长期产能合同 — 多年期供货协议，保障产能利用率",
                "NRE工程服务 — 工艺开发、转移和优化的一次性费用",
                "客户预付款 — SiPho产能扩张中70%+由客户预付锁定",
              ],
            },
            {
              title: "竞争壁垒",
              items: [
                "深厚的Specialty工艺IP积累(BCD 700V, SiGe, SiPho等)",
                "客户Co-Development模式带来高切换成本",
                "Automotive AEC-Q100认证的长周期壁垒",
                "多区域Fab布局降低供应链风险",
              ],
            },
            {
              title: "增长策略",
              items: [
                "SiPho产能5x扩张($920M CapEx)",
                "TPSCo Fab 7全资控股 + 300mm产能4倍扩张",
                "Nvidia等Hyperscaler战略合作",
                "CPO (Co-Packaged Optics)新平台布局",
              ],
            },
          ].map((col) => (
            <div key={col.title} className="p-4 rounded" style={{ background: "rgba(79,195,247,0.04)", border: "1px solid rgba(79,195,247,0.08)" }}>
              <h4 className="text-sm font-semibold mb-3" style={{ color: "#e8edf3" }}>{col.title}</h4>
              <ul className="space-y-2">
                {col.items.map((item, i) => (
                  <li key={i} className="text-xs leading-relaxed flex gap-2" style={{ color: "#8fa3b8" }}>
                    <span style={{ color: "#4fc3f7" }}>-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Global Fab Footprint */}
      <div className="data-card">
        <h3 className="text-base font-semibold mb-3" style={{ color: "#4fc3f7" }}>全球晶圆厂布局</h3>
        <p className="text-xs mb-4" style={{ color: "#8fa3b8" }}>
          Tower在三大洲运营6座晶圆厂，提供200mm和300mm产能，覆盖多种Specialty Analog工艺。多区域布局为客户提供产能保障和供应链弹性。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs" style={{ color: "#8fa3b8" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(79,195,247,0.2)" }}>
                {["Fab", "位置", "晶圆尺寸", "主要工艺", "备注"].map((h) => (
                  <th key={h} className="text-left py-2.5 pr-4 font-semibold" style={{ color: "#e8edf3" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Fab 1", "Migdal Haemek, Israel", "200mm", "SiGe, RF-SOI, BCD, CIS", "公司总部所在地"],
                ["Fab 3", "Newport Beach, CA, USA", "200mm", "SiPho, SiGe, RF, Power", "SiPho主要产线; $105M租约延期"],
                ["Fab 9", "San Antonio, TX, USA", "200mm", "Analog, Power, MEMS", "美国第二生产基地"],
                ["Fab 5", "Tonami, Japan", "200mm", "Analog, Mixed-Signal", "通过TPSCo运营 (51%控股)"],
                ["Fab 7", "Uozu, Japan", "300mm", "SiPho, SiGe, Specialty", "正在获取全资控股; 产能4x扩张"],
                ["Agrate", "Agrate, Italy", "300mm", "Specialty", "与STMicroelectronics共享"],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(79,195,247,0.06)" }}>
                  {row.map((cell, j) => (
                    <td key={j} className="py-2.5 pr-4" style={{ color: j === 0 ? "#4fc3f7" : "#8fa3b8", fontFamily: j === 0 ? "'IBM Plex Mono', monospace" : "inherit" }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Intel Deal Timeline */}
      <div className="data-card">
        <h3 className="text-base font-semibold mb-3" style={{ color: "#4fc3f7" }}>Intel收购案始末与后续影响</h3>
        <div className="space-y-4">
          {[
            { date: "2022年2月", event: "Intel宣布以$5.4B ($53/股)收购Tower Semiconductor", impact: "旨在扩展Intel Foundry Services的Specialty产能" },
            { date: "2023年8月", event: "收购因未获中国监管批准而终止", impact: "Intel支付$375M终止费给Tower" },
            { date: "2023年9月", event: "Intel与Tower签署NM晶圆代工协议", impact: "Tower投资$300M设备，获得Intel NM Fab 600K+光刻层/月产能" },
            { date: "2026年2月", event: "Intel表示不再履行NM代工协议", impact: "双方进入调解程序; 客户流量重定向至日本Fab 7" },
            { date: "2026年3月", event: "Tower宣布获取TPSCo Fab 7全资控股", impact: "300mm产能4倍扩张计划; 不依赖Intel产能" },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="text-xs font-medium shrink-0 pt-0.5" style={{ color: "#4fc3f7", fontFamily: "'IBM Plex Mono', monospace", minWidth: "90px" }}>
                {item.date}
              </div>
              <div className="flex-1 pb-4" style={{ borderBottom: i < 4 ? "1px solid rgba(79,195,247,0.06)" : "none" }}>
                <div className="text-sm font-medium mb-1" style={{ color: "#e8edf3" }}>{item.event}</div>
                <div className="text-xs" style={{ color: "#5a7089" }}>{item.impact}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Major Shareholders */}
      <div className="data-card">
        <h3 className="text-base font-semibold mb-3" style={{ color: "#4fc3f7" }}>主要股东</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: "Clal Insurance Enterprises", type: "以色列机构" },
            { name: "T. Rowe Price Associates", type: "美国基金" },
            { name: "Vanguard Group", type: "指数基金" },
            { name: "Senvest Management", type: "对冲基金" },
            { name: "BlackRock", type: "全球资管" },
            { name: "Sphera Funds Management", type: "以色列基金" },
          ].map((sh) => (
            <div key={sh.name} className="flex items-center gap-3 p-3 rounded" style={{ background: "rgba(79,195,247,0.04)", border: "1px solid rgba(79,195,247,0.08)" }}>
              <div className="w-2 h-2 rounded-full" style={{ background: "#4fc3f7" }} />
              <div>
                <div className="text-sm" style={{ color: "#e8edf3" }}>{sh.name}</div>
                <div className="text-xs" style={{ color: "#5a7089" }}>{sh.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

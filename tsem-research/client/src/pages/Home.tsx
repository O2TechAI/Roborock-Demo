/**
 * TSEM Research Report - Skyark Research
 * Design: Goldman Sachs深蓝研报风格
 * Theme: Deep navy blue (#0a1628), professional data-driven
 * Language: Chinese with English technical terms
 */

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarketAnalysis from "@/components/tabs/MarketAnalysis";
import CompanyOverview from "@/components/tabs/CompanyOverview";
import TechPlatforms from "@/components/tabs/TechPlatforms";
import FinancialAnalysis from "@/components/tabs/FinancialAnalysis";
import CompetitiveLandscape from "@/components/tabs/CompetitiveLandscape";
import ValuationThesis from "@/components/tabs/ValuationThesis";

const TABS = [
  { id: "market", label: "市场分析" },
  { id: "company", label: "公司概览" },
  { id: "tech", label: "技术平台" },
  { id: "financial", label: "财务分析" },
  { id: "competitive", label: "竞争格局" },
  { id: "valuation", label: "估值与投资论点" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("market");

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0a1628" }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: "rgba(79,195,247,0.15)", background: "#0d1b30" }}>
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded" style={{ background: "linear-gradient(135deg, #4fc3f7, #1976d2)" }} />
                <span className="text-sm font-semibold tracking-wider" style={{ color: "#4fc3f7", fontFamily: "Inter, sans-serif" }}>
                  SKYARK RESEARCH
                </span>
              </div>
              <div className="h-5 w-px" style={{ background: "rgba(79,195,247,0.3)" }} />
              <span className="text-xs" style={{ color: "#8fa3b8" }}>
                深度研究报告
              </span>
            </div>
            <div className="text-xs" style={{ color: "#8fa3b8", fontFamily: "'IBM Plex Mono', monospace" }}>
              2026.03.26
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative overflow-hidden border-b" style={{ borderColor: "rgba(79,195,247,0.1)" }}>
        <div className="absolute inset-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663281312208/YiJWbLAJwinkbnh5EMDaWC/tsem-hero-wafer-4YxWoHpC52FL7CT8FFPCTB.webp"
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.25 }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,22,40,0.92), rgba(13,27,48,0.85))" }} />
        </div>
        <div className="container py-8 relative z-10">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(79,195,247,0.15)", color: "#4fc3f7", fontFamily: "'IBM Plex Mono', monospace" }}>
                  NASDAQ: TSEM
                </span>
                <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(38,166,154,0.15)", color: "#26a69a", fontFamily: "'IBM Plex Mono', monospace" }}>
                  TASE: TSEM
                </span>
              </div>
              <h1 className="text-2xl font-bold mb-1" style={{ color: "#e8edf3" }}>
                Tower Semiconductor Ltd.
              </h1>
              <p className="text-sm" style={{ color: "#8fa3b8" }}>
                全球领先的高价值Analog半导体Foundry — Silicon Photonics驱动AI基础设施增长
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold" style={{ color: "#4fc3f7", fontFamily: "'IBM Plex Mono', monospace" }}>
                $188.74
              </div>
              <div className="text-xs" style={{ color: "#26a69a", fontFamily: "'IBM Plex Mono', monospace" }}>
                +46.07% YTD
              </div>
            </div>
          </div>

          {/* Key Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mt-5 pt-5" style={{ borderTop: "1px solid rgba(79,195,247,0.08)" }}>
            {[
              { label: "Market Cap", value: "$21.2B" },
              { label: "FY2025 Revenue", value: "$1.57B" },
              { label: "SiPho Revenue", value: "$228M", sub: "+115% YoY" },
              { label: "Q4 Net Margin", value: "18.2%" },
              { label: "CapEx Plan", value: "$920M" },
              { label: "Analyst PT (High)", value: "$230" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="stat-label mb-1">{stat.label}</div>
                <div className="stat-value text-base">{stat.value}</div>
                {stat.sub && (
                  <div className="text-xs positive" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    {stat.sub}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <div className="sticky top-0 z-10" style={{ background: "#0d1b30", borderBottom: "1px solid rgba(79,195,247,0.1)" }}>
          <div className="container">
            <TabsList className="bg-transparent h-auto p-0 gap-0 w-full justify-start overflow-x-auto">
              {TABS.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium transition-colors data-[state=active]:border-[#4fc3f7] data-[state=active]:text-[#4fc3f7] data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:text-[#4fc3f7]/70"
                  style={{ color: "#8fa3b8", background: "transparent" }}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        <main className="container py-8 flex-1">
          <TabsContent value="market" className="mt-0"><MarketAnalysis /></TabsContent>
          <TabsContent value="company" className="mt-0"><CompanyOverview /></TabsContent>
          <TabsContent value="tech" className="mt-0"><TechPlatforms /></TabsContent>
          <TabsContent value="financial" className="mt-0"><FinancialAnalysis /></TabsContent>
          <TabsContent value="competitive" className="mt-0"><CompetitiveLandscape /></TabsContent>
          <TabsContent value="valuation" className="mt-0"><ValuationThesis /></TabsContent>
        </main>
      </Tabs>

      {/* Footer */}
      <footer className="border-t py-4" style={{ borderColor: "rgba(79,195,247,0.1)", background: "#0b1825" }}>
        <div className="container">
          <div className="flex items-center justify-between text-xs" style={{ color: "#5a7089" }}>
            <span>Skyark Research | 本报告仅供研究参考，不构成投资建议</span>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              Generated: 2026-03-26
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/**
 * Home.tsx — O2 AI Product Demo
 * 
 * Full flow:
 * 1. Start: Mode toggle at top of chat, example queries below
 * 2. Click example or type product → calls real AI API for teardown analysis
 * 3. AI shows step-by-step reasoning in chat (accumulated messages)
 * 4. After AI response → right panel shows Flow Diagram / Parts Revenue tabs
 * 5. Can switch modes at any time via top toggle
 * 6. Generate Quotation button → progress bar → final quotation
 * 
 * For Roborock S7 with 500 units, uses hardcoded data for instant demo.
 * For any other product, calls the AI analysis endpoint.
 */

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ModeType, ChatMessage, ExampleQuery, TeardownNode,
  teardownTree as defaultTeardownTree,
  aiThinkingSteps, aiAnalysisResult,
} from '@/lib/demoData';
import type { AnalysisResult } from '@shared/analysisTypes';
import ChatPanel from '@/components/ChatPanel';
import TeardownTree from '@/components/TeardownTree';
import PartsRevenue from '@/components/PartsRevenue';
import QuotationGenerator from '@/components/QuotationGenerator';
import { trpc } from '@/lib/trpc';
import { FileText, Workflow, Table2, Layers, TrendingUp, Sparkles } from 'lucide-react';

type RightPanelView = 'empty' | 'analysis' | 'quotation';
type RightTab = 'flow' | 'revenue';

// Parse user input to extract product name and units
function parseUserInput(text: string): { product: string; units: number } {
  const unitsMatch = text.match(/(\d+)\s*(units?|pcs?|pieces?)/i);
  const units = unitsMatch ? parseInt(unitsMatch[1], 10) : 500;

  let product = text
    .replace(/recycle\s*/i, '')
    .replace(/\d+\s*(units?|pcs?|pieces?)/i, '')
    .replace(/teardown\s*/i, '')
    .replace(/disassembl[ey]\s*/i, '')
    .replace(/analyze\s*/i, '')
    .replace(/analysis\s*/i, '')
    .trim();

  if (!product) product = text.trim();
  return { product, units: Math.max(1, Math.min(100000, units)) };
}

// Check if the query is for the default Roborock S7 demo
function isRoborockDemo(product: string, units: number): boolean {
  const normalized = product.toLowerCase().replace(/[^a-z0-9]/g, '');
  return normalized.includes('roborocks7') && units === 500;
}

export default function Home() {
  // State
  const [selectedMode, setSelectedMode] = useState<ModeType>('trading');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [rightView, setRightView] = useState<RightPanelView>('empty');
  const [rightTab, setRightTab] = useState<RightTab>('flow');
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const thinkingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const thinkingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // AI analysis result state
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [isUsingDefault, setIsUsingDefault] = useState(false);

  // tRPC mutation for AI analysis
  const analyzeMutation = trpc.analysis.analyze.useMutation();

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (thinkingTimerRef.current) clearTimeout(thinkingTimerRef.current);
      if (thinkingIntervalRef.current) clearInterval(thinkingIntervalRef.current);
    };
  }, []);

  // Add message helper
  const addMessage = useCallback((msg: ChatMessage) => {
    setMessages(prev => [...prev, msg]);
  }, []);

  // Run the default Roborock S7 thinking animation (hardcoded data)
  // Shows accumulated thinking steps as separate messages
  const runDefaultThinkingSequence = useCallback(() => {
    setIsProcessing(true);
    setAnalysisComplete(false);
    setRightView('empty');
    setIsUsingDefault(true);
    setCurrentAnalysis(null);
    let step = 0;

    const processStep = () => {
      if (step < aiThinkingSteps.length) {
        const thinkingMsg: ChatMessage = {
          id: `thinking-${step}-${Date.now()}`,
          role: 'thinking',
          content: aiThinkingSteps[step],
        };
        // Accumulate thinking messages (don't replace)
        setMessages(prev => [...prev, thinkingMsg]);
        step++;
        // Each step takes 1.5-2.5 seconds to simulate real analysis
        thinkingTimerRef.current = setTimeout(processStep, 1500 + Math.random() * 1000);
      } else {
        // Add final result message
        setMessages(prev => [...prev, {
          id: `result-${Date.now()}`,
          role: 'assistant' as const,
          content: aiAnalysisResult,
        }]);
        setIsProcessing(false);
        setAnalysisComplete(true);
        setRightView('analysis');
      }
    };

    thinkingTimerRef.current = setTimeout(processStep, 500);
  }, []);

  // Run real AI analysis via tRPC
  const runAIAnalysis = useCallback(async (product: string, units: number) => {
    setIsProcessing(true);
    setAnalysisComplete(false);
    setRightView('empty');
    setIsUsingDefault(false);
    setCurrentAnalysis(null);

    // Show animated thinking steps (accumulated)
    const thinkingSteps = [
      `Identifying product: ${product}. Searching component database and manufacturer specifications...`,
      `Analyzing physical structure and material composition. Estimating unit weight and identifying major assemblies...`,
      `Breaking down into sub-assemblies and individual components. Classifying each by disposal path: tradable parts, raw material recovery, brand destruction (IP), or non-recyclable waste...`,
      `Cross-referencing component market prices against Q1 2026 spot rates. Calculating sellable parts value for working motors, sensors, modules, and other third-party tradable components...`,
      `Calculating raw material recovery values: precious metals (Au, Ag, Pd) from PCBs, base metals (Cu, Al, Fe), battery cathode materials (NMC/LFP), and structural plastics (ABS, PC, PA)...`,
      `Estimating processing costs: labor ($25/hr disassembly rate), logistics, compliance (hazmat handling, data destruction), and warehouse operations for ${units} units...`,
      `Computing deal economics: comparing total recoverable value against processing costs. Calculating maximum profitable buyout price with 15% target margin. Evaluating Service Fee vs Trading mode viability...`,
      `Analysis complete. Generating teardown flow diagram and financial tables...`,
    ];

    let step = 0;
    thinkingIntervalRef.current = setInterval(() => {
      if (step < thinkingSteps.length) {
        const thinkingMsg: ChatMessage = {
          id: `ai-thinking-${step}-${Date.now()}`,
          role: 'thinking',
          content: thinkingSteps[step],
        };
        setMessages(prev => [...prev, thinkingMsg]);
        step++;
      }
    }, 3000);

    try {
      const result = await analyzeMutation.mutateAsync({ product, units });

      // Clear thinking interval
      if (thinkingIntervalRef.current) {
        clearInterval(thinkingIntervalRef.current);
        thinkingIntervalRef.current = null;
      }

      if (result.success && result.data) {
        setCurrentAnalysis(result.data);
        setMessages(prev => [...prev, {
          id: `result-${Date.now()}`,
          role: 'assistant' as const,
          content: result.data.summary,
        }]);
        setAnalysisComplete(true);
        setRightView('analysis');
      }
    } catch (error: any) {
      // Clear thinking interval
      if (thinkingIntervalRef.current) {
        clearInterval(thinkingIntervalRef.current);
        thinkingIntervalRef.current = null;
      }

      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        role: 'assistant' as const,
        content: `**Analysis Error**\n\nI encountered an issue analyzing "${product}". ${error.message || 'Please try again.'}\n\nYou can try:\n• Rephrasing the product name\n• Using a more specific product model\n• Trying one of the example queries`,
      }]);
    } finally {
      setIsProcessing(false);
    }
  }, [analyzeMutation]);

  // Handle example query click
  const handleSelectExample = useCallback((query: ExampleQuery) => {
    if (isProcessing) return;
    setHasStarted(true);
    setMessages([]);
    setRightView('empty');
    setAnalysisComplete(false);
    setRightTab('flow');

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: `Recycle ${query.units} ${query.product} units`,
    };
    addMessage(userMsg);

    if (isRoborockDemo(query.product, query.units)) {
      setTimeout(() => runDefaultThinkingSequence(), 300);
    } else {
      setTimeout(() => runAIAnalysis(query.product, query.units), 300);
    }
  }, [isProcessing, addMessage, runDefaultThinkingSequence, runAIAnalysis]);

  // Handle free text message
  const handleSendMessage = useCallback((text: string) => {
    if (isProcessing) return;
    setHasStarted(true);
    setMessages([]);
    setRightView('empty');
    setAnalysisComplete(false);
    setRightTab('flow');

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
    };
    addMessage(userMsg);

    const { product, units } = parseUserInput(text);

    if (isRoborockDemo(product, units)) {
      setTimeout(() => runDefaultThinkingSequence(), 300);
    } else {
      setTimeout(() => runAIAnalysis(product, units), 300);
    }
  }, [isProcessing, addMessage, runDefaultThinkingSequence, runAIAnalysis]);

  // Handle mode change
  const handleModeChange = useCallback((mode: ModeType) => {
    setSelectedMode(mode);
  }, []);

  // Handle quotation
  const handleGenerateQuotation = useCallback(() => {
    setRightView('quotation');
  }, []);

  const handleBackFromQuotation = useCallback(() => {
    setRightView('analysis');
  }, []);

  // Derive current data from analysis result or defaults
  const treeData: TeardownNode = useMemo(() => {
    if (isUsingDefault || !currentAnalysis) return defaultTeardownTree;
    return currentAnalysis.teardownTree as unknown as TeardownNode;
  }, [isUsingDefault, currentAnalysis]);

  const analysisStats = useMemo(() => {
    if (isUsingDefault || !currentAnalysis) {
      return {
        units: '500',
        weight: '1,850 kg',
        components: '58',
        recovery: '94.2%',
        product: 'Roborock S7',
      };
    }
    return {
      units: currentAnalysis.units.toLocaleString(),
      weight: currentAnalysis.totalWeight,
      components: currentAnalysis.componentCount.toString(),
      recovery: currentAnalysis.recoveryRate,
      product: currentAnalysis.product,
    };
  }, [isUsingDefault, currentAnalysis]);

  const accentColor = selectedMode === 'service' ? '#2563eb' : '#059669';

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden" style={{ backgroundColor: '#f8fafc' }}>
      {/* Top header bar */}
      <header
        className="flex items-center justify-between px-5 py-2.5 flex-shrink-0"
        style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}
          >
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-[15px] font-bold" style={{ color: '#0f172a', fontFamily: "'Space Grotesk', system-ui" }}>
              O2 AI
            </span>
            <span className="text-[10px] ml-2 px-1.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: '#f1f5f9', color: '#64748b' }}>
              Smart E-Waste Platform
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          {analysisComplete && (
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleGenerateQuotation}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: accentColor, color: '#ffffff' }}
            >
              <FileText className="w-3.5 h-3.5" />
              Generate Quotation
            </motion.button>
          )}
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium"
            style={{ backgroundColor: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0' }}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Market
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel — Chat */}
        <div className="w-[420px] flex-shrink-0" style={{ borderRight: '1px solid #e2e8f0' }}>
          <ChatPanel
            messages={messages}
            onSendMessage={handleSendMessage}
            onSelectExample={handleSelectExample}
            selectedMode={selectedMode}
            onModeChange={handleModeChange}
            isProcessing={isProcessing}
            hasStarted={hasStarted}
          />
        </div>

        {/* Right panel — Diagram / Revenue / Quotation */}
        <div className="flex-1 flex flex-col overflow-hidden">
            {rightView === 'quotation' ? (
              <div className="flex-1">
                <QuotationGenerator
                  mode={selectedMode}
                  onBack={handleBackFromQuotation}
                  analysisData={isUsingDefault ? undefined : currentAnalysis ?? undefined}
                />
              </div>
            ) : rightView === 'analysis' ? (
              <div className="flex-1 flex flex-col">
                {/* Tab switcher: Flow Diagram / Parts Revenue */}
                <div className="flex items-center gap-1 px-4 py-2 flex-shrink-0" style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
                  <button
                    onClick={() => setRightTab('flow')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all"
                    style={{
                      backgroundColor: rightTab === 'flow' ? '#f1f5f9' : 'transparent',
                      color: rightTab === 'flow' ? '#1e293b' : '#94a3b8',
                      border: rightTab === 'flow' ? '1px solid #e2e8f0' : '1px solid transparent',
                    }}
                  >
                    <Workflow className="w-3.5 h-3.5" />
                    Flow Diagram
                  </button>
                  <button
                    onClick={() => setRightTab('revenue')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all"
                    style={{
                      backgroundColor: rightTab === 'revenue' ? accentColor : 'transparent',
                      color: rightTab === 'revenue' ? '#ffffff' : '#94a3b8',
                      border: rightTab === 'revenue' ? `1px solid ${accentColor}` : '1px solid transparent',
                    }}
                  >
                    <Table2 className="w-3.5 h-3.5" />
                    Parts Revenue
                  </button>

                  {/* Stats bar */}
                  <div className="ml-auto flex items-center gap-4">
                    {[
                      { label: 'Units', value: analysisStats.units },
                      { label: 'Weight', value: analysisStats.weight },
                      { label: 'Components', value: analysisStats.components },
                      { label: 'Recovery', value: analysisStats.recovery },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="text-[10px]" style={{ color: '#94a3b8' }}>{stat.label}</div>
                        <div className="text-[12px] font-semibold font-mono" style={{ color: '#334155' }}>{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tab content */}
                <div className="flex-1 overflow-hidden">
                  {rightTab === 'flow' ? (
                    <TeardownTree data={treeData} mode={selectedMode} />
                  ) : (
                    <PartsRevenue
                      mode={selectedMode}
                      analysisData={isUsingDefault ? undefined : currentAnalysis ?? undefined}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div
                className="flex-1 flex items-center justify-center"
                style={{ backgroundColor: '#fafbfc' }}
              >
                <div className="text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0' }}
                  >
                    <Layers className="w-7 h-7" style={{ color: '#94a3b8' }} />
                  </div>
                  <h3 className="text-[14px] font-semibold mb-1" style={{ color: '#475569', fontFamily: "'Space Grotesk', system-ui" }}>
                    {isProcessing ? 'Analyzing Product...' : 'Waiting for product identification'}
                  </h3>
                  <p className="text-[12px] max-w-[280px]" style={{ color: '#94a3b8' }}>
                    {isProcessing
                      ? 'O2 AI is processing your request. The teardown topology will appear here shortly.'
                      : 'Enter recycling requirements to generate topology diagram'}
                  </p>
                  {isProcessing && (
                    <motion.div
                      className="mt-4 w-32 h-1 rounded-full mx-auto overflow-hidden"
                      style={{ backgroundColor: '#e2e8f0' }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: accentColor }}
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </motion.div>
                  )}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

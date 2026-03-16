/**
 * Home.tsx — O2 AI Product Demo
 * 
 * Full flow:
 * 1. Start: Mode toggle at top of chat, example queries below
 * 2. Click example → AI starts processing with thinking steps
 * 3. After processing → right panel shows Flow Diagram / Parts Revenue tabs
 * 4. Can switch modes at any time via top toggle
 * 5. Generate Quotation button → progress bar → final quotation
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ModeType, ChatMessage, ExampleQuery,
  teardownTree, aiThinkingSteps, aiAnalysisResult,
} from '@/lib/demoData';
import ChatPanel from '@/components/ChatPanel';
import TeardownTree from '@/components/TeardownTree';
import PartsRevenue from '@/components/PartsRevenue';
import QuotationGenerator from '@/components/QuotationGenerator';
import { FileText, Workflow, Table2, Layers, TrendingUp, Sparkles } from 'lucide-react';

type RightPanelView = 'empty' | 'analysis' | 'quotation';
type RightTab = 'flow' | 'revenue';

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

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (thinkingTimerRef.current) clearTimeout(thinkingTimerRef.current);
    };
  }, []);

  // Add message helper
  const addMessage = useCallback((msg: ChatMessage) => {
    setMessages(prev => [...prev, msg]);
  }, []);

  // Run AI thinking animation
  const runThinkingSequence = useCallback(() => {
    setIsProcessing(true);
    setAnalysisComplete(false);
    setRightView('empty');
    let step = 0;

    const processStep = () => {
      if (step < aiThinkingSteps.length) {
        const thinkingMsg: ChatMessage = {
          id: `thinking-${step}-${Date.now()}`,
          role: 'thinking',
          content: aiThinkingSteps[step],
        };
        // Replace previous thinking message
        setMessages(prev => {
          const filtered = prev.filter(m => m.role !== 'thinking');
          return [...filtered, thinkingMsg];
        });
        step++;
        thinkingTimerRef.current = setTimeout(processStep, 600 + Math.random() * 400);
      } else {
        // Remove thinking message, add final result
        setMessages(prev => {
          const filtered = prev.filter(m => m.role !== 'thinking');
          return [...filtered, {
            id: `result-${Date.now()}`,
            role: 'assistant' as const,
            content: aiAnalysisResult,
          }];
        });
        setIsProcessing(false);
        setAnalysisComplete(true);
        setRightView('analysis');
      }
    };

    thinkingTimerRef.current = setTimeout(processStep, 500);
  }, []);

  // Handle example query click
  const handleSelectExample = useCallback((query: ExampleQuery) => {
    if (isProcessing) return;
    setHasStarted(true);
    setMessages([]);
    setRightView('empty');
    setAnalysisComplete(false);
    setRightTab('flow');

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: `Recycle ${query.units} ${query.product} units`,
    };
    addMessage(userMsg);

    // Start AI thinking
    setTimeout(() => runThinkingSequence(), 300);
  }, [isProcessing, addMessage, runThinkingSequence]);

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

    setTimeout(() => runThinkingSequence(), 300);
  }, [isProcessing, addMessage, runThinkingSequence]);

  // Handle mode change — keep analysis but switch data
  const handleModeChange = useCallback((mode: ModeType) => {
    setSelectedMode(mode);
    // If analysis is already complete, just switch the data view
  }, []);

  // Handle quotation
  const handleGenerateQuotation = useCallback(() => {
    setRightView('quotation');
  }, []);

  const handleBackFromQuotation = useCallback(() => {
    setRightView('analysis');
  }, []);

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
        <div className="w-[380px] flex-shrink-0" style={{ borderRight: '1px solid #e2e8f0' }}>
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
                <QuotationGenerator mode={selectedMode} onBack={handleBackFromQuotation} />
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
                      { label: 'Units', value: '500' },
                      { label: 'Weight', value: '1,850 kg' },
                      { label: 'Components', value: '28' },
                      { label: 'Recovery', value: '94.2%' },
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
                    <TeardownTree data={teardownTree} mode={selectedMode} />
                  ) : (
                    <PartsRevenue mode={selectedMode} />
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

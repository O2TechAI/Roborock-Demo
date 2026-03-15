/**
 * Home Page — O2 AI Product Demo
 * 
 * Light theme. Left chat panel (dark sidebar) + right teardown diagram (light).
 * Tree diagram appears only AFTER user selects a processing mode.
 * Service Fee mode = blue accent, material recovery tree
 * Trading mode = emerald accent, material recovery + 3rd party resale tree
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, TrendingUp, Layers, Cpu, Recycle,
  Sparkles, BarChart3, Zap, Wrench, DollarSign, Package
} from 'lucide-react';
import ChatPanel from '@/components/ChatPanel';
import TeardownTree from '@/components/TeardownTree';
import {
  ChatMessage, ProcessingMode,
  serviceFeeTreeData, tradingTreeData,
  serviceFeeSummary, tradingSummary,
} from '@/lib/demoData';

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#f1f5f9' }}>
          <Layers className="w-10 h-10" style={{ color: '#cbd5e1' }} />
        </div>
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#dbeafe' }}
        >
          <Sparkles className="w-3 h-3" style={{ color: '#2563eb' }} />
        </motion.div>
      </div>

      <h3 className="text-base font-semibold font-display mb-2" style={{ color: '#334155' }}>
        Select a Processing Mode
      </h3>
      <p className="text-[12px] max-w-[360px] leading-relaxed mb-6" style={{ color: '#94a3b8' }}>
        Choose between Service Fee or Trading mode in the chat panel to generate the teardown topology diagram.
      </p>

      {/* Feature hints */}
      <div className="grid grid-cols-3 gap-3 max-w-[400px]">
        {[
          { icon: <Layers className="w-3.5 h-3.5" />, label: 'Component\nBreakdown' },
          { icon: <BarChart3 className="w-3.5 h-3.5" />, label: 'Material\nValuation' },
          { icon: <Recycle className="w-3.5 h-3.5" />, label: 'Recovery\nAnalysis' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="flex flex-col items-center gap-1.5 p-3 rounded-lg"
            style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}
          >
            <div style={{ color: '#94a3b8' }}>{item.icon}</div>
            <span className="text-[9px] text-center whitespace-pre-line leading-tight" style={{ color: '#94a3b8' }}>
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StatsBar({ mode }: { mode: 'service' | 'trading' }) {
  const summary = mode === 'service' ? serviceFeeSummary : tradingSummary;
  const accent = mode === 'service' ? '#2563eb' : '#059669';

  const stats = mode === 'service'
    ? [
        { label: 'Total Units', value: summary.totalUnits.toString(), icon: <Cpu className="w-3 h-3" /> },
        { label: 'Total Weight', value: summary.totalWeight, icon: <BarChart3 className="w-3 h-3" /> },
        { label: 'Components', value: summary.components.toString(), icon: <Layers className="w-3 h-3" /> },
        { label: 'Recovery Rate', value: summary.recoveryRate, icon: <Recycle className="w-3 h-3" /> },
        { label: 'Labor Cost', value: (summary as typeof serviceFeeSummary).totalLaborCost, icon: <Wrench className="w-3 h-3" /> },
        { label: 'Material Value', value: (summary as typeof serviceFeeSummary).materialValue, icon: <DollarSign className="w-3 h-3" /> },
      ]
    : [
        { label: 'Total Units', value: summary.totalUnits.toString(), icon: <Cpu className="w-3 h-3" /> },
        { label: 'Total Weight', value: summary.totalWeight, icon: <BarChart3 className="w-3 h-3" /> },
        { label: 'Components', value: summary.components.toString(), icon: <Layers className="w-3 h-3" /> },
        { label: 'Recovery Rate', value: summary.recoveryRate, icon: <Recycle className="w-3 h-3" /> },
        { label: 'Buyout Price', value: (summary as typeof tradingSummary).buyoutPrice, icon: <DollarSign className="w-3 h-3" /> },
        { label: 'Resale Value', value: (summary as typeof tradingSummary).resaleValue, icon: <Package className="w-3 h-3" /> },
      ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-1 px-3 py-2 overflow-x-auto"
      style={{ borderBottom: '1px solid #f1f5f9' }}
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md shrink-0"
          style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}
        >
          <div style={{ color: accent }}>{stat.icon}</div>
          <div>
            <div className="text-[9px] uppercase tracking-wider" style={{ color: '#94a3b8' }}>{stat.label}</div>
            <div className="text-[12px] font-semibold font-mono" style={{ color: '#1e293b' }}>{stat.value}</div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

export default function Home() {
  const initialMessages: ChatMessage[] = [
    {
      id: 'user-1',
      role: 'user',
      content: 'Recycle 500 Roborock S7 units',
      timestamp: new Date(),
      type: 'text',
    },
    {
      id: 'assistant-1',
      role: 'assistant',
      content: 'I\'ve identified the product from your request: "Recycle 500 Roborock S7 units"\n\nAnalyzing teardown topology for the Roborock S7 robot vacuum...\n\n\u2022 Total weight per unit: 3.7 kg\n\u2022 Estimated components: 22 major parts\n\u2022 Material recovery rate: 94.2%',
      timestamp: new Date(),
      type: 'text',
    },
    {
      id: 'mode-1',
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      type: 'mode-selection',
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [selectedMode, setSelectedMode] = useState<ProcessingMode | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [demoPhase, setDemoPhase] = useState<'idle' | 'analyzing' | 'mode-select' | 'complete'>('mode-select');

  const simulateResponse = useCallback((userMessage: string) => {
    setIsProcessing(true);
    setDemoPhase('analyzing');
    setSelectedMode(null);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: `I've identified the product from your request: "${userMessage}"\n\nAnalyzing teardown topology for the Roborock S7 robot vacuum...\n\n\u2022 Total weight per unit: 3.7 kg\n\u2022 Estimated components: 22 major parts\n\u2022 Material recovery rate: 94.2%`,
        timestamp: new Date(),
        type: 'text',
      }]);

      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: `mode-${Date.now()}`,
          role: 'assistant',
          content: '',
          timestamp: new Date(),
          type: 'mode-selection',
        }]);
        setIsProcessing(false);
        setDemoPhase('mode-select');
      }, 800);
    }, 1500);
  }, []);

  const handleSendMessage = useCallback((text: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date(),
      type: 'text',
    };
    setMessages(prev => [...prev, userMsg]);
    simulateResponse(text);
  }, [simulateResponse]);

  const handleSelectMode = useCallback((mode: ProcessingMode) => {
    setSelectedMode(mode);
    setDemoPhase('complete');

    const modeLabel = mode.id === 'service' ? 'Service Fee' : 'Trading';
    const modeDescription = mode.id === 'service'
      ? `${modeLabel} mode selected.\n\nThe teardown topology shows raw material recovery paths. Each assembly is broken down to its recoverable materials.\n\n\u2022 Labor costs shown per assembly\n\u2022 Material recovery values estimated\n\u2022 Non-recyclable waste identified`
      : `${modeLabel} mode selected.\n\nThe teardown topology shows both 3rd-party resale components and raw material recovery paths.\n\n\u2022 Usable components marked for resale\n\u2022 Remaining materials sent to recovery\n\u2022 Higher total value extraction`;

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: `confirm-${Date.now()}`,
        role: 'assistant',
        content: modeDescription,
        timestamp: new Date(),
        type: 'text',
      }]);
    }, 300);
  }, []);

  const treeData = selectedMode?.id === 'service' ? serviceFeeTreeData : selectedMode?.id === 'trading' ? tradingTreeData : null;
  const showDiagram = selectedMode !== null;

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden" style={{ backgroundColor: '#f8fafc' }}>
      {/* Top navigation bar */}
      <header
        className="flex items-center justify-between px-4 h-12 shrink-0 z-20"
        style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}
            >
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-bold font-display tracking-tight" style={{ color: '#f1f5f9' }}>
              O2 AI
            </span>
          </div>
          <div className="h-4 w-px" style={{ backgroundColor: '#334155' }} />
          <span className="text-[10px] uppercase tracking-widest font-medium" style={{ color: '#64748b' }}>
            Recycling Intelligence Platform
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Market badge */}
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] transition-colors"
            style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#94a3b8' }}
          >
            <TrendingUp className="w-3 h-3" style={{ color: '#22c55e' }} />
            Market
          </button>

          {/* Generate Quotation button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-md text-[11px] font-medium transition-all duration-200"
            style={demoPhase === 'complete'
              ? { backgroundColor: '#2563eb', color: '#ffffff', boxShadow: '0 0 12px #2563eb40' }
              : { backgroundColor: '#1e293b', color: '#64748b', border: '1px solid #334155' }
            }
          >
            <FileText className="w-3 h-3" />
            Generate Quotation
          </motion.button>
        </div>
      </header>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel — Chat (dark sidebar) */}
        <div className="w-[380px] shrink-0 flex flex-col" style={{ borderRight: '1px solid #1e293b' }}>
          <ChatPanel
            messages={messages}
            onSendMessage={handleSendMessage}
            onSelectMode={handleSelectMode}
            selectedMode={selectedMode}
            isProcessing={isProcessing}
          />
        </div>

        {/* Right panel — Teardown Diagram (light) */}
        <div className="flex-1 flex flex-col relative overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
          {/* Subtle grid pattern background */}
          <div
            className="absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage: `radial-gradient(circle, #e2e8f0 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Content */}
          <div className="relative flex flex-col h-full">
            {/* Diagram header */}
            <div
              className="flex items-center justify-between px-4 py-2.5"
              style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)' }}
            >
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" style={{ color: selectedMode?.id === 'service' ? '#2563eb' : selectedMode?.id === 'trading' ? '#059669' : '#94a3b8' }} />
                <span className="text-[11px] font-medium font-display" style={{ color: '#475569' }}>
                  Teardown Topology
                </span>
                {showDiagram && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-[9px] px-2 py-0.5 rounded-full font-medium"
                    style={{
                      backgroundColor: selectedMode?.id === 'service' ? '#dbeafe' : '#d1fae5',
                      color: selectedMode?.id === 'service' ? '#1e40af' : '#065f46',
                    }}
                  >
                    {selectedMode?.id === 'service' ? 'Service Fee Mode' : 'Trading Mode'}
                  </motion.span>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-[10px]" style={{ color: '#94a3b8' }}>
                <span>Scroll to zoom</span>
                <span style={{ color: '#e2e8f0' }}>·</span>
                <span>Drag to pan</span>
                <span style={{ color: '#e2e8f0' }}>·</span>
                <span>Hover for details</span>
              </div>
            </div>

            {/* Stats bar — only shown when diagram is active */}
            <AnimatePresence>
              {showDiagram && selectedMode && <StatsBar mode={selectedMode.id} />}
            </AnimatePresence>

            {/* Diagram area */}
            <div className="flex-1 overflow-hidden relative">
              {showDiagram && selectedMode ? (
                <motion.div
                  key={selectedMode.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="h-full w-full absolute inset-0"
                >
                  <TeardownTree
                    data={treeData}
                    isVisible={true}
                    mode={selectedMode.id}
                  />
                </motion.div>
              ) : (
                <div className="h-full">
                  <EmptyState />
                </div>
              )}
            </div>

            {/* Bottom status bar */}
            <div
              className="flex items-center justify-between px-4 py-2"
              style={{ borderTop: '1px solid #f1f5f9', backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)' }}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${demoPhase === 'analyzing' ? 'animate-pulse-dot' : ''}`}
                    style={{
                      backgroundColor:
                        demoPhase === 'complete' ? '#22c55e'
                        : demoPhase === 'analyzing' ? '#3b82f6'
                        : '#cbd5e1'
                    }}
                  />
                  <span className="text-[10px]" style={{ color: '#94a3b8' }}>
                    {demoPhase === 'idle' && 'Ready'}
                    {demoPhase === 'analyzing' && 'Analyzing...'}
                    {demoPhase === 'mode-select' && 'Awaiting mode selection'}
                    {demoPhase === 'complete' && 'Analysis complete'}
                  </span>
                </div>
              </div>
              {selectedMode && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-1.5 text-[10px]"
                >
                  <span style={{ color: '#94a3b8' }}>Mode:</span>
                  <span
                    className="font-medium"
                    style={{ color: selectedMode.id === 'service' ? '#2563eb' : '#059669' }}
                  >
                    {selectedMode.title}
                  </span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

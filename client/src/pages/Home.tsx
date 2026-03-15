/**
 * Home Page — O2 AI Product Demo
 * 
 * Design: "Precision Dark" — Enterprise SaaS Refinement
 * Full-screen layout with left chat panel and right teardown diagram.
 * Orchestrates the demo flow: user input → AI analysis → mode selection → diagram.
 */

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, TrendingUp, Layers, Cpu, Recycle,
  ChevronRight, Sparkles, BarChart3, Zap
} from 'lucide-react';
import ChatPanel from '@/components/ChatPanel';
import TeardownTree from '@/components/TeardownTree';
import {
  ChatMessage, ProcessingMode, roborockTeardownData,
  demoConversation
} from '@/lib/demoData';

const CIRCUIT_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663281312208/gpRMmkNfT3guWYGRDHvUch/o2ai-circuit-pattern-i9jS9BDCtoJL3yYnLtbggR.webp';
const ROBOT_TEARDOWN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663281312208/gpRMmkNfT3guWYGRDHvUch/o2ai-robot-teardown-YREsaLR9B6oDegerKwpMkt.webp';

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      {/* Decorative background image */}
      <div className="relative mb-6">
        <div className="w-32 h-32 rounded-2xl overflow-hidden opacity-40">
          <img
            src={ROBOT_TEARDOWN}
            alt="Robot teardown"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.11_0.02_260)] via-transparent to-transparent" />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[oklch(0.72_0.15_195/0.2)] flex items-center justify-center"
        >
          <Sparkles className="w-3 h-3 text-[oklch(0.72_0.15_195)]" />
        </motion.div>
      </div>

      <h3 className="text-base font-semibold text-[oklch(0.80_0.01_260)] font-display mb-2">
        Waiting for Product Identification
      </h3>
      <p className="text-[12px] text-[oklch(0.45_0.01_260)] max-w-[320px] leading-relaxed mb-6">
        Enter recycling requirements in the chat to generate an interactive component teardown topology diagram.
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
            className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-[oklch(0.15_0.015_260)] border border-[oklch(1_0_0/0.06)]"
          >
            <div className="text-[oklch(0.72_0.15_195)]">{item.icon}</div>
            <span className="text-[9px] text-[oklch(0.50_0.01_260)] text-center whitespace-pre-line leading-tight">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StatsBar() {
  const stats = [
    { label: 'Total Units', value: '500', icon: <Cpu className="w-3 h-3" /> },
    { label: 'Total Weight', value: '1,850 kg', icon: <BarChart3 className="w-3 h-3" /> },
    { label: 'Components', value: '22', icon: <Layers className="w-3 h-3" /> },
    { label: 'Recovery Rate', value: '94.2%', icon: <Recycle className="w-3 h-3" /> },
    { label: 'Est. Value', value: '$16,500', icon: <TrendingUp className="w-3 h-3" /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-1 px-3 py-2 overflow-x-auto"
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[oklch(0.15_0.015_260)] border border-[oklch(1_0_0/0.06)] shrink-0"
        >
          <div className="text-[oklch(0.72_0.15_195)]">{stat.icon}</div>
          <div>
            <div className="text-[9px] text-[oklch(0.45_0.01_260)] uppercase tracking-wider">{stat.label}</div>
            <div className="text-[12px] font-semibold font-mono text-[oklch(0.90_0.005_260)]">{stat.value}</div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

export default function Home() {
  // Pre-populate with completed demo state for showcase
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
      content: 'I\'ve identified the product from your request: "Recycle 500 Roborock S7 units"\n\nAnalyzing teardown topology for the Roborock S7 robot vacuum...\n\n\u2022 Total weight per unit: 3.7 kg\n\u2022 Estimated components: 22 major parts\n\u2022 Material recovery rate: 94.2%\n\u2022 Estimated total value: $16,500',
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
  const [showDiagram, setShowDiagram] = useState(true);
  const [demoPhase, setDemoPhase] = useState<'idle' | 'analyzing' | 'mode-select' | 'complete'>('mode-select');

  const simulateResponse = useCallback((userMessage: string) => {
    setIsProcessing(true);
    setDemoPhase('analyzing');

    // Simulate AI analysis delay
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: `I've identified the product from your request: "${userMessage}"\n\nAnalyzing teardown topology for the Roborock S7 robot vacuum...\n\n• Total weight per unit: 3.7 kg\n• Estimated components: 22 major parts\n• Material recovery rate: 94.2%\n• Estimated total value: $16,500`,
        timestamp: new Date(),
        type: 'text',
      }]);

      setShowDiagram(true);

      // Show mode selection after a brief delay
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

    // Add confirmation message
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: `confirm-${Date.now()}`,
        role: 'assistant',
        content: `${mode.id === 'service' ? 'Service Fee' : 'Trading'} mode selected.\n\nThe teardown topology is now complete. You can:\n• Hover over nodes to see component details\n• Expand/collapse branches\n• Zoom and pan the diagram\n• Click "Generate Quotation" for a detailed report`,
        timestamp: new Date(),
        type: 'text',
      }]);
    }, 300);
  }, []);

  // Demo is pre-populated with completed state for immediate showcase

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-[oklch(0.11_0.02_260)]">
      {/* Top navigation bar */}
      <header className="flex items-center justify-between px-4 h-12 border-b border-[oklch(1_0_0/0.06)] bg-[oklch(0.12_0.02_260)] shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[oklch(0.72_0.15_195)] to-[oklch(0.55_0.18_195)] flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-[oklch(0.13_0.02_260)]" />
            </div>
            <span className="text-sm font-bold text-[oklch(0.93_0.005_260)] font-display tracking-tight">
              O2 AI
            </span>
          </div>
          <div className="h-4 w-px bg-[oklch(1_0_0/0.08)]" />
          <span className="text-[10px] text-[oklch(0.45_0.01_260)] uppercase tracking-widest font-medium">
            Recycling Intelligence Platform
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Market badge */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[oklch(0.17_0.015_260)] border border-[oklch(1_0_0/0.06)] hover:border-[oklch(1_0_0/0.12)] transition-colors text-[11px] text-[oklch(0.65_0.01_260)]">
            <TrendingUp className="w-3 h-3 text-[oklch(0.65_0.18_160)]" />
            Market
          </button>

          {/* Generate Quotation button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              flex items-center gap-1.5 px-4 py-1.5 rounded-md text-[11px] font-medium transition-all duration-200
              ${demoPhase === 'complete'
                ? 'bg-[oklch(0.72_0.15_195)] text-[oklch(0.13_0.02_260)] shadow-[0_0_15px_oklch(0.72_0.15_195/0.2)]'
                : 'bg-[oklch(0.72_0.15_195/0.15)] text-[oklch(0.72_0.15_195)] border border-[oklch(0.72_0.15_195/0.2)]'
              }
            `}
          >
            <FileText className="w-3 h-3" />
            Generate Quotation
          </motion.button>
        </div>
      </header>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel — Chat */}
        <div className="w-[380px] shrink-0 border-r border-[oklch(1_0_0/0.06)] flex flex-col">
          <ChatPanel
            messages={messages}
            onSendMessage={handleSendMessage}
            onSelectMode={handleSelectMode}
            selectedMode={selectedMode}
            isProcessing={isProcessing}
          />
        </div>

        {/* Right panel — Teardown Diagram */}
        <div className="flex-1 flex flex-col relative overflow-hidden">
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url(${CIRCUIT_BG})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Subtle radial gradient overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.15_0.02_260)_0%,_oklch(0.11_0.02_260)_70%)]" />

          {/* Content */}
          <div className="relative flex flex-col h-full z-10">
            {/* Diagram header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-[oklch(1_0_0/0.04)]">
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[oklch(0.72_0.15_195)]" />
                <span className="text-[11px] font-medium text-[oklch(0.70_0.01_260)] font-display">
                  Teardown Topology
                </span>
                {showDiagram && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-[9px] px-2 py-0.5 rounded-full bg-[oklch(0.65_0.18_160/0.12)] text-[oklch(0.70_0.18_160)] font-medium"
                  >
                    Live
                  </motion.span>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-[oklch(0.45_0.01_260)]">
                <span>Scroll to zoom</span>
                <span className="text-[oklch(1_0_0/0.15)]">•</span>
                <span>Drag to pan</span>
                <span className="text-[oklch(1_0_0/0.15)]">•</span>
                <span>Hover for details</span>
              </div>
            </div>

            {/* Stats bar — only shown when diagram is active */}
            <AnimatePresence>
              {showDiagram && <StatsBar />}
            </AnimatePresence>

            {/* Diagram area */}
            <div className="flex-1 overflow-hidden relative">
              {showDiagram ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="h-full w-full"
                >
                  <TeardownTree
                    data={roborockTeardownData}
                    isVisible={showDiagram}
                  />
                </motion.div>
              ) : (
                <EmptyState />
              )}
            </div>

            {/* Bottom status bar */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-[oklch(1_0_0/0.04)] bg-[oklch(0.12_0.02_260/0.8)] backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    demoPhase === 'complete'
                      ? 'bg-[oklch(0.65_0.18_160)]'
                      : demoPhase === 'analyzing'
                      ? 'bg-[oklch(0.72_0.15_195)] animate-pulse-dot'
                      : 'bg-[oklch(0.40_0.01_260)]'
                  }`} />
                  <span className="text-[10px] text-[oklch(0.50_0.01_260)]">
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
                  <span className="text-[oklch(0.45_0.01_260)]">Mode:</span>
                  <span className={`font-medium ${
                    selectedMode.id === 'service'
                      ? 'text-[oklch(0.72_0.15_195)]'
                      : 'text-[oklch(0.65_0.18_160)]'
                  }`}>
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

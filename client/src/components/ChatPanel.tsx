/**
 * ChatPanel Component
 * 
 * Design: "Precision Dark" — Enterprise SaaS
 * Left-side AI chat interface with message bubbles, mode selection cards,
 * and input field. Simulates the O2 AI conversation flow.
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Wrench, TrendingUp, Check, Sparkles, ArrowRight, ChevronRight } from 'lucide-react';
import { ChatMessage, ProcessingMode, processingModes } from '@/lib/demoData';

interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onSelectMode: (mode: ProcessingMode) => void;
  selectedMode: ProcessingMode | null;
  isProcessing: boolean;
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      <div className="flex items-center gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-[oklch(0.72_0.15_195)] typing-dot" />
        <div className="w-1.5 h-1.5 rounded-full bg-[oklch(0.72_0.15_195)] typing-dot" />
        <div className="w-1.5 h-1.5 rounded-full bg-[oklch(0.72_0.15_195)] typing-dot" />
      </div>
      <span className="text-[11px] text-[oklch(0.50_0.01_260)] ml-2">O2 AI is analyzing...</span>
    </div>
  );
}

function ModeSelectionCard({ mode, onSelect, selected }: {
  mode: ProcessingMode;
  onSelect: (mode: ProcessingMode) => void;
  selected: boolean;
}) {
  const isService = mode.id === 'service';
  const accentColor = isService ? 'oklch(0.72 0.15 195)' : 'oklch(0.65 0.18 160)';

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(mode)}
      className={`
        relative w-full text-left rounded-lg border p-3.5 transition-all duration-200
        ${selected
          ? `border-[${accentColor}/0.5] bg-[${accentColor}/0.08]`
          : 'border-[oklch(1_0_0/0.08)] bg-[oklch(0.15_0.015_260)] hover:border-[oklch(1_0_0/0.15)]'
        }
      `}
      style={{
        borderColor: selected ? `${accentColor}` : undefined,
        backgroundColor: selected ? `color-mix(in oklch, ${accentColor} 8%, oklch(0.15 0.015 260))` : undefined,
        boxShadow: selected ? `0 0 15px color-mix(in oklch, ${accentColor} 15%, transparent)` : undefined,
      }}
    >
      {/* Selected indicator */}
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ backgroundColor: accentColor }}
        >
          <Check className="w-3 h-3 text-[oklch(0.13_0.02_260)]" />
        </motion.div>
      )}

      {/* Icon + Title */}
      <div className="flex items-center gap-2.5 mb-2">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `color-mix(in oklch, ${accentColor} 15%, transparent)` }}
        >
          {isService
            ? <Wrench className="w-4 h-4" style={{ color: accentColor }} />
            : <TrendingUp className="w-4 h-4" style={{ color: accentColor }} />
          }
        </div>
        <div>
          <div className="text-sm font-semibold text-[oklch(0.93_0.005_260)] font-display">
            {mode.title}
          </div>
          <div className="text-[10px] text-[oklch(0.55_0.01_260)]">
            {mode.subtitle}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-[11px] leading-relaxed text-[oklch(0.60_0.015_260)] mb-2.5">
        {mode.description}
      </p>

      {/* Benefits */}
      <div className="space-y-1">
        {mode.benefits.map((benefit, i) => (
          <div key={i} className="flex items-center gap-1.5 text-[10px] text-[oklch(0.55_0.01_260)]">
            <ChevronRight className="w-2.5 h-2.5" style={{ color: accentColor }} />
            {benefit}
          </div>
        ))}
      </div>
    </motion.button>
  );
}

export default function ChatPanel({
  messages,
  onSendMessage,
  onSelectMode,
  selectedMode,
  isProcessing,
}: ChatPanelProps) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isProcessing) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[oklch(0.13_0.02_260)]">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[oklch(1_0_0/0.06)]">
        <div className="relative">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[oklch(0.72_0.15_195)] to-[oklch(0.55_0.18_195)] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[oklch(0.13_0.02_260)]" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[oklch(0.65_0.18_160)] border-2 border-[oklch(0.13_0.02_260)]" />
        </div>
        <div>
          <div className="text-sm font-semibold text-[oklch(0.93_0.005_260)] font-display">O2 AI Assistant</div>
          <div className="text-[10px] text-[oklch(0.50_0.01_260)]">E-Waste Analysis Engine</div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Welcome message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-4"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[oklch(0.72_0.15_195/0.08)] border border-[oklch(0.72_0.15_195/0.15)] mb-3">
            <Sparkles className="w-3 h-3 text-[oklch(0.72_0.15_195)]" />
            <span className="text-[10px] font-medium text-[oklch(0.72_0.15_195)]">AI-Powered Analysis</span>
          </div>
          <p className="text-[11px] text-[oklch(0.45_0.01_260)] max-w-[260px] mx-auto leading-relaxed">
            Enter your recycling requirements to generate a component teardown analysis and topology diagram.
          </p>
        </motion.div>

        <AnimatePresence mode="popLayout">
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.type === 'mode-selection' ? (
                <div className="w-full space-y-2.5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-px flex-1 bg-[oklch(1_0_0/0.06)]" />
                    <span className="text-[10px] font-medium text-[oklch(0.50_0.01_260)] uppercase tracking-wider">
                      Choose Processing Mode
                    </span>
                    <div className="h-px flex-1 bg-[oklch(1_0_0/0.06)]" />
                  </div>
                  {processingModes.map((mode) => (
                    <ModeSelectionCard
                      key={mode.id}
                      mode={mode}
                      onSelect={onSelectMode}
                      selected={selectedMode?.id === mode.id}
                    />
                  ))}
                </div>
              ) : (
                <div
                  className={`
                    max-w-[85%] rounded-xl px-3.5 py-2.5
                    ${msg.role === 'user'
                      ? 'bg-[oklch(0.72_0.15_195)] text-[oklch(0.13_0.02_260)]'
                      : 'bg-[oklch(0.17_0.015_260)] border border-[oklch(1_0_0/0.06)] text-[oklch(0.85_0.01_260)]'
                    }
                  `}
                >
                  <div className={`text-[12px] leading-relaxed whitespace-pre-line ${
                    msg.role === 'user' ? 'font-medium' : ''
                  }`}>
                    {msg.content}
                  </div>
                  <div className={`text-[9px] mt-1.5 ${
                    msg.role === 'user' ? 'text-[oklch(0.13_0.02_260/0.5)]' : 'text-[oklch(0.45_0.01_260)]'
                  }`}>
                    {msg.role === 'user' ? 'YOU' : 'ASSISTANT'}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <TypingIndicator />
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="px-3 pb-3 pt-2">
        <form onSubmit={handleSubmit} className="relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter recycling requirements..."
            disabled={isProcessing}
            className="
              w-full h-10 pl-4 pr-11 rounded-lg
              bg-[oklch(0.17_0.015_260)] border border-[oklch(1_0_0/0.08)]
              text-[12px] text-[oklch(0.90_0.005_260)]
              placeholder:text-[oklch(0.40_0.01_260)]
              focus:outline-none focus:border-[oklch(0.72_0.15_195/0.3)]
              focus:ring-1 focus:ring-[oklch(0.72_0.15_195/0.15)]
              transition-all duration-200
              disabled:opacity-50
            "
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isProcessing}
            className="
              absolute right-1.5 top-1/2 -translate-y-1/2
              w-7 h-7 rounded-md flex items-center justify-center
              bg-[oklch(0.72_0.15_195)] text-[oklch(0.13_0.02_260)]
              hover:bg-[oklch(0.78_0.15_195)]
              disabled:opacity-30 disabled:hover:bg-[oklch(0.72_0.15_195)]
              transition-all duration-200
            "
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}

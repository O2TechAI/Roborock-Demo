/**
 * ChatPanel Component — Light Theme
 * 
 * Left-side AI chat interface with message bubbles, mode selection cards,
 * and input field. Dark sidebar style for contrast with light main area.
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Wrench, TrendingUp, Check, Sparkles, ChevronRight } from 'lucide-react';
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
        <div className="w-1.5 h-1.5 rounded-full typing-dot" style={{ backgroundColor: '#94a3b8' }} />
        <div className="w-1.5 h-1.5 rounded-full typing-dot" style={{ backgroundColor: '#94a3b8' }} />
        <div className="w-1.5 h-1.5 rounded-full typing-dot" style={{ backgroundColor: '#94a3b8' }} />
      </div>
      <span className="text-[11px] ml-2" style={{ color: '#94a3b8' }}>O2 AI is analyzing...</span>
    </div>
  );
}

function ModeSelectionCard({ mode, onSelect, selected }: {
  mode: ProcessingMode;
  onSelect: (mode: ProcessingMode) => void;
  selected: boolean;
}) {
  const isService = mode.id === 'service';
  const accentColor = isService ? '#2563eb' : '#059669';
  const accentLight = isService ? '#dbeafe' : '#d1fae5';

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(mode)}
      className="relative w-full text-left rounded-lg border p-3.5 transition-all duration-200"
      style={{
        borderColor: selected ? accentColor : '#334155',
        backgroundColor: selected ? `${accentColor}12` : '#1e293b',
        boxShadow: selected ? `0 0 12px ${accentColor}20` : undefined,
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
          <Check className="w-3 h-3 text-white" />
        </motion.div>
      )}

      {/* Icon + Title */}
      <div className="flex items-center gap-2.5 mb-2">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${accentColor}20` }}
        >
          {isService
            ? <Wrench className="w-4 h-4" style={{ color: accentColor }} />
            : <TrendingUp className="w-4 h-4" style={{ color: accentColor }} />
          }
        </div>
        <div>
          <div className="text-sm font-semibold font-display" style={{ color: '#f1f5f9' }}>
            {mode.title}
          </div>
          <div className="text-[10px]" style={{ color: '#94a3b8' }}>
            {mode.subtitle}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-[11px] leading-relaxed mb-2.5" style={{ color: '#cbd5e1' }}>
        {mode.description}
      </p>

      {/* Benefits */}
      <div className="space-y-1">
        {mode.benefits.map((benefit, i) => (
          <div key={i} className="flex items-center gap-1.5 text-[10px]" style={{ color: '#94a3b8' }}>
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
    <div className="flex flex-col h-full" style={{ backgroundColor: '#0f172a' }}>
      {/* Chat header */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid #1e293b' }}>
        <div className="relative">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}
          >
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div
            className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: '#22c55e', border: '2px solid #0f172a' }}
          />
        </div>
        <div>
          <div className="text-sm font-semibold font-display" style={{ color: '#f1f5f9' }}>O2 AI Assistant</div>
          <div className="text-[10px]" style={{ color: '#64748b' }}>E-Waste Analysis Engine</div>
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
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-3"
            style={{ backgroundColor: '#1e3a5f', border: '1px solid #2563eb30' }}
          >
            <Sparkles className="w-3 h-3" style={{ color: '#60a5fa' }} />
            <span className="text-[10px] font-medium" style={{ color: '#60a5fa' }}>AI-Powered Analysis</span>
          </div>
          <p className="text-[11px] max-w-[260px] mx-auto leading-relaxed" style={{ color: '#64748b' }}>
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
                    <div className="h-px flex-1" style={{ backgroundColor: '#1e293b' }} />
                    <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: '#64748b' }}>
                      Choose Processing Mode
                    </span>
                    <div className="h-px flex-1" style={{ backgroundColor: '#1e293b' }} />
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
                  className="max-w-[85%] rounded-xl px-3.5 py-2.5"
                  style={msg.role === 'user'
                    ? { backgroundColor: '#2563eb', color: '#ffffff' }
                    : { backgroundColor: '#1e293b', border: '1px solid #334155', color: '#e2e8f0' }
                  }
                >
                  <div className={`text-[12px] leading-relaxed whitespace-pre-line ${msg.role === 'user' ? 'font-medium' : ''}`}>
                    {msg.content}
                  </div>
                  <div
                    className="text-[9px] mt-1.5"
                    style={{ color: msg.role === 'user' ? 'rgba(255,255,255,0.5)' : '#64748b' }}
                  >
                    {msg.role === 'user' ? 'YOU' : 'ASSISTANT'}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isProcessing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
            className="w-full h-10 pl-4 pr-11 rounded-lg text-[12px] transition-all duration-200 disabled:opacity-50 focus:outline-none"
            style={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              color: '#f1f5f9',
            }}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isProcessing}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md flex items-center justify-center transition-all duration-200 disabled:opacity-30"
            style={{ backgroundColor: '#2563eb', color: '#ffffff' }}
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}

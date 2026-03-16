/**
 * ChatPanel — Redesigned
 * 
 * Features:
 * - Mode toggle (Service Fee / Trading) fixed at top, always visible
 * - Example query buttons in empty state
 * - AI thinking steps animation
 * - Clean dark sidebar aesthetic
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Wrench, TrendingUp, Sparkles, MessageSquare, Bot, User } from 'lucide-react';
import { ChatMessage, ModeType, ExampleQuery, exampleQueries } from '@/lib/demoData';

interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onSelectExample: (query: ExampleQuery) => void;
  selectedMode: ModeType;
  onModeChange: (mode: ModeType) => void;
  isProcessing: boolean;
  hasStarted: boolean;
}

function TypingIndicator({ text }: { text?: string }) {
  return (
    <div className="flex items-start gap-2.5 px-1">
      <div
        className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ backgroundColor: 'rgba(99, 102, 241, 0.15)' }}
      >
        <Bot className="w-3.5 h-3.5" style={{ color: '#818cf8' }} />
      </div>
      <div className="flex-1">
        <div
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2"
          style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
        >
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full typing-dot" style={{ backgroundColor: '#818cf8' }} />
            <div className="w-1.5 h-1.5 rounded-full typing-dot" style={{ backgroundColor: '#818cf8' }} />
            <div className="w-1.5 h-1.5 rounded-full typing-dot" style={{ backgroundColor: '#818cf8' }} />
          </div>
          {text && (
            <span className="text-[11px] font-mono" style={{ color: '#94a3b8' }}>{text}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function ModeToggle({ selected, onChange }: { selected: ModeType; onChange: (m: ModeType) => void }) {
  return (
    <div className="flex gap-1 p-1 rounded-lg" style={{ backgroundColor: '#1e293b' }}>
      <button
        onClick={() => onChange('service')}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium transition-all duration-200"
        style={{
          backgroundColor: selected === 'service' ? '#2563eb' : 'transparent',
          color: selected === 'service' ? '#ffffff' : '#94a3b8',
        }}
      >
        <Wrench className="w-3 h-3" />
        Service Fee
      </button>
      <button
        onClick={() => onChange('trading')}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium transition-all duration-200"
        style={{
          backgroundColor: selected === 'trading' ? '#059669' : 'transparent',
          color: selected === 'trading' ? '#ffffff' : '#94a3b8',
        }}
      >
        <TrendingUp className="w-3 h-3" />
        Trading
      </button>
    </div>
  );
}

export default function ChatPanel({
  messages,
  onSendMessage,
  onSelectExample,
  selectedMode,
  onModeChange,
  isProcessing,
  hasStarted,
}: ChatPanelProps) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      {/* Header with mode toggle */}
      <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid #1e293b' }}>
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <div className="text-[13px] font-semibold" style={{ color: '#f1f5f9', fontFamily: "'Space Grotesk', system-ui" }}>
              O2 AI
            </div>
          </div>
        </div>
        <ModeToggle selected={selectedMode} onChange={onModeChange} />
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {!hasStarted ? (
          /* Empty state with example queries */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center pt-8"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
            >
              <MessageSquare className="w-5 h-5" style={{ color: '#64748b' }} />
            </div>
            <h3 className="text-[14px] font-semibold mb-1" style={{ color: '#e2e8f0', fontFamily: "'Space Grotesk', system-ui" }}>
              Start a new conversation
            </h3>
            <p className="text-[11px] mb-6" style={{ color: '#64748b' }}>
              Try these example queries:
            </p>
            <div className="w-full space-y-2">
              {exampleQueries.map((query, i) => (
                <motion.button
                  key={query.product}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                  onClick={() => onSelectExample(query)}
                  className="w-full text-left rounded-lg px-4 py-3 transition-all duration-200 group"
                  style={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#475569';
                    e.currentTarget.style.backgroundColor = '#253248';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#334155';
                    e.currentTarget.style.backgroundColor = '#1e293b';
                  }}
                >
                  <div className="text-[13px] font-semibold mb-0.5" style={{ color: '#6ee7b7', fontFamily: "'Space Grotesk', system-ui" }}>
                    {query.product}
                  </div>
                  <div className="text-[11px]" style={{ color: '#94a3b8' }}>
                    {query.description}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Chat messages */
          <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                {msg.role === 'user' ? (
                  <div className="flex items-start gap-2.5 justify-end px-1">
                    <div className="max-w-[85%]">
                      <div
                        className="rounded-lg px-3 py-2 text-[12px] leading-relaxed"
                        style={{ backgroundColor: '#2563eb', color: '#ffffff' }}
                      >
                        {msg.content}
                      </div>
                      <div className="text-[9px] mt-1 text-right" style={{ color: '#475569' }}>YOU</div>
                    </div>
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: 'rgba(37, 99, 235, 0.2)' }}
                    >
                      <User className="w-3.5 h-3.5" style={{ color: '#60a5fa' }} />
                    </div>
                  </div>
                ) : msg.role === 'thinking' ? (
                  <div className="flex items-start gap-2.5 px-1">
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: 'rgba(99, 102, 241, 0.15)' }}
                    >
                      <Bot className="w-3.5 h-3.5" style={{ color: '#818cf8' }} />
                    </div>
                    <div className="flex-1">
                      <div
                        className="rounded-lg px-3 py-2 text-[11px] font-mono leading-relaxed"
                        style={{ backgroundColor: '#1a1f35', border: '1px solid #2d3555', color: '#a5b4fc' }}
                      >
                        <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse" style={{ backgroundColor: '#818cf8' }} />
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2.5 px-1">
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: 'rgba(99, 102, 241, 0.15)' }}
                    >
                      <Bot className="w-3.5 h-3.5" style={{ color: '#818cf8' }} />
                    </div>
                    <div className="flex-1">
                      <div
                        className="rounded-lg px-3 py-2.5 text-[12px] leading-relaxed whitespace-pre-line"
                        style={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#e2e8f0' }}
                      >
                        {msg.content}
                      </div>
                      <div className="text-[9px] mt-1" style={{ color: '#475569' }}>O2 AI</div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        )}

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
            style={{ backgroundColor: '#4f46e5', color: '#ffffff' }}
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}

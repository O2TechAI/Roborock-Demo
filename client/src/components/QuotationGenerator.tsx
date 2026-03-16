/**
 * QuotationGenerator — Generates a quotation with animated progress bar
 * 
 * Shows step-by-step processing, then a final quotation summary.
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, FileText, Loader2, CheckCircle2, Download, Printer } from 'lucide-react';
import {
  ModeType, quotationSteps,
  tradingSellablePartsTotal, tradingSellablePartsBatch,
  rawMaterialTotal, rawMaterialBatch,
  totalCostBatch, totalCostPerUnit,
} from '@/lib/demoData';

interface QuotationGeneratorProps {
  mode: ModeType;
  onBack: () => void;
}

export default function QuotationGenerator({ mode, onBack }: QuotationGeneratorProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (currentStep < quotationSteps.length - 1) {
      const delay = 800 + Math.random() * 600;
      timerRef.current = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, delay);
    } else if (currentStep === quotationSteps.length - 1) {
      timerRef.current = setTimeout(() => {
        setIsComplete(true);
      }, 600);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [currentStep]);

  const progress = quotationSteps[currentStep]?.progress ?? 0;
  const stepLabel = quotationSteps[currentStep]?.label ?? '';
  const accentColor = mode === 'service' ? '#2563eb' : '#059669';

  // Quotation data
  const isService = mode === 'service';
  const totalRevenue = isService ? 26750 : 6750;
  const totalCost = isService ? 13000 : 13500;
  const netProfit = totalRevenue - totalCost;

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: '#ffffff' }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid #e2e8f0' }}>
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[12px] font-medium transition-colors hover:opacity-80"
          style={{ color: accentColor }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Analysis
        </button>
        <div className="h-4 w-px" style={{ backgroundColor: '#e2e8f0' }} />
        <span className="text-[13px] font-semibold" style={{ color: '#1e293b', fontFamily: "'Space Grotesk', system-ui" }}>
          Quotation Generator
        </span>
        <span className="text-[11px]" style={{ color: '#94a3b8' }}>
          / Roborock S7 - 500 Units
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-8">
          {!isComplete ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-md text-center"
            >
              <div className="mb-6">
                <Loader2 className="w-10 h-10 mx-auto animate-spin" style={{ color: accentColor }} />
              </div>
              <h3 className="text-[16px] font-semibold mb-2" style={{ color: '#1e293b', fontFamily: "'Space Grotesk', system-ui" }}>
                Generating Quotation
              </h3>
              <p className="text-[12px] mb-6" style={{ color: '#94a3b8' }}>
                {stepLabel}
              </p>
              <div className="w-full">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px]" style={{ color: '#94a3b8' }}>Progress</span>
                  <span className="text-[11px] font-mono" style={{ color: '#64748b' }}>{progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#f1f5f9' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: accentColor }}
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-lg overflow-y-auto max-h-full"
            >
              {/* Success header */}
              <div className="text-center mb-6">
                <CheckCircle2 className="w-10 h-10 mx-auto mb-3" style={{ color: accentColor }} />
                <h3 className="text-[16px] font-semibold" style={{ color: '#1e293b', fontFamily: "'Space Grotesk', system-ui" }}>
                  Quotation Generated
                </h3>
                <p className="text-[11px] mt-1" style={{ color: '#94a3b8' }}>
                  {isService ? 'Service Fee Mode' : 'Trading Mode'} — Roborock S7 x 500 Units
                </p>
              </div>

              {/* Quotation card */}
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                <div className="px-5 py-3" style={{ backgroundColor: accentColor }}>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-white" />
                    <span className="text-[13px] font-semibold text-white" style={{ fontFamily: "'Space Grotesk', system-ui" }}>
                      O2 AI — Recycling Quotation
                    </span>
                  </div>
                  <div className="text-[10px] text-white/70 mt-0.5">
                    QT-2026-{isService ? 'SVC' : 'TRD'}-00147 | Generated {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {/* Product info */}
                  <div className="grid grid-cols-2 gap-3 text-[11px]">
                    <div>
                      <div style={{ color: '#94a3b8' }}>Product</div>
                      <div className="font-medium" style={{ color: '#1e293b' }}>Roborock S7 Robot Vacuum</div>
                    </div>
                    <div>
                      <div style={{ color: '#94a3b8' }}>Quantity</div>
                      <div className="font-medium" style={{ color: '#1e293b' }}>500 units (1,850 kg)</div>
                    </div>
                    <div>
                      <div style={{ color: '#94a3b8' }}>Processing Mode</div>
                      <div className="font-medium" style={{ color: '#1e293b' }}>{isService ? 'Service Fee' : 'Trading (Buyout)'}</div>
                    </div>
                    <div>
                      <div style={{ color: '#94a3b8' }}>Recovery Rate</div>
                      <div className="font-medium" style={{ color: '#1e293b' }}>94.2%</div>
                    </div>
                  </div>

                  <div className="h-px" style={{ backgroundColor: '#f1f5f9' }} />

                  {/* Financial summary */}
                  <div className="space-y-2">
                    {isService ? (
                      <>
                        <Row label="Revenue from Service Fee" value="$20,000.00" />
                        <Row label="Revenue from Robots (Recovered Assets)" value="$6,750.00" />
                        <Row label="Total Revenue" value={`$${totalRevenue.toLocaleString()}.00`} bold />
                        <Row label="Total Cost" value={`($${totalCost.toLocaleString()}.00)`} negative />
                        <div className="h-px my-1" style={{ backgroundColor: '#e2e8f0' }} />
                        <Row label="Total Profit" value={`$${netProfit.toLocaleString()}.00`} bold accent={accentColor} />
                      </>
                    ) : (
                      <>
                        <Row label="Revenue from Sellable Parts" value="$5,300.00" />
                        <Row label="Revenue from Raw Materials" value="$1,450.00" />
                        <Row label="Total Revenue" value={`$${totalRevenue.toLocaleString()}.00`} bold />
                        <Row label="Total Processing Cost" value="($10,000.00)" negative />
                        <Row label="Buyout Price to Client" value="($3,500.00)" negative />
                        <div className="h-px my-1" style={{ backgroundColor: '#e2e8f0' }} />
                        <Row label="Net Position" value={`-$${Math.abs(netProfit).toLocaleString()}.00`} bold accent="#dc2626" />
                      </>
                    )}
                  </div>

                  {/* Client-facing price */}
                  <div className="rounded-lg p-4 text-center" style={{ backgroundColor: isService ? '#eff6ff' : '#f0fdf4', border: `1px solid ${isService ? '#bfdbfe' : '#bbf7d0'}` }}>
                    <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: '#64748b' }}>
                      {isService ? 'Proposed Service Fee to Client' : 'Proposed Buyout Price to Client'}
                    </div>
                    <div className="text-[22px] font-bold font-mono" style={{ color: accentColor, fontFamily: "'Space Grotesk', system-ui" }}>
                      {isService ? '$20,000.00' : '$3,500.00'}
                    </div>
                    <div className="text-[10px] mt-0.5" style={{ color: '#94a3b8' }}>
                      {isService ? '$40.00 per unit' : '$7.00 per unit'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-center gap-3 mt-5">
                <button
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: accentColor, color: '#ffffff' }}
                >
                  <Download className="w-3.5 h-3.5" />
                  Export PDF
                </button>
                <button
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-medium transition-all hover:bg-gray-50"
                  style={{ backgroundColor: '#ffffff', color: '#64748b', border: '1px solid #e2e8f0' }}
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print
                </button>
              </div>
            </motion.div>
          )}
      </div>
    </div>
  );
}

function Row({ label, value, bold, negative, accent }: {
  label: string; value: string; bold?: boolean; negative?: boolean; accent?: string;
}) {
  return (
    <div className="flex items-center justify-between text-[11px]">
      <span className={bold ? 'font-semibold' : ''} style={{ color: bold ? '#1e293b' : '#64748b' }}>{label}</span>
      <span
        className={`font-mono ${bold ? 'font-semibold text-[13px]' : ''}`}
        style={{ color: accent || (negative ? '#dc2626' : '#334155') }}
      >
        {value}
      </span>
    </div>
  );
}

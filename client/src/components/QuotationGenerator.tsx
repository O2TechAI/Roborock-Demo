/**
 * QuotationGenerator — Generates a quotation with animated progress bar
 * 
 * Shows step-by-step processing, then a final quotation summary.
 * Supports both hardcoded default data (Roborock S7) and dynamic AI analysis data.
 * Includes smart buyout pricing: proposes a price or recommends "Don't Buy".
 */

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Loader2, CheckCircle2, Download, Printer, AlertTriangle } from 'lucide-react';
import { ModeType, quotationSteps } from '@/lib/demoData';
import type { AnalysisResult } from '@shared/analysisTypes';

interface QuotationGeneratorProps {
  mode: ModeType;
  onBack: () => void;
  analysisData?: AnalysisResult;
}

export default function QuotationGenerator({ mode, onBack, analysisData }: QuotationGeneratorProps) {
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
  const isService = mode === 'service';

  // Derive quotation data from analysisData or defaults
  const qData = useMemo(() => {
    if (!analysisData) {
      // Default Roborock S7 data — consistent with demoData.ts
      const sellableRevenue = 7500;
      const rawMaterialRevenue = 2210;
      const totalRecoverable = 9710;
      const processingCost = 10000;
      const serviceFee = 20000;
      const targetMargin = 0.15;

      // Smart buyout: maxBuyout = totalRecoverable - processingCost - (totalRecoverable * margin)
      const maxBuyout = totalRecoverable - processingCost - (totalRecoverable * targetMargin);
      const tradingViable = maxBuyout > 0;
      const buyoutPrice = tradingViable ? Math.floor(maxBuyout / 100) * 100 : 0;

      return {
        product: 'Roborock S7 Robot Vacuum',
        units: 500,
        totalWeight: '1,850 kg',
        recoveryRate: '94.2%',
        sellableRevenue,
        rawMaterialRevenue,
        totalRecoverable,
        processingCost,
        serviceFee,
        serviceFeePerUnit: 40,
        netProfitService: serviceFee + totalRecoverable - (processingCost + 3000), // +3000 for overhead
        tradingViable,
        buyoutPrice,
        buyoutPerUnit: tradingViable ? Math.round(buyoutPrice / 500 * 100) / 100 : 0,
        netPositionTrading: tradingViable ? totalRecoverable - processingCost - buyoutPrice : totalRecoverable - processingCost,
        tradingReason: 'Total recoverable revenue ($9,710) is less than processing cost ($10,000). Any buyout price would increase the loss.',
      };
    }

    const sellableRev = analysisData.tradingSellablePartsBatch || 0;
    const rawRev = analysisData.rawMaterialBatch || 0;
    const totalRecoverable = sellableRev + rawRev;
    const processingCost = analysisData.totalCostBatch || 0;
    const targetMargin = 0.15;

    // Smart buyout pricing
    const maxBuyout = totalRecoverable - processingCost - (totalRecoverable * targetMargin);
    const tradingViable = maxBuyout > 0;
    const buyoutPrice = tradingViable ? Math.floor(maxBuyout / 100) * 100 : 0;

    // Service fee = cost * 2 (aim for ~50% gross margin, ~35% net)
    const serviceFee = Math.round(processingCost * 2 / 100) * 100;

    return {
      product: analysisData.product,
      units: analysisData.units,
      totalWeight: analysisData.totalWeight,
      recoveryRate: analysisData.recoveryRate,
      sellableRevenue: sellableRev,
      rawMaterialRevenue: rawRev,
      totalRecoverable,
      processingCost,
      serviceFee,
      serviceFeePerUnit: Math.round(serviceFee / analysisData.units * 100) / 100,
      netProfitService: serviceFee + totalRecoverable - processingCost,
      tradingViable,
      buyoutPrice,
      buyoutPerUnit: tradingViable ? Math.round(buyoutPrice / analysisData.units * 100) / 100 : 0,
      netPositionTrading: tradingViable ? totalRecoverable - processingCost - buyoutPrice : totalRecoverable - processingCost,
      tradingReason: tradingViable ? '' : `Total recoverable revenue ($${totalRecoverable.toLocaleString()}) minus processing cost ($${processingCost.toLocaleString()}) leaves insufficient margin for any buyout price.`,
    };
  }, [analysisData]);

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
          / {qData.product} - {qData.units.toLocaleString()} Units
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
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
              className="w-full max-w-lg"
            >
              {/* Success header */}
              <div className="text-center mb-6">
                <CheckCircle2 className="w-10 h-10 mx-auto mb-3" style={{ color: accentColor }} />
                <h3 className="text-[16px] font-semibold" style={{ color: '#1e293b', fontFamily: "'Space Grotesk', system-ui" }}>
                  Quotation Generated
                </h3>
                <p className="text-[11px] mt-1" style={{ color: '#94a3b8' }}>
                  {isService ? 'Service Fee Mode' : 'Trading Mode'} — {qData.product} x {qData.units.toLocaleString()} Units
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
                    QT-2026-{isService ? 'SVC' : 'TRD'}-{String(Math.floor(Math.random() * 900 + 100)).padStart(5, '0')} | Generated {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {/* Product info */}
                  <div className="grid grid-cols-2 gap-3 text-[11px]">
                    <div>
                      <div style={{ color: '#94a3b8' }}>Product</div>
                      <div className="font-medium" style={{ color: '#1e293b' }}>{qData.product}</div>
                    </div>
                    <div>
                      <div style={{ color: '#94a3b8' }}>Quantity</div>
                      <div className="font-medium" style={{ color: '#1e293b' }}>{qData.units.toLocaleString()} units ({qData.totalWeight})</div>
                    </div>
                    <div>
                      <div style={{ color: '#94a3b8' }}>Processing Mode</div>
                      <div className="font-medium" style={{ color: '#1e293b' }}>{isService ? 'Service Fee' : 'Trading (Buyout)'}</div>
                    </div>
                    <div>
                      <div style={{ color: '#94a3b8' }}>Recovery Rate</div>
                      <div className="font-medium" style={{ color: '#1e293b' }}>{qData.recoveryRate}</div>
                    </div>
                  </div>

                  <div className="h-px" style={{ backgroundColor: '#f1f5f9' }} />

                  {/* Financial summary */}
                  <div className="space-y-2">
                    {isService ? (
                      <>
                        <Row label="Revenue from Service Fee" value={fmt(qData.serviceFee)} />
                        <Row label="Revenue from Recovered Assets" value={fmt(qData.totalRecoverable)} />
                        <Row label="Total Revenue" value={fmt(qData.serviceFee + qData.totalRecoverable)} bold />
                        <Row label="Total Processing Cost" value={`(${fmt(qData.processingCost)})`} negative />
                        <div className="h-px my-1" style={{ backgroundColor: '#e2e8f0' }} />
                        <Row label="Net Profit" value={fmt(qData.netProfitService)} bold accent={qData.netProfitService >= 0 ? accentColor : '#dc2626'} />
                      </>
                    ) : (
                      <>
                        <Row label="Revenue from Sellable Parts" value={fmt(qData.sellableRevenue)} />
                        <Row label="Revenue from Raw Materials" value={fmt(qData.rawMaterialRevenue)} />
                        <Row label="Total Recoverable Revenue" value={fmt(qData.totalRecoverable)} bold />
                        <Row label="Total Processing Cost" value={`(${fmt(qData.processingCost)})`} negative />
                        {qData.tradingViable && (
                          <Row label="Buyout Price to Client" value={`(${fmt(qData.buyoutPrice)})`} negative />
                        )}
                        <div className="h-px my-1" style={{ backgroundColor: '#e2e8f0' }} />
                        <Row
                          label={qData.tradingViable ? 'Net Profit' : 'Net Before Buyout'}
                          value={`${qData.netPositionTrading < 0 ? '-' : ''}${fmt(Math.abs(qData.netPositionTrading))}`}
                          bold
                          accent={qData.netPositionTrading >= 0 ? accentColor : '#dc2626'}
                        />
                      </>
                    )}
                  </div>

                  {/* Client-facing price / recommendation */}
                  {isService ? (
                    <div className="rounded-lg p-4 text-center" style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}>
                      <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: '#64748b' }}>
                        Proposed Service Fee to Client
                      </div>
                      <div className="text-[22px] font-bold font-mono" style={{ color: accentColor, fontFamily: "'Space Grotesk', system-ui" }}>
                        {fmt(qData.serviceFee)}
                      </div>
                      <div className="text-[10px] mt-0.5" style={{ color: '#94a3b8' }}>
                        ${qData.serviceFeePerUnit.toFixed(2)} per unit
                      </div>
                    </div>
                  ) : qData.tradingViable ? (
                    <div className="rounded-lg p-4 text-center" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                      <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: '#64748b' }}>
                        Proposed Buyout Price to Client
                      </div>
                      <div className="text-[22px] font-bold font-mono" style={{ color: '#059669', fontFamily: "'Space Grotesk', system-ui" }}>
                        {fmt(qData.buyoutPrice)}
                      </div>
                      <div className="text-[10px] mt-0.5" style={{ color: '#94a3b8' }}>
                        ${qData.buyoutPerUnit.toFixed(2)} per unit (15% target margin)
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-lg p-4 text-center" style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4" style={{ color: '#dc2626' }} />
                        <div className="text-[13px] font-bold" style={{ color: '#dc2626', fontFamily: "'Space Grotesk', system-ui" }}>
                          DO NOT BUY
                        </div>
                      </div>
                      <div className="text-[11px] leading-relaxed" style={{ color: '#991b1b' }}>
                        {qData.tradingReason}
                      </div>
                    </div>
                  )}
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

function fmt(val: number): string {
  return `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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

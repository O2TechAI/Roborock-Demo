/**
 * QuotationGenerator — Generates a quotation with animated progress bar
 * 
 * Shows step-by-step processing, then a final quotation summary.
 * Supports both hardcoded default data (Roborock S7) and dynamic AI analysis data.
 */

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Loader2, CheckCircle2, Download, Printer } from 'lucide-react';
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
      // Default Roborock S7 data
      return {
        product: 'Roborock S7 Robot Vacuum',
        units: 500,
        totalWeight: '1,850 kg',
        recoveryRate: '94.2%',
        sellableRevenue: 5300,
        rawMaterialRevenue: 1450,
        totalRevenueTrd: 6750,
        totalRevenueSvc: 26750,
        totalCost: 13000,
        totalCostTrd: 13500,
        buyoutPrice: 3500,
        serviceFee: 20000,
        serviceFeePerUnit: 40,
        buyoutPerUnit: 7,
      };
    }

    const sellableRev = analysisData.tradingSellablePartsBatch;
    const rawRev = analysisData.rawMaterialBatch;
    const totalCost = analysisData.totalCostBatch;
    const totalRevenueTrd = sellableRev + rawRev;
    
    // Service fee = cost * 1.5 + some margin (aim for ~35% profit margin)
    const serviceFee = Math.round(totalCost * 1.55 / 100) * 100;
    const totalRevenueSvc = serviceFee + rawRev;
    
    // Buyout price = total recoverable - cost - margin (or a reasonable fraction)
    const buyoutPrice = Math.max(0, Math.round((totalRevenueTrd - totalCost) * 0.4 / 100) * 100);

    return {
      product: analysisData.product,
      units: analysisData.units,
      totalWeight: analysisData.totalWeight,
      recoveryRate: analysisData.recoveryRate,
      sellableRevenue: sellableRev,
      rawMaterialRevenue: rawRev,
      totalRevenueTrd,
      totalRevenueSvc,
      totalCost,
      totalCostTrd: totalCost + buyoutPrice,
      buyoutPrice,
      serviceFee,
      serviceFeePerUnit: Math.round(serviceFee / analysisData.units * 100) / 100,
      buyoutPerUnit: Math.round(buyoutPrice / analysisData.units * 100) / 100,
    };
  }, [analysisData]);

  const netProfitSvc = qData.totalRevenueSvc - qData.totalCost;
  const netPositionTrd = qData.totalRevenueTrd - qData.totalCostTrd;

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
                        <Row label="Revenue from Recovered Assets" value={fmt(qData.rawMaterialRevenue)} />
                        <Row label="Total Revenue" value={fmt(qData.totalRevenueSvc)} bold />
                        <Row label="Total Cost" value={`(${fmt(qData.totalCost)})`} negative />
                        <div className="h-px my-1" style={{ backgroundColor: '#e2e8f0' }} />
                        <Row label="Total Profit" value={fmt(netProfitSvc)} bold accent={netProfitSvc >= 0 ? accentColor : '#dc2626'} />
                      </>
                    ) : (
                      <>
                        <Row label="Revenue from Sellable Parts" value={fmt(qData.sellableRevenue)} />
                        <Row label="Revenue from Raw Materials" value={fmt(qData.rawMaterialRevenue)} />
                        <Row label="Total Revenue" value={fmt(qData.totalRevenueTrd)} bold />
                        <Row label="Total Processing Cost" value={`(${fmt(qData.totalCost)})`} negative />
                        <Row label="Buyout Price to Client" value={`(${fmt(qData.buyoutPrice)})`} negative />
                        <div className="h-px my-1" style={{ backgroundColor: '#e2e8f0' }} />
                        <Row
                          label="Net Position"
                          value={`${netPositionTrd < 0 ? '-' : ''}${fmt(Math.abs(netPositionTrd))}`}
                          bold
                          accent={netPositionTrd >= 0 ? accentColor : '#dc2626'}
                        />
                      </>
                    )}
                  </div>

                  {/* Client-facing price */}
                  <div className="rounded-lg p-4 text-center" style={{ backgroundColor: isService ? '#eff6ff' : '#f0fdf4', border: `1px solid ${isService ? '#bfdbfe' : '#bbf7d0'}` }}>
                    <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: '#64748b' }}>
                      {isService ? 'Proposed Service Fee to Client' : 'Proposed Buyout Price to Client'}
                    </div>
                    <div className="text-[22px] font-bold font-mono" style={{ color: accentColor, fontFamily: "'Space Grotesk', system-ui" }}>
                      {isService ? fmt(qData.serviceFee) : fmt(qData.buyoutPrice)}
                    </div>
                    <div className="text-[10px] mt-0.5" style={{ color: '#94a3b8' }}>
                      {isService ? `$${qData.serviceFeePerUnit.toFixed(2)} per unit` : `$${qData.buyoutPerUnit.toFixed(2)} per unit`}
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

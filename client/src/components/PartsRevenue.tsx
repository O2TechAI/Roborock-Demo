/**
 * PartsRevenue — Financial Analysis Tables
 * 
 * Service Fee mode tabs: Raw Materials | Cost Breakdown | Service Fee | Deal Summary
 * Trading mode tabs: Sellable Parts | Raw Materials | Total Recovery | Cost Breakdown | Deal Summary
 * 
 * Supports both hardcoded default data (Roborock S7) and dynamic AI analysis data.
 */

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { AnalysisResult } from '@shared/analysisTypes';
import {
  ModeType,
  tradingSellableParts as defaultSellableParts,
  tradingSellablePartsTotal as defaultSellableTotal,
  tradingSellablePartsBatch as defaultSellableBatch,
  rawMaterialRecovery as defaultRawMaterials,
  rawMaterialTotal as defaultRawTotal,
  rawMaterialBatch as defaultRawBatch,
  tradingTotalRecovery as defaultTotalRecovery,
  tradingTotalRecoverablePerUnit as defaultRecoverablePerUnit,
  tradingTotalRecoverableBatch as defaultRecoverableBatch,
  costBreakdown as defaultCostBreakdown,
  totalCostPerUnit as defaultCostPerUnit,
  totalCostBatch as defaultCostBatch,
  serviceFeeProposal as defaultServiceFee,
  serviceFeeDealSummary as defaultServiceDeal,
  tradingDealSummary as defaultTradingDeal,
} from '@/lib/demoData';

interface PartsRevenueProps {
  mode: ModeType;
  analysisData?: AnalysisResult;
}

function formatCurrency(val: number, showSign = false): string {
  const prefix = showSign && val < 0 ? '-' : showSign && val > 0 ? '+' : val < 0 ? '-' : '';
  return `${prefix}$${Math.abs(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function TableWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[12px]" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
        {children}
      </table>
    </div>
  );
}

function Th({ children, align = 'left' }: { children: React.ReactNode; align?: 'left' | 'right' | 'center' }) {
  return (
    <th
      className={`px-3 py-2.5 font-semibold text-[11px] uppercase tracking-wider ${align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'}`}
      style={{ color: '#64748b', backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}
    >
      {children}
    </th>
  );
}

function Td({ children, align = 'left', highlight = false, bold = false }: {
  children: React.ReactNode; align?: 'left' | 'right' | 'center'; highlight?: boolean; bold?: boolean;
}) {
  return (
    <td
      className={`px-3 py-2.5 ${align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'} ${bold ? 'font-semibold' : ''}`}
      style={{
        color: highlight ? '#059669' : '#334155',
        borderBottom: '1px solid #f1f5f9',
        fontFamily: align === 'right' ? "'Geist Mono', monospace" : undefined,
      }}
    >
      {children}
    </td>
  );
}

/* ---- Tab: Sellable Parts (Trading only) ---- */
function SellablePartsTab({ data, total, batch }: {
  data: { component: string; qty: number; unitValue: number; subtotal: number; notes: string; assembly: string }[];
  total: number;
  batch: number;
}) {
  return (
    <div>
      <TableWrapper>
        <thead>
          <tr>
            <Th>#</Th>
            <Th>Component</Th>
            <Th align="center">Qty</Th>
            <Th align="right">Unit Value</Th>
            <Th align="right">Subtotal</Th>
            <Th>Notes</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
              <Td>{i + 1}</Td>
              <Td bold>{row.component}</Td>
              <Td align="center">{row.qty}</Td>
              <Td align="right">${row.unitValue.toFixed(2)}</Td>
              <Td align="right" highlight>${row.subtotal.toFixed(2)}</Td>
              <Td><span style={{ color: '#94a3b8' }}>{row.assembly}</span></Td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>
      <div className="mt-3 flex items-center justify-end gap-6 px-3 py-3 rounded-lg" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
        <div className="text-[12px] font-semibold" style={{ color: '#475569' }}>Total Sellable Parts Revenue</div>
        <div className="text-[16px] font-bold font-mono" style={{ color: '#059669' }}>${total.toFixed(2)}</div>
        <div className="text-[11px]" style={{ color: '#94a3b8' }}>per unit</div>
      </div>
      <div className="mt-2 flex items-center justify-end gap-6 px-3 py-2 rounded-lg" style={{ backgroundColor: '#ecfdf5' }}>
        <div className="text-[11px]" style={{ color: '#065f46' }}>
          Batch (${total.toFixed(2)} x units)
        </div>
        <div className="text-[14px] font-bold font-mono" style={{ color: '#059669' }}>
          ${batch.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
      </div>
    </div>
  );
}

/* ---- Tab: Raw Materials ---- */
function RawMaterialsTab({ data, total, batch }: {
  data: { category: string; material: string; weightKg: number; unitPrice: string; revenue: number }[];
  total: number;
  batch: number;
}) {
  return (
    <div>
      <TableWrapper>
        <thead>
          <tr>
            <Th>Category</Th>
            <Th>Material</Th>
            <Th align="right">Weight (kg)</Th>
            <Th align="right">Unit Price</Th>
            <Th align="right">Revenue ($)</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
              <Td><span className="text-[10px] font-medium px-1.5 py-0.5 rounded" style={{ backgroundColor: '#f1f5f9', color: '#64748b' }}>{row.category}</span></Td>
              <Td bold>{row.material}</Td>
              <Td align="right">{row.weightKg < 0.001 ? row.weightKg.toFixed(7) : row.weightKg.toFixed(3)}</Td>
              <Td align="right">{row.unitPrice}</Td>
              <Td align="right" highlight>${row.revenue.toFixed(2)}</Td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>
      <div className="mt-3 flex items-center justify-end gap-6 px-3 py-3 rounded-lg" style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}>
        <div className="text-[12px] font-semibold" style={{ color: '#475569' }}>Total Raw Material Revenue</div>
        <div className="text-[16px] font-bold font-mono" style={{ color: '#2563eb' }}>${total.toFixed(2)}</div>
        <div className="text-[11px]" style={{ color: '#94a3b8' }}>per unit</div>
      </div>
      <div className="mt-2 flex items-center justify-end gap-6 px-3 py-2 rounded-lg" style={{ backgroundColor: '#eff6ff' }}>
        <div className="text-[11px]" style={{ color: '#1e40af' }}>
          Batch (${total.toFixed(2)} x units)
        </div>
        <div className="text-[14px] font-bold font-mono" style={{ color: '#2563eb' }}>
          ${batch.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
      </div>
      <p className="mt-3 text-[10px] italic px-1" style={{ color: '#94a3b8' }}>
        * Prices based on Q1 2026 spot rates. Actual system connects to real-time commodity futures / spot markets.
      </p>
    </div>
  );
}

/* ---- Tab: Total Recovery (Trading only) ---- */
function TotalRecoveryTab({ sellableTotal, rawTotal, sellableBatch, rawBatch, units }: {
  sellableTotal: number;
  rawTotal: number;
  sellableBatch: number;
  rawBatch: number;
  units: number;
}) {
  const totalPerUnit = sellableTotal + rawTotal;
  const totalBatch = sellableBatch + rawBatch;

  return (
    <div>
      <TableWrapper>
        <thead>
          <tr>
            <Th>Revenue Source</Th>
            <Th align="right">Value ($ / unit)</Th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50/50 transition-colors">
            <Td bold>Sellable Parts</Td>
            <Td align="right" highlight>${sellableTotal.toFixed(2)}</Td>
          </tr>
          <tr className="hover:bg-gray-50/50 transition-colors">
            <Td bold>Raw Materials</Td>
            <Td align="right" highlight>${rawTotal.toFixed(2)}</Td>
          </tr>
        </tbody>
      </TableWrapper>
      <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[13px] font-semibold" style={{ color: '#1e293b' }}>Total Recoverable Value</span>
          <span className="text-[18px] font-bold font-mono" style={{ color: '#059669' }}>
            ${totalPerUnit.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[11px]" style={{ color: '#64748b' }}>Total Recoverable Value - {units} Units</span>
          <span className="text-[16px] font-bold font-mono" style={{ color: '#059669' }}>
            ${totalBatch.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---- Tab: Cost Breakdown ---- */
function CostBreakdownTab({ data, totalPerUnit, totalBatch }: {
  data: { category: string; assumption: string; totalCost: number; perUnit: number }[];
  totalPerUnit: number;
  totalBatch: number;
}) {
  return (
    <div>
      <div className="mb-3 px-1 py-2 rounded-lg text-[11px]" style={{ backgroundColor: '#f8fafc', color: '#64748b' }}>
        Labor rate: $25/hr | Disassembly rate varies by product complexity
      </div>
      <TableWrapper>
        <thead>
          <tr>
            <Th>Cost Category</Th>
            <Th>Assumption</Th>
            <Th align="right">Total Cost ($)</Th>
            <Th align="right">Per Unit ($)</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
              <Td bold>{row.category}</Td>
              <Td><span style={{ color: '#94a3b8' }}>{row.assumption}</span></Td>
              <Td align="right">${row.totalCost.toLocaleString()}</Td>
              <Td align="right">${row.perUnit.toFixed(2)}</Td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>
      <div className="mt-3 flex items-center justify-end gap-6 px-3 py-3 rounded-lg" style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}>
        <div className="text-[12px] font-semibold" style={{ color: '#475569' }}>Total Service Cost</div>
        <div className="text-[16px] font-bold font-mono" style={{ color: '#dc2626' }}>${totalBatch.toLocaleString()}</div>
        <div className="text-[11px]" style={{ color: '#94a3b8' }}>(${totalPerUnit.toFixed(2)}/unit)</div>
      </div>
    </div>
  );
}

/* ---- Tab: Deal Summary ---- */
function DealSummaryTab({ mode, data }: {
  mode: ModeType;
  data: { item: string; total: number; isNegative?: boolean }[];
}) {
  const accentColor = mode === 'service' ? '#2563eb' : '#059669';
  const lastRow = data[data.length - 1];

  return (
    <div>
      <TableWrapper>
        <thead>
          <tr>
            <Th>Item</Th>
            <Th align="right">Total ($)</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => {
            const isTotal = i === data.length - 1;
            const isSub = row.item.startsWith('Total Revenue') || row.item.startsWith('Total Profit') || row.item.startsWith('Net Position') || row.item.startsWith('Total Cost');
            return (
              <tr key={i} style={isTotal ? { backgroundColor: '#f8fafc' } : isSub ? { backgroundColor: '#fafbfc' } : {}}>
                <Td bold={isTotal || isSub}>{row.item}</Td>
                <Td align="right" bold={isTotal || isSub}>
                  <span style={{ color: row.isNegative ? '#dc2626' : isTotal ? accentColor : '#334155' }}>
                    {row.isNegative ? `(${formatCurrency(Math.abs(row.total))})` : formatCurrency(row.total)}
                  </span>
                </Td>
              </tr>
            );
          })}
        </tbody>
      </TableWrapper>
      <div className="mt-4 p-4 rounded-lg" style={{
        backgroundColor: lastRow.total >= 0 ? '#f0fdf4' : '#fef2f2',
        border: `1px solid ${lastRow.total >= 0 ? '#bbf7d0' : '#fecaca'}`,
      }}>
        <div className="text-center">
          <div className="text-[11px] uppercase tracking-wider mb-1" style={{ color: '#64748b' }}>
            {mode === 'service' ? 'Total Profit' : 'Net Position'}
          </div>
          <div className="text-[24px] font-bold font-mono" style={{
            color: lastRow.total >= 0 ? '#059669' : '#dc2626',
            fontFamily: "'Space Grotesk', system-ui",
          }}>
            {lastRow.total < 0 ? '-' : ''}${Math.abs(lastRow.total).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Main Component ---- */
export default function PartsRevenue({ mode, analysisData }: PartsRevenueProps) {
  // Derive data from analysisData or defaults
  const sellableParts = analysisData?.tradingSellableParts ?? defaultSellableParts;
  const sellableTotal = analysisData?.tradingSellablePartsTotal ?? defaultSellableTotal;
  const sellableBatch = analysisData?.tradingSellablePartsBatch ?? defaultSellableBatch;
  const rawMaterials = analysisData?.rawMaterialRecovery ?? defaultRawMaterials;
  const rawTotal = analysisData?.rawMaterialTotal ?? defaultRawTotal;
  const rawBatch = analysisData?.rawMaterialBatch ?? defaultRawBatch;
  const costs = useMemo(() => {
    if (!analysisData) return defaultCostBreakdown;
    return analysisData.costBreakdown.map(c => ({ ...c, categoryCn: '' }));
  }, [analysisData]);
  const costPerUnit = analysisData?.totalCostPerUnit ?? defaultCostPerUnit;
  const costBatch = analysisData?.totalCostBatch ?? defaultCostBatch;
  const serviceDeal = analysisData?.serviceFeeDealSummary ?? defaultServiceDeal;
  const tradingDeal = analysisData?.tradingDealSummary ?? defaultTradingDeal;
  const units = analysisData?.units ?? 500;

  const serviceTabs = ['Raw Materials', 'Cost Breakdown', 'Deal Summary'];
  const tradingTabs = ['Sellable Parts', 'Raw Materials', 'Total Recovery', 'Cost Breakdown', 'Deal Summary'];
  const tabs = mode === 'service' ? serviceTabs : tradingTabs;
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const currentTabs = mode === 'service' ? serviceTabs : tradingTabs;

  useEffect(() => {
    if (!currentTabs.includes(activeTab)) {
      setActiveTab(currentTabs[0]);
    }
  }, [mode, currentTabs, activeTab]);

  const accentColor = mode === 'service' ? '#2563eb' : '#059669';

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: '#ffffff' }}>
      {/* Tab bar */}
      <div className="flex border-b overflow-x-auto" style={{ borderColor: '#e2e8f0' }}>
        {currentTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-2.5 text-[12px] font-medium whitespace-nowrap transition-all duration-200 relative"
            style={{
              color: activeTab === tab ? accentColor : '#94a3b8',
              borderBottom: activeTab === tab ? `2px solid ${accentColor}` : '2px solid transparent',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-4">
        <motion.div
          key={activeTab + mode}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'Sellable Parts' && (
            <SellablePartsTab data={sellableParts} total={sellableTotal} batch={sellableBatch} />
          )}
          {activeTab === 'Raw Materials' && (
            <RawMaterialsTab data={rawMaterials} total={rawTotal} batch={rawBatch} />
          )}
          {activeTab === 'Total Recovery' && (
            <TotalRecoveryTab
              sellableTotal={sellableTotal}
              rawTotal={rawTotal}
              sellableBatch={sellableBatch}
              rawBatch={rawBatch}
              units={units}
            />
          )}
          {activeTab === 'Cost Breakdown' && (
            <CostBreakdownTab data={costs} totalPerUnit={costPerUnit} totalBatch={costBatch} />
          )}
          {activeTab === 'Deal Summary' && (
            <DealSummaryTab mode={mode} data={mode === 'service' ? serviceDeal : tradingDeal} />
          )}
        </motion.div>
      </div>
    </div>
  );
}

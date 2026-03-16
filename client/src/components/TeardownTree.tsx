/**
 * TeardownTree — Redesigned for new data model
 * 
 * Shows the physical teardown hierarchy with status badges.
 * Status colors differ by mode context but tree structure is shared.
 * Light background, professional styling.
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TeardownNode, ModeType, DisposalStatus } from '@/lib/demoData';
import {
  Cpu, Battery, Cog, Droplets, Box, CircuitBoard,
  Wifi, Radar, Zap, Cable, ChevronDown, ChevronRight,
  Recycle, X as XIcon, ShieldAlert, Package, Truck, AlertTriangle
} from 'lucide-react';

const statusConfig: Record<DisposalStatus, { label: string; bg: string; text: string; icon: React.ReactNode }> = {
  'destroy-brand': { label: 'DESTROY - Brand/IP', bg: '#fef2f2', text: '#991b1b', icon: <ShieldAlert className="w-2.5 h-2.5" /> },
  'raw-material': { label: 'RAW MATERIAL', bg: '#eff6ff', text: '#1e40af', icon: <Recycle className="w-2.5 h-2.5" /> },
  'raw-material-hazmat': { label: 'RAW MATERIAL - Hazmat', bg: '#fef9c3', text: '#854d0e', icon: <AlertTriangle className="w-2.5 h-2.5" /> },
  'third-party': { label: '3RD PARTY / TRADABLE', bg: '#ecfdf5', text: '#065f46', icon: <Package className="w-2.5 h-2.5" /> },
  'non-recyclable': { label: 'NON-RECYCLABLE', bg: '#f1f5f9', text: '#64748b', icon: <XIcon className="w-2.5 h-2.5" /> },
};

function getStatusForMode(node: TeardownNode, mode: ModeType): DisposalStatus {
  // In service fee mode, third-party items become raw-material (no resale)
  if (mode === 'service' && node.status === 'third-party') {
    return 'raw-material';
  }
  return node.status;
}

function StatusBadge({ status }: { status: DisposalStatus }) {
  const config = statusConfig[status];
  return (
    <span
      className="inline-flex items-center gap-1 text-[8px] font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-wide"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      {config.icon}
      {config.label}
    </span>
  );
}

function getNodeIcon(node: TeardownNode): React.ReactNode {
  const id = node.id;
  if (id === 'root') return <Box className="w-4 h-4" />;
  if (id.includes('top-') || id.includes('cover')) return <Box className="w-3.5 h-3.5" />;
  if (id.includes('lidar')) return <Radar className="w-3.5 h-3.5" />;
  if (id.includes('sensor') || id.includes('cliff') || id.includes('bumper')) return <Radar className="w-3.5 h-3.5" />;
  if (id.includes('bottom') || id.includes('chassis') || id.includes('bracket') || id.includes('metal')) return <Box className="w-3.5 h-3.5" />;
  if (id.includes('power') || id.includes('battery') || id.includes('bms')) return <Battery className="w-3.5 h-3.5" />;
  if (id.includes('drive') || id.includes('motor') || id.includes('wheel') || id.includes('gear') || id.includes('shaft') || id.includes('brush-motor') || id.includes('side-brush')) return <Cog className="w-3.5 h-3.5" />;
  if (id.includes('clean') || id.includes('suction') || id.includes('dust') || id.includes('hepa') || id.includes('roller') || id.includes('rubber') || id.includes('brush-frame')) return <Droplets className="w-3.5 h-3.5" />;
  if (id.includes('control') || id.includes('pcb') || id.includes('wiring') || id.includes('harness')) return <CircuitBoard className="w-3.5 h-3.5" />;
  return <Box className="w-3.5 h-3.5" />;
}

interface TreeNodeProps {
  node: TeardownNode;
  depth: number;
  index: number;
  mode: ModeType;
  onHover: (node: TeardownNode | null) => void;
  hoveredNode: TeardownNode | null;
}

function TreeNodeCard({ node, depth, index, mode, onHover, hoveredNode }: TreeNodeProps) {
  const [expanded, setExpanded] = useState(depth === 0);
  const hasChildren = node.children && node.children.length > 0;
  const isHovered = hoveredNode?.id === node.id;
  const isRoot = node.category === 'root';
  const isAssembly = node.category === 'assembly' || node.category === 'subassembly';
  const effectiveStatus = getStatusForMode(node, mode);

  const accentColor = mode === 'service' ? '#2563eb' : '#059669';
  const accentLight = mode === 'service' ? '#dbeafe' : '#d1fae5';
  const accentMid = mode === 'service' ? '#93c5fd' : '#6ee7b7';

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, delay: depth * 0.1 + index * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`relative ${isRoot ? 'min-w-[220px]' : isAssembly ? 'min-w-[160px]' : 'min-w-[140px]'}`}
        onMouseEnter={() => onHover(node)}
        onMouseLeave={() => onHover(null)}
      >
        <div
          className="relative rounded-lg border px-3 py-2 transition-all duration-200"
          style={{
            backgroundColor: isRoot ? accentLight : isHovered ? '#f8fafc' : '#ffffff',
            borderColor: isRoot ? accentMid : isHovered ? accentMid : '#e2e8f0',
            boxShadow: isRoot
              ? `0 0 0 1px ${accentMid}, 0 4px 12px ${accentColor}12`
              : isHovered ? '0 2px 8px rgba(0,0,0,0.06)' : '0 1px 2px rgba(0,0,0,0.03)',
          }}
        >
          {/* Top accent for root */}
          {isRoot && (
            <div
              className="absolute top-0 left-3 right-3 h-[2px] rounded-full"
              style={{ background: `linear-gradient(to right, transparent, ${accentColor}, transparent)` }}
            />
          )}

          <div className="flex items-center gap-2">
            <div
              className="flex items-center justify-center rounded-md flex-shrink-0"
              style={{
                width: isRoot ? 28 : 22,
                height: isRoot ? 28 : 22,
                backgroundColor: isRoot ? `${accentColor}18` : '#f1f5f9',
                color: isRoot ? accentColor : '#64748b',
              }}
            >
              {getNodeIcon(node)}
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="font-medium truncate"
                style={{
                  fontSize: isRoot ? 13 : isAssembly ? 12 : 11,
                  fontFamily: isRoot ? "'Space Grotesk', system-ui" : undefined,
                  color: isRoot ? accentColor : '#1e293b',
                }}
              >
                {node.label}
              </div>
              {node.weight && (
                <div className="text-[9px] font-mono" style={{ color: '#94a3b8' }}>
                  {node.weight}
                  {isRoot && ' x 500 units'}
                </div>
              )}
            </div>
            {hasChildren && (
              <button
                onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
                className="flex items-center justify-center w-5 h-5 rounded hover:bg-gray-100 transition-colors flex-shrink-0"
                style={{ color: '#94a3b8' }}
              >
                {expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
            )}
          </div>

          {/* Status badge + value for leaf nodes */}
          {!isRoot && !isAssembly && (
            <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
              <StatusBadge status={effectiveStatus} />
              {mode === 'trading' && node.sellableValue && node.status === 'third-party' && (
                <span className="text-[9px] font-mono font-semibold" style={{ color: '#059669' }}>
                  ${node.sellableValue.toFixed(2)}
                </span>
              )}
            </div>
          )}

          {/* Material info */}
          {node.material && !isRoot && (
            <div className="mt-1">
              <span className="text-[8px] font-mono px-1 py-0.5 rounded" style={{ backgroundColor: '#f8fafc', color: '#64748b' }}>
                {node.material}
              </span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Children */}
      <AnimatePresence>
        {hasChildren && expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="w-px h-4 origin-top"
              style={{ background: `linear-gradient(to bottom, ${accentMid}, ${accentLight})` }}
            />
            <div className="relative flex items-start gap-2.5">
              {node.children!.length > 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  className="absolute top-0 h-px"
                  style={{
                    left: `calc(100% / ${node.children!.length * 2})`,
                    right: `calc(100% / ${node.children!.length * 2})`,
                    backgroundColor: accentMid,
                  }}
                />
              )}
              {node.children!.map((child, i) => (
                <div key={child.id} className="flex flex-col items-center">
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.15, delay: 0.2 + i * 0.03 }}
                    className="w-px h-3 origin-top"
                    style={{ backgroundColor: accentMid }}
                  />
                  <TreeNodeCard
                    node={child}
                    depth={depth + 1}
                    index={i}
                    mode={mode}
                    onHover={onHover}
                    hoveredNode={hoveredNode}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface TeardownTreeProps {
  data: TeardownNode;
  mode: ModeType;
}

export default function TeardownTree({ data, mode }: TeardownTreeProps) {
  const [hoveredNode, setHoveredNode] = useState<TeardownNode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.78);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    setScale(prev => Math.max(0.25, Math.min(1.5, prev + delta)));
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };
  const handleMouseUp = () => setIsDragging(false);

  const accentColor = mode === 'service' ? '#2563eb' : '#059669';
  const accentLight = mode === 'service' ? '#dbeafe' : '#d1fae5';

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden relative"
      style={{ backgroundColor: '#fafbfc' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="flex justify-center pt-6 pb-20 px-8 w-max min-w-full"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: 'top center',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        <TreeNodeCard
          node={data}
          depth={0}
          index={0}
          mode={mode}
          onHover={setHoveredNode}
          hoveredNode={hoveredNode}
        />
      </div>

      {/* Zoom controls */}
      <div
        className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg p-1"
        style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
      >
        <button
          onClick={() => setScale(prev => Math.max(0.25, prev - 0.1))}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-50 text-sm"
          style={{ color: '#64748b' }}
        >
          -
        </button>
        <span className="text-[9px] font-mono w-9 text-center" style={{ color: '#94a3b8' }}>
          {Math.round(scale * 100)}%
        </span>
        <button
          onClick={() => setScale(prev => Math.min(1.5, prev + 0.1))}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-50 text-sm"
          style={{ color: '#64748b' }}
        >
          +
        </button>
      </div>

      {/* Hovered node detail */}
      <AnimatePresence>
        {hoveredNode && hoveredNode.category !== 'root' && hoveredNode.category !== 'assembly' && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute bottom-3 left-3 max-w-[260px] rounded-lg p-3"
            style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-5 h-5 rounded flex items-center justify-center"
                style={{ backgroundColor: accentLight, color: accentColor }}
              >
                {getNodeIcon(hoveredNode)}
              </div>
              <span className="text-[12px] font-medium" style={{ color: '#1e293b' }}>{hoveredNode.label}</span>
            </div>
            <div className="space-y-1 text-[10px]">
              {hoveredNode.weight && (
                <div className="flex justify-between">
                  <span style={{ color: '#94a3b8' }}>Weight</span>
                  <span className="font-mono" style={{ color: '#475569' }}>{hoveredNode.weight}</span>
                </div>
              )}
              {hoveredNode.material && (
                <div className="flex justify-between">
                  <span style={{ color: '#94a3b8' }}>Material</span>
                  <span className="font-mono" style={{ color: '#475569' }}>{hoveredNode.material}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span style={{ color: '#94a3b8' }}>Status</span>
                <StatusBadge status={getStatusForMode(hoveredNode, mode)} />
              </div>
              {mode === 'trading' && hoveredNode.sellableValue && hoveredNode.status === 'third-party' && (
                <div className="flex justify-between">
                  <span style={{ color: '#94a3b8' }}>Sellable Value</span>
                  <span className="font-mono font-semibold" style={{ color: '#059669' }}>${hoveredNode.sellableValue.toFixed(2)}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

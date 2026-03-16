/**
 * TeardownTree — Horizontal Left-to-Right Layout (Option B)
 *
 * Root on the left, assemblies stack vertically, children flow rightward.
 * Collapsed branches show child count badges (+N).
 * Status badges (TRADABLE / RAW MAT / HAZMAT / DESTROY) on the right edge.
 * Pan & zoom support.
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TeardownNode, ModeType, DisposalStatus } from '@/lib/demoData';
import {
  Cpu, Battery, Cog, Droplets, Box, CircuitBoard,
  Wifi, Radar, Zap, Cable, ChevronDown, ChevronRight,
  Recycle, X as XIcon, ShieldAlert, Package, AlertTriangle
} from 'lucide-react';

// ── Status configuration ──

const statusConfig: Record<DisposalStatus, { label: string; shortLabel: string; bg: string; text: string; border: string; icon: React.ReactNode }> = {
  'destroy-brand': {
    label: 'DESTROY - Brand/IP', shortLabel: 'DESTROY',
    bg: '#fef2f2', text: '#991b1b', border: '#fecaca',
    icon: <ShieldAlert className="w-2.5 h-2.5" />,
  },
  'raw-material': {
    label: 'RAW MATERIAL', shortLabel: 'RAW MAT',
    bg: '#eff6ff', text: '#1e40af', border: '#bfdbfe',
    icon: <Recycle className="w-2.5 h-2.5" />,
  },
  'raw-material-hazmat': {
    label: 'HAZMAT', shortLabel: 'HAZMAT',
    bg: '#fef9c3', text: '#854d0e', border: '#fde68a',
    icon: <AlertTriangle className="w-2.5 h-2.5" />,
  },
  'third-party': {
    label: 'TRADABLE', shortLabel: 'TRADABLE',
    bg: '#ecfdf5', text: '#065f46', border: '#a7f3d0',
    icon: <Package className="w-2.5 h-2.5" />,
  },
  'non-recyclable': {
    label: 'NON-RECYCLABLE', shortLabel: 'N/R',
    bg: '#f1f5f9', text: '#64748b', border: '#e2e8f0',
    icon: <XIcon className="w-2.5 h-2.5" />,
  },
};

function getStatusForMode(node: TeardownNode, mode: ModeType): DisposalStatus {
  if (mode === 'service' && node.status === 'third-party') return 'raw-material';
  return node.status;
}

function StatusBadge({ status, compact }: { status: DisposalStatus; compact?: boolean }) {
  const config = statusConfig[status];
  return (
    <span
      className="inline-flex items-center gap-0.5 font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-wide whitespace-nowrap"
      style={{
        fontSize: compact ? 7 : 8,
        backgroundColor: config.bg,
        color: config.text,
        border: `1px solid ${config.border}`,
      }}
    >
      {config.icon}
      {compact ? config.shortLabel : config.label}
    </span>
  );
}

// ── Node icon helper ──

function getNodeIcon(node: TeardownNode): React.ReactNode {
  const id = node.id;
  const cls = 'w-3 h-3';
  if (id === 'root') return <Box className="w-3.5 h-3.5" />;
  if (id.includes('lidar') || id.includes('sensor') || id.includes('cliff') || id.includes('bumper') || id.includes('carpet') || id.includes('wall')) return <Radar className={cls} />;
  if (id.includes('power') || id.includes('battery') || id.includes('bms') || id.includes('cell') || id.includes('charging')) return <Battery className={cls} />;
  if (id.includes('drive') || id.includes('motor') || id.includes('wheel') || id.includes('gear') || id.includes('shaft') || id.includes('brush-motor') || id.includes('side-brush') || id.includes('caster') || id.includes('impeller') || id.includes('bldc') || id.includes('lra')) return <Cog className={cls} />;
  if (id.includes('clean') || id.includes('suction') || id.includes('dust') || id.includes('hepa') || id.includes('roller') || id.includes('rubber') || id.includes('brush') || id.includes('mop')) return <Droplets className={cls} />;
  if (id.includes('control') || id.includes('pcb') || id.includes('wiring') || id.includes('harness') || id.includes('wifi') || id.includes('led') || id.includes('button') || id.includes('speaker') || id.includes('soc') || id.includes('ram') || id.includes('flash')) return <CircuitBoard className={cls} />;
  if (id.includes('top') || id.includes('cover') || id.includes('chassis') || id.includes('bottom') || id.includes('metal') || id.includes('screw') || id.includes('aluminum')) return <Box className={cls} />;
  return <Box className={cls} />;
}

// ── Count descendants ──

function countDescendants(node: TeardownNode): number {
  if (!node.children) return 0;
  let count = node.children.length;
  for (const child of node.children) {
    count += countDescendants(child);
  }
  return count;
}

// ── Horizontal tree node ──

interface HNodeProps {
  node: TeardownNode;
  mode: ModeType;
  depth: number;
  index: number;
  onSelect: (node: TeardownNode | null) => void;
  selectedNode: TeardownNode | null;
  defaultExpanded?: boolean;
}

function HorizontalNode({ node, mode, depth, index, onSelect, selectedNode, defaultExpanded }: HNodeProps) {
  const [expanded, setExpanded] = useState(defaultExpanded ?? depth < 1);
  const hasChildren = node.children && node.children.length > 0;
  const isRoot = node.category === 'root';
  const isAssembly = node.category === 'assembly';
  const isSubassembly = node.category === 'subassembly';
  const isSelected = selectedNode?.id === node.id;
  const effectiveStatus = getStatusForMode(node, mode);
  const descendantCount = hasChildren ? countDescendants(node) : 0;

  const accentColor = mode === 'service' ? '#2563eb' : '#059669';

  // Determine node styling based on depth/category
  let bgColor = '#ffffff';
  let borderColor = '#e2e8f0';
  let labelSize = 11;
  let paddingY = 'py-1.5';
  let paddingX = 'px-2.5';

  if (isRoot) {
    bgColor = mode === 'service' ? '#eff6ff' : '#ecfdf5';
    borderColor = accentColor;
    labelSize = 13;
    paddingY = 'py-2';
    paddingX = 'px-3';
  } else if (isAssembly) {
    bgColor = '#f8fafc';
    borderColor = '#cbd5e1';
    labelSize = 11;
    paddingY = 'py-1.5';
    paddingX = 'px-2.5';
  } else if (isSubassembly) {
    bgColor = '#fafbfc';
    borderColor = '#e2e8f0';
    labelSize = 10;
  }

  if (isSelected) {
    borderColor = accentColor;
    bgColor = mode === 'service' ? '#eff6ff' : '#ecfdf5';
  }

  return (
    <div className="flex items-start">
      {/* This node */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25, delay: depth * 0.05 + index * 0.02 }}
        className={`flex flex-col ${paddingY} ${paddingX} rounded-lg border transition-all duration-150 flex-shrink-0`}
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
          boxShadow: isSelected ? `0 0 0 1px ${accentColor}40, 0 2px 8px ${accentColor}10` : '0 1px 2px rgba(0,0,0,0.03)',
          minWidth: isRoot ? 180 : isAssembly ? 155 : 130,
          maxWidth: isRoot ? 200 : isAssembly ? 180 : 165,
          cursor: 'pointer',
        }}
        onClick={() => onSelect(isSelected ? null : node)}
        onMouseEnter={() => onSelect(node)}
      >
        <div className="flex items-center gap-1.5">
          {/* Expand toggle */}
          {hasChildren && (
            <button
              onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
              className="flex items-center justify-center w-4 h-4 rounded hover:bg-black/5 transition-colors flex-shrink-0"
              style={{ color: '#94a3b8' }}
            >
              {expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </button>
          )}
          {!hasChildren && <div className="w-4" />}

          {/* Icon */}
          <div
            className="flex items-center justify-center w-5 h-5 rounded flex-shrink-0"
            style={{
              backgroundColor: isRoot ? `${accentColor}15` : '#f1f5f9',
              color: isRoot ? accentColor : '#64748b',
            }}
          >
            {getNodeIcon(node)}
          </div>

          {/* Label */}
          <div className="flex-1 min-w-0">
            <div
              className="font-medium truncate leading-tight"
              style={{
                fontSize: labelSize,
                color: isRoot ? accentColor : '#1e293b',
                fontFamily: isRoot ? "'Space Grotesk', system-ui" : undefined,
              }}
            >
              {node.label}
            </div>
          </div>

          {/* Collapsed child count badge */}
          {hasChildren && !expanded && (
            <span
              className="text-[8px] font-bold px-1 py-0.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0' }}
            >
              +{descendantCount}
            </span>
          )}
        </div>

        {/* Weight + material line */}
        {(node.weight || node.material) && (
          <div className="mt-0.5 flex items-center gap-1.5 flex-wrap">
            {node.weight && (
              <span className="text-[8px] font-mono" style={{ color: '#94a3b8' }}>
                {node.weight}{isRoot ? ' × 500' : ''}
              </span>
            )}
            {node.material && !isRoot && !isAssembly && (
              <span className="text-[8px] font-mono truncate" style={{ color: '#94a3b8' }}>
                {node.material}
              </span>
            )}
          </div>
        )}

        {/* Status badge for non-root, non-assembly nodes */}
        {!isRoot && (
          <div className="mt-1 flex items-center gap-1 flex-wrap">
            <StatusBadge status={effectiveStatus} compact={depth > 2} />
            {mode === 'trading' && node.sellableValue && node.status === 'third-party' && (
              <span className="text-[9px] font-mono font-semibold" style={{ color: '#059669' }}>
                ${node.sellableValue.toFixed(2)}
              </span>
            )}
          </div>
        )}
      </motion.div>

      {/* Horizontal connector + children */}
      <AnimatePresence>
        {hasChildren && expanded && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center"
          >
            {/* Horizontal line from parent to children */}
            <div className="flex items-center flex-shrink-0">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.15 }}
                className="h-px origin-left"
                style={{
                  width: 20,
                  backgroundColor: depth === 0 ? accentColor : '#cbd5e1',
                }}
              />
            </div>

            {/* Vertical rail + children */}
            <div className="relative flex flex-col">
              {/* Vertical connector line */}
              {node.children!.length > 1 && (
                <div
                  className="absolute left-0 w-px"
                  style={{
                    top: node.children!.length > 0 ? 16 : 0,
                    bottom: node.children!.length > 0 ? 16 : 0,
                    backgroundColor: depth === 0 ? `${accentColor}50` : '#e2e8f0',
                  }}
                />
              )}

              {node.children!.map((child, i) => (
                <div key={child.id} className="flex items-start" style={{ marginTop: i === 0 ? 0 : 4 }}>
                  {/* Horizontal branch line to child */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.1, delay: i * 0.02 }}
                    className="flex-shrink-0 origin-left"
                    style={{
                      width: 16,
                      height: 1,
                      backgroundColor: depth === 0 ? `${accentColor}50` : '#e2e8f0',
                      marginTop: 16,
                    }}
                  />
                  <HorizontalNode
                    node={child}
                    mode={mode}
                    depth={depth + 1}
                    index={i}
                    onSelect={onSelect}
                    selectedNode={selectedNode}
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

// ── Main component ──

interface TeardownTreeProps {
  data: TeardownNode;
  mode: ModeType;
}

export default function TeardownTree({ data, mode }: TeardownTreeProps) {
  const [selectedNode, setSelectedNode] = useState<TeardownNode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.82);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    setScale(prev => Math.max(0.2, Math.min(2.0, prev + delta)));
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
        className="p-6 w-max"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: 'center left',
          cursor: isDragging ? 'grabbing' : 'grab',
          minHeight: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <HorizontalNode
          node={data}
          mode={mode}
          depth={0}
          index={0}
          onSelect={setSelectedNode}
          selectedNode={selectedNode}
          defaultExpanded
        />
      </div>

      {/* Zoom controls */}
      <div
        className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg p-1"
        style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
      >
        <button
          onClick={() => setScale(prev => Math.max(0.2, prev - 0.1))}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-50 text-sm"
          style={{ color: '#64748b' }}
        >
          −
        </button>
        <span className="text-[9px] font-mono w-9 text-center" style={{ color: '#94a3b8' }}>
          {Math.round(scale * 100)}%
        </span>
        <button
          onClick={() => setScale(prev => Math.min(2.0, prev + 0.1))}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-50 text-sm"
          style={{ color: '#64748b' }}
        >
          +
        </button>
      </div>

      {/* Selected node detail panel */}
      <AnimatePresence>
        {selectedNode && selectedNode.category !== 'root' && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute bottom-3 left-3 max-w-[280px] rounded-lg p-3"
            style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-5 h-5 rounded flex items-center justify-center"
                style={{ backgroundColor: accentLight, color: accentColor }}
              >
                {getNodeIcon(selectedNode)}
              </div>
              <span className="text-[12px] font-medium" style={{ color: '#1e293b' }}>{selectedNode.label}</span>
            </div>
            <div className="space-y-1 text-[10px]">
              {selectedNode.weight && (
                <div className="flex justify-between">
                  <span style={{ color: '#94a3b8' }}>Weight</span>
                  <span className="font-mono" style={{ color: '#475569' }}>{selectedNode.weight}</span>
                </div>
              )}
              {selectedNode.material && (
                <div className="flex justify-between">
                  <span style={{ color: '#94a3b8' }}>Material</span>
                  <span className="font-mono text-right max-w-[160px]" style={{ color: '#475569' }}>{selectedNode.material}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span style={{ color: '#94a3b8' }}>Status</span>
                <StatusBadge status={getStatusForMode(selectedNode, mode)} />
              </div>
              {selectedNode.children && selectedNode.children.length > 0 && (
                <div className="flex justify-between">
                  <span style={{ color: '#94a3b8' }}>Sub-components</span>
                  <span className="font-mono" style={{ color: '#475569' }}>{countDescendants(selectedNode)}</span>
                </div>
              )}
              {mode === 'trading' && selectedNode.sellableValue && selectedNode.status === 'third-party' && (
                <div className="flex justify-between">
                  <span style={{ color: '#94a3b8' }}>Sellable Value</span>
                  <span className="font-mono font-semibold" style={{ color: '#059669' }}>${selectedNode.sellableValue.toFixed(2)}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

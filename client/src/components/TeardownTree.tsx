/**
 * TeardownTree Component — Light Theme, Mode-Aware
 * 
 * Service Fee mode: Blue accent, shows labor cost + raw material recovery
 * Trading mode: Emerald accent, shows disposal path (3rd-party resale vs material recovery)
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TeardownNode } from '@/lib/demoData';
import {
  Cpu, Battery, Cog, Droplets, Box, CircuitBoard,
  Wifi, Radar, Zap, Cable, Wrench, ChevronDown, ChevronRight,
  Recycle, X as XIcon, ArrowRightLeft, Factory, Package
} from 'lucide-react';

type ModeType = 'service' | 'trading';

const modeAccent = {
  service: {
    primary: '#2563eb',      // blue-600
    primaryLight: '#dbeafe', // blue-100
    primaryMid: '#93c5fd',   // blue-300
    primaryDark: '#1e40af',  // blue-800
    rootBg: '#eff6ff',       // blue-50
    rootBorder: '#93c5fd',   // blue-300
  },
  trading: {
    primary: '#059669',      // emerald-600
    primaryLight: '#d1fae5', // emerald-100
    primaryMid: '#6ee7b7',   // emerald-300
    primaryDark: '#065f46',  // emerald-800
    rootBg: '#ecfdf5',       // emerald-50
    rootBorder: '#6ee7b7',   // emerald-300
  },
};

const iconMap: Record<string, React.ReactNode> = {
  'root': <Box className="w-4 h-4" />,
  'electronics': <CircuitBoard className="w-4 h-4" />,
  'power': <Battery className="w-4 h-4" />,
  'motors': <Cog className="w-4 h-4" />,
  'cleaning': <Droplets className="w-4 h-4" />,
  'structural': <Box className="w-4 h-4" />,
};

function getNodeIcon(node: TeardownNode): React.ReactNode {
  if (iconMap[node.id]) return iconMap[node.id];
  if (node.category === 'material') return <Recycle className="w-3.5 h-3.5" />;
  if (node.disposalPath === '3rd-party-resale') return <Package className="w-3.5 h-3.5" />;
  if (node.id.includes('pcb') || node.id.includes('bms') || node.id.includes('circuit')) return <CircuitBoard className="w-3.5 h-3.5" />;
  if (node.id.includes('motor') || node.id.includes('bldc')) return <Cog className="w-3.5 h-3.5" />;
  if (node.id.includes('battery') || node.id.includes('lithium') || node.id.includes('cell')) return <Battery className="w-3.5 h-3.5" />;
  if (node.id.includes('copper') || node.id.includes('wir')) return <Cable className="w-3.5 h-3.5" />;
  if (node.id.includes('wifi') || node.id.includes('bt')) return <Wifi className="w-3.5 h-3.5" />;
  if (node.id.includes('lidar') || node.id.includes('sensor')) return <Radar className="w-3.5 h-3.5" />;
  if (node.id.includes('sonic') || node.id.includes('mop') || node.id.includes('water')) return <Droplets className="w-3.5 h-3.5" />;
  if (node.id.includes('steel') || node.id.includes('metal') || node.id.includes('aluminum')) return <Factory className="w-3.5 h-3.5" />;
  return <Box className="w-3.5 h-3.5" />;
}

interface TreeNodeProps {
  node: TeardownNode;
  depth: number;
  index: number;
  isVisible: boolean;
  onHover: (node: TeardownNode | null) => void;
  hoveredNode: TeardownNode | null;
  mode: ModeType;
}

function DisposalBadge({ path }: { path?: string }) {
  if (!path) return null;
  const config = {
    '3rd-party-resale': { label: '3rd Party Resale', bg: '#fef3c7', text: '#92400e', icon: <ArrowRightLeft className="w-2.5 h-2.5" /> },
    'material-recovery': { label: 'Material Recovery', bg: '#dbeafe', text: '#1e40af', icon: <Recycle className="w-2.5 h-2.5" /> },
    'waste': { label: 'Waste Disposal', bg: '#fee2e2', text: '#991b1b', icon: <XIcon className="w-2.5 h-2.5" /> },
  }[path];
  if (!config) return null;
  return (
    <span
      className="inline-flex items-center gap-1 text-[9px] font-medium px-1.5 py-0.5 rounded-full"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      {config.icon}
      {config.label}
    </span>
  );
}

function TreeNodeCard({ node, depth, index, isVisible, onHover, hoveredNode, mode }: TreeNodeProps) {
  const [expanded, setExpanded] = useState(depth === 0);
  const hasChildren = node.children && node.children.length > 0;
  const isHovered = hoveredNode?.id === node.id;
  const isRoot = node.category === 'root';
  const accent = modeAccent[mode];

  const getBgColor = () => {
    if (isRoot) return accent.rootBg;
    if (isHovered) return '#f8fafc';
    return '#ffffff';
  };

  const getBorderColor = () => {
    if (isRoot) return accent.rootBorder;
    if (isHovered) return accent.primaryMid;
    return '#e2e8f0';
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.95 }}
        animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{
          duration: 0.4,
          delay: depth * 0.15 + index * 0.05,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className={`relative group ${isRoot ? 'min-w-[240px]' : depth === 1 ? 'min-w-[180px]' : 'min-w-[155px]'}`}
        onMouseEnter={() => onHover(node)}
        onMouseLeave={() => onHover(null)}
      >
        <div
          className="relative rounded-lg border px-3 py-2.5 transition-all duration-200"
          style={{
            backgroundColor: getBgColor(),
            borderColor: getBorderColor(),
            boxShadow: isRoot
              ? `0 0 0 1px ${accent.rootBorder}, 0 4px 16px ${accent.primary}15`
              : isHovered
              ? `0 2px 12px rgba(0,0,0,0.08)`
              : '0 1px 3px rgba(0,0,0,0.04)',
          }}
        >
          {/* Top accent line for root */}
          {isRoot && (
            <div
              className="absolute top-0 left-3 right-3 h-[2px] rounded-full"
              style={{ background: `linear-gradient(to right, transparent, ${accent.primary}, transparent)` }}
            />
          )}

          <div className="flex items-center gap-2">
            {/* Icon */}
            <div
              className="flex items-center justify-center rounded-md"
              style={{
                width: isRoot ? 32 : 24,
                height: isRoot ? 32 : 24,
                backgroundColor: isRoot ? accent.primaryLight : '#f1f5f9',
                color: isRoot ? accent.primary : '#64748b',
              }}
            >
              {getNodeIcon(node)}
            </div>

            {/* Label */}
            <div className="flex-1 min-w-0">
              <div
                className="font-medium truncate"
                style={{
                  fontSize: isRoot ? 14 : depth === 1 ? 13 : 12,
                  fontFamily: isRoot ? "'Space Grotesk', system-ui" : undefined,
                  color: isRoot ? accent.primaryDark : '#1e293b',
                }}
              >
                {node.label}
              </div>
              {node.weight && (
                <div className="text-[10px] font-mono mt-0.5" style={{ color: '#94a3b8' }}>
                  {node.weight}
                  {node.quantity && ` \u00d7 ${node.quantity}`}
                </div>
              )}
            </div>

            {/* Expand/collapse toggle */}
            {hasChildren && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(!expanded);
                }}
                className="flex items-center justify-center w-5 h-5 rounded hover:bg-gray-100 transition-colors"
                style={{ color: '#94a3b8' }}
              >
                {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>

          {/* Value / Labor Cost / Disposal Path */}
          {(node.value || node.laborCost || node.disposalPath) && (
            <div className="flex items-center gap-1.5 mt-1.5 pt-1.5 flex-wrap" style={{ borderTop: '1px solid #f1f5f9' }}>
              {/* Service Fee: show labor cost */}
              {mode === 'service' && node.laborCost && (
                <span className="text-[10px] font-mono font-medium" style={{ color: accent.primary }}>
                  Labor: {node.laborCost}
                </span>
              )}
              {/* Value */}
              {node.value && (
                <>
                  <span className="text-[10px]" style={{ color: '#94a3b8' }}>
                    {mode === 'service' ? 'Recovery:' : 'Value:'}
                  </span>
                  <span className="text-[10px] font-mono font-medium" style={{ color: accent.primary }}>
                    {node.value}
                  </span>
                </>
              )}
              {/* Trading: show disposal path */}
              {mode === 'trading' && node.disposalPath && (
                <span className="ml-auto">
                  <DisposalBadge path={node.disposalPath} />
                </span>
              )}
              {/* Service Fee: show recyclable badge */}
              {mode === 'service' && node.recyclable !== undefined && (
                <span
                  className="ml-auto inline-flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded-full font-medium"
                  style={{
                    backgroundColor: node.recyclable ? '#dcfce7' : '#fee2e2',
                    color: node.recyclable ? '#166534' : '#991b1b',
                  }}
                >
                  {node.recyclable ? <Recycle className="w-2.5 h-2.5" /> : <XIcon className="w-2.5 h-2.5" />}
                  {node.recyclable ? 'Recyclable' : 'Non-recyclable'}
                </span>
              )}
            </div>
          )}

          {/* Material type */}
          {node.materialType && (
            <div className="mt-1">
              <span
                className="text-[9px] px-1.5 py-0.5 rounded font-mono"
                style={{ backgroundColor: '#f8fafc', color: '#64748b' }}
              >
                {node.materialType}
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
            {/* Vertical connector line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="w-px h-5 origin-top"
              style={{ background: `linear-gradient(to bottom, ${accent.primaryMid}, ${accent.primaryLight})` }}
            />

            {/* Horizontal connector + children */}
            <div className="relative flex items-start gap-3">
              {node.children!.length > 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="absolute top-0 h-px"
                  style={{
                    left: `calc(100% / ${node.children!.length * 2})`,
                    right: `calc(100% / ${node.children!.length * 2})`,
                    backgroundColor: accent.primaryMid,
                  }}
                />
              )}

              {node.children!.map((child, i) => (
                <div key={child.id} className="flex flex-col items-center">
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.2, delay: 0.3 + i * 0.05 }}
                    className="w-px h-4 origin-top"
                    style={{ backgroundColor: accent.primaryMid }}
                  />
                  <TreeNodeCard
                    node={child}
                    depth={depth + 1}
                    index={i}
                    isVisible={isVisible}
                    onHover={onHover}
                    hoveredNode={hoveredNode}
                    mode={mode}
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
  data: TeardownNode | null;
  isVisible: boolean;
  mode: ModeType;
}

export default function TeardownTree({ data, isVisible, mode }: TeardownTreeProps) {
  const [hoveredNode, setHoveredNode] = useState<TeardownNode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.82);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const accent = modeAccent[mode];

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    setScale(prev => Math.max(0.3, Math.min(1.5, prev + delta)));
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
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!data) return null;

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden relative"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <div
        className="flex justify-center pt-8 pb-20 px-8 w-max min-w-full"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: 'top center',
        }}
      >
        <TreeNodeCard
          node={data}
          depth={0}
          index={0}
          isVisible={isVisible}
          onHover={setHoveredNode}
          hoveredNode={hoveredNode}
          mode={mode}
        />
      </div>

      {/* Zoom controls */}
      <div
        className="absolute bottom-4 right-4 flex items-center gap-1 rounded-lg p-1"
        style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}
      >
        <button
          onClick={() => setScale(prev => Math.max(0.3, prev - 0.1))}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 text-sm transition-colors"
          style={{ color: '#64748b' }}
        >
          −
        </button>
        <span className="text-[10px] font-mono w-10 text-center" style={{ color: '#94a3b8' }}>
          {Math.round(scale * 100)}%
        </span>
        <button
          onClick={() => setScale(prev => Math.min(1.5, prev + 0.1))}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 text-sm transition-colors"
          style={{ color: '#64748b' }}
        >
          +
        </button>
      </div>

      {/* Hovered node detail panel */}
      <AnimatePresence>
        {hoveredNode && hoveredNode.category !== 'root' && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute bottom-4 left-4 max-w-[280px] rounded-lg p-3 shadow-lg"
            style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-6 h-6 rounded flex items-center justify-center"
                style={{ backgroundColor: accent.primaryLight, color: accent.primary }}
              >
                {getNodeIcon(hoveredNode)}
              </div>
              <span className="text-sm font-medium" style={{ color: '#1e293b' }}>
                {hoveredNode.label}
              </span>
            </div>
            <div className="space-y-1 text-[11px]">
              {hoveredNode.weight && (
                <div className="flex justify-between">
                  <span style={{ color: '#94a3b8' }}>Weight</span>
                  <span className="font-mono" style={{ color: '#475569' }}>{hoveredNode.weight}</span>
                </div>
              )}
              {hoveredNode.materialType && (
                <div className="flex justify-between">
                  <span style={{ color: '#94a3b8' }}>Material</span>
                  <span className="font-mono" style={{ color: '#475569' }}>{hoveredNode.materialType}</span>
                </div>
              )}
              {hoveredNode.value && (
                <div className="flex justify-between">
                  <span style={{ color: '#94a3b8' }}>Est. Value</span>
                  <span className="font-mono" style={{ color: accent.primary }}>{hoveredNode.value}</span>
                </div>
              )}
              {hoveredNode.laborCost && (
                <div className="flex justify-between">
                  <span style={{ color: '#94a3b8' }}>Labor Cost</span>
                  <span className="font-mono" style={{ color: accent.primary }}>{hoveredNode.laborCost}</span>
                </div>
              )}
              {hoveredNode.disposalPath && (
                <div className="flex justify-between items-center">
                  <span style={{ color: '#94a3b8' }}>Disposal</span>
                  <DisposalBadge path={hoveredNode.disposalPath} />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * TeardownTree Component
 * 
 * Design: "Precision Dark" — Enterprise SaaS
 * Renders an interactive top-down tree/flow diagram showing the component
 * breakdown of a product for recycling. Uses SVG for connection lines
 * and animated nodes that cascade in with staggered timing.
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TeardownNode } from '@/lib/demoData';
import {
  Cpu, Battery, Cog, Droplets, Box, CircuitBoard,
  Wifi, Radar, Zap, Cable, Wrench, ChevronDown, ChevronRight,
  Recycle, X as XIcon
} from 'lucide-react';

const categoryColors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  root: {
    bg: 'bg-[oklch(0.72_0.15_195/0.12)]',
    border: 'border-[oklch(0.72_0.15_195/0.5)]',
    text: 'text-[oklch(0.85_0.1_195)]',
    glow: '0 0 20px oklch(0.72 0.15 195 / 0.2)',
  },
  assembly: {
    bg: 'bg-[oklch(0.20_0.015_260)]',
    border: 'border-[oklch(1_0_0/0.12)]',
    text: 'text-[oklch(0.93_0.005_260)]',
    glow: 'none',
  },
  component: {
    bg: 'bg-[oklch(0.17_0.015_260)]',
    border: 'border-[oklch(1_0_0/0.08)]',
    text: 'text-[oklch(0.80_0.01_260)]',
    glow: 'none',
  },
  material: {
    bg: 'bg-[oklch(0.15_0.015_260)]',
    border: 'border-[oklch(1_0_0/0.06)]',
    text: 'text-[oklch(0.70_0.01_260)]',
    glow: 'none',
  },
};

const iconMap: Record<string, React.ReactNode> = {
  'root': <Box className="w-4 h-4" />,
  'electronics': <CircuitBoard className="w-4 h-4" />,
  'main-pcb': <Cpu className="w-3.5 h-3.5" />,
  'wifi-module': <Wifi className="w-3.5 h-3.5" />,
  'sensors': <Radar className="w-3.5 h-3.5" />,
  'lidar': <Radar className="w-3 h-3" />,
  'cliff-sensors': <Radar className="w-3 h-3" />,
  'mcu': <Cpu className="w-3.5 h-3.5" />,
  'power': <Battery className="w-4 h-4" />,
  'battery': <Battery className="w-3.5 h-3.5" />,
  'cells': <Zap className="w-3 h-3" />,
  'bms': <CircuitBoard className="w-3 h-3" />,
  'charging': <Zap className="w-3.5 h-3.5" />,
  'wiring': <Cable className="w-3.5 h-3.5" />,
  'motors': <Cog className="w-4 h-4" />,
  'main-motor': <Cog className="w-3.5 h-3.5" />,
  'brush-motors': <Cog className="w-3.5 h-3.5" />,
  'wheel-motors': <Cog className="w-3.5 h-3.5" />,
  'cleaning': <Droplets className="w-4 h-4" />,
  'brush-system': <Wrench className="w-3.5 h-3.5" />,
  'water-tank': <Droplets className="w-3.5 h-3.5" />,
  'mop-module': <Droplets className="w-3.5 h-3.5" />,
  'structural': <Box className="w-4 h-4" />,
  'housing-top': <Box className="w-3.5 h-3.5" />,
  'housing-bottom': <Box className="w-3.5 h-3.5" />,
  'metal-frame': <Box className="w-3.5 h-3.5" />,
  'rubber-parts': <Box className="w-3.5 h-3.5" />,
};

interface TreeNodeProps {
  node: TeardownNode;
  depth: number;
  index: number;
  isVisible: boolean;
  onHover: (node: TeardownNode | null) => void;
  hoveredNode: TeardownNode | null;
}

function TreeNodeCard({ node, depth, index, isVisible, onHover, hoveredNode }: TreeNodeProps) {
  const [expanded, setExpanded] = useState(depth === 0);
  const hasChildren = node.children && node.children.length > 0;
  const colors = categoryColors[node.category] || categoryColors.component;
  const isHovered = hoveredNode?.id === node.id;
  const isRoot = node.category === 'root';

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
        className={`
          relative group
          ${isRoot ? 'min-w-[220px]' : depth === 1 ? 'min-w-[180px]' : 'min-w-[150px]'}
        `}
        onMouseEnter={() => onHover(node)}
        onMouseLeave={() => onHover(null)}
      >
        <div
          className={`
            relative rounded-lg border px-3 py-2.5 transition-all duration-200
            ${colors.bg} ${colors.border}
            ${isHovered ? 'border-[oklch(0.72_0.15_195/0.5)]' : ''}
            ${isRoot ? 'px-4 py-3' : ''}
          `}
          style={{
            boxShadow: isHovered ? '0 0 20px oklch(0.72 0.15 195 / 0.15), 0 4px 12px oklch(0 0 0 / 0.3)' : '0 2px 8px oklch(0 0 0 / 0.2)',
          }}
        >
          {/* Top accent line for root */}
          {isRoot && (
            <div className="absolute top-0 left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-[oklch(0.72_0.15_195)] to-transparent rounded-full" />
          )}

          <div className="flex items-center gap-2">
            {/* Icon */}
            <div className={`
              flex items-center justify-center rounded-md
              ${isRoot ? 'w-8 h-8 bg-[oklch(0.72_0.15_195/0.15)]' : 'w-6 h-6 bg-[oklch(1_0_0/0.05)]'}
              ${colors.text}
            `}>
              {iconMap[node.id] || <Box className="w-3.5 h-3.5" />}
            </div>

            {/* Label */}
            <div className="flex-1 min-w-0">
              <div className={`
                font-medium truncate
                ${isRoot ? 'text-sm font-display' : depth === 1 ? 'text-[13px]' : 'text-xs'}
                ${colors.text}
              `}>
                {node.label}
              </div>
              {node.weight && (
                <div className="text-[10px] text-[oklch(0.55_0.01_260)] font-mono mt-0.5">
                  {node.weight}
                  {node.quantity && ` × ${node.quantity}`}
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
                className="flex items-center justify-center w-5 h-5 rounded hover:bg-[oklch(1_0_0/0.08)] text-[oklch(0.55_0.01_260)] transition-colors"
              >
                {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>

          {/* Value badge */}
          {node.value && (
            <div className="flex items-center gap-1.5 mt-1.5 pt-1.5 border-t border-[oklch(1_0_0/0.06)]">
              <span className="text-[10px] text-[oklch(0.55_0.01_260)]">Value:</span>
              <span className="text-[10px] font-mono font-medium text-[oklch(0.72_0.15_195)]">
                {node.value}
              </span>
              {node.recyclable !== undefined && (
                <span className={`ml-auto flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded-full ${
                  node.recyclable
                    ? 'bg-[oklch(0.65_0.18_160/0.12)] text-[oklch(0.70_0.18_160)]'
                    : 'bg-[oklch(0.60_0.22_25/0.12)] text-[oklch(0.70_0.18_25)]'
                }`}>
                  {node.recyclable ? <Recycle className="w-2.5 h-2.5" /> : <XIcon className="w-2.5 h-2.5" />}
                  {node.recyclable ? 'Recyclable' : 'Non-recyclable'}
                </span>
              )}
            </div>
          )}

          {/* Material type */}
          {node.materialType && (
            <div className="mt-1">
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[oklch(1_0_0/0.04)] text-[oklch(0.50_0.01_260)] font-mono">
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
              className="w-px h-5 bg-gradient-to-b from-[oklch(0.72_0.15_195/0.3)] to-[oklch(0.72_0.15_195/0.1)] origin-top"
            />

            {/* Horizontal connector + children */}
            <div className="relative flex items-start gap-3">
              {/* Horizontal line spanning all children */}
              {node.children!.length > 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="absolute top-0 left-[calc(50%/(var(--child-count)))] right-[calc(50%/(var(--child-count)))] h-px bg-[oklch(0.72_0.15_195/0.15)]"
                  style={{
                    left: `calc(100% / ${node.children!.length * 2})`,
                    right: `calc(100% / ${node.children!.length * 2})`,
                  }}
                />
              )}

              {node.children!.map((child, i) => (
                <div key={child.id} className="flex flex-col items-center">
                  {/* Vertical stub from horizontal line to child */}
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.2, delay: 0.3 + i * 0.05 }}
                    className="w-px h-4 bg-[oklch(0.72_0.15_195/0.15)] origin-top"
                  />
                  <TreeNodeCard
                    node={child}
                    depth={depth + 1}
                    index={i}
                    isVisible={isVisible}
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
  data: TeardownNode | null;
  isVisible: boolean;
}

export default function TeardownTree({ data, isVisible }: TeardownTreeProps) {
  const [hoveredNode, setHoveredNode] = useState<TeardownNode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.72);
  const [position, setPosition] = useState({ x: -50, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

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
        className="flex justify-center pt-6 pb-20 px-6 w-max min-w-full"
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
        />
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-[oklch(0.15_0.015_260)] border border-[oklch(1_0_0/0.08)] rounded-lg p-1">
        <button
          onClick={() => setScale(prev => Math.max(0.3, prev - 0.1))}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-[oklch(1_0_0/0.08)] text-[oklch(0.6_0.01_260)] text-sm transition-colors"
        >
          −
        </button>
        <span className="text-[10px] font-mono text-[oklch(0.55_0.01_260)] w-10 text-center">
          {Math.round(scale * 100)}%
        </span>
        <button
          onClick={() => setScale(prev => Math.min(1.5, prev + 0.1))}
          className="w-7 h-7 flex items-center justify-center rounded hover:bg-[oklch(1_0_0/0.08)] text-[oklch(0.6_0.01_260)] text-sm transition-colors"
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
            className="absolute bottom-4 left-4 max-w-[280px] bg-[oklch(0.15_0.018_260)] border border-[oklch(1_0_0/0.12)] rounded-lg p-3 shadow-xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded bg-[oklch(0.72_0.15_195/0.12)] flex items-center justify-center text-[oklch(0.72_0.15_195)]">
                {iconMap[hoveredNode.id] || <Box className="w-3.5 h-3.5" />}
              </div>
              <span className="text-sm font-medium text-[oklch(0.93_0.005_260)]">
                {hoveredNode.label}
              </span>
            </div>
            <div className="space-y-1 text-[11px]">
              {hoveredNode.weight && (
                <div className="flex justify-between">
                  <span className="text-[oklch(0.55_0.01_260)]">Weight</span>
                  <span className="font-mono text-[oklch(0.80_0.01_260)]">{hoveredNode.weight}</span>
                </div>
              )}
              {hoveredNode.materialType && (
                <div className="flex justify-between">
                  <span className="text-[oklch(0.55_0.01_260)]">Material</span>
                  <span className="font-mono text-[oklch(0.80_0.01_260)]">{hoveredNode.materialType}</span>
                </div>
              )}
              {hoveredNode.value && (
                <div className="flex justify-between">
                  <span className="text-[oklch(0.55_0.01_260)]">Est. Value</span>
                  <span className="font-mono text-[oklch(0.72_0.15_195)]">{hoveredNode.value}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

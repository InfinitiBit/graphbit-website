'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Database, 
  Shield, 
  Eye, 
  Cloud, 
  Cpu, 
  GitBranch,
  Users,
  BarChart3,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';

interface ArchitectureNode {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  gradient: string;
  features: string[];
  connections: string[];
}

interface DataFlow {
  from: string;
  to: string;
  label: string;
  color: string;
  path: string;
}

interface InteractiveArchitectureDiagramProps {
  className?: string;
}

export function InteractiveArchitectureDiagram({ className = "" }: InteractiveArchitectureDiagramProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(true);
  
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const nodes: ArchitectureNode[] = [
    {
      id: 'api-gateway',
      x: 400,
      y: 50,
      title: 'API Gateway',
      description: 'Secure entry point for all AI agent interactions',
      icon: Shield,
      color: '#3b82f6',
      gradient: 'from-blue-500 to-blue-600',
      features: ['Rate limiting', 'Authentication', 'Request routing', 'SSL termination'],
      connections: ['agent-runtime', 'monitoring']
    },
    {
      id: 'agent-runtime',
      x: 200,
      y: 150,
      title: 'Agent Runtime',
      description: 'Core execution environment for AI agents',
      icon: Cpu,
      color: '#10b981',
      gradient: 'from-emerald-500 to-emerald-600',
      features: ['Multi-model support', 'Auto-scaling', 'Isolation', 'Resource management'],
      connections: ['llm-orchestrator', 'data-layer', 'monitoring']
    },
    {
      id: 'llm-orchestrator',
      x: 600,
      y: 150,
      title: 'LLM Orchestrator',
      description: 'Intelligent routing and optimization for language models',
      icon: GitBranch,
      color: '#8b5cf6',
      gradient: 'from-purple-500 to-purple-600',
      features: ['Model selection', 'Load balancing', 'Fallback handling', 'Cost optimization'],
      connections: ['external-llms', 'monitoring']
    },
    {
      id: 'data-layer',
      x: 100,
      y: 250,
      title: 'Data Layer',
      description: 'Secure and scalable data storage and retrieval',
      icon: Database,
      color: '#f59e0b',
      gradient: 'from-amber-500 to-amber-600',
      features: ['Vector databases', 'Caching', 'Data encryption', 'Backup & recovery'],
      connections: ['knowledge-base']
    },
    {
      id: 'monitoring',
      x: 700,
      y: 250,
      title: 'Monitoring & Analytics',
      description: 'Real-time observability and performance tracking',
      icon: BarChart3,
      color: '#ef4444',
      gradient: 'from-red-500 to-red-600',
      features: ['Real-time dashboards', 'Alerting', 'Performance metrics', 'Usage analytics'],
      connections: ['user-dashboard']
    },
    {
      id: 'external-llms',
      x: 600,
      y: 50,
      title: 'External LLMs',
      description: 'Integration with leading AI model providers',
      icon: Cloud,
      color: '#06b6d4',
      gradient: 'from-cyan-500 to-cyan-600',
      features: ['OpenAI GPT', 'Anthropic Claude', 'Google PaLM', 'Custom models'],
      connections: []
    },
    {
      id: 'knowledge-base',
      x: 100,
      y: 350,
      title: 'Knowledge Base',
      description: 'Centralized repository for agent knowledge and context',
      icon: Eye,
      color: '#84cc16',
      gradient: 'from-lime-500 to-lime-600',
      features: ['Document indexing', 'Semantic search', 'Version control', 'Access control'],
      connections: []
    },
    {
      id: 'user-dashboard',
      x: 500,
      y: 350,
      title: 'User Dashboard',
      description: 'Intuitive interface for managing and monitoring agents',
      icon: Users,
      color: '#ec4899',
      gradient: 'from-pink-500 to-pink-600',
      features: ['Agent management', 'Performance insights', 'Configuration', 'Team collaboration'],
      connections: []
    }
  ];

  const dataFlows: DataFlow[] = [
    {
      from: 'api-gateway',
      to: 'agent-runtime',
      label: 'Requests',
      color: '#3b82f6',
      path: 'M 400 80 Q 300 100 200 180'
    },
    {
      from: 'agent-runtime',
      to: 'llm-orchestrator',
      label: 'LLM Calls',
      color: '#10b981',
      path: 'M 230 150 Q 400 120 570 150'
    },
    {
      from: 'llm-orchestrator',
      to: 'external-llms',
      label: 'API Calls',
      color: '#8b5cf6',
      path: 'M 600 120 L 600 80'
    },
    {
      from: 'agent-runtime',
      to: 'data-layer',
      label: 'Data Access',
      color: '#10b981',
      path: 'M 180 180 Q 140 200 120 220'
    },
    {
      from: 'data-layer',
      to: 'knowledge-base',
      label: 'Knowledge',
      color: '#f59e0b',
      path: 'M 100 280 L 100 320'
    },
    {
      from: 'monitoring',
      to: 'user-dashboard',
      label: 'Analytics',
      color: '#ef4444',
      path: 'M 680 280 Q 600 300 520 320'
    }
  ];

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(selectedNode === nodeId ? null : nodeId);
  };

  const handleZoomIn = () => {
    setTransform(prev => ({
      ...prev,
      scale: Math.min(prev.scale * 1.2, 3)
    }));
  };

  const handleZoomOut = () => {
    setTransform(prev => ({
      ...prev,
      scale: Math.max(prev.scale * 0.8, 0.5)
    }));
  };

  const handleReset = () => {
    setTransform({ x: 0, y: 0, scale: 1 });
    setSelectedNode(null);
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as SVGElement).closest('.node')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
  }, [transform]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setTransform(prev => ({
      ...prev,
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    }));
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({ x: touch.clientX - transform.x, y: touch.clientY - transform.y });
    }
  }, [transform]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    e.preventDefault();
    const touch = e.touches[0];
    setTransform(prev => ({
      ...prev,
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y
    }));
  }, [isDragging, dragStart]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const selectedNodeData = selectedNode ? nodes.find(n => n.id === selectedNode) : null;

  // Toggle animation
  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  return (
    <div className={`relative bg-gradient-to-br from-gray-50 to-white border border-gray-200/50 rounded-2xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">GraphBit Architecture</h3>
            <p className="text-gray-600">Interactive diagram showing how our components work together</p>
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleZoomIn}
              className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              aria-label="Zoom in"
            >
              <ZoomIn className="h-4 w-4 text-gray-600" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              aria-label="Zoom out"
            >
              <ZoomOut className="h-4 w-4 text-gray-600" />
            </button>
            <button
              onClick={handleReset}
              className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              aria-label="Reset view"
            >
              <RotateCcw className="h-4 w-4 text-gray-600" />
            </button>
            <button
              onClick={toggleAnimation}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isAnimating 
                  ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {isAnimating ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>
      </div>

      {/* Diagram Container */}
      <div 
        ref={containerRef}
        className="relative h-96 overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <svg
          ref={svgRef}
          width="800"
          height="400"
          viewBox="0 0 800 400"
          className="w-full h-full"
          style={{
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
            transformOrigin: 'center'
          }}
        >
          {/* Background Grid */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f1f5f9" strokeWidth="1" opacity="0.5"/>
            </pattern>
            
            {/* Animated gradient for data flows */}
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="0.8" />
              <stop offset="100%" stopColor="transparent" />
              {isAnimating && (
                <animateTransform
                  attributeName="gradientTransform"
                  type="translate"
                  values="0 0; 100 0; 0 0"
                  dur="2s"
                  repeatCount="indefinite"
                />
              )}
            </linearGradient>
          </defs>
          
          <rect width="800" height="400" fill="url(#grid)" />

          {/* Data Flow Lines */}
          {dataFlows.map((flow, index) => (
            <g key={`flow-${index}`}>
              {/* Static path */}
              <path
                d={flow.path}
                fill="none"
                stroke={flow.color}
                strokeWidth="2"
                opacity="0.3"
                strokeDasharray="5,5"
              />
              
              {/* Animated flow */}
              {isAnimating && (
                <path
                  d={flow.path}
                  fill="none"
                  stroke={flow.color}
                  strokeWidth="3"
                  opacity="0.8"
                  strokeDasharray="10,5"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;-15;0"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </path>
              )}
              
              {/* Flow label */}
              <text
                x={(() => {
                  const segments = flow.path.split(' ');
                  if (flow.path.includes('Q')) {
                    const x1 = parseInt(segments[1]) || 0;
                    const x2 = parseInt(segments[5]) || 0;
                    return (x1 + x2) / 2;
                  } else {
                    const x1 = parseInt(segments[1]) || 0;
                    const x2 = parseInt(segments[3]) || 0;
                    return (x1 + x2) / 2;
                  }
                })()}
                y={(() => {
                  const segments = flow.path.split(' ');
                  if (flow.path.includes('Q')) {
                    const y1 = parseInt(segments[2]) || 0;
                    const y2 = parseInt(segments[6]) || 0;
                    return (y1 + y2) / 2 - 10;
                  } else {
                    const y1 = parseInt(segments[2]) || 0;
                    const y2 = parseInt(segments[4]) || 0;
                    return (y1 + y2) / 2 - 10;
                  }
                })()}
                textAnchor="middle"
                className="text-xs fill-gray-600 font-medium pointer-events-none"
              >
                {flow.label}
              </text>
            </g>
          ))}

          {/* Nodes */}
          {nodes.map((node) => {
            const IconComponent = node.icon;
            const isSelected = selectedNode === node.id;
            
            return (
              <g 
                key={node.id} 
                className="node cursor-pointer"
                onClick={() => handleNodeClick(node.id)}
              >
                {/* Node selection ring */}
                {isSelected && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="35"
                    fill="none"
                    stroke={node.color}
                    strokeWidth="3"
                    opacity="0.5"
                    strokeDasharray="5,5"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values={`0 ${node.x} ${node.y}; 360 ${node.x} ${node.y}`}
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
                
                {/* Node background */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="25"
                  fill="white"
                  stroke={node.color}
                  strokeWidth="3"
                  className="transition-all duration-300 hover:stroke-4 hover:drop-shadow-lg"
                  filter="drop-shadow(0 4px 8px rgba(0,0,0,0.1))"
                />
                
                {/* Node icon */}
                <foreignObject
                  x={node.x - 10}
                  y={node.y - 10}
                  width="20"
                  height="20"
                  className="pointer-events-none"
                >
                  <IconComponent 
                    className="w-5 h-5" 
                    style={{ color: node.color }}
                  />
                </foreignObject>
                
                {/* Node label */}
                <text
                  x={node.x}
                  y={node.y + 40}
                  textAnchor="middle"
                  className="text-sm font-semibold fill-gray-800 pointer-events-none"
                >
                  {node.title}
                </text>
                
                {/* Pulse animation for active nodes */}
                {isAnimating && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="25"
                    fill={node.color}
                    opacity="0.2"
                  >
                    <animate
                      attributeName="r"
                      values="25;35;25"
                      dur="3s"
                      repeatCount="indefinite"
                      begin={`${(nodes.findIndex(n => n.id === node.id) * 0.5)}s`}
                    />
                    <animate
                      attributeName="opacity"
                      values="0.2;0;0.2"
                      dur="3s"
                      repeatCount="indefinite"
                      begin={`${(nodes.findIndex(n => n.id === node.id) * 0.5) + 1}s`}
                    />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>

        {/* Instructions */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2">
          <p className="text-xs text-gray-600">
            Click nodes for details • Drag to pan • Use controls to zoom
          </p>
        </div>
      </div>

      {/* Node Details Panel */}
      <AnimatePresence>
        {selectedNodeData && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-200/50 bg-white/80 backdrop-blur-sm"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${selectedNodeData.gradient} shadow-lg`}>
                    <selectedNodeData.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{selectedNodeData.title}</h4>
                    <p className="text-gray-600">{selectedNodeData.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>
              
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Key Features</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedNodeData.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedNodeData.gradient}`} />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 
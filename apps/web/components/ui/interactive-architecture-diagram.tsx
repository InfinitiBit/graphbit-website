'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield as Database, 
  Shield, 
  Star as Eye, 
  Star as Cloud, 
  Star as Cpu, 
  Star as GitBranch,
  Users,
  BarChart3,
  X
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
  
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const nodes: ArchitectureNode[] = [
    {
      id: 'api-gateway',
      x: 400,
      y: 80,
      title: 'API Gateway',
      description: 'Secure entry point for all AI agent interactions',
      icon: Shield,
      color: 'hsl(195 100% 28%)',
      gradient: 'from-primary to-primary-light',
      features: ['Rate limiting', 'Authentication', 'Request routing', 'SSL termination'],
      connections: ['agent-runtime', 'monitoring']
    },
    {
      id: 'agent-runtime',
      x: 150,
      y: 180,
      title: 'Agent Runtime',
      description: 'Core execution environment for AI agents',
      icon: Cpu,
      color: 'hsl(160 84% 39%)',
      gradient: 'from-success to-success-light',
      features: ['Multi-model support', 'Auto-scaling', 'Isolation', 'Resource management'],
      connections: ['llm-orchestrator', 'data-layer', 'monitoring']
    },
    {
      id: 'llm-orchestrator',
      x: 650,
      y: 180,
      title: 'LLM Orchestrator',
      description: 'Intelligent routing and optimization for language models',
      icon: GitBranch,
      color: 'hsl(243 75% 59%)',
      gradient: 'from-accent to-accent-light',
      features: ['Model selection', 'Load balancing', 'Fallback handling', 'Cost optimization'],
      connections: ['external-llms', 'monitoring']
    },
    {
      id: 'data-layer',
      x: 80,
      y: 280,
      title: 'Data Layer',
      description: 'Secure and scalable data storage and retrieval',
      icon: Database,
      color: 'hsl(32 95% 44%)',
      gradient: 'from-warning to-warning-light',
      features: ['Vector databases', 'Caching', 'Data encryption', 'Backup & recovery'],
      connections: ['knowledge-base']
    },
    {
      id: 'monitoring',
      x: 720,
      y: 280,
      title: 'Monitoring',
      description: 'Real-time observability and performance tracking',
      icon: BarChart3,
      color: 'hsl(215 14% 34%)',
      gradient: 'from-secondary to-secondary-light',
      features: ['Real-time dashboards', 'Alerting', 'Performance metrics', 'Usage analytics'],
      connections: ['user-dashboard']
    },
    {
      id: 'external-llms',
      x: 550,
      y: 80,
      title: 'External LLMs',
      description: 'Integration with leading AI model providers',
      icon: Cloud,
      color: 'hsl(195 85% 41%)',
      gradient: 'from-primary-light to-primary-lighter',
      features: ['OpenAI GPT', 'Anthropic Claude', 'Google PaLM', 'Custom models'],
      connections: []
    },
    {
      id: 'knowledge-base',
      x: 250,
      y: 350,
      title: 'Knowledge Base',
      description: 'Centralized repository for agent knowledge and context',
      icon: Eye,
      color: 'hsl(160 80% 52%)',
      gradient: 'from-success-light to-success-lighter',
      features: ['Document indexing', 'Semantic search', 'Version control', 'Access control'],
      connections: []
    },
    {
      id: 'user-dashboard',
      x: 550,
      y: 350,
      title: 'User Dashboard',
      description: 'Intuitive interface for managing and monitoring agents',
      icon: Users,
      color: 'hsl(243 75% 70%)',
      gradient: 'from-accent-light to-accent-lighter',
      features: ['Agent management', 'Performance insights', 'Configuration', 'Team collaboration'],
      connections: []
    }
  ];

  const dataFlows: DataFlow[] = [
    {
      from: 'api-gateway',
      to: 'agent-runtime',
      label: 'Requests',
      color: 'hsl(195 100% 28%)',
      path: 'M 400 110 Q 280 130 150 210'
    },
    {
      from: 'agent-runtime',
      to: 'llm-orchestrator',
      label: 'LLM Calls',
      color: 'hsl(160 84% 39%)',
      path: 'M 180 180 Q 400 160 620 180'
    },
    {
      from: 'llm-orchestrator',
      to: 'external-llms',
      label: 'API Calls',
      color: 'hsl(243 75% 59%)',
      path: 'M 620 150 Q 580 120 550 110'
    },
    {
      from: 'agent-runtime',
      to: 'data-layer',
      label: 'Data Access',
      color: 'hsl(160 84% 39%)',
      path: 'M 130 210 Q 110 240 80 250'
    },
    {
      from: 'data-layer',
      to: 'knowledge-base',
      label: 'Knowledge',
      color: 'hsl(32 95% 44%)',
      path: 'M 120 310 Q 180 330 250 350'
    },
    {
      from: 'monitoring',
      to: 'user-dashboard',
      label: 'Analytics',
      color: 'hsl(215 14% 34%)',
      path: 'M 690 310 Q 620 330 580 350'
    }
  ];

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(selectedNode === nodeId ? null : nodeId);
  };



  const selectedNodeData = selectedNode ? nodes.find(n => n.id === selectedNode) : null;


  return (
    <div className={`relative bg-gradient-to-br from-background via-muted/30 to-background border border-border/50 rounded-2xl overflow-hidden shadow-lg backdrop-blur-sm ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="text-center">
          <h3 className="text-xl font-bold text-foreground mb-2">GraphBit Architecture</h3>
          <p className="text-muted-foreground">How our components work together</p>
        </div>
      </div>

      {/* Diagram Container */}
      <div 
        ref={containerRef}
        className="relative h-96 overflow-hidden"
      >
        <svg
          ref={svgRef}
          width="800"
          height="400"
          viewBox="0 0 800 400"
          className="w-full h-full"
        >
          {/* Background Grid */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3"/>
            </pattern>
            
            {/* Animated gradient for data flows */}
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="0.8" />
              <stop offset="100%" stopColor="transparent" />
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                values="0 0; 100 0; 0 0"
                dur="2s"
                repeatCount="indefinite"
              />
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
              
              {/* Flow label with improved positioning */}
              <text
                x={(() => {
                  const segments = flow.path.split(' ');
                  if (flow.path.includes('Q')) {
                    const x1 = parseInt(segments[1] || '0') || 0;
                    const x2 = parseInt(segments[5] || '0') || 0;
                    return (x1 + x2) / 2;
                  } else {
                    const x1 = parseInt(segments[1] || '0') || 0;
                    const x2 = parseInt(segments[3] || '0') || 0;
                    return (x1 + x2) / 2;
                  }
                })()}
                y={(() => {
                  const segments = flow.path.split(' ');
                  if (flow.path.includes('Q')) {
                    const y1 = parseInt(segments[2] || '0') || 0;
                    const y2 = parseInt(segments[6] || '0') || 0;
                    const cy = parseInt(segments[4] || '0') || 0;
                    return Math.min(y1, y2, cy) - 8;
                  } else {
                    const y1 = parseInt(segments[2] || '0') || 0;
                    const y2 = parseInt(segments[4] || '0') || 0;
                    return Math.min(y1, y2) - 8;
                  }
                })()}
                textAnchor="middle"
                className="text-xs fill-gray-600 font-medium pointer-events-none"
                style={{ fontSize: '10px' }}
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
                  />
                </foreignObject>
                
                {/* Node label */}
                <text
                  x={node.x}
                  y={node.y + 45}
                  textAnchor="middle"
                  className="text-xs font-semibold fill-gray-800 pointer-events-none"
                >
                  {node.title}
                </text>
                
                {/* Pulse animation for active nodes */}
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
              </g>
            );
          })}
        </svg>

        {/* Instructions */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2">
          <p className="text-xs text-gray-600">
            Click nodes for details
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
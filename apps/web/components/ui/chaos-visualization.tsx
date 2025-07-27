'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface Node {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  connections: number[];
  isCore: boolean;
}

interface Connection {
  from: number;
  to: number;
  strength: number;
  color: string;
}

interface ChaosVisualizationProps {
  className?: string;
  autoPlay?: boolean;
}

export function ChaosVisualization({ className = "", autoPlay = true }: ChaosVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);

  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 400;
  const ANIMATION_DURATION = 8000; // 8 seconds

  // Initialize nodes and connections
  const initializeVisualization = useCallback(() => {
    const nodeCount = 20;
    const newNodes: Node[] = [];
    const newConnections: Connection[] = [];

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      const isCore = i < 5; // First 5 are core nodes
      
      // Chaotic initial positions
      const chaoticX = Math.random() * (CANVAS_WIDTH - 40) + 20;
      const chaoticY = Math.random() * (CANVAS_HEIGHT - 40) + 20;
      
      // Organized target positions
      let targetX, targetY;
      if (isCore) {
        // Core nodes form a central hub
        const angle = (i / 5) * Math.PI * 2;
        const radius = 80;
        targetX = CANVAS_WIDTH / 2 + Math.cos(angle) * radius;
        targetY = CANVAS_HEIGHT / 2 + Math.sin(angle) * radius;
      } else {
        // Other nodes form organized clusters
        const cluster = Math.floor((i - 5) / 3);
        const nodeInCluster = (i - 5) % 3;
        const clusterAngle = (cluster / 5) * Math.PI * 2;
        const clusterRadius = 180;
        const nodeAngle = (nodeInCluster / 3) * Math.PI * 2;
        const nodeRadius = 40;
        
        const clusterX = CANVAS_WIDTH / 2 + Math.cos(clusterAngle) * clusterRadius;
        const clusterY = CANVAS_HEIGHT / 2 + Math.sin(clusterAngle) * clusterRadius;
        
        targetX = clusterX + Math.cos(nodeAngle) * nodeRadius;
        targetY = clusterY + Math.sin(nodeAngle) * nodeRadius;
      }

      newNodes.push({
        id: i,
        x: chaoticX,
        y: chaoticY,
        targetX,
        targetY,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        radius: isCore ? 8 : 5,
        color: isCore ? '#3b82f6' : '#64748b',
        connections: [],
        isCore
      });
    }

    // Create chaotic connections initially
    for (let i = 0; i < nodeCount; i++) {
      const connectionsCount = Math.floor(Math.random() * 4) + 1;
      for (let j = 0; j < connectionsCount; j++) {
        const target = Math.floor(Math.random() * nodeCount);
        if (target !== i && !newNodes[i].connections.includes(target)) {
          newNodes[i].connections.push(target);
          
          newConnections.push({
            from: i,
            to: target,
            strength: Math.random(),
            color: '#ef4444'
          });
        }
      }
    }

    // Add organized connections (will appear as animation progresses)
    for (let i = 0; i < 5; i++) {
      // Connect core nodes to each other
      for (let j = i + 1; j < 5; j++) {
        newConnections.push({
          from: i,
          to: j,
          strength: 0,
          color: '#10b981'
        });
      }
      
      // Connect core nodes to clusters
      const clusterStart = 5 + i * 3;
      for (let j = 0; j < 3 && clusterStart + j < nodeCount; j++) {
        newConnections.push({
          from: i,
          to: clusterStart + j,
          strength: 0,
          color: '#10b981'
        });
      }
    }

    setNodes(newNodes);
    setConnections(newConnections);
  }, []);

  // Animation loop
  const animate = useCallback((timestamp: number) => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Calculate animation progress
    const currentProgress = (timestamp % ANIMATION_DURATION) / ANIMATION_DURATION;
    setProgress(currentProgress);

    // Easing function for smooth transition
    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const easedProgress = easeInOutCubic(currentProgress);

    // Update nodes
    const updatedNodes = nodes.map(node => {
      const newNode = { ...node };
      
      if (currentProgress < 0.3) {
        // Chaotic phase - random movement
        newNode.vx += (Math.random() - 0.5) * 0.5;
        newNode.vy += (Math.random() - 0.5) * 0.5;
        newNode.vx *= 0.95;
        newNode.vy *= 0.95;
        
        newNode.x += newNode.vx;
        newNode.y += newNode.vy;
        
        // Keep nodes in bounds
        if (newNode.x < node.radius) newNode.x = node.radius;
        if (newNode.x > CANVAS_WIDTH - node.radius) newNode.x = CANVAS_WIDTH - node.radius;
        if (newNode.y < node.radius) newNode.y = node.radius;
        if (newNode.y > CANVAS_HEIGHT - node.radius) newNode.y = CANVAS_HEIGHT - node.radius;
      } else {
        // Transition to organized structure
        const transitionProgress = (currentProgress - 0.3) / 0.7;
        const smoothTransition = easeInOutCubic(transitionProgress);
        
        newNode.x = node.x + (node.targetX - node.x) * smoothTransition * 0.1;
        newNode.y = node.y + (node.targetY - node.y) * smoothTransition * 0.1;
      }
      
      return newNode;
    });

    // Update connections
    const updatedConnections = connections.map(conn => {
      const newConn = { ...conn };
      
      if (conn.color === '#ef4444') {
        // Chaotic connections fade out
        newConn.strength = Math.max(0, 1 - easedProgress);
      } else {
        // Organized connections fade in
        newConn.strength = Math.min(1, easedProgress);
      }
      
      return newConn;
    });

    // Draw connections
    updatedConnections.forEach(conn => {
      if (conn.strength > 0) {
        const fromNode = updatedNodes[conn.from];
        const toNode = updatedNodes[conn.to];
        
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = conn.color + Math.floor(conn.strength * 255).toString(16).padStart(2, '0');
        ctx.lineWidth = conn.strength * (conn.color === '#ef4444' ? 1 : 2);
        ctx.stroke();
      }
    });

    // Draw nodes
    updatedNodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      
      // Color based on transition progress
      if (currentProgress > 0.5) {
        const colorProgress = (currentProgress - 0.5) / 0.5;
        const r = Math.floor(100 + (59 - 100) * colorProgress); // Red component
        const g = Math.floor(116 + (130 - 116) * colorProgress); // Green component
        const b = Math.floor(139 + (246 - 139) * colorProgress); // Blue component
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      } else {
        ctx.fillStyle = '#64748b';
      }
      
      ctx.fill();
      
      // Core nodes get special highlighting
      if (node.isCore && currentProgress > 0.6) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 3, 0, Math.PI * 2);
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });

    // Update state
    setNodes(updatedNodes);
    setConnections(updatedConnections);

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [nodes, connections, isPlaying]);

  // Initialize on mount
  useEffect(() => {
    initializeVisualization();
  }, [initializeVisualization]);

  // Start/stop animation
  useEffect(() => {
    if (isPlaying && canvasRef.current) {
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, animate]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const reset = () => {
    setProgress(0);
    initializeVisualization();
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  return (
    <motion.div
      className={`relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 sm:p-8 overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <motion.div
          className="inline-flex items-center gap-3 mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-600 shadow-xl">
            <div className="w-6 h-6 relative">
              <div className="absolute inset-0 bg-white rounded-full animate-pulse" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            From Chaos to Order
          </h3>
        </motion.div>
        
        <p className="text-gray-300 max-w-2xl mx-auto">
          Watch how GraphBit transforms complex, disconnected AI development into organized, efficient workflows
        </p>
      </div>

      {/* Canvas Container */}
      <div className="relative bg-gray-900/50 rounded-xl p-4 mb-6">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="w-full h-auto max-w-full border border-gray-600/50 rounded-lg"
          style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}
        />
        
        {/* Progress Indicator */}
        <div className="absolute top-2 left-2 right-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400">
              {progress < 0.3 ? 'Chaos' : progress < 0.7 ? 'Transition' : 'Order'}
            </span>
            <span className="text-xs text-gray-400">
              {Math.round(progress * 100)}%
            </span>
          </div>
          <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"
              style={{ width: `${progress * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </div>

        {/* Phase Labels */}
        <div className="absolute bottom-2 left-2 right-2 flex justify-between text-xs">
          <div className={`px-2 py-1 rounded ${progress < 0.3 ? 'bg-red-500/20 text-red-300' : 'text-gray-500'}`}>
            Traditional Development
          </div>
          <div className={`px-2 py-1 rounded ${progress >= 0.3 && progress < 0.7 ? 'bg-yellow-500/20 text-yellow-300' : 'text-gray-500'}`}>
            Migration
          </div>
          <div className={`px-2 py-1 rounded ${progress >= 0.7 ? 'bg-green-500/20 text-green-300' : 'text-gray-500'}`}>
            GraphBit Platform
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={togglePlayPause}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          <span className="text-sm font-medium">
            {isPlaying ? 'Pause' : 'Play'}
          </span>
        </button>
        
        <button
          onClick={reset}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          aria-label="Reset animation"
        >
          <RotateCcw className="h-4 w-4" />
          <span className="text-sm font-medium">Reset</span>
        </button>
      </div>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-3 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div>
            <div className="font-medium text-red-300">Chaotic Phase</div>
            <div className="text-gray-400 text-xs">Disconnected, inefficient</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div>
            <div className="font-medium text-yellow-300">Transition</div>
            <div className="text-gray-400 text-xs">Organizing structure</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <div>
            <div className="font-medium text-green-300">GraphBit Order</div>
            <div className="text-gray-400 text-xs">Connected, optimized</div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-2xl" />
    </motion.div>
  );
} 
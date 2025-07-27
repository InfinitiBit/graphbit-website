'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

// Types
interface ParticleType {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

interface MorphState {
  scrollY: number;
  time: number;
  mouseX: number;
  mouseY: number;
}

// Custom hook for animation loop
function useAnimationFrame(callback: (deltaTime: number) => void) {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, [callback]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);
}

// SVG Morphing Shapes Component
function MorphingSVGShapes({ morphState }: { morphState: MorphState }) {
  const { scrollY, time, mouseX, mouseY } = morphState;

  // Calculate morph values based on scroll and time
  const morphValue1 = Math.sin(time * 0.001) * 50 + scrollY * 0.1;
  const morphValue2 = Math.cos(time * 0.0015) * 30 + scrollY * 0.05;
  const mouseInfluence = (mouseX + mouseY) * 0.001;

  // Dynamic path generation
  const generateMorphPath = (baseRadius: number, complexity: number) => {
    const points = [];
    const segments = 8;
    const centerX = 150;
    const centerY = 150;

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const radius = baseRadius + 
        Math.sin(angle * complexity + time * 0.002) * 20 +
        Math.sin(scrollY * 0.01 + angle) * 15 +
        mouseInfluence * 10;
      
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      if (i === 0) {
        points.push(`M ${x} ${y}`);
      } else {
        const prevAngle = ((i - 1) / segments) * Math.PI * 2;
        const prevRadius = baseRadius + 
          Math.sin(prevAngle * complexity + time * 0.002) * 20 +
          Math.sin(scrollY * 0.01 + prevAngle) * 15 +
          mouseInfluence * 10;
        const prevX = centerX + Math.cos(prevAngle) * prevRadius;
        const prevY = centerY + Math.sin(prevAngle) * prevRadius;
        
        const cpX = (prevX + x) / 2 + Math.sin(time * 0.003 + i) * 10;
        const cpY = (prevY + y) / 2 + Math.cos(time * 0.003 + i) * 10;
        
        points.push(`Q ${cpX} ${cpY} ${x} ${y}`);
      }
    }
    points.push('Z');
    return points.join(' ');
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Background SVG Shapes */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-30"
        viewBox="0 0 300 300"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="morphGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="morphGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Primary morphing shape */}
        <path
          d={generateMorphPath(60, 3)}
          fill="url(#morphGradient1)"
          transform={`translate(${morphValue1 * 0.5}, ${morphValue2 * 0.3}) rotate(${time * 0.01})`}
        />
        
        {/* Secondary morphing shape */}
        <path
          d={generateMorphPath(40, 5)}
          fill="url(#morphGradient2)"
          transform={`translate(${-morphValue2 * 0.3}, ${morphValue1 * 0.2}) rotate(${-time * 0.015})`}
        />
        
        {/* Tertiary shape with different complexity */}
        <path
          d={generateMorphPath(30, 7)}
          fill="url(#morphGradient1)"
          opacity="0.5"
          transform={`translate(${morphValue1 * 0.2}, ${-morphValue2 * 0.4}) rotate(${time * 0.008})`}
        />
      </svg>

      {/* Additional positioned shapes */}
      <svg 
        className="absolute top-0 right-0 w-1/3 h-1/3 opacity-20"
        viewBox="0 0 200 200"
      >
        <circle
          cx="100"
          cy="100"
          r={50 + Math.sin(time * 0.002) * 15}
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="2"
          opacity="0.6"
          transform={`rotate(${time * 0.02} 100 100)`}
        />
        <polygon
          points={`100,${50 + morphValue1 * 0.1} ${150 + morphValue2 * 0.1},150 ${50 - morphValue2 * 0.1},150`}
          fill="#06b6d4"
          opacity="0.4"
        />
      </svg>

      <svg 
        className="absolute bottom-0 left-0 w-1/4 h-1/4 opacity-25"
        viewBox="0 0 150 150"
      >
        <rect
          x={25 + Math.sin(time * 0.003) * 10}
          y={25 + Math.cos(time * 0.003) * 10}
          width={100 + morphValue1 * 0.05}
          height={100 + morphValue2 * 0.05}
          rx="20"
          fill="#10b981"
          opacity="0.3"
          transform={`rotate(${time * 0.025} 75 75)`}
        />
      </svg>
    </div>
  );
}

// Animated Gradient Background Component
function AnimatedGradientBackground({ morphState }: { morphState: MorphState }) {
  const { time, scrollY, mouseX, mouseY } = morphState;
  
  // Calculate dynamic CSS custom properties
  const gradientValues = {
    '--gradient-x': `${50 + Math.sin(time * 0.001) * 20 + mouseX * 0.01}%`,
    '--gradient-y': `${50 + Math.cos(time * 0.0015) * 15 + mouseY * 0.01}%`,
    '--gradient-size': `${100 + Math.sin(time * 0.002) * 30 + scrollY * 0.05}%`,
    '--hue-rotation': `${time * 0.02 + scrollY * 0.1}deg`,
    '--opacity-1': `${0.3 + Math.sin(time * 0.003) * 0.1}`,
    '--opacity-2': `${0.2 + Math.cos(time * 0.004) * 0.1}`,
    '--opacity-3': `${0.15 + Math.sin(time * 0.005) * 0.05}`,
  } as React.CSSProperties;

  return (
    <div 
      className="absolute inset-0 transition-all duration-1000 ease-out"
      style={gradientValues}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-500/[var(--opacity-1)] via-purple-500/[var(--opacity-2)] to-cyan-500/[var(--opacity-3)]"
        style={{
          backgroundPosition: 'var(--gradient-x) var(--gradient-y)',
          backgroundSize: 'var(--gradient-size) var(--gradient-size)',
          filter: 'hue-rotate(var(--hue-rotation))',
        }}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-tl from-green-500/[var(--opacity-2)] via-yellow-500/[var(--opacity-1)] to-red-500/[var(--opacity-3)]"
        style={{
          backgroundPosition: `calc(100% - var(--gradient-x)) calc(100% - var(--gradient-y))`,
          backgroundSize: 'var(--gradient-size) var(--gradient-size)',
          filter: 'hue-rotate(calc(var(--hue-rotation) * -0.5))',
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
}

// Canvas Particle System Component
function CanvasParticleSystem({ morphState }: { morphState: MorphState }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<ParticleType[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Resize handler
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
        canvasRef.current.width = rect.width;
        canvasRef.current.height = rect.height;
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Initialize particles
  useEffect(() => {
    const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];
    particlesRef.current = Array.from({ length: 50 }, () => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      life: Math.random() * 1000,
      maxLife: 1000 + Math.random() * 2000,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, [dimensions]);

  // Animation loop
  useAnimationFrame((deltaTime) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    // Update and draw particles
    particlesRef.current.forEach((particle, index) => {
      // Update particle
      particle.life += deltaTime;
      particle.x += particle.vx * deltaTime * 0.1;
      particle.y += particle.vy * deltaTime * 0.1;

      // Apply morphing influences
      const timeInfluence = Math.sin(morphState.time * 0.001 + index * 0.1) * 0.2;
      const scrollInfluence = morphState.scrollY * 0.0001;
      
      particle.vx += timeInfluence;
      particle.vy += scrollInfluence;

      // Boundary conditions
      if (particle.x < 0 || particle.x > dimensions.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > dimensions.height) particle.vy *= -1;

      // Reset particle if life exceeded
      if (particle.life > particle.maxLife) {
        particle.x = Math.random() * dimensions.width;
        particle.y = Math.random() * dimensions.height;
        particle.life = 0;
        particle.vx = (Math.random() - 0.5) * 0.5;
        particle.vy = (Math.random() - 0.5) * 0.5;
      }

      // Draw particle
      const opacity = 1 - (particle.life / particle.maxLife);
      const size = particle.size * (1 + Math.sin(particle.life * 0.01) * 0.3);
      
      ctx.save();
      ctx.globalAlpha = opacity * 0.6;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Draw connections between nearby particles
      particlesRef.current.forEach((otherParticle, otherIndex) => {
        if (index >= otherIndex) return;
        
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          ctx.save();
          ctx.globalAlpha = (1 - distance / 100) * 0.1;
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
          ctx.restore();
        }
      });
    });
  });

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

// Main Morphing Background Component
export function MorphingBackground() {
  const [morphState, setMorphState] = useState<MorphState>({
    scrollY: 0,
    time: 0,
    mouseX: 0,
    mouseY: 0,
  });

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMorphState(prev => ({
        ...prev,
        mouseX: (e.clientX / window.innerWidth - 0.5) * 100,
        mouseY: (e.clientY / window.innerHeight - 0.5) * 100,
      }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setMorphState(prev => ({
        ...prev,
        scrollY: window.scrollY,
      }));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Time tracking with requestAnimationFrame
  useAnimationFrame(() => {
    setMorphState(prev => ({
      ...prev,
      time: performance.now(),
    }));
  });

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Animated gradient background */}
      <AnimatedGradientBackground morphState={morphState} />
      
      {/* SVG morphing shapes */}
      <MorphingSVGShapes morphState={morphState} />
      
      {/* Canvas particle system */}
      <CanvasParticleSystem morphState={morphState} />
      
      {/* Static gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/10 via-transparent to-purple-50/5 pointer-events-none" />
    </div>
  );
}
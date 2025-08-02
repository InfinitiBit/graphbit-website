'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface NeuralNetworkBackgroundProps {
  className?: string;
}

export function NeuralNetworkBackground({ className = '' }: NeuralNetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const animationRef = useRef<number>(0);
  const clockRef = useRef<any>(null);
  const bubblesRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isDark = resolvedTheme === 'dark';

    // Color palette based on theme - Enhanced visibility
    const palette = isDark 
      ? {
          primary: 'rgba(59, 130, 246, 0.6)',     // blue-500 with higher opacity
          secondary: 'rgba(147, 197, 253, 0.7)',  // blue-300 with higher opacity
          accent: 'rgba(255, 255, 255, 0.2)',     // white with increased opacity
          connection: 'rgba(147, 197, 253, 0.5)'  // blue-300 for connections - more visible
        }
      : {
          primary: 'rgba(59, 130, 246, 0.4)',     // blue-500 with increased opacity
          secondary: 'rgba(30, 64, 175, 0.5)',    // blue-800 with higher opacity
          accent: 'rgba(0, 0, 0, 0.1)',           // black with slightly higher opacity
          connection: 'rgba(30, 64, 175, 0.35)'   // blue-800 for connections - more visible
        };

    let unit = 0;
    const u = (val: number) => unit * val;

    // Vector2 class
    class Vector2 {
      x: number;
      y: number;

      constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
      }

      set(x: number, y: number) {
        this.x = x;
        this.y = y;
        return this;
      }

      copy(v: Vector2) {
        this.x = v.x;
        this.y = v.y;
        return this;
      }

      add(v: Vector2) {
        this.x += v.x;
        this.y += v.y;
        return this;
      }

      subVectors(a: Vector2, b: Vector2) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        return this;
      }

      multiplyScalar(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
      }

      length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      }

      normalize() {
        const len = this.length();
        if (len !== 0) {
          this.x /= len;
          this.y /= len;
        }
        return this;
      }

      distanceTo(v: Vector2) {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        return Math.sqrt(dx * dx + dy * dy);
      }

      random() {
        this.x = Math.random();
        this.y = Math.random();
        return this;
      }
    }

    // Math utilities
    const MathUtils = {
      clamp: (value: number, min: number, max: number) => Math.max(min, Math.min(max, value)),
      smoothstep: (x: number, min: number, max: number) => {
        if (x <= min) return 0;
        if (x >= max) return 1;
        x = (x - min) / (max - min);
        return x * x * (3 - 2 * x);
      }
    };

    // Clock class
    class Clock {
      private oldTime: number;

      constructor() {
        this.oldTime = performance.now() / 1000;
      }

      getDelta() {
        const newTime = performance.now() / 1000;
        const delta = newTime - this.oldTime;
        this.oldTime = newTime;
        return delta;
      }
    }

    // Bubble class
    class Bubble extends Vector2 {
      actualPosition: Vector2;
      speed: number;
      size: number;
      connections: number;
      isActive: boolean;
      interactive: boolean;
      shift: Vector2;

      constructor(x: number = 0, y: number = 0) {
        super(x, y);
        this.actualPosition = new Vector2(x, y);
        this.speed = 0;
        this.size = 0;
        this.connections = 0;
        this.isActive = true;
        this.interactive = false;
        this.shift = new Vector2();
      }
    }

    // Bubbles class
    class Bubbles {
      items: Bubble[];
      fill: string;
      stroke: string;
      border: number;
      line: number;
      maxConnections: number;
      maxDistance: number;
      aspectRatio: number;
      xRange: number;
      xPadding: number;
      maxX: number;
      shockwave: {
        totalTime: number;
        startTime: number;
        inAction: boolean;
        position: Vector2;
        maxRadius: number;
        maxAmp: number;
        waveWidth: number;
        duration: number;
      };

      constructor(amount: number) {
        this.items = [];
        this.fill = palette.primary;
        this.stroke = palette.secondary;
        this.border = 0.35;
        this.line = 0.18;
        
        this.maxConnections = 12;
        this.maxDistance = 35;
        
        // Calculate aspect ratio and coordinate ranges
        this.aspectRatio = canvas.width / canvas.height;
        this.xRange = 100 * this.aspectRatio;
        this.xPadding = this.xRange * 0.1;
        this.maxX = this.xRange + this.xPadding;
        
        this.setItems(amount);
        
        this.shockwave = {
          totalTime: 0,
          startTime: 0,
          inAction: false,
          position: new Vector2(-100, -100),
          maxRadius: 80, // Increased for wider effect
          maxAmp: 10,    // Slightly increased amplitude
          waveWidth: 20, // Wider wave
          duration: 1.8  // Slightly longer duration
        };
      }

      setItems(amount: number) {
        this.items = Array.from({length: amount + 1}, (_, index) => {
          const bubble = new Bubble();
          
          // Better distribution across the entire area with some particles extending beyond edges
          if (index < amount * 0.6) {
            // Main distribution across full area with proper aspect ratio
            bubble.x = Math.random() * this.maxX - this.xPadding * 0.5;
            bubble.y = Math.random() * 120 - 10; // Keep Y range as before
          } else {
            // Edge particles for better coverage, especially right side
            const side = Math.floor(Math.random() * 4);
            switch(side) {
              case 0: // Top edge
                bubble.x = Math.random() * this.maxX - this.xPadding * 0.5;
                bubble.y = Math.random() * 25 + 85;
                break;
              case 1: // Right edge - use proper aspect ratio
                bubble.x = Math.random() * (this.xPadding * 0.5) + (this.xRange - this.xPadding * 0.2);
                bubble.y = Math.random() * 120 - 10;
                break;
              case 2: // Bottom edge
                bubble.x = Math.random() * this.maxX - this.xPadding * 0.5;
                bubble.y = Math.random() * 25 - 15;
                break;
              case 3: // Left edge
                bubble.x = Math.random() * (this.xPadding * 0.5) - this.xPadding * 0.3;
                bubble.y = Math.random() * 120 - 10;
                break;
            }
          }
          
          bubble.actualPosition.copy(bubble);
          bubble.speed = Math.random() * 8 + 3;
          bubble.size = Math.random() * 0.8 + 0.3;
          return bubble;
        });
        
        if (this.items.length > 0 && this.items[0]) {
          this.items[0].isActive = false;
          this.items[0].interactive = true;
          this.items[0].size = 2;
        }
      }

      update(t: number) {
        const sw = this.shockwave;
        sw.totalTime += t;
        const waveTimeRatio = MathUtils.clamp((sw.totalTime - sw.startTime) / sw.duration, 0, 1);
        const waveDist = sw.maxRadius * waveTimeRatio;
        const waveAmp = 1 - waveTimeRatio;
        
        this.items.forEach(item => {
          if (item.interactive) return;
          item.actualPosition.y -= item.speed * t;
          if (item.y < -15) {
            item.actualPosition.y = (120 - item.y) % 120 + 110;
            // Use class properties for respawn X position
            item.actualPosition.x = Math.random() * this.maxX - this.xPadding * 0.5;
            item.speed = Math.random() * 8 + 3;
            item.size = Math.random() * 0.8 + 0.3;
          }
          
          // shockwave shift
          item.shift.subVectors(item.actualPosition, this.shockwave.position);
          const itemDist = item.shift.length();
          item.shift.normalize();
          const shiftAmp = MathUtils.smoothstep(itemDist, waveDist - sw.waveWidth, waveDist)
                         - MathUtils.smoothstep(itemDist, waveDist, waveDist + sw.waveWidth);
          item.shift.multiplyScalar(sw.maxAmp * shiftAmp * waveAmp);
          
          item.copy(item.actualPosition).add(item.shift);
        });
        
        this.drawLines();
        this.drawBubbles();
      }

      drawLines() {
        for (let i = 0; i < this.items.length; i++) {
          this.items[i]!.connections = 0;
        }
        
        for (let i = 0; i < this.items.length; i++) {
          const bubble = this.items[i]!;
          if (!bubble.isActive) continue;
          if (bubble.connections >= this.maxConnections) continue;
          
          for (let j = i + 1; j < this.items.length; j++) {
            const bubbleB = this.items[j]!;
            if (bubbleB.connections >= this.maxConnections) continue;
            
            const dist = bubble.distanceTo(bubbleB);
            if (dist <= this.maxDistance) {
              bubble.connections++;
              bubbleB.connections++;
              
              const a = 1 - (MathUtils.clamp(dist / this.maxDistance, 0, 1) ** 1.8);
              const lw = u(this.line * a);
              
              ctx!.strokeStyle = palette.connection.replace(/[\d.]+\)$/g, `${a * 0.85})`);
              ctx!.lineWidth = lw;
              
              ctx!.beginPath();
              ctx!.moveTo(u(bubble.x), u(bubble.y));
              ctx!.lineTo(u(bubbleB.x), u(bubbleB.y));
              ctx!.stroke();
            }
          }
        }
      }

      drawBubbles() {
        ctx!.fillStyle = this.fill;
        ctx!.strokeStyle = this.stroke;
        ctx!.lineWidth = u(this.border);
        ctx!.beginPath();
        this.items.forEach(item => {
          if (!item.isActive) return;
          
          ctx!.moveTo(u(item.x + item.size), u(item.y));
          ctx!.arc(u(item.x), u(item.y), u(item.size), 0, Math.PI * 2);
        });
        ctx!.fill();
        ctx!.stroke();
      }

      updateAspectRatio() {
        this.aspectRatio = canvas.width / canvas.height;
        this.xRange = 100 * this.aspectRatio;
        this.xPadding = this.xRange * 0.1;
        this.maxX = this.xRange + this.xPadding;
      }
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx!.scale(dpr, dpr);
      
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      
      // Use height as the base unit for consistent sizing across different aspect ratios
      unit = canvas.height * 0.01 / dpr;
      
      // Update aspect ratio for particle distribution
      if (bubblesRef.current) {
        bubblesRef.current.updateAspectRatio();
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!bubblesRef.current || !bubblesRef.current.items.length) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      const xRatio = x / rect.width;
      const yRatio = y / rect.height;
      
      // Use aspect ratio for mouse coordinates
      const aspectRatio = canvas.width / canvas.height;
      const xRange = 100 * aspectRatio;
      
      const zeroItem = bubblesRef.current.items[0];
      if (zeroItem) {
        zeroItem.set(xRatio * xRange, yRatio * 100);
        zeroItem.isActive = true;
      }
    };

    const handleClick = (_event: MouseEvent) => {
      if (!bubblesRef.current || !bubblesRef.current.items.length) return;
      
      const zeroItem = bubblesRef.current.items[0];
      if (zeroItem && zeroItem.isActive) {
        bubblesRef.current.shockwave.startTime = bubblesRef.current.shockwave.totalTime;
        bubblesRef.current.shockwave.position.copy(zeroItem);
      }
    };

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    resize();

    clockRef.current = new Clock();
    
    // Performance optimization: reduce particles on mobile/smaller screens
    const isMobile = window.innerWidth < 768;
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    const particleCount = isMobile || isLowEnd ? 60 : 120; // Increased for better right side coverage
    
    bubblesRef.current = new Bubbles(particleCount);

    const tMin = isMobile ? 1 / 30 : 1 / 60; // Lower FPS on mobile for battery life

    const animate = () => {
      if (!canvas || !ctx || !clockRef.current || !bubblesRef.current) return;
      
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      const dt = Math.min(tMin, clockRef.current.getDelta());
      
      // Clear with very subtle background
      ctx!.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
      
      // Reduce animation speed for reduced motion preference
      const animationSpeed = prefersReducedMotion ? 0.1 : 1;
      bubblesRef.current.update(dt * animationSpeed);
      
      const newAnimationId = requestAnimationFrame(animate);
      animationRef.current = newAnimationId;
    };

    animate();

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
    };
  }, [mounted, resolvedTheme]);

  if (!mounted) {
    // Fallback gradient background while loading
    return (
      <div 
        className={`fixed inset-0 -z-40 overflow-hidden pointer-events-none ${className}`}
        aria-hidden="true"
      >
        <div 
          className={`absolute inset-0 ${
            resolvedTheme === 'dark' 
              ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
              : 'bg-gradient-to-br from-slate-50 via-white to-slate-50/80'
          }`}
        />
      </div>
    );
  }

  return (
    <div 
      className={`fixed inset-0 -z-40 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Gradient background base */}
      <div 
        className={`absolute inset-0 ${
          resolvedTheme === 'dark' 
            ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
            : 'bg-gradient-to-br from-slate-50 via-white to-slate-50/80'
        }`}
      />
      
      {/* Neural network canvas */}
      <canvas
        ref={canvasRef}
        className="neural-network-canvas absolute inset-0 w-full h-full opacity-40 md:opacity-55"
        style={{ 
          mixBlendMode: resolvedTheme === 'dark' ? 'screen' : 'multiply',
          filter: 'blur(0.3px)',
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
      
      {/* Content visibility overlay - ensures text remains readable */}
      <div 
        className={`absolute inset-0 ${
          resolvedTheme === 'dark'
            ? 'bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950/35'
            : 'bg-gradient-to-b from-transparent via-white/25 to-white/50'
        }`}
      />
      
      {/* Additional accessibility styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media (prefers-contrast: high) {
            .neural-network-canvas {
              opacity: 0.15 !important;
            }
          }
          
          @media (prefers-reduced-motion: reduce) {
            .neural-network-canvas {
              opacity: 0.3 !important;
            }
          }
        `
      }} />
    </div>
  );
}
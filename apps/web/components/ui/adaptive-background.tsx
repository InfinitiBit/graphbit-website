'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports to prevent SSR issues
const ThreeDBackgroundComplete = dynamic(() => 
  import('./three-d-background-complete').then(mod => ({ default: mod.ThreeDBackgroundComplete })), 
  { 
    ssr: false,
    loading: () => <LoadingFallback />
  }
);

const MorphingBackground = dynamic(() => 
  import('./morphing-background').then(mod => ({ default: mod.MorphingBackground })), 
  { 
    ssr: false,
    loading: () => <LoadingFallback />
  }
);

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/30 -z-10" />
  );
}

// Performance detection hook - now SSR safe
function usePerformanceMode() {
  const [performanceMode, setPerformanceMode] = useState<'high' | 'medium' | 'low' | null>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Detect device capabilities
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    // Check various performance indicators
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const hasWebGL = !!gl;
    const deviceMemory = (navigator as any).deviceMemory || 4;
    const hardwareConcurrency = navigator.hardwareConcurrency || 2;
    const connectionSpeed = (navigator as any).connection?.effectiveType || '4g';
    
    // Performance scoring
    let score = 0;
    
    if (hasWebGL) score += 3;
    if (deviceMemory >= 8) score += 2;
    else if (deviceMemory >= 4) score += 1;
    if (hardwareConcurrency >= 8) score += 2;
    else if (hardwareConcurrency >= 4) score += 1;
    if (!isMobile) score += 2;
    if (connectionSpeed === '4g') score += 1;
    
    // Set performance mode based on score
    if (score >= 7) {
      setPerformanceMode('high');
    } else if (score >= 4) {
      setPerformanceMode('medium');
    } else {
      setPerformanceMode('low');
    }
    
    // Monitor actual performance
    let frameCount = 0;
    let lastTime = performance.now();
    
    const checkFrameRate = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;
        
        // Adjust performance mode based on actual FPS
        if (fps < 20 && performanceMode !== 'low') {
          setPerformanceMode('low');
        } else if (fps < 40 && performanceMode === 'high') {
          setPerformanceMode('medium');
        }
      }
      
      requestAnimationFrame(checkFrameRate);
    };
    
    requestAnimationFrame(checkFrameRate);
  }, []);
  
  return { performanceMode, mounted };
}

// Adaptive background component - now hydration safe
export function AdaptiveBackground() {
  const { performanceMode, mounted } = usePerformanceMode();
  
  // Always render the same fallback during SSR and initial client render
  if (!mounted || performanceMode === null) {
    return <LoadingFallback />;
  }
  
  switch (performanceMode) {
    case 'high':
      return <ThreeDBackgroundComplete />;
    
    case 'medium':
      return <MorphingBackground />;
    
    case 'low':
      return <LoadingFallback />;
    
    default:
      return <LoadingFallback />;
  }
}
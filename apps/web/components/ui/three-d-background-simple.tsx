'use client';

import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Mobile detection hook
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return { isMobile, mounted };
}

// Simple floating sphere component
function FloatingSphere({ position, color, size }: {
  position: [number, number, number];
  color: string;
  size: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.003;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshLambertMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
}

// Simple scene component
function SimpleScene({ isMobile }: { isMobile: boolean }) {
  const { mouse } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  // Mouse parallax effect (desktop only)
  useFrame(() => {
    if (groupRef.current && !isMobile) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.y * 0.05,
        0.02
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.05,
        0.02
      );
    }
  });

  const spheres = [
    { position: [-6, 2, -2], color: '#3b82f6', size: 1.2 },
    { position: [5, -1, -1], color: '#8b5cf6', size: 1.0 },
    { position: [-2, -3, -3], color: '#06b6d4', size: 1.1 },
    { position: [7, 3, -2], color: '#10b981', size: 0.9 },
    { position: [0, 4, -4], color: '#f59e0b', size: 1.3 },
    { position: [-5, -2, -1], color: '#ef4444', size: 0.8 },
  ];

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -5]} intensity={0.4} color="#8b5cf6" />
      
      {spheres.slice(0, isMobile ? 4 : 6).map((sphere, index) => (
        <FloatingSphere
          key={index}
          position={sphere.position as [number, number, number]}
          color={sphere.color}
          size={sphere.size}
        />
      ))}
    </group>
  );
}

// Loading fallback
function LoadingFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/30" />
  );
}

// Error boundary component
function ErrorFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/30">
      <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">
        3D graphics not supported
      </div>
    </div>
  );
}

// Main component
export function ThreeDBackgroundSimple() {
  const { isMobile, mounted } = useIsMobile();
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    if (!mounted) return;
    
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch (e) {
      setHasWebGL(false);
    }
  }, [mounted]);

  if (!mounted || !hasWebGL) {
    return <LoadingFallback />;
  }

  return (
    <div className="fixed inset-0 -z-10">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 0, 15], fov: 50 }}
          gl={{ 
            antialias: !isMobile,
            alpha: true,
            powerPreference: isMobile ? 'low-power' : 'default'
          }}
          dpr={isMobile ? 1 : Math.min(2, window.devicePixelRatio)}
          onCreated={() => console.log('Canvas created successfully')}
        >
          <SimpleScene isMobile={isMobile} />
        </Canvas>
      </Suspense>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/20 via-blue-50/5 to-purple-50/5 pointer-events-none" />
    </div>
  );
}
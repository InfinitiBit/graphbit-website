'use client';

import { Suspense, useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, Box, Octahedron } from '@react-three/drei';
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

// Floating geometric shape component
function FloatingShape({ position, shape, color, size, speed = 1 }: {
  position: [number, number, number];
  shape: 'sphere' | 'box' | 'octahedron';
  color: string;
  size: number;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002 * speed;
      meshRef.current.rotation.y += 0.003 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 * speed) * 0.3;
    }
  });

  return (
    <Float speed={1.5 * speed} rotationIntensity={0.3} floatIntensity={0.5}>
      {shape === 'sphere' && (
        <Sphere ref={meshRef} position={position} args={[size]}>
          <meshLambertMaterial 
            color={color} 
            transparent 
            opacity={0.3}
            wireframe={false}
          />
        </Sphere>
      )}
      {shape === 'box' && (
        <Box ref={meshRef} position={position} args={[size, size, size]}>
          <meshLambertMaterial 
            color={color} 
            transparent 
            opacity={0.3}
            wireframe={false}
          />
        </Box>
      )}
      {shape === 'octahedron' && (
        <Octahedron ref={meshRef} position={position} args={[size]}>
          <meshLambertMaterial 
            color={color} 
            transparent 
            opacity={0.3}
            wireframe={false}
          />
        </Octahedron>
      )}
    </Float>
  );
}

// Network nodes component
function NetworkNodes({ isMobile }: { isMobile: boolean }) {
  const nodesRef = useRef<THREE.Group>(null);
  const nodeCount = isMobile ? 8 : 15;
  
  const nodes = useMemo(() => {
    const nodeArray = [];
    for (let i = 0; i < nodeCount; i++) {
      nodeArray.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
        ] as [number, number, number],
        color: ['#60a5fa', '#a855f7', '#10b981', '#f59e0b'][Math.floor(Math.random() * 4)],
      });
    }
    return nodeArray;
  }, [nodeCount]);

  useFrame((state) => {
    if (nodesRef.current) {
      nodesRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={nodesRef}>
      {nodes.map((node, index) => (
        <Sphere key={index} position={node.position} args={[0.1]}>
          <meshBasicMaterial color={node.color} transparent opacity={0.6} />
        </Sphere>
      ))}
      {/* Connection lines between nodes */}
      {!isMobile && nodes.map((node, index) => {
        if (index === 0) return null;
        const prevNode = nodes[index - 1];
        if (!prevNode) return null;
        return (
          <line key={`line-${index}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([
                  ...node.position,
                  ...prevNode.position,
                ]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#60a5fa" transparent opacity={0.2} />
          </line>
        );
      })}
    </group>
  );
}

// Main 3D scene component
function Scene({ isMobile }: { isMobile: boolean }) {
  const { mouse, viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  // Mouse parallax effect
  useFrame(() => {
    if (groupRef.current && !isMobile) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.y * 0.1,
        0.02
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.1,
        0.02
      );
    }
  });

  const shapes = useMemo(() => {
    const shapeCount = isMobile ? 6 : 12;
    const shapeArray = [];
    
    for (let i = 0; i < shapeCount; i++) {
      shapeArray.push({
        position: [
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
        ] as [number, number, number],
        shape: (['sphere', 'box', 'octahedron'][Math.floor(Math.random() * 3)] || 'sphere') as 'sphere' | 'box' | 'octahedron',
        color: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'][Math.floor(Math.random() * 4)] || '#3b82f6',
        size: Math.random() * 0.8 + 0.3,
        speed: Math.random() * 0.5 + 0.5,
      });
    }
    return shapeArray;
  }, [isMobile]);

  return (
    <group ref={groupRef}>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />

      {/* Floating geometric shapes */}
      {shapes.map((shape, index) => (
        <FloatingShape
          key={index}
          position={shape.position}
          shape={shape.shape}
          color={shape.color}
          size={shape.size}
          speed={shape.speed}
        />
      ))}

      {/* Network nodes */}
      <NetworkNodes isMobile={isMobile} />
    </group>
  );
}

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/30" />
  );
}

// Main 3D background component
export function ThreeDBackground() {
  const { isMobile, mounted } = useIsMobile();

  // Always render consistent content during SSR and initial client render
  if (!mounted) {
    return <LoadingFallback />;
  }

  try {
    return (
      <div className="absolute inset-0 -z-10">
        <Suspense fallback={<LoadingFallback />}>
          <Canvas
            camera={{ 
              position: [0, 0, 12], 
              fov: isMobile ? 60 : 50,
              near: 0.1,
              far: 1000
            }}
            gl={{ 
              antialias: !isMobile,
              alpha: true,
              powerPreference: isMobile ? 'low-power' : 'high-performance'
            }}
            performance={{ 
              min: isMobile ? 0.3 : 0.5 
            }}
            dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
            onCreated={(state) => {
              console.log('Three.js Canvas created successfully');
            }}
            onError={(error) => {
              console.error('Three.js Canvas error:', error);
            }}
          >
            <Scene isMobile={isMobile} />
          </Canvas>
        </Suspense>
        
        {/* Gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/40 via-blue-50/20 to-purple-50/10 pointer-events-none" />
      </div>
    );
  } catch (error) {
    console.error('ThreeDBackground error:', error);
    return <LoadingFallback />;
  }
}
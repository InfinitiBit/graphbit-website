'use client';

import { Suspense, useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Mobile detection hook
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      );
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return { isMobile, mounted };
}

// Geometric shape component
function GeometricShape({ 
  position, 
  geometry, 
  color, 
  size, 
  rotationSpeed = 1 
}: {
  position: [number, number, number];
  geometry: 'box' | 'sphere' | 'octahedron' | 'tetrahedron';
  color: string;
  size: number;
  rotationSpeed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001 * rotationSpeed;
      meshRef.current.rotation.y += 0.002 * rotationSpeed;
      meshRef.current.rotation.z += 0.0015 * rotationSpeed;
    }
  });

  const renderGeometry = () => {
    switch (geometry) {
      case 'box':
        return <boxGeometry args={[size, size, size]} />;
      case 'sphere':
        return <sphereGeometry args={[size, 16, 16]} />;
      case 'octahedron':
        return <octahedronGeometry args={[size]} />;
      case 'tetrahedron':
        return <tetrahedronGeometry args={[size]} />;
      default:
        return <boxGeometry args={[size, size, size]} />;
    }
  };

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        {renderGeometry()}
        <meshLambertMaterial 
          color={color} 
          transparent 
          opacity={0.7}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

// Network node component
function NetworkNode({ position, color, size = 0.15 }: {
  position: [number, number, number];
  color: string;
  size?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.3;
      
      // Subtle pulsing effect
      const scale = 1 + Math.sin(time * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 12, 12]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );
}

// Connection line component
function ConnectionLine({ start, end, color = '#60a5fa' }: {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
}) {
  const lineRef = useRef<any>(null);

  useFrame(() => {
    if (lineRef.current) {
      lineRef.current.rotation.z += 0.001;
    }
  });

  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end)
  ], [start, end]);

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    return geom;
  }, [points]);

  return (
    <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.3 }))} ref={lineRef} />
  );
}

// Particle system component
function ParticleField({ count, isMobile }: { count: number; isMobile: boolean }) {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = isMobile ? count / 2 : count;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.3 + 0.5, 0.7, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, [particleCount]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x += 0.0005;
      particlesRef.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Main scene component
function Scene({ isMobile }: { isMobile: boolean }) {
  const { mouse, viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  // Enhanced mouse parallax effect
  useFrame(() => {
    if (groupRef.current && !isMobile) {
      const targetRotationX = mouse.y * 0.05;
      const targetRotationY = mouse.x * 0.05;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotationX,
        0.03
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        0.03
      );

      // Subtle position shift based on mouse
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        mouse.x * 0.5,
        0.02
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        mouse.y * 0.3,
        0.02
      );
    }
  });

  // Geometric shapes configuration - REMOVED
  // const shapes = useMemo(() => {
  //   const shapeCount = isMobile ? 8 : 15;
  //   const geometries: Array<'box' | 'sphere' | 'octahedron' | 'tetrahedron'> = 
  //     ['box', 'sphere', 'octahedron', 'tetrahedron'];
  //   const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
  //   
  //   return Array.from({ length: shapeCount }, (_, i) => ({
  //     position: [
  //       (Math.random() - 0.5) * 20,
  //       (Math.random() - 0.5) * 15,
  //       (Math.random() - 0.5) * 10,
  //     ] as [number, number, number],
  //     geometry: geometries[Math.floor(Math.random() * geometries.length)] || 'box',
  //     color: colors[Math.floor(Math.random() * colors.length)] || '#3b82f6',
  //     size: Math.random() * 0.8 + 0.4,
  //     rotationSpeed: Math.random() * 0.5 + 0.5,
  //   }));
  // }, [isMobile]);

  // Network nodes configuration
  const networkNodes = useMemo(() => {
    const nodeCount = isMobile ? 6 : 12;
    const colors = ['#60a5fa', '#a855f7', '#10b981', '#f59e0b'];
    
    return Array.from({ length: nodeCount }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 8,
      ] as [number, number, number],
      color: colors[Math.floor(Math.random() * colors.length)] || '#60a5fa',
      size: Math.random() * 0.1 + 0.1,
    }));
  }, [isMobile]);

  // Generate connections between nearby nodes
  const connections = useMemo(() => {
    if (isMobile) return []; // Skip connections on mobile for performance
    
    const connectionList: Array<{ start: [number, number, number]; end: [number, number, number] }> = [];
    
    for (let i = 0; i < networkNodes.length; i++) {
      for (let j = i + 1; j < networkNodes.length; j++) {
        const nodeI = networkNodes[i];
        const nodeJ = networkNodes[j];
        
        if (!nodeI || !nodeJ) continue;
        
        const distance = Math.sqrt(
          Math.pow(nodeI.position[0] - nodeJ.position[0], 2) +
          Math.pow(nodeI.position[1] - nodeJ.position[1], 2) +
          Math.pow(nodeI.position[2] - nodeJ.position[2], 2)
        );
        
        if (distance < 8 && connectionList.length < 15) {
          connectionList.push({
            start: nodeI.position,
            end: nodeJ.position,
          });
        }
      }
    }
    
    return connectionList;
  }, [networkNodes, isMobile]);

  return (
    <group ref={groupRef}>
      {/* Lighting setup */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#ffffff" />
      <pointLight position={[-10, -10, 5]} intensity={0.3} color="#8b5cf6" />
      <pointLight position={[0, 15, -5]} intensity={0.4} color="#06b6d4" />

      {/* Floating geometric shapes - REMOVED */}
      {/* {shapes.map((shape, index) => (
        <GeometricShape
          key={`shape-${index}`}
          position={shape.position}
          geometry={shape.geometry}
          color={shape.color}
          size={shape.size}
          rotationSpeed={shape.rotationSpeed}
        />
      ))} */}

      {/* Network nodes */}
      {networkNodes.map((node, index) => (
        <NetworkNode
          key={`node-${index}`}
          position={node.position}
          color={node.color}
          size={node.size}
        />
      ))}

      {/* Connection lines */}
      {connections.map((connection, index) => (
        <ConnectionLine
          key={`connection-${index}`}
          start={connection.start}
          end={connection.end}
        />
      ))}

      {/* Particle field for ambient effect */}
      <ParticleField count={isMobile ? 50 : 100} isMobile={isMobile} />
    </group>
  );
}

// Loading fallback
function LoadingFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/30" />
  );
}

// Main component
export function ThreeDBackgroundComplete() {
  const { isMobile, mounted } = useIsMobile();
  const [hasWebGL, setHasWebGL] = useState(true);
  const [performanceMode, setPerformanceMode] = useState(false);

  useEffect(() => {
    if (!mounted) return;

    // WebGL support check
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch (e) {
      setHasWebGL(false);
    }

    // Performance monitoring
    let frameCount = 0;
    let lastTime = performance.now();
    
    const checkPerformance = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;
        
        if (fps < 30) {
          setPerformanceMode(true);
        }
      }
      
      requestAnimationFrame(checkPerformance);
    };
    
    if (hasWebGL) {
      requestAnimationFrame(checkPerformance);
    }
  }, [mounted, hasWebGL]);

  // Always render the same structure, but conditionally render canvas content
  if (!mounted || !hasWebGL) {
    return <LoadingFallback />;
  }

  return (
    <div className="absolute inset-0 -z-10">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ 
            position: [0, 0, 12], 
            fov: isMobile ? 65 : 55,
            near: 0.1,
            far: 1000
          }}
          gl={{ 
            antialias: !isMobile && !performanceMode,
            alpha: true,
            powerPreference: isMobile ? 'low-power' : 'high-performance',
            failIfMajorPerformanceCaveat: true
          }}
          performance={{ 
            min: isMobile ? 0.2 : 0.5,
            max: isMobile ? 0.8 : 1.0,
            debounce: 200
          }}
          dpr={[1, isMobile ? 1 : 2]}
          frameloop={performanceMode ? 'demand' : 'always'}
        >
          <Scene isMobile={isMobile || performanceMode} />
        </Canvas>
      </Suspense>
      
      {/* Subtle gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/10 via-transparent to-purple-50/5 pointer-events-none" />
    </div>
  );
}
'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function RotatingBox() {
  const meshRef = useRef<any>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

export function SimpleThreeTest() {
  return (
    <div className="w-full h-64 bg-black">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <RotatingBox />
      </Canvas>
    </div>
  );
}
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Sphere, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

const HologramObject = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      // Gentle Rotation
      meshRef.current.rotation.x = t * 0.1;
      meshRef.current.rotation.y = t * 0.15;
      
      // Mouse interaction (if accessible)
      const mouseX = state.mouse.x * 0.5;
      const mouseY = state.mouse.y * 0.5;
      meshRef.current.rotation.x += mouseY * 0.02;
      meshRef.current.rotation.y += mouseX * 0.02;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 64, 64]} ref={meshRef} scale={[2.2, 2.2, 2.2]}>
        <MeshDistortMaterial
          color="#dc2626"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive="#7f1d1d"
          emissiveIntensity={0.2}
        />
      </Sphere>
      {/* Wireframe outer shell for hologram effect */}
      <Sphere args={[1.2, 32, 32]} scale={[2.3, 2.3, 2.3]}>
        {/* @ts-ignore */}
        <meshStandardMaterial
          color="#ef4444"
          wireframe
          transparent
          opacity={0.1}
        />
      </Sphere>
    </Float>
  );
};

const HeroScene: React.FC = () => {
  return (
    <div className="w-full h-[500px] md:h-[600px] lg:h-full absolute top-0 right-0 pointer-events-auto z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        {/* @ts-ignore */}
        <ambientLight intensity={0.5} />
        {/* @ts-ignore */}
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff32" />
        {/* @ts-ignore */}
        <pointLight position={[-10, -10, -5]} intensity={1} color="#ef4444" />
        
        <HologramObject />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default HeroScene;
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

// Animated floating element in 3D scene
const FloatingShape: React.FC<{
  position: [number, number, number];
  color: string;
  speed: number;
  distort: number;
  scale: number;
}> = ({ position, color, speed, distort, scale }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Rotate slowly
    meshRef.current.rotation.x += 0.005;
    meshRef.current.rotation.y += 0.01;
    
    // Follow mouse pointer slightly
    const x = (state.pointer.x * 2);
    const y = (state.pointer.y * 2);
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, position[0] + x, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, position[1] + y, 0.05);
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale * (hovered ? 1.2 : 1)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={distort}
        speed={speed}
        roughness={0.1}
        metalness={0.9}
        clearcoat={1}
      />
    </mesh>
  );
};

// Simulated silicon / FPGA chip component in 3D space
const ChipMesh: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
  });

  return (
    <group ref={ref} position={position}>
      {/* Board Base */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 0.1, 2]} />
        <meshStandardMaterial color="#0F172A" roughness={0.5} metalness={0.8} />
      </mesh>
      {/* Silicon Die */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[1, 0.12, 1]} />
        <meshStandardMaterial color="#1E293B" roughness={0.1} metalness={0.95} envMapIntensity={2} />
      </mesh>
      {/* Gold pins/connections */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[2.1, 0.05, 2.1]} />
        <meshStandardMaterial color="#F59E0B" metalness={1} roughness={0.2} />
      </mesh>
    </group>
  );
};

// Particles cloud React component
const ParticleCloud: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 300;
  
  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 15;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 15;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#4F46E5"
        size={0.06}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
      />
    </points>
  );
};

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 10, 5]} intensity={2.5} castShadow />
        <pointLight position={[-5, -5, -5]} intensity={1.5} color="#06B6D4" />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#4F46E5" />

        <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.5}>
          {/* Main dynamic orb */}
          <FloatingShape position={[2.5, 1.2, 0]} color="#4F46E5" speed={3} distort={0.4} scale={0.9} />
          {/* Secondary cyan orb */}
          <FloatingShape position={[-3, -1.5, -1]} color="#06B6D4" speed={2} distort={0.5} scale={0.7} />
          {/* Embedded/FPGA representation */}
          <ChipMesh position={[2, -1.8, 1]} />
        </Float>

        <ParticleCloud />

        <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} rotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({ position, rotation, scale, type }: any) {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.x = Math.cos(time / 4) / 8 + rotation[0];
    mesh.current.rotation.y = Math.sin(time / 4) / 8 + rotation[1];
    mesh.current.position.y = Math.sin(time / 2) / 10 + position[1];
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={mesh} position={position} rotation={rotation} scale={scale}>
        {type === "box" ? (
          <boxGeometry args={[1, 1, 1]} />
        ) : type === "torus" ? (
          <torusGeometry args={[0.5, 0.2, 16, 100]} />
        ) : (
          <octahedronGeometry args={[0.7]} />
        )}
        <meshBasicMaterial color="#C9A84C" wireframe opacity={0.3} transparent />
      </mesh>
    </Float>
  );
}

export default function ThreeBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent) => {
    setMousePos({
      x: (event.clientX / window.innerWidth - 0.5) * 2,
      y: (event.clientY / window.innerHeight - 0.5) * -2,
    });
  };

  return (
    <div className="absolute inset-0 z-0" onMouseMove={handleMouseMove}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        
        <group 
          rotation={[mousePos.y * 0.1, mousePos.x * 0.1, 0]}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
        >
          <FloatingShape position={[-2, 1, 0]} rotation={[0.5, 0.5, 0]} scale={1.2} type="torus" />
          <FloatingShape position={[2, -1, 0]} rotation={[1, 0.2, 0.5]} scale={1.5} type="box" />
          <FloatingShape position={[-1, -2, 0]} rotation={[0.2, 1, 0.8]} scale={1} type="octahedron" />
          <FloatingShape position={[2, 2, -2]} rotation={[0.5, 0.5, 0.5]} scale={0.8} type="box" />
        </group>
      </Canvas>
    </div>
  );
}

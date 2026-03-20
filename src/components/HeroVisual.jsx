import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { C } from "@/lib/theme";

function LogicSphere() {
  const meshRef = useRef();
  
  // Rotate the sphere slowly
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.1;
    meshRef.current.rotation.y = time * 0.15;
  });

  return (
    <group>
      {/* Main distorted sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial
          color={C.sage}
          speed={2}
          distort={0.4}
          radius={1}
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Floating particles/nodes */}
      <Dots count={40} />
    </group>
  );
}

function Dots({ count }) {
  const meshRef = useRef();
  const lightRef = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = THREE.MathUtils.randFloat(0, 100);
      const factor = THREE.MathUtils.randFloat(4, 12);
      const speed = THREE.MathUtils.randFloat(0.01, 0.02) / 2;
      const x = THREE.MathUtils.randFloatSpread(10);
      const y = THREE.MathUtils.randFloatSpread(10);
      const z = THREE.MathUtils.randFloatSpread(10);

      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { time, factor, speed, x, y, z } = particle;
      time = particle.time += speed;
      const t = time;
      dummy.position.set(
        x + Math.cos(t) * factor,
        y + Math.sin(t) * factor,
        z + Math.cos(t) * factor
      );
      dummy.scale.setScalar(Math.cos(t) * 0.1 + 0.15);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial color={C.sage} transparent opacity={0.4} />
    </instancedMesh>
  );
}

export default function HeroVisual() {
  return (
    <div style={{ 
      position: "absolute", 
      top: 0, 
      left: 0, 
      width: "100%", 
      height: "100%", 
      zIndex: 0,
      pointerEvents: "none"
    }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color={C.sage} />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <LogicSphere />
        </Float>
      </Canvas>
    </div>
  );
}

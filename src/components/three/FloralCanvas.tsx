"use client";

import { Canvas,useFrame } from "@react-three/fiber";
import { useMemo,useRef } from "react";
import * as THREE from "three";

// Controlled procedural 3D Rose Flower with concentric velvety petals
function ProceduralRose({
  color = "#8A182E",
  roughness = 0.35,
  petalCount = 28,
  scale = 1,
  position = [0, 0, 0] as [number, number, number],
  rotation = [0, 0, 0] as [number, number, number],
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Generate layered petal curves
  const petals = useMemo(() => {
    const list = [];
    for (let i = 0; i < petalCount; i++) {
      const radius = 0.15 + Math.pow(i / petalCount, 0.75) * 0.95;
      const angle = (i * 137.5 * Math.PI) / 180; // Golden ratio spiral
      const tilt = 0.25 + (i / petalCount) * 0.75;
      const petalScale = 0.3 + (i / petalCount) * 0.7;
      list.push({
        id: i,
        x: Math.cos(angle) * radius * 0.35,
        y: -0.1 + (i / petalCount) * 0.2,
        z: Math.sin(angle) * radius * 0.35,
        rotX: tilt * 0.8,
        rotY: angle + Math.PI / 2,
        rotZ: (Math.sin(i) * 0.15),
        scale: petalScale,
      });
    }
    return list;
  }, [petalCount]);

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {petals.map((p) => (
        <mesh
          key={p.id}
          position={[p.x, p.y, p.z]}
          rotation={[p.rotX, p.rotY, p.rotZ]}
          scale={[p.scale, p.scale * 1.2, p.scale * 0.8]}
        >
          <sphereGeometry args={[0.32, 16, 16, 0, Math.PI * 1.2, 0, Math.PI * 0.8]} />
          <meshStandardMaterial
            color={color}
            roughness={roughness}
            metalness={0.08}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      {/* Rose Center Heart */}
      <mesh position={[0, -0.05, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
    </group>
  );
}

// Eucalyptus sprig with silver-green rounded leaves
function EucalyptusStem({ position = [0, 0, 0] as [number, number, number], rotation = [0, 0, 0] as [number, number, number] }) {
  const leaves = useMemo(() => {
    return [-1.2, -0.8, -0.4, 0, 0.4, 0.8, 1.2].map((y, idx) => ({
      y,
      rot: (idx % 2 === 0 ? 1 : -1) * 0.6,
      scale: 0.35 - Math.abs(y) * 0.08,
    }));
  }, []);

  return (
    <group position={position} rotation={rotation}>
      {/* Stem */}
      <mesh>
        <cylinderGeometry args={[0.02, 0.03, 3, 8]} />
        <meshStandardMaterial color="#2D4A38" roughness={0.7} />
      </mesh>
      {/* Leaves */}
      {leaves.map((l, i) => (
        <mesh key={i} position={[l.rot > 0 ? 0.25 : -0.25, l.y, 0]} rotation={[0.2, l.rot, 0.3]} scale={l.scale}>
          <circleGeometry args={[0.5, 20]} />
          <meshStandardMaterial color="#6E8E7A" roughness={0.6} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

function FloralBouquet({ scrollProgress }: { scrollProgress: number }) {
  const bouquetRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!bouquetRef.current) return;
    const t = state.clock.getElapsedTime();

    // Subtle, controlled floating motion (Rule #7: "Movement should be extremely controlled. No constant exaggerated rotation.")
    bouquetRef.current.position.y = Math.sin(t * 0.8) * 0.06 - scrollProgress * 0.8;
    bouquetRef.current.position.z = scrollProgress * 3.2; // Camera/Rose approach on scroll (Rule #8)
    bouquetRef.current.rotation.y = Math.sin(t * 0.4) * 0.05 + scrollProgress * 0.2;
    bouquetRef.current.rotation.x = Math.cos(t * 0.5) * 0.03;
  });

  return (
    <group ref={bouquetRef} position={[0, -0.1, 0]}>
      {/* Primary Deep Red Rose (Hero centerpiece that moves forward) */}
      <ProceduralRose
        color="#7A1828"
        roughness={0.3}
        scale={1.25}
        position={[0, 0.1, 0.35]}
        rotation={[0.35, 0.1, -0.05]}
      />

      {/* Elegant Pure White Rose */}
      <ProceduralRose
        color="#F8F6F0"
        roughness={0.4}
        scale={1.05}
        position={[-0.85, -0.15, 0]}
        rotation={[0.2, 0.6, 0.3]}
      />

      {/* Romantic Dusty Rose accent bloom */}
      <ProceduralRose
        color="#B96D7C"
        roughness={0.35}
        scale={0.9}
        position={[0.8, -0.2, -0.1]}
        rotation={[0.4, -0.5, -0.2]}
      />

      {/* Eucalyptus sprigs on left and right */}
      <EucalyptusStem position={[-1.1, 0.4, -0.4]} rotation={[0.3, 0.2, -0.5]} />
      <EucalyptusStem position={[1.05, 0.3, -0.5]} rotation={[-0.2, -0.3, 0.45]} />

      {/* Botanical leaves around bouquet base */}
      <mesh position={[0, -0.85, -0.1]} rotation={[0.9, 0, 0]}>
        <coneGeometry args={[1.4, 0.8, 6]} />
        <meshStandardMaterial color="#1F3D2A" roughness={0.7} />
      </mesh>
    </group>
  );
}

interface FloralCanvasProps {
  scrollProgress: number;
}

export default function FloralCanvas({ scrollProgress }: FloralCanvasProps) {
  return (
    <div className="w-full h-full relative pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.75]}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 5, 4]} intensity={1.4} color="#FFF8EE" />
        <directionalLight position={[-4, -2, -2]} intensity={0.4} color="#C98E98" />
        <pointLight position={[0, 2, 2]} intensity={0.8} color="#FFEDD5" />

        <FloralBouquet scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}

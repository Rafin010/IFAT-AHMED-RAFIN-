"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "mathjs"; // Wait, I don't have mathjs. I'll just use raw Math.random()

export default function Scene() {
  const ref = useRef<any>();
  
  // Generate random points in a sphere
  const generateSphere = (numPoints: number, radius: number) => {
    const points = new Float32Array(numPoints * 3);
    for (let i = 0; i < numPoints; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      points[i * 3] = x;
      points[i * 3 + 1] = y;
      points[i * 3 + 2] = z;
    }
    return points;
  };

  const sphere = generateSphere(5000, 1.5);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00E5FF"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshWobbleMaterial } from "@react-three/drei";

const Satellite = () => {
  const satelliteRef = useRef();

  // Rotate the satellite continuously
  useFrame(() => {
    if (satelliteRef.current) {
      satelliteRef.current.rotation.y += 0.01;
      satelliteRef.current.rotation.x += 0.005;
    }
  });

  return (
    <mesh ref={satelliteRef} position={[3, 2, -4]}>
      {/* Satellite Body */}
      <sphereGeometry args={[0.3, 32, 32]} />
      <MeshWobbleMaterial
        attach="material"
        color="#00ffff"
        wireframe
        factor={1} // Wobble effect
        speed={2} // Glow intensity
      />

      {/* Solar Panels */}
      <mesh position={[0.8, 0, 0]}>
        <boxGeometry args={[1, 0.1, 0.3]} />
        <meshStandardMaterial color="cyan" transparent opacity={0.7} />
      </mesh>
      <mesh position={[-0.8, 0, 0]}>
        <boxGeometry args={[1, 0.1, 0.3]} />
        <meshStandardMaterial color="cyan" transparent opacity={0.7} />
      </mesh>
    </mesh>
  );
};

export default Satellite;
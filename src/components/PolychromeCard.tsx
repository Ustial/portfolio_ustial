import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import '../threeExtensions';

const PolychromeMesh = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value += delta;
      const mx = state.mouse.x * 0.5 + 0.5;
      const my = state.mouse.y * 0.5 + 0.5;
      materialRef.current.uniforms.uMouse.value.set(mx, my);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[1.5, 2, 32, 32]} />
      <polychromeMaterial ref={materialRef} />
    </mesh>
  );
};

export const PolychromeCard = () => {
  return (
    <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <PolychromeMesh />
    </Canvas>
  );
};

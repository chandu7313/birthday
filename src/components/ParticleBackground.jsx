import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = ({ count = 3000 }) => {
  const points = useRef();
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const r = 15 * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Parallax mouse effect
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 2, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 2, 0.05);
    state.camera.lookAt(0, 0, 0);

    if (points.current) {
        points.current.rotation.y = t * 0.05;
        points.current.rotation.z = t * 0.02;
    }
  });

  return (
    <group>
      {/* Pink / Purple particles */}
      <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
          <PointMaterial 
              transparent 
              color="#b026ff" 
              size={0.06} 
              sizeAttenuation={true} 
              depthWrite={false} 
              blending={THREE.AdditiveBlending}
          />
      </Points>
    </group>
  );
};

const ParticleBackground = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      {/* Dynamic gradient overlay for extra "wave" feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a001a]/80 via-transparent to-[#001122]/80 z-[-1]" />
      
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <fog attach="fog" args={['#030005', 3, 15]} />
        <Stars 
            radius={100} 
            depth={50} 
            count={5000} 
            factor={6} 
            saturation={1} 
            fade 
            speed={1.5} 
        />
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;

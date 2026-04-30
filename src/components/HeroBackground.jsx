import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

function StarField({ isDarkMode }) {
  const groupRef = useRef();
  const { size, viewport } = useThree();

  // Generate particles once
  const sphere = useMemo(
    () => random.inSphere(new Float32Array(6000 * 3), { radius: 1.5 }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Slow base rotation
    groupRef.current.rotation.x = t * 0.04;
    groupRef.current.rotation.y = t * 0.06;

    // Mouse-driven tilt — particles lean toward cursor
    const { x, y } = state.mouse; // normalized -1..1
    groupRef.current.rotation.x += y * 0.15;
    groupRef.current.rotation.y += x * 0.15;
  });

  return (
    <group ref={groupRef}>
      <Points positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={isDarkMode ? '#ffffff' : '#3b82f6'}
          size={0.006}
          sizeAttenuation
          depthWrite={false}
          opacity={isDarkMode ? 0.55 : 0.9}
        />
      </Points>
    </group>
  );
}

export default function HeroBackground({ isDarkMode }) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <StarField isDarkMode={isDarkMode} />
      </Canvas>
    </div>
  );
}

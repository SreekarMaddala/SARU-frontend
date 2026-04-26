import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Stars } from '@react-three/drei';

function MovingNodes() {
  const group = useRef();

  useFrame((state) => {
    group.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <group ref={group}>
      {/* Central "Insight" Core */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 64, 64]} scale={1.5}>
          <MeshDistortMaterial
            color="#00aba9"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            emissive="#00aba9"
            emissiveIntensity={0.5}
          />
        </Sphere>
      </Float>

      {/* Orbiting Data Nodes */}
      {Array.from({ length: 15 }).map((_, i) => {
        const radius = 3 + Math.random() * 4;
        const angle = (i / 15) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 4;

        return (
          <Float
            key={i}
            speed={1 + Math.random()}
            rotationIntensity={1.5}
            floatIntensity={1.5}
            position={[x, y, z]}
          >
            <Sphere args={[0.1, 16, 16]}>
              <meshStandardMaterial
                color={Math.random() > 0.5 ? '#00ffff' : '#b2d8d8'}
                emissive={Math.random() > 0.5 ? '#00ffff' : '#b2d8d8'}
                emissiveIntensity={0.8}
              />
            </Sphere>
          </Float>
        );
      })}
    </group>
  );
}

export default function Hero3DScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#00ffff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#069494" />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <MovingNodes />
    </>
  );
}

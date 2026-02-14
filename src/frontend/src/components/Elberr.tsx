import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';
import * as THREE from 'three';

export function Elberr() {
  const groupRef = useRef<THREE.Group>(null);
  const [position, setPosition] = useState<[number, number, number]>([-5, 0, -5]);
  
  const [bodyRef] = useBox(() => ({
    type: 'Static',
    position: position,
    args: [0.5, 2, 0.5]
  }));

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh ref={bodyRef} castShadow>
        <boxGeometry args={[0.5, 2, 0.5]} />
        <meshStandardMaterial color="#666666" metalness={0.8} roughness={0.2} />
      </mesh>

      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#555555" metalness={0.7} roughness={0.3} />
      </mesh>

      <mesh position={[-0.15, 1.3, 0.25]} castShadow>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#000000" emissive="#ff0000" emissiveIntensity={0.5} />
      </mesh>

      <mesh position={[0.15, 1.3, 0.25]} castShadow>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#000000" emissive="#ff0000" emissiveIntensity={0.5} />
      </mesh>

      <mesh position={[-0.3, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 1.5, 8]} />
        <meshStandardMaterial color="#777777" metalness={0.6} roughness={0.4} />
      </mesh>

      <mesh position={[0.3, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 1.5, 8]} />
        <meshStandardMaterial color="#777777" metalness={0.6} roughness={0.4} />
      </mesh>

      <mesh position={[-0.3, -0.3, 0]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#cccc00" roughness={0.8} />
      </mesh>

      <mesh position={[0.3, -0.3, 0]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#cccc00" roughness={0.8} />
      </mesh>
    </group>
  );
}

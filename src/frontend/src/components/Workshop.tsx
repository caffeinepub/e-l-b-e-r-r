import { useBox } from '@react-three/cannon';

export function Workshop() {
  const [floorRef] = useBox(() => ({
    type: 'Static',
    position: [0, -0.5, 0],
    args: [20, 1, 20]
  }));

  const [wall1Ref] = useBox(() => ({
    type: 'Static',
    position: [0, 2.5, -10],
    args: [20, 5, 1]
  }));

  const [wall2Ref] = useBox(() => ({
    type: 'Static',
    position: [0, 2.5, 10],
    args: [20, 5, 1]
  }));

  const [wall3Ref] = useBox(() => ({
    type: 'Static',
    position: [-10, 2.5, 0],
    args: [1, 5, 20]
  }));

  const [wall4Ref] = useBox(() => ({
    type: 'Static',
    position: [10, 2.5, 0],
    args: [1, 5, 20]
  }));

  return (
    <>
      <mesh ref={floorRef} receiveShadow>
        <boxGeometry args={[20, 1, 20]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>

      <mesh ref={wall1Ref} receiveShadow castShadow>
        <boxGeometry args={[20, 5, 1]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.9} />
      </mesh>

      <mesh ref={wall2Ref} receiveShadow castShadow>
        <boxGeometry args={[20, 5, 1]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.9} />
      </mesh>

      <mesh ref={wall3Ref} receiveShadow castShadow>
        <boxGeometry args={[1, 5, 20]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.9} />
      </mesh>

      <mesh ref={wall4Ref} receiveShadow castShadow>
        <boxGeometry args={[1, 5, 20]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.9} />
      </mesh>
    </>
  );
}

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import * as THREE from 'three';

interface PlayerProps {
  movement: { x: number; y: number };
  look: { dx: number; dy: number };
  actions: { interact: boolean; sprint: boolean; crouch: boolean };
  controlsRef: React.RefObject<any>;
}

export function Player({ movement, look, actions, controlsRef }: PlayerProps) {
  const [ref, api] = useSphere(() => ({
    mass: 80,
    type: 'Dynamic',
    position: [0, 1.6, 5],
    args: [0.5],
    fixedRotation: true
  }));

  const velocity = useRef([0, 0, 0]);
  const rotation = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!controlsRef.current) return;

    const camera = state.camera;
    const speed = actions.sprint ? 8 : 4;

    rotation.current.y -= look.dx * 0.002;
    rotation.current.x -= look.dy * 0.002;
    rotation.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotation.current.x));

    camera.rotation.set(rotation.current.x, rotation.current.y, 0, 'YXZ');

    const direction = new THREE.Vector3();
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);

    forward.y = 0;
    right.y = 0;
    forward.normalize();
    right.normalize();

    direction.addScaledVector(forward, movement.y);
    direction.addScaledVector(right, movement.x);

    if (direction.length() > 0) {
      direction.normalize();
    }

    velocity.current[0] = direction.x * speed;
    velocity.current[2] = direction.z * speed;

    api.velocity.set(velocity.current[0], velocity.current[1], velocity.current[2]);

    const position = new THREE.Vector3();
    if (ref.current) {
      position.copy(ref.current.position);
      camera.position.copy(position);
      camera.position.y += actions.crouch ? 0.8 : 1.6;
    }
  });

  return <mesh ref={ref} />;
}

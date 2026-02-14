import { useRef } from 'react';
import type { InputSource, NormalizedInput } from './types';

export function useTouchInput(): InputSource & {
  setMovement: (x: number, y: number) => void;
  setLook: (dx: number, dy: number) => void;
  setAction: (action: 'interact' | 'sprint' | 'crouch', pressed: boolean) => void;
} {
  const movement = useRef({ x: 0, y: 0 });
  const lookDelta = useRef({ dx: 0, dy: 0 });
  const actions = useRef({ interact: false, sprint: false, crouch: false });

  return {
    getInput: (): NormalizedInput => {
      const look = { ...lookDelta.current };
      lookDelta.current = { dx: 0, dy: 0 };

      return {
        movement: { ...movement.current },
        look,
        actions: { ...actions.current }
      };
    },
    reset: () => {
      movement.current = { x: 0, y: 0 };
      lookDelta.current = { dx: 0, dy: 0 };
      actions.current = { interact: false, sprint: false, crouch: false };
    },
    setMovement: (x: number, y: number) => {
      movement.current = { x, y };
    },
    setLook: (dx: number, dy: number) => {
      lookDelta.current.dx += dx;
      lookDelta.current.dy += dy;
    },
    setAction: (action: 'interact' | 'sprint' | 'crouch', pressed: boolean) => {
      actions.current[action] = pressed;
    }
  };
}

import { useEffect, useRef } from 'react';
import type { InputSource, NormalizedInput } from './types';

export function useKeyboardMouseInput(controlsRef: React.RefObject<any>): InputSource {
  const keysPressed = useRef<Set<string>>(new Set());
  const lookDelta = useRef({ dx: 0, dy: 0 });
  const actions = useRef({ interact: false, sprint: false, crouch: false });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.code);
      
      if (e.code === 'KeyE') actions.current.interact = true;
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') actions.current.sprint = true;
      if (e.code === 'KeyC' || e.code === 'ControlLeft') actions.current.crouch = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.code);
      
      if (e.code === 'KeyE') actions.current.interact = false;
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') actions.current.sprint = false;
      if (e.code === 'KeyC' || e.code === 'ControlLeft') actions.current.crouch = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (controlsRef.current?.isLocked) {
        lookDelta.current.dx += e.movementX;
        lookDelta.current.dy += e.movementY;
      }
    };

    const handleBlur = () => {
      keysPressed.current.clear();
      actions.current = { interact: false, sprint: false, crouch: false };
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('blur', handleBlur);
    };
  }, [controlsRef]);

  return {
    getInput: (): NormalizedInput => {
      const keys = keysPressed.current;
      let x = 0;
      let y = 0;

      if (keys.has('KeyW') || keys.has('ArrowUp')) y += 1;
      if (keys.has('KeyS') || keys.has('ArrowDown')) y -= 1;
      if (keys.has('KeyA') || keys.has('ArrowLeft')) x -= 1;
      if (keys.has('KeyD') || keys.has('ArrowRight')) x += 1;

      const length = Math.sqrt(x * x + y * y);
      if (length > 0) {
        x /= length;
        y /= length;
      }

      const look = { ...lookDelta.current };
      lookDelta.current = { dx: 0, dy: 0 };

      return {
        movement: { x, y },
        look,
        actions: { ...actions.current }
      };
    },
    reset: () => {
      keysPressed.current.clear();
      lookDelta.current = { dx: 0, dy: 0 };
      actions.current = { interact: false, sprint: false, crouch: false };
    }
  };
}

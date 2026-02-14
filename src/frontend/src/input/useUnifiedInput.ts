import { useEffect } from 'react';
import { useKeyboardMouseInput } from './keyboardMouseInput';
import { useTouchInput } from './touchInput';
import type { NormalizedInput } from './types';
import { touchInputBridge } from './touchInputBridge';

export function useUnifiedInput(controlsRef: React.RefObject<any>) {
  const keyboardMouse = useKeyboardMouseInput(controlsRef);
  const touch = useTouchInput();

  useEffect(() => {
    touchInputBridge.setTouchInput(touch);
    return () => {
      touchInputBridge.setTouchInput(null);
    };
  }, [touch]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        keyboardMouse.reset();
        touch.reset();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [keyboardMouse, touch]);

  const getUnifiedInput = (): NormalizedInput => {
    const kbInput = keyboardMouse.getInput();
    const touchInput = touch.getInput();

    return {
      movement: {
        x: kbInput.movement.x || touchInput.movement.x,
        y: kbInput.movement.y || touchInput.movement.y
      },
      look: {
        dx: kbInput.look.dx + touchInput.look.dx,
        dy: kbInput.look.dy + touchInput.look.dy
      },
      actions: {
        interact: kbInput.actions.interact || touchInput.actions.interact,
        sprint: kbInput.actions.sprint || touchInput.actions.sprint,
        crouch: kbInput.actions.crouch || touchInput.actions.crouch
      }
    };
  };

  const input = getUnifiedInput();

  return {
    movement: input.movement,
    look: input.look,
    actions: input.actions,
    reset: () => {
      keyboardMouse.reset();
      touch.reset();
    }
  };
}

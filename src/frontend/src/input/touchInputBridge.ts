import type { useTouchInput } from './touchInput';

type TouchInput = ReturnType<typeof useTouchInput>;

class TouchInputBridge {
  private touchInput: TouchInput | null = null;

  setTouchInput(input: TouchInput | null) {
    this.touchInput = input;
  }

  setMovement(x: number, y: number) {
    this.touchInput?.setMovement(x, y);
  }

  setLook(dx: number, dy: number) {
    this.touchInput?.setLook(dx, dy);
  }

  setAction(action: 'interact' | 'sprint' | 'crouch', pressed: boolean) {
    this.touchInput?.setAction(action, pressed);
  }
}

export const touchInputBridge = new TouchInputBridge();

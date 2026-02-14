import { useEffect, useRef } from 'react';
import { touchInputBridge } from '../../input/touchInputBridge';
import { useControlsSettings } from '../../settings/useControlsSettings';

interface TouchLookAreaProps {
  className?: string;
}

export function TouchLookArea({ className = '' }: TouchLookAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activePointer = useRef<number | null>(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const { settings } = useControlsSettings();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return;
      if (activePointer.current !== null) return;

      activePointer.current = e.pointerId;
      container.setPointerCapture(e.pointerId);
      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerId !== activePointer.current) return;

      const dx = (e.clientX - lastPos.current.x) * settings.touchLookSensitivity;
      const dy = (e.clientY - lastPos.current.y) * settings.touchLookSensitivity;

      touchInputBridge.setLook(dx, dy);

      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (e.pointerId !== activePointer.current) return;

      container.releasePointerCapture(e.pointerId);
      activePointer.current = null;
    };

    container.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('pointercancel', handlePointerUp);

    return () => {
      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [settings.touchLookSensitivity]);

  return (
    <div
      ref={containerRef}
      className={`${className}`}
      style={{ touchAction: 'none' }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-white/20 text-sm font-mono">LOOK</div>
      </div>
    </div>
  );
}

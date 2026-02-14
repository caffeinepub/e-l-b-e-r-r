import { useEffect, useRef, useState } from 'react';
import { touchInputBridge } from '../../input/touchInputBridge';

interface VirtualJoystickProps {
  className?: string;
}

export function VirtualJoystick({ className = '' }: VirtualJoystickProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const activePointer = useRef<number | null>(null);
  const startPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return;
      if (activePointer.current !== null) return;

      activePointer.current = e.pointerId;
      container.setPointerCapture(e.pointerId);

      const rect = container.getBoundingClientRect();
      startPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };

      setActive(true);
      setPosition({ x: 0, y: 0 });
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerId !== activePointer.current) return;

      const rect = container.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      let dx = (e.clientX - rect.left) - startPos.current.x;
      let dy = (e.clientY - rect.top) - startPos.current.y;

      const maxDistance = Math.min(centerX, centerY) * 0.6;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > maxDistance) {
        dx = (dx / distance) * maxDistance;
        dy = (dy / distance) * maxDistance;
      }

      setPosition({ x: dx, y: dy });

      const normalizedX = dx / maxDistance;
      const normalizedY = -dy / maxDistance;

      touchInputBridge.setMovement(normalizedX, normalizedY);
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (e.pointerId !== activePointer.current) return;

      container.releasePointerCapture(e.pointerId);
      activePointer.current = null;
      setActive(false);
      setPosition({ x: 0, y: 0 });
      touchInputBridge.setMovement(0, 0);
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
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-32 h-32 ${className}`}
      style={{ touchAction: 'none' }}
    >
      <div className="absolute inset-0 rounded-full bg-white/10 border-2 border-white/20" />
      <div
        className={`absolute top-1/2 left-1/2 w-12 h-12 -mt-6 -ml-6 rounded-full transition-colors ${
          active ? 'bg-red-500/60' : 'bg-white/30'
        } border-2 border-white/40`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />
    </div>
  );
}

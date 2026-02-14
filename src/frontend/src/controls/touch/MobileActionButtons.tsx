import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { touchInputBridge } from '../../input/touchInputBridge';

interface ActionButtonProps {
  action: 'interact' | 'sprint' | 'crouch';
  label: string;
  className?: string;
}

function ActionButton({ action, label, className = '' }: ActionButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const activePointer = useRef<number | null>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return;
      if (activePointer.current !== null) return;

      e.preventDefault();
      activePointer.current = e.pointerId;
      button.setPointerCapture(e.pointerId);
      touchInputBridge.setAction(action, true);
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (e.pointerId !== activePointer.current) return;

      button.releasePointerCapture(e.pointerId);
      activePointer.current = null;
      touchInputBridge.setAction(action, false);
    };

    button.addEventListener('pointerdown', handlePointerDown);
    button.addEventListener('pointerup', handlePointerUp);
    button.addEventListener('pointercancel', handlePointerUp);

    return () => {
      button.removeEventListener('pointerdown', handlePointerDown);
      button.removeEventListener('pointerup', handlePointerUp);
      button.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [action]);

  return (
    <Button
      ref={buttonRef}
      variant="secondary"
      size="lg"
      className={`min-w-[60px] min-h-[60px] bg-white/20 hover:bg-white/30 border-2 border-white/40 text-white font-bold ${className}`}
      style={{ touchAction: 'none' }}
    >
      {label}
    </Button>
  );
}

export function MobileActionButtons() {
  return (
    <div className="flex flex-col gap-3">
      <ActionButton action="interact" label="USE" />
      <ActionButton action="sprint" label="RUN" />
      <ActionButton action="crouch" label="HIDE" />
    </div>
  );
}

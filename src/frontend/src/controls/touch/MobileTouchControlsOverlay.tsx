import { VirtualJoystick } from './VirtualJoystick';
import { TouchLookArea } from './TouchLookArea';
import { MobileActionButtons } from './MobileActionButtons';
import { useControlsSettings } from '../../settings/useControlsSettings';

export function MobileTouchControlsOverlay() {
  const { settings } = useControlsSettings();

  if (!settings.showMobileControls) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div className="absolute bottom-8 left-8 pointer-events-auto">
        <VirtualJoystick />
      </div>

      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-auto">
        <TouchLookArea className="w-full h-full" />
      </div>

      <div className="absolute bottom-8 right-8 pointer-events-auto">
        <MobileActionButtons />
      </div>
    </div>
  );
}

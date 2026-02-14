import { useState } from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useControlsSettings } from '../settings/useControlsSettings';

export function ControlsSettingsPanel() {
  const { settings, updateSettings } = useControlsSettings();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="fixed top-4 right-4 z-50 bg-white/10 hover:bg-white/20 border border-white/20"
        >
          <Settings className="h-5 w-5 text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-black/95 border-white/20 text-white">
        <SheetHeader>
          <SheetTitle className="text-white">Controls Settings</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="mobile-controls" className="text-white">
              Show Mobile Controls
            </Label>
            <Switch
              id="mobile-controls"
              checked={settings.showMobileControls}
              onCheckedChange={(checked) => updateSettings({ showMobileControls: checked })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sensitivity" className="text-white">
              Touch Look Sensitivity: {settings.touchLookSensitivity.toFixed(2)}
            </Label>
            <Slider
              id="sensitivity"
              min={0.1}
              max={2.0}
              step={0.1}
              value={[settings.touchLookSensitivity]}
              onValueChange={([value]) => updateSettings({ touchLookSensitivity: value })}
              className="w-full"
            />
          </div>

          <div className="pt-4 border-t border-white/20 text-sm text-white/60 space-y-2">
            <p><strong>Desktop Controls:</strong></p>
            <p>WASD - Move</p>
            <p>Mouse - Look</p>
            <p>E - Interact/Use</p>
            <p>Shift - Sprint</p>
            <p>C - Crouch/Hide</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

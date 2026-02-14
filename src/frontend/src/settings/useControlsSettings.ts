import { useState, useCallback, useEffect } from 'react';
import { loadControlsSettings, saveControlsSettings, type ControlsSettings } from './controlsSettings';

export function useControlsSettings() {
  const [settings, setSettings] = useState<ControlsSettings>(loadControlsSettings);

  useEffect(() => {
    setSettings(loadControlsSettings());
  }, []);

  const updateSettings = useCallback((updates: Partial<ControlsSettings>) => {
    setSettings(prev => {
      const newSettings = { ...prev, ...updates };
      saveControlsSettings(newSettings);
      return newSettings;
    });
  }, []);

  return {
    settings,
    updateSettings
  };
}

const STORAGE_KEY = 'elberr_controls_settings';

export interface ControlsSettings {
  showMobileControls: boolean;
  touchLookSensitivity: number;
}

const DEFAULT_SETTINGS: ControlsSettings = {
  showMobileControls: typeof window !== 'undefined' && 'ontouchstart' in window,
  touchLookSensitivity: 0.5
};

export function loadControlsSettings(): ControlsSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.warn('Failed to load controls settings:', e);
  }
  return DEFAULT_SETTINGS;
}

export function saveControlsSettings(settings: ControlsSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.warn('Failed to save controls settings:', e);
  }
}

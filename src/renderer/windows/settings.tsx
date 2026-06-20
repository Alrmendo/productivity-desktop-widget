import { StrictMode, useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import SettingsWindow from '../components/SettingsWindow';
import WindowFrame from '../components/WindowFrame';
import { WidgetSettings } from '../types';
import { debounce } from '../lib/debounce';
import '../index.css';

// Fields the user types into continuously — writing to disk on every
// keystroke would thrash the store file and broadcast IPC on every char.
const DEBOUNCED_SETTINGS_KEYS = new Set<keyof WidgetSettings>([
  'username',
  'pomodoroWorkTime',
  'pomodoroBreakTime',
]);

function SettingsWindowEntry() {
  const [settings, setSettings] = useState<WidgetSettings>({
    autoStart: false,
    defaultPosition: 'top-right',
    pomodoroWorkTime: 25,
    pomodoroBreakTime: 5,
    soundEnabled: true,
    alwaysOnTop: true,
    username: '',
  });

  useEffect(() => {
    window.electronAPI.store.get('settings').then(setSettings);
    return window.electronAPI.store.subscribe('settings', setSettings);
  }, []);

  const debouncedPersist = useMemo(
    () => debounce((next: WidgetSettings) => window.electronAPI.store.set('settings', next), 400),
    []
  );

  const handleUpdateSettings = (updates: Partial<WidgetSettings>) => {
    const next = { ...settings, ...updates };
    setSettings(next);

    const shouldDebounce = Object.keys(updates).some(key =>
      DEBOUNCED_SETTINGS_KEYS.has(key as keyof WidgetSettings)
    );
    if (shouldDebounce) {
      debouncedPersist(next);
    } else {
      window.electronAPI.store.set('settings', next);
    }
  };

  return (
    <WindowFrame title="CÀI ĐẶT HỆ THỐNG" onClose={() => window.electronAPI.closeWindow()}>
      <SettingsWindow settings={settings} onUpdateSettings={handleUpdateSettings} />
    </WindowFrame>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsWindowEntry />
  </StrictMode>,
);

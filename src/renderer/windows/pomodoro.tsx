import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import PomodoroTimer from '../components/PomodoroTimer';
import WindowFrame from '../components/WindowFrame';
import { WidgetSettings } from '../types';
import '../index.css';

function PomodoroWindow() {
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

  const [pomodoroState, setPomodoroState] = useState({
    minutes: settings.pomodoroWorkTime,
    seconds: 0,
    isActive: false,
    mode: 'work' as 'work' | 'break',
  });

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (pomodoroState.isActive) {
      interval = setInterval(() => {
        setPomodoroState(prev => {
          if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 };
          }
          if (prev.minutes > 0) {
            return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
          }
          if (settings.soundEnabled) {
            try {
              const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-500.wav');
              audio.volume = 0.4;
              audio.play();
            } catch (e) {
              console.log('Audio playback simulation failed.');
            }
          }
          const nextMode = prev.mode === 'work' ? 'break' : 'work';
          return {
            mode: nextMode,
            isActive: false,
            minutes: nextMode === 'work' ? settings.pomodoroWorkTime : settings.pomodoroBreakTime,
            seconds: 0,
          };
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [pomodoroState.isActive, settings]);

  const handleTogglePomodoro = () => {
    setPomodoroState(prev => ({ ...prev, isActive: !prev.isActive }));
  };

  const handleResetPomodoro = () => {
    setPomodoroState(prev => ({
      ...prev,
      isActive: false,
      minutes: prev.mode === 'work' ? settings.pomodoroWorkTime : settings.pomodoroBreakTime,
      seconds: 0,
    }));
  };

  const handleSetMode = (mode: 'work' | 'break') => {
    setPomodoroState({
      mode,
      isActive: false,
      minutes: mode === 'work' ? settings.pomodoroWorkTime : settings.pomodoroBreakTime,
      seconds: 0,
    });
  };

  return (
    <WindowFrame title="POMODORO TIMER" onClose={() => window.electronAPI.closeWindow()}>
      <PomodoroTimer
        pomodoroState={pomodoroState}
        settings={settings}
        onTogglePomodoro={handleTogglePomodoro}
        onResetPomodoro={handleResetPomodoro}
        onSetMode={handleSetMode}
      />
    </WindowFrame>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PomodoroWindow />
  </StrictMode>,
);

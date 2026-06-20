import React, { useState, useEffect } from 'react';
import MainCard from './MainCard';
import { Task, DailyLog, WidgetSettings } from '../types';

export default function DesktopWorkspace() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [streak, setStreak] = useState(0);
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
    window.electronAPI.store.get('tasks').then(setTasks);
    window.electronAPI.store.get('logs').then(setLogs);
    window.electronAPI.store.get('streak').then(setStreak);
    window.electronAPI.store.get('settings').then(setSettings);

    const unsubTasks = window.electronAPI.store.subscribe('tasks', setTasks);
    const unsubLogs = window.electronAPI.store.subscribe('logs', setLogs);
    const unsubStreak = window.electronAPI.store.subscribe('streak', setStreak);
    const unsubSettings = window.electronAPI.store.subscribe('settings', setSettings);
    return () => {
      unsubTasks();
      unsubLogs();
      unsubStreak();
      unsubSettings();
    };
  }, []);

  // --- Track which feature windows are currently open (for MainCard highlighting) ---
  const [openWindows, setOpenWindows] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    return window.electronAPI.onFeatureWindowState(setOpenWindows);
  }, []);

  const handleToggleWindow = (windowId: string) => {
    window.electronAPI.toggleFeatureWindow(windowId);
  };

  // --- Central Pomodoro Countdown Engine ---
  const [pomodoroState, setPomodoroState] = useState({
    minutes: settings.pomodoroWorkTime,
    seconds: 0,
    isActive: false,
    mode: 'work' as 'work' | 'break',
  });

  // Sync settings work time/break time with pomodoroState when settings change unless timer is active
  useEffect(() => {
    if (!pomodoroState.isActive) {
      setPomodoroState(prev => ({
        ...prev,
        minutes: prev.mode === 'work' ? settings.pomodoroWorkTime : settings.pomodoroBreakTime,
        seconds: 0
      }));
    }
  }, [settings.pomodoroWorkTime, settings.pomodoroBreakTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (pomodoroState.isActive) {
      interval = setInterval(() => {
        if (pomodoroState.seconds > 0) {
          setPomodoroState(prev => ({ ...prev, seconds: prev.seconds - 1 }));
        } else if (pomodoroState.minutes > 0) {
          setPomodoroState(prev => ({ ...prev, minutes: prev.minutes - 1, seconds: 59 }));
        } else {
          // Timer finished a block!
          if (settings.soundEnabled) {
            try {
              const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-500.wav');
              audio.volume = 0.4;
              audio.play();
            } catch (e) {
              console.log('Audio playback simulation failed.');
            }
          }

          if (pomodoroState.mode === 'work') {
            setPomodoroState({
              minutes: settings.pomodoroBreakTime,
              seconds: 0,
              isActive: false, // pause for user review
              mode: 'break',
            });
            // Auto record work block to logs!
            const logEntryForm: DailyLog = {
              id: Date.now().toString(),
              date: new Date().toISOString().split('T')[0],
              activity: `Hoàn tất chu kỳ Pomodoro tập trung`,
              durationMinutes: settings.pomodoroWorkTime,
              category: 'Work' as const,
            };
            setLogs(prev => {
              const next = [...prev, logEntryForm];
              window.electronAPI.store.set('logs', next);
              return next;
            });
            alert('🎉 Chúc mừng! Bạn đã hoàn thành chu kỳ tập trung. Hãy nghỉ ngơi thôi!');
          } else {
            setPomodoroState({
              minutes: settings.pomodoroWorkTime,
              seconds: 0,
              isActive: false,
              mode: 'work',
            });
            alert('⏳ Hết thời gian nghỉ ngơi! Sẵn sàng tập trung tiếp thôi.');
          }
        }
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [pomodoroState.isActive, pomodoroState.minutes, pomodoroState.seconds, pomodoroState.mode, settings]);

  const handleTogglePomodoro = () => {
    setPomodoroState(prev => ({ ...prev, isActive: !prev.isActive }));
  };

  // Computations
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="relative w-full select-none text-[#1A1A1B]">
      <MainCard
        completedTasks={completedTasks}
        totalTasks={totalTasks}
        pomodoroState={pomodoroState}
        streak={streak}
        settings={settings}
        onTogglePomodoro={handleTogglePomodoro}
        onToggleWindow={handleToggleWindow}
        openWindows={openWindows}
      />
    </div>
  );
}

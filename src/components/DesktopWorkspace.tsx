import React, { useState, useEffect } from 'react';
import MainCard from './MainCard';
import FeaturePanel, { FeaturePanelId } from './FeaturePanel';
import { Task, Note, DailyLog, WidgetSettings } from '../types';

export default function DesktopWorkspace() {
  // --- Seed Mock database for initial premium state ---
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Thiết kế giao diện Widget overlay', completed: true, createdAt: new Date().toISOString() },
    { id: '2', text: 'Viết Pomodoro countdown', completed: true, createdAt: new Date().toISOString() },
    { id: '3', text: 'Tách tệp components React cho Electron', completed: false, createdAt: new Date().toISOString() },
    { id: '4', text: 'Kiểm tra độ phản hồi light-theme', completed: false, createdAt: new Date().toISOString() },
  ]);

  const [notes, setNotes] = useState<Note[]>([
    { id: '1', title: 'Ý tưởng phím tắt', content: 'Cần gán thêm các phím tắt nhanh Alt+Shift+P để bật/tắt nhanh timer trong Windows.', updatedAt: new Date().toISOString(), color: 'bg-amber-50 border-amber-200 text-amber-900' },
    { id: '2', title: 'Danh sách việc ngày mai', content: '- Gặp team lúc 9h sáng\n- Điền bảng chấm công tuần qua\n- Đi bơi rèn luyện sức khoẻ.', updatedAt: new Date().toISOString(), color: 'bg-sky-50 border-sky-200 text-sky-900' },
  ]);

  const [logs, setLogs] = useState<DailyLog[]>([
    { id: '1', date: new Date().toISOString().split('T')[0], activity: 'Nghiên cứu setup Electron Windows', durationMinutes: 45, category: 'Work' },
    { id: '2', date: new Date().toISOString().split('T')[0], activity: 'Lập trình UI Desktop widgets sang trọng', durationMinutes: 90, category: 'Study' },
  ]);

  const [settings, setSettings] = useState<WidgetSettings>({
    autoStart: true,
    defaultPosition: 'top-right',
    pomodoroWorkTime: 25,
    pomodoroBreakTime: 5,
    soundEnabled: true,
    alwaysOnTop: true,
    username: 'Triệt Nguyễn',
  });

  const [streak, setStreak] = useState(12);

  // --- Feature Panel State ---
  const [activePanel, setActivePanel] = useState<FeaturePanelId>(null);
  const handleOpenPanel = (panel: FeaturePanelId) => {
    setActivePanel(prev => prev === panel ? null : panel);
  };
  const handleClosePanel = () => setActivePanel(null);

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
            const logEntryForm = {
              id: Date.now().toString(),
              date: new Date().toISOString().split('T')[0],
              activity: `Hoàn tất chu kỳ Pomodoro tập trung`,
              durationMinutes: settings.pomodoroWorkTime,
              category: 'Work' as const,
            };
            setLogs(prev => [...prev, logEntryForm]);
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

  const handleResetPomodoro = () => {
    setPomodoroState(prev => ({
      ...prev,
      isActive: false,
      minutes: prev.mode === 'work' ? settings.pomodoroWorkTime : settings.pomodoroBreakTime,
      seconds: 0,
    }));
  };

  const handleSetPomodoroMode = (newMode: 'work' | 'break') => {
    setPomodoroState({
      mode: newMode,
      isActive: false,
      minutes: newMode === 'work' ? settings.pomodoroWorkTime : settings.pomodoroBreakTime,
      seconds: 0,
    });
  };

  // --- Data Mutators ---
  // Task actions
  const handleAddTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const handleToggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // Note actions
  const handleAddNote = (newNote: Omit<Note, 'id' | 'updatedAt'>) => {
    const createdNote: Note = {
      ...newNote,
      id: Date.now().toString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes(prev => [createdNote, ...prev]);
  };

  const handleUpdateNote = (id: string, updates: Partial<Note>) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n));
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  // Log actions
  const handleAddLog = (newLog: Omit<DailyLog, 'id'>) => {
    const createdLog: DailyLog = {
      ...newLog,
      id: Date.now().toString(),
    };
    setLogs(prev => [...prev, createdLog]);
  };

  const handleDeleteLog = (id: string) => {
    setLogs(prev => prev.filter(l => l.id !== id));
  };

  const handleUpdateSettings = (updates: Partial<WidgetSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  // Computations
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#F0F2F5] select-none text-[#1A1A1B] flex items-center justify-center">
      <div className="flex flex-row items-start gap-4">
        <div className="w-[310px]">
          <MainCard
            completedTasks={completedTasks}
            totalTasks={totalTasks}
            pomodoroState={pomodoroState}
            streak={streak}
            onOpenPanel={handleOpenPanel}
            activePanel={activePanel}
            settings={settings}
            onTogglePomodoro={handleTogglePomodoro}
          />
        </div>

        <FeaturePanel
          activePanel={activePanel}
          onClose={handleClosePanel}
          pomodoroState={pomodoroState}
          onTogglePomodoro={handleTogglePomodoro}
          onResetPomodoro={handleResetPomodoro}
          onSetPomodoroMode={handleSetPomodoroMode}
          notes={notes}
          onAddNote={handleAddNote}
          onUpdateNote={handleUpdateNote}
          onDeleteNote={handleDeleteNote}
          tasks={tasks}
          onAddTask={handleAddTask}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
          logs={logs}
          onAddLog={handleAddLog}
          onDeleteLog={handleDeleteLog}
          streak={streak}
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
        />
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { 
  Timer, 
  FileText, 
  Calendar, 
  Settings as SettingsIcon, 
  CheckSquare, 
  Link, 
  BarChart2, 
  Monitor, 
  HelpCircle,
  Sparkles,
  Info
} from 'lucide-react';
import WidgetWindow from './WidgetWindow';
import MainCard from './MainCard';
import PomodoroTimer from './PomodoroTimer';
import QuickNote from './QuickNote';
import DailyTracker from './DailyTracker';
import SettingsWindow from './SettingsWindow';
import TodoMini from './TodoMini';
import AppShortcuts from './AppShortcuts';
import QuickStats from './QuickStats';
import { Task, Note, DailyLog, AppShortcut, WidgetSettings, WindowInstance } from '../types';

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

  const [shortcuts, setShortcuts] = useState<AppShortcut[]>([
    { id: '1', name: 'GitHub Repo', url: 'https://github.com', iconType: 'code' },
    { id: '2', name: 'Figma Design', url: 'https://figma.com', iconType: 'browser' },
    { id: '3', name: 'Spotify Music', url: 'https://spotify.com', iconType: 'music' },
    { id: '4', name: 'Kênh Chat Slack', url: 'https://slack.com', iconType: 'chat' },
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

  // --- Window Layout State ---
  // We keep a state holding open/closed status, focus ordering (zIndex), positions and sizes
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [windowState, setWindowState] = useState<{ [key: string]: WindowInstance }>({
    maincard: { id: 'maincard', title: 'TRUNG TÂM ĐIỀU KHIỂN', isOpen: true, x: 50, y: 80, width: 310, height: 490, zIndex: 5 },
    pomodoro: { id: 'pomodoro', title: 'POMODORO TIMER', isOpen: true, x: 390, y: 80, width: 350, height: 380, zIndex: 4 },
    quicknote: { id: 'quicknote', title: 'STIKY NOTES', isOpen: true, x: 770, y: 80, width: 350, height: 380, zIndex: 3 },
    todomini: { id: 'todomini', title: 'TODO MINI LIST', isOpen: false, x: 390, y: 490, width: 350, height: 360, zIndex: 2 },
    dailytracker: { id: 'dailytracker', title: 'DAILY ACTIVITY LOG', isOpen: false, x: 770, y: 490, width: 350, height: 450, zIndex: 1 },
    settings: { id: 'settings', title: 'CÀI ĐẶT HỆ THỐNG', isOpen: false, x: 1140, y: 80, width: 360, height: 520, zIndex: 1 },
    appshortcuts: { id: 'appshortcuts', title: 'PHÍM TẮT TRUY CẬP NHANH', isOpen: false, x: 1140, y: 620, width: 360, height: 330, zIndex: 1 },
    quickstats: { id: 'quickstats', title: 'THỐNG KÊ HIỆU SUẤT', isOpen: false, x: 50, y: 590, width: 310, height: 410, zIndex: 1 },
  });

  // Keep responsive initial positions in draft depending on screen width
  useEffect(() => {
    const handleInitialLayout = () => {
      const isLargeScreen = window.innerWidth > 1400;
      setWindowState(prev => ({
        ...prev,
        maincard: { ...prev.maincard, x: 40, y: 60 },
        pomodoro: { ...prev.pomodoro, x: 370, y: 60, isOpen: true },
        quicknote: { ...prev.quicknote, x: 740, y: 60, isOpen: true },
        todomini: { ...prev.todomini, x: 370, y: 460, isOpen: isLargeScreen },
        dailytracker: { ...prev.dailytracker, x: 740, y: 460, isOpen: isLargeScreen },
        settings: { ...prev.settings, x: 1110, y: 60, isOpen: false },
        appshortcuts: { ...prev.appshortcuts, x: 1110, y: 595, isOpen: false },
        quickstats: { ...prev.quickstats, x: 40, y: 575, isOpen: false },
      }));
    };
    handleInitialLayout();
  }, []);

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

  // --- Window Manager Functions ---
  const handleFocusWindow = (windowId: string) => {
    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);
    setWindowState(prev => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        zIndex: nextZ,
      }
    }));
  };

  const handleToggleWindow = (windowId: string) => {
    handleFocusWindow(windowId);
    setWindowState(prev => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        isOpen: !prev[windowId].isOpen,
      }
    }));
  };

  const handleCloseWindow = (windowId: string) => {
    setWindowState(prev => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        isOpen: false,
      }
    }));
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

  // Shortcut actions
  const handleAddShortcut = (newShortcut: Omit<AppShortcut, 'id'>) => {
    const createdShortcut: AppShortcut = {
      ...newShortcut,
      id: Date.now().toString(),
    };
    setShortcuts(prev => [...prev, createdShortcut]);
  };

  const handleDeleteShortcut = (id: string) => {
    setShortcuts(prev => prev.filter(s => s.id !== id));
  };

  const handleUpdateSettings = (updates: Partial<WidgetSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  // Computations
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-[#F0F2F5] select-none text-[#1A1A1B]"
    >
      {/* Simulation Backdrop Design lines - Clean Utility / Minimal Style */}
      <div className="absolute inset-x-0 top-0 h-14 bg-white border-b border-gray-200/80 flex items-center justify-between px-6 z-0">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-gray-100 border border-gray-200 text-gray-700">
            <Monitor className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-sans font-bold text-xs tracking-tight text-gray-900 uppercase">Productivity Overlay</h1>
            <p className="text-[10px] text-gray-400 font-medium font-sans">Workflow Dashboard — Drag-and-drop simulated windows</p>
          </div>
        </div>

        {/* Sync / Version Tag Statuses from Design */}
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold rounded-full border border-green-200">SYNCED</span>
          <span className="px-2.5 py-0.5 bg-white text-gray-400 text-[10px] font-medium rounded-full border border-gray-200">VER 1.2.0</span>
        </div>
      </div>

      {/* Floating draggable window canvases */}
      <div className="w-full h-full pt-14 pb-12 relative overflow-hidden">
        
        {/* WINDOW 1: Main Card Control (ALWAYS OPEN OR REOPENABLE) */}
        <WidgetWindow
          title={windowState.maincard.title}
          isOpen={windowState.maincard.isOpen}
          onClose={() => handleCloseWindow('maincard')}
          onMinimize={() => handleToggleWindow('maincard')}
          defaultX={windowState.maincard.x}
          defaultY={windowState.maincard.y}
          width={windowState.maincard.width}
          height={windowState.maincard.height}
          zIndex={windowState.maincard.zIndex}
          onFocus={() => handleFocusWindow('maincard')}
          icon={<Monitor className="w-4 h-4 text-slate-500" />}
        >
          <MainCard
            completedTasks={completedTasks}
            totalTasks={totalTasks}
            pomodoroState={pomodoroState}
            streak={streak}
            onToggleWindow={handleToggleWindow}
            openWindows={Object.keys(windowState).reduce((acc, key) => ({ ...acc, [key]: windowState[key].isOpen }), {})}
            settings={settings}
            onTogglePomodoro={handleTogglePomodoro}
          />
        </WidgetWindow>

        {/* WINDOW 2: Pomodoro Timer */}
        <WidgetWindow
          title={windowState.pomodoro.title}
          isOpen={windowState.pomodoro.isOpen}
          onClose={() => handleCloseWindow('pomodoro')}
          onMinimize={() => handleCloseWindow('pomodoro')}
          defaultX={windowState.pomodoro.x}
          defaultY={windowState.pomodoro.y}
          width={windowState.pomodoro.width}
          height={windowState.pomodoro.height}
          zIndex={windowState.pomodoro.zIndex}
          onFocus={() => handleFocusWindow('pomodoro')}
          icon={<Timer className="w-4 h-4 text-rose-500" />}
        >
          <PomodoroTimer
            pomodoroState={pomodoroState}
            settings={settings}
            onTogglePomodoro={handleTogglePomodoro}
            onResetPomodoro={handleResetPomodoro}
            onSetMode={handleSetPomodoroMode}
          />
        </WidgetWindow>

        {/* WINDOW 3: Quick Note */}
        <WidgetWindow
          title={windowState.quicknote.title}
          isOpen={windowState.quicknote.isOpen}
          onClose={() => handleCloseWindow('quicknote')}
          onMinimize={() => handleCloseWindow('quicknote')}
          defaultX={windowState.quicknote.x}
          defaultY={windowState.quicknote.y}
          width={windowState.quicknote.width}
          height={windowState.quicknote.height}
          zIndex={windowState.quicknote.zIndex}
          onFocus={() => handleFocusWindow('quicknote')}
          icon={<FileText className="w-4 h-4 text-amber-500" />}
        >
          <QuickNote
            notes={notes}
            onAddNote={handleAddNote}
            onUpdateNote={handleUpdateNote}
            onDeleteNote={handleDeleteNote}
          />
        </WidgetWindow>

        {/* WINDOW 4: Todo List Mini */}
        <WidgetWindow
          title={windowState.todomini.title}
          isOpen={windowState.todomini.isOpen}
          onClose={() => handleCloseWindow('todomini')}
          onMinimize={() => handleCloseWindow('todomini')}
          defaultX={windowState.todomini.x}
          defaultY={windowState.todomini.y}
          width={windowState.todomini.width}
          height={windowState.todomini.height}
          zIndex={windowState.todomini.zIndex}
          onFocus={() => handleFocusWindow('todomini')}
          icon={<CheckSquare className="w-4 h-4 text-blue-500" />}
        >
          <TodoMini
            tasks={tasks}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        </WidgetWindow>

        {/* WINDOW 5: Daily Activity Tracker */}
        <WidgetWindow
          title={windowState.dailytracker.title}
          isOpen={windowState.dailytracker.isOpen}
          onClose={() => handleCloseWindow('dailytracker')}
          onMinimize={() => handleCloseWindow('dailytracker')}
          defaultX={windowState.dailytracker.x}
          defaultY={windowState.dailytracker.y}
          width={windowState.dailytracker.width}
          height={windowState.dailytracker.height}
          zIndex={windowState.dailytracker.zIndex}
          onFocus={() => handleFocusWindow('dailytracker')}
          icon={<Calendar className="w-4 h-4 text-green-500" />}
        >
          <DailyTracker
            logs={logs}
            onAddLog={handleAddLog}
            onDeleteLog={handleDeleteLog}
          />
        </WidgetWindow>

        {/* WINDOW 6: Settings Window */}
        <WidgetWindow
          title={windowState.settings.title}
          isOpen={windowState.settings.isOpen}
          onClose={() => handleCloseWindow('settings')}
          onMinimize={() => handleCloseWindow('settings')}
          defaultX={windowState.settings.x}
          defaultY={windowState.settings.y}
          width={windowState.settings.width}
          height={windowState.settings.height}
          zIndex={windowState.settings.zIndex}
          onFocus={() => handleFocusWindow('settings')}
          icon={<SettingsIcon className="w-4 h-4 text-slate-600" />}
        >
          <SettingsWindow
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
          />
        </WidgetWindow>

        {/* WINDOW 7: App Shortcuts */}
        <WidgetWindow
          title={windowState.appshortcuts.title}
          isOpen={windowState.appshortcuts.isOpen}
          onClose={() => handleCloseWindow('appshortcuts')}
          onMinimize={() => handleCloseWindow('appshortcuts')}
          defaultX={windowState.appshortcuts.x}
          defaultY={windowState.appshortcuts.y}
          width={windowState.appshortcuts.width}
          height={windowState.appshortcuts.height}
          zIndex={windowState.appshortcuts.zIndex}
          onFocus={() => handleFocusWindow('appshortcuts')}
          icon={<Link className="w-4 h-4 text-purple-500" />}
        >
          <AppShortcuts
            shortcuts={shortcuts}
            onAddShortcut={handleAddShortcut}
            onDeleteShortcut={handleDeleteShortcut}
          />
        </WidgetWindow>

        {/* WINDOW 8: Quick Stats */}
        <WidgetWindow
          title={windowState.quickstats.title}
          isOpen={windowState.quickstats.isOpen}
          onClose={() => handleCloseWindow('quickstats')}
          onMinimize={() => handleCloseWindow('quickstats')}
          defaultX={windowState.quickstats.x}
          defaultY={windowState.quickstats.y}
          width={windowState.quickstats.width}
          height={windowState.quickstats.height}
          zIndex={windowState.quickstats.zIndex}
          onFocus={() => handleFocusWindow('quickstats')}
          icon={<BarChart2 className="w-4 h-4 text-pink-500" />}
        >
          <QuickStats
            logs={logs}
            streak={streak}
          />
        </WidgetWindow>

      </div>

      {/* Realistic Windows style simulation Taskbar underlay */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-white border-t border-gray-200 flex items-center justify-between px-4 z-10 select-none">
        <div className="text-gray-400 font-bold text-[10px] tracking-wide flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block animate-pulse" />
          DESKTOP OVERLAY SYSTEM
        </div>

        {/* Centered Desktop dock triggers */}
        <div className="flex bg-gray-50 p-1 border border-gray-200 rounded-lg gap-1">
          {[
            { id: 'maincard', name: 'Control', icon: Monitor, color: 'text-gray-700' },
            { id: 'pomodoro', name: 'Timer', icon: Timer, color: 'text-orange-600' },
            { id: 'quicknote', name: 'Note', icon: FileText, color: 'text-yellow-600' },
            { id: 'todomini', name: 'Todo', icon: CheckSquare, color: 'text-blue-600' },
            { id: 'dailytracker', name: 'Log', icon: Calendar, color: 'text-green-600' },
            { id: 'quickstats', name: 'Stats', icon: BarChart2, color: 'text-purple-600' },
            { id: 'appshortcuts', name: 'Links', icon: Link, color: 'text-teal-600' },
            { id: 'settings', name: 'Settings', icon: SettingsIcon, color: 'text-gray-500' },
          ].map(app => {
            const isOpen = windowState[app.id].isOpen;
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => handleToggleWindow(app.id)}
                className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold tracking-tight transition-all cursor-pointer
                  ${isOpen 
                    ? 'bg-white text-gray-900 border border-gray-200 shadow-2xs' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <Icon className={`w-3.5 h-3.5 ${app.color}`} />
                <span className="hidden md:inline text-[10px]">{app.name}</span>
                {isOpen && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gray-800 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Date Time display corner */}
        <div className="text-right text-gray-400 font-bold text-[10px] tracking-tight">
          {new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false })} | 2026-06-18
        </div>
      </div>
    </div>
  );
}

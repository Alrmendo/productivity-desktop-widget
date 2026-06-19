import React, { useState, useEffect } from 'react';
import {
  Clock,
  CheckSquare,
  Flame,
  Play,
  Pause,
  Timer,
  FileText,
  Calendar,
  Settings,
  BarChart2,
  Minimize2
} from 'lucide-react';
import { WidgetSettings } from '../types';

type FeaturePanelId = 'pomodoro' | 'quicknote' | 'todomini' | 'dailytracker' | 'quickstats' | 'settings';

interface MainCardProps {
  completedTasks: number;
  totalTasks: number;
  pomodoroState: {
    minutes: number;
    seconds: number;
    isActive: boolean;
    mode: 'work' | 'break';
  };
  streak: number;
  onOpenPanel: (panel: FeaturePanelId) => void;
  activePanel: string | null;
  settings: WidgetSettings;
  onTogglePomodoro: () => void;
}

export default function MainCard({
  completedTasks,
  totalTasks,
  pomodoroState,
  streak,
  onOpenPanel,
  activePanel,
  settings,
  onTogglePomodoro,
}: MainCardProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const formattedDate = time.toLocaleDateString('vi-VN', {
    weekday: 'short',
    day: 'numeric',
    month: 'numeric',
  });

  // Determine elegant greeting based on hour
  const getGreeting = () => {
    const hr = time.getHours();
    if (hr < 12) return 'Chào buổi sáng';
    if (hr < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  };

  const getPomodoroText = () => {
    const minStr = String(pomodoroState.minutes).padStart(2, '0');
    const secStr = String(pomodoroState.seconds).padStart(2, '0');
    const label = pomodoroState.mode === 'work' ? 'Tập trung' : 'Nghỉ ngơi';
    return `${label} ${minStr}:${secStr}`;
  };

  const activeFeaturesCount = activePanel ? 1 : 0;

  return (
    <div className="flex flex-col gap-4 select-none h-full text-[#1A1A1B] font-sans pb-1">
      {/* Clock and Calendar Sector */}
      <div className="text-center py-3 bg-gray-50 rounded-xl border border-gray-200">
        <div className="font-sans text-3xl font-extrabold tracking-tight text-gray-950 tabular-nums">
          {formattedTime}
        </div>
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
          {formattedDate} — <span className="text-gray-800">{getGreeting()}, {settings.username}</span>
        </div>
      </div>

      {/* Core Widget Fast Status Badges */}
      <div className="grid grid-cols-2 gap-2">
        <div
          onClick={() => onOpenPanel('todomini')}
          className="flex items-center gap-2.5 p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <div className="p-1.5 rounded-lg bg-gray-100 border border-gray-200 text-gray-800">
            <CheckSquare className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Nhiệm vụ</div>
            <div className="text-xs font-bold text-gray-800">{completedTasks}/{totalTasks} xong</div>
          </div>
        </div>

        <div
          onClick={() => onOpenPanel('quickstats')}
          className="flex items-center gap-2.5 p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <div className="p-1.5 rounded-lg bg-gray-100 border border-gray-200 text-gray-800">
            <Flame className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Liên tục</div>
            <div className="text-xs font-bold text-gray-800">🔥 {streak} ngày</div>
          </div>
        </div>
      </div>

      {/* Active Pomodoro Fast Control Panel */}
      <div className="p-3 bg-white rounded-xl border border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className={`p-1.5 rounded-lg border ${pomodoroState.isActive ? 'bg-orange-50 border-orange-200 text-orange-600' : 'bg-gray-100 border-gray-200 text-gray-500'}`}>
            <Timer className="w-3.5 h-3.5" />
          </div>
          <div className="cursor-pointer" onClick={() => onOpenPanel('pomodoro')}>
            <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Pomodoro</div>
            <div className="text-xs font-bold text-gray-800 tracking-tight">{getPomodoroText()}</div>
          </div>
        </div>
        <button
          onClick={onTogglePomodoro}
          className="p-1.5 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-700 transition-all cursor-pointer"
        >
          {pomodoroState.isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Grid of Launcher Buttons */}
      <div>
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
          DANH SÁCH WIDGETS ({activeFeaturesCount} MỞ)
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { id: 'pomodoro' as const, name: 'Timer', icon: Timer, color: 'hover:bg-gray-50' },
            { id: 'quicknote' as const, name: 'Notes', icon: FileText, color: 'hover:bg-gray-50' },
            { id: 'dailytracker' as const, name: 'Log', icon: Calendar, color: 'hover:bg-gray-50' },
            { id: 'todomini' as const, name: 'To-do', icon: CheckSquare, color: 'hover:bg-gray-50' },
            { id: 'quickstats' as const, name: 'Thống kê', icon: BarChart2, color: 'hover:bg-gray-50' },
          ].map((item) => {
            const isOpen = activePanel === item.id;
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onOpenPanel(item.id)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg border text-center transition-all cursor-pointer
                  ${isOpen
                    ? 'bg-gray-900 border-gray-900 text-white shadow-xs font-bold'
                    : `bg-white border-gray-200 text-gray-700 hover:border-gray-400 ${item.color}`
                  }`}
              >
                <IconComponent className="w-3.5 h-3.5 mb-1" />
                <span className="text-[9px] font-bold uppercase tracking-wider">{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Settings Launcher & Drag Info */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-2.5 mt-auto">
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
          ACTIVE READY
        </span>
        <button
          onClick={() => onOpenPanel('settings')}
          className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-all cursor-pointer font-bold uppercase tracking-wider text-[9px]
            ${activePanel === 'settings'
              ? 'bg-gray-900 border-gray-900 text-white'
              : 'bg-white border-gray-200 hover:bg-gray-100 text-gray-700'}`}
        >
          <Settings className="w-3 h-3" />
          <span>Cài đặt</span>
        </button>
      </div>
    </div>
  );
}

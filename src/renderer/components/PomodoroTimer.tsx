import React from 'react';
import { Play, Pause, RotateCcw, Flame, Coffee, HelpCircle, Sparkles } from 'lucide-react';
import { WidgetSettings } from '../types';

interface PomodoroTimerProps {
  pomodoroState: {
    minutes: number;
    seconds: number;
    isActive: boolean;
    mode: 'work' | 'break';
  };
  settings: WidgetSettings;
  onTogglePomodoro: () => void;
  onResetPomodoro: () => void;
  onSetMode: (mode: 'work' | 'break') => void;
}

export default function PomodoroTimer({
  pomodoroState,
  settings,
  onTogglePomodoro,
  onResetPomodoro,
  onSetMode,
}: PomodoroTimerProps) {
  const { minutes, seconds, isActive, mode } = pomodoroState;
  
  // Calculate total seconds for circular progress
  const totalSeconds = mode === 'work' 
    ? settings.pomodoroWorkTime * 60 
    : settings.pomodoroBreakTime * 60;
  
  const currentSecondsLeft = minutes * 60 + seconds;
  const progressRatio = totalSeconds > 0 ? currentSecondsLeft / totalSeconds : 1;
  
  // SVG circular properties
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progressRatio);

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="flex flex-col items-center h-full gap-4 text-[#1A1A1B] font-sans">
      {/* Mode Switches */}
      <div className="flex bg-gray-50 border border-gray-200 p-1 rounded-lg w-full">
        <button
          onClick={() => onSetMode('work')}
          className={`flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all cursor-pointer
            ${mode === 'work' 
              ? 'bg-gray-900 text-white shadow-xs' 
              : 'text-gray-500 hover:text-gray-950'
            }`}
        >
          <Flame className="w-3.5 h-3.5" />
          Tập trung ({settings.pomodoroWorkTime}m)
        </button>
        <button
          onClick={() => onSetMode('break')}
          className={`flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all cursor-pointer
            ${mode === 'break' 
              ? 'bg-gray-900 text-white shadow-xs' 
              : 'text-gray-500 hover:text-gray-950'
            }`}
        >
          <Coffee className="w-3.5 h-3.5" />
          Nghỉ ngơi ({settings.pomodoroBreakTime}m)
        </button>
      </div>

      {/* Circle Countdown Indicator */}
      <div className="relative flex items-center justify-center my-2 select-none">
        <svg className="w-40 h-40 transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            className="stroke-gray-100"
            strokeWidth="6"
            fill="transparent"
          />
          {/* Active progress indicator */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            className={`transition-all duration-300 ease-linear ${mode === 'work' ? 'stroke-orange-600' : 'stroke-gray-800'}`}
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Real Countdown Text */}
        <div className="absolute text-center">
          <div className="font-sans text-3xl font-extrabold text-gray-950 tracking-tight tabular-nums">
            {formattedTime}
          </div>
          <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">
            {isActive ? 'ĐANG CHẠY' : 'TẠM DỪNG'}
          </div>
        </div>
      </div>

      {/* Productivity Helper Tip */}
      <div className="text-center px-4">
        <p className="text-[10px] font-bold uppercase tracking-wider leading-relaxed text-gray-500">
          {mode === 'work' ? (
            <span className="text-orange-700 block">
              💡 TẬP TRUNG CAO ĐỘ
            </span>
          ) : (
            <span className="text-gray-700 block">
              ☕ THƯ GIÃN MẮT
            </span>
          )}
        </p>
      </div>

      {/* Control Buttons Block */}
      <div className="flex gap-2 w-full mt-auto">
        <button
          onClick={onResetPomodoro}
          className="flex-1 py-1.5 px-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 transition-all font-bold uppercase tracking-wider text-[10px] flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Đặt lại
        </button>

        <button
          onClick={onTogglePomodoro}
          className={`flex-[1.5] py-1.5 px-3 rounded-lg font-bold uppercase tracking-wider text-[10px] flex items-center justify-center gap-1.5 transition-all text-white cursor-pointer
            ${mode === 'work' 
              ? 'bg-[#1A1A1B] hover:bg-gray-900 bg-[#1A1A1B]' 
              : 'bg-gray-800 hover:bg-gray-750 bg-gray-800'}`}
        >
          {isActive ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              Tạm dừng
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              Bắt đầu
            </>
          )}
        </button>
      </div>
    </div>
  );
}

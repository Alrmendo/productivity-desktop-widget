import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Timer, FileText, Calendar, CheckSquare, BarChart2, Settings as SettingsIcon } from 'lucide-react';
import PomodoroTimer from './PomodoroTimer';
import QuickNote from './QuickNote';
import DailyTracker from './DailyTracker';
import TodoMini from './TodoMini';
import QuickStats from './QuickStats';
import SettingsWindow from './SettingsWindow';
import { Task, Note, DailyLog, WidgetSettings } from '../types';

export type FeaturePanelId = 'pomodoro' | 'quicknote' | 'todomini' | 'dailytracker' | 'quickstats' | 'settings' | null;

interface FeaturePanelProps {
  activePanel: FeaturePanelId;
  onClose: () => void;
  // Pomodoro
  pomodoroState: {
    minutes: number;
    seconds: number;
    isActive: boolean;
    mode: 'work' | 'break';
  };
  onTogglePomodoro: () => void;
  onResetPomodoro: () => void;
  onSetPomodoroMode: (mode: 'work' | 'break') => void;
  // Notes
  notes: Note[];
  onAddNote: (note: Omit<Note, 'id' | 'updatedAt'>) => void;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
  onDeleteNote: (id: string) => void;
  // Tasks
  tasks: Task[];
  onAddTask: (text: string) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  // Logs
  logs: DailyLog[];
  onAddLog: (log: Omit<DailyLog, 'id'>) => void;
  onDeleteLog: (id: string) => void;
  // Stats
  streak: number;
  // Settings
  settings: WidgetSettings;
  onUpdateSettings: (updates: Partial<WidgetSettings>) => void;
}

const PANEL_META: Record<Exclude<FeaturePanelId, null>, { title: string; icon: React.ElementType; color: string }> = {
  pomodoro: { title: 'POMODORO TIMER', icon: Timer, color: 'text-rose-500' },
  quicknote: { title: 'STICKY NOTES', icon: FileText, color: 'text-amber-500' },
  todomini: { title: 'TODO MINI LIST', icon: CheckSquare, color: 'text-blue-500' },
  dailytracker: { title: 'DAILY ACTIVITY LOG', icon: Calendar, color: 'text-green-500' },
  quickstats: { title: 'THỐNG KÊ HIỆU SUẤT', icon: BarChart2, color: 'text-pink-500' },
  settings: { title: 'CÀI ĐẶT HỆ THỐNG', icon: SettingsIcon, color: 'text-slate-600' },
};

export default function FeaturePanel({
  activePanel,
  onClose,
  pomodoroState,
  onTogglePomodoro,
  onResetPomodoro,
  onSetPomodoroMode,
  notes,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  logs,
  onAddLog,
  onDeleteLog,
  streak,
  settings,
  onUpdateSettings,
}: FeaturePanelProps) {
  return (
    <AnimatePresence>
      {activePanel && (
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 40, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="w-[360px] max-h-[90vh] bg-white border border-gray-200 rounded-xl shadow-md flex flex-col overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 shrink-0">
            <div className="flex items-center gap-2">
              {React.createElement(PANEL_META[activePanel].icon, { className: `w-4 h-4 ${PANEL_META[activePanel].color}` })}
              <span className="text-xs font-bold uppercase tracking-widest text-gray-800">
                {PANEL_META[activePanel].title}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-gray-100 text-gray-500 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 overflow-y-auto flex-1 min-h-0">
            {activePanel === 'pomodoro' && (
              <PomodoroTimer
                pomodoroState={pomodoroState}
                settings={settings}
                onTogglePomodoro={onTogglePomodoro}
                onResetPomodoro={onResetPomodoro}
                onSetMode={onSetPomodoroMode}
              />
            )}
            {activePanel === 'quicknote' && (
              <QuickNote
                notes={notes}
                onAddNote={onAddNote}
                onUpdateNote={onUpdateNote}
                onDeleteNote={onDeleteNote}
              />
            )}
            {activePanel === 'todomini' && (
              <TodoMini
                tasks={tasks}
                onAddTask={onAddTask}
                onToggleTask={onToggleTask}
                onDeleteTask={onDeleteTask}
              />
            )}
            {activePanel === 'dailytracker' && (
              <DailyTracker
                logs={logs}
                onAddLog={onAddLog}
                onDeleteLog={onDeleteLog}
              />
            )}
            {activePanel === 'quickstats' && (
              <QuickStats logs={logs} streak={streak} />
            )}
            {activePanel === 'settings' && (
              <SettingsWindow
                settings={settings}
                onUpdateSettings={onUpdateSettings}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

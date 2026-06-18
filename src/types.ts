export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  color?: string;
}

export interface DailyLog {
  id: string;
  date: string; // YYYY-MM-DD
  activity: string;
  durationMinutes: number;
  category: 'Work' | 'Study' | 'Exercise' | 'Life' | 'Other';
}

export interface AppShortcut {
  id: string;
  name: string;
  url: string;
  iconType: 'browser' | 'code' | 'folder' | 'terminal' | 'chat' | 'mail' | 'music' | 'document';
}

export interface WidgetSettings {
  autoStart: boolean;
  defaultPosition: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'free';
  pomodoroWorkTime: number; // in minutes
  pomodoroBreakTime: number; // in minutes
  soundEnabled: boolean;
  alwaysOnTop: boolean;
  username: string;
}

export interface WindowInstance {
  id: string;
  title: string;
  isOpen: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

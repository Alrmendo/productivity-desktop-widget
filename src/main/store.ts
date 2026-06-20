import Store from 'electron-store';
import { BrowserWindow } from 'electron';
import type { Task, Note, DailyLog, AppShortcut, WidgetSettings } from '../renderer/types';

export interface StoreSchema {
  tasks: Task[];
  notes: Note[];
  logs: DailyLog[];
  shortcuts: AppShortcut[];
  settings: WidgetSettings;
  streak: number;
  mainWindowPosition: { x: number; y: number; width: number; height: number } | null;
}

const defaults: StoreSchema = {
  tasks: [],
  notes: [],
  logs: [],
  shortcuts: [],
  settings: {
    autoStart: false,
    defaultPosition: 'top-right',
    pomodoroWorkTime: 25,
    pomodoroBreakTime: 5,
    soundEnabled: true,
    alwaysOnTop: true,
    username: '',
  },
  streak: 0,
  mainWindowPosition: null,
};

export const store = new Store<StoreSchema>({ defaults });

export function broadcastStoreChange<K extends keyof StoreSchema>(key: K, value: StoreSchema[K]) {
  for (const win of BrowserWindow.getAllWindows()) {
    if (!win.isDestroyed()) {
      win.webContents.send('store:changed', key, value);
    }
  }
}

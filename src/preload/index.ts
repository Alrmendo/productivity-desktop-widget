import { contextBridge, ipcRenderer } from 'electron';
import type { StoreSchema } from '../main/store';

contextBridge.exposeInMainWorld('electronAPI', {
  openFeatureWindow: (feature: string) => {
    ipcRenderer.send('open-feature-window', feature);
  },
  toggleFeatureWindow: (feature: string) => {
    ipcRenderer.send('toggle-feature-window', feature);
  },
  onFeatureWindowState: (callback: (openWindows: Record<string, boolean>) => void) => {
    const listener = (_: unknown, openWindows: Record<string, boolean>) => callback(openWindows);
    ipcRenderer.on('feature-window-state', listener);
    ipcRenderer.send('get-feature-window-state');
    return () => ipcRenderer.removeListener('feature-window-state', listener);
  },
  closeWindow: () => {
    ipcRenderer.send('close-feature-window');
  },
  openExternal: (url: string) => {
    ipcRenderer.send('shell:open-external', url);
  },
  window: {
    minimize: () => {
      ipcRenderer.send('window:minimize');
    },
    maximizeToggle: () => {
      ipcRenderer.send('window:maximize-toggle');
    },
    close: () => {
      ipcRenderer.send('close-feature-window');
    },
  },
  store: {
    get: <K extends keyof StoreSchema>(key: K): Promise<StoreSchema[K]> => {
      return ipcRenderer.invoke('store:get', key);
    },
    set: <K extends keyof StoreSchema>(key: K, value: StoreSchema[K]): void => {
      ipcRenderer.send('store:set', key, value);
    },
    subscribe: <K extends keyof StoreSchema>(key: K, callback: (value: StoreSchema[K]) => void): (() => void) => {
      const listener = (_: unknown, changedKey: keyof StoreSchema, value: StoreSchema[keyof StoreSchema]) => {
        if (changedKey === key) callback(value as StoreSchema[K]);
      };
      ipcRenderer.on('store:changed', listener);
      return () => ipcRenderer.removeListener('store:changed', listener);
    },
  },
});

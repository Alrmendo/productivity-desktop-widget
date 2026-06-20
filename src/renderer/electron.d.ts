import type { StoreSchema } from '../main/store';

declare global {
  interface Window {
    electronAPI: {
      openFeatureWindow: (feature: string) => void;
      toggleFeatureWindow: (feature: string) => void;
      onFeatureWindowState: (callback: (openWindows: Record<string, boolean>) => void) => () => void;
      closeWindow: () => void;
      openExternal: (url: string) => void;
      window: {
        minimize: () => void;
        maximizeToggle: () => void;
        close: () => void;
      };
      store: {
        get: <K extends keyof StoreSchema>(key: K) => Promise<StoreSchema[K]>;
        set: <K extends keyof StoreSchema>(key: K, value: StoreSchema[K]) => void;
        subscribe: <K extends keyof StoreSchema>(key: K, callback: (value: StoreSchema[K]) => void) => () => void;
      };
    };
  }
}

export {};

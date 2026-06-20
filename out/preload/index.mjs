import { contextBridge, ipcRenderer } from "electron";
contextBridge.exposeInMainWorld("electronAPI", {
  openFeatureWindow: (feature) => {
    ipcRenderer.send("open-feature-window", feature);
  },
  toggleFeatureWindow: (feature) => {
    ipcRenderer.send("toggle-feature-window", feature);
  },
  onFeatureWindowState: (callback) => {
    const listener = (_, openWindows) => callback(openWindows);
    ipcRenderer.on("feature-window-state", listener);
    ipcRenderer.send("get-feature-window-state");
    return () => ipcRenderer.removeListener("feature-window-state", listener);
  },
  closeWindow: () => {
    ipcRenderer.send("close-feature-window");
  },
  openExternal: (url) => {
    ipcRenderer.send("shell:open-external", url);
  },
  window: {
    minimize: () => {
      ipcRenderer.send("window:minimize");
    },
    maximizeToggle: () => {
      ipcRenderer.send("window:maximize-toggle");
    },
    close: () => {
      ipcRenderer.send("close-feature-window");
    }
  },
  store: {
    get: (key) => {
      return ipcRenderer.invoke("store:get", key);
    },
    set: (key, value) => {
      ipcRenderer.send("store:set", key, value);
    },
    subscribe: (key, callback) => {
      const listener = (_, changedKey, value) => {
        if (changedKey === key) callback(value);
      };
      ipcRenderer.on("store:changed", listener);
      return () => ipcRenderer.removeListener("store:changed", listener);
    }
  }
});

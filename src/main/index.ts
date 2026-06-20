import { app, BrowserWindow, ipcMain, screen, shell, type Rectangle } from 'electron';
import { join } from 'path';
import { store, broadcastStoreChange, type StoreSchema } from './store';
import type { WidgetSettings } from '../renderer/types';

let mainWindow: BrowserWindow | null = null;

const ICON_PATH = join(__dirname, '../../assets/icon.ico');
const MAIN_WINDOW_SIZE = { width: 380, height: 732 };
const SCREEN_MARGIN = 12;

// Custom maximize/restore (mainWindow stays resizable: false — we fake it via
// setBounds instead of native win.maximize(), so widgets keep their fixed-size feel).
const customMaximizeState = new Map<BrowserWindow, { savedBounds: Rectangle; isCustomMaximized: boolean }>();

function toggleCustomMaximize(win: BrowserWindow) {
  const state = customMaximizeState.get(win) ?? { savedBounds: win.getBounds(), isCustomMaximized: false };

  if (!state.isCustomMaximized) {
    state.savedBounds = win.getBounds();
    const display = screen.getDisplayMatching(state.savedBounds);
    win.setBounds(display.workArea);
    state.isCustomMaximized = true;
  } else {
    win.setBounds(state.savedBounds);
    state.isCustomMaximized = false;
  }

  customMaximizeState.set(win, state);
}

function cornerPosition(position: WidgetSettings['defaultPosition'], width: number, height: number): { x: number; y: number } | null {
  const work = screen.getPrimaryDisplay().workArea;
  switch (position) {
    case 'top-left':
      return { x: work.x + SCREEN_MARGIN, y: work.y + SCREEN_MARGIN };
    case 'top-right':
      return { x: work.x + work.width - width - SCREEN_MARGIN, y: work.y + SCREEN_MARGIN };
    case 'bottom-left':
      return { x: work.x + SCREEN_MARGIN, y: work.y + work.height - height - SCREEN_MARGIN };
    case 'bottom-right':
      return { x: work.x + work.width - width - SCREEN_MARGIN, y: work.y + work.height - height - SCREEN_MARGIN };
    case 'free':
    default:
      return null;
  }
}

function resolveMainWindowPosition(settings: WidgetSettings): { x: number; y: number } | null {
  const saved = store.get('mainWindowPosition');
  if (saved) {
    const bounds = { x: saved.x, y: saved.y, width: MAIN_WINDOW_SIZE.width, height: MAIN_WINDOW_SIZE.height };
    const display = screen.getDisplayMatching(bounds);
    const work = display.workArea;

    const overlapWidth = Math.max(0, Math.min(bounds.x + bounds.width, work.x + work.width) - Math.max(bounds.x, work.x));
    const overlapHeight = Math.max(0, Math.min(bounds.y + bounds.height, work.y + work.height) - Math.max(bounds.y, work.y));

    // Require most of the window to still be visible on this display's work area,
    // otherwise fall back to the default-position setting below.
    const visibleEnough = overlapWidth >= bounds.width * 0.5 && overlapHeight >= bounds.height * 0.5;
    if (visibleEnough) return { x: saved.x, y: saved.y };
  }

  return cornerPosition(settings.defaultPosition, MAIN_WINDOW_SIZE.width, MAIN_WINDOW_SIZE.height);
}

function createMainWindow() {
  const settings = store.get('settings');
  const position = resolveMainWindowPosition(settings);

  const win = new BrowserWindow({
    ...MAIN_WINDOW_SIZE,
    ...(position ?? {}),
    frame: false,
    transparent: true,
    resizable: false,
    alwaysOnTop: settings.alwaysOnTop,
    icon: ICON_PATH,
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  mainWindow = win;

  let moveSaveTimer: ReturnType<typeof setTimeout> | null = null;
  win.on('moved', () => {
    // While custom-maximized, bounds reflect the full work area, not the widget's
    // real size — skip persisting so restoring later doesn't restore to a full-screen rect.
    if (customMaximizeState.get(win)?.isCustomMaximized) return;

    if (moveSaveTimer) clearTimeout(moveSaveTimer);
    moveSaveTimer = setTimeout(() => {
      const bounds = win.getBounds();
      store.set('mainWindowPosition', { x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height });
    }, 300);
  });

  win.on('closed', () => {
    if (moveSaveTimer) clearTimeout(moveSaveTimer);
    customMaximizeState.delete(win);
    mainWindow = null;
  });

  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

const FEATURE_WINDOW_SIZES: Record<string, { width: number; height: number }> = {
  pomodoro: { width: 360, height: 512 },
  quicknote: { width: 400, height: 592 },
  dailytracker: { width: 400, height: 592 },
  todomini: { width: 360, height: 512 },
  quickstats: { width: 400, height: 552 },
  settings: { width: 380, height: 532 },
  links: { width: 380, height: 480 },
};

const featureWindows = new Map<string, BrowserWindow>();

const GAP = 8;

type Direction = 'right' | 'left' | 'bottom' | 'top';

function computeFeatureWindowPosition(featureWinWidth: number, featureWinHeight: number) {
  if (!mainWindow || mainWindow.isDestroyed()) return null;

  const mainBounds = mainWindow.getBounds();
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;

  const spaceOnRight = screenWidth - (mainBounds.x + mainBounds.width);
  const spaceOnLeft = mainBounds.x;
  const spaceOnBottom = screenHeight - mainBounds.y;
  const spaceOnTop = mainBounds.y + mainBounds.height;

  let featureX: number;
  let featureY: number;
  let direction: Direction;

  if (spaceOnRight >= featureWinWidth + GAP) {
    direction = 'right';
    featureX = mainBounds.x + mainBounds.width + GAP;
    featureY = Math.max(0, Math.min(mainBounds.y, screenHeight - featureWinHeight));
  } else if (spaceOnLeft >= featureWinWidth + GAP) {
    direction = 'left';
    featureX = mainBounds.x - featureWinWidth - GAP;
    featureY = Math.max(0, Math.min(mainBounds.y, screenHeight - featureWinHeight));
  } else if (spaceOnBottom >= featureWinHeight + GAP) {
    direction = 'bottom';
    featureX = Math.max(0, Math.min(mainBounds.x, screenWidth - featureWinWidth));
    featureY = mainBounds.y + mainBounds.height + GAP;
  } else if (spaceOnTop >= featureWinHeight + GAP) {
    direction = 'top';
    featureX = Math.max(0, Math.min(mainBounds.x, screenWidth - featureWinWidth));
    featureY = mainBounds.y - featureWinHeight - GAP;
  } else {
    direction = 'right';
    featureX = Math.min(mainBounds.x + mainBounds.width + GAP, screenWidth - featureWinWidth);
    featureY = Math.max(0, Math.min(mainBounds.y, screenHeight - featureWinHeight));
  }

  return { x: featureX, y: featureY, direction };
}

function rectsOverlap(
  a: { x: number; y: number; width: number; height: number },
  b: { x: number; y: number; width: number; height: number }
) {
  return !(
    a.x + a.width <= b.x ||
    b.x + b.width <= a.x ||
    a.y + a.height <= b.y ||
    b.y + b.height <= a.y
  );
}

function resolveFeatureWindowOverlap(
  initial: { x: number; y: number; direction: Direction },
  width: number,
  height: number
) {
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;
  const openBounds = Array.from(featureWindows.values())
    .filter(w => !w.isDestroyed())
    .map(w => w.getBounds());

  let rect = { x: initial.x, y: initial.y, width, height };

  for (let i = 0; i < openBounds.length; i++) {
    const colliding = openBounds.find(b => rectsOverlap(rect, b));
    if (!colliding) break;

    if (initial.direction === 'right') {
      rect = { ...rect, x: rect.x + colliding.width + GAP };
    } else if (initial.direction === 'left') {
      rect = { ...rect, x: rect.x - colliding.width - GAP };
    } else if (initial.direction === 'bottom') {
      rect = { ...rect, y: rect.y + colliding.height + GAP };
    } else {
      rect = { ...rect, y: rect.y - colliding.height - GAP };
    }

    const clampedX = Math.max(0, Math.min(rect.x, screenWidth - rect.width));
    const clampedY = Math.max(0, Math.min(rect.y, screenHeight - rect.height));
    const hitEdge = clampedX !== rect.x || clampedY !== rect.y;
    rect = { ...rect, x: clampedX, y: clampedY };

    if (hitEdge) break;
  }

  return { x: rect.x, y: rect.y };
}

function broadcastWindowState() {
  if (!mainWindow || mainWindow.isDestroyed()) return;
  const openWindows: Record<string, boolean> = {};
  for (const feature of Object.keys(FEATURE_WINDOW_SIZES)) {
    const win = featureWindows.get(feature);
    openWindows[feature] = !!win && !win.isDestroyed();
  }
  mainWindow.webContents.send('feature-window-state', openWindows);
}

function toggleFeatureWindow(feature: string) {
  const existing = featureWindows.get(feature);
  if (existing && !existing.isDestroyed()) {
    existing.close();
    return;
  }
  createFeatureWindow(feature);
}

function createFeatureWindow(feature: string) {
  const size = FEATURE_WINDOW_SIZES[feature];
  if (!size) return;

  const existing = featureWindows.get(feature);
  if (existing && !existing.isDestroyed()) {
    existing.focus();
    return;
  }

  const initialPosition = computeFeatureWindowPosition(size.width, size.height);
  const position = initialPosition
    ? resolveFeatureWindowOverlap(initialPosition, size.width, size.height)
    : null;

  const win = new BrowserWindow({
    ...(position ?? {}),
    width: size.width,
    height: size.height,
    frame: false,
    transparent: true,
    resizable: false,
    alwaysOnTop: store.get('settings').alwaysOnTop,
    icon: ICON_PATH,
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    win.loadURL(`http://localhost:5173/${feature}.html`);
  } else {
    win.loadFile(join(__dirname, `../renderer/${feature}.html`));
  }

  win.on('closed', () => {
    featureWindows.delete(feature);
    customMaximizeState.delete(win);
    broadcastWindowState();
  });

  featureWindows.set(feature, win);
  broadcastWindowState();
}

ipcMain.on('open-feature-window', (_, feature: string) => {
  createFeatureWindow(feature);
});

ipcMain.on('toggle-feature-window', (_, feature: string) => {
  toggleFeatureWindow(feature);
});

ipcMain.on('get-feature-window-state', () => {
  broadcastWindowState();
});

ipcMain.on('close-feature-window', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win?.close();
});

ipcMain.on('window:minimize', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win?.minimize();
});

ipcMain.on('window:maximize-toggle', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) toggleCustomMaximize(win);
});

ipcMain.handle('store:get', <K extends keyof StoreSchema>(_: unknown, key: K) => {
  return store.get(key);
});

ipcMain.on('store:set', <K extends keyof StoreSchema>(_: unknown, key: K, value: StoreSchema[K]) => {
  store.set(key, value);
  broadcastStoreChange(key, value);
  if (key === 'settings') {
    applySettingsSideEffects(value as unknown as WidgetSettings);
  }
});

function applySettingsSideEffects(settings: WidgetSettings) {
  app.setLoginItemSettings({ openAtLogin: settings.autoStart });

  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.setAlwaysOnTop(settings.alwaysOnTop);
  }
  for (const win of featureWindows.values()) {
    if (!win.isDestroyed()) win.setAlwaysOnTop(settings.alwaysOnTop);
  }

  if (mainWindow && !mainWindow.isDestroyed()) {
    const corner = cornerPosition(settings.defaultPosition, MAIN_WINDOW_SIZE.width, MAIN_WINDOW_SIZE.height);
    if (corner) {
      mainWindow.setPosition(corner.x, corner.y);
      store.set('mainWindowPosition', { ...corner, width: MAIN_WINDOW_SIZE.width, height: MAIN_WINDOW_SIZE.height });
    }
  }
}

ipcMain.on('shell:open-external', (_, url: string) => {
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      shell.openExternal(url);
    } else {
      console.warn(`Blocked shell.openExternal for disallowed protocol: ${parsed.protocol}`);
    }
  } catch {
    console.warn(`Blocked shell.openExternal for invalid URL: ${url}`);
  }
});

app.whenReady().then(() => {
  app.setLoginItemSettings({ openAtLogin: store.get('settings').autoStart });
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

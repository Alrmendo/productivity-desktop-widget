import { _electron as electron, type ElectronApplication, type Page } from 'playwright';
import { execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SCREENSHOT_DIR = path.join(ROOT, 'screenshots');

const WIDGETS: { id: string; label: string; file: string }[] = [
  { id: 'pomodoro', label: 'Timer', file: 'widget-timer.png' },
  { id: 'quicknote', label: 'Notes', file: 'widget-notes.png' },
  { id: 'dailytracker', label: 'Log', file: 'widget-log.png' },
  { id: 'todomini', label: 'To-do', file: 'widget-todo.png' },
  { id: 'quickstats', label: 'Thống kê', file: 'widget-thongke.png' },
  { id: 'links', label: 'Links', file: 'widget-links.png' },
];

async function captureWidget(electronApp: ElectronApplication, mainWindow: Page, widget: typeof WIDGETS[number]) {
  const [widgetWindow] = await Promise.all([
    electronApp.waitForEvent('window'),
    mainWindow.getByText(widget.label, { exact: true }).click(),
  ]);

  await widgetWindow.waitForLoadState('domcontentloaded');
  await widgetWindow.waitForTimeout(400);

  const filePath = path.join(SCREENSHOT_DIR, widget.file);
  await widgetWindow.screenshot({ path: filePath });
  console.log(`Saved ${filePath}`);

  await widgetWindow.close();
  // give the main-process feature-window-state broadcast time to settle
  await mainWindow.waitForTimeout(300);
}

async function main() {
  console.log('Building app (electron-vite build)...');
  execSync('npm run build', { stdio: 'inherit', cwd: ROOT });

  mkdirSync(SCREENSHOT_DIR, { recursive: true });

  console.log('Launching app...');
  const electronApp = await electron.launch({
    args: [ROOT],
    env: { ...process.env, NODE_ENV: 'production' },
  });

  try {
    const mainWindow = await electronApp.firstWindow();
    await mainWindow.waitForLoadState('domcontentloaded');
    await mainWindow.waitForTimeout(500);

    await mainWindow.screenshot({ path: path.join(SCREENSHOT_DIR, 'maincard-default.png') });
    console.log(`Saved ${path.join(SCREENSHOT_DIR, 'maincard-default.png')}`);

    for (const widget of WIDGETS) {
      await captureWidget(electronApp, mainWindow, widget);
    }

    // Traffic-light hover state — hovering the close button reveals all 3 icons (group-hover)
    await mainWindow.hover('[title="Đóng"]');
    await mainWindow.waitForTimeout(200);
    await mainWindow.screenshot({ path: path.join(SCREENSHOT_DIR, 'traffic-lights-hover.png') });
    console.log(`Saved ${path.join(SCREENSHOT_DIR, 'traffic-lights-hover.png')}`);

    // Move mouse away so the hover state above doesn't bleed into the next screenshot
    await mainWindow.mouse.move(0, 0);

    // Start the Pomodoro timer and capture the running state
    await mainWindow.click('[aria-label="toggle-pomodoro"]');
    await mainWindow.waitForTimeout(500);
    await mainWindow.screenshot({ path: path.join(SCREENSHOT_DIR, 'pomodoro-running.png') });
    console.log(`Saved ${path.join(SCREENSHOT_DIR, 'pomodoro-running.png')}`);

    // Stop it again so we don't leave a running timer / scheduled alert behind
    await mainWindow.click('[aria-label="toggle-pomodoro"]');
  } finally {
    await electronApp.close();
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

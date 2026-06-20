import { defineConfig } from 'electron-vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  main: {
    build: {
      rollupOptions: {
        input: 'src/main/index.ts',
      },
    },
  },
  preload: {
    build: {
      rollupOptions: {
        input: 'src/preload/index.ts',
      },
    },
  },
  renderer: {
    root: 'src/renderer',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/renderer'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, 'src/renderer/index.html'),
          pomodoro: path.resolve(__dirname, 'src/renderer/pomodoro.html'),
          quicknote: path.resolve(__dirname, 'src/renderer/quicknote.html'),
          dailytracker: path.resolve(__dirname, 'src/renderer/dailytracker.html'),
          todomini: path.resolve(__dirname, 'src/renderer/todomini.html'),
          quickstats: path.resolve(__dirname, 'src/renderer/quickstats.html'),
          settings: path.resolve(__dirname, 'src/renderer/settings.html'),
          links: path.resolve(__dirname, 'src/renderer/links.html'),
        },
      },
    },
  },
});

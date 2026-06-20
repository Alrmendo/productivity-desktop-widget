import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import QuickStats from '../components/QuickStats';
import WindowFrame from '../components/WindowFrame';
import { DailyLog } from '../types';
import '../index.css';

function QuickStatsWindow() {
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    window.electronAPI.store.get('logs').then(setLogs);
    window.electronAPI.store.get('streak').then(setStreak);
    const unsubLogs = window.electronAPI.store.subscribe('logs', setLogs);
    const unsubStreak = window.electronAPI.store.subscribe('streak', setStreak);
    return () => {
      unsubLogs();
      unsubStreak();
    };
  }, []);

  return (
    <WindowFrame title="THỐNG KÊ HIỆU SUẤT" onClose={() => window.electronAPI.closeWindow()}>
      <QuickStats logs={logs} streak={streak} />
    </WindowFrame>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QuickStatsWindow />
  </StrictMode>,
);

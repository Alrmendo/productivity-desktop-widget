import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import DailyTracker from '../components/DailyTracker';
import WindowFrame from '../components/WindowFrame';
import { DailyLog } from '../types';
import '../index.css';

function DailyTrackerWindow() {
  const [logs, setLogs] = useState<DailyLog[]>([]);

  useEffect(() => {
    window.electronAPI.store.get('logs').then(setLogs);
    return window.electronAPI.store.subscribe('logs', setLogs);
  }, []);

  const persist = (next: DailyLog[]) => {
    setLogs(next);
    window.electronAPI.store.set('logs', next);
  };

  const handleAddLog = (newLog: Omit<DailyLog, 'id'>) => {
    const createdLog: DailyLog = {
      ...newLog,
      id: Date.now().toString(),
    };
    persist([...logs, createdLog]);
  };

  const handleDeleteLog = (id: string) => {
    persist(logs.filter(l => l.id !== id));
  };

  return (
    <WindowFrame title="DAILY ACTIVITY LOG" onClose={() => window.electronAPI.closeWindow()}>
      <DailyTracker
        logs={logs}
        onAddLog={handleAddLog}
        onDeleteLog={handleDeleteLog}
      />
    </WindowFrame>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DailyTrackerWindow />
  </StrictMode>,
);

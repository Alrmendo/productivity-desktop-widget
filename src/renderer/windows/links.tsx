import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import AppShortcuts from '../components/AppShortcuts';
import WindowFrame from '../components/WindowFrame';
import { AppShortcut } from '../types';
import '../index.css';

function LinksWindow() {
  const [shortcuts, setShortcuts] = useState<AppShortcut[]>([]);

  useEffect(() => {
    window.electronAPI.store.get('shortcuts').then(setShortcuts);
    return window.electronAPI.store.subscribe('shortcuts', setShortcuts);
  }, []);

  const persist = (next: AppShortcut[]) => {
    setShortcuts(next);
    window.electronAPI.store.set('shortcuts', next);
  };

  const handleAddShortcut = (newShortcut: Omit<AppShortcut, 'id'>) => {
    const createdShortcut: AppShortcut = {
      ...newShortcut,
      id: Date.now().toString(),
    };
    persist([...shortcuts, createdShortcut]);
  };

  const handleDeleteShortcut = (id: string) => {
    persist(shortcuts.filter(s => s.id !== id));
  };

  return (
    <WindowFrame title="PHÍM TẮT TRUY CẬP NHANH" onClose={() => window.electronAPI.closeWindow()}>
      <AppShortcuts
        shortcuts={shortcuts}
        onAddShortcut={handleAddShortcut}
        onDeleteShortcut={handleDeleteShortcut}
      />
    </WindowFrame>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LinksWindow />
  </StrictMode>,
);

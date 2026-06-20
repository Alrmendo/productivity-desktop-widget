import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import QuickNote from '../components/QuickNote';
import WindowFrame from '../components/WindowFrame';
import { Note } from '../types';
import '../index.css';

function QuickNoteWindow() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    window.electronAPI.store.get('notes').then(setNotes);
    return window.electronAPI.store.subscribe('notes', setNotes);
  }, []);

  const persist = (next: Note[]) => {
    setNotes(next);
    window.electronAPI.store.set('notes', next);
  };

  const handleAddNote = (newNote: Omit<Note, 'id' | 'updatedAt'>) => {
    const createdNote: Note = {
      ...newNote,
      id: Date.now().toString(),
      updatedAt: new Date().toISOString(),
    };
    persist([createdNote, ...notes]);
  };

  const handleUpdateNote = (id: string, updates: Partial<Note>) => {
    persist(notes.map(n => n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n));
  };

  const handleDeleteNote = (id: string) => {
    persist(notes.filter(n => n.id !== id));
  };

  return (
    <WindowFrame title="STICKY NOTES" onClose={() => window.electronAPI.closeWindow()}>
      <QuickNote
        notes={notes}
        onAddNote={handleAddNote}
        onUpdateNote={handleUpdateNote}
        onDeleteNote={handleDeleteNote}
      />
    </WindowFrame>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QuickNoteWindow />
  </StrictMode>,
);

import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import TodoMini from '../components/TodoMini';
import WindowFrame from '../components/WindowFrame';
import { Task } from '../types';
import '../index.css';

function TodoMiniWindow() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    window.electronAPI.store.get('tasks').then(setTasks);
    return window.electronAPI.store.subscribe('tasks', setTasks);
  }, []);

  const persist = (next: Task[]) => {
    setTasks(next);
    window.electronAPI.store.set('tasks', next);
  };

  const handleAddTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    persist([...tasks, newTask]);
  };

  const handleToggleTask = (id: string) => {
    persist(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDeleteTask = (id: string) => {
    persist(tasks.filter(t => t.id !== id));
  };

  return (
    <WindowFrame title="TODO MINI LIST" onClose={() => window.electronAPI.closeWindow()}>
      <TodoMini
        tasks={tasks}
        onAddTask={handleAddTask}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
      />
    </WindowFrame>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TodoMiniWindow />
  </StrictMode>,
);

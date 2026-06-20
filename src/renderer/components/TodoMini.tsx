import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle2, Circle, CheckSquare, Sparkles } from 'lucide-react';
import { Task } from '../types';

interface TodoMiniProps {
  tasks: Task[];
  onAddTask: (text: string) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export default function TodoMini({
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
}: TodoMiniProps) {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    onAddTask(taskText.trim());
    setTaskText('');
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="flex flex-col h-full gap-3 text-[#1A1A1B] font-sans">
      {/* Visual Task Completeness Indicator Header */}
      <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 flex items-center justify-between">
        <div>
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Tiến độ hôm nay</div>
          <div className="text-xs font-bold text-gray-800">{completedCount}/{totalCount} Nhiệm vụ ({progressPercent}%)</div>
        </div>
        {/* Simple Progress Bar */}
        <div className="w-20 bg-gray-200 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-gray-950 h-full transition-all duration-500" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Task input adding form */}
      <form onSubmit={handleSubmit} className="flex gap-1.5">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Thêm nhanh việc cần làm..."
          className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-xs outline-none focus:border-gray-400 bg-white"
          required
        />
        <button
          type="submit"
          className="py-1.5 px-3 rounded-md bg-gray-950 hover:bg-gray-900 border border-gray-950 text-white font-bold text-xs flex items-center justify-center cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Actual Scrolling tasks list */}
      <div className="flex-1 overflow-y-auto pr-0.5 space-y-1.5 max-h-[160px]">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <CheckSquare className="w-6 h-6 mx-auto mb-1.5 opacity-30 text-gray-400" />
            <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">Không có việc cần làm</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => onToggleTask(task.id)}
              className={`flex items-center justify-between p-2 rounded-xl border transition-all cursor-pointer select-none group
                ${task.completed ? 'bg-gray-50 text-gray-400 border-gray-200' : 'bg-white text-gray-800 border-gray-200 hover:border-gray-400'}`}
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <button
                  type="button"
                  className={`shrink-0 transition-colors cursor-pointer ${task.completed ? 'text-gray-900' : 'text-gray-450 hover:text-gray-900'}`}
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-4 h-4 fill-gray-100" />
                  ) : (
                    <Circle className="w-4 h-4" />
                  )}
                </button>
                <span className={`text-xs font-bold truncate ${task.completed ? 'line-through text-gray-400' : 'text-gray-905'}`}>
                  {task.text}
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteTask(task.id);
                }}
                className="p-1 rounded bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 border border-gray-200 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                title="Xoá nhiệm vụ"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))
        )}
      </div>

      {tasks.length > 0 && completedCount === totalCount && (
        <div className="text-[10px] text-gray-600 font-bold uppercase tracking-wider bg-gray-50 border border-gray-200 rounded-lg p-2 text-center flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> HOÀN THÀNH TẤT CẢ CÔNG VIỆC!
        </div>
      )}
    </div>
  );
}

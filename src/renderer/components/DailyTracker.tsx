import React, { useState } from 'react';
import { Plus, Trash2, Calendar, BookOpen, Clock, Tag } from 'lucide-react';
import { DailyLog } from '../types';

interface DailyTrackerProps {
  logs: DailyLog[];
  onAddLog: (log: Omit<DailyLog, 'id'>) => void;
  onDeleteLog: (id: string) => void;
}

const CATEGORY_STYLES: { [key: string]: { bg: string, text: string, bgBadge: string } } = {
  Work: { bg: 'bg-white', text: 'text-gray-800', bgBadge: 'bg-gray-100 text-gray-800 border border-gray-200' },
  Study: { bg: 'bg-white', text: 'text-gray-800', bgBadge: 'bg-gray-100 text-gray-800 border border-gray-200' },
  Exercise: { bg: 'bg-white', text: 'text-gray-800', bgBadge: 'bg-gray-100 text-gray-800 border border-gray-200' },
  Life: { bg: 'bg-white', text: 'text-gray-800', bgBadge: 'bg-gray-100 text-gray-800 border border-gray-200' },
  Other: { bg: 'bg-white', text: 'text-gray-800', bgBadge: 'bg-gray-100 text-gray-800 border border-gray-200' },
};

export default function DailyTracker({
  logs,
  onAddLog,
  onDeleteLog,
}: DailyTrackerProps) {
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState(30);
  const [category, setCategory] = useState<'Work' | 'Study' | 'Exercise' | 'Life' | 'Other'>('Work');

  const todayIso = new Date().toISOString().split('T')[0];

  const handleAddLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activity.trim()) return;
    onAddLog({
      date: todayIso,
      activity: activity.trim(),
      durationMinutes: duration,
      category: category,
    });
    setActivity('');
    setDuration(30);
  };

  // Aggregate stats for today
  const todayLogs = logs.filter(l => l.date === todayIso);
  const todayMinutes = todayLogs.reduce((acc, curr) => acc + curr.durationMinutes, 0);

  return (
    <div className="flex flex-col h-full gap-3 text-[#1A1A1B] font-sans">
      {/* Stats Summary badge */}
      <div className="flex items-center justify-between bg-gray-50 p-2.5 rounded-xl border border-gray-200">
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-gray-400" /> TỔNG THỜI GIAN HÔM NAY
        </span>
        <span className="text-xs font-bold text-gray-800">{todayMinutes} phút</span>
      </div>

      {/* Logging Entry Form */}
      <form onSubmit={handleAddLogSubmit} className="flex flex-col gap-2 bg-gray-50 p-3 rounded-xl border border-gray-200">
        <input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="Hôm nay bạn làm gì / học gì?"
          className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-xs outline-none focus:border-gray-400 bg-white"
          required
        />
        
        <div className="grid grid-cols-2 gap-2">
          {/* Duration choice */}
          <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-md px-2.5 py-1">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest whitespace-nowrap">Phút:</span>
            <input
              type="number"
              min="5"
              max="480"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value) || 30)}
              className="w-full text-xs font-mono font-bold bg-transparent outline-none h-6 pb-0.5 text-right text-gray-800"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full h-full text-xs text-gray-800 font-bold uppercase tracking-wider bg-white border border-gray-200 rounded-md px-2 py-1 outline-none appearance-none cursor-pointer"
            >
              <option value="Work">💻 VIỆC LÀM</option>
              <option value="Study">📚 HỌC TẬP</option>
              <option value="Exercise">🏃 SỨC KHOẺ</option>
              <option value="Life">🌱 ĐỜI SỐNG</option>
              <option value="Other">📝 KHÁC</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-1.5 rounded-lg bg-gray-950 hover:bg-gray-900 border border-gray-950 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Ghi nhận
        </button>
      </form>

      {/* Historic Timeline Logs */}
      <div className="flex-1 overflow-y-auto pr-0.5 space-y-1.5 max-h-[140px]">
        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
          NHẬT KÝ HOẠT ĐỘNG ({logs.length})
        </div>

        {logs.length === 0 ? (
          <div className="text-center py-6 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
            Chưa có ghi chép nhật ký nào.
          </div>
        ) : (
          [...logs].reverse().map((log) => {
            const style = CATEGORY_STYLES[log.category] || CATEGORY_STYLES.Other;
            return (
              <div
                key={log.id}
                className={`group flex items-center justify-between p-2 rounded-xl border border-gray-200 transition-all bg-white`}
              >
                <div className="flex flex-col gap-0.5 min-w-0 max-w-[170px]">
                  <span className="font-bold text-[11px] text-gray-900 truncate">
                    {log.activity}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[8px] font-bold px-1.5 py-0.2 rounded border border-gray-200 bg-gray-50 text-gray-600`}>
                      {log.category === 'Work' ? '💻 VIỆC' : 
                       log.category === 'Study' ? '📚 HỌC' : 
                       log.category === 'Exercise' ? '🏃 SỨC KHOẺ' : 
                       log.category === 'Life' ? '🌱 ĐỜI SỐNG' : '📝 KHÁC'}
                    </span>
                    <span className="text-[9px] text-gray-400 font-semibold uppercase">
                      {log.date === todayIso ? 'HÔM NAY' : log.date.slice(5)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-gray-800">
                    {log.durationMinutes}m
                  </span>
                  <button
                    onClick={() => onDeleteLog(log.id)}
                    className="p-1 rounded bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 border border-gray-200 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                    title="Xoá"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

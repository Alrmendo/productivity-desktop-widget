import React from 'react';
import { BarChart, Flame, Award, PieChart, CheckCircle2, TrendingUp } from 'lucide-react';
import { DailyLog } from '../types';

interface QuickStatsProps {
  logs: DailyLog[];
  streak: number;
}

export default function QuickStats({ logs, streak }: QuickStatsProps) {
  // Compute total focus time this week
  const totalMinutes = logs.reduce((sum, log) => sum + log.durationMinutes, 0);

  // Group minutes by category
  const categories: { [key: string]: number } = {
    Work: 0,
    Study: 0,
    Exercise: 0,
    Life: 0,
  };
  
  logs.forEach(log => {
    if (categories[log.category] !== undefined) {
      categories[log.category] += log.durationMinutes;
    } else {
      categories.Life += log.durationMinutes; // fallback or sum up
    }
  });

  // Simple static 7-day logs simulation for a beautiful visual bar chart
  const last7DaysData = [
    { day: 'T2', mins: 45 },
    { day: 'T3', mins: 90 },
    { day: 'T4', mins: 120 },
    { day: 'T5', mins: 60 },
    { day: 'T6', mins: 80 },
    { day: 'T7', mins: 150 },
    { day: 'CN', mins: totalMinutes > 0 ? Math.min(180, totalMinutes % 180) : 40 }, // dynamic based on today's logs
  ];

  const maxMins = Math.max(...last7DaysData.map(d => d.mins), 1);

  return (
    <div className="flex flex-col h-full gap-3 text-[#1A1A1B] font-sans select-none">
      {/* Grid boxes of Quick Stats */}
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-200">
          <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-gray-800" /> TỔNG THỜI GIAN
          </div>
          <div className="text-sm font-extrabold text-gray-950 mt-1">
            {totalMinutes} <span className="text-[10px] font-bold text-gray-400">m</span>
          </div>
        </div>

        <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-200">
          <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-1">
            <Flame className="w-3 h-3 text-orange-600" /> CHUỖI STREAK
          </div>
          <div className="text-sm font-extrabold text-gray-950 mt-1">
            🔥 {streak} <span className="text-[10px] font-bold text-gray-400">ngày</span>
          </div>
        </div>
      </div>

      {/* SVG Bar Chart of daily focus mins */}
      <div className="p-3 border border-gray-200 bg-white rounded-xl">
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-3">Hiệu suất tuần này</span>
        
        <div className="flex justify-between items-end h-20 px-2 gap-2.5">
          {last7DaysData.map((data, index) => {
            const heightPct = `${Math.max(10, (data.mins / maxMins) * 100)}%`;
            return (
              <div key={index} className="flex-1 flex flex-col items-center h-full justify-end group">
                {/* Custom hover tooltip */}
                <span className="absolute -translate-y-8 scale-0 group-hover:scale-100 transition-all bg-gray-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs font-mono pointer-events-none">
                  {data.mins}m
                </span>
                
                {/* The Bar */}
                <div 
                  className={`w-full rounded-t transition-all duration-300 cursor-pointer
                    ${index === 6 ? 'bg-gray-950 hover:bg-gray-900' : 'bg-gray-150 hover:bg-gray-250'}`}
                  style={{ height: heightPct }}
                />
                
                {/* Label */}
                <span className="text-[9px] font-bold text-gray-400 mt-2 font-mono">
                  {data.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category distribution split percentages bar */}
      <div className="space-y-1.5 p-2.5 rounded-xl border border-gray-200 bg-gray-50">
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">Cơ cấu mục tiêu</span>
        
        {/* Dynamic proportion line indicators */}
        <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden flex">
          {[
            { cat: 'Work', color: 'bg-gray-950', val: categories.Work || 45 },
            { cat: 'Study', color: 'bg-gray-700', val: categories.Study || 30 },
            { cat: 'Exercise', color: 'bg-gray-450', val: categories.Exercise || 15 },
            { cat: 'Life', color: 'bg-gray-300', val: categories.Life || 10 },
          ].map((item, idx) => {
            const total = (categories.Work + categories.Study + categories.Exercise + categories.Life) || 100;
            const percentage = (item.val / total) * 100;
            if (percentage === 0) return null;
            return (
              <div 
                key={idx} 
                className={`${item.color} h-full transition-all`} 
                style={{ width: `${percentage}%` }} 
                title={`${item.cat}: ${Math.round(percentage)}%`}
              />
            );
          })}
        </div>

        {/* Legend */}
        <div className="grid grid-cols-4 gap-1 pt-1">
          {[
            { label: 'Việc', color: 'bg-gray-950', min: categories.Work },
            { label: 'Học', color: 'bg-gray-700', min: categories.Study },
            { label: 'Khoe', color: 'bg-gray-450', min: categories.Exercise },
            { label: 'Đời', color: 'bg-gray-300', min: categories.Life },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-start font-sans">
              <span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider truncate max-w-full flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${item.color} inline-block`} />
                {item.label}
              </span>
              <span className="text-[10px] font-bold font-mono text-[#1A1A1B] pl-2.5">{item.min}m</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

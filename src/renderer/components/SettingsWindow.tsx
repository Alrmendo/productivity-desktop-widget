import React from 'react';
import { Settings, Save, HelpCircle, Bell, Clock, Monitor, User } from 'lucide-react';
import { WidgetSettings } from '../types';

interface SettingsWindowProps {
  settings: WidgetSettings;
  onUpdateSettings: (updates: Partial<WidgetSettings>) => void;
}

export default function SettingsWindow({
  settings,
  onUpdateSettings,
}: SettingsWindowProps) {
  const handleToggleAutoStart = () => {
    onUpdateSettings({ autoStart: !settings.autoStart });
  };

  const handleToggleSound = () => {
    onUpdateSettings({ soundEnabled: !settings.soundEnabled });
  };

  const handleToggleAlwaysOnTop = () => {
    onUpdateSettings({ alwaysOnTop: !settings.alwaysOnTop });
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateSettings({ username: e.target.value });
  };

  const handleNumericChange = (key: 'pomodoroWorkTime' | 'pomodoroBreakTime', value: number) => {
    onUpdateSettings({ [key]: Math.max(1, value) });
  };

  const handlePositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateSettings({ defaultPosition: e.target.value as any });
  };

  return (
    <div className="flex flex-col gap-3 text-[#1A1A1B] font-sans">
      <div className="space-y-4">
        {/* User profile identifier block */}
        <div className="space-y-1.5 p-2.5 rounded-xl border border-gray-200 bg-gray-50">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" /> TÊN NGƯỜI DÙNG
          </label>
          <input
            type="text"
            value={settings.username}
            onChange={handleUsernameChange}
            className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-xs outline-none bg-white font-bold"
            placeholder="Tên của bạn..."
          />
        </div>

        {/* Pomodoro parameters group */}
        <div className="space-y-2 p-2.5 rounded-xl border border-gray-200 bg-gray-50">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> CHU KỲ POMODORO (PHÚT)
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block mb-1">Tập trung</span>
              <input
                type="number"
                min="1"
                max="120"
                value={settings.pomodoroWorkTime}
                onChange={(e) => handleNumericChange('pomodoroWorkTime', parseInt(e.target.value) || 25)}
                className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-xs outline-none bg-white font-bold font-mono text-gray-800"
              />
            </div>
            <div>
              <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block mb-1">Nghỉ ngơi</span>
              <input
                type="number"
                min="1"
                max="60"
                value={settings.pomodoroBreakTime}
                onChange={(e) => handleNumericChange('pomodoroBreakTime', parseInt(e.target.value) || 5)}
                className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-xs outline-none bg-white font-bold font-mono text-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Integration switches */}
        <div className="space-y-2 p-2.5 rounded-xl border border-gray-200 bg-gray-50">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
            <Monitor className="w-3.5 h-3.5" /> ĐIỀU HÀNH & ÂM THANH
          </label>
          
          <div className="space-y-1.5 divide-y divide-gray-200/60">
            {/* Auto Start toggler */}
            <div className="flex items-center justify-between py-1.5 px-0.5">
              <span className="text-[11px] font-bold text-gray-700">Khởi động cùng Windows</span>
              <button
                type="button"
                onClick={handleToggleAutoStart}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none
                  ${settings.autoStart ? 'bg-gray-950' : 'bg-gray-200'}`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out
                    ${settings.autoStart ? 'translate-x-4' : 'translate-x-0'}`}
                />
              </button>
            </div>

            {/* Sound enabled toggler */}
            <div className="flex items-center justify-between pt-1.5 pb-1.5 px-0.5">
              <span className="text-[11px] font-bold text-gray-700">Âm thanh thông báo pin chuông</span>
              <button
                type="button"
                onClick={handleToggleSound}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none
                  ${settings.soundEnabled ? 'bg-gray-950' : 'bg-gray-200'}`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out
                    ${settings.soundEnabled ? 'translate-x-4' : 'translate-x-0'}`}
                />
              </button>
            </div>

            {/* Always on top windows */}
            <div className="flex items-center justify-between pt-1.5 pb-0.5 px-0.5">
              <span className="text-[11px] font-bold text-gray-700">Luôn hiển thị trên cùng (Overlay)</span>
              <button
                type="button"
                onClick={handleToggleAlwaysOnTop}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none
                  ${settings.alwaysOnTop ? 'bg-gray-950' : 'bg-gray-200'}`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out
                    ${settings.alwaysOnTop ? 'translate-x-4' : 'translate-x-0'}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Position preference */}
        <div className="space-y-1.5 p-2.5 rounded-xl border border-gray-200 bg-gray-50">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">Vị trí góc mặc định trên màn hình</span>
          <select
            value={settings.defaultPosition}
            onChange={handlePositionChange}
            className="w-full text-xs text-gray-800 font-bold bg-white border border-gray-200 rounded-md py-1.5 px-2.5 outline-none cursor-pointer"
          >
            <option value="top-right">Góc trên bên phải (Khuyên dùng)</option>
            <option value="top-left">Góc trên bên trái</option>
            <option value="bottom-right">Góc dưới bên phải</option>
            <option value="bottom-left">Góc dưới bên trái</option>
            <option value="free">Lưu vị trí kéo thả trước đó</option>
          </select>
        </div>
      </div>

      <div className="text-[9px] text-gray-400 font-bold uppercase tracking-wider text-center mt-auto pt-4 select-none">
        Các cài đặt được lưu trữ cục bộ vào cơ sở dữ liệu registry của widget.
      </div>
    </div>
  );
}

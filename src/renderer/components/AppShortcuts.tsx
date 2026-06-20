import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  ExternalLink,
  Code,
  FolderMinus,
  Terminal,
  MessageSquare,
  Mail,
  Music,
  FileSpreadsheet
} from 'lucide-react';
import { AppShortcut } from '../types';

interface AppShortcutsProps {
  shortcuts: AppShortcut[];
  onAddShortcut: (shortcut: Omit<AppShortcut, 'id'>) => void;
  onDeleteShortcut: (id: string) => void;
}

const ICON_MAP: { [key in AppShortcut['iconType']]: React.ElementType } = {
  browser: ExternalLink,
  code: Code,
  folder: FolderMinus,
  terminal: Terminal,
  chat: MessageSquare,
  mail: Mail,
  music: Music,
  document: FileSpreadsheet,
};

const ICON_LABELS: { type: AppShortcut['iconType']; label: string }[] = [
  { type: 'browser', label: 'Web/Mạng' },
  { type: 'code', label: 'Code editor' },
  { type: 'folder', label: 'Thư mục' },
  { type: 'terminal', label: 'Terminal' },
  { type: 'chat', label: 'Trò chuyện' },
  { type: 'mail', label: 'Gmail / Thư' },
  { type: 'music', label: 'Nhạc nền' },
  { type: 'document', label: 'Tài liệu' },
];

export default function AppShortcuts({
  shortcuts,
  onAddShortcut,
  onDeleteShortcut,
}: AppShortcutsProps) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [iconType, setIconType] = useState<AppShortcut['iconType']>('browser');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;

    let formattedUrl = url.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = 'https://' + formattedUrl;
    }

    onAddShortcut({
      name: name.trim(),
      url: formattedUrl,
      iconType,
    });

    setName('');
    setUrl('');
    setIconType('browser');
    setIsAdding(false);
  };

  const handleOpenShortcut = (shortcutUrl: string) => {
    window.electronAPI.openExternal(shortcutUrl);
  };

  return (
    <div className="flex flex-col gap-3 text-[#1A1A1B] font-sans">
      {isAdding ? (
        /* Form adding state */
        <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
          <div className="flex justify-between items-center pb-1 border-b border-gray-200">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Thêm phím tắt mới</span>
            <button
              onClick={() => setIsAdding(false)}
              className="text-[10px] text-gray-500 hover:text-gray-800 font-bold uppercase tracking-wider cursor-pointer"
            >
              Huỷ
            </button>
          </div>

          <div>
            <label className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1 block">Tên hiển thị</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ví dụ: ChatGPT, GitHub..."
              className="w-full px-2.5 py-1 text-xs border border-gray-200 bg-white rounded-md outline-none focus:border-gray-400"
              required
            />
          </div>

          <div>
            <label className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1 block">Đường dẫn / URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="github.com hoặc https://..."
              className="w-full px-2.5 py-1 text-xs border border-gray-200 bg-white rounded-md outline-none focus:border-gray-400"
              required
            />
          </div>

          <div>
            <label className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1 block">Loại biểu tượng</label>
            <div className="grid grid-cols-4 gap-1">
              {ICON_LABELS.map((item) => {
                const IconComponent = ICON_MAP[item.type];
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => setIconType(item.type)}
                    className={`flex flex-col items-center justify-center p-1.5 border rounded-lg transition-all cursor-pointer
                      ${iconType === item.type
                        ? 'border-gray-900 bg-gray-900 text-white font-bold'
                        : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    <span className="text-[8px] font-sans scale-[0.9] mt-0.5 whitespace-nowrap">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-1.5 py-1.5 rounded-lg bg-gray-950 hover:bg-gray-900 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-1 cursor-pointer"
          >
            Lưu phím tắt
          </button>
        </form>
      ) : (
        /* Action display list */
        <div className="flex flex-col gap-2.5">
          <div className="overflow-y-auto max-h-[220px]">
            <div className="grid grid-cols-2 gap-2">
              {shortcuts.length === 0 ? (
                <div className="col-span-2 text-center py-6 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                  Chưa cài đặt phím tắt ứng dụng nào.
                </div>
              ) : (
                shortcuts.map((shortcut) => {
                  const Icon = ICON_MAP[shortcut.iconType] || ExternalLink;
                  return (
                    <div
                      key={shortcut.id}
                      onClick={() => handleOpenShortcut(shortcut.url)}
                      className="group relative flex items-center gap-2.5 p-2 rounded-xl border border-gray-200 hover:border-gray-400 bg-white transition-all cursor-pointer"
                    >
                      <div className="p-1.5 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-gray-950 group-hover:text-white transition-colors">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-xs text-gray-950 truncate">{shortcut.name}</div>
                        <div className="text-[9px] text-gray-450 truncate">{shortcut.url.replace(/^https?:\/\//i, '')}</div>
                      </div>

                      {/* Deactivation trigger */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteShortcut(shortcut.id);
                        }}
                        className="absolute right-1.5 top-1.5 p-1 rounded bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 border border-gray-200 opacity-0 group-hover:opacity-100 hover:opacity-100 transition-all cursor-pointer"
                        title="Xoá"
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Create Shortcut Trigger */}
          <button
            onClick={() => setIsAdding(true)}
            className="w-full mt-auto py-2 px-3 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-bold uppercase tracking-wider text-[10px] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Tạo thêm phím tắt mới
          </button>
        </div>
      )}
    </div>
  );
}

import type { ReactNode, CSSProperties } from 'react';
import { X, Minus, Plus } from 'lucide-react';

const dragStyle = { WebkitAppRegion: 'drag' } as CSSProperties;
const noDragStyle = { WebkitAppRegion: 'no-drag' } as CSSProperties;

interface WindowFrameProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export default function WindowFrame({ title, onClose, children }: WindowFrameProps) {
  return (
    <div className="w-screen max-h-screen flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <div
        className="h-8 bg-white border-b border-gray-100 flex items-center justify-between px-3 cursor-move shrink-0"
        style={dragStyle}
      >
        {/* macOS-style traffic light controls */}
        <div className="group flex items-center gap-1.5" style={noDragStyle}>
          <button
            onClick={onClose}
            title="Đóng"
            className="w-3 h-3 rounded-full bg-[#FF5F57] flex items-center justify-center cursor-pointer"
          >
            <X className="w-2 h-2 text-black/60 opacity-0 group-hover:opacity-100" strokeWidth={3} />
          </button>
          <button
            onClick={() => window.electronAPI.window.minimize()}
            title="Thu nhỏ"
            className="w-3 h-3 rounded-full bg-[#FFBD2E] flex items-center justify-center cursor-pointer"
          >
            <Minus className="w-2 h-2 text-black/60 opacity-0 group-hover:opacity-100" strokeWidth={3} />
          </button>
          <button
            onClick={() => window.electronAPI.window.maximizeToggle()}
            title="Phóng to/Thu nhỏ"
            className="w-3 h-3 rounded-full bg-[#28C840] flex items-center justify-center cursor-pointer"
          >
            <Plus className="w-2 h-2 text-black/60 opacity-0 group-hover:opacity-100" strokeWidth={3} />
          </button>
        </div>

        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{title}</span>

        {/* Spacer to balance the traffic lights so the title stays centered */}
        <div className="w-12" />
      </div>
      <div className="bg-white p-4 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

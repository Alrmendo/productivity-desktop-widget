import React, { useRef, useState, useEffect } from 'react';
import { Minus, X, Move } from 'lucide-react';

interface WidgetWindowProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  defaultX: number;
  defaultY: number;
  width: number;
  height: number;
  zIndex: number;
  onFocus: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export default function WidgetWindow({
  title,
  isOpen,
  onClose,
  onMinimize,
  defaultX,
  defaultY,
  width,
  height,
  zIndex,
  onFocus,
  children,
  icon,
}: WidgetWindowProps) {
  const [position, setPosition] = useState({ x: defaultX, y: defaultY });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const initialPos = useRef({ x: defaultX, y: defaultY });
  const windowRef = useRef<HTMLDivElement>(null);

  // Sync with default values initially or if default values change
  useEffect(() => {
    setPosition({ x: defaultX, y: defaultY });
  }, [defaultX, defaultY]);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag with left click and via designated drag handle
    const target = e.target as HTMLElement;
    if (target.closest('.no-drag')) return;

    onFocus();
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    initialPos.current = { x: position.x, y: position.y };
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      
      // Let's constrain the widget to stay reasonably within the screen bounds
      const nextX = Math.max(10, Math.min(window.innerWidth - 100, initialPos.current.x + dx));
      const nextY = Math.max(10, Math.min(window.innerHeight - 100, initialPos.current.y + dy));

      setPosition({ x: nextX, y: nextY });
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  if (!isOpen) return null;

  return (
    <div
      ref={windowRef}
      id={`window-${title.toLowerCase().replace(/\s+/g, '-')}`}
      onMouseDown={onFocus}
      className={`absolute flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm transition-shadow overflow-hidden text-[#1A1A1B]
        ${isDragging ? 'shadow-md ring-1 ring-gray-300' : 'hover:shadow-md'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${width}px`,
        height: `${height}px`,
        zIndex: zIndex,
      }}
    >
      {/* Title block / Window Drag Handle (Clean Utility Compact Style: h-6 bg-gray-50 etc) */}
      <div
        onMouseDown={handleMouseDown}
        className="h-7 bg-gray-50 border-b border-gray-200 flex items-center justify-between px-3 select-none cursor-move"
      >
        <div className="flex items-center space-x-1.5 shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
        </div>

        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 truncate">
          {title}
        </span>

        {/* Action Window Controls */}
        <div className="flex items-center gap-1.5 no-drag shrink-0">
          {onMinimize && (
            <button
              onClick={onMinimize}
              className="p-0.5 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
              title="Minimize"
              id={`minimize-btn-${title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Minus className="w-3 h-3" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-0.5 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
            title="Close"
            id={`close-btn-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Window Body Context */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 bg-white">
        {children}
      </div>
    </div>
  );
}

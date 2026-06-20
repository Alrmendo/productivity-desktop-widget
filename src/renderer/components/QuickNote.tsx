import React, { useState } from 'react';
import { Plus, Trash2, Edit3, ArrowLeft, Save, Search, Palette } from 'lucide-react';
import { Note } from '../types';

interface QuickNoteProps {
  notes: Note[];
  onAddNote: (note: Omit<Note, 'id' | 'updatedAt'>) => void;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
  onDeleteNote: (id: string) => void;
}

const PASTEL_COLORS = [
  'bg-white border-gray-200 text-gray-900', // Clean White
  'bg-gray-50 border-gray-200 text-gray-900', // Light Gray
  'bg-[#FAF8F5] border-gray-200 text-gray-900', // Off-White Warm
  'bg-[#F5F8FA] border-gray-200 text-gray-900', // Cold Sky Tint
  'bg-[#FAF6F6] border-gray-200 text-gray-900', // Warm Rose Tint
];

export default function QuickNote({
  notes,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
}: QuickNoteProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  
  // States for creating/editing note
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  const activeNote = notes.find(n => n.id === activeNoteId);

  const handleEditNote = (note: Note) => {
    setActiveNoteId(note.id);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    const colorIndex = PASTEL_COLORS.findIndex(c => c.slice(0, 10) === (note.color || PASTEL_COLORS[0]).slice(0, 10));
    setSelectedColorIndex(colorIndex !== -1 ? colorIndex : 0);
  };

  const handleSave = () => {
    if (!noteTitle.trim()) return;
    
    if (activeNoteId === 'new') {
      onAddNote({
        title: noteTitle,
        content: noteContent,
        color: PASTEL_COLORS[selectedColorIndex],
      });
    } else if (activeNoteId) {
      onUpdateNote(activeNoteId, {
        title: noteTitle,
        content: noteContent,
        color: PASTEL_COLORS[selectedColorIndex],
      });
    }
    
    // Reset edit state
    setActiveNoteId(null);
    setNoteTitle('');
    setNoteContent('');
  };

  const handleCreateNew = () => {
    setActiveNoteId('new');
    setNoteTitle('Ghi chú mới');
    setNoteContent('');
    setSelectedColorIndex(0);
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full gap-3 text-[#1A1A1B] font-sans">
      {/* Editorial View Screen (New or existing Active editing note) */}
      {activeNoteId !== null ? (
        <div className="flex flex-col gap-3 h-full justify-between">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <button
              onClick={() => setActiveNoteId(null)}
              className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-gray-900 transition-colors py-1 cursor-pointer font-bold uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> GHI CHÚ
            </button>
            <button
              onClick={handleSave}
              disabled={!noteTitle.trim()}
              className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded bg-gray-950 border border-gray-950 text-white disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400 flex items-center gap-1 transition-all cursor-pointer"
            >
              <Save className="w-3 h-3" /> Lưu
            </button>
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <input
              type="text"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="w-full text-xs font-bold text-gray-900 border border-gray-200 outline-none p-2 bg-white rounded-md focus:border-gray-450"
              placeholder="Tiêu đề..."
            />
            
            {/* Pastel Color Selector */}
            <div className="flex items-center gap-2 px-1 py-1">
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Nền:</span>
              <div className="flex gap-1.5">
                {PASTEL_COLORS.map((color, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedColorIndex(idx)}
                    className={`w-4 h-4 rounded-full border transition-transform cursor-pointer
                      ${color.split(' ')[0]} 
                      ${idx === selectedColorIndex ? 'scale-110 ring-1 ring-gray-900 border-gray-900' : 'border-gray-300'}`}
                  />
                ))}
              </div>
            </div>

            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className={`w-full flex-1 p-3 rounded-lg border outline-none text-xs leading-relaxed resize-none 
                ${PASTEL_COLORS[selectedColorIndex]}`}
              placeholder="Nội dung ghi chú nhanh..."
            />
          </div>
        </div>
      ) : (
        /* Primary Notes Library / Explorer Window View */
        <div className="flex flex-col gap-2 h-full"> 
          {/* Quick Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm nhanh..."
              className="w-full pl-8 pr-3 py-1.5 border border-gray-250 rounded-md text-xs outline-none focus:border-gray-400"
            />
          </div>

          {/* Grid Cards of Notes */}
          <div className="flex-1 overflow-y-auto pr-0.5 space-y-2 max-h-[160px]">
            {filteredNotes.length === 0 ? (
              <div className="text-center py-6 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                Chương trình ghi chú trống.
              </div>
            ) : (
              filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className={`group relative p-3 rounded-xl border text-left flex flex-col gap-1 transition-all hover:border-gray-400 cursor-pointer 
                    ${note.color || PASTEL_COLORS[0]}`}
                  onClick={() => handleEditNote(note)}
                >
                  <div className="flex justify-between items-start gap-2 pr-4">
                    <h4 className="font-bold text-xs truncate max-w-[150px]">
                      {note.title}
                    </h4>
                    <span className="text-[9px] text-gray-400 shrink-0 font-bold uppercase">
                      {new Date(note.updatedAt).toLocaleDateString('vi-VN', { month: 'numeric', day: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-[10px] opacity-80 line-clamp-2 leading-normal">
                    {note.content || '(Trống)'}
                  </p>

                  {/* Deletion Trigger */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteNote(note.id);
                    }}
                    className="absolute right-2.5 bottom-2.5 p-1 rounded bg-white border border-gray-200 shadow-sm opacity-0 group-hover:opacity-100 text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                    title="Xoá"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Create New Notes CTA */}
          <button
            onClick={handleCreateNew}
            className="w-full mt-auto py-2 px-3 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-750 font-bold uppercase tracking-wider text-[10px] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Tạo ghi chú mới
          </button>
        </div>
      )}
    </div>
  );
}

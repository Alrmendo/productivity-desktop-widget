import { a as createLucideIcon, r as reactExports, j as jsxRuntimeExports, P as Plus, c as clientExports, W as WindowFrame } from "./index-BUb0iC-E.js";
import { T as Trash2 } from "./trash-2-C7p19b6v.js";
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$2);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$1);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
const PASTEL_COLORS = [
  "bg-white border-gray-200 text-gray-900",
  // Clean White
  "bg-gray-50 border-gray-200 text-gray-900",
  // Light Gray
  "bg-[#FAF8F5] border-gray-200 text-gray-900",
  // Off-White Warm
  "bg-[#F5F8FA] border-gray-200 text-gray-900",
  // Cold Sky Tint
  "bg-[#FAF6F6] border-gray-200 text-gray-900"
  // Warm Rose Tint
];
function QuickNote({
  notes,
  onAddNote,
  onUpdateNote,
  onDeleteNote
}) {
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [activeNoteId, setActiveNoteId] = reactExports.useState(null);
  const [noteTitle, setNoteTitle] = reactExports.useState("");
  const [noteContent, setNoteContent] = reactExports.useState("");
  const [selectedColorIndex, setSelectedColorIndex] = reactExports.useState(0);
  notes.find((n) => n.id === activeNoteId);
  const handleEditNote = (note) => {
    setActiveNoteId(note.id);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    const colorIndex = PASTEL_COLORS.findIndex((c) => c.slice(0, 10) === (note.color || PASTEL_COLORS[0]).slice(0, 10));
    setSelectedColorIndex(colorIndex !== -1 ? colorIndex : 0);
  };
  const handleSave = () => {
    if (!noteTitle.trim()) return;
    if (activeNoteId === "new") {
      onAddNote({
        title: noteTitle,
        content: noteContent,
        color: PASTEL_COLORS[selectedColorIndex]
      });
    } else if (activeNoteId) {
      onUpdateNote(activeNoteId, {
        title: noteTitle,
        content: noteContent,
        color: PASTEL_COLORS[selectedColorIndex]
      });
    }
    setActiveNoteId(null);
    setNoteTitle("");
    setNoteContent("");
  };
  const handleCreateNew = () => {
    setActiveNoteId("new");
    setNoteTitle("Ghi chú mới");
    setNoteContent("");
    setSelectedColorIndex(0);
  };
  const filteredNotes = notes.filter(
    (n) => n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col h-full gap-3 text-[#1A1A1B] font-sans", children: activeNoteId !== null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 h-full justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-gray-200 pb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setActiveNoteId(null),
          className: "flex items-center gap-1 text-[10px] text-gray-500 hover:text-gray-900 transition-colors py-1 cursor-pointer font-bold uppercase tracking-wider",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
            " GHI CHÚ"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleSave,
          disabled: !noteTitle.trim(),
          className: "px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded bg-gray-950 border border-gray-950 text-white disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400 flex items-center gap-1 transition-all cursor-pointer",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3 h-3" }),
            " Lưu"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: noteTitle,
          onChange: (e) => setNoteTitle(e.target.value),
          className: "w-full text-xs font-bold text-gray-900 border border-gray-200 outline-none p-2 bg-white rounded-md focus:border-gray-450",
          placeholder: "Tiêu đề..."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-1 py-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-gray-400 font-bold uppercase tracking-widest", children: "Nền:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5", children: PASTEL_COLORS.map((color, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setSelectedColorIndex(idx),
            className: `w-4 h-4 rounded-full border transition-transform cursor-pointer
                      ${color.split(" ")[0]} 
                      ${idx === selectedColorIndex ? "scale-110 ring-1 ring-gray-900 border-gray-900" : "border-gray-300"}`
          },
          idx
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: noteContent,
          onChange: (e) => setNoteContent(e.target.value),
          className: `w-full flex-1 p-3 rounded-lg border outline-none text-xs leading-relaxed resize-none 
                ${PASTEL_COLORS[selectedColorIndex]}`,
          placeholder: "Nội dung ghi chú nhanh..."
        }
      )
    ] })
  ] }) : (
    /* Primary Notes Library / Explorer Window View */
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 h-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            placeholder: "Tìm kiếm nhanh...",
            className: "w-full pl-8 pr-3 py-1.5 border border-gray-250 rounded-md text-xs outline-none focus:border-gray-400"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto pr-0.5 space-y-2 max-h-[160px]", children: filteredNotes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-6 text-gray-400 text-[10px] font-bold uppercase tracking-wider", children: "Chương trình ghi chú trống." }) : filteredNotes.map((note) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `group relative p-3 rounded-xl border text-left flex flex-col gap-1 transition-all hover:border-gray-400 cursor-pointer 
                    ${note.color || PASTEL_COLORS[0]}`,
          onClick: () => handleEditNote(note),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start gap-2 pr-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-xs truncate max-w-[150px]", children: note.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-gray-400 shrink-0 font-bold uppercase", children: new Date(note.updatedAt).toLocaleDateString("vi-VN", { month: "numeric", day: "numeric" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] opacity-80 line-clamp-2 leading-normal", children: note.content || "(Trống)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  onDeleteNote(note.id);
                },
                className: "absolute right-2.5 bottom-2.5 p-1 rounded bg-white border border-gray-200 shadow-sm opacity-0 group-hover:opacity-100 text-red-500 hover:bg-red-50 transition-all cursor-pointer",
                title: "Xoá",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
              }
            )
          ]
        },
        note.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleCreateNew,
          className: "w-full mt-auto py-2 px-3 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-750 font-bold uppercase tracking-wider text-[10px] flex items-center justify-center gap-1.5 transition-all cursor-pointer",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
            "Tạo ghi chú mới"
          ]
        }
      )
    ] })
  ) });
}
function QuickNoteWindow() {
  const [notes, setNotes] = reactExports.useState([]);
  reactExports.useEffect(() => {
    window.electronAPI.store.get("notes").then(setNotes);
    return window.electronAPI.store.subscribe("notes", setNotes);
  }, []);
  const persist = (next) => {
    setNotes(next);
    window.electronAPI.store.set("notes", next);
  };
  const handleAddNote = (newNote) => {
    const createdNote = {
      ...newNote,
      id: Date.now().toString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    persist([createdNote, ...notes]);
  };
  const handleUpdateNote = (id, updates) => {
    persist(notes.map((n) => n.id === id ? { ...n, ...updates, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } : n));
  };
  const handleDeleteNote = (id) => {
    persist(notes.filter((n) => n.id !== id));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(WindowFrame, { title: "STICKY NOTES", onClose: () => window.electronAPI.closeWindow(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    QuickNote,
    {
      notes,
      onAddNote: handleAddNote,
      onUpdateNote: handleUpdateNote,
      onDeleteNote: handleDeleteNote
    }
  ) });
}
clientExports.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(QuickNoteWindow, {}) })
);

import { a as createLucideIcon, r as reactExports, j as jsxRuntimeExports, P as Plus, c as clientExports, W as WindowFrame } from "./index-BUb0iC-E.js";
import { T as Trash2 } from "./trash-2-C7p19b6v.js";
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$7 = [
  ["path", { d: "m16 18 6-6-6-6", key: "eg8j8" }],
  ["path", { d: "m8 6-6 6 6 6", key: "ppft3o" }]
];
const Code = createLucideIcon("code", __iconNode$7);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$6);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M8 13h2", key: "yr2amv" }],
  ["path", { d: "M14 13h2", key: "un5t4a" }],
  ["path", { d: "M8 17h2", key: "2yhykz" }],
  ["path", { d: "M14 17h2", key: "10kma7" }]
];
const FileSpreadsheet = createLucideIcon("file-spreadsheet", __iconNode$5);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M9 13h6", key: "1uhe8q" }],
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ]
];
const FolderMinus = createLucideIcon("folder-minus", __iconNode$4);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode$3);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
      key: "18887p"
    }
  ]
];
const MessageSquare = createLucideIcon("message-square", __iconNode$2);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M9 18V5l12-2v13", key: "1jmyc2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["circle", { cx: "18", cy: "16", r: "3", key: "1hluhg" }]
];
const Music = createLucideIcon("music", __iconNode$1);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 19h8", key: "baeox8" }],
  ["path", { d: "m4 17 6-6-6-6", key: "1yngyt" }]
];
const Terminal = createLucideIcon("terminal", __iconNode);
const ICON_MAP = {
  browser: ExternalLink,
  code: Code,
  folder: FolderMinus,
  terminal: Terminal,
  chat: MessageSquare,
  mail: Mail,
  music: Music,
  document: FileSpreadsheet
};
const ICON_LABELS = [
  { type: "browser", label: "Web/Mạng" },
  { type: "code", label: "Code editor" },
  { type: "folder", label: "Thư mục" },
  { type: "terminal", label: "Terminal" },
  { type: "chat", label: "Trò chuyện" },
  { type: "mail", label: "Gmail / Thư" },
  { type: "music", label: "Nhạc nền" },
  { type: "document", label: "Tài liệu" }
];
function AppShortcuts({
  shortcuts,
  onAddShortcut,
  onDeleteShortcut
}) {
  const [name, setName] = reactExports.useState("");
  const [url, setUrl] = reactExports.useState("");
  const [iconType, setIconType] = reactExports.useState("browser");
  const [isAdding, setIsAdding] = reactExports.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;
    let formattedUrl = url.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = "https://" + formattedUrl;
    }
    onAddShortcut({
      name: name.trim(),
      url: formattedUrl,
      iconType
    });
    setName("");
    setUrl("");
    setIconType("browser");
    setIsAdding(false);
  };
  const handleOpenShortcut = (shortcutUrl) => {
    window.electronAPI.openExternal(shortcutUrl);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3 text-[#1A1A1B] font-sans", children: isAdding ? (
    /* Form adding state */
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-2.5 bg-gray-50 p-2.5 rounded-xl border border-gray-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pb-1 border-b border-gray-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-widest", children: "Thêm phím tắt mới" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setIsAdding(false),
            className: "text-[10px] text-gray-500 hover:text-gray-800 font-bold uppercase tracking-wider cursor-pointer",
            children: "Huỷ"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1 block", children: "Tên hiển thị" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: name,
            onChange: (e) => setName(e.target.value),
            placeholder: "Ví dụ: ChatGPT, GitHub...",
            className: "w-full px-2.5 py-1 text-xs border border-gray-200 bg-white rounded-md outline-none focus:border-gray-400",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1 block", children: "Đường dẫn / URL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: url,
            onChange: (e) => setUrl(e.target.value),
            placeholder: "github.com hoặc https://...",
            className: "w-full px-2.5 py-1 text-xs border border-gray-200 bg-white rounded-md outline-none focus:border-gray-400",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1 block", children: "Loại biểu tượng" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-1", children: ICON_LABELS.map((item) => {
          const IconComponent = ICON_MAP[item.type];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setIconType(item.type),
              className: `flex flex-col items-center justify-center p-1.5 border rounded-lg transition-all cursor-pointer
                      ${iconType === item.type ? "border-gray-900 bg-gray-900 text-white font-bold" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] font-sans scale-[0.9] mt-0.5 whitespace-nowrap", children: item.label })
              ]
            },
            item.type
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          className: "w-full mt-1.5 py-1.5 rounded-lg bg-gray-950 hover:bg-gray-900 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-1 cursor-pointer",
          children: "Lưu phím tắt"
        }
      )
    ] })
  ) : (
    /* Action display list */
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-y-auto max-h-[220px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: shortcuts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 text-center py-6 text-gray-400 text-[10px] font-bold uppercase tracking-widest", children: "Chưa cài đặt phím tắt ứng dụng nào." }) : shortcuts.map((shortcut) => {
        const Icon = ICON_MAP[shortcut.iconType] || ExternalLink;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            onClick: () => handleOpenShortcut(shortcut.url),
            className: "group relative flex items-center gap-2.5 p-2 rounded-xl border border-gray-200 hover:border-gray-400 bg-white transition-all cursor-pointer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-gray-950 group-hover:text-white transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-xs text-gray-950 truncate", children: shortcut.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-gray-450 truncate", children: shortcut.url.replace(/^https?:\/\//i, "") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: (e) => {
                    e.stopPropagation();
                    onDeleteShortcut(shortcut.id);
                  },
                  className: "absolute right-1.5 top-1.5 p-1 rounded bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 border border-gray-200 opacity-0 group-hover:opacity-100 hover:opacity-100 transition-all cursor-pointer",
                  title: "Xoá",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-2.5 h-2.5" })
                }
              )
            ]
          },
          shortcut.id
        );
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setIsAdding(true),
          className: "w-full mt-auto py-2 px-3 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-bold uppercase tracking-wider text-[10px] flex items-center justify-center gap-1.5 transition-all cursor-pointer",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
            "Tạo thêm phím tắt mới"
          ]
        }
      )
    ] })
  ) });
}
function LinksWindow() {
  const [shortcuts, setShortcuts] = reactExports.useState([]);
  reactExports.useEffect(() => {
    window.electronAPI.store.get("shortcuts").then(setShortcuts);
    return window.electronAPI.store.subscribe("shortcuts", setShortcuts);
  }, []);
  const persist = (next) => {
    setShortcuts(next);
    window.electronAPI.store.set("shortcuts", next);
  };
  const handleAddShortcut = (newShortcut) => {
    const createdShortcut = {
      ...newShortcut,
      id: Date.now().toString()
    };
    persist([...shortcuts, createdShortcut]);
  };
  const handleDeleteShortcut = (id) => {
    persist(shortcuts.filter((s) => s.id !== id));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(WindowFrame, { title: "PHÍM TẮT TRUY CẬP NHANH", onClose: () => window.electronAPI.closeWindow(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppShortcuts,
    {
      shortcuts,
      onAddShortcut: handleAddShortcut,
      onDeleteShortcut: handleDeleteShortcut
    }
  ) });
}
clientExports.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(LinksWindow, {}) })
);

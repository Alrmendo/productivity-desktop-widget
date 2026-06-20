import { a as createLucideIcon, j as jsxRuntimeExports, c as clientExports, r as reactExports, W as WindowFrame } from "./index-BUb0iC-E.js";
import { F as Flame } from "./flame-DL3X2NJL.js";
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
function QuickStats({ logs, streak }) {
  const totalMinutes = logs.reduce((sum, log) => sum + log.durationMinutes, 0);
  const categories = {
    Work: 0,
    Study: 0,
    Exercise: 0,
    Life: 0
  };
  logs.forEach((log) => {
    if (categories[log.category] !== void 0) {
      categories[log.category] += log.durationMinutes;
    } else {
      categories.Life += log.durationMinutes;
    }
  });
  const last7DaysData = [
    { day: "T2", mins: 45 },
    { day: "T3", mins: 90 },
    { day: "T4", mins: 120 },
    { day: "T5", mins: 60 },
    { day: "T6", mins: 80 },
    { day: "T7", mins: 150 },
    { day: "CN", mins: totalMinutes > 0 ? Math.min(180, totalMinutes % 180) : 40 }
    // dynamic based on today's logs
  ];
  const maxMins = Math.max(...last7DaysData.map((d) => d.mins), 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full gap-3 text-[#1A1A1B] font-sans select-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2.5 bg-gray-50 rounded-xl border border-gray-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[9px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3 text-gray-800" }),
          " TỔNG THỜI GIAN"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-extrabold text-gray-950 mt-1", children: [
          totalMinutes,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-gray-400", children: "m" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2.5 bg-gray-50 rounded-xl border border-gray-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[9px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-3 h-3 text-orange-600" }),
          " CHUỖI STREAK"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-extrabold text-gray-950 mt-1", children: [
          "🔥 ",
          streak,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-gray-400", children: "ngày" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border border-gray-200 bg-white rounded-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-3", children: "Hiệu suất tuần này" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-end h-20 px-2 gap-2.5", children: last7DaysData.map((data, index) => {
        const heightPct = `${Math.max(10, data.mins / maxMins * 100)}%`;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center h-full justify-end group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute -translate-y-8 scale-0 group-hover:scale-100 transition-all bg-gray-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs font-mono pointer-events-none", children: [
            data.mins,
            "m"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-full rounded-t transition-all duration-300 cursor-pointer
                    ${index === 6 ? "bg-gray-950 hover:bg-gray-900" : "bg-gray-150 hover:bg-gray-250"}`,
              style: { height: heightPct }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold text-gray-400 mt-2 font-mono", children: data.day })
        ] }, index);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 p-2.5 rounded-xl border border-gray-200 bg-gray-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1", children: "Cơ cấu mục tiêu" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-full rounded-full bg-gray-200 overflow-hidden flex", children: [
        { cat: "Work", color: "bg-gray-950", val: categories.Work || 45 },
        { cat: "Study", color: "bg-gray-700", val: categories.Study || 30 },
        { cat: "Exercise", color: "bg-gray-450", val: categories.Exercise || 15 },
        { cat: "Life", color: "bg-gray-300", val: categories.Life || 10 }
      ].map((item, idx) => {
        const total = categories.Work + categories.Study + categories.Exercise + categories.Life || 100;
        const percentage = item.val / total * 100;
        if (percentage === 0) return null;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `${item.color} h-full transition-all`,
            style: { width: `${percentage}%` },
            title: `${item.cat}: ${Math.round(percentage)}%`
          },
          idx
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-1 pt-1", children: [
        { label: "Việc", color: "bg-gray-950", min: categories.Work },
        { label: "Học", color: "bg-gray-700", min: categories.Study },
        { label: "Khoe", color: "bg-gray-450", min: categories.Exercise },
        { label: "Đời", color: "bg-gray-300", min: categories.Life }
      ].map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start font-sans", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[8px] text-gray-400 font-bold uppercase tracking-wider truncate max-w-full flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-1.5 h-1.5 rounded-full ${item.color} inline-block` }),
          item.label
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold font-mono text-[#1A1A1B] pl-2.5", children: [
          item.min,
          "m"
        ] })
      ] }, idx)) })
    ] })
  ] });
}
function QuickStatsWindow() {
  const [logs, setLogs] = reactExports.useState([]);
  const [streak, setStreak] = reactExports.useState(0);
  reactExports.useEffect(() => {
    window.electronAPI.store.get("logs").then(setLogs);
    window.electronAPI.store.get("streak").then(setStreak);
    const unsubLogs = window.electronAPI.store.subscribe("logs", setLogs);
    const unsubStreak = window.electronAPI.store.subscribe("streak", setStreak);
    return () => {
      unsubLogs();
      unsubStreak();
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(WindowFrame, { title: "THỐNG KÊ HIỆU SUẤT", onClose: () => window.electronAPI.closeWindow(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(QuickStats, { logs, streak }) });
}
clientExports.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(QuickStatsWindow, {}) })
);

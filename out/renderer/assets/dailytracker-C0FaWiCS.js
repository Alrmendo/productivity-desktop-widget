import { r as reactExports, j as jsxRuntimeExports, P as Plus, c as clientExports, W as WindowFrame } from "./index-BUb0iC-E.js";
import { C as Clock } from "./clock-BAcnHyeE.js";
import { T as Trash2 } from "./trash-2-C7p19b6v.js";
const CATEGORY_STYLES = {
  Work: { bg: "bg-white", text: "text-gray-800", bgBadge: "bg-gray-100 text-gray-800 border border-gray-200" },
  Study: { bg: "bg-white", text: "text-gray-800", bgBadge: "bg-gray-100 text-gray-800 border border-gray-200" },
  Exercise: { bg: "bg-white", text: "text-gray-800", bgBadge: "bg-gray-100 text-gray-800 border border-gray-200" },
  Life: { bg: "bg-white", text: "text-gray-800", bgBadge: "bg-gray-100 text-gray-800 border border-gray-200" },
  Other: { bg: "bg-white", text: "text-gray-800", bgBadge: "bg-gray-100 text-gray-800 border border-gray-200" }
};
function DailyTracker({
  logs,
  onAddLog,
  onDeleteLog
}) {
  const [activity, setActivity] = reactExports.useState("");
  const [duration, setDuration] = reactExports.useState(30);
  const [category, setCategory] = reactExports.useState("Work");
  const todayIso = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const handleAddLogSubmit = (e) => {
    e.preventDefault();
    if (!activity.trim()) return;
    onAddLog({
      date: todayIso,
      activity: activity.trim(),
      durationMinutes: duration,
      category
    });
    setActivity("");
    setDuration(30);
  };
  const todayLogs = logs.filter((l) => l.date === todayIso);
  const todayMinutes = todayLogs.reduce((acc, curr) => acc + curr.durationMinutes, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full gap-3 text-[#1A1A1B] font-sans", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-gray-50 p-2.5 rounded-xl border border-gray-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 text-gray-400" }),
        " TỔNG THỜI GIAN HÔM NAY"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-gray-800", children: [
        todayMinutes,
        " phút"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAddLogSubmit, className: "flex flex-col gap-2 bg-gray-50 p-3 rounded-xl border border-gray-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: activity,
          onChange: (e) => setActivity(e.target.value),
          placeholder: "Hôm nay bạn làm gì / học gì?",
          className: "w-full px-3 py-1.5 border border-gray-200 rounded-md text-xs outline-none focus:border-gray-400 bg-white",
          required: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-white border border-gray-200 rounded-md px-2.5 py-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-widest whitespace-nowrap", children: "Phút:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              min: "5",
              max: "480",
              value: duration,
              onChange: (e) => setDuration(parseInt(e.target.value) || 30),
              className: "w-full text-xs font-mono font-bold bg-transparent outline-none h-6 pb-0.5 text-right text-gray-800"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: category,
            onChange: (e) => setCategory(e.target.value),
            className: "w-full h-full text-xs text-gray-800 font-bold uppercase tracking-wider bg-white border border-gray-200 rounded-md px-2 py-1 outline-none appearance-none cursor-pointer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Work", children: "💻 VIỆC LÀM" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Study", children: "📚 HỌC TẬP" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Exercise", children: "🏃 SỨC KHOẺ" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Life", children: "🌱 ĐỜI SỐNG" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Other", children: "📝 KHÁC" })
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "submit",
          className: "w-full py-1.5 rounded-lg bg-gray-950 hover:bg-gray-900 border border-gray-950 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-1 cursor-pointer",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
            " Ghi nhận"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto pr-0.5 space-y-1.5 max-h-[140px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1", children: [
        "NHẬT KÝ HOẠT ĐỘNG (",
        logs.length,
        ")"
      ] }),
      logs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-6 text-gray-400 text-[10px] font-bold uppercase tracking-wider", children: "Chưa có ghi chép nhật ký nào." }) : [...logs].reverse().map((log) => {
        CATEGORY_STYLES[log.category] || CATEGORY_STYLES.Other;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `group flex items-center justify-between p-2 rounded-xl border border-gray-200 transition-all bg-white`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5 min-w-0 max-w-[170px]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-[11px] text-gray-900 truncate", children: log.activity }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[8px] font-bold px-1.5 py-0.2 rounded border border-gray-200 bg-gray-50 text-gray-600`, children: log.category === "Work" ? "💻 VIỆC" : log.category === "Study" ? "📚 HỌC" : log.category === "Exercise" ? "🏃 SỨC KHOẺ" : log.category === "Life" ? "🌱 ĐỜI SỐNG" : "📝 KHÁC" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-gray-400 font-semibold uppercase", children: log.date === todayIso ? "HÔM NAY" : log.date.slice(5) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono font-bold text-gray-800", children: [
                  log.durationMinutes,
                  "m"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => onDeleteLog(log.id),
                    className: "p-1 rounded bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 border border-gray-200 opacity-0 group-hover:opacity-100 transition-all cursor-pointer",
                    title: "Xoá",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
                  }
                )
              ] })
            ]
          },
          log.id
        );
      })
    ] })
  ] });
}
function DailyTrackerWindow() {
  const [logs, setLogs] = reactExports.useState([]);
  reactExports.useEffect(() => {
    window.electronAPI.store.get("logs").then(setLogs);
    return window.electronAPI.store.subscribe("logs", setLogs);
  }, []);
  const persist = (next) => {
    setLogs(next);
    window.electronAPI.store.set("logs", next);
  };
  const handleAddLog = (newLog) => {
    const createdLog = {
      ...newLog,
      id: Date.now().toString()
    };
    persist([...logs, createdLog]);
  };
  const handleDeleteLog = (id) => {
    persist(logs.filter((l) => l.id !== id));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(WindowFrame, { title: "DAILY ACTIVITY LOG", onClose: () => window.electronAPI.closeWindow(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    DailyTracker,
    {
      logs,
      onAddLog: handleAddLog,
      onDeleteLog: handleDeleteLog
    }
  ) });
}
clientExports.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DailyTrackerWindow, {}) })
);

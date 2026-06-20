import { a as createLucideIcon, r as reactExports, j as jsxRuntimeExports, W as WindowFrame, c as clientExports } from "./index-BUb0iC-E.js";
import { S as SquareCheckBig } from "./square-check-big-BLJyZL51.js";
import { F as Flame } from "./flame-DL3X2NJL.js";
import { P as Pause, a as Play } from "./play-BqrJGa4g.js";
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$5);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M5 21v-6", key: "1hz6c0" }],
  ["path", { d: "M12 21V3", key: "1lcnhd" }],
  ["path", { d: "M19 21V9", key: "unv183" }]
];
const ChartNoAxesColumn = createLucideIcon("chart-no-axes-column", __iconNode$4);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$3);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", key: "1cjeqo" }],
  ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", key: "19qd67" }]
];
const Link = createLucideIcon("link", __iconNode$2);
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
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode$1);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "10", x2: "14", y1: "2", y2: "2", key: "14vaq8" }],
  ["line", { x1: "12", x2: "15", y1: "14", y2: "11", key: "17fdiu" }],
  ["circle", { cx: "12", cy: "14", r: "8", key: "1e1u0o" }]
];
const Timer = createLucideIcon("timer", __iconNode);
function MainCard({
  completedTasks,
  totalTasks,
  pomodoroState,
  streak,
  settings,
  onTogglePomodoro,
  onToggleWindow,
  openWindows
}) {
  const [time, setTime] = reactExports.useState(/* @__PURE__ */ new Date());
  reactExports.useEffect(() => {
    const timer = setInterval(() => setTime(/* @__PURE__ */ new Date()), 1e3);
    return () => clearInterval(timer);
  }, []);
  const formattedTime = time.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
  const formattedDate = time.toLocaleDateString("vi-VN", {
    weekday: "short",
    day: "numeric",
    month: "numeric"
  });
  const getGreeting = () => {
    const hr = time.getHours();
    if (hr < 12) return "Chào buổi sáng";
    if (hr < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
  };
  const getPomodoroText = () => {
    const minStr = String(pomodoroState.minutes).padStart(2, "0");
    const secStr = String(pomodoroState.seconds).padStart(2, "0");
    const label = pomodoroState.mode === "work" ? "Tập trung" : "Nghỉ ngơi";
    return `${label} ${minStr}:${secStr}`;
  };
  const activeFeaturesCount = Object.values(openWindows).filter(Boolean).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 select-none text-[#1A1A1B] font-sans pb-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-3 bg-gray-50 rounded-xl border border-gray-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-sans text-3xl font-extrabold tracking-tight text-gray-950 tabular-nums", children: formattedTime }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1", children: [
        formattedDate,
        " — ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-800", children: [
          getGreeting(),
          ", ",
          settings.username
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onClick: () => onToggleWindow("todomini"),
          className: "flex items-center gap-2.5 p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 transition-colors cursor-pointer",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-lg bg-gray-100 border border-gray-200 text-gray-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "w-3.5 h-3.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-gray-400 font-bold uppercase tracking-widest", children: "Nhiệm vụ" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-bold text-gray-800", children: [
                completedTasks,
                "/",
                totalTasks,
                " xong"
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onClick: () => onToggleWindow("quickstats"),
          className: "flex items-center gap-2.5 p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-100 transition-colors cursor-pointer",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-lg bg-gray-100 border border-gray-200 text-gray-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-3.5 h-3.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-gray-400 font-bold uppercase tracking-widest", children: "Liên tục" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-bold text-gray-800", children: [
                "🔥 ",
                streak,
                " ngày"
              ] })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-white rounded-xl border border-gray-200 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-1.5 rounded-lg border ${pomodoroState.isActive ? "bg-orange-50 border-orange-200 text-orange-600" : "bg-gray-100 border-gray-200 text-gray-500"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { className: "w-3.5 h-3.5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "cursor-pointer", onClick: () => onToggleWindow("pomodoro"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-gray-400 font-bold uppercase tracking-widest", children: "Pomodoro" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-gray-800 tracking-tight", children: getPomodoroText() })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onTogglePomodoro,
          className: "p-1.5 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-700 transition-all cursor-pointer",
          children: pomodoroState.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3.5 h-3.5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2", children: [
        "DANH SÁCH WIDGETS (",
        activeFeaturesCount,
        " MỞ)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1.5", children: [
        { id: "pomodoro", name: "Timer", icon: Timer, color: "hover:bg-gray-50" },
        { id: "quicknote", name: "Notes", icon: FileText, color: "hover:bg-gray-50" },
        { id: "dailytracker", name: "Log", icon: Calendar, color: "hover:bg-gray-50" },
        { id: "todomini", name: "To-do", icon: SquareCheckBig, color: "hover:bg-gray-50" },
        { id: "quickstats", name: "Thống kê", icon: ChartNoAxesColumn, color: "hover:bg-gray-50" },
        { id: "links", name: "Links", icon: Link, color: "hover:bg-gray-50" }
      ].map((item) => {
        const isOpen = openWindows[item.id];
        const IconComponent = item.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => onToggleWindow(item.id),
            className: `flex flex-col items-center justify-center py-2 px-1 rounded-lg border text-center transition-all cursor-pointer
                  ${isOpen ? "bg-gray-900 border-gray-900 text-white shadow-xs font-bold" : `bg-white border-gray-200 text-gray-700 hover:border-gray-400 ${item.color}`}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { className: "w-3.5 h-3.5 mb-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold uppercase tracking-wider", children: item.name })
            ]
          },
          item.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-t border-gray-200 pt-2.5 mt-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-green-500 inline-block" }),
        "ACTIVE READY"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => onToggleWindow("settings"),
          className: `p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-all cursor-pointer font-bold uppercase tracking-wider text-[9px]
            ${openWindows["settings"] ? "bg-gray-900 border-gray-900 text-white" : "bg-white border-gray-200 hover:bg-gray-100 text-gray-700"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-3 h-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Cài đặt" })
          ]
        }
      )
    ] })
  ] });
}
function DesktopWorkspace() {
  const [tasks, setTasks] = reactExports.useState([]);
  const [logs, setLogs] = reactExports.useState([]);
  const [streak, setStreak] = reactExports.useState(0);
  const [settings, setSettings] = reactExports.useState({
    autoStart: false,
    defaultPosition: "top-right",
    pomodoroWorkTime: 25,
    pomodoroBreakTime: 5,
    soundEnabled: true,
    alwaysOnTop: true,
    username: ""
  });
  reactExports.useEffect(() => {
    window.electronAPI.store.get("tasks").then(setTasks);
    window.electronAPI.store.get("logs").then(setLogs);
    window.electronAPI.store.get("streak").then(setStreak);
    window.electronAPI.store.get("settings").then(setSettings);
    const unsubTasks = window.electronAPI.store.subscribe("tasks", setTasks);
    const unsubLogs = window.electronAPI.store.subscribe("logs", setLogs);
    const unsubStreak = window.electronAPI.store.subscribe("streak", setStreak);
    const unsubSettings = window.electronAPI.store.subscribe("settings", setSettings);
    return () => {
      unsubTasks();
      unsubLogs();
      unsubStreak();
      unsubSettings();
    };
  }, []);
  const [openWindows, setOpenWindows] = reactExports.useState({});
  reactExports.useEffect(() => {
    return window.electronAPI.onFeatureWindowState(setOpenWindows);
  }, []);
  const handleToggleWindow = (windowId) => {
    window.electronAPI.toggleFeatureWindow(windowId);
  };
  const [pomodoroState, setPomodoroState] = reactExports.useState({
    minutes: settings.pomodoroWorkTime,
    seconds: 0,
    isActive: false,
    mode: "work"
  });
  reactExports.useEffect(() => {
    if (!pomodoroState.isActive) {
      setPomodoroState((prev) => ({
        ...prev,
        minutes: prev.mode === "work" ? settings.pomodoroWorkTime : settings.pomodoroBreakTime,
        seconds: 0
      }));
    }
  }, [settings.pomodoroWorkTime, settings.pomodoroBreakTime]);
  reactExports.useEffect(() => {
    let interval = null;
    if (pomodoroState.isActive) {
      interval = setInterval(() => {
        if (pomodoroState.seconds > 0) {
          setPomodoroState((prev) => ({ ...prev, seconds: prev.seconds - 1 }));
        } else if (pomodoroState.minutes > 0) {
          setPomodoroState((prev) => ({ ...prev, minutes: prev.minutes - 1, seconds: 59 }));
        } else {
          if (settings.soundEnabled) {
            try {
              const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-500.wav");
              audio.volume = 0.4;
              audio.play();
            } catch (e) {
              console.log("Audio playback simulation failed.");
            }
          }
          if (pomodoroState.mode === "work") {
            setPomodoroState({
              minutes: settings.pomodoroBreakTime,
              seconds: 0,
              isActive: false,
              // pause for user review
              mode: "break"
            });
            const logEntryForm = {
              id: Date.now().toString(),
              date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
              activity: `Hoàn tất chu kỳ Pomodoro tập trung`,
              durationMinutes: settings.pomodoroWorkTime,
              category: "Work"
            };
            setLogs((prev) => {
              const next = [...prev, logEntryForm];
              window.electronAPI.store.set("logs", next);
              return next;
            });
            alert("🎉 Chúc mừng! Bạn đã hoàn thành chu kỳ tập trung. Hãy nghỉ ngơi thôi!");
          } else {
            setPomodoroState({
              minutes: settings.pomodoroWorkTime,
              seconds: 0,
              isActive: false,
              mode: "work"
            });
            alert("⏳ Hết thời gian nghỉ ngơi! Sẵn sàng tập trung tiếp thôi.");
          }
        }
      }, 1e3);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [pomodoroState.isActive, pomodoroState.minutes, pomodoroState.seconds, pomodoroState.mode, settings]);
  const handleTogglePomodoro = () => {
    setPomodoroState((prev) => ({ ...prev, isActive: !prev.isActive }));
  };
  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full select-none text-[#1A1A1B]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    MainCard,
    {
      completedTasks,
      totalTasks,
      pomodoroState,
      streak,
      settings,
      onTogglePomodoro: handleTogglePomodoro,
      onToggleWindow: handleToggleWindow,
      openWindows
    }
  ) });
}
function App() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(WindowFrame, { title: "TRUNG TÂM ĐIỀU KHIỂN", onClose: () => window.electronAPI.closeWindow(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DesktopWorkspace, {}) });
}
clientExports.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);

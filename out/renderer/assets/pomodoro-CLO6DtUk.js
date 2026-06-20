import { a as createLucideIcon, j as jsxRuntimeExports, c as clientExports, r as reactExports, W as WindowFrame } from "./index-BUb0iC-E.js";
import { F as Flame } from "./flame-DL3X2NJL.js";
import { P as Pause, a as Play } from "./play-BqrJGa4g.js";
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M14 2v2", key: "6buw04" }],
  [
    "path",
    {
      d: "M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1",
      key: "pwadti"
    }
  ],
  ["path", { d: "M6 2v2", key: "colzsn" }]
];
const Coffee = createLucideIcon("coffee", __iconNode$1);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode);
function PomodoroTimer({
  pomodoroState,
  settings,
  onTogglePomodoro,
  onResetPomodoro,
  onSetMode
}) {
  const { minutes, seconds, isActive, mode } = pomodoroState;
  const totalSeconds = mode === "work" ? settings.pomodoroWorkTime * 60 : settings.pomodoroBreakTime * 60;
  const currentSecondsLeft = minutes * 60 + seconds;
  const progressRatio = totalSeconds > 0 ? currentSecondsLeft / totalSeconds : 1;
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progressRatio);
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center h-full gap-4 text-[#1A1A1B] font-sans", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex bg-gray-50 border border-gray-200 p-1 rounded-lg w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => onSetMode("work"),
          className: `flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all cursor-pointer
            ${mode === "work" ? "bg-gray-900 text-white shadow-xs" : "text-gray-500 hover:text-gray-950"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-3.5 h-3.5" }),
            "Tập trung (",
            settings.pomodoroWorkTime,
            "m)"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => onSetMode("break"),
          className: `flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all cursor-pointer
            ${mode === "break" ? "bg-gray-900 text-white shadow-xs" : "text-gray-500 hover:text-gray-950"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Coffee, { className: "w-3.5 h-3.5" }),
            "Nghỉ ngơi (",
            settings.pomodoroBreakTime,
            "m)"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-center my-2 select-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-40 h-40 transform -rotate-90", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "80",
            cy: "80",
            r: radius,
            className: "stroke-gray-100",
            strokeWidth: "6",
            fill: "transparent"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "80",
            cy: "80",
            r: radius,
            className: `transition-all duration-300 ease-linear ${mode === "work" ? "stroke-orange-600" : "stroke-gray-800"}`,
            strokeWidth: "6",
            fill: "transparent",
            strokeDasharray: circumference,
            strokeDashoffset,
            strokeLinecap: "round"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-sans text-3xl font-extrabold text-gray-950 tracking-tight tabular-nums", children: formattedTime }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1", children: isActive ? "ĐANG CHẠY" : "TẠM DỪNG" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-wider leading-relaxed text-gray-500", children: mode === "work" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-orange-700 block", children: "💡 TẬP TRUNG CAO ĐỘ" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-700 block", children: "☕ THƯ GIÃN MẮT" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 w-full mt-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: onResetPomodoro,
          className: "flex-1 py-1.5 px-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 transition-all font-bold uppercase tracking-wider text-[10px] flex items-center justify-center gap-1.5 cursor-pointer",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3.5 h-3.5" }),
            "Đặt lại"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onTogglePomodoro,
          className: `flex-[1.5] py-1.5 px-3 rounded-lg font-bold uppercase tracking-wider text-[10px] flex items-center justify-center gap-1.5 transition-all text-white cursor-pointer
            ${mode === "work" ? "bg-[#1A1A1B] hover:bg-gray-900 bg-[#1A1A1B]" : "bg-gray-800 hover:bg-gray-750 bg-gray-800"}`,
          children: isActive ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-3.5 h-3.5" }),
            "Tạm dừng"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3.5 h-3.5" }),
            "Bắt đầu"
          ] })
        }
      )
    ] })
  ] });
}
function PomodoroWindow() {
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
    window.electronAPI.store.get("settings").then(setSettings);
    return window.electronAPI.store.subscribe("settings", setSettings);
  }, []);
  const [pomodoroState, setPomodoroState] = reactExports.useState({
    minutes: settings.pomodoroWorkTime,
    seconds: 0,
    isActive: false,
    mode: "work"
  });
  reactExports.useEffect(() => {
    let interval = null;
    if (pomodoroState.isActive) {
      interval = setInterval(() => {
        setPomodoroState((prev) => {
          if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 };
          }
          if (prev.minutes > 0) {
            return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
          }
          if (settings.soundEnabled) {
            try {
              const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-500.wav");
              audio.volume = 0.4;
              audio.play();
            } catch (e) {
              console.log("Audio playback simulation failed.");
            }
          }
          const nextMode = prev.mode === "work" ? "break" : "work";
          return {
            mode: nextMode,
            isActive: false,
            minutes: nextMode === "work" ? settings.pomodoroWorkTime : settings.pomodoroBreakTime,
            seconds: 0
          };
        });
      }, 1e3);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [pomodoroState.isActive, settings]);
  const handleTogglePomodoro = () => {
    setPomodoroState((prev) => ({ ...prev, isActive: !prev.isActive }));
  };
  const handleResetPomodoro = () => {
    setPomodoroState((prev) => ({
      ...prev,
      isActive: false,
      minutes: prev.mode === "work" ? settings.pomodoroWorkTime : settings.pomodoroBreakTime,
      seconds: 0
    }));
  };
  const handleSetMode = (mode) => {
    setPomodoroState({
      mode,
      isActive: false,
      minutes: mode === "work" ? settings.pomodoroWorkTime : settings.pomodoroBreakTime,
      seconds: 0
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(WindowFrame, { title: "POMODORO TIMER", onClose: () => window.electronAPI.closeWindow(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    PomodoroTimer,
    {
      pomodoroState,
      settings,
      onTogglePomodoro: handleTogglePomodoro,
      onResetPomodoro: handleResetPomodoro,
      onSetMode: handleSetMode
    }
  ) });
}
clientExports.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PomodoroWindow, {}) })
);

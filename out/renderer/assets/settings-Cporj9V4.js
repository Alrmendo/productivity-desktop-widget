import { a as createLucideIcon, j as jsxRuntimeExports, c as clientExports, r as reactExports, W as WindowFrame } from "./index-BUb0iC-E.js";
import { C as Clock } from "./clock-BAcnHyeE.js";
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["line", { x1: "8", x2: "16", y1: "21", y2: "21", key: "1svkeh" }],
  ["line", { x1: "12", x2: "12", y1: "17", y2: "21", key: "vw1qmm" }]
];
const Monitor = createLucideIcon("monitor", __iconNode$1);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function SettingsWindow({
  settings,
  onUpdateSettings
}) {
  const handleToggleAutoStart = () => {
    onUpdateSettings({ autoStart: !settings.autoStart });
  };
  const handleToggleSound = () => {
    onUpdateSettings({ soundEnabled: !settings.soundEnabled });
  };
  const handleToggleAlwaysOnTop = () => {
    onUpdateSettings({ alwaysOnTop: !settings.alwaysOnTop });
  };
  const handleUsernameChange = (e) => {
    onUpdateSettings({ username: e.target.value });
  };
  const handleNumericChange = (key, value) => {
    onUpdateSettings({ [key]: Math.max(1, value) });
  };
  const handlePositionChange = (e) => {
    onUpdateSettings({ defaultPosition: e.target.value });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 text-[#1A1A1B] font-sans", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 p-2.5 rounded-xl border border-gray-200 bg-gray-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5" }),
          " TÊN NGƯỜI DÙNG"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: settings.username,
            onChange: handleUsernameChange,
            className: "w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-xs outline-none bg-white font-bold",
            placeholder: "Tên của bạn..."
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 p-2.5 rounded-xl border border-gray-200 bg-gray-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
          " CHU KỲ POMODORO (PHÚT)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-gray-500 font-bold uppercase tracking-wider block mb-1", children: "Tập trung" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                min: "1",
                max: "120",
                value: settings.pomodoroWorkTime,
                onChange: (e) => handleNumericChange("pomodoroWorkTime", parseInt(e.target.value) || 25),
                className: "w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-xs outline-none bg-white font-bold font-mono text-gray-800"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-gray-500 font-bold uppercase tracking-wider block mb-1", children: "Nghỉ ngơi" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                min: "1",
                max: "60",
                value: settings.pomodoroBreakTime,
                onChange: (e) => handleNumericChange("pomodoroBreakTime", parseInt(e.target.value) || 5),
                className: "w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-xs outline-none bg-white font-bold font-mono text-gray-800"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 p-2.5 rounded-xl border border-gray-200 bg-gray-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "w-3.5 h-3.5" }),
          " ĐIỀU HÀNH & ÂM THANH"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 divide-y divide-gray-200/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-1.5 px-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold text-gray-700", children: "Khởi động cùng Windows" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleToggleAutoStart,
                className: `relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none
                  ${settings.autoStart ? "bg-gray-950" : "bg-gray-200"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out
                    ${settings.autoStart ? "translate-x-4" : "translate-x-0"}`
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1.5 pb-1.5 px-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold text-gray-700", children: "Âm thanh thông báo pin chuông" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleToggleSound,
                className: `relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none
                  ${settings.soundEnabled ? "bg-gray-950" : "bg-gray-200"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out
                    ${settings.soundEnabled ? "translate-x-4" : "translate-x-0"}`
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1.5 pb-0.5 px-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold text-gray-700", children: "Luôn hiển thị trên cùng (Overlay)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleToggleAlwaysOnTop,
                className: `relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none
                  ${settings.alwaysOnTop ? "bg-gray-950" : "bg-gray-200"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out
                    ${settings.alwaysOnTop ? "translate-x-4" : "translate-x-0"}`
                  }
                )
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 p-2.5 rounded-xl border border-gray-200 bg-gray-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-widest block", children: "Vị trí góc mặc định trên màn hình" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: settings.defaultPosition,
            onChange: handlePositionChange,
            className: "w-full text-xs text-gray-800 font-bold bg-white border border-gray-200 rounded-md py-1.5 px-2.5 outline-none cursor-pointer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "top-right", children: "Góc trên bên phải (Khuyên dùng)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "top-left", children: "Góc trên bên trái" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "bottom-right", children: "Góc dưới bên phải" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "bottom-left", children: "Góc dưới bên trái" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "free", children: "Lưu vị trí kéo thả trước đó" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-gray-400 font-bold uppercase tracking-wider text-center mt-auto pt-4 select-none", children: "Các cài đặt được lưu trữ cục bộ vào cơ sở dữ liệu registry của widget." })
  ] });
}
function debounce(fn, delayMs) {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delayMs);
  };
}
const DEBOUNCED_SETTINGS_KEYS = /* @__PURE__ */ new Set([
  "username",
  "pomodoroWorkTime",
  "pomodoroBreakTime"
]);
function SettingsWindowEntry() {
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
  const debouncedPersist = reactExports.useMemo(
    () => debounce((next) => window.electronAPI.store.set("settings", next), 400),
    []
  );
  const handleUpdateSettings = (updates) => {
    const next = { ...settings, ...updates };
    setSettings(next);
    const shouldDebounce = Object.keys(updates).some(
      (key) => DEBOUNCED_SETTINGS_KEYS.has(key)
    );
    if (shouldDebounce) {
      debouncedPersist(next);
    } else {
      window.electronAPI.store.set("settings", next);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(WindowFrame, { title: "CÀI ĐẶT HỆ THỐNG", onClose: () => window.electronAPI.closeWindow(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsWindow, { settings, onUpdateSettings: handleUpdateSettings }) });
}
clientExports.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsWindowEntry, {}) })
);

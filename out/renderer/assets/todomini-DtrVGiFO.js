import { a as createLucideIcon, r as reactExports, j as jsxRuntimeExports, P as Plus, c as clientExports, W as WindowFrame } from "./index-BUb0iC-E.js";
import { S as SquareCheckBig } from "./square-check-big-BLJyZL51.js";
import { T as Trash2 } from "./trash-2-C7p19b6v.js";
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$2);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode$1);
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
function TodoMini({
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask
}) {
  const [taskText, setTaskText] = reactExports.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    onAddTask(taskText.trim());
    setTaskText("");
  };
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? Math.round(completedCount / totalCount * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full gap-3 text-[#1A1A1B] font-sans", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 p-2.5 rounded-xl border border-gray-200 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-widest", children: "Tiến độ hôm nay" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-bold text-gray-800", children: [
          completedCount,
          "/",
          totalCount,
          " Nhiệm vụ (",
          progressPercent,
          "%)"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 bg-gray-200 h-2 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "bg-gray-950 h-full transition-all duration-500",
          style: { width: `${progressPercent}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: taskText,
          onChange: (e) => setTaskText(e.target.value),
          placeholder: "Thêm nhanh việc cần làm...",
          className: "flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-xs outline-none focus:border-gray-400 bg-white",
          required: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          className: "py-1.5 px-3 rounded-md bg-gray-950 hover:bg-gray-900 border border-gray-950 text-white font-bold text-xs flex items-center justify-center cursor-pointer shadow-xs",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto pr-0.5 space-y-1.5 max-h-[160px]", children: tasks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 text-gray-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "w-6 h-6 mx-auto mb-1.5 opacity-30 text-gray-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest leading-relaxed", children: "Không có việc cần làm" })
    ] }) : tasks.map((task) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        onClick: () => onToggleTask(task.id),
        className: `flex items-center justify-between p-2 rounded-xl border transition-all cursor-pointer select-none group
                ${task.completed ? "bg-gray-50 text-gray-400 border-gray-200" : "bg-white text-gray-800 border-gray-200 hover:border-gray-400"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: `shrink-0 transition-colors cursor-pointer ${task.completed ? "text-gray-900" : "text-gray-450 hover:text-gray-900"}`,
                children: task.completed ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 fill-gray-100" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-bold truncate ${task.completed ? "line-through text-gray-400" : "text-gray-905"}`, children: task.text })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: (e) => {
                e.stopPropagation();
                onDeleteTask(task.id);
              },
              className: "p-1 rounded bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 border border-gray-200 opacity-0 group-hover:opacity-100 transition-all cursor-pointer",
              title: "Xoá nhiệm vụ",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
            }
          )
        ]
      },
      task.id
    )) }),
    tasks.length > 0 && completedCount === totalCount && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-gray-600 font-bold uppercase tracking-wider bg-gray-50 border border-gray-200 rounded-lg p-2 text-center flex items-center justify-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
      " HOÀN THÀNH TẤT CẢ CÔNG VIỆC!"
    ] })
  ] });
}
function TodoMiniWindow() {
  const [tasks, setTasks] = reactExports.useState([]);
  reactExports.useEffect(() => {
    window.electronAPI.store.get("tasks").then(setTasks);
    return window.electronAPI.store.subscribe("tasks", setTasks);
  }, []);
  const persist = (next) => {
    setTasks(next);
    window.electronAPI.store.set("tasks", next);
  };
  const handleAddTask = (text) => {
    const newTask = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    persist([...tasks, newTask]);
  };
  const handleToggleTask = (id) => {
    persist(tasks.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
  };
  const handleDeleteTask = (id) => {
    persist(tasks.filter((t) => t.id !== id));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(WindowFrame, { title: "TODO MINI LIST", onClose: () => window.electronAPI.closeWindow(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    TodoMini,
    {
      tasks,
      onAddTask: handleAddTask,
      onToggleTask: handleToggleTask,
      onDeleteTask: handleDeleteTask
    }
  ) });
}
clientExports.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TodoMiniWindow, {}) })
);

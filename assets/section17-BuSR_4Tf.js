const e={id:17,title:"المشروع الأول: تطبيق إدارة المهام",level:"مشروع",lessons:["نظرة عامة على المشروع","إنشاء تخطيط التطبيق","إنشاء مكوّنات قابلة لإعادة الاستخدام","إنشاء نموذج بيانات المهمة","إضافة المهام","تحديث المهام","حذف المهام","تعليم المهام كمكتملة","فلترة المهام","البحث في المهام","حفظ البيانات في Local Storage","إضافة إجراءات النماذج","إضافة واجهة الانتظار","إضافة التحديثات التفاؤلية","إعادة الهيكلة النهائية","ملفات المشروع الكاملة"],intro:"مشروعنا الأول! تطبيق إدارة مهام تضيف وتعدّل وتكمل وتحذف وتفلتر وتبحث في المهام، وتحفظها بعد إعادة التحميل، وتستخدم إجراءات رياكت 19 وواجهة الانتظار والتحديثات التفاؤلية. أول قطعة في معرض أعمالك.",content:[{type:"heading",text:"1. نظرة عامة على المشروع"},{type:"list",items:["إضافة مهمة، وتعليمها مكتملة/نشطة، وتعديلها، وحذفها","فلترة (الكل / النشطة / المكتملة) وبحث بالنص","حفظ في localStorage","إجراءات النماذج + واجهة انتظار + إضافة تفاؤلية"]},{type:"code",code:`src/
├── App.jsx
├── components/
│   ├── TaskForm.jsx
│   ├── TaskList.jsx
│   ├── TaskItem.jsx
│   ├── FilterBar.jsx
│   └── SearchBar.jsx
├── hooks/useLocalStorage.jsx
└── utils/task.js`},{type:"heading",text:"2. إنشاء تخطيط التطبيق"},{type:"paragraph",text:"App.jsx هو «العقل». يملك المهام والفلتر والبحث، ويمرّر البيانات والدوال لأسفل (رفع الحالة لأعلى)."},{type:"heading",text:"3. إنشاء مكوّنات قابلة لإعادة الاستخدام"},{type:"paragraph",text:"نقسّم الواجهة لقطع صغيرة ذات مهمّة واحدة: TaskForm و TaskList و TaskItem و FilterBar و SearchBar. المكوّنات الصغيرة أسهل قراءةً وإعادة استخدام."},{type:"heading",text:"4. إنشاء نموذج بيانات المهمة"},{type:"paragraph",text:"قبل كتابة الميزات، حدّد شكل المهمة. نموذج واضح يمنع الأخطاء."},{type:"code",code:`export function createTask(text) {
  return {
    id: crypto.randomUUID(),
    text: text.trim(),
    done: false,
    createdAt: Date.now(),
  };
}`},{type:"heading",text:"5. إضافة المهام"},{type:"code",code:`function addTask(text) {
  setTasks([...tasks, createTask(text)]);
}`},{type:"heading",text:"6. تحديث المهام"},{type:"code",code:`function editTask(id, newText) {
  setTasks(tasks.map((t) => (t.id === id ? { ...t, text: newText } : t)));
}`},{type:"heading",text:"7. حذف المهام"},{type:"code",code:`function deleteTask(id) {
  setTasks(tasks.filter((t) => t.id !== id));
}`},{type:"heading",text:"8. تعليم المهام كمكتملة"},{type:"code",code:`function toggleTask(id) {
  setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
}`},{type:"heading",text:"9. فلترة المهام"},{type:"code",code:`const byFilter = tasks.filter((task) => {
  if (filter === "active") return !task.done;
  if (filter === "completed") return task.done;
  return true;
});`},{type:"heading",text:"10. البحث في المهام"},{type:"code",code:`const visibleTasks = byFilter.filter((task) =>
  task.text.toLowerCase().includes(search.toLowerCase())
);`},{type:"heading",text:"11. حفظ البيانات في Local Storage"},{type:"paragraph",text:"نريد بقاء المهام بعد إعادة التحميل. خطّاف useLocalStorage يتولّى ذلك — فقط بدّل useState به."},{type:"code",code:'const [tasks, setTasks] = useLocalStorage("tasks", []);'},{type:"heading",text:"12. إضافة إجراءات النماذج"},{type:"code",code:`async function handleAdd(formData) {
  const text = formData.get("text");
  if (!text || !text.trim()) return;
  onAdd(text.trim());
}`},{type:"heading",text:"13. إضافة واجهة الانتظار"},{type:"code",code:`import { useFormStatus } from "react-dom";
function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? "جارٍ..." : "إضافة"}</button>;
}`},{type:"heading",text:"14. إضافة التحديثات التفاؤلية"},{type:"code",code:`const [optimisticTasks, addOptimisticTask] = useOptimistic(
  tasks,
  (current, newTask) => [...current, { ...newTask, sending: true }]
);`},{type:"heading",text:"15. إعادة الهيكلة النهائية"},{type:"list",items:["شكل المهمة في نموذج واحد","مكوّنات صغيرة ذات مهمّة واحدة","حالة مشتقّة للفلتر والبحث","useLocalStorage و SubmitButton قابلان لإعادة الاستخدام"]},{type:"tip",text:"تحدّيات: زر «مسح المكتملة»، عدّاد «3 من 7 مكتملة»، تاريخ استحقاق، تعديل بالنقر المزدوج."},{type:"heading",text:"🎉 ما بنيته"},{type:"paragraph",text:"تطبيق إدارة مهام كامل ودائم يستخدم رياكت الأساسي مع إجراءات رياكت 19 وواجهة الانتظار والتحديثات التفاؤلية. يستحق معرض الأعمال!"},{type:"heading",text:"ملفات المشروع الكاملة"},{type:"paragraph",text:"فيما يلي الكود الكامل لكل ملف في المشروع. كل مقطع مُعنوَن باسم الملف الذي ينتمي إليه."},{type:"heading",text:"utils/task.js"},{type:"code",code:`// utils/task.js
export function createTask(text) {
  return {
    id: crypto.randomUUID(),
    text: text.trim(),
    done: false,
    createdAt: Date.now(),
  };
}`},{type:"heading",text:"hooks/useLocalStorage.jsx"},{type:"code",code:`// hooks/useLocalStorage.jsx
import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;`},{type:"heading",text:"components/TaskForm.jsx"},{type:"code",code:`// components/TaskForm.jsx
import SubmitButton from "./SubmitButton.jsx";

function TaskForm({ onAdd }) {
  async function handleAdd(formData) {
    const text = formData.get("text");
    if (!text || !text.trim()) return;
    onAdd(text.trim());
  }

  return (
    <form action={handleAdd} style={{ display: "flex", gap: 8 }}>
      <input name="text" placeholder="What needs doing?" autoComplete="off" />
      <SubmitButton />
    </form>
  );
}

export default TaskForm;`},{type:"heading",text:"components/SubmitButton.jsx"},{type:"code",code:`// components/SubmitButton.jsx
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Adding..." : "Add"}
    </button>
  );
}

export default SubmitButton;`},{type:"heading",text:"components/SearchBar.jsx"},{type:"code",code:`// components/SearchBar.jsx
function SearchBar({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search tasks..."
      style={{ width: "100%", padding: 8, margin: "8px 0", boxSizing: "border-box" }}
    />
  );
}

export default SearchBar;`},{type:"heading",text:"components/FilterBar.jsx"},{type:"code",code:`// components/FilterBar.jsx
const FILTERS = ["all", "active", "completed"];

function FilterBar({ filter, onChange }) {
  return (
    <div style={{ display: "flex", gap: 8, margin: "12px 0" }}>
      {FILTERS.map((name) => (
        <button
          key={name}
          onClick={() => onChange(name)}
          style={{
            fontWeight: filter === name ? "bold" : "normal",
            textTransform: "capitalize",
          }}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;`},{type:"heading",text:"components/TaskItem.jsx"},{type:"code",code:`// components/TaskItem.jsx
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 0",
        opacity: task.sending ? 0.5 : 1,
      }}
    >
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
        disabled={task.sending}
      />
      <span
        style={{
          flex: 1,
          textDecoration: task.done ? "line-through" : "none",
          color: task.done ? "#888" : "#222",
        }}
      >
        {task.text}
      </span>
      {task.sending ? (
        <small>saving…</small>
      ) : (
        <button onClick={() => onDelete(task.id)}>✕</button>
      )}
    </li>
  );
}

export default TaskItem;`},{type:"heading",text:"components/TaskList.jsx"},{type:"code",code:`// components/TaskList.jsx
import TaskItem from "./TaskItem.jsx";

function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p style={{ color: "#888" }}>No tasks here.</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;`},{type:"heading",text:"App.jsx"},{type:"code",code:`// App.jsx
import { useState, useOptimistic } from "react";
import useLocalStorage from "./hooks/useLocalStorage.jsx";
import { createTask } from "./utils/task.js";
import TaskForm from "./components/TaskForm.jsx";
import SearchBar from "./components/SearchBar.jsx";
import FilterBar from "./components/FilterBar.jsx";
import TaskList from "./components/TaskList.jsx";

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [optimisticTasks, addOptimisticTask] = useOptimistic(
    tasks,
    (current, newTask) => [...current, { ...newTask, sending: true }]
  );

  async function addTask(text) {
    const newTask = createTask(text);
    addOptimisticTask(newTask);
    await fakeSave();
    setTasks((prev) => [...prev, newTask]);
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const byFilter = optimisticTasks.filter((task) => {
    if (filter === "active") return !task.done;
    if (filter === "completed") return task.done;
    return true;
  });

  const visibleTasks = byFilter.filter((task) =>
    task.text.toLowerCase().includes(search.toLowerCase())
  );

  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <div className="app" style={{ maxWidth: 480, margin: "0 auto" }}>
      <h1>Task Manager</h1>
      <p>
        {doneCount} of {tasks.length} done
      </p>
      <TaskForm onAdd={addTask} />
      <SearchBar value={search} onChange={setSearch} />
      <FilterBar filter={filter} onChange={setFilter} />
      <TaskList
        tasks={visibleTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </div>
  );
}

function fakeSave() {
  return new Promise((resolve) => setTimeout(resolve, 600));
}

export default App;`}],titleEn:"Project 1: Task Manager App",levelEn:"Project",lessonsEn:["Project Overview","Creating the App Layout","Creating Reusable Components","Creating the Task Data Model","Adding Tasks","Editing Tasks","Deleting Tasks","Marking Tasks as Complete","Filtering Tasks","Searching Tasks","Saving Data to Local Storage","Adding Form Actions","Adding Pending UI","Adding Optimistic Updates","Final Refactor","Complete Project Files"],introEn:"Our first project! A task manager app where you can add, edit, complete, delete, filter, and search tasks — with data that persists after reload. It uses React 19 form actions, pending UI, and optimistic updates. Your first portfolio piece.",contentEn:[{type:"heading",text:"1. Project Overview"},{type:"paragraph",text:"Before writing a single line of code, understand what you're building. A clear picture of the end goal makes every step intentional."},{type:"list",items:["Add a task, mark it complete/active, edit it, and delete it","Filter (All / Active / Completed) and search by text","Persist tasks in localStorage so they survive page reloads","Form actions + pending UI + optimistic add (React 19 features)"]},{type:"code",code:`src/
├── App.jsx
├── components/
│   ├── TaskForm.jsx
│   ├── TaskList.jsx
│   ├── TaskItem.jsx
│   ├── FilterBar.jsx
│   └── SearchBar.jsx
├── hooks/useLocalStorage.jsx
└── utils/task.js`},{type:"tip",text:"Step 1 is always: draw the component tree on paper before opening your editor. It saves hours."},{type:"heading",text:"2. Creating the App Layout"},{type:"paragraph",text:"App.jsx is the 'brain'. It owns the tasks list, the active filter, and the search query — then passes data and handler functions downward. This is the Lifting State Up pattern in action."},{type:"code",code:`function App() {
  const [tasks, setTasks]   = useLocalStorage("tasks", []);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <TaskForm onAdd={addTask} />
      <SearchBar value={search} onChange={setSearch} />
      <FilterBar active={filter} onChange={setFilter} />
      <TaskList tasks={visibleTasks} onToggle={toggleTask}
                onEdit={editTask} onDelete={deleteTask} />
    </div>
  );
}`},{type:"tip",text:"Rule: own state in the highest component that needs it, not higher. App.jsx is the right home here because every child needs task data."},{type:"heading",text:"3. Creating Reusable Components"},{type:"paragraph",text:"Split the UI into small, single-purpose pieces. Each component does one thing and does it well. Smaller components are easier to read, test, and reuse in other projects."},{type:"list",items:["TaskForm — renders the input + submit button, fires onAdd","TaskList — maps over tasks and renders a TaskItem for each","TaskItem — displays one task with toggle/edit/delete buttons","FilterBar — All / Active / Completed buttons","SearchBar — controlled text input for live search"]},{type:"heading",text:"4. Creating the Task Data Model"},{type:"paragraph",text:"Define the shape of a task before writing any feature. A clear data model prevents bugs and makes every other step straightforward."},{type:"code",code:`// utils/task.js
export function createTask(text) {
  return {
    id: crypto.randomUUID(), // unique, collision-proof
    text: text.trim(),
    done: false,
    createdAt: Date.now(),
  };
}`},{type:"tip",text:"crypto.randomUUID() is built into modern browsers — no library needed for IDs."},{type:"heading",text:"5. Adding Tasks"},{type:"paragraph",text:"Create a new task object and append it to the existing list. Always produce a new array — never mutate state directly."},{type:"code",code:`function addTask(text) {
  setTasks([...tasks, createTask(text)]);
}`},{type:"paragraph",text:"TaskForm calls onAdd(text) when the user submits. It does NOT own the tasks list — it only fires an event upward."},{type:"code",code:`// TaskForm.jsx
function TaskForm({ onAdd }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={(e) => setText(e.target.value)}
             placeholder="New task..." />
      <button type="submit">Add</button>
    </form>
  );
}`},{type:"heading",text:"6. Editing Tasks"},{type:"paragraph",text:"Find the task by id and replace only its text field. map() is the right tool — it returns a new array with one item swapped."},{type:"code",code:`function editTask(id, newText) {
  setTasks(tasks.map((t) =>
    t.id === id ? { ...t, text: newText } : t
  ));
}`},{type:"tip",text:"Pattern: { ...t, text: newText } keeps every other field (done, createdAt) and only changes text."},{type:"heading",text:"7. Deleting Tasks"},{type:"paragraph",text:"filter() returns every task whose id does NOT match — effectively removing the target task."},{type:"code",code:`function deleteTask(id) {
  setTasks(tasks.filter((t) => t.id !== id));
}`},{type:"heading",text:"8. Marking Tasks as Complete"},{type:"paragraph",text:"Toggle the done boolean. map() again — find by id, flip done, keep everything else."},{type:"code",code:`function toggleTask(id) {
  setTasks(tasks.map((t) =>
    t.id === id ? { ...t, done: !t.done } : t
  ));
}`},{type:"heading",text:"9. Filtering Tasks"},{type:"paragraph",text:"Derive the visible list from the full tasks array and the active filter. This is derived state — do NOT store the filtered list separately."},{type:"code",code:`const byFilter = tasks.filter((task) => {
  if (filter === "active")    return !task.done;
  if (filter === "completed") return  task.done;
  return true; // "all"
});`},{type:"heading",text:"10. Searching Tasks"},{type:"paragraph",text:"Chain search on top of the already-filtered list. Two derived steps, one final visible list."},{type:"code",code:`const visibleTasks = byFilter.filter((task) =>
  task.text.toLowerCase().includes(search.toLowerCase())
);`},{type:"tip",text:"Both filter and search are derived state. They live in App.jsx as useState and are computed during render — never stored as a separate array."},{type:"heading",text:"11. Saving Data to Local Storage"},{type:"paragraph",text:"Tasks should survive a page reload. A custom useLocalStorage hook wraps useState and syncs to localStorage automatically — just swap useState for it."},{type:"code",code:`// hooks/useLocalStorage.jsx
import { useState, useEffect } from "react";

export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}`},{type:"code",code:`// In App.jsx — one-line swap:
const [tasks, setTasks] = useLocalStorage("tasks", []);`},{type:"heading",text:"12. Adding Form Actions (React 19)"},{type:"paragraph",text:"React 19 lets a form's action prop accept an async function. This replaces the manual onSubmit + e.preventDefault() pattern and integrates with useFormStatus."},{type:"code",code:`// TaskForm.jsx — React 19 style
async function handleAdd(formData) {
  const text = formData.get("text");
  if (!text || !text.trim()) return;
  onAdd(text.trim());
}

return (
  <form action={handleAdd}>
    <input name="text" placeholder="New task..." />
    <SubmitButton />
  </form>
);`},{type:"heading",text:"13. Adding Pending UI"},{type:"paragraph",text:"useFormStatus (from react-dom) gives the pending state of the closest parent form. Put SubmitButton inside the form so it can read that state."},{type:"code",code:`import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Adding..." : "Add"}
    </button>
  );
}`},{type:"tip",text:"SubmitButton must be a child of the form element — useFormStatus reads the nearest ancestor form."},{type:"heading",text:"14. Adding Optimistic Updates"},{type:"paragraph",text:"useOptimistic shows the new task immediately while the async action is still running. If the action fails, React rolls back to the real state automatically."},{type:"code",code:`import { useOptimistic } from "react";

const [optimisticTasks, addOptimisticTask] = useOptimistic(
  tasks,
  (current, newTask) => [...current, { ...newTask, sending: true }]
);

async function handleAdd(formData) {
  const text = formData.get("text");
  if (!text?.trim()) return;
  const task = createTask(text.trim());
  addOptimisticTask(task);   // show immediately
  onAdd(task);               // commit to real state
}`},{type:"heading",text:"15. Final Refactor"},{type:"paragraph",text:"Before calling the project done, audit the code for clarity and reusability."},{type:"list",items:["Task shape lives in one place: utils/task.js → createTask()","Small, single-purpose components: each file does one job","Derived state for filter and search — never duplicated in state","useLocalStorage and SubmitButton are generic and reusable in any project","All state lives in App.jsx — child components are pure display/event-emitters"]},{type:"tip",text:"Challenges to try: 'Clear completed' button, '3 of 7 done' counter, due dates, double-click to edit."},{type:"heading",text:"What You Built"},{type:"paragraph",text:"A complete, persistent task manager using core React with React 19 form actions, pending UI, and optimistic updates. Every pattern here — lifting state, derived state, custom hooks, component composition — appears in professional codebases every day."},{type:"qa",question:"1. Why does App.jsx own all the state instead of each component?",answer:"Because filter, search, and tasks all affect the same visible list. Owning them in one place keeps a single source of truth and avoids sync bugs between siblings."},{type:"qa",question:"2. What is the difference between optimistic updates and pending UI?",answer:"Pending UI disables the button while waiting (honest but slow-feeling). Optimistic updates show the result immediately and roll back if something fails (fast-feeling but needs a real async action)."},{type:"heading",text:"Complete Project Files"},{type:"paragraph",text:"Below is the full code for every file in the project. Each snippet is labeled with the file name it belongs to."},{type:"heading",text:"utils/task.js"},{type:"code",code:`// utils/task.js
export function createTask(text) {
  return {
    id: crypto.randomUUID(),
    text: text.trim(),
    done: false,
    createdAt: Date.now(),
  };
}`},{type:"heading",text:"hooks/useLocalStorage.jsx"},{type:"code",code:`// hooks/useLocalStorage.jsx
import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;`},{type:"heading",text:"components/TaskForm.jsx"},{type:"code",code:`// components/TaskForm.jsx
import SubmitButton from "./SubmitButton.jsx";

function TaskForm({ onAdd }) {
  async function handleAdd(formData) {
    const text = formData.get("text");
    if (!text || !text.trim()) return;
    onAdd(text.trim());
  }

  return (
    <form action={handleAdd} style={{ display: "flex", gap: 8 }}>
      <input name="text" placeholder="What needs doing?" autoComplete="off" />
      <SubmitButton />
    </form>
  );
}

export default TaskForm;`},{type:"heading",text:"components/SubmitButton.jsx"},{type:"code",code:`// components/SubmitButton.jsx
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Adding..." : "Add"}
    </button>
  );
}

export default SubmitButton;`},{type:"heading",text:"components/SearchBar.jsx"},{type:"code",code:`// components/SearchBar.jsx
function SearchBar({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search tasks..."
      style={{ width: "100%", padding: 8, margin: "8px 0", boxSizing: "border-box" }}
    />
  );
}

export default SearchBar;`},{type:"heading",text:"components/FilterBar.jsx"},{type:"code",code:`// components/FilterBar.jsx
const FILTERS = ["all", "active", "completed"];

function FilterBar({ filter, onChange }) {
  return (
    <div style={{ display: "flex", gap: 8, margin: "12px 0" }}>
      {FILTERS.map((name) => (
        <button
          key={name}
          onClick={() => onChange(name)}
          style={{
            fontWeight: filter === name ? "bold" : "normal",
            textTransform: "capitalize",
          }}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;`},{type:"heading",text:"components/TaskItem.jsx"},{type:"code",code:`// components/TaskItem.jsx
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 0",
        opacity: task.sending ? 0.5 : 1,
      }}
    >
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
        disabled={task.sending}
      />
      <span
        style={{
          flex: 1,
          textDecoration: task.done ? "line-through" : "none",
          color: task.done ? "#888" : "#222",
        }}
      >
        {task.text}
      </span>
      {task.sending ? (
        <small>saving…</small>
      ) : (
        <button onClick={() => onDelete(task.id)}>✕</button>
      )}
    </li>
  );
}

export default TaskItem;`},{type:"heading",text:"components/TaskList.jsx"},{type:"code",code:`// components/TaskList.jsx
import TaskItem from "./TaskItem.jsx";

function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p style={{ color: "#888" }}>No tasks here.</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;`},{type:"heading",text:"App.jsx"},{type:"code",code:`// App.jsx
import { useState, useOptimistic } from "react";
import useLocalStorage from "./hooks/useLocalStorage.jsx";
import { createTask } from "./utils/task.js";
import TaskForm from "./components/TaskForm.jsx";
import SearchBar from "./components/SearchBar.jsx";
import FilterBar from "./components/FilterBar.jsx";
import TaskList from "./components/TaskList.jsx";

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [optimisticTasks, addOptimisticTask] = useOptimistic(
    tasks,
    (current, newTask) => [...current, { ...newTask, sending: true }]
  );

  async function addTask(text) {
    const newTask = createTask(text);
    addOptimisticTask(newTask);
    await fakeSave();
    setTasks((prev) => [...prev, newTask]);
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const byFilter = optimisticTasks.filter((task) => {
    if (filter === "active") return !task.done;
    if (filter === "completed") return task.done;
    return true;
  });

  const visibleTasks = byFilter.filter((task) =>
    task.text.toLowerCase().includes(search.toLowerCase())
  );

  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <div className="app" style={{ maxWidth: 480, margin: "0 auto" }}>
      <h1>Task Manager</h1>
      <p>
        {doneCount} of {tasks.length} done
      </p>
      <TaskForm onAdd={addTask} />
      <SearchBar value={search} onChange={setSearch} />
      <FilterBar filter={filter} onChange={setFilter} />
      <TaskList
        tasks={visibleTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </div>
  );
}

function fakeSave() {
  return new Promise((resolve) => setTimeout(resolve, 600));
}

export default App;`}]};export{e as default};

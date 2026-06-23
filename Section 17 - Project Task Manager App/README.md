# Section 17: Project 1 — Task Manager App

> **React 19 Course** — Section 17 of 21
> Level: Project (combines Sections 3–16)

Our first project! A **Task Manager** where you add, edit, complete, delete, filter, and search tasks, save them across reloads, and use React 19 Actions, pending UI, and optimistic updates. This is your first portfolio piece.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Creating the App Layout](#2-creating-the-app-layout)
3. [Creating Reusable Components](#3-creating-reusable-components)
4. [Creating Task Data Model](#4-creating-task-data-model)
5. [Adding Tasks](#5-adding-tasks)
6. [Updating Tasks](#6-updating-tasks)
7. [Deleting Tasks](#7-deleting-tasks)
8. [Marking Tasks as Completed](#8-marking-tasks-as-completed)
9. [Filtering Tasks](#9-filtering-tasks)
10. [Searching Tasks](#10-searching-tasks)
11. [Persisting Data in Local Storage](#11-persisting-data-in-local-storage)
12. [Adding React 19 Form Actions](#12-adding-react-19-form-actions)
13. [Adding Pending UI](#13-adding-pending-ui)
14. [Adding Optimistic Updates](#14-adding-optimistic-updates)
15. [Final Refactoring](#15-final-refactoring)

📁 **Code for this section:** see the [`examples/`](./examples) folder — a complete app you can drop into a Vite project's `src/`.

---

## 1. Project Overview

**What we build:** a task list with:

- ✅ Add a task
- ✅ Mark complete / active
- ✏️ Edit a task
- 🗑️ Delete a task
- 🔍 Filter (All / Active / Completed) **and** search by text
- 💾 Save in `localStorage`
- ⚡ Form Actions + pending UI + optimistic add

**File plan:**
```
src/
├── App.jsx
├── components/
│   ├── TaskForm.jsx     ← add a task (Action)
│   ├── TaskList.jsx
│   ├── TaskItem.jsx
│   ├── FilterBar.jsx
│   └── SearchBar.jsx    ← NEW: search tasks
├── hooks/
│   └── useLocalStorage.jsx
└── utils/
    └── task.js          ← NEW: the task data model
```

---

## 2. Creating the App Layout

`App.jsx` is the "brain". It owns the tasks, filter, and search, and passes data + callbacks down (lifting state up, Section 5).

```jsx
function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  // ...add, toggle, edit, delete...

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <TaskForm onAdd={addTask} />
      <SearchBar value={search} onChange={setSearch} />
      <FilterBar filter={filter} onChange={setFilter} />
      <TaskList tasks={visibleTasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
}
```

See the full file: [`examples/App.jsx`](./examples/App.jsx)

---

## 3. Creating Reusable Components

We split the UI into small, single-job pieces: `TaskForm`, `TaskList`, `TaskItem`, `FilterBar`, `SearchBar`. Small components are easy to read and reuse (Section 16). See [`examples/components/`](./examples/components).

---

## 4. Creating Task Data Model

Before writing features, decide the **shape** of a task. A clear data model prevents bugs.

```js
// utils/task.js
export function createTask(text) {
  return {
    id: crypto.randomUUID(), // unique id (great for keys)
    text: text.trim(),       // the task text
    done: false,             // completed?
    createdAt: Date.now(),   // when it was made
  };
}
```

Every task has the same fields, so the rest of the app can rely on them. See [`examples/utils/task.js`](./examples/utils/task.js).

---

## 5. Adding Tasks

Create a task with the model, then add it to the array (new array, never `push`).

```jsx
function addTask(text) {
  setTasks([...tasks, createTask(text)]);
}
```

---

## 6. Updating Tasks

To edit a task's text, `map` over the array and change the matching one.

```jsx
function editTask(id, newText) {
  setTasks(
    tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    )
  );
}
```

---

## 7. Deleting Tasks

Use `filter` to keep every task except the one removed.

```jsx
function deleteTask(id) {
  setTasks(tasks.filter((task) => task.id !== id));
}
```

---

## 8. Marking Tasks as Completed

Toggling `done` is just an update that flips the boolean.

```jsx
function toggleTask(id) {
  setTasks(
    tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    )
  );
}
```

In `TaskItem`, a checkbox calls `onToggle(task.id)`, and completed tasks get a line-through style.

---

## 9. Filtering Tasks

The filter is **derived state** (Section 5): calculate the visible list from `tasks` + `filter`.

```jsx
const byFilter = tasks.filter((task) => {
  if (filter === "active") return !task.done;
  if (filter === "completed") return task.done;
  return true; // "all"
});
```

---

## 10. Searching Tasks

Search is also derived — chain it after the filter.

```jsx
const visibleTasks = byFilter.filter((task) =>
  task.text.toLowerCase().includes(search.toLowerCase())
);
```

The `SearchBar` is a controlled input feeding `search`. Now users can filter **and** search together. See [`examples/components/SearchBar.jsx`](./examples/components/SearchBar.jsx).

---

## 11. Persisting Data in Local Storage

We want tasks to survive a reload. Our **`useLocalStorage`** hook (Section 10) handles this — just swap `useState` for it:

```jsx
const [tasks, setTasks] = useLocalStorage("tasks", []);
```

Every change is saved to the browser and reloaded on start. See [`examples/hooks/useLocalStorage.jsx`](./examples/hooks/useLocalStorage.jsx).

---

## 12. Adding React 19 Form Actions

We upgrade `TaskForm` to use a **React 19 Action** (Section 7). Read from `formData` instead of tracking input state.

```jsx
function TaskForm({ onAdd }) {
  async function handleAdd(formData) {
    const text = formData.get("text");
    if (!text || !text.trim()) return;
    onAdd(text.trim());
    // Action forms reset their inputs automatically after success.
  }

  return (
    <form action={handleAdd}>
      <input name="text" placeholder="What needs doing?" />
      <SubmitButton />
    </form>
  );
}
```

See [`examples/components/TaskForm.jsx`](./examples/components/TaskForm.jsx).

---

## 13. Adding Pending UI

A reusable `SubmitButton` uses **`useFormStatus`** (Section 7) to show a pending state while the add runs.

```jsx
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Adding..." : "Add"}
    </button>
  );
}
```

Now the button disables and says "Adding..." automatically. See [`examples/components/SubmitButton.jsx`](./examples/components/SubmitButton.jsx).

---

## 14. Adding Optimistic Updates

For polish, make adding feel **instant** with `useOptimistic` (Section 9). The new task appears at once (faded) while it "saves".

```jsx
const [optimisticTasks, addOptimisticTask] = useOptimistic(
  tasks,
  (current, newTask) => [...current, { ...newTask, sending: true }]
);

async function addTask(text) {
  const newTask = createTask(text);
  addOptimisticTask(newTask);        // show instantly
  await fakeSave();                  // pretend to hit a server
  setTasks((prev) => [...prev, newTask]); // commit
}
```

Render `optimisticTasks` and fade items where `sending` is true. Full code in [`examples/App.jsx`](./examples/App.jsx).

---

## 15. Final Refactoring

Clean-up checklist:

- ✅ Task shape in **one model** (`utils/task.js`).
- ✅ Small, single-job components.
- ✅ Derived state for filter **and** search (no duplicate lists).
- ✅ Reusable `useLocalStorage` and `SubmitButton`.
- ✅ Actions + pending + optimistic for a smooth feel.

> 🧠 **Best practice:** keep logic in `App`/hooks and keep components about display. Easy to grow and test.

---

## 🎉 What you built

A complete, persistent task manager using core React **plus** React 19 Actions, pending UI, and optimistic updates. Portfolio-worthy!

### Challenges

1. Add a **"clear completed"** button.
2. Show a counter: "3 of 7 done" (derived state).
3. Add a **due date** and sort by it.
4. Add **edit-in-place** (double-click to rename).

---

**Next up → [Section 18: Project 2 — API Dashboard](../Section%2018%20-%20Project%20API%20Dashboard/README.md)**
A second project — fetching real data with Axios. 📊

# Section 13: Project — Task Manager App

> **React 19 Crash Course** — Section 13 of 16
> Level: Project (combines Sections 3–12)

Now we build a real app! A **Task Manager** where you can add, edit, delete, and filter tasks, save them across reloads, and use React 19 Actions and optimistic updates. This is your first portfolio project.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Creating the App Layout](#2-creating-the-app-layout)
3. [Creating Reusable Components](#3-creating-reusable-components)
4. [Adding Tasks](#4-adding-tasks)
5. [Updating Tasks](#5-updating-tasks)
6. [Deleting Tasks](#6-deleting-tasks)
7. [Filtering Tasks](#7-filtering-tasks)
8. [Persisting Data](#8-persisting-data)
9. [Adding Form Actions](#9-adding-form-actions)
10. [Adding Optimistic Updates](#10-adding-optimistic-updates)

📁 **Code for this section:** see the [`examples/`](./examples) folder. The files there form a complete app you can drop into a Vite project's `src/`.

---

## 1. Project Overview

**What we build:** a task list with these features:

- ✅ Add a task
- ✏️ Mark a task done / not done (update)
- 🗑️ Delete a task
- 🔍 Filter: All / Active / Completed
- 💾 Save tasks in `localStorage` (survive reload)
- ⚡ Optimistic add (feels instant)

**Concepts used:** components, props, state, lists, events, controlled inputs, derived state, `useEffect`, custom hooks, React 19 Actions, and `useOptimistic`.

**File plan:**
```
src/
├── App.jsx              ← top-level: holds tasks state + logic
├── components/
│   ├── TaskForm.jsx     ← add a task (uses an Action)
│   ├── TaskList.jsx     ← shows the list
│   ├── TaskItem.jsx     ← one task row (toggle + delete)
│   └── FilterBar.jsx    ← All / Active / Completed buttons
└── hooks/
    └── useLocalStorage.jsx  ← save/load from localStorage
```

---

## 2. Creating the App Layout

`App.jsx` is the "brain". It owns the task list and the filter, and passes data and callbacks down to the children. This is **lifting state up** (Section 5) in action.

```jsx
function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [filter, setFilter] = useState("all");
  // ...addTask, toggleTask, deleteTask...

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <TaskForm onAdd={addTask} />
      <FilterBar filter={filter} onChange={setFilter} />
      <TaskList tasks={visibleTasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
}
```

See the full file: [`examples/App.jsx`](./examples/App.jsx)

---

## 3. Creating Reusable Components

We split the UI into small pieces so each has one job:

- **`TaskForm`** — an input + button to add a task.
- **`TaskList`** — maps the tasks array to `TaskItem`s.
- **`TaskItem`** — one task: a checkbox to toggle, text, and a delete button.
- **`FilterBar`** — three buttons to choose the filter.

Small components are easier to read, test, and reuse. See the [`examples/components/`](./examples/components) folder.

---

## 4. Adding Tasks

When the form submits, we create a new task object and add it to the array (remember: new array, never `push`).

```jsx
function addTask(text) {
  const newTask = { id: crypto.randomUUID(), text, done: false };
  setTasks([...tasks, newTask]); // new array
}
```

- `crypto.randomUUID()` gives a unique id (great for `key`).
- `done: false` — new tasks start active.

---

## 5. Updating Tasks

To toggle a task done/undone, we `map` over the array and flip the matching one.

```jsx
function toggleTask(id) {
  setTasks(
    tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    )
  );
}
```

We make a **new object** for the changed task (`{ ...task, done: ... }`) and keep the others as-is.

---

## 6. Deleting Tasks

Use `filter` to keep every task except the one we remove.

```jsx
function deleteTask(id) {
  setTasks(tasks.filter((task) => task.id !== id));
}
```

---

## 7. Filtering Tasks

The filter is **derived state** (Section 5): we calculate the visible list from `tasks` + `filter`. We don't store a separate "visible" array.

```jsx
const visibleTasks = tasks.filter((task) => {
  if (filter === "active") return !task.done;
  if (filter === "completed") return task.done;
  return true; // "all"
});
```

---

## 8. Persisting Data

We want tasks to survive a page reload. Our **`useLocalStorage`** custom hook (from Section 9) handles this. We just swap `useState` for it:

```jsx
// Before: const [tasks, setTasks] = useState([]);
const [tasks, setTasks] = useLocalStorage("tasks", []);
```

Now every change is automatically saved to the browser, and reloaded on start. See [`examples/hooks/useLocalStorage.jsx`](./examples/hooks/useLocalStorage.jsx).

---

## 9. Adding Form Actions

We upgrade `TaskForm` to use a **React 19 Action** (Section 7). Instead of tracking input state, we read from `formData`.

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
      <button type="submit">Add</button>
    </form>
  );
}
```

See [`examples/components/TaskForm.jsx`](./examples/components/TaskForm.jsx).

---

## 10. Adding Optimistic Updates

For the final polish, we make adding a task feel **instant** with `useOptimistic` (Section 8). The new task appears immediately (slightly faded) while the "save" happens.

The key idea (full code in [`examples/App.jsx`](./examples/App.jsx)):

```jsx
const [optimisticTasks, addOptimisticTask] = useOptimistic(
  tasks,
  (current, newTask) => [...current, { ...newTask, sending: true }]
);

async function addTask(text) {
  const newTask = { id: crypto.randomUUID(), text, done: false };
  addOptimisticTask(newTask);        // show instantly
  await fakeSave();                  // pretend to hit a server
  setTasks((prev) => [...prev, newTask]); // commit
}
```

Then render `optimisticTasks` (not `tasks`) and fade items where `sending` is true.

---

## 🎉 What you built

A complete, persistent task manager using **every core React concept** plus React 19's Actions and optimistic updates. This is genuinely portfolio-worthy.

### Challenges (try these!)

1. Add an **edit** feature (double-click a task to rename it).
2. Add a **"clear completed"** button.
3. Show a **counter**: "3 of 7 tasks done" (derived state).
4. Add a **due date** to each task and sort by it.

---

**Next up → [Section 14: Project — API Dashboard](../Section%2014%20-%20Project%20API%20Dashboard/README.md)**
A second project — this time fetching real data from an API. 📊

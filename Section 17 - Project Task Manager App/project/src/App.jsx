import { useState, useOptimistic } from "react";
import useLocalStorage from "./hooks/useLocalStorage.jsx";
import { createTask } from "./utils/task.js";
import TaskForm from "./components/TaskForm.jsx";
import SearchBar from "./components/SearchBar.jsx";
import FilterBar from "./components/FilterBar.jsx";
import TaskList from "./components/TaskList.jsx";

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [filter, setFilter] = useState("all"); // all | active | completed
  const [search, setSearch] = useState("");

  // Optimistic UI: show the new task immediately while it "saves"
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
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  const byFilter = optimisticTasks.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "completed") return t.done;
    return true;
  });

  const visibleTasks = byFilter.filter((t) =>
    t.text.toLowerCase().includes(search.toLowerCase())
  );

  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        <p className="stats">
          <span>{doneCount}</span> of <span>{tasks.length}</span> tasks done
        </p>
      </header>

      <div className="card">
        <TaskForm onAdd={addTask} />
      </div>

      <div className="card">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <div className="card">
        <FilterBar filter={filter} onChange={setFilter} />
      </div>

      <TaskList tasks={visibleTasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
}

function fakeSave() {
  return new Promise((resolve) => setTimeout(resolve, 600));
}

export default App;

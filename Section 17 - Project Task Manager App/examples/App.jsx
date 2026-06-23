// App.jsx — the "brain" of the Task Manager.
// Owns tasks + filter + search, and passes data/callbacks to children.

import { useState, useOptimistic } from "react";
import useLocalStorage from "./hooks/useLocalStorage.jsx";
import { createTask } from "./utils/task.js";
import TaskForm from "./components/TaskForm.jsx";
import SearchBar from "./components/SearchBar.jsx";
import FilterBar from "./components/FilterBar.jsx";
import TaskList from "./components/TaskList.jsx";

function App() {
  // Tasks are saved to localStorage so they survive a reload.
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [filter, setFilter] = useState("all"); // all | active | completed
  const [search, setSearch] = useState("");

  // Optimistic state: show a new task instantly (faded) while it "saves".
  const [optimisticTasks, addOptimisticTask] = useOptimistic(
    tasks,
    (current, newTask) => [...current, { ...newTask, sending: true }]
  );

  // ADD (optimistic): show now, then commit after the fake save.
  async function addTask(text) {
    const newTask = createTask(text); // uses the data model
    addOptimisticTask(newTask);
    await fakeSave();
    setTasks((prev) => [...prev, newTask]);
  }

  // UPDATE: flip the matching task's done flag.
  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  // DELETE: keep everything except the matching id.
  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // DERIVED STATE: filter first, then search. No duplicate lists.
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

// Pretend to save to a server.
function fakeSave() {
  return new Promise((resolve) => setTimeout(resolve, 600));
}

export default App;

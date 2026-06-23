// App.jsx — the "brain" of the Task Manager.
// It owns the tasks + filter, and passes data/callbacks to children.

import { useState, useOptimistic } from "react";
import useLocalStorage from "./hooks/useLocalStorage.jsx";
import TaskForm from "./components/TaskForm.jsx";
import FilterBar from "./components/FilterBar.jsx";
import TaskList from "./components/TaskList.jsx";

function App() {
  // Tasks are saved to localStorage so they survive a reload.
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [filter, setFilter] = useState("all"); // all | active | completed

  // Optimistic state: show a new task instantly (faded) while it "saves".
  const [optimisticTasks, addOptimisticTask] = useOptimistic(
    tasks,
    (current, newTask) => [...current, { ...newTask, sending: true }]
  );

  // ADD (optimistic): show now, then commit after the fake save.
  async function addTask(text) {
    const newTask = { id: crypto.randomUUID(), text, done: false };
    addOptimisticTask(newTask);
    await fakeSave();
    setTasks((prev) => [...prev, newTask]);
  }

  // UPDATE: flip the matching task's done flag (new object for that one).
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

  // DERIVED STATE: calculate the visible list from tasks + filter.
  const visibleTasks = optimisticTasks.filter((task) => {
    if (filter === "active") return !task.done;
    if (filter === "completed") return task.done;
    return true;
  });

  // A small derived counter.
  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <div className="app" style={{ maxWidth: 480, margin: "0 auto" }}>
      <h1>Task Manager</h1>
      <p>
        {doneCount} of {tasks.length} done
      </p>

      <TaskForm onAdd={addTask} />
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

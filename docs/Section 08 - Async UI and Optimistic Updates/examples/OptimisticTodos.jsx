// OptimisticTodos.jsx
// Optimistic ADD for a list. The new item appears at once (faded while sending),
// then becomes permanent when the fake server confirms.

import { useState, useOptimistic } from "react";

function OptimisticTodos() {
  const [todos, setTodos] = useState([{ id: 1, text: "Learn React" }]);
  const [error, setError] = useState(null);

  // Optimistic state: current list + a new (sending) item.
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (current, newTodo) => [...current, { ...newTodo, sending: true }]
  );

  async function handleAdd(formData) {
    const text = formData.get("text");
    if (!text) return;

    const newTodo = { id: Math.random(), text };

    // Show it immediately.
    addOptimisticTodo(newTodo);

    try {
      await fakeSave(); // real save
      // Commit to the real list.
      setTodos((prev) => [...prev, newTodo]);
    } catch (err) {
      // React rolls back the optimistic item automatically.
      setError("Could not save. Try again.");
    }
  }

  return (
    <div>
      <form action={handleAdd}>
        <input name="text" placeholder="New task" />
        <button type="submit">Add</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {optimisticTodos.map((todo) => (
          <li key={todo.id} style={{ opacity: todo.sending ? 0.5 : 1 }}>
            {todo.text} {todo.sending && "(saving...)"}
          </li>
        ))}
      </ul>
    </div>
  );
}

function fakeSave() {
  return new Promise((resolve) => setTimeout(resolve, 900));
}

export default OptimisticTodos;

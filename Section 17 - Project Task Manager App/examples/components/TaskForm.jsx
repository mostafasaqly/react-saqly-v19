// TaskForm.jsx
// Adds a task using a React 19 Action.
// Reads the input from formData; SubmitButton shows the pending state.

import SubmitButton from "./SubmitButton.jsx";

function TaskForm({ onAdd }) {
  async function handleAdd(formData) {
    const text = formData.get("text");
    if (!text || !text.trim()) return; // ignore empty input
    onAdd(text.trim());
    // Action forms clear their inputs automatically after success.
  }

  return (
    <form action={handleAdd} style={{ display: "flex", gap: 8 }}>
      <input name="text" placeholder="What needs doing?" autoComplete="off" />
      <SubmitButton />
    </form>
  );
}

export default TaskForm;

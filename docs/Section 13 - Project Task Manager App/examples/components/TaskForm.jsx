// TaskForm.jsx
// Adds a task using a React 19 Action.
// We read the input from formData instead of tracking state.

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
      <button type="submit">Add</button>
    </form>
  );
}

export default TaskForm;

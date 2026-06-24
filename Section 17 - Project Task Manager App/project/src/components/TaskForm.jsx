import SubmitButton from "./SubmitButton.jsx";

function TaskForm({ onAdd }) {
  async function handleAdd(formData) {
    const text = formData.get("text");
    if (!text?.trim()) return;
    await onAdd(text.trim());
  }

  return (
    <form action={handleAdd} className="task-form">
      <input
        name="text"
        placeholder="What needs doing?"
        autoComplete="off"
      />
      <SubmitButton />
    </form>
  );
}

export default TaskForm;

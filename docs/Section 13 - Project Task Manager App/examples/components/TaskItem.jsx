// TaskItem.jsx
// One task row: a checkbox to toggle done, the text, and a delete button.
// Items still "sending" (optimistic) are shown faded.

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

export default TaskItem;

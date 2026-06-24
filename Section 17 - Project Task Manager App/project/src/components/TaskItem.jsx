function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li
      className={`task-item${task.done ? " task-item--done" : ""}${task.sending ? " task-item--sending" : ""}`}
    >
      <input
        type="checkbox"
        className="task-item__check"
        checked={task.done}
        onChange={() => onToggle(task.id)}
        disabled={task.sending}
      />

      <span className={`task-item__text${task.done ? " task-item__text--done" : ""}`}>
        {task.text}
      </span>

      {task.sending ? (
        <span className="task-item__saving">saving…</span>
      ) : (
        <button
          className="task-item__delete"
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        >
          ✕
        </button>
      )}
    </li>
  );
}

export default TaskItem;

// TaskList.jsx
// Maps the tasks array to TaskItem rows. Shows a message when empty.

import TaskItem from "./TaskItem.jsx";

function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p style={{ color: "#888" }}>No tasks here.</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;

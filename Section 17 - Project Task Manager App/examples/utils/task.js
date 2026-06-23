// task.js — the task DATA MODEL.
// One place that defines the shape of every task, so the whole app agrees.

export function createTask(text) {
  return {
    id: crypto.randomUUID(), // unique id, great for React keys
    text: text.trim(),       // the task text
    done: false,             // completed?
    createdAt: Date.now(),   // timestamp (for sorting later)
  };
}

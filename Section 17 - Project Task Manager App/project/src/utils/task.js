export function createTask(text) {
  return {
    id: crypto.randomUUID(),
    text: text.trim(),
    done: false,
    createdAt: Date.now(),
  };
}

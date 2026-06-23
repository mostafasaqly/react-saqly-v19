# Section 9: Async UI and Optimistic Updates

> **React 19 Course** — Section 9 of 21
> Level: Intermediate

Good apps feel **fast**. In this section we learn React 19 tools that keep the UI smooth during async work and make updates feel **instant**, even before the server replies.

---

## Table of Contents

1. [Async UI in React 19](#1-async-ui-in-react-19)
2. [Understanding Transitions](#2-understanding-transitions)
3. [`useTransition`](#3-usetransition)
4. [Pending UI Patterns](#4-pending-ui-patterns)
5. [`useOptimistic`](#5-useoptimistic)
6. [Optimistic Add](#6-optimistic-add)
7. [Optimistic Update](#7-optimistic-update)
8. [Optimistic Delete](#8-optimistic-delete)
9. [Error Handling in Async Actions](#9-error-handling-in-async-actions)
10. [When to Use Optimistic Updates](#10-when-to-use-optimistic-updates)

📁 **Code for this section:** see the [`examples/`](./examples) folder.

---

## 1. Async UI in React 19

### The problem

When you do slow work (like fetching or saving), the UI can freeze or feel stuck. The user clicks and... nothing seems to happen for a moment. They wonder if it's broken.

### The goal

A great async UI always answers two questions for the user:
1. **"Did my action work?"** — show feedback immediately.
2. **"Is something happening?"** — show a pending/loading state.

React 19 gives us **transitions** and **`useOptimistic`** to do both cleanly. Let's learn them.

---

## 2. Understanding Transitions

A **transition** tells React: "this update is not urgent — keep the app responsive while it happens, and give me a `pending` flag so I can show a spinner."

- **Urgent updates** (typing in an input) must feel instant.
- **Transition updates** (loading a new tab of results) can take a moment, and React keeps the page interactive meanwhile.

React 19 lets transitions contain **async** work — perfect for saving and fetching.

---

## 3. `useTransition`

`useTransition` gives you a `pending` flag and a `startTransition` function. You wrap slow work inside `startTransition`.

```jsx
import { useState, useTransition } from "react";

function SaveButton() {
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleClick() {
    startTransition(async () => {
      await saveToServer();   // slow async work
      setSaved(true);
    });
  }

  return (
    <button onClick={handleClick} disabled={isPending}>
      {isPending ? "Saving..." : saved ? "Saved ✓" : "Save"}
    </button>
  );
}
```

**What you get:** `isPending` (true while running) and `startTransition(fn)` (run `fn` as a non-urgent transition). The rest of the UI stays clickable.

👉 See [`examples/TransitionButton.jsx`](./examples/TransitionButton.jsx)

---

## 4. Pending UI Patterns

While something is pending, show the user that work is happening. Common patterns:

**Disable the button + change its text:**
```jsx
<button disabled={isPending}>{isPending ? "Loading..." : "Load"}</button>
```

**Show a spinner:**
```jsx
{isPending && <Spinner />}
```

**Dim the content:**
```jsx
<div style={{ opacity: isPending ? 0.5 : 1 }}>{content}</div>
```

**Skeleton placeholders** — gray boxes shaped like the content (see Section 18).

> 💡 **Rule:** any action over ~300ms should show pending feedback. Never leave the user guessing.

---

## 5. `useOptimistic`

### The problem

Even with a spinner, waiting for the server feels slow. When you "like" a post, you expect the heart to fill **instantly** — not after a network round-trip.

### The solution: `useOptimistic`

`useOptimistic` lets you show the **expected result immediately**, while the real request happens in the background. If the request fails, React automatically rolls back to the real value.

```jsx
import { useOptimistic } from "react";

function LikeButton({ likes, onLike }) {
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (current) => current + 1 // how to update optimistically
  );

  async function handleLike() {
    addOptimisticLike();   // UI updates INSTANTLY
    await onLike();        // real request runs in the background
  }

  return <button onClick={handleLike}>❤️ {optimisticLikes}</button>;
}
```

> ⚠️ `useOptimistic` must run inside an action or transition. That's what lets React know when to "settle" back to the real value.

👉 See [`examples/LikeButton.jsx`](./examples/LikeButton.jsx)

---

## 6. Optimistic Add

Show a new list item **immediately** (often faded), then make it permanent when the server confirms.

```jsx
const [optimisticTodos, addOptimisticTodo] = useOptimistic(
  todos,
  (current, newTodo) => [...current, { ...newTodo, sending: true }]
);

async function handleAdd(text) {
  addOptimisticTodo({ id: Math.random(), text }); // appears at once
  await saveTodo(text);                            // real save
  setTodos((prev) => [...prev, { id: Math.random(), text }]); // commit
}
```

The `sending: true` flag lets you show the new item faded until it's confirmed.

👉 See [`examples/OptimisticTodos.jsx`](./examples/OptimisticTodos.jsx)

---

## 7. Optimistic Update

Same idea for editing. Show the new value instantly with `map`:

```jsx
const [optimisticItems, setOptimisticItem] = useOptimistic(
  items,
  (current, edited) =>
    current.map((item) => (item.id === edited.id ? edited : item))
);

async function handleEdit(edited) {
  setOptimisticItem(edited);   // UI shows the change now
  await saveItem(edited);      // real save
  setItems((prev) => prev.map((i) => (i.id === edited.id ? edited : i)));
}
```

The user sees their edit immediately; the server catches up after.

---

## 8. Optimistic Delete

Remove the item from view right away with `filter`:

```jsx
const [optimisticItems, removeOptimistic] = useOptimistic(
  items,
  (current, idToRemove) => current.filter((item) => item.id !== idToRemove)
);

async function handleDelete(id) {
  removeOptimistic(id);        // disappears at once
  await deleteItem(id);        // real delete
  setItems((prev) => prev.filter((i) => i.id !== id));
}
```

If the delete fails, React brings the item back automatically.

---

## 9. Error Handling in Async Actions

Optimistic updates assume success. But networks fail. Stay safe:

**1. Wrap the real request in try/catch:**
```jsx
async function handleAdd(text) {
  addOptimisticTodo({ id: Math.random(), text });
  try {
    await saveTodo(text);
  } catch (err) {
    setError("Could not save. Please try again.");
    // React automatically rolls back the optimistic value.
  }
}
```

**2. React rolls back automatically.** The optimistic value only lives during the action. When the action ends (success or error), React returns to the real state.

**3. Tell the user.** Show an error so they know to retry.

> 🧠 **Big picture:** optimistic UI = assume success for speed, but always handle failure gracefully.

---

## 10. When to Use Optimistic Updates

Optimistic updates are great, but not always right. Use this guide.

### ✅ Good for optimistic updates
- Actions that **almost always succeed** (like, favorite, mark done).
- Small, **reversible** changes.
- Things where **instant feedback** matters a lot (chat, todos, reactions).

### ❌ Avoid optimistic updates when
- The action **often fails** or needs server confirmation (payments, booking the last seat).
- The result **depends on server data** you can't guess (an id, a calculated price).
- A wrong guess would be **confusing or risky** (showing money moved before it did).

> 🧠 **Rule of thumb:** if you'd be embarrassed to "undo" the change in front of the user, don't do it optimistically. For everything cheap and reversible, optimistic UI makes your app feel amazing.

---

## ✅ Section 9 Recap

- **Transitions** keep the UI responsive during async work.
- **`useTransition`** gives `[isPending, startTransition]`.
- **Pending UI:** disable buttons, show spinners, dim content, use skeletons.
- **`useOptimistic`** shows the expected result instantly; rolls back on failure.
- **Add / update / delete** can all be optimistic (spread, map, filter).
- **Error handling:** try/catch + automatic rollback + tell the user.
- **When to use:** cheap, reversible, usually-successful actions — not risky or server-dependent ones.

### Knowledge check

1. What does `useTransition` give you?
2. What does `useOptimistic` do when the real request fails?
3. Name one case where you should NOT use optimistic updates.

<details>
<summary>Show answers</summary>

1. A pending boolean and a `startTransition` function to run non-urgent (possibly async) updates.
2. It automatically rolls back to the real, current value.
3. Any of: payments, actions that often fail, or results that depend on server data you can't guess (like a generated id or final price).

</details>

---

**Next up → [Section 10: Component Communication](../Section%2010%20-%20Component%20Communication/README.md)**
How components share data without messy prop drilling. 🔗

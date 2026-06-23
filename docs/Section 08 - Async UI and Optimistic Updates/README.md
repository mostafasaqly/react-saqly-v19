# Section 8: Async UI and Optimistic Updates

> **React 19 Crash Course** — Section 8 of 16
> Level: Intermediate

Good apps feel **fast**. In this section we learn React 19 tools that keep the UI smooth during async work and make updates feel **instant**, even before the server replies.

---

## Table of Contents

1. [Async Transitions in React 19](#1-async-transitions-in-react-19)
2. [`useTransition`](#2-usetransition)
3. [Pending UI Patterns](#3-pending-ui-patterns)
4. [`useOptimistic`](#4-useoptimistic)
5. [Optimistic Add, Update, and Delete](#5-optimistic-add-update-and-delete)
6. [Error Handling in Async Actions](#6-error-handling-in-async-actions)

📁 **Code for this section:** see the [`examples/`](./examples) folder.

---

## 1. Async Transitions in React 19

### The problem

When you do slow work (like fetching), the UI can freeze or feel stuck. The user clicks and... nothing seems to happen for a moment.

### The solution: transitions

A **transition** tells React: "this update is not urgent — keep the app responsive while it happens, and give me a `pending` flag so I can show a spinner." React 19 lets transitions contain **async** work.

The tool for this is the `useTransition` hook.

---

## 2. `useTransition`

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

**What you get:**
- `isPending` — `true` while the transition runs.
- `startTransition(fn)` — run `fn` as a non-urgent transition.

This keeps the rest of the UI clickable while the save happens.

👉 See [`examples/TransitionButton.jsx`](./examples/TransitionButton.jsx)

---

## 3. Pending UI Patterns

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

**Skeleton placeholders** (gray boxes shaped like the content) — covered more in Section 14.

> 💡 **Rule:** Never leave the user guessing. Any action over ~300ms should show pending feedback.

---

## 4. `useOptimistic`

### The problem

Even with a spinner, waiting for the server feels slow. When you "like" a post, you expect the heart to fill **instantly** — not after a network round-trip.

### The solution: `useOptimistic`

`useOptimistic` lets you show the **expected result immediately**, while the real request happens in the background. If the request fails, React automatically rolls back to the real value.

```jsx
import { useOptimistic } from "react";

function LikeButton({ likes, onLike }) {
  // optimisticLikes shows the guessed value right away.
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

**The magic:** the number goes up the moment you click. If the request fails, React puts it back to the true value automatically.

> ⚠️ `useOptimistic` must be used inside an action or transition (the async work). That is what lets React know when to "settle" back to the real value.

👉 See [`examples/LikeButton.jsx`](./examples/LikeButton.jsx)

---

## 5. Optimistic Add, Update, and Delete

The same idea works for lists. You show the change right away, then sync with the server.

**Optimistic ADD** — show the new item immediately:
```jsx
const [optimisticTodos, addOptimisticTodo] = useOptimistic(
  todos,
  (current, newTodo) => [...current, { ...newTodo, sending: true }]
);

async function handleAdd(text) {
  addOptimisticTodo({ id: Math.random(), text });
  await saveTodo(text); // real save
}
```

The new item appears at once (often shown slightly faded with `sending: true`), then becomes permanent when the server confirms.

**Optimistic DELETE** — remove it from view right away:
```jsx
(current, idToRemove) => current.filter((t) => t.id !== idToRemove)
```

**Optimistic UPDATE** — change it right away:
```jsx
(current, edited) =>
  current.map((t) => (t.id === edited.id ? edited : t))
```

We use all three of these in the **Task Manager project (Section 13)**.

👉 See [`examples/OptimisticTodos.jsx`](./examples/OptimisticTodos.jsx)

---

## 6. Error Handling in Async Actions

Optimistic updates assume success. But networks fail. Here is how to stay safe:

**1. Wrap the real request in try/catch:**
```jsx
async function handleAdd(text) {
  addOptimisticTodo({ id: Math.random(), text });
  try {
    await saveTodo(text);   // if this throws...
  } catch (err) {
    setError("Could not save. Please try again.");
    // React automatically rolls back the optimistic value.
  }
}
```

**2. React rolls back automatically.** Because the optimistic value only lives during the action, if the action ends (success or error) React returns to the real state.

**3. Tell the user.** Show an error message so they know to retry.

> 🧠 **Big picture:** Optimistic UI = assume success for speed, but always handle failure gracefully.

---

## ✅ Section 8 Recap

- **Transitions** keep the UI responsive during async work.
- **`useTransition`** gives `[isPending, startTransition]`.
- **Pending UI:** disable buttons, show spinners, dim content, use skeletons.
- **`useOptimistic`** shows the expected result instantly; rolls back on failure.
- **Add / update / delete** can all be optimistic.
- **Error handling:** use try/catch, rely on automatic rollback, and tell the user.

### Knowledge check

1. What does `useTransition` give you?
2. What does `useOptimistic` do when the real request fails?
3. Why show pending feedback for slow actions?

<details>
<summary>Show answers</summary>

1. A pending boolean and a `startTransition` function to run non-urgent (possibly async) updates.
2. It automatically rolls back to the real, current value.
3. So the user knows their action was received and work is happening — otherwise the app feels broken or frozen.

</details>

---

**Next up → [Section 9: Component Communication](../Section%2009%20-%20Component%20Communication/README.md)**
How components share data without messy prop drilling. 🔗

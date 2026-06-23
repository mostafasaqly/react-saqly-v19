# Section 6: Effects and Lifecycle

> **React 19 Crash Course** — Section 6 of 16
> Level: Intermediate

So far our components only draw UI from props and state. But real apps must also talk to the **outside world**: timers, browser APIs, and servers. That is what **effects** are for.

---

## Table of Contents

1. [What is a Side Effect?](#1-what-is-a-side-effect)
2. [`useEffect` Hook](#2-useeffect-hook)
3. [Effect Dependencies](#3-effect-dependencies)
4. [Cleanup Functions](#4-cleanup-functions)
5. [Common `useEffect` Mistakes](#5-common-useeffect-mistakes)
6. [Fetching Data with `useEffect`](#6-fetching-data-with-useeffect)

📁 **Code for this section:** see the [`examples/`](./examples) folder.

---

## 1. What is a Side Effect?

### The idea

A component's main job is to take props/state and return UI. That is a "pure" calculation.

A **side effect** is anything *else* the component does that reaches outside React:

- Setting a timer (`setInterval`, `setTimeout`)
- Fetching data from a server
- Reading or writing `localStorage`
- Changing the page title
- Adding an event listener to `window`

These cannot happen during rendering (that would cause bugs). They need a special place to run — **after** React updates the screen. That place is `useEffect`.

---

## 2. `useEffect` Hook

`useEffect` runs code **after** the component renders.

```jsx
import { useEffect } from "react";

function Title() {
  useEffect(() => {
    // This runs AFTER the screen updates.
    document.title = "Welcome!";
  });

  return <h1>Hello</h1>;
}
```

The shape is always:

```jsx
useEffect(() => {
  // your side-effect code
}, [/* dependencies */]);
```

The **second argument** (the array) controls *when* the effect runs. This is the most important part — let's see it next.

---

## 3. Effect Dependencies

The dependency array tells React when to re-run the effect.

| Dependency array | When the effect runs |
| --- | --- |
| *(nothing — omitted)* | After **every** render |
| `[]` (empty) | **Once**, after the first render only |
| `[count]` | After the first render, and whenever `count` changes |

```jsx
// Runs once when the component first appears (good for setup):
useEffect(() => {
  console.log("Component mounted");
}, []);

// Runs every time `count` changes:
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

> 🧠 **Rule:** List every prop or state value your effect *uses* inside the array. If you use `count` inside, put `count` in the array.

👉 See [`examples/DocumentTitle.jsx`](./examples/DocumentTitle.jsx)

---

## 4. Cleanup Functions

### The problem

Some effects start something that keeps running — like a timer or a subscription. If you don't stop it, it leaks and causes bugs (and runs even after the component is gone).

### The solution: return a cleanup function

If your effect returns a function, React runs it to **clean up** — before the next effect run, and when the component is removed.

```jsx
useEffect(() => {
  // Start a timer
  const id = setInterval(() => {
    console.log("tick");
  }, 1000);

  // Cleanup: stop the timer
  return () => clearInterval(id);
}, []);
```

**When cleanup runs:**
- Before the effect runs again (if dependencies changed).
- When the component is removed from the screen ("unmounts").

> 💡 Always clean up timers, event listeners, and subscriptions. This prevents memory leaks.

👉 See [`examples/Timer.jsx`](./examples/Timer.jsx)

---

## 5. Common `useEffect` Mistakes

**Mistake 1 — Missing dependencies.**
```jsx
useEffect(() => {
  console.log(count); // uses count...
}, []); // ...but count is not listed! It will be stale.
```
✅ Fix: `}, [count]);`

**Mistake 2 — Updating state without a condition → infinite loop.**
```jsx
useEffect(() => {
  setCount(count + 1); // changes count → re-render → effect runs again → forever!
}, [count]);
```
✅ Fix: only update state when a real condition is met, or rethink whether you need an effect at all.

**Mistake 3 — Using an effect when you don't need one.**
If a value can be calculated during render (derived state from Section 5), you **don't** need an effect. Effects are only for talking to the outside world.

**Mistake 4 — Forgetting cleanup** for timers and listeners (see above).

> ⚠️ In development, React's StrictMode runs effects **twice** on purpose to help you find missing cleanup. This is normal — your cleanup function should make this safe.

---

## 6. Fetching Data with `useEffect`

The classic use of `useEffect`: load data from a server when the component appears.

```jsx
import { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []); // [] = load once when the component first appears

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

**The three states of any fetch:** `loading`, `error`, and `data`. Always handle all three — your users will thank you.

> 🆕 **React 19 note:** There is now a newer way to fetch using the `use` API and Suspense (Section 11). But `useEffect` fetching is still everywhere, so you must understand it.

👉 See [`examples/UsersFetch.jsx`](./examples/UsersFetch.jsx)

---

## ✅ Section 6 Recap

- A **side effect** is anything that reaches outside React (timers, fetch, localStorage, document).
- **`useEffect`** runs code after render.
- The **dependency array** controls when: omitted = every render, `[]` = once, `[x]` = when `x` changes.
- Return a **cleanup function** for timers, listeners, and subscriptions.
- Avoid common mistakes: missing deps, infinite loops, unneeded effects, missing cleanup.
- Classic pattern: **fetch data** with loading / error / data states.

### Knowledge check

1. When does an effect with `[]` run?
2. Why do we return a cleanup function from some effects?
3. What three states should you handle when fetching data?

<details>
<summary>Show answers</summary>

1. Once, right after the first render.
2. To stop things we started (timers, listeners, subscriptions) before the effect re-runs or the component is removed — this prevents memory leaks.
3. Loading, error, and data (success).

</details>

---

**Next up → [Section 7: Forms in React 19](../Section%2007%20-%20Forms%20in%20React%2019/README.md)**
Now we meet the star of React 19: **Actions** and the new form hooks. 📝

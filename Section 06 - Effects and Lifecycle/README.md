# Section 6: Effects and Lifecycle

> **React 19 Course** — Section 6 of 21
> Level: Intermediate

So far our components only draw UI from props and state. But real apps must also talk to the **outside world**: timers, browser APIs, and servers. That is what **effects** are for — and just as important, knowing when you *don't* need one.

---

## Table of Contents

1. [What is a Side Effect?](#1-what-is-a-side-effect)
2. [`useEffect` Hook](#2-useeffect-hook)
3. [Effect Dependencies](#3-effect-dependencies)
4. [Cleanup Functions](#4-cleanup-functions)
5. [Fetching Data with `useEffect`](#5-fetching-data-with-useeffect)
6. [Common `useEffect` Mistakes](#6-common-useeffect-mistakes)
7. [When You Don't Need `useEffect`](#7-when-you-dont-need-useeffect)

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

The **second argument** (the array) controls *when* the effect runs.

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

> 🧠 **Rule:** List every prop or state value your effect *uses* inside the array.

👉 See [`examples/DocumentTitle.jsx`](./examples/DocumentTitle.jsx)

---

## 4. Cleanup Functions

### The problem

Some effects start something that keeps running — like a timer or a subscription. If you don't stop it, it leaks and causes bugs.

### The solution: return a cleanup function

If your effect returns a function, React runs it to **clean up** — before the next effect run, and when the component is removed.

```jsx
useEffect(() => {
  const id = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(id); // cleanup: stop the timer
}, []);
```

**When cleanup runs:**
- Before the effect runs again (if dependencies changed).
- When the component is removed from the screen ("unmounts").

> 💡 Always clean up timers, event listeners, and subscriptions.

👉 See [`examples/Timer.jsx`](./examples/Timer.jsx)

---

## 5. Fetching Data with `useEffect`

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
        setUsers(await res.json());
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

**The three states of any fetch:** `loading`, `error`, and `data`. Always handle all three.

> 🆕 **React 19 note:** There are newer ways to fetch using Axios (Section 12) and the `use` API with Suspense (Section 13). But `useEffect` fetching is everywhere, so you must understand it.

👉 See [`examples/UsersFetch.jsx`](./examples/UsersFetch.jsx)

---

## 6. Common `useEffect` Mistakes

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
✅ Fix: only update state when a real condition is met, or remove the effect.

**Mistake 3 — Forgetting cleanup** for timers and listeners (see lesson 4).

> ⚠️ In development, React's StrictMode runs effects **twice** on purpose to help you find missing cleanup. This is normal.

---

## 7. When You Don't Need `useEffect`

`useEffect` is often **overused**. Many things people put in effects don't belong there. Reaching for an effect by reflex causes extra renders and bugs.

### You DON'T need an effect to...

**1. Calculate a value from existing state — just derive it (Section 5).**
```jsx
// ❌ effect + extra state
const [fullName, setFullName] = useState("");
useEffect(() => {
  setFullName(first + " " + last);
}, [first, last]);

// ✅ just calculate during render
const fullName = first + " " + last;
```

**2. Respond to a user event — do it in the event handler.**
```jsx
// ❌ don't watch state to react to a click
useEffect(() => {
  if (submitted) sendData();
}, [submitted]);

// ✅ just call it where the click happens
function handleSubmit() {
  sendData();
}
```

**3. Reset state when a prop changes** — usually a `key` is cleaner (it remounts the component fresh).

### You DO need an effect to...

- **Fetch data** when a component appears.
- **Subscribe** to something external (timers, `window` events, web sockets).
- **Sync** with a non-React system (e.g. `localStorage`, a chart library).

> 🧠 **Ask yourself:** "Is this talking to the *outside world*?" If yes → effect. If it's just computing from props/state or reacting to an event → no effect.

👉 See [`examples/NoEffectNeeded.jsx`](./examples/NoEffectNeeded.jsx)

---

## ✅ Section 6 Recap

- A **side effect** reaches outside React (timers, fetch, localStorage, document).
- **`useEffect`** runs code after render; the dependency array controls when.
- `[]` = once, `[x]` = when `x` changes, omitted = every render.
- Return a **cleanup function** for timers, listeners, subscriptions.
- Classic pattern: **fetch data** with loading / error / data states.
- **Avoid mistakes:** missing deps, infinite loops, missing cleanup.
- **Don't use an effect** for values you can derive or for event responses.

### Knowledge check

1. When does an effect with `[]` run?
2. Why return a cleanup function from some effects?
3. Give one thing people put in `useEffect` that they shouldn't.

<details>
<summary>Show answers</summary>

1. Once, right after the first render.
2. To stop things we started (timers, listeners, subscriptions) before the effect re-runs or the component unmounts — preventing memory leaks.
3. Calculating a value from existing state (derive it instead), or reacting to a user event (do it in the event handler).

</details>

---

**Next up → [Section 7: Forms in React 19](../Section%2007%20-%20Forms%20in%20React%2019/README.md)**
Now we meet the star of React 19: **Actions** and the new form hooks. 📝

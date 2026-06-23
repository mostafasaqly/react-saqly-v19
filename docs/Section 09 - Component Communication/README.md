# Section 9: Component Communication

> **React 19 Crash Course** — Section 9 of 16
> Level: Intermediate

As apps grow, components need to share data across many levels. Passing props through every layer gets painful. This section shows cleaner ways to share data: **composition**, **Context**, and **custom hooks**.

---

## Table of Contents

1. [Props Drilling Problem](#1-props-drilling-problem)
2. [Composition Pattern](#2-composition-pattern)
3. [Context API](#3-context-api)
4. [`useContext`](#4-usecontext)
5. [Reading Context with React 19 `use`](#5-reading-context-with-react-19-use)
6. [Custom Hooks](#6-custom-hooks)

📁 **Code for this section:** see the [`examples/`](./examples) folder.

---

## 1. Props Drilling Problem

### The problem

Imagine the `user` lives at the top of your app, but only a deep component needs it. You must pass it through every component in between, even ones that don't use it:

```jsx
<App user={user} />
  <Layout user={user} />        {/* doesn't use it, just passes it */}
    <Sidebar user={user} />     {/* doesn't use it, just passes it */}
      <Profile user={user} />   {/* finally uses it */}
```

This is **prop drilling**. It is tedious and makes changes hard. There are two good fixes: **composition** and **Context**.

---

## 2. Composition Pattern

### The idea

Sometimes you don't need Context — you just need to **pass JSX as children**. Instead of a component creating its deep child, the parent passes it in.

```jsx
// Instead of drilling `user` through Layout and Sidebar,
// the App builds the Profile and passes it down as children.

function App() {
  const user = { name: "Sara" };
  return (
    <Layout>
      <Profile user={user} /> {/* built here, where user already exists */}
    </Layout>
  );
}

function Layout({ children }) {
  return <div className="layout">{children}</div>;
}
```

Now `Layout` doesn't need to know about `user` at all. **Composition** (using `children`) removes a lot of drilling without any new tools.

👉 See [`examples/Composition.jsx`](./examples/Composition.jsx)

---

## 3. Context API

### The problem

Some data is needed in **many** places: the current user, the theme (light/dark), the language. Drilling it everywhere is too much.

### The solution: Context

**Context** is like a broadcast. One component "provides" a value, and any component below can "read" it directly — no drilling.

**Step 1 — create the context:**
```jsx
import { createContext } from "react";

export const ThemeContext = createContext("light"); // default value
```

**Step 2 — provide a value at the top:**
```jsx
import { ThemeContext } from "./ThemeContext";

function App() {
  return (
    <ThemeContext value="dark">   {/* React 19: <Context> works as the provider */}
      <Page />
    </ThemeContext>
  );
}
```

> 🆕 **React 19:** You can use `<ThemeContext value={...}>` directly. (Before, you wrote `<ThemeContext.Provider value={...}>`, which still works.)

---

## 4. `useContext`

**Step 3 — read the value anywhere below:**
```jsx
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Button() {
  const theme = useContext(ThemeContext); // reads "dark"
  return <button className={theme}>Click</button>;
}
```

No props needed — `Button` reads the theme straight from context, no matter how deep it is.

> 💡 **Tip:** A common pattern is to keep both the data and a setter in context, so children can read *and* change it (e.g. a "toggle theme" button).

👉 See [`examples/ThemeContext.jsx`](./examples/ThemeContext.jsx) and [`examples/ThemeApp.jsx`](./examples/ThemeApp.jsx)

---

## 5. Reading Context with React 19 `use`

React 19 adds a new function called `use`. For context, it works like `useContext`, **but** you can call it conditionally — inside an `if`, for example. Normal hooks cannot do that.

```jsx
import { use } from "react";
import { ThemeContext } from "./ThemeContext";

function Button({ showThemed }) {
  if (showThemed) {
    // This is allowed with `use` — not allowed with useContext!
    const theme = use(ThemeContext);
    return <button className={theme}>Themed</button>;
  }
  return <button>Plain</button>;
}
```

> 🧠 `use` is flexible: it reads both **context** and **promises** (we'll use it for promises in Section 11). For everyday context, `useContext` is still perfectly fine.

---

## 6. Custom Hooks

### The problem

You have logic that you use in many components — like reading from `localStorage`, or tracking window size. Copy-pasting it everywhere is bad.

### The solution: a custom hook

A **custom hook** is just a function whose name starts with `use` and that calls other hooks. It lets you **reuse logic**.

```jsx
import { useState, useEffect } from "react";

// A reusable hook that syncs a value with localStorage.
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue]; // looks just like useState!
}
```

Now any component can use it:
```jsx
function App() {
  const [name, setName] = useLocalStorage("name", "");
  return <input value={name} onChange={(e) => setName(e.target.value)} />;
}
```

**Rules for custom hooks:**
- The name **must** start with `use`.
- They can call other hooks (`useState`, `useEffect`, etc.).
- They return whatever is useful (a value, an array, an object).

👉 See [`examples/useLocalStorage.jsx`](./examples/useLocalStorage.jsx)

---

## ✅ Section 9 Recap

- **Prop drilling** = passing props through components that don't need them.
- **Composition** (`children`) removes a lot of drilling with no new tools.
- **Context** broadcasts a value to all components below a provider.
- **`useContext`** reads context anywhere below.
- **React 19 `use`** can read context conditionally (and also promises).
- **Custom hooks** (`useSomething`) let you reuse logic across components.

### Knowledge check

1. What problem does Context solve?
2. What two rules define a custom hook?
3. What can `use` do that `useContext` cannot?

<details>
<summary>Show answers</summary>

1. It lets deeply nested components read shared data without passing it through every layer (no prop drilling).
2. Its name starts with `use`, and it can call other hooks.
3. `use` can be called conditionally (e.g. inside an `if`), and it can also read promises — not just context.

</details>

---

**Next up → [Section 10: Routing](../Section%2010%20-%20Routing/README.md)**
We turn our single page into a multi-page app with React Router. 🧭

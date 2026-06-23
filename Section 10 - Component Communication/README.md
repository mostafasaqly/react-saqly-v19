# Section 10: Component Communication

> **React 19 Course** — Section 10 of 21
> Level: Intermediate

As apps grow, components need to share data across many levels. Passing props through every layer gets painful. This section shows cleaner ways to share data: **composition**, **Context**, and **custom hooks**.

---

## Table of Contents

1. [Props Drilling Problem](#1-props-drilling-problem)
2. [Composition Pattern](#2-composition-pattern)
3. [Context API](#3-context-api)
4. [Creating Context](#4-creating-context)
5. [Providing Context](#5-providing-context)
6. [Reading Context with `useContext`](#6-reading-context-with-usecontext)
7. [Updating Context Data](#7-updating-context-data)
8. [Context API Practical Example](#8-context-api-practical-example)
9. [Reading Context with React 19 `use`](#9-reading-context-with-react-19-use)
10. [Custom Hooks](#10-custom-hooks)
11. [When to Use Context and When Not To](#11-when-to-use-context-and-when-not-to)

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

This is **prop drilling**. It's tedious and makes changes hard. Two good fixes: **composition** and **Context**.

---

## 2. Composition Pattern

### The idea

Sometimes you don't need Context — you just need to **pass JSX as children**. Instead of a component creating its deep child, the parent passes it in.

```jsx
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

Now `Layout` doesn't need to know about `user` at all. **Composition** removes a lot of drilling without any new tools.

👉 See [`examples/Composition.jsx`](./examples/Composition.jsx)

---

## 3. Context API

### The problem

Some data is needed in **many** places: the current user, the theme (light/dark), the language. Drilling it everywhere is too much.

### The solution: Context

**Context** is like a broadcast. One component "provides" a value, and any component below can "read" it directly — no drilling. There are three steps: **create**, **provide**, **read**. We'll do each next.

---

## 4. Creating Context

Use `createContext` to make a context object. You can give it a default value.

```jsx
// ThemeContext.js
import { createContext } from "react";

export const ThemeContext = createContext("light"); // default value
```

Export it so other files can provide and read it. That's the whole "create" step.

---

## 5. Providing Context

Wrap part of your app with the context and give it a `value`. Everything inside can read that value.

```jsx
import { ThemeContext } from "./ThemeContext";

function App() {
  return (
    <ThemeContext value="dark">   {/* React 19: <Context> is the provider */}
      <Page />
    </ThemeContext>
  );
}
```

> 🆕 **React 19:** You can use `<ThemeContext value={...}>` directly. (Before, you wrote `<ThemeContext.Provider value={...}>`, which still works.)

---

## 6. Reading Context with `useContext`

Any component below the provider reads the value with `useContext` — no props.

```jsx
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Button() {
  const theme = useContext(ThemeContext); // reads "dark"
  return <button className={theme}>Click</button>;
}
```

No matter how deep `Button` is, it gets the theme straight from context.

---

## 7. Updating Context Data

Context can hold **data and a function to change it**, so children can read *and* update it.

Put `useState` in the provider, then share both the value and the setter:

```jsx
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  function toggle() {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }

  // Share an object with the value AND a way to change it.
  return (
    <ThemeContext value={{ theme, toggle }}>{children}</ThemeContext>
  );
}
```

A child can now flip the theme from anywhere:

```jsx
function ThemeToggle() {
  const { theme, toggle } = useContext(ThemeContext);
  return <button onClick={toggle}>Current: {theme}</button>;
}
```

> 💡 **Tip:** wrapping the provider in its own `ThemeProvider` component keeps your `App` clean.

---

## 8. Context API Practical Example

Let's put it all together: a theme that any component can read and toggle.

```
ThemeContext.jsx   → createContext
ThemeProvider.jsx  → holds state + toggle, provides the value
App.jsx            → wraps the app in ThemeProvider
Toolbar.jsx        → deep component that reads & toggles the theme
```

The flow:
1. `ThemeProvider` owns `theme` state and a `toggle` function.
2. It provides `{ theme, toggle }` to everything inside.
3. Deep components read it with `useContext` and call `toggle()`.

This is exactly how real apps handle theme, auth (current user), and language.

👉 See [`examples/ThemeContext.jsx`](./examples/ThemeContext.jsx), [`examples/ThemeProvider.jsx`](./examples/ThemeProvider.jsx), and [`examples/ThemeApp.jsx`](./examples/ThemeApp.jsx)

---

## 9. Reading Context with React 19 `use`

React 19 adds a function called `use`. For context it works like `useContext`, **but** you can call it conditionally — inside an `if`, for example. Normal hooks cannot do that.

```jsx
import { use } from "react";
import { ThemeContext } from "./ThemeContext";

function Button({ showThemed }) {
  if (showThemed) {
    const theme = use(ThemeContext); // allowed with `use`!
    return <button className={theme}>Themed</button>;
  }
  return <button>Plain</button>;
}
```

> 🧠 `use` also reads **promises** (Section 13). For everyday context, `useContext` is still perfectly fine.

---

## 10. Custom Hooks

### The problem

You have logic used in many components — like reading from `localStorage`, or tracking window size. Copy-pasting it everywhere is bad. Also, reading context often needs a repeated `useContext(...)` line.

### The solution: a custom hook

A **custom hook** is a function whose name starts with `use` and that calls other hooks. It reuses logic.

```jsx
import { useState, useEffect } from "react";

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

A very common pattern is a hook that wraps context reading:

```jsx
// Now components call useTheme() instead of useContext(ThemeContext).
function useTheme() {
  return useContext(ThemeContext);
}
```

**Rules for custom hooks:**
- The name **must** start with `use`.
- They can call other hooks.
- They return whatever is useful.

👉 See [`examples/useLocalStorage.jsx`](./examples/useLocalStorage.jsx)

---

## 11. When to Use Context and When Not To

Context is powerful but easy to overuse.

### ✅ Use Context for
- **App-wide, rarely-changing** data: theme, current user, language, settings.
- Things many components across the tree need.

### ❌ Don't reach for Context when
- **Only a few nearby components** need the data → just lift state up (Section 5) or use composition.
- The data **changes very often** (like every keystroke) → context re-renders all readers, which can be slow.
- You need **complex global state** with lots of updates → consider **Redux Toolkit** (Section 14), which is built for that.

> 🧠 **Rule:** Context is great for "ambient" data that's set once and read everywhere. For heavy, fast-changing global state, use a state library.

---

## ✅ Section 10 Recap

- **Prop drilling** = passing props through components that don't need them.
- **Composition** (`children`) removes a lot of drilling with no new tools.
- **Context** = create → provide → read. Broadcasts a value to all components below.
- **`useContext`** reads it; share a `{ value, setter }` to let children **update** it.
- **React 19 `use`** can read context conditionally (and also promises).
- **Custom hooks** (`useSomething`) reuse logic, including context reads.
- **Use Context** for app-wide, slow-changing data — not for heavy global state (use Redux).

### Knowledge check

1. What are the three steps to use Context?
2. How do you let a child *change* context data, not just read it?
3. Give one case where Context is the wrong tool.

<details>
<summary>Show answers</summary>

1. Create (`createContext`), provide (`<Context value={...}>`), and read (`useContext`).
2. Put `useState` in the provider and share both the value and a setter function (often as one object `{ value, setValue }`).
3. When data changes very often (re-renders all readers) or when you need complex global state — use lifting state up or Redux Toolkit instead.

</details>

---

**Next up → [Section 11: Routing with React Router DOM](../Section%2011%20-%20Routing%20with%20React%20Router%20DOM/README.md)**
We turn our single page into a multi-page app. 🧭

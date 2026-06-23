# Section 12: Performance and Best Practices

> **React 19 Crash Course** — Section 12 of 16
> Level: Intermediate → Advanced

Your app works — now let's make it **fast**. This section explains why React re-renders, how to avoid wasted work, and how React 19's new **Compiler** does much of this for you automatically.

---

## Table of Contents

1. [React Rendering Basics](#1-react-rendering-basics)
2. [Avoiding Unnecessary Re-renders](#2-avoiding-unnecessary-re-renders)
3. [`memo`](#3-memo)
4. [`useMemo`](#4-usememo)
5. [`useCallback`](#5-usecallback)
6. [React Compiler Overview](#6-react-compiler-overview)
7. [Code Splitting with Lazy Loading](#7-code-splitting-with-lazy-loading)

📁 **Code for this section:** see the [`examples/`](./examples) folder.

---

## 1. React Rendering Basics

**Rendering** means React runs your component function to figure out the UI.

A component re-renders when:
- Its **state** changes, or
- Its **props** change, or
- Its **parent** re-renders.

That last one surprises people: when a parent re-renders, **all its children re-render too** — even if their props didn't change. Usually this is fast and fine. But for heavy components or huge lists, it can be slow.

> 🧠 **Don't optimize too early.** Most apps are fast without any tricks. Only optimize when you notice a real slowdown.

---

## 2. Avoiding Unnecessary Re-renders

The classic tools to prevent wasted re-renders are three React functions:

| Tool | What it skips |
| --- | --- |
| `memo` | Re-rendering a **component** when its props are the same |
| `useMemo` | Re-calculating an expensive **value** |
| `useCallback` | Re-creating a **function** on every render |

Let's look at each.

---

## 3. `memo`

### The problem

A child re-renders every time its parent does, even when its props haven't changed. For a heavy child, that is wasted work.

### The solution: `memo`

Wrap the component in `memo`. React will **skip** re-rendering it if its props are the same as last time.

```jsx
import { memo } from "react";

const ExpensiveList = memo(function ExpensiveList({ items }) {
  console.log("rendering list");
  return (
    <ul>
      {items.map((i) => (
        <li key={i.id}>{i.name}</li>
      ))}
    </ul>
  );
});
```

Now `ExpensiveList` only re-renders when `items` actually changes.

👉 See [`examples/MemoExample.jsx`](./examples/MemoExample.jsx)

---

## 4. `useMemo`

### The problem

You have a slow calculation (like filtering a big list). It runs on **every** render, even when the inputs didn't change.

### The solution: `useMemo`

`useMemo` remembers the result and only recomputes when its dependencies change.

```jsx
import { useMemo } from "react";

function ProductList({ products, search }) {
  // Only recompute when products or search change.
  const filtered = useMemo(() => {
    return products.filter((p) => p.name.includes(search));
  }, [products, search]);

  return <List items={filtered} />;
}
```

If `products` and `search` are the same, `useMemo` returns the saved result instead of filtering again.

> 💡 Use `useMemo` only for **genuinely expensive** work. For cheap calculations it adds complexity for no gain.

---

## 5. `useCallback`

### The problem

Functions are re-created on every render. If you pass a function to a `memo` child, the child sees a "new" prop every time and re-renders anyway — defeating `memo`.

### The solution: `useCallback`

`useCallback` keeps the **same function** between renders (until its dependencies change).

```jsx
import { useCallback } from "react";

function Parent() {
  const [count, setCount] = useState(0);

  // Same function reference between renders → memo child stays stable.
  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []); // no dependencies → never recreated

  return <MemoButton onClick={handleClick} />;
}
```

> 🧠 **`useMemo` remembers a value; `useCallback` remembers a function.** In fact, `useCallback(fn, deps)` is just `useMemo(() => fn, deps)`.

👉 See [`examples/CallbackExample.jsx`](./examples/CallbackExample.jsx)

---

## 6. React Compiler Overview

### The big news in React 19

All that manual `memo` / `useMemo` / `useCallback` work is tedious and easy to get wrong. The **React Compiler** is a build-time tool that does it **for you automatically**.

It reads your components, understands what depends on what, and inserts the memoization itself. You write simple, clean code — the compiler makes it fast.

```jsx
// With the React Compiler, you can often write this...
function ProductList({ products, search }) {
  const filtered = products.filter((p) => p.name.includes(search));
  return <List items={filtered} />;
}
// ...and the compiler optimizes it for you. No manual useMemo needed.
```

**What to know:**
- It is **opt-in** — you enable it in your build config (a Babel/Vite plugin).
- It does **not** change what your code does — only how fast it runs.
- It follows the "Rules of React" (pure components, no mutation), so writing clean code matters.

> 🆕 **Takeaway:** Learn `memo`/`useMemo`/`useCallback` so you understand the *why*. But going forward, the React Compiler removes most of the need to write them by hand.

---

## 7. Code Splitting with Lazy Loading

### The problem

By default, all your code loads at once. For a big app, that first load is slow — the user downloads pages they may never visit.

### The solution: `lazy` + `<Suspense>`

Load a component only **when it is needed**. `lazy` splits it into a separate file that downloads on demand.

```jsx
import { lazy, Suspense } from "react";

// This page is only downloaded when the user navigates to it.
const Dashboard = lazy(() => import("./Dashboard.jsx"));

function App() {
  return (
    <Suspense fallback={<p>Loading page...</p>}>
      <Dashboard />
    </Suspense>
  );
}
```

This is especially powerful with routing: lazy-load each route so users only download the page they visit.

👉 See [`examples/LazyExample.jsx`](./examples/LazyExample.jsx)

---

## ✅ Section 12 Recap

- Components re-render on **state**, **props**, or **parent** changes.
- **`memo`** skips re-rendering a component with unchanged props.
- **`useMemo`** caches an expensive calculated value.
- **`useCallback`** caches a function (so `memo` children stay stable).
- The **React Compiler** does all this automatically — write clean code.
- **`lazy` + `<Suspense>`** split code so it loads only when needed.
- ⚠️ Don't optimize too early — measure first.

### Knowledge check

1. Name three reasons a component re-renders.
2. What is the difference between `useMemo` and `useCallback`?
3. What does the React Compiler do for you?

<details>
<summary>Show answers</summary>

1. Its state changes, its props change, or its parent re-renders.
2. `useMemo` caches a computed **value**; `useCallback` caches a **function**.
3. It automatically adds memoization (like memo/useMemo/useCallback) at build time, so you don't have to write it by hand.

</details>

---

**Next up → [Section 13: Project — Task Manager App](../Section%2013%20-%20Project%20Task%20Manager%20App/README.md)**
Time to build! We combine everything into a real app. 🛠️

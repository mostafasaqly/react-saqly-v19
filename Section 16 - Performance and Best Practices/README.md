# Section 16: Performance and Best Practices

> **React 19 Course** — Section 16 of 21
> Level: Intermediate → Advanced

Your apps work — now let's make them **fast** and **clean**. This section explains why React re-renders, how to avoid wasted work, how React 19's new **Compiler** does much of this for you, and how to structure a project well.

---

## Table of Contents

1. [React Rendering Basics](#1-react-rendering-basics)
2. [Why Components Re-render](#2-why-components-re-render)
3. [Avoiding Unnecessary Re-renders](#3-avoiding-unnecessary-re-renders)
4. [React.memo](#4-reactmemo)
5. [useMemo](#5-usememo)
6. [useCallback](#6-usecallback)
7. [memo vs useMemo vs useCallback](#7-memo-vs-usememo-vs-usecallback)
8. [When Not to Use Memoization](#8-when-not-to-use-memoization)
9. [React Compiler Overview](#9-react-compiler-overview)
10. [Code Splitting with Lazy Loading](#10-code-splitting-with-lazy-loading)
11. [Lazy and Suspense](#11-lazy-and-suspense)
12. [Folder Structure Best Practices](#12-folder-structure-best-practices)
13. [Clean Component Design](#13-clean-component-design)

📁 **Code for this section:** see the [`examples/`](./examples) folder.

---

## 1. React Rendering Basics

**Rendering** means React runs your component function to figure out the UI. Rendering itself is usually cheap — React is fast. The cost comes when **many** components render **often** for no reason.

> 🧠 **Don't optimize too early.** Most apps are fast without any tricks. Measure first (React DevTools Profiler), then optimize the slow parts.

---

## 2. Why Components Re-render

A component re-renders when:
- Its **state** changes, or
- Its **props** change, or
- Its **parent** re-renders.

That last one surprises people: when a parent re-renders, **all its children re-render too** — even if their props didn't change.

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <BigList />   {/* re-renders every click, even though its props never change */}
    </div>
  );
}
```

Usually this is fine. For heavy components or huge lists, it can be slow — and that's when the tools below help.

---

## 3. Avoiding Unnecessary Re-renders

The classic tools to prevent wasted re-renders:

| Tool | What it skips |
| --- | --- |
| `React.memo` | Re-rendering a **component** when its props are the same |
| `useMemo` | Re-calculating an expensive **value** |
| `useCallback` | Re-creating a **function** on every render |

Let's look at each.

---

## 4. React.memo

### The problem

A child re-renders every time its parent does, even when its props haven't changed.

### The solution: `memo`

Wrap the component in `memo`. React will **skip** re-rendering it if its props are the same as last time.

```jsx
import { memo } from "react";

const ExpensiveList = memo(function ExpensiveList({ items }) {
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

## 5. useMemo

### The problem

You have a slow calculation (like filtering a big list). It runs on **every** render, even when the inputs didn't change.

### The solution: `useMemo`

`useMemo` remembers the result and only recomputes when its dependencies change.

```jsx
import { useMemo } from "react";

const filtered = useMemo(() => {
  return products.filter((p) => p.name.includes(search));
}, [products, search]);
```

If `products` and `search` are unchanged, `useMemo` returns the saved result instead of filtering again.

---

## 6. useCallback

### The problem

Functions are re-created on every render. If you pass a function to a `memo` child, the child sees a "new" prop every time and re-renders anyway — defeating `memo`.

### The solution: `useCallback`

`useCallback` keeps the **same function** between renders (until its dependencies change).

```jsx
import { useCallback } from "react";

const handleClick = useCallback(() => {
  console.log("clicked");
}, []); // no dependencies → never recreated
```

Now a `memo` child receiving `handleClick` stays stable.

👉 See [`examples/CallbackExample.jsx`](./examples/CallbackExample.jsx)

---

## 7. memo vs useMemo vs useCallback

Easy to mix up. Here's the difference:

| Tool | Wraps | Remembers | Use when |
| --- | --- | --- | --- |
| `memo` | a **component** | the rendered output | a child re-renders with the same props |
| `useMemo` | a **calculation** | a **value** | an expensive calculation repeats |
| `useCallback` | a **function** | a **function** | you pass a function to a `memo` child |

> 🧠 **Shortcut:** `useCallback(fn, deps)` is just `useMemo(() => fn, deps)`. `memo` is for components; the other two are for values/functions you pass to them.

---

## 8. When Not to Use Memoization

Memoization isn't free — it adds code and a tiny memory cost. Skip it when:

- The component/calculation is **already cheap** (most are).
- The props **change every render anyway** (memo can't help).
- You're adding it **"just in case"** without measuring.

> ⚠️ **Premature optimization** makes code harder to read for no real gain. Profile first. If a render isn't slow, leave it simple.

---

## 9. React Compiler Overview

### The big news in React 19

All that manual `memo` / `useMemo` / `useCallback` work is tedious and easy to get wrong. The **React Compiler** is a build-time tool that does it **for you automatically**.

It reads your components, understands what depends on what, and inserts the memoization itself. You write simple, clean code — the compiler makes it fast.

**What to know:**
- It's **opt-in** — you enable it in your build config (a Babel/Vite plugin).
- It does **not** change what your code does — only how fast it runs.
- It follows the "Rules of React" (pure components, no mutation), so writing clean code matters.

> 🆕 **Takeaway:** learn `memo`/`useMemo`/`useCallback` to understand the *why*. Going forward, the React Compiler removes most of the need to write them by hand.

---

## 10. Code Splitting with Lazy Loading

### The problem

By default, all your code loads at once. For a big app, that first load is slow — the user downloads pages they may never visit.

### The solution: `lazy`

Load a component only **when it's needed**. `lazy` splits it into a separate file that downloads on demand.

```jsx
import { lazy } from "react";

const Dashboard = lazy(() => import("./Dashboard.jsx"));
```

This is especially powerful with routing: lazy-load each route so users only download the page they visit.

---

## 11. Lazy and Suspense

A lazy component takes a moment to download, so wrap it in `<Suspense>` with a fallback (just like Section 13).

```jsx
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./Dashboard.jsx"));

function App() {
  return (
    <Suspense fallback={<p>Loading page...</p>}>
      <Dashboard />
    </Suspense>
  );
}
```

While the file downloads, the user sees the fallback. Then the page appears.

👉 See [`examples/LazyExample.jsx`](./examples/LazyExample.jsx)

---

## 12. Folder Structure Best Practices

A clean structure makes big apps easy to work in. A common, reliable layout:

```
src/
├── components/      ← reusable UI pieces (Button, Card, Modal)
├── pages/           ← one component per route (Home, About)
├── features/        ← feature folders (cart/, auth/) with slice + components
├── hooks/           ← custom hooks (useFetch, useLocalStorage)
├── services/        ← API calls (axios instance + functions)
├── store/           ← Redux store + slices
├── utils/           ← small helpers (formatDate, etc.)
└── App.jsx
```

**Tips:**
- **Group by feature** for big apps (everything about "cart" in one folder).
- **Keep components small** and in their own files.
- **Put styles next to components** (CSS Modules).
- Be **consistent** — the exact layout matters less than sticking to one.

---

## 13. Clean Component Design

Good components are easy to read, test, and reuse. Aim for:

1. **One job per component.** If it does many things, split it.
2. **Small and focused.** A 300-line component is usually several components.
3. **Props in, events out.** Read data from props; report changes via callbacks.
4. **Separate logic from UI.** Put data/logic in custom hooks; keep components about *display*.
5. **Derive, don't duplicate.** Calculate from existing state instead of storing copies (Section 5).
6. **Name things clearly.** `UserCard`, `useCart`, `getPosts` — names should explain themselves.
7. **Avoid deep prop drilling.** Use composition, Context, or Redux as the app grows.

> 🧠 **Big picture:** fast apps come from *not doing extra work*, and clean apps come from *small, focused pieces*. The React Compiler handles a lot of the speed; good structure is up to you.

---

## ✅ Section 16 Recap

- Components re-render on **state**, **props**, or **parent** changes.
- **`memo`** skips re-rendering a component with unchanged props.
- **`useMemo`** caches a value; **`useCallback`** caches a function.
- Don't memoize cheap things — **measure first**.
- The **React Compiler** automates memoization at build time.
- **`lazy` + `<Suspense>`** split code so it loads only when needed.
- **Structure** by feature; keep components **small and single-purpose**.

### Knowledge check

1. Name three reasons a component re-renders.
2. What's the difference between `useMemo` and `useCallback`?
3. Give one sign you're over-using memoization.

<details>
<summary>Show answers</summary>

1. Its state changes, its props change, or its parent re-renders.
2. `useMemo` caches a computed **value**; `useCallback` caches a **function**.
3. Adding it to cheap components "just in case" without measuring, or wrapping things whose props change every render anyway.

</details>

---

**Next up → [Section 17: Project 1 — Task Manager App](../Section%2017%20-%20Project%20Task%20Manager%20App/README.md)**
Time to build! We combine everything into a real app. 🛠️

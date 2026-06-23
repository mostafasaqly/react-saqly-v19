# Section 13: Suspense and React 19 `use`

> **React 19 Course** — Section 13 of 21
> Level: Intermediate → Advanced

In Section 12 we wrote `loading` flags by hand. React has a cleaner way: **Suspense** lets a component "pause" while its data loads, and React shows a fallback for you. Paired with the new **`use`** API, this removes a lot of boilerplate.

---

## Table of Contents

1. [What is Suspense?](#1-what-is-suspense)
2. [Suspense for Loading UI](#2-suspense-for-loading-ui)
3. [Suspense Boundaries](#3-suspense-boundaries)
4. [React 19 `use` Hook Overview](#4-react-19-use-hook-overview)
5. [Using `use` with Promises](#5-using-use-with-promises)
6. [Using `use` with Context](#6-using-use-with-context)
7. [Loading and Error Boundaries](#7-loading-and-error-boundaries)
8. [Suspense Best Practices](#8-suspense-best-practices)

📁 **Code for this section:** see the [`examples/`](./examples) folder.

---

## 1. What is Suspense?

### The problem

Every component that loads data writes the same thing:
```jsx
if (loading) return <Spinner />;
```
That's repetitive, and the loading flag clutters your component.

### The solution: Suspense

**`<Suspense>`** is a wrapper. If a component inside it is **waiting** for something (like data), Suspense automatically shows a `fallback` until it's ready. The component itself doesn't need a loading flag.

```jsx
<Suspense fallback={<p>Loading...</p>}>
  <Profile />   {/* if Profile is waiting, the fallback shows */}
</Suspense>
```

Think of Suspense as saying: "show this fallback while anything inside me is still loading."

---

## 2. Suspense for Loading UI

The `fallback` can be anything — text, a spinner, or skeletons.

```jsx
import { Suspense } from "react";

function Page() {
  return (
    <Suspense fallback={<Skeleton />}>
      <UserProfile />
    </Suspense>
  );
}
```

While `UserProfile` loads its data, the user sees `<Skeleton />`. When the data is ready, `UserProfile` appears. No `if (loading)` needed inside `UserProfile`.

---

## 3. Suspense Boundaries

A **Suspense boundary** is the area one `<Suspense>` covers. You can have **several** boundaries, so different parts load independently.

```jsx
<div>
  <Suspense fallback={<p>Loading profile...</p>}>
    <Profile />
  </Suspense>

  <Suspense fallback={<p>Loading posts...</p>}>
    <Posts />
  </Suspense>
</div>
```

Here, the profile and posts load **separately**. The posts can still be loading while the profile is already shown. This makes the page feel faster.

> 🧠 **Mental model:** wrap each independent piece in its own boundary so one slow part doesn't block the rest.

---

## 4. React 19 `use` Hook Overview

`use` is a new React 19 function that **reads a resource** — a Promise or a Context.

What makes it special:
- It works with **Suspense**: if you `use` a pending promise, the nearest boundary shows its fallback.
- Unlike normal hooks, you can call it **conditionally** (inside an `if` or loop).

```jsx
import { use } from "react";

const value = use(somePromiseOrContext);
```

We'll use it two ways: with **promises** (data) and with **context**.

---

## 5. Using `use` with Promises

`use` unwraps a promise. While it's pending, Suspense shows the fallback. When it resolves, you get the value — no `loading` state, no `useEffect`.

```jsx
import { use, Suspense } from "react";

function Comments({ commentsPromise }) {
  const comments = use(commentsPromise); // suspends until resolved
  return (
    <ul>
      {comments.map((c) => (
        <li key={c.id}>{c.text}</li>
      ))}
    </ul>
  );
}

function Page() {
  return (
    <Suspense fallback={<p>Loading comments...</p>}>
      <Comments commentsPromise={fetchComments()} />
    </Suspense>
  );
}
```

> ⚠️ **Important:** don't create the promise *inside* the component that calls `use`, or it makes a new promise every render. Create it higher up, pass it as a prop, cache it, or get it from a router loader / framework.

👉 See [`examples/UseWithPromise.jsx`](./examples/UseWithPromise.jsx)

---

## 6. Using `use` with Context

`use` also reads context, just like `useContext` — but it can be called conditionally.

```jsx
import { use } from "react";
import { ThemeContext } from "./ThemeContext";

function Button({ themed }) {
  if (themed) {
    const theme = use(ThemeContext); // ✅ allowed inside an if
    return <button className={theme}>Themed</button>;
  }
  return <button>Plain</button>;
}
```

With `useContext`, that `if` would be illegal (hooks must run in the same order every render). `use` is more flexible.

---

## 7. Loading and Error Boundaries

Suspense handles **loading**. What about **errors** (the fetch failed)?

That's the job of an **Error Boundary** — a component that catches errors from its children and shows a fallback. You pair the two:

```jsx
<ErrorBoundary fallback={<p>Something went wrong.</p>}>
  <Suspense fallback={<p>Loading...</p>}>
    <Comments commentsPromise={commentsPromise} />
  </Suspense>
</ErrorBoundary>
```

- **Suspense** → shows the loading fallback while waiting.
- **Error Boundary** → shows the error fallback if it fails.

React doesn't ship a built-in error boundary component, so people use the small **`react-error-boundary`** package (or write a class component). The idea is what matters.

👉 See [`examples/ErrorBoundaryExample.jsx`](./examples/ErrorBoundaryExample.jsx)

---

## 8. Suspense Best Practices

1. **One boundary per independent piece** — let parts load separately.
2. **Use skeletons** as fallbacks for a stable layout (no jumpiness).
3. **Don't create promises in render** — make them outside, cache them, or use a framework/router.
4. **Pair Suspense with an Error Boundary** — handle both loading *and* failure.
5. **Place boundaries thoughtfully** — too high and the whole page waits; too low and you get many spinners.
6. **`useEffect` fetching is still fine** — Suspense + `use` shines most with frameworks and routers that manage the promises for you. Know both approaches.

> 🧠 **Big picture:** Suspense + `use` let you write components that read data directly, while React handles the waiting. Add an Error Boundary and you've covered loading, success, and failure — cleanly.

---

## ✅ Section 13 Recap

- **`<Suspense>`** shows a `fallback` while a child is waiting for data.
- **Suspense boundaries** let different parts load independently.
- **`use`** reads a Promise or Context; works with Suspense and can be called conditionally.
- **`use` with promises** removes manual loading state — but create the promise outside render.
- **`use` with context** works like `useContext`, but conditionally.
- **Error Boundaries** catch failures; pair them with Suspense.
- **Best practices:** skeletons, one boundary per piece, don't make promises in render.

### Knowledge check

1. What does `<Suspense>` show while its child is loading?
2. Why shouldn't you create the promise inside the component that calls `use`?
3. Suspense handles loading — what handles errors?

<details>
<summary>Show answers</summary>

1. Its `fallback` (text, spinner, or skeletons).
2. Because the component re-renders, and creating the promise in render makes a brand-new promise every time, so it never settles. Create it outside, cache it, or get it from a router/framework.
3. An Error Boundary — pair it with Suspense to cover loading, success, and failure.

</details>

---

**Next up → [Section 14: State Management with Redux Toolkit](../Section%2014%20-%20State%20Management%20with%20Redux%20Toolkit/README.md)**
For big apps, we manage global state with Redux Toolkit. 🗃️

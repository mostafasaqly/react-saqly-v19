# Section 11: Data Fetching

> **React 19 Crash Course** — Section 11 of 16
> Level: Intermediate

Most apps show data from a server. In this section we master fetching: the basics, loading/error states, reusable hooks, full CRUD, and the modern React 19 way using **Suspense** and the **`use`** API.

---

## Table of Contents

1. [Fetch API Basics](#1-fetch-api-basics)
2. [Loading and Error States](#2-loading-and-error-states)
3. [Reusable Data Fetching Hook](#3-reusable-data-fetching-hook)
4. [Working with REST APIs](#4-working-with-rest-apis)
5. [CRUD Operations](#5-crud-operations)
6. [Suspense Introduction](#6-suspense-introduction)
7. [React 19 `use` with Promises](#7-react-19-use-with-promises)

📁 **Code for this section:** see the [`examples/`](./examples) folder.

---

## 1. Fetch API Basics

`fetch` is a built-in browser function to talk to servers. It returns a **Promise**, so we use `async/await`.

```jsx
async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json(); // turn the response into a JS array/object
  return data;
}
```

**Two steps every time:**
1. `await fetch(url)` — get the response.
2. `await res.json()` — read the body as JSON.

> ⚠️ `fetch` does **not** throw on errors like 404 or 500. You must check `res.ok` yourself:
> ```jsx
> if (!res.ok) throw new Error("Request failed");
> ```

---

## 2. Loading and Error States

Always handle the **three states** (same as Section 6): loading, error, data.

```jsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// ...inside useEffect...
try {
  setLoading(true);
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed");
  setData(await res.json());
} catch (err) {
  setError(err.message);
} finally {
  setLoading(false);
}
```

Then in the UI:
```jsx
if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error}</p>;
return <DataView data={data} />;
```

---

## 3. Reusable Data Fetching Hook

### The problem

Writing those three states in every component is repetitive.

### The solution: a custom `useFetch` hook

Put the logic in one custom hook and reuse it everywhere.

```jsx
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true; // guard against setting state after unmount

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(url);
        if (!res.ok) throw new Error("Request failed");
        const json = await res.json();
        if (active) setData(json);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => { active = false; }; // cleanup
  }, [url]);

  return { data, loading, error };
}
```

Now using it is one line:
```jsx
const { data, loading, error } = useFetch("https://.../users");
```

👉 See [`examples/useFetch.jsx`](./examples/useFetch.jsx)

---

## 4. Working with REST APIs

A **REST API** uses URLs and HTTP methods to manage data. The methods map to actions:

| Method | Action | Example |
| --- | --- | --- |
| `GET` | Read | get all users |
| `POST` | Create | add a new user |
| `PUT` / `PATCH` | Update | edit a user |
| `DELETE` | Remove | delete a user |

For anything other than GET, you pass an options object to `fetch`:

```jsx
await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Sara" }),
});
```

---

## 5. CRUD Operations

CRUD = **C**reate, **R**ead, **U**pdate, **D**elete. Here are all four:

```jsx
const API = "https://jsonplaceholder.typicode.com/posts";

// READ
const res = await fetch(API);
const posts = await res.json();

// CREATE
await fetch(API, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Hello" }),
});

// UPDATE
await fetch(`${API}/1`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Updated" }),
});

// DELETE
await fetch(`${API}/1`, { method: "DELETE" });
```

We do all four in the projects (Sections 13 and 14).

👉 See [`examples/crud.js`](./examples/crud.js)

---

## 6. Suspense Introduction

### The problem

Writing `if (loading) return <Spinner />` in every component is repetitive.

### The solution: `<Suspense>`

`<Suspense>` lets a component "pause" while its data loads, and shows a `fallback` automatically. No manual loading flag.

```jsx
import { Suspense } from "react";

<Suspense fallback={<p>Loading...</p>}>
  <Comments />   {/* if Comments is waiting for data, the fallback shows */}
</Suspense>
```

While `Comments` waits, React shows `Loading...`. When the data is ready, `Comments` appears. The component that "pauses" must read its data with the `use` API (next).

---

## 7. React 19 `use` with Promises

`use` reads a promise directly. It pairs with Suspense: while the promise is pending, the nearest `<Suspense>` shows its fallback.

```jsx
import { use, Suspense } from "react";

function Comments({ commentsPromise }) {
  // `use` unwraps the promise. While pending, Suspense shows the fallback.
  const comments = use(commentsPromise);
  return (
    <ul>
      {comments.map((c) => (
        <li key={c.id}>{c.text}</li>
      ))}
    </ul>
  );
}

function Page() {
  // Create the promise OUTSIDE render (e.g. pass it in as a prop / from a cache).
  const commentsPromise = fetchComments();

  return (
    <Suspense fallback={<p>Loading comments...</p>}>
      <Comments commentsPromise={commentsPromise} />
    </Suspense>
  );
}
```

**Why this is nice:** no `useState`, no `useEffect`, no manual loading flag. You read the promise, React handles the waiting.

> ⚠️ **Important:** don't create the promise *inside* the component that calls `use`, or it remakes a new promise every render. Create it higher up, in a cache, or via a router loader / framework. The pattern matters more than the exact wiring here.

👉 See [`examples/UseWithPromise.jsx`](./examples/UseWithPromise.jsx)

---

## ✅ Section 11 Recap

- **`fetch`** returns a promise; use `await fetch` then `await res.json()`. Check `res.ok`.
- Always handle **loading / error / data**.
- A **`useFetch`** custom hook removes repetition.
- **REST APIs** use GET/POST/PUT/DELETE for CRUD.
- **CRUD** = Create, Read, Update, Delete.
- **`<Suspense>`** shows a fallback while a child waits for data.
- **React 19 `use`** reads a promise and works with Suspense — no manual loading state.

### Knowledge check

1. Why must you check `res.ok` after `fetch`?
2. What does a `useFetch` hook return?
3. What does `<Suspense>` show while its child is waiting?

<details>
<summary>Show answers</summary>

1. Because `fetch` does not throw on HTTP errors (like 404/500). `res.ok` tells you if the request actually succeeded.
2. Usually an object like `{ data, loading, error }` that components can use directly.
3. Its `fallback` (for example, a loading message or spinner).

</details>

---

**Next up → [Section 12: Performance and Best Practices](../Section%2012%20-%20Performance%20and%20Best%20Practices/README.md)**
We make our apps fast and learn the new React Compiler. 🚀

# Section 12: Data Fetching and Axios

> **React 19 Course** — Section 12 of 21
> Level: Intermediate

Most apps show data from a server. We start with the built-in `fetch`, then learn **Axios** — a popular library that makes requests shorter and cleaner. We finish with reusable services and hooks you'll use in every project.

---

## Table of Contents

1. [Fetch API Basics](#1-fetch-api-basics)
2. [Loading and Error States](#2-loading-and-error-states)
3. [Introduction to Axios](#3-introduction-to-axios)
4. [Installing Axios](#4-installing-axios)
5. [GET Requests with Axios](#5-get-requests-with-axios)
6. [POST Requests with Axios](#6-post-requests-with-axios)
7. [PUT and PATCH Requests with Axios](#7-put-and-patch-requests-with-axios)
8. [DELETE Requests with Axios](#8-delete-requests-with-axios)
9. [Creating a Reusable API Service](#9-creating-a-reusable-api-service)
10. [Working with REST APIs](#10-working-with-rest-apis)
11. [CRUD Operations](#11-crud-operations)
12. [Handling API Errors](#12-handling-api-errors)
13. [Environment Variables for API URLs](#13-environment-variables-for-api-urls)
14. [Reusable Data Fetching Hook](#14-reusable-data-fetching-hook)

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

Always handle the **three states**: loading, error, data.

```jsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

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

## 3. Introduction to Axios

### The problem

`fetch` is fine, but a little verbose: two awaits, manual `res.ok` checks, manual JSON parsing, manual headers for every POST.

### The solution: Axios

**Axios** is a small library that simplifies requests:

- **Auto JSON** — no `res.json()`; data is at `res.data`.
- **Throws on errors automatically** — a 404/500 jumps straight to `catch`.
- **Shorter POST/PUT** — pass the body directly, headers are handled.
- **Base URLs and instances** — set the API root once.

```jsx
// fetch
const res = await fetch(url);
if (!res.ok) throw new Error("Failed");
const data = await res.json();

// axios — shorter, and errors throw on their own
const { data } = await axios.get(url);
```

---

## 4. Installing Axios

```bash
npm install axios
```

Then import it where you need it:
```jsx
import axios from "axios";
```

---

## 5. GET Requests with Axios

Read data. The result is in `response.data`.

```jsx
import axios from "axios";

async function getUsers() {
  const response = await axios.get("https://jsonplaceholder.typicode.com/users");
  return response.data; // already parsed JSON
}
```

Often we destructure it:
```jsx
const { data } = await axios.get(url);
```

👉 See [`examples/axiosBasics.js`](./examples/axiosBasics.js)

---

## 6. POST Requests with Axios

Create data. Pass the body as the **second argument** — Axios stringifies it and sets headers for you.

```jsx
async function createPost(title) {
  const { data } = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    { title } // the body — no JSON.stringify needed
  );
  return data;
}
```

Compare with `fetch`, where you'd write `JSON.stringify` and set `Content-Type` yourself. Axios is shorter.

---

## 7. PUT and PATCH Requests with Axios

Update data.

- **PUT** — replace the whole item.
- **PATCH** — change only some fields.

```jsx
// PUT — replace
await axios.put(`${API}/posts/1`, { title: "New title", body: "..." });

// PATCH — partial update
await axios.patch(`${API}/posts/1`, { title: "Only the title" });
```

Both take the URL and the new data, just like POST.

---

## 8. DELETE Requests with Axios

Remove data.

```jsx
async function deletePost(id) {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
}
```

Short and simple — just the URL.

---

## 9. Creating a Reusable API Service

### The problem

Spreading axios calls all over the app is messy. If the base URL changes, you must edit many files.

### The solution: an axios instance + a service file

Create **one** axios instance with the base URL, then build small functions on top.

```jsx
// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getPosts = () => api.get("/posts").then((r) => r.data);
export const getPost = (id) => api.get(`/posts/${id}`).then((r) => r.data);
export const createPost = (data) => api.post("/posts", data).then((r) => r.data);
export const deletePost = (id) => api.delete(`/posts/${id}`);
```

Now the base URL lives in **one** place, and components call clean functions like `getPosts()`.

👉 See [`examples/api.js`](./examples/api.js)

---

## 10. Working with REST APIs

A **REST API** uses URLs and HTTP methods to manage data:

| Method | Action | Axios |
| --- | --- | --- |
| `GET` | Read | `axios.get(url)` |
| `POST` | Create | `axios.post(url, data)` |
| `PUT` / `PATCH` | Update | `axios.put(url, data)` |
| `DELETE` | Remove | `axios.delete(url)` |

The same resource (e.g. `/posts`) supports all four — the **method** decides the action.

---

## 11. CRUD Operations

CRUD = **C**reate, **R**ead, **U**pdate, **D**elete — all four together with our service:

```jsx
import { getPosts, createPost, updatePost, deletePost } from "./api";

const posts = await getPosts();              // READ
const created = await createPost({ title: "Hi" }); // CREATE
await updatePost(1, { title: "Edited" });    // UPDATE
await deletePost(1);                         // DELETE
```

We use full CRUD in the projects (Sections 17–19).

👉 See [`examples/crud.js`](./examples/crud.js)

---

## 12. Handling API Errors

Axios **throws** on HTTP errors, so use `try/catch`. The error object has useful info.

```jsx
try {
  const { data } = await axios.get("/posts");
} catch (err) {
  if (err.response) {
    // The server replied with an error status (404, 500...).
    console.log("Status:", err.response.status);
    setError(`Server error: ${err.response.status}`);
  } else if (err.request) {
    // The request was sent but no reply (network/offline).
    setError("No response. Check your connection.");
  } else {
    setError("Something went wrong.");
  }
}
```

> 💡 Always show a friendly message and, when possible, a "Try again" button.

---

## 13. Environment Variables for API URLs

### The problem

The API URL is different on your computer vs the live site. Don't hard-code it.

### The solution: a `.env` file

In Vite, variables must start with `VITE_`.

**`.env`**
```
VITE_API_URL=https://jsonplaceholder.typicode.com
```

**Use it:**
```jsx
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
```

> ⚠️ Frontend env vars are visible to users — public values only, no secrets. (More in Section 20.)

---

## 14. Reusable Data Fetching Hook

### The problem

Writing the loading/error/data states in every component is repetitive.

### The solution: a `useFetch` custom hook

```jsx
import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(url);
        if (active) setData(res.data);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => { active = false; };
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

## ✅ Section 12 Recap

- **`fetch`** returns a promise; use `await fetch` then `await res.json()`. Check `res.ok`.
- Always handle **loading / error / data**.
- **Axios** is shorter: data at `res.data`, auto JSON, errors throw on their own.
- **GET/POST/PUT/PATCH/DELETE** cover **CRUD**.
- Put all calls in **one service** with an axios instance + base URL.
- **Handle errors** with try/catch and friendly messages.
- Store the **API URL in a `.env`** (prefixed `VITE_`).
- A **`useFetch`** hook removes repetition.

### Knowledge check

1. Name two things Axios does for you that `fetch` does not.
2. Where is the response data on an Axios call?
3. Why put all API calls in one service file?

<details>
<summary>Show answers</summary>

1. Any two: auto-parses JSON, throws on HTTP errors automatically, lets you pass the body directly (no `JSON.stringify`/headers), supports base-URL instances.
2. In `response.data` (often destructured as `const { data } = await axios.get(url)`).
3. So the base URL and request logic live in one place — easy to change, and components stay clean.

</details>

---

**Next up → [Section 13: Suspense and React 19 use](../Section%2013%20-%20Suspense%20and%20React%2019%20use/README.md)**
A modern way to handle loading with Suspense and the `use` API. ⏳

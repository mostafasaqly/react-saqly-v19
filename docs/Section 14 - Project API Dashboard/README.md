# Section 14: Project — API Dashboard

> **React 19 Crash Course** — Section 14 of 16
> Level: Project (combines Sections 6, 10, 11, 12)

Our second project fetches **real data** from an API and shows it in a clean dashboard with search, a detail page, loading skeletons, and proper error handling. This is the kind of app you'll build at a real job.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Building the Dashboard Layout](#2-building-the-dashboard-layout)
3. [Fetching API Data](#3-fetching-api-data)
4. [Search and Filter](#4-search-and-filter)
5. [Details Page](#5-details-page)
6. [Loading Skeletons](#6-loading-skeletons)
7. [Error UI](#7-error-ui)
8. [Reusable API Service](#8-reusable-api-service)
9. [Final Refactoring](#9-final-refactoring)

📁 **Code for this section:** see the [`examples/`](./examples) folder.

---

## 1. Project Overview

**What we build:** a dashboard listing users from a public API. You can:

- 📋 See a list of users
- 🔍 Search/filter them by name
- 👤 Click a user to see a detail page
- 💀 See loading skeletons while data loads
- ⚠️ See a friendly error UI if something fails

**API used:** `https://jsonplaceholder.typicode.com/users` (free, no key needed).

**Concepts used:** data fetching, custom hooks, routing, route params, derived state, conditional rendering, and reusable services.

**File plan:**
```
src/
├── App.jsx                 ← routes
├── services/
│   └── api.js              ← all fetch calls in one place
├── hooks/
│   └── useFetch.jsx        ← reusable loading/error/data hook
├── pages/
│   ├── Dashboard.jsx       ← list + search
│   └── UserDetail.jsx      ← one user's details
└── components/
    ├── UserCard.jsx        ← one user in the list
    ├── SearchBar.jsx       ← search input
    ├── Skeleton.jsx        ← gray loading placeholder
    └── ErrorMessage.jsx    ← error UI with retry
```

---

## 2. Building the Dashboard Layout

We use **React Router** (Section 10) for two pages: the list and the detail.

```jsx
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/users/:id" element={<UserDetail />} />
    </Routes>
  );
}
```

See [`examples/App.jsx`](./examples/App.jsx).

---

## 3. Fetching API Data

We reuse our **`useFetch`** hook (Section 11). The Dashboard loads all users in one line:

```jsx
const { data: users, loading, error } = useFetch(
  "https://jsonplaceholder.typicode.com/users"
);
```

That gives us the three states (loading, error, data) for free. See [`examples/hooks/useFetch.jsx`](./examples/hooks/useFetch.jsx).

---

## 4. Search and Filter

The search is **derived state**: we filter the fetched users by the search text. We don't store a separate filtered list.

```jsx
const [search, setSearch] = useState("");

const visibleUsers = (users || []).filter((user) =>
  user.name.toLowerCase().includes(search.toLowerCase())
);
```

The input is a **controlled input** (Section 5) feeding `search`. See [`examples/pages/Dashboard.jsx`](./examples/pages/Dashboard.jsx) and [`examples/components/SearchBar.jsx`](./examples/components/SearchBar.jsx).

---

## 5. Details Page

When you click a user, we go to `/users/:id`. The detail page reads the id with `useParams` and fetches that one user.

```jsx
import { useParams } from "react-router-dom";

function UserDetail() {
  const { id } = useParams();
  const { data: user, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  // ...show loading / error / user...
}
```

See [`examples/pages/UserDetail.jsx`](./examples/pages/UserDetail.jsx).

---

## 6. Loading Skeletons

### The problem

A blank screen or a bare "Loading..." feels slow and jumpy.

### The solution: skeletons

A **skeleton** is a gray box shaped like the real content. It tells the user "content is coming here" and keeps the layout stable.

```jsx
function Skeleton() {
  return <div className="skeleton" />; // a gray, pulsing box via CSS
}
```

While loading, we show several skeletons instead of one word. See [`examples/components/Skeleton.jsx`](./examples/components/Skeleton.jsx).

---

## 7. Error UI

### The problem

If the fetch fails, the user should see a clear message and a way to try again — not a broken page.

### The solution: a friendly error component

```jsx
function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error">
      <p>⚠️ {message}</p>
      {onRetry && <button onClick={onRetry}>Try again</button>}
    </div>
  );
}
```

See [`examples/components/ErrorMessage.jsx`](./examples/components/ErrorMessage.jsx).

---

## 8. Reusable API Service

### The problem

Spreading `fetch` URLs all over the app is messy. If the API changes, you must edit many files.

### The solution: one service file

Put all API calls in `services/api.js`. The rest of the app calls these functions, not raw URLs.

```jsx
const BASE = "https://jsonplaceholder.typicode.com";

export async function getUsers() {
  const res = await fetch(`${BASE}/users`);
  if (!res.ok) throw new Error("Failed to load users");
  return res.json();
}

export async function getUser(id) {
  const res = await fetch(`${BASE}/users/${id}`);
  if (!res.ok) throw new Error("Failed to load user");
  return res.json();
}
```

Now the base URL lives in **one** place. See [`examples/services/api.js`](./examples/services/api.js).

---

## 9. Final Refactoring

Good apps get cleaned up. Our refactor checklist:

- ✅ All fetch logic in `services/api.js` (one source of truth).
- ✅ Reusable `useFetch` hook for loading/error/data.
- ✅ Small, single-job components (`UserCard`, `SearchBar`, `Skeleton`, `ErrorMessage`).
- ✅ Derived state for search (no duplicate data).
- ✅ Clear loading and error states on **every** fetch.

> 🧠 **Best practice:** separate **data** (services/hooks) from **UI** (components/pages). This makes the app easy to grow and test.

---

## 🎉 What you built

A real, data-driven dashboard with routing, search, detail pages, skeletons, and error handling — the core of countless production apps.

### Challenges (try these!)

1. Add **sorting** (by name or city).
2. Add **pagination** or "load more".
3. Cache results so going back doesn't refetch.
4. Add a second resource (e.g. each user's **posts** on the detail page).

---

**Next up → [Section 15: Deployment](../Section%2015%20-%20Deployment/README.md)**
Let's put your apps on the internet for the world to see. 🌍

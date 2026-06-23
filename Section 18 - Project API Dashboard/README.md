# Section 18: Project 2 — API Dashboard

> **React 19 Course** — Section 18 of 21
> Level: Project (combines Sections 11, 12, 13, 16)

Our second project fetches **real data** with **Axios** and shows it in a clean dashboard: cards, search, a detail page, loading skeletons, and proper error handling. This is the kind of app you'll build at a real job.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Building the Dashboard Layout](#2-building-the-dashboard-layout)
3. [Creating Dashboard Cards](#3-creating-dashboard-cards)
4. [Fetching API Data with Axios](#4-fetching-api-data-with-axios)
5. [Loading State](#5-loading-state)
6. [Error State](#6-error-state)
7. [Search and Filter](#7-search-and-filter)
8. [Creating Details Page](#8-creating-details-page)
9. [Dynamic Route for Details](#9-dynamic-route-for-details)
10. [Sending Data with navigate](#10-sending-data-with-navigate)
11. [Reading Data with useLocation](#11-reading-data-with-uselocation)
12. [Route Params Alternative](#12-route-params-alternative)
13. [Loading Skeletons](#13-loading-skeletons)
14. [Reusable API Service](#14-reusable-api-service)
15. [Final Refactoring](#15-final-refactoring)

📁 **Code for this section:** see the [`examples/`](./examples) folder.

---

## 1. Project Overview

**What we build:** a dashboard listing users from a public API. You can:

- 📋 See users as cards
- 🔍 Search/filter by name
- 👤 Click a user to see a detail page
- 💀 See loading skeletons while data loads
- ⚠️ See a friendly error UI on failure

**API used:** `https://jsonplaceholder.typicode.com/users` (free, no key).

**File plan:**
```
src/
├── App.jsx
├── services/
│   └── api.js              ← axios instance + functions
├── hooks/
│   └── useFetch.jsx        ← loading/error/data (Axios)
├── pages/
│   ├── Dashboard.jsx       ← cards + search
│   └── UserDetail.jsx      ← one user's details
└── components/
    ├── UserCard.jsx
    ├── SearchBar.jsx
    ├── Skeleton.jsx
    └── ErrorMessage.jsx
```

---

## 2. Building the Dashboard Layout

We use **React Router** (Section 11) for two pages: the list and the detail.

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

## 3. Creating Dashboard Cards

A **card** shows one user in a tidy box and links to their detail page. Cards make a list scannable and clickable.

```jsx
import { Link } from "react-router-dom";

function UserCard({ user }) {
  return (
    <Link to={`/users/${user.id}`} className="card">
      <strong>{user.name}</strong>
      <div>{user.email}</div>
    </Link>
  );
}
```

Reuse one `UserCard` for every user with different props (Section 3). See [`examples/components/UserCard.jsx`](./examples/components/UserCard.jsx).

---

## 4. Fetching API Data with Axios

We reuse our **`useFetch`** hook (now Axios-based, Section 12). The Dashboard loads all users in one line:

```jsx
const { data: users, loading, error } = useFetch(URLS.users);
```

That gives the three states for free. See [`examples/hooks/useFetch.jsx`](./examples/hooks/useFetch.jsx).

---

## 5. Loading State

While loading, show **skeletons** (lesson 13) instead of a blank screen:

```jsx
{loading && (
  <div>
    <Skeleton />
    <Skeleton />
    <Skeleton />
  </div>
)}
```

---

## 6. Error State

If the fetch fails, show a friendly message with a retry button — never a broken page.

```jsx
{error && <ErrorMessage message={error} onRetry={reload} />}
```

See [`examples/components/ErrorMessage.jsx`](./examples/components/ErrorMessage.jsx).

---

## 7. Search and Filter

Search is **derived state**: filter the fetched users by the search text.

```jsx
const [search, setSearch] = useState("");

const visibleUsers = (users || []).filter((user) =>
  user.name.toLowerCase().includes(search.toLowerCase())
);
```

The `SearchBar` is a controlled input feeding `search`. See [`examples/pages/Dashboard.jsx`](./examples/pages/Dashboard.jsx).

---

## 8. Creating Details Page

Clicking a card goes to `/users/:id`. The detail page fetches and shows that one user. See [`examples/pages/UserDetail.jsx`](./examples/pages/UserDetail.jsx).

---

## 9. Dynamic Route for Details

A dynamic route matches any id:

```jsx
<Route path="/users/:id" element={<UserDetail />} />
```

So `/users/1`, `/users/2`, etc. all show `UserDetail`.

---

## 10. Sending Data with navigate

We already have the user object on the dashboard. To avoid re-fetching, we can **pass it along** when navigating (Section 11).

```jsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

function openUser(user) {
  navigate(`/users/${user.id}`, { state: { user } });
}
```

The user data travels to the detail page — no second request needed (when state is present).

---

## 11. Reading Data with useLocation

The detail page reads the passed data with `useLocation`, and only fetches if it wasn't sent.

```jsx
import { useLocation, useParams } from "react-router-dom";

function UserDetail() {
  const { id } = useParams();
  const location = useLocation();
  const passedUser = location.state?.user;

  // Use the passed user if we have it; otherwise fetch by id.
  const { data: fetchedUser } = useFetch(passedUser ? null : URLS.user(id));
  const user = passedUser || fetchedUser;
  // ...render...
}
```

This is a real optimization: instant detail view when navigating from the list, still works on direct URL visits.

---

## 12. Route Params Alternative

What if the user opens `/users/5` **directly** (a shared link)? There's no `location.state`. So we fall back to **route params + fetch**:

```jsx
const { id } = useParams();               // always available from the URL
const passedUser = location.state?.user;  // only when navigated from the list

const user = passedUser || fetchedUser;   // params+fetch is the reliable fallback
```

> 🧠 **Lesson:** `navigate state` is a nice speed boost, but **route params** are the dependable source — they work for shared and bookmarked links too. Always support the param path.

See [`examples/pages/UserDetail.jsx`](./examples/pages/UserDetail.jsx).

---

## 13. Loading Skeletons

A **skeleton** is a gray box shaped like the real content. It tells the user "content is coming" and keeps the layout stable (no jumpiness).

```jsx
function Skeleton() {
  return <div className="skeleton" />; // a gray, pulsing box via CSS
}
```

See [`examples/components/Skeleton.jsx`](./examples/components/Skeleton.jsx).

---

## 14. Reusable API Service

Put all API calls in `services/api.js` with one axios instance — the base URL lives in one place (Section 12).

```jsx
import axios from "axios";

const api = axios.create({ baseURL: "https://jsonplaceholder.typicode.com" });

export const URLS = {
  users: "/users",
  user: (id) => `/users/${id}`,
};
export const getUsers = () => api.get(URLS.users).then((r) => r.data);
```

See [`examples/services/api.js`](./examples/services/api.js).

---

## 15. Final Refactoring

Clean-up checklist:

- ✅ All fetch logic in `services/api.js` (one source of truth).
- ✅ Reusable `useFetch` hook (Axios) for loading/error/data.
- ✅ Small, single-job components (`UserCard`, `SearchBar`, `Skeleton`, `ErrorMessage`).
- ✅ Derived state for search (no duplicate data).
- ✅ `navigate state` for speed, route params as the reliable fallback.

> 🧠 **Best practice:** separate **data** (services/hooks) from **UI** (components/pages). Easy to grow and test.

---

## 🎉 What you built

A real, data-driven dashboard with routing, search, detail pages, skeletons, and error handling — the core of countless production apps.

### Challenges

1. Add **sorting** (by name or city).
2. Add **pagination** or "load more".
3. Show each user's **posts** on the detail page (a second request).
4. Cache results so going back doesn't refetch.

---

**Next up → [Section 19: Project 3 — E-commerce Mini App with Redux](../Section%2019%20-%20Project%20Ecommerce%20Mini%20App%20with%20Redux/README.md)**
A third project using Redux Toolkit for a cart and favorites. 🛒

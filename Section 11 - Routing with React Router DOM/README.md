# Section 11: Routing with React Router DOM

> **React 19 Course** — Section 11 of 21
> Level: Intermediate

A React app is a **single page**, but real websites have many pages: Home, About, Profile, etc. **React Router DOM** lets us show different components for different URLs — without reloading the page.

---

## Table of Contents

1. [What is Client Side Routing?](#1-what-is-client-side-routing)
2. [Installing React Router DOM](#2-installing-react-router-dom)
3. [BrowserRouter, Routes, and Route](#3-browserrouter-routes-and-route)
4. [Creating Pages](#4-creating-pages)
5. [Layout Routes](#5-layout-routes)
6. [Link vs NavLink](#6-link-vs-navlink)
7. [Active Navigation Styling with NavLink](#7-active-navigation-styling-with-navlink)
8. [Programmatic Navigation with useNavigate](#8-programmatic-navigation-with-usenavigate)
9. [Redirecting Users After Actions](#9-redirecting-users-after-actions)
10. [Sending Data with navigate State](#10-sending-data-with-navigate-state)
11. [Reading Sent Data with useLocation](#11-reading-sent-data-with-uselocation)
12. [Dynamic Routes](#12-dynamic-routes)
13. [Route Params with useParams](#13-route-params-with-useparams)
14. [Query Params Basics](#14-query-params-basics)
15. [Not Found Page](#15-not-found-page)
16. [Protected Routes](#16-protected-routes)
17. [Redirecting Users After Login](#17-redirecting-users-after-login)

📁 **Code for this section:** see the [`examples/`](./examples) folder.

---

## 1. What is Client Side Routing?

### The problem

On an old website, clicking a link asks the server for a whole new HTML page. The screen flashes, and any app state is lost.

### The solution: client-side routing

In a React app, **the browser already has all the code**. Client-side routing swaps which component is shown **based on the URL** — no server request, no full reload. It feels instant, and state is kept.

**React Router DOM** is the standard library for this. It watches the URL and renders the matching component.

---

## 2. Installing React Router DOM

```bash
npm install react-router-dom
```

---

## 3. BrowserRouter, Routes, and Route

Three pieces work together:

- **`<BrowserRouter>`** — wraps the whole app and watches the URL. Add it once in `main.jsx`.
- **`<Routes>`** — holds all your routes; shows the first one that matches.
- **`<Route>`** — one URL → one component.

**`main.jsx`**
```jsx
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

**`App.jsx`**
```jsx
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
```

- `path` — the URL to match.
- `element` — the component to show.

👉 See [`examples/App.jsx`](./examples/App.jsx)

---

## 4. Creating Pages

A "page" is just a normal component that you point a route at. Keep them in a `pages/` folder.

```jsx
function Home() {
  return <h1>Home</h1>;
}
function About() {
  return <h1>About</h1>;
}
```

Then list them in `<Routes>` as shown above. Pages are components — nothing special.

---

## 5. Layout Routes

### The problem

Most pages share the same header and navigation. You don't want to repeat them in every page.

### The solution: a layout route with `<Outlet />`

Make a `Layout` with the shared parts plus an `<Outlet />`. The `<Outlet />` is where the matched child page appears.

```jsx
import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <main>
        <Outlet /> {/* the current page renders here */}
      </main>
    </div>
  );
}
```

Nest pages inside it:
```jsx
<Routes>
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Route>
</Routes>
```

👉 See [`examples/Layout.jsx`](./examples/Layout.jsx)

---

## 6. Link vs NavLink

### The problem

A normal `<a href="/about">` reloads the whole page, losing React's speed and state.

### The solution: `<Link>` and `<NavLink>`

`<Link>` changes the URL **without** a full reload.

```jsx
import { Link } from "react-router-dom";
<Link to="/about">About</Link>
```

`<NavLink>` is like `<Link>` but it knows when it's the **active** page (more next).

---

## 7. Active Navigation Styling with NavLink

`<NavLink>` gives you an `isActive` flag so you can highlight the current page.

```jsx
import { NavLink } from "react-router-dom";

<NavLink
  to="/about"
  className={({ isActive }) => (isActive ? "active" : "")}
>
  About
</NavLink>
```

When the URL is `/about`, this link gets the `active` class. Style `.active` however you like (bold, underline, color).

> 💡 Add `end` to the home link (`<NavLink to="/" end>`) so it's only active on the exact `/` path.

---

## 8. Programmatic Navigation with useNavigate

### The problem

Sometimes you need to navigate from **code**, not a click — for example, after a form submits.

### The solution: `useNavigate`

```jsx
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  function handleLogin() {
    // ...do login...
    navigate("/dashboard"); // go to another page from code
  }
}
```

`navigate(-1)` goes back one page, like the browser back button.

---

## 9. Redirecting Users After Actions

A very common use of `useNavigate`: after a successful action (save, login, create), send the user somewhere.

```jsx
async function handleSave(formData) {
  await saveItem(formData);
  navigate("/items");      // go to the list after saving
}
```

This makes the app flow naturally: do the thing → move to the next screen.

---

## 10. Sending Data with navigate State

### The problem

When you navigate, you sometimes want to **carry a little data** to the next page — without putting it in the URL.

### The solution: the `state` option

```jsx
navigate("/details", { state: { from: "dashboard", id: 42 } });
```

The data travels with the navigation but stays out of the URL. The next page reads it (next lesson).

> 💡 Use this for small, temporary data (where the user came from, a selected item). For data that should be **shareable/bookmarkable**, use the URL (params or query) instead.

---

## 11. Reading Sent Data with useLocation

The destination page reads `state` with `useLocation`.

```jsx
import { useLocation } from "react-router-dom";

function Details() {
  const location = useLocation();
  const data = location.state; // { from: "dashboard", id: 42 }

  return <p>You came from: {data?.from}</p>;
}
```

`useLocation` also gives you `location.pathname` (the current URL) and `location.search` (the query string).

👉 See [`examples/NavigateState.jsx`](./examples/NavigateState.jsx)

---

## 12. Dynamic Routes

### The problem

You have many products: `/product/1`, `/product/2`... You can't write a route for each.

### The solution: a URL parameter with `:`

```jsx
<Route path="/product/:id" element={<Product />} />
```

Now `/product/1`, `/product/42`, and `/product/anything` all show `Product`. The part after `:` becomes a **param**.

---

## 13. Route Params with useParams

Read the dynamic part with `useParams`.

```jsx
import { useParams } from "react-router-dom";

function Product() {
  const { id } = useParams(); // matches the :id in the route
  return <h1>Product #{id}</h1>;
}
```

If the URL is `/product/42`, then `id` is `"42"`. You usually use this id to fetch that product's data.

👉 See [`examples/Product.jsx`](./examples/Product.jsx)

---

## 14. Query Params Basics

### The problem

You want optional values in the URL, like a search or a filter: `/search?q=shoes&page=2`. These are **query params** (after the `?`).

### The solution: `useSearchParams`

```jsx
import { useSearchParams } from "react-router-dom";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q") || "";   // read ?q=
  const page = searchParams.get("page") || "1";

  function updateSearch(text) {
    setSearchParams({ q: text, page: "1" }); // updates the URL
  }

  return (
    <div>
      <input value={q} onChange={(e) => updateSearch(e.target.value)} />
      <p>Searching "{q}" (page {page})</p>
    </div>
  );
}
```

**Why query params are great:** the URL is now **shareable and bookmarkable** — copy it and the search comes back.

👉 See [`examples/SearchParams.jsx`](./examples/SearchParams.jsx)

---

## 15. Not Found Page

### The problem

What if the user types a URL that doesn't exist?

### The solution: a catch-all route with `*`

The `*` path matches **anything** not matched above it. Put it last.

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="*" element={<NotFound />} /> {/* matches everything else */}
</Routes>
```

```jsx
function NotFound() {
  return <h1>404 — Page not found</h1>;
}
```

---

## 16. Protected Routes

### The problem

Some pages (like a dashboard) should only show if the user is **logged in**.

### The solution: a guard component

If logged in, show the page; if not, redirect to login with `<Navigate>`.

```jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
```

Wrap a protected page:
```jsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute isLoggedIn={isLoggedIn}>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

👉 See [`examples/ProtectedRoute.jsx`](./examples/ProtectedRoute.jsx)

---

## 17. Redirecting Users After Login

### The problem

A user tries to open `/dashboard` while logged out. You send them to `/login`. After they log in, they should go **back to where they wanted** — not just to the home page.

### The solution: remember the target with location state

When redirecting to login, remember where they were going:

```jsx
// In the protected route:
<Navigate to="/login" state={{ from: location.pathname }} replace />
```

After login, send them back:

```jsx
function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/"; // where they wanted to go

  function handleLogin() {
    // ...do login...
    navigate(from, { replace: true }); // back to the original page
  }
}
```

This is the polished, professional login flow used by real apps.

---

## ✅ Section 11 Recap

- **Client-side routing** swaps components by URL with no reload.
- **`<BrowserRouter>` / `<Routes>` / `<Route>`** set up routing.
- **Layout routes** share UI with a `Layout` + `<Outlet />`.
- **`<Link>` / `<NavLink>`** navigate without reload; `NavLink` shows the active page.
- **`useNavigate`** navigates from code (great after actions/login).
- **`navigate state`** + **`useLocation`** carry small data between pages.
- **Dynamic routes** (`:id`) + **`useParams`** for detail pages.
- **`useSearchParams`** for shareable query params (`?q=...`).
- **`*`** for Not Found; **`<Navigate>`** for protected routes and post-login redirects.

### Knowledge check

1. Why use `<Link>` instead of `<a>`?
2. What's the difference between a route **param** (`:id`) and a **query param** (`?q=`)?
3. How do you send the user back to the page they originally wanted after login?

<details>
<summary>Show answers</summary>

1. `<Link>` changes the URL without a full reload, keeping React fast and preserving state.
2. A param is part of the path and usually required (`/product/42`); a query param is optional info after `?` (`/search?q=shoes`), great for searches and filters.
3. Store the target in location `state` when redirecting to login (`state={{ from }}`), then after login `navigate(from)`.

</details>

---

**Next up → [Section 12: Data Fetching and Axios](../Section%2012%20-%20Data%20Fetching%20and%20Axios/README.md)**
We go deeper into loading data, this time with Axios. 🌐

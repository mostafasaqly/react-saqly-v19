# Section 10: Routing

> **React 19 Crash Course** — Section 10 of 16
> Level: Intermediate

A React app is a **single page**, but real websites have many pages: Home, About, Profile, etc. **React Router** lets us show different components for different URLs — without reloading the page.

---

## Table of Contents

1. [Installing React Router](#1-installing-react-router)
2. [Creating Routes](#2-creating-routes)
3. [Layout Routes](#3-layout-routes)
4. [Navigation Links](#4-navigation-links)
5. [Dynamic Routes](#5-dynamic-routes)
6. [Route Params](#6-route-params)
7. [Not Found Page](#7-not-found-page)
8. [Protected Routes](#8-protected-routes)

📁 **Code for this section:** see the [`examples/`](./examples) folder.

---

## 1. Installing React Router

React Router is a separate package. Install it:

```bash
npm install react-router-dom
```

Then wrap your whole app in a `<BrowserRouter>` in `main.jsx`:

```jsx
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

`<BrowserRouter>` watches the URL and tells your app which page to show.

---

## 2. Creating Routes

Inside `App`, you list your pages with `<Routes>` and `<Route>`.

```jsx
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
```

- `path` — the URL to match.
- `element` — the component to show for that URL.

Now `/` shows `Home`, `/about` shows `About`, and so on.

👉 See [`examples/App.jsx`](./examples/App.jsx)

---

## 3. Layout Routes

### The problem

Most pages share the same header and navigation. You don't want to repeat them in every page component.

### The solution: a layout route with `<Outlet />`

Make a `Layout` component with the shared parts plus an `<Outlet />`. The `<Outlet />` is where the matched child page appears.

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

Then nest your pages inside it:
```jsx
<Routes>
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Route>
</Routes>
```

Now Home and About both share the same nav, automatically.

👉 See [`examples/Layout.jsx`](./examples/Layout.jsx)

---

## 4. Navigation Links

### The problem

A normal `<a href="/about">` reloads the whole page. That loses React's speed and state.

### The solution: `<Link>` and `<NavLink>`

`<Link>` changes the URL **without** a full reload.

```jsx
import { Link } from "react-router-dom";

<Link to="/about">About</Link>
```

`<NavLink>` is like `<Link>` but knows when it is the **active** page, so you can style it:

```jsx
import { NavLink } from "react-router-dom";

<NavLink
  to="/about"
  className={({ isActive }) => (isActive ? "active" : "")}
>
  About
</NavLink>
```

To navigate from code (e.g. after a form submit), use the `useNavigate` hook:
```jsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
navigate("/dashboard"); // go to /dashboard
```

---

## 5. Dynamic Routes

### The problem

You have many products: `/product/1`, `/product/2`, `/product/3`... You can't write a route for each one.

### The solution: a URL parameter with `:`

Use `:id` to match any value in that spot.

```jsx
<Route path="/product/:id" element={<Product />} />
```

Now `/product/1`, `/product/42`, and `/product/anything` all show the `Product` component. The part after `:` becomes a **param** you can read.

---

## 6. Route Params

Read the dynamic part of the URL with the `useParams` hook.

```jsx
import { useParams } from "react-router-dom";

function Product() {
  const { id } = useParams(); // matches the :id in the route
  return <h1>Product #{id}</h1>;
}
```

If the URL is `/product/42`, then `id` is `"42"`. You typically use this id to fetch that product's data.

👉 See [`examples/Product.jsx`](./examples/Product.jsx)

---

## 7. Not Found Page

### The problem

What if the user types a URL that doesn't exist?

### The solution: a catch-all route with `*`

The `*` path matches **anything** not matched above it. Put it last.

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="*" element={<NotFound />} /> {/* matches everything else */}
</Routes>
```

```jsx
function NotFound() {
  return <h1>404 — Page not found</h1>;
}
```

---

## 8. Protected Routes

### The problem

Some pages (like a dashboard) should only show if the user is **logged in**.

### The solution: a guard component

Make a wrapper that checks login. If logged in, show the page; if not, redirect to login with `<Navigate>`.

```jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; // send to login
  }
  return children; // allowed — show the page
}
```

Use it to wrap a protected page:
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

We use this exact idea in real apps to protect user areas.

👉 See [`examples/ProtectedRoute.jsx`](./examples/ProtectedRoute.jsx)

---

## ✅ Section 10 Recap

- Install `react-router-dom`, wrap the app in `<BrowserRouter>`.
- **Routes:** `<Routes>` + `<Route path element />`.
- **Layout routes:** share UI with a `Layout` + `<Outlet />`.
- **Links:** `<Link>` / `<NavLink>` (no reload); `useNavigate` from code.
- **Dynamic routes:** `:id` in the path.
- **Params:** read with `useParams()`.
- **Not Found:** catch-all `path="*"`.
- **Protected routes:** guard with a check + `<Navigate>`.

### Knowledge check

1. Why use `<Link>` instead of `<a>`?
2. How do you read the `:id` from `/product/:id`?
3. What does `path="*"` match?

<details>
<summary>Show answers</summary>

1. `<Link>` changes the URL without a full page reload, keeping React fast and preserving state. `<a>` reloads the whole page.
2. With the `useParams()` hook: `const { id } = useParams()`.
3. Any URL not matched by an earlier route — used for a 404 / Not Found page.

</details>

---

**Next up → [Section 11: Data Fetching](../Section%2011%20-%20Data%20Fetching/README.md)**
We go deeper into loading data, including Suspense and the React 19 `use` API. 🌐

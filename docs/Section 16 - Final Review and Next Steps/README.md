# Section 16: Final Review and Next Steps

> **React 19 Crash Course** — Section 16 of 16
> Level: All levels

Congratulations — you made it! 🎉 This section ties everything together, prepares you for interviews, and points you to what comes next.

---

## Table of Contents

1. [React 19 Recap](#1-react-19-recap)
2. [Common Interview Questions](#2-common-interview-questions)
3. [What to Learn After React](#3-what-to-learn-after-react)
4. [React vs Next.js](#4-react-vs-nextjs)
5. [Final Project Ideas](#5-final-project-ideas)
6. [Course Conclusion](#6-course-conclusion)

---

## 1. React 19 Recap

Here is the whole course in one page. If you understand this list, you understand React.

**Core (Sections 3–6):**
- **Components** return JSX. Names start with a capital letter.
- **Props** pass data in (read-only). **`children`** passes JSX in.
- **State** (`useState`) is watched memory; changing it re-renders.
- **Lists** with `.map()` + a unique **`key`**. **Events** like `onClick`.
- **`useEffect`** runs side effects; clean up timers and listeners.

**React 19 highlights (Sections 7–9, 11):**
- **Actions** — pass an async function to `<form action={...}>`.
- **`useActionState`** — `[state, formAction, isPending]`.
- **`useFormStatus`** — read the parent form's pending state (from `react-dom`).
- **`useOptimistic`** — show the result instantly; roll back on failure.
- **`use`** — read context and promises; works with `<Suspense>`.

**Architecture & quality (Sections 9–12):**
- **Context** + **`useContext`** to share data without drilling.
- **Custom hooks** (`useSomething`) to reuse logic.
- **React Router** for pages, params, and protected routes.
- **`memo` / `useMemo` / `useCallback`** — and the **React Compiler** that automates them.
- **`lazy` + `<Suspense>`** for code splitting.

---

## 2. Common Interview Questions

Practice answering these out loud.

**Q: What is the difference between state and props?**
Props are passed in from a parent and are read-only. State is owned by the component and can change; changing it re-renders the component.

**Q: Why do we need a `key` in lists?**
So React can match each item across renders and update only what changed. Without it, React may re-create items and cause bugs.

**Q: When does `useEffect` run, and why return a function?**
It runs after render. With `[]` it runs once; with `[x]` it runs when `x` changes. The returned function cleans up (timers, listeners) before the next run or on unmount.

**Q: What is the difference between `useMemo` and `useCallback`?**
`useMemo` caches a computed value; `useCallback` caches a function. `useCallback(fn, deps)` equals `useMemo(() => fn, deps)`.

**Q: What's new in React 19?**
Actions for forms, the hooks `useActionState`, `useFormStatus`, `useOptimistic`, the `use` API for promises/context, and the React Compiler for automatic memoization.

**Q: What is lifting state up?**
Moving shared state to the closest common parent so multiple children can use it. Data flows down via props; events flow up via callbacks.

**Q: Controlled vs uncontrolled inputs?**
A controlled input's value comes from state (`value` + `onChange`). An uncontrolled input keeps its own value in the DOM (read via `formData` or a `ref`). React 19 Actions make uncontrolled forms easy.

---

## 3. What to Learn After React

A suggested path once you're comfortable:

1. **TypeScript** — add types to catch bugs early. Hugely valued by employers.
2. **A state library** — for big apps: **Zustand** (simple) or **Redux Toolkit** (popular).
3. **Data fetching libraries** — **TanStack Query** for caching, retries, and background refetch.
4. **Testing** — **Vitest** + **React Testing Library** to test your components.
5. **A UI/styling system** — **Tailwind CSS**, or a component library like **shadcn/ui** or **MUI**.
6. **Next.js** — the React framework for full websites (see next section).

> 💡 **Tip:** Don't learn all of these at once. Pick one, build something, then add the next.

---

## 4. React vs Next.js

People often ask: "should I use React or Next.js?"

- **React** (what you learned) is a **library** for building UIs. With Vite, it makes a **single-page app** that runs in the browser.
- **Next.js** is a **framework built on React**. It adds server-side rendering (SSR), file-based routing, API routes, image optimization, and more — great for SEO and large sites.

| | React + Vite | Next.js |
| --- | --- | --- |
| Type | Library | Framework |
| Routing | You add React Router | Built in (file-based) |
| Rendering | In the browser (CSR) | Server + client (SSR/SSG) |
| Best for | Dashboards, apps, learning | Websites, SEO, full-stack |

**Good news:** everything in this course transfers directly to Next.js. The components, hooks, state, and React 19 features are all the same. Next.js just adds structure around them.

---

## 5. Final Project Ideas

Build these to grow your skills and portfolio:

1. **Weather app** — fetch from a weather API, show by city (practice fetching + state).
2. **Notes app** — create/edit/delete notes saved in localStorage (practice CRUD + persistence).
3. **Movie search** — search a movie API, show results and a detail page (practice routing + search).
4. **Expense tracker** — add expenses, show a total and a chart (practice derived state).
5. **Blog with comments** — list posts, add comments with Actions and optimistic updates (practice React 19 forms).
6. **Quiz app** — multiple-choice questions, score, and a timer (practice effects + state).

> 🎯 **Pro tip:** Pick one, finish it completely (including deploy), and write a short README. A finished, deployed project beats ten half-built ones.

---

## 6. Course Conclusion

You started not knowing React. Now you can:

- ✅ Build components with props, state, and events.
- ✅ Handle side effects and fetch data.
- ✅ Use React 19's Actions, new hooks, and the `use` API.
- ✅ Share data with Context and custom hooks.
- ✅ Add routing, protect pages, and split code.
- ✅ Optimize performance and understand the React Compiler.
- ✅ Build **two real projects** and **deploy** them.

That is a complete, modern React skill set.

### Keep going

- Build something **every week**, even small.
- Read the official docs at [react.dev](https://react.dev) — they are excellent.
- Don't fear errors; they are how you learn.

> 🚀 **The best way to get good at React is to build with React.** You have all the tools. Now go make something.

**Thank you for taking this course. Happy building!** 🎉

---

**← Back to [Course Home](../README.md)**

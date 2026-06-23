# Section 20: Deployment

> **React 19 Course** — Section 20 of 21
> Level: Beginner → Intermediate

Your apps work on your computer — now let's put them on the **internet** so anyone can use them. We'll prepare for production, handle environment variables, test the build, deploy to Netlify and Vercel (both free), and fix the common router refresh issue.

---

## Table of Contents

1. [Preparing the App for Production](#1-preparing-the-app-for-production)
2. [Environment Variables](#2-environment-variables)
3. [Building the App](#3-building-the-app)
4. [Testing Production Build Locally](#4-testing-production-build-locally)
5. [Deploying to Netlify](#5-deploying-to-netlify)
6. [Deploying to Vercel](#6-deploying-to-vercel)
7. [Fixing React Router Refresh Issues](#7-fixing-react-router-refresh-issues)
8. [Common Deployment Issues](#8-common-deployment-issues)

📁 **Config samples for this section:** see the [`examples/`](./examples) folder.

---

## 1. Preparing the App for Production

A few checks before you deploy:

- ✅ The app runs with **no errors** in the console.
- ✅ `npm run build` finishes successfully (step 3).
- ✅ No secret keys are hard-coded in the source.
- ✅ Remove leftover `console.log`s and test code.
- ✅ If you use routing, your host must redirect all paths to `index.html` (step 7).

> 💡 **Why "build"?** During development, code is readable and large for easy debugging. For production we create small, fast, optimized files.

---

## 2. Environment Variables

### The problem

Some values change between your computer and the live site — like an API URL. Don't hard-code them.

### The solution: `.env` files

Vite reads variables from a `.env` file. **They must start with `VITE_`.**

**`.env`**
```
VITE_API_URL=https://api.example.com
```

**Use it** with `import.meta.env`:
```jsx
const apiUrl = import.meta.env.VITE_API_URL;
```

> ⚠️ **Important:** anything in a frontend `.env` is **visible to users** in the browser. Never put real secrets here — only public values. Add `.env` to `.gitignore`.

See [`examples/.env.example`](./examples/.env.example).

---

## 3. Building the App

Create the production files:

```bash
npm run build
```

This makes a **`dist/`** folder with optimized HTML, CSS, and JavaScript — ready to deploy.

---

## 4. Testing Production Build Locally

Before you deploy, **always test the build on your own machine**. The dev server and the production build can behave differently (minification, base paths, env vars).

```bash
npm run preview
```

This serves the `dist/` folder locally, exactly as a host would. Open the URL it prints and click around:

- Do all pages load?
- Does data still fetch (env vars correct)?
- Do routes work on **refresh**?

> 🧠 **Golden rule:** if `npm run preview` works, the deploy will almost always work too. Catch problems here, not in production.

---

## 5. Deploying to Netlify

Netlify hosts static sites for free. Two easy ways:

### Option A — Drag and drop (fastest)
1. Run `npm run build`.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag your `dist/` folder onto the page. Done!

### Option B — Connect your Git repo (auto-deploy)
1. Push your project to GitHub.
2. In Netlify: **Add new site → Import from Git**.
3. Set **Build command:** `npm run build` and **Publish directory:** `dist`.
4. Deploy. Every push now redeploys automatically.

See [`examples/netlify.toml`](./examples/netlify.toml).

---

## 6. Deploying to Vercel

Vercel is also free and very fast.

### Option A — Vercel website
1. Push your project to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New → Project**.
3. Import your repo. Vercel detects Vite automatically (build `npm run build`, output `dist`).
4. Deploy.

### Option B — Vercel CLI
```bash
npm install -g vercel
vercel
```

See [`examples/vercel.json`](./examples/vercel.json).

---

## 7. Fixing React Router Refresh Issues

### The problem

Your app works, but when you **refresh** on a route like `/about` (or open it directly), you get a **404**. Why? Your app is a single page. The host looks for a real file at `/about`, doesn't find one, and gives up.

### The solution: redirect everything to `index.html`

Tell the host: "for any path, serve `index.html` and let React Router handle it."

- **Netlify** — add `public/_redirects`:
  ```
  /*    /index.html   200
  ```
  (Or use `netlify.toml`, see examples.)

- **Vercel** — add `vercel.json`:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```

After this, refreshing any route works correctly.

> 💡 This is the **single most common deployment bug** for React Router apps. Now you know the fix.

---

## 8. Common Deployment Issues

**Blank white page after deploy.**
Usually a wrong base path. In `vite.config.js`, make sure `base` is correct (default `'/'` is fine for most hosts).

**Environment variable is `undefined`.**
- Did you prefix it with `VITE_`?
- Did you set it in the host's dashboard (not just your local `.env`)?
- Did you redeploy after adding it?

**Old version still shows.**
Browser cache. Hard refresh (Ctrl/Cmd + Shift + R).

**Routes 404 on refresh.**
See lesson 7 — add the redirect to `index.html`.

---

## ✅ Section 20 Recap

- **Prepare:** no errors, no secrets, working `build`.
- **Env vars:** `.env` with `VITE_` prefix, read via `import.meta.env`. No real secrets.
- **Build:** `npm run build` → `dist/`.
- **Test locally:** `npm run preview` before deploying.
- **Netlify / Vercel:** drag-and-drop or connect Git.
- **Router fix:** redirect all paths to `index.html`.

### Knowledge check

1. What prefix must Vite env variables have?
2. Why test with `npm run preview` before deploying?
3. Why do React Router pages 404 on refresh, and how do you fix it?

<details>
<summary>Show answers</summary>

1. `VITE_` (e.g. `VITE_API_URL`).
2. Because the production build can behave differently from the dev server; previewing catches problems before they reach users.
3. The host looks for a real file at that path but it's a single-page app. Fix by redirecting all paths to `index.html` (Netlify `_redirects`, or `vercel.json`).

</details>

---

**Next up → [Section 21: Final Review and Next Steps](../Section%2021%20-%20Final%20Review%20and%20Next%20Steps/README.md)**
We wrap up, review key ideas, and plan what's next. 🎓

# Section 15: Deployment

> **React 19 Crash Course** — Section 15 of 16
> Level: Beginner → Intermediate

Your apps work on your computer — now let's put them on the **internet** so anyone can use them. We'll prepare for production, handle environment variables, and deploy to Netlify and Vercel (both free).

---

## Table of Contents

1. [Preparing the App for Production](#1-preparing-the-app-for-production)
2. [Environment Variables](#2-environment-variables)
3. [Building the App](#3-building-the-app)
4. [Deploying to Netlify](#4-deploying-to-netlify)
5. [Deploying to Vercel](#5-deploying-to-vercel)
6. [Common Deployment Issues](#6-common-deployment-issues)

📁 **Config samples for this section:** see the [`examples/`](./examples) folder.

---

## 1. Preparing the App for Production

A few checks before you deploy:

- ✅ The app runs with **no errors** in the console.
- ✅ `npm run build` finishes successfully (test it locally — see step 3).
- ✅ No secret keys are hard-coded in the source.
- ✅ Remove leftover `console.log`s and test code.
- ✅ If you use routing, your host must redirect all paths to `index.html` (more in step 6).

> 💡 **Why "build"?** During development, code is readable and large for easy debugging. For production we create small, fast, optimized files.

---

## 2. Environment Variables

### The problem

Some values change between your computer and the live site — like an API URL or a public key. You don't want to hard-code them.

### The solution: `.env` files

Vite reads variables from a `.env` file. **They must start with `VITE_`** to be available in your app.

**`.env`**
```
VITE_API_URL=https://api.example.com
```

**Use it in code** with `import.meta.env`:
```jsx
const apiUrl = import.meta.env.VITE_API_URL;
fetch(`${apiUrl}/users`);
```

> ⚠️ **Important:** anything in a frontend `.env` is **visible to users** in the browser. Never put real secrets (private API keys, passwords) here. Only public values. Also add `.env` to `.gitignore` so it isn't committed.

See [`examples/.env.example`](./examples/.env.example).

---

## 3. Building the App

Create the production files:

```bash
npm run build
```

This makes a **`dist/`** folder with optimized HTML, CSS, and JavaScript.

Test it locally before deploying:

```bash
npm run preview
```

This serves the `dist/` folder so you can confirm the production build works. If it looks good locally, it will look good when deployed.

---

## 4. Deploying to Netlify

Netlify hosts static sites for free. Two easy ways:

### Option A — Drag and drop (fastest)
1. Run `npm run build`.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag your `dist/` folder onto the page. Done!

### Option B — Connect your Git repo (auto-deploy)
1. Push your project to GitHub.
2. In Netlify: **Add new site → Import from Git**.
3. Set:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Click Deploy. Every push now redeploys automatically.

> 🧭 **Routing fix:** add a `_redirects` file (see step 6) so React Router pages work.

See [`examples/netlify.toml`](./examples/netlify.toml).

---

## 5. Deploying to Vercel

Vercel is also free and very fast.

### Option A — Vercel website
1. Push your project to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New → Project**.
3. Import your repo. Vercel detects Vite automatically:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Click Deploy.

### Option B — Vercel CLI
```bash
npm install -g vercel
vercel
```
Answer the prompts, and your site goes live with a URL.

> 🧭 Vercel usually handles SPA routing automatically. If not, add the config in [`examples/vercel.json`](./examples/vercel.json).

---

## 6. Common Deployment Issues

**Problem: routes give a 404 on refresh.**
Your app is a single page, but the host looks for a real file at `/about`. Fix: redirect everything to `index.html`.

- **Netlify** — add a file `public/_redirects` with:
  ```
  /*    /index.html   200
  ```
- **Vercel** — add `vercel.json` (see examples) with a rewrite to `/index.html`.

**Problem: blank white page after deploy.**
Usually a wrong base path. In `vite.config.js`, make sure `base` is correct (default `'/'` is fine for most hosts).

**Problem: environment variable is `undefined`.**
- Did you prefix it with `VITE_`?
- Did you set it in the host's dashboard (not just your local `.env`)?
- Did you redeploy after adding it?

**Problem: old version still shows.**
It's the browser cache. Hard refresh (Ctrl/Cmd + Shift + R).

> 🧠 **Golden rule:** if `npm run preview` works locally, the deploy will almost always work too. Test the build first.

---

## ✅ Section 15 Recap

- **Prepare:** no errors, no secrets, working `build`.
- **Env vars:** `.env` with `VITE_` prefix, read via `import.meta.env`. Never store real secrets.
- **Build:** `npm run build` → `dist/`; test with `npm run preview`.
- **Netlify:** drag-and-drop `dist/`, or connect Git.
- **Vercel:** import repo or use the CLI.
- **Routing fix:** redirect all paths to `index.html`.

### Knowledge check

1. What prefix must Vite env variables have?
2. Which command creates the production files, and into what folder?
3. Why do React Router pages 404 on some hosts, and how do you fix it?

<details>
<summary>Show answers</summary>

1. `VITE_` (e.g. `VITE_API_URL`).
2. `npm run build`, into the `dist/` folder.
3. Because the host looks for a real file at that path, but it's a single-page app. Fix it by redirecting all paths to `index.html` (Netlify `_redirects`, or `vercel.json`).

</details>

---

**Next up → [Section 16: Final Review and Next Steps](../Section%2016%20-%20Final%20Review%20and%20Next%20Steps/README.md)**
We wrap up, review key ideas, and plan what to learn next. 🎓

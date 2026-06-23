# Section 2: Development Environment Setup

> **React 19 Course** — Section 2 of 21
> Level: Beginner

Before we write React, we need to set up our computer. In this section we install the tools, create a new React 19 project, run it, build it, and add the helpers that make development easier. Think of this as preparing your kitchen before you cook.

---

## Table of Contents

1. [Installing Node.js and npm](#1-installing-nodejs-and-npm)
2. [Creating a React 19 Project with Vite](#2-creating-a-react-19-project-with-vite)
3. [Project Folder Structure](#3-project-folder-structure)
4. [Running the Development Server](#4-running-the-development-server)
5. [Building the App for Production](#5-building-the-app-for-production)
6. [Recommended VS Code Extensions](#6-recommended-vs-code-extensions)
7. [Installing React Developer Tools](#7-installing-react-developer-tools)

---

## 1. Installing Node.js and npm

### The problem

React code uses modern JavaScript and many small helper packages. The browser alone cannot install or build these. We need a tool that runs JavaScript **outside** the browser and can download packages.

### The solution: Node.js

**Node.js** lets you run JavaScript on your computer. When you install Node.js, you also get **npm** (Node Package Manager) — the tool that downloads and manages packages.

**Steps:**

1. Go to [https://nodejs.org](https://nodejs.org).
2. Download the **LTS** version (LTS means "Long Term Support" — the stable choice).
3. Install it (click Next, Next, Finish).
4. Check that it works. Open your terminal and type:

```bash
node -v
npm -v
```

You should see version numbers, for example:

```
v22.11.0
10.9.0
```

> 💡 **Tip:** If you see "command not found", close and reopen your terminal. If it still fails, reinstall Node.js.

---

## 2. Creating a React 19 Project with Vite

### The problem

Writing React by hand needs a lot of setup: a build tool, a dev server, a way to turn JSX into normal JavaScript. Doing this by hand is slow and hard.

### The solution: Vite

**Vite** (say "veet") is a tool that creates and runs React projects for us. It is very fast and gives us everything ready to go.

Run this command in the folder where you keep your projects:

```bash
npm create vite@latest my-react-app
```

It will ask you some questions:

- **Select a framework:** choose `React`
- **Select a variant:** choose `JavaScript` (or `TypeScript` if you know it)

Then enter the project and install the packages:

```bash
cd my-react-app
npm install
```

`npm install` reads the list of needed packages and downloads them into a folder called `node_modules`.

> ⚠️ **Make sure you get React 19.** Open `package.json` and check that `react` and `react-dom` start with `19`. If not, run:
> ```bash
> npm install react@19 react-dom@19
> ```

---

## 3. Project Folder Structure

When Vite finishes, you get a folder that looks like this:

```
my-react-app/
├── node_modules/        ← all downloaded packages (do not touch)
├── public/              ← static files (images, icons)
├── src/                 ← YOUR code lives here
│   ├── App.jsx          ← the main component
│   ├── App.css          ← styles for App
│   ├── main.jsx         ← the entry point (start of the app)
│   └── index.css        ← global styles
├── index.html           ← the single HTML page
├── package.json         ← project info and scripts
└── vite.config.js       ← Vite settings
```

### The two most important files

**`index.html`** — There is only ONE HTML page. It has an empty box:

```html
<div id="root"></div>
```

React puts your whole app inside this box.

**`main.jsx`** — This is where React starts. It finds the `root` box and renders your `App` into it.

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Find the empty <div id="root"> and put <App /> inside it
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

**Line by line:**
- `createRoot(...)` — tells React which DOM box to control.
- `.render(<App />)` — puts your App component on the screen.
- `<StrictMode>` — a helper that warns you about mistakes during development. It does nothing in the final build.

---

## 4. Running the Development Server

Vite gives you scripts in `package.json`. You run them with `npm run`. The one you use most while coding is the **dev server**:

```bash
npm run dev
```

This starts a local website, usually at `http://localhost:5173`. Open it in your browser.

**Why the dev server is special:**
- **Hot reload** — when you save a file, the page updates instantly without a full refresh.
- **Fast** — Vite only rebuilds what changed.
- **Helpful errors** — mistakes show clearly in the browser and terminal.

Keep this running in a terminal the whole time you work. To stop it, press `Ctrl + C`.

---

## 5. Building the App for Production

The dev server is for *coding*. When you're ready to put the app online, you create a **production build** — small, fast, optimized files.

```bash
npm run build
```

This creates a **`dist/`** folder ready to deploy.

Before deploying, test that build on your computer:

```bash
npm run preview
```

This serves the `dist/` folder so you can confirm the production version works (we cover deployment fully in Section 20).

| Command | What it does | When to use |
| --- | --- | --- |
| `npm run dev` | Start dev server with hot reload | While coding |
| `npm run build` | Create optimized files in `dist/` | Before deploying |
| `npm run preview` | Test the built files locally | After building |

> 💡 **Rule of thumb:** if `npm run preview` looks right, the deployed site will too.

---

## 6. Recommended VS Code Extensions

**VS Code** is a free code editor from Microsoft. Download it at [https://code.visualstudio.com](https://code.visualstudio.com).

These extensions make React work easier:

| Extension | Why you want it |
| --- | --- |
| **ES7+ React/Redux/React-Native snippets** | Type `rafce` + Enter to create a whole component fast |
| **Prettier** | Formats your code neatly when you save |
| **ESLint** | Warns you about bugs and bad code as you type |
| **Auto Rename Tag** | When you rename `<div>`, it renames `</div>` too |
| **Material Icon Theme** | Pretty file icons so you find files faster |

> 💡 **Tip:** After installing Prettier, turn on "Format on Save" in VS Code settings. Your code will always look clean.

---

## 7. Installing React Developer Tools

### The problem

When something looks wrong, you need to *see inside* your components — what props they got, what state they hold. The normal browser inspector only shows HTML, not React's view of the world.

### The solution: React Developer Tools

**React DevTools** is a free browser extension that adds two tabs to your browser's developer tools: **⚛️ Components** and **⚛️ Profiler**.

**Install it:**
- **Chrome / Edge:** search "React Developer Tools" in the Chrome Web Store and click Add.
- **Firefox:** search for it in Firefox Add-ons.

**What you get:**
- **Components tab** — see your component tree, and click any component to inspect its **props**, **state**, and **hooks** live.
- **Profiler tab** — record interactions to find slow renders (useful in Section 16 on performance).

> 💡 **Tip:** When a value isn't what you expect, open the Components tab and click the component. Seeing its real props/state usually reveals the bug instantly.

---

## ✅ Section 2 Recap

You now have:

- **Node.js and npm** installed (run JavaScript and download packages).
- A new **React 19 project** made with **Vite**.
- An understanding of the **folder structure** (your code goes in `src/`).
- The three main commands: **`dev`** (code), **`build`** (deploy), **`preview`** (test build).
- Helpful **VS Code extensions** and the **React Developer Tools** browser extension.

### Knowledge check

1. What does `npm install` do?
2. Which command starts the dev server, and which creates the production build?
3. What can you inspect with the React DevTools Components tab?

<details>
<summary>Show answers</summary>

1. It downloads all packages the project needs into the `node_modules` folder.
2. `npm run dev` starts the dev server; `npm run build` creates the production build in `dist/`.
3. Each component's live **props**, **state**, and **hooks**, plus the whole component tree.

</details>

---

**Next up → [Section 3: React Fundamentals](../Section%2003%20-%20React%20Fundamentals/README.md)**
Now the fun begins — we write our first components and learn JSX, props, and events. 🚀

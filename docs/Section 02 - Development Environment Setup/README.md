# Section 2: Development Environment Setup

> **React 19 Crash Course** — Section 2 of 16
> Level: Beginner

Before we write React, we need to set up our computer. In this section we install the tools, create a new React 19 project, and run it. Think of this as preparing your kitchen before you cook.

---

## Table of Contents

1. [Installing Node.js and npm](#1-installing-nodejs-and-npm)
2. [Creating a React 19 Project with Vite](#2-creating-a-react-19-project-with-vite)
3. [Project Folder Structure](#3-project-folder-structure)
4. [Running and Building the App](#4-running-and-building-the-app)
5. [Recommended VS Code Extensions](#5-recommended-vs-code-extensions)

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

## 4. Running and Building the App

Vite gives you scripts in `package.json`. You run them with `npm run`.

### Start the dev server (while you work)

```bash
npm run dev
```

This starts a local website, usually at `http://localhost:5173`. Open it in your browser. When you change a file and save, the page updates instantly. This is called **hot reload**.

### Build for production (when you are done)

```bash
npm run build
```

This creates a `dist/` folder with small, fast files ready to put on the internet.

### Preview the build

```bash
npm run preview
```

This lets you test the production build on your computer before you deploy it.

| Command | What it does | When to use |
| --- | --- | --- |
| `npm run dev` | Start dev server with hot reload | While coding |
| `npm run build` | Create optimized files in `dist/` | Before deploying |
| `npm run preview` | Test the built files locally | After building |

---

## 5. Recommended VS Code Extensions

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

## ✅ Section 2 Recap

You now have:

- **Node.js and npm** installed (run JavaScript and download packages).
- A new **React 19 project** made with **Vite**.
- An understanding of the **folder structure** (your code goes in `src/`).
- The three main commands: **`dev`**, **`build`**, **`preview`**.
- Helpful **VS Code extensions**.

### Knowledge check

1. What does `npm install` do?
2. Which command starts the dev server with hot reload?
3. Where does your own code go?

<details>
<summary>Show answers</summary>

1. It downloads all packages the project needs into the `node_modules` folder.
2. `npm run dev`.
3. In the `src/` folder.

</details>

---

**Next up → [Section 3: React Fundamentals](../Section%2003%20-%20React%20Fundamentals/README.md)**
Now the fun begins — we write our first components and learn JSX, props, and events. 🚀

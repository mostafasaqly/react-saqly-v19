# Section 4: Styling React Apps

> **React 19 Course** — Section 4 of 21
> Level: Beginner

A working app is good, but a *good-looking* app is better. In this section we learn the different ways to add CSS to React, when to use each one, and how to keep styles organized as a project grows.

---

## Table of Contents

1. [Global CSS](#1-global-css)
2. [CSS Modules](#2-css-modules)
3. [Dynamic Classes](#3-dynamic-classes)
4. [Inline Styles](#4-inline-styles)
5. [Conditional Styling](#5-conditional-styling)
6. [Responsive Layout Basics](#6-responsive-layout-basics)
7. [Organizing Styles in React Projects](#7-organizing-styles-in-react-projects)

📁 **Code for this section:** see the [`examples/`](./examples) folder.

---

## 1. Global CSS

### The problem

Some styles should apply to the **whole app** — like the body background, default font, or a CSS reset.

### The solution: a global CSS file

Create one file (Vite already gives you `index.css`) and import it **once** in `main.jsx`. These styles apply everywhere.

**`index.css`**
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, sans-serif;
  background: #f5f5f5;
  color: #222;
}
```

**`main.jsx`**
```jsx
import "./index.css"; // imported once, applies to the whole app
```

> 💡 **Use global CSS** for resets, fonts, body styles, and CSS variables (theme colors).

---

## 2. CSS Modules

### The problem

In a big app, two different files might both use a class called `.button`. Their styles clash and break each other. This is the "global scope problem."

### The solution: CSS Modules

A **CSS Module** keeps styles **local** to one component. Name the file `Something.module.css`. React makes the class names unique behind the scenes, so they never clash.

**`Button.module.css`**
```css
.button {
  background: royalblue;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
}
```

**`Button.jsx`**
```jsx
import styles from "./Button.module.css";

function Button() {
  // styles.button becomes a unique class like "Button_button_x7f2a"
  return <button className={styles.button}>Save</button>;
}
```

> 💡 **Use CSS Modules** when styles belong to one specific component. This is the safest default for component styles.

👉 See [`examples/Button.module.css`](./examples/Button.module.css) and [`examples/Button.jsx`](./examples/Button.jsx)

---

## 3. Dynamic Classes

### The problem

You want a class to change based on data — for example, an alert that is red for errors and green for success.

### The solution: build the class string in JavaScript

Because `className` is just a string, you can decide it with JavaScript.

```jsx
function Alert({ type }) {
  // type is "success" or "error"
  const className = `alert alert-${type}`;
  return <div className={className}>Saved!</div>;
}
// Result: class="alert alert-success"
```

For many conditions, a tiny library called **clsx** is popular, but you don't need it to start.

👉 See [`examples/Alert.jsx`](./examples/Alert.jsx)

---

## 4. Inline Styles

### The problem

Sometimes you need a quick, one-off style, or a style that depends on a live value (like a progress bar width from state).

### The solution: the `style` prop

In React, `style` takes a **JavaScript object**, not a string. Properties are camelCase (`backgroundColor`, not `background-color`).

```jsx
function ProgressBar({ percent }) {
  return (
    <div style={{ background: "#ddd", borderRadius: 4 }}>
      <div style={{ width: `${percent}%`, background: "green", height: 10 }} />
    </div>
  );
}
```

Notice the **double braces** `{{ }}`: the outer `{ }` means "JavaScript here", the inner `{ }` is the object.

> ⚠️ **Don't overuse inline styles.** They're good for dynamic values but harder to reuse than classes.

👉 See [`examples/ProgressBar.jsx`](./examples/ProgressBar.jsx)

---

## 5. Conditional Styling

### The problem

You want the style to **change based on state** — a button that looks "active" when selected, a row highlighted when a task is done, a menu item that shows it's the current page.

### The solution: pick the class or style with a condition

**Toggle a class:**
```jsx
<button className={isActive ? "btn active" : "btn"}>Menu</button>
```

**Toggle one inline value:**
```jsx
<li style={{ textDecoration: task.done ? "line-through" : "none" }}>
  {task.text}
</li>
```

**Combine fixed + conditional classes (clean pattern):**
```jsx
const classes = ["card", isSelected && "card-selected"]
  .filter(Boolean)   // drop the false value
  .join(" ");        // "card card-selected" OR just "card"

<div className={classes}>...</div>
```

> 🧠 **Mental model:** conditional styling is just conditional rendering (Section 3) applied to `className` or `style`.

👉 See [`examples/ToggleBox.jsx`](./examples/ToggleBox.jsx)

---

## 6. Responsive Layout Basics

Your app must look good on a phone, tablet, and large screen. These are normal CSS tools — React doesn't change them.

**Flexbox** — arrange items in a row or column:
```css
.row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap; /* items move to the next line on small screens */
}
```

**Grid** — arrange items in an adaptive grid:
```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}
```

**Media queries** — change styles at certain screen widths:
```css
.sidebar { width: 250px; }

@media (max-width: 600px) {
  .sidebar { width: 100%; } /* full width on small screens */
}
```

> 💡 **Tip:** Design for mobile first (small screen), then add media queries for bigger screens.

---

## 7. Organizing Styles in React Projects

As a project grows, scattered CSS becomes a mess. Here's a clean approach that scales.

### A simple, reliable structure

```
src/
├── index.css                 ← global: reset, fonts, CSS variables
├── components/
│   ├── Button/
│   │   ├── Button.jsx
│   │   └── Button.module.css ← styles next to the component
│   └── Card/
│       ├── Card.jsx
│       └── Card.module.css
```

### Practical rules

1. **Global CSS** holds resets, fonts, and **CSS variables** (theme colors):
   ```css
   :root {
     --primary: royalblue;
     --danger: #b00020;
     --radius: 8px;
   }
   ```
   Then use them anywhere: `color: var(--primary);`
2. **Component styles** live in a **CSS Module** right next to the component.
3. **One source of truth for theme values** — change a color once in `:root`, it updates everywhere.
4. **Keep inline styles for dynamic values only** (a width from state), not for the whole look.

> 🧠 **Big picture:** global file = the theme; CSS Modules = each component's look; inline = live, data-driven tweaks.

---

## ✅ Section 4 Recap

- **Global CSS** — app-wide styles (reset, fonts, variables). Imported once.
- **CSS Modules** (`*.module.css`) — local styles for one component. Safe default.
- **Dynamic classes** — build the `className` string with JavaScript.
- **Inline styles** — the `style` prop takes a JS object (camelCase). Dynamic values.
- **Conditional styling** — switch class/style based on state.
- **Responsive** — Flexbox, Grid, and media queries (normal CSS).
- **Organize:** global theme + CSS variables, component styles in modules next to components.

### Knowledge check

1. What file name makes a CSS Module?
2. How do you change a style based on whether `isActive` is true?
3. Where should theme colors (used everywhere) live?

<details>
<summary>Show answers</summary>

1. A file ending in `.module.css`, for example `Card.module.css`.
2. Pick the class or value with a condition, e.g. `className={isActive ? "btn active" : "btn"}`.
3. In global CSS as **CSS variables** under `:root`, so you change them in one place.

</details>

---

**Next up → [Section 5: State and Interactivity](../Section%2005%20-%20State%20and%20Interactivity/README.md)**
Time to make our apps remember things and respond to the user. 🔥

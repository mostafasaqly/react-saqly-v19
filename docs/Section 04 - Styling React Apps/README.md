# Section 4: Styling React Apps

> **React 19 Crash Course** — Section 4 of 16
> Level: Beginner

A working app is good, but a *good-looking* app is better. In this section we learn the different ways to add CSS to React, and when to use each one.

---

## Table of Contents

1. [CSS Modules](#1-css-modules)
2. [Global CSS](#2-global-css)
3. [Dynamic Classes](#3-dynamic-classes)
4. [Inline Styles](#4-inline-styles)
5. [Responsive Layout Basics](#5-responsive-layout-basics)

📁 **Code for this section:** see the [`examples/`](./examples) folder.

---

## 1. CSS Modules

### The problem

In a big app, two different files might both use a class called `.button`. Their styles clash and break each other. This is called the "global scope problem."

### The solution: CSS Modules

A **CSS Module** keeps styles **local** to one component. You name the file `Something.module.css`. React makes the class names unique behind the scenes, so they never clash.

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

## 2. Global CSS

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

## 3. Dynamic Classes

### The problem

You want a class to change based on state — for example, a button that looks "active" when selected, or an alert that is red for errors and green for success.

### The solution: build the class string in JavaScript

Because `className` is just a string, you can decide it with JavaScript.

```jsx
// Simple: pick one of two classes
<button className={isActive ? "btn active" : "btn"}>
  Menu
</button>
```

```jsx
// Cleaner: build the string with a small helper
function Alert({ type }) {
  // type is "success" or "error"
  const className = `alert alert-${type}`;
  return <div className={className}>Saved!</div>;
}
// Result: class="alert alert-success"
```

For many conditions, a library called **clsx** is popular, but you don't need it to start.

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
      <div
        style={{
          width: `${percent}%`,   // value comes from a prop!
          background: "green",
          height: 10,
        }}
      />
    </div>
  );
}
```

Notice the **double braces** `{{ }}`: the outer `{ }` means "JavaScript here", the inner `{ }` is the object.

> ⚠️ **Don't overuse inline styles.** They are good for dynamic values but harder to reuse than CSS classes. Prefer CSS Modules for most styling.

👉 See [`examples/ProgressBar.jsx`](./examples/ProgressBar.jsx)

---

## 5. Responsive Layout Basics

### The problem

Your app must look good on a phone, tablet, and large screen.

### The solution: Flexbox, Grid, and media queries

These are normal CSS tools — React does not change them.

**Flexbox** — arrange items in a row or column:
```css
.row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap; /* items move to the next line on small screens */
}
```

**Grid** — arrange items in a grid that adapts:
```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}
```
This says: "make as many 200px-wide columns as fit; stretch them to fill."

**Media queries** — change styles at certain screen widths:
```css
.sidebar {
  width: 250px;
}

@media (max-width: 600px) {
  .sidebar {
    width: 100%; /* on small screens, full width */
  }
}
```

> 💡 **Tip:** Design for mobile first (small screen), then add media queries for bigger screens.

---

## ✅ Section 4 Recap

- **CSS Modules** (`*.module.css`) — local styles for one component. Safe default.
- **Global CSS** — app-wide styles (reset, fonts, body). Imported once.
- **Dynamic classes** — build the `className` string with JavaScript.
- **Inline styles** — the `style` prop takes a JS object (camelCase). Good for dynamic values.
- **Responsive** — use Flexbox, Grid, and media queries (normal CSS).

### Knowledge check

1. What file name makes a CSS Module?
2. Why does React use `className` instead of `class`?
3. How is the inline `style` value different from HTML's `style`?

<details>
<summary>Show answers</summary>

1. A file ending in `.module.css`, for example `Card.module.css`.
2. Because `class` is a reserved word in JavaScript.
3. In React, `style` is a JavaScript object with camelCase keys, e.g. `style={{ backgroundColor: "red" }}` — not a string.

</details>

---

**Next up → [Section 5: State and Interactivity](../Section%2005%20-%20State%20and%20Interactivity/README.md)**
Time to make our apps remember things and respond to the user. 🔥

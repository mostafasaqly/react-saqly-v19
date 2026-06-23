# Section 3: React Fundamentals

> **React 19 Crash Course** — Section 3 of 16
> Level: Beginner

This is the heart of React. Once you understand components, JSX, props, and events, everything else is just adding more on top. Take your time here.

---

## Table of Contents

1. [What is React?](#1-what-is-react)
2. [Components and JSX](#2-components-and-jsx)
3. [Rendering Elements](#3-rendering-elements)
4. [Props](#4-props)
5. [Children Props](#5-children-props)
6. [Conditional Rendering](#6-conditional-rendering)
7. [Rendering Lists](#7-rendering-lists)
8. [Handling Events](#8-handling-events)

📁 **Code for this section:** see the [`examples/`](./examples) folder.

---

## 1. What is React?

### The problem

Imagine a web page that changes a lot — a counter, a chat, a shopping cart. With plain JavaScript, you must find each element and update it by hand:

```js
// Plain JavaScript — manual and messy
const count = document.getElementById("count");
count.textContent = "5"; // do this every time something changes
```

As the app grows, this becomes a tangle. One change can break ten other things.

### The solution

**React** lets you describe what the screen should look like for a given set of data. When the data changes, React updates the screen for you — fast and correctly. You stop thinking about *"how to change the DOM"* and start thinking about *"what the UI should be."*

The building block is the **component**: a small, reusable piece of UI written as a JavaScript function.

---

## 2. Components and JSX

A **component** is a function that returns UI. Its name **must start with a capital letter**.

```jsx
function Welcome() {
  return <h1>Hello, React!</h1>;
}
```

That `<h1>...</h1>` inside JavaScript is called **JSX**. JSX looks like HTML but it is really JavaScript in disguise. Vite turns it into normal code for the browser.

### JSX rules (important!)

1. **Return one parent element.** Wrap multiple elements in one box, or use an empty `<> </>` (a "Fragment").

```jsx
// ❌ Wrong — two elements at the top
return (
  <h1>Title</h1>
  <p>Text</p>
);

// ✅ Right — wrapped in a Fragment
return (
  <>
    <h1>Title</h1>
    <p>Text</p>
  </>
);
```

2. **Use `className`, not `class`** (because `class` is a reserved word in JavaScript).

```jsx
<div className="card">...</div>
```

3. **Put JavaScript inside `{ }`.**

```jsx
const name = "Sara";
return <h1>Hello, {name}!</h1>;  // shows: Hello, Sara!
```

4. **Close every tag.** Even `<img />` and `<br />`.

👉 See [`examples/01-Welcome.jsx`](./examples/01-Welcome.jsx)

---

## 3. Rendering Elements

"Rendering" just means **showing on the screen**. You render a component by writing it like a tag:

```jsx
function App() {
  return (
    <div>
      <Welcome />   {/* using the component */}
      <Welcome />   {/* you can reuse it as many times as you want */}
    </div>
  );
}
```

This is the superpower of components: **write once, reuse everywhere.**

---

## 4. Props

### The problem

Our `Welcome` component always says the same thing. We want it to greet **different** people without writing a new component each time.

### The solution: props

**Props** (short for "properties") are values you pass into a component, like arguments to a function. The component reads them and uses them.

```jsx
// Define a component that accepts props
function Greeting({ name, age }) {
  return <p>{name} is {age} years old.</p>;
}

// Pass props when you use it
<Greeting name="Sara" age={25} />
<Greeting name="Omar" age={30} />
```

**Key points:**
- Text props use quotes: `name="Sara"`.
- Number/JavaScript props use braces: `age={25}`.
- `{ name, age }` is **destructuring** — it pulls the values out of the props object.
- **Props are read-only.** A component must never change its own props.

👉 See [`examples/02-Greeting.jsx`](./examples/02-Greeting.jsx)

---

## 5. Children Props

### The problem

Sometimes you want a component to **wrap** other content — like a card or a box — but you don't know ahead of time what goes inside.

### The solution: `children`

Whatever you put **between** a component's opening and closing tags arrives as a special prop called `children`.

```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}

// Use it like a wrapper
<Card>
  <h2>Title</h2>
  <p>Some text inside the card.</p>
</Card>
```

The `<h2>` and `<p>` become the `children` of `Card`. This is how you build flexible, reusable layout pieces.

👉 See [`examples/03-Card.jsx`](./examples/03-Card.jsx)

---

## 6. Conditional Rendering

### The problem

You want to show different UI depending on a condition — for example, "Welcome back" if the user is logged in, or "Please log in" if not.

### The solution

Because JSX is JavaScript, you can use normal JavaScript logic.

**Way 1 — the `&&` operator** (show something *or nothing*):

```jsx
{isLoggedIn && <p>Welcome back!</p>}
```
If `isLoggedIn` is true, the `<p>` shows. If false, nothing shows.

**Way 2 — the ternary `? :`** (show one thing *or another*):

```jsx
{isLoggedIn ? <p>Welcome back!</p> : <p>Please log in.</p>}
```

**Way 3 — an `if` before the return** (for bigger choices):

```jsx
function Status({ isLoggedIn }) {
  if (isLoggedIn) {
    return <p>Welcome back!</p>;
  }
  return <p>Please log in.</p>;
}
```

👉 See [`examples/04-ConditionalGreeting.jsx`](./examples/04-ConditionalGreeting.jsx)

---

## 7. Rendering Lists

### The problem

You have an array of data — say, a list of fruits — and you want to show each one on the screen.

### The solution: `.map()`

Use the JavaScript `.map()` method to turn each item into a JSX element.

```jsx
const fruits = ["Apple", "Banana", "Cherry"];

function FruitList() {
  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  );
}
```

### The `key` rule

Every item in a list **needs a unique `key`**. React uses the key to know which items changed, were added, or removed. Use a stable id, not the array index when possible.

```jsx
{users.map((user) => (
  <li key={user.id}>{user.name}</li>  // id is unique and stable
))}
```

> ⚠️ **Forgetting `key`** gives a warning and can cause weird bugs. Always add it.

👉 See [`examples/05-FruitList.jsx`](./examples/05-FruitList.jsx)

---

## 8. Handling Events

### The problem

You want the app to react when the user **clicks**, **types**, or **submits**.

### The solution: event handlers

You pass a function to events like `onClick`. React calls your function when the event happens.

```jsx
function Button() {
  function handleClick() {
    alert("You clicked me!");
  }

  return <button onClick={handleClick}>Click me</button>;
}
```

**Key points:**
- Event names are **camelCase**: `onClick`, `onChange`, `onSubmit`.
- Pass the function itself: `onClick={handleClick}` — **no parentheses**.
- If you write `onClick={handleClick()}` (with parentheses), it runs immediately. That is a common bug.
- To pass arguments, wrap it in an arrow function:

```jsx
<button onClick={() => greet("Sara")}>Greet Sara</button>
```

👉 See [`examples/06-ClickButton.jsx`](./examples/06-ClickButton.jsx)

---

## ✅ Section 3 Recap

- **Components** are functions that return JSX. Names start with a capital letter.
- **JSX** is HTML-like syntax; use `{ }` for JavaScript, `className` for classes.
- **Props** pass data into components (read-only).
- **`children`** lets a component wrap other content.
- **Conditional rendering** with `&&`, `? :`, or `if`.
- **Lists** with `.map()` — always add a unique **`key`**.
- **Events** like `onClick` take a function (no parentheses).

### Knowledge check

1. Why must a component name start with a capital letter?
2. What is the difference between `name="Sara"` and `age={25}`?
3. Why does every list item need a `key`?

<details>
<summary>Show answers</summary>

1. So React can tell your component apart from normal HTML tags (like `div`). Lowercase names are treated as HTML elements.
2. `name="Sara"` passes a string; `age={25}` passes a JavaScript value (here, a number). Use `{ }` for any non-string value.
3. So React can track each item efficiently and update only what changed.

</details>

---

**Next up → [Section 4: Styling React Apps](../Section%2004%20-%20Styling%20React%20Apps/README.md)**
Now that we can build UI, let's make it look good. 🎨

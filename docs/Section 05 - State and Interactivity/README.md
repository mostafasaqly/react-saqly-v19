# Section 5: State and Interactivity

> **React 19 Crash Course** — Section 5 of 16
> Level: Beginner → Intermediate

This is where apps come alive. **State** is how a component remembers things and updates the screen when those things change. Master this section and you can build almost anything.

---

## Table of Contents

1. [Understanding State](#1-understanding-state)
2. [`useState` Hook](#2-usestate-hook)
3. [Updating Objects in State](#3-updating-objects-in-state)
4. [Updating Arrays in State](#4-updating-arrays-in-state)
5. [Derived State](#5-derived-state)
6. [Controlled Inputs](#6-controlled-inputs)
7. [Lifting State Up](#7-lifting-state-up)

📁 **Code for this section:** see the [`examples/`](./examples) folder.

---

## 1. Understanding State

### The problem

A normal variable does **not** update the screen.

```jsx
function Counter() {
  let count = 0; // a plain variable

  function add() {
    count = count + 1;   // the value changes...
    console.log(count);  // ...but the screen does NOT update!
  }

  return <button onClick={add}>Count: {count}</button>;
}
```

The number in `console.log` goes up, but the button always shows `0`. Why? Because React only re-draws the screen when **state** changes — and `count` here is just a normal variable.

### The solution: state

**State** is special memory that React watches. When you change state, React **re-renders** the component (runs the function again) and updates the screen.

> 🧠 **Mental model:** State = data + a promise that the screen stays in sync with that data.

---

## 2. `useState` Hook

`useState` is a **hook** — a special function from React. It gives you a state value and a function to change it.

```jsx
import { useState } from "react";

function Counter() {
  // [current value, function to change it] = useState(starting value)
  const [count, setCount] = useState(0);

  function add() {
    setCount(count + 1); // change state → React re-renders → screen updates
  }

  return <button onClick={add}>Count: {count}</button>;
}
```

**Line by line:**
- `useState(0)` — starting value is `0`.
- `count` — the current value to show.
- `setCount` — the **only** correct way to change `count`.
- Calling `setCount(...)` tells React to re-render with the new value.

### Rule: never change state directly

```jsx
count = count + 1;       // ❌ wrong — React does not notice
setCount(count + 1);     // ✅ right — React re-renders
```

### Updating based on the previous value

If your new value depends on the old value, pass a function. This is safer:

```jsx
setCount((prev) => prev + 1);
```

This guarantees you use the latest value, even if many updates happen quickly.

👉 See [`examples/Counter.jsx`](./examples/Counter.jsx)

---

## 3. Updating Objects in State

### The problem

When state is an object, you cannot just change one field directly:

```jsx
const [user, setUser] = useState({ name: "Sara", age: 25 });

user.age = 26;          // ❌ wrong — React does not re-render
setUser(user);          // ❌ also wrong — same object, React ignores it
```

React compares by **reference**. If it is the same object, React thinks nothing changed.

### The solution: make a NEW object with the spread `...`

Copy the old object, then change the field you want:

```jsx
setUser({ ...user, age: 26 });
// { ...user } copies all old fields, then age: 26 overwrites age.
```

This makes a brand-new object, so React notices and re-renders.

👉 See [`examples/UserForm.jsx`](./examples/UserForm.jsx)

---

## 4. Updating Arrays in State

Same rule: **never change the array directly.** Always make a new array.

```jsx
const [items, setItems] = useState(["Apple", "Banana"]);
```

**Add an item** (spread + new value):
```jsx
setItems([...items, "Cherry"]);
```

**Remove an item** (filter keeps everything except the match):
```jsx
setItems(items.filter((item) => item !== "Banana"));
```

**Update an item** (map returns a changed copy):
```jsx
setItems(items.map((item) => (item === "Apple" ? "Avocado" : item)));
```

> 🧠 **Remember:** `push`, `pop`, `splice` change the array in place — **don't use them on state.** Use `[...]`, `filter`, and `map`, which return new arrays.

👉 See [`examples/ShoppingList.jsx`](./examples/ShoppingList.jsx)

---

## 5. Derived State

### The problem

You have a list of tasks and want to show "3 of 5 done". You could store the count in its own state — but then you must update it every time the list changes. That is extra work and a source of bugs.

### The solution: calculate it during render

If a value can be **calculated from existing state**, don't store it. Just compute it:

```jsx
const [tasks, setTasks] = useState([...]);

// Derived values — calculated every render, always correct.
const doneCount = tasks.filter((t) => t.done).length;
const total = tasks.length;

return <p>{doneCount} of {total} done</p>;
```

> 💡 **Rule of thumb:** If you *can* calculate it from other state, *don't* store it in state. This avoids bugs where two pieces of state disagree.

---

## 6. Controlled Inputs

### The problem

You want React to know what the user typed into an input, in real time.

### The solution: connect the input to state

A **controlled input** gets its value from state and updates state on every keystroke. React is the "single source of truth."

```jsx
function NameInput() {
  const [name, setName] = useState("");

  return (
    <div>
      <input
        value={name}                              // value comes from state
        onChange={(e) => setName(e.target.value)} // typing updates state
      />
      <p>Hello, {name}</p>
    </div>
  );
}
```

**The flow:** user types → `onChange` fires → `setName` updates state → React re-renders → input shows the new value. This loop is the foundation of all forms.

👉 See [`examples/ControlledInput.jsx`](./examples/ControlledInput.jsx)

---

## 7. Lifting State Up

### The problem

Two sibling components need to share the same data. But state lives inside one component — siblings cannot see each other's state.

### The solution: move the state UP to their parent

Put the shared state in the **closest common parent**, then pass it down as props. The parent owns the data; children receive it and report changes back up.

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* Child A shows the count */}
      <Display count={count} />
      {/* Child B changes the count */}
      <Controls onAdd={() => setCount(count + 1)} />
    </>
  );
}

function Display({ count }) {
  return <p>Count: {count}</p>;
}

function Controls({ onAdd }) {
  return <button onClick={onAdd}>Add</button>;
}
```

**The pattern:**
- Data flows **down** through props (`count`).
- Events flow **up** through callback props (`onAdd`).

This is called **"one-way data flow"** and it makes apps predictable.

👉 See [`examples/LiftingState.jsx`](./examples/LiftingState.jsx)

---

## ✅ Section 5 Recap

- **State** is memory React watches; changing it re-renders the component.
- **`useState`** gives `[value, setValue]`. Never change state directly.
- **Objects:** copy with `{ ...obj, field: newValue }`.
- **Arrays:** use `[...arr, x]`, `filter`, `map` — never `push`/`splice`.
- **Derived state:** calculate values instead of storing them.
- **Controlled inputs:** `value` from state, `onChange` updates state.
- **Lifting state up:** move shared state to the common parent; data down, events up.

### Knowledge check

1. Why doesn't a normal variable update the screen?
2. How do you correctly update one field of an object in state?
3. What does "lifting state up" mean?

<details>
<summary>Show answers</summary>

1. React only re-renders when **state** changes. A normal variable changes in memory but React never notices, so the screen stays the same.
2. Make a new object: `setUser({ ...user, age: 26 })`.
3. Moving shared state into the closest common parent so two or more children can use it. Data passes down via props; events pass up via callbacks.

</details>

---

**Next up → [Section 6: Effects and Lifecycle](../Section%2006%20-%20Effects%20and%20Lifecycle/README.md)**
Next we learn how to talk to the outside world: timers, and fetching data. ⏱️

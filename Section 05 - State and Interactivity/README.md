# Section 5: State and Interactivity

> **React 19 Course** — Section 5 of 21
> Level: Beginner → Intermediate

This is where apps come alive. **State** is how a component remembers things and updates the screen when those things change. Master this section and you can build almost anything.

---

## Table of Contents

1. [Understanding State](#1-understanding-state)
2. [`useState` Hook](#2-usestate-hook)
3. [Updating Primitive State](#3-updating-primitive-state)
4. [Updating Objects in State](#4-updating-objects-in-state)
5. [Updating Arrays in State](#5-updating-arrays-in-state)
6. [Derived State](#6-derived-state)
7. [Controlled Inputs](#7-controlled-inputs)
8. [Lifting State Up](#8-lifting-state-up)
9. [Sharing State Between Components](#9-sharing-state-between-components)
10. [Common State Mistakes](#10-common-state-mistakes)

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

## 3. Updating Primitive State

A **primitive** is a simple single value: a number, a string, or a boolean. These are the easiest to update — you just pass the new value to the setter.

```jsx
const [count, setCount] = useState(0);       // number
const [name, setName] = useState("");        // string
const [isOpen, setIsOpen] = useState(false); // boolean
```

**Update a number:**
```jsx
setCount(count + 1);
setCount((prev) => prev + 1); // safer when based on the old value
```

**Update a string:**
```jsx
setName("Sara");
```

**Toggle a boolean** (a very common pattern):
```jsx
setIsOpen(!isOpen);             // flip true/false
setIsOpen((prev) => !prev);     // safer form
```

> 🧠 **Why primitives are simple:** React compares the old and new value directly. A different number/string/boolean is always "changed", so React re-renders. (Objects and arrays are trickier — that's the next two lessons.)

👉 See [`examples/Toggle.jsx`](./examples/Toggle.jsx)

---

## 4. Updating Objects in State

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

## 5. Updating Arrays in State

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

## 6. Derived State

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

## 7. Controlled Inputs

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

## 8. Lifting State Up

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

## 9. Sharing State Between Components

"Lifting state up" is the *technique*. **Sharing state** is the *goal*: two or more components reading and changing the same data.

### The full picture

Once state lives in a parent, you share it by passing **two kinds of props**:

1. **The value** (so a child can *read* it).
2. **A change function** (so a child can *update* it).

```jsx
function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      {/* SearchBar updates the shared state */}
      <SearchBar value={search} onChange={setSearch} />
      {/* Results reads the same shared state */}
      <Results query={search} />
    </>
  );
}
```

Now both children stay perfectly in sync, because they share **one** source of truth.

### How far up should state go?

Put state in the **lowest** component that still sits above everyone who needs it.

- Only one component needs it → keep it **local** there.
- A few nearby components need it → lift to their **common parent**.
- Components all over the app need it → use **Context** (Section 10) or **Redux** (Section 14).

> 🧠 **Rule:** keep state as low as possible, but high enough that everyone who needs it can reach it.

👉 See [`examples/SharedSearch.jsx`](./examples/SharedSearch.jsx)

---

## 10. Common State Mistakes

These trip up almost every beginner. Learn them now and save hours of debugging.

**Mistake 1 — Changing state directly.**
```jsx
count = count + 1;          // ❌ React never notices
user.age = 26;              // ❌ mutates the object in place
setCount(count + 1);        // ✅
setUser({ ...user, age: 26 }); // ✅
```

**Mistake 2 — Using `push`/`splice`/`sort` on array state.**
These change the array *in place*. React sees the same array and skips the re-render.
```jsx
items.push(x);              // ❌
setItems([...items, x]);    // ✅ new array
```

**Mistake 3 — Storing what you can calculate.**
If a value comes from other state, don't store it — derive it (lesson 6).
```jsx
const [total, setTotal] = useState(0); // ❌ extra state to keep in sync
const total = items.length;            // ✅ derived
```

**Mistake 4 — Expecting state to change instantly.**
`setState` schedules an update; the variable doesn't change on the next line.
```jsx
setCount(count + 1);
console.log(count); // ❌ still the OLD value this render
```

**Mistake 5 — Depending on stale state in quick updates.**
When the new value depends on the old, use the function form.
```jsx
setCount(count + 1);
setCount(count + 1);            // ❌ both use the same old count → +1, not +2
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);  // ✅ correctly +2
```

> ⚠️ **The golden rule of state:** never mutate. Always create a *new* value (`{ ... }`, `[ ... ]`) and pass it to the setter.

👉 See [`examples/StateMistakes.jsx`](./examples/StateMistakes.jsx)

---

## ✅ Section 5 Recap

- **State** is memory React watches; changing it re-renders the component.
- **`useState`** gives `[value, setValue]`. Never change state directly.
- **Primitives** (number/string/boolean) update by passing the new value; toggle booleans with `!`.
- **Objects:** copy with `{ ...obj, field: newValue }`.
- **Arrays:** use `[...arr, x]`, `filter`, `map` — never `push`/`splice`.
- **Derived state:** calculate values instead of storing them.
- **Controlled inputs:** `value` from state, `onChange` updates state.
- **Lifting / sharing state:** move shared state to the common parent; data down, events up.
- **Avoid the common mistakes:** never mutate, don't store derived values, remember updates aren't instant.

### Knowledge check

1. Why doesn't a normal variable update the screen?
2. How do you correctly update one field of an object in state?
3. Why does calling `setCount(count + 1)` twice only add 1, and how do you fix it?

<details>
<summary>Show answers</summary>

1. React only re-renders when **state** changes. A normal variable changes in memory but React never notices, so the screen stays the same.
2. Make a new object: `setUser({ ...user, age: 26 })`.
3. Both calls read the same old `count` from this render. Use the function form `setCount(prev => prev + 1)` so each update builds on the latest value.

</details>

---

**Next up → [Section 6: Effects and Lifecycle](../Section%2006%20-%20Effects%20and%20Lifecycle/README.md)**
Next we learn how to talk to the outside world: timers, and fetching data. ⏱️

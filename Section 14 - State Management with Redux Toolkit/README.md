# Section 14: State Management with Redux Toolkit

> **React 19 Course** — Section 14 of 21
> Level: Intermediate → Advanced

Context (Section 10) is great for simple shared data. But for **big apps** with lots of state changing in many places — a shopping cart, favorites, user data — we want a dedicated tool. **Redux Toolkit** is the modern, official way to do Redux, and it's much simpler than old Redux.

---

## Table of Contents

1. [Why Redux?](#1-why-redux)
2. [Context API vs Redux](#2-context-api-vs-redux)
3. [Installing Redux Toolkit and React Redux](#3-installing-redux-toolkit-and-react-redux)
4. [Creating the Redux Store](#4-creating-the-redux-store)
5. [Providing the Store to React](#5-providing-the-store-to-react)
6. [Creating a Slice with createSlice](#6-creating-a-slice-with-createslice)
7. [Initial State](#7-initial-state)
8. [Reducers and Actions](#8-reducers-and-actions)
9. [Reading State with useSelector](#9-reading-state-with-useselector)
10. [Updating State with useDispatch](#10-updating-state-with-usedispatch)
11. [Multiple Slices](#11-multiple-slices)
12. [Combining Reducers](#12-combining-reducers)
13. [Redux DevTools](#13-redux-devtools)
14. [Cart Example with Redux](#14-cart-example-with-redux)
15. [Favorites Example with Redux](#15-favorites-example-with-redux)

📁 **Code for this section:** see the [`examples/`](./examples) folder.

---

## 1. Why Redux?

### The problem

As an app grows, the same state is needed and changed in many far-apart components — a cart icon in the header, a "buy" button on a product, a totals page. Passing props or even Context gets messy and can be slow when state changes a lot.

### The solution: a single store

Redux keeps **all global state in one place** (the **store**). Any component can read from it or send an update to it, following clear rules:

```
Component → dispatch(action) → reducer updates store → components re-read
```

This makes big apps **predictable**: state changes only through actions, and you can trace every change.

> 💡 **Redux Toolkit (RTK)** is the official, modern Redux. It removes the old boilerplate. Always use RTK — never "plain" Redux.

---

## 2. Context API vs Redux

Both share state app-wide. When to use which?

| | Context API | Redux Toolkit |
| --- | --- | --- |
| Setup | Tiny, built-in | A library to install |
| Best for | Theme, user, language (set once, read often) | Lots of state that changes often |
| Updating | You wire it yourself | Structured actions + reducers |
| DevTools | None | Powerful time-travel DevTools |
| Performance | Re-renders all readers | Fine-grained with selectors |

> 🧠 **Rule:** Context for simple, slow-changing data. Redux for complex, frequently-changing global state (carts, favorites, big data lists).

---

## 3. Installing Redux Toolkit and React Redux

You need two packages:

```bash
npm install @reduxjs/toolkit react-redux
```

- **`@reduxjs/toolkit`** — the store and slice tools.
- **`react-redux`** — connects Redux to React (`useSelector`, `useDispatch`, `<Provider>`).

---

## 4. Creating the Redux Store

The **store** holds all state. Create it with `configureStore`.

```jsx
// store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer, // state.counter is managed by this slice
  },
});
```

The `reducer` object maps each piece of state to the slice that controls it.

👉 See [`examples/store.js`](./examples/store.js)

---

## 5. Providing the Store to React

Wrap your app in `<Provider>` so every component can reach the store. Do this in `main.jsx`.

```jsx
import { Provider } from "react-redux";
import { store } from "./store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

Now the whole app is connected to Redux.

---

## 6. Creating a Slice with createSlice

A **slice** is one piece of state plus the functions that change it. `createSlice` generates the reducer and actions for you.

```jsx
// counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1; // looks like mutation, but it's safe here (see below)
    },
    decrement: (state) => {
      state.value -= 1;
    },
    addBy: (state, action) => {
      state.value += action.payload; // payload = the data you pass
    },
  },
});

export const { increment, decrement, addBy } = counterSlice.actions;
export default counterSlice.reducer;
```

> 🆕 **"Wait, you mutated state?"** RTK uses a tool called Immer under the hood. Inside a slice reducer you can write `state.value += 1` and Immer turns it into a safe, immutable update. Only do this **inside** slices.

👉 See [`examples/counterSlice.js`](./examples/counterSlice.js)

---

## 7. Initial State

`initialState` is the starting value for this slice. It can be any shape — a number, object, or array.

```jsx
initialState: { value: 0 }                 // a counter
initialState: { items: [], total: 0 }      // a cart
initialState: []                           // a list of favorites
```

When the app starts, the store uses these values.

---

## 8. Reducers and Actions

Two words you'll hear constantly:

- An **action** is a message describing *what happened*: `{ type: "counter/increment" }`. RTK creates these for you — you just call `increment()`.
- A **reducer** is the function that *updates state* in response to an action.

`createSlice` generates both. You call the action; the matching reducer runs.

```jsx
dispatch(increment());      // action with no data
dispatch(addBy(5));         // action with payload 5
```

`action.payload` is whatever you pass to the action — your data.

---

## 9. Reading State with useSelector

`useSelector` reads a piece of state from the store. Pass a function that picks what you want.

```jsx
import { useSelector } from "react-redux";

function CounterDisplay() {
  const value = useSelector((state) => state.counter.value);
  return <p>Count: {value}</p>;
}
```

The component re-renders **only** when the value it selected changes — efficient by default.

---

## 10. Updating State with useDispatch

`useDispatch` gives you the `dispatch` function. Call it with an action to update state.

```jsx
import { useDispatch } from "react-redux";
import { increment, addBy } from "./counterSlice";

function CounterButtons() {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(addBy(5))}>+5</button>
    </div>
  );
}
```

**The full loop:** `dispatch(action)` → reducer updates the store → `useSelector` components re-render.

👉 See [`examples/Counter.jsx`](./examples/Counter.jsx)

---

## 11. Multiple Slices

Real apps have several slices — one per feature. Each is independent.

```jsx
// cartSlice.js, favoritesSlice.js, userSlice.js ...
```

Each slice manages its own part of the state (`state.cart`, `state.favorites`, `state.user`). Keep them in separate files for clarity.

---

## 12. Combining Reducers

You combine slices in the store's `reducer` object. Each key becomes a branch of the state tree.

```jsx
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
  },
});
// state = { counter: {...}, cart: {...}, favorites: {...} }
```

You read them with selectors: `state.cart.items`, `state.favorites`, etc.

---

## 13. Redux DevTools

Redux Toolkit enables the **Redux DevTools** browser extension automatically.

**Install:** search "Redux DevTools" in the Chrome/Firefox extension store.

**What you get:**
- See **every action** as it's dispatched.
- Inspect the **whole state** at any moment.
- **Time-travel** — step backward and forward through state changes.

This makes debugging global state much easier than `console.log`.

---

## 14. Cart Example with Redux

A shopping cart is a perfect Redux use case. The slice:

```jsx
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.qty += 1; // already in cart → increase quantity
      } else {
        state.items.push({ ...action.payload, qty: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});
```

Components dispatch `addToCart(product)`, `removeFromCart(id)`, etc. We build a full version in **Project 3 (Section 19)**.

👉 See [`examples/cartSlice.js`](./examples/cartSlice.js)

---

## 15. Favorites Example with Redux

A "favorites" (wishlist) slice toggles items in and out of a list.

```jsx
const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      const exists = state.includes(id);
      // Return a NEW array (the whole state is replaced here).
      return exists ? state.filter((x) => x !== id) : [...state, id];
    },
  },
});
```

> 🧠 **Note:** when a reducer **returns** a value, that value *replaces* the state. When it **mutates** (`state.push(...)`), Immer handles it. Both are valid — just don't do both in one reducer.

👉 See [`examples/favoritesSlice.js`](./examples/favoritesSlice.js)

---

## ✅ Section 14 Recap

- **Redux** keeps all global state in one **store** with predictable updates.
- **Use Redux** for complex, frequently-changing global state; **Context** for simple data.
- Install **`@reduxjs/toolkit`** + **`react-redux`**.
- **`configureStore`** makes the store; **`<Provider>`** connects it to React.
- **`createSlice`** generates a reducer + actions; you can "mutate" inside it (Immer).
- **`useSelector`** reads state; **`useDispatch`** sends actions.
- **Multiple slices** combine in the store's `reducer` object.
- **Redux DevTools** let you inspect and time-travel state.

### Knowledge check

1. When should you choose Redux over Context?
2. What do `useSelector` and `useDispatch` each do?
3. Why is it OK to write `state.value += 1` inside a slice reducer?

<details>
<summary>Show answers</summary>

1. When you have complex, frequently-changing global state used across many components (carts, favorites, big data). Context is better for simple, slow-changing data.
2. `useSelector` reads a piece of state from the store; `useDispatch` returns a `dispatch` function to send actions that update state.
3. Redux Toolkit uses Immer, which turns that "mutation" into a safe immutable update — but only inside slice reducers.

</details>

---

**Next up → [Section 15: Async Redux with createAsyncThunk](../Section%2015%20-%20Async%20Redux%20with%20createAsyncThunk/README.md)**
Now we fetch data into Redux the right way. 🔄

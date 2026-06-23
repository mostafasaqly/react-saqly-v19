# Section 15: Async Redux with createAsyncThunk

> **React 19 Course** — Section 15 of 21
> Level: Advanced

Redux slices (Section 14) update state instantly. But fetching data from a server takes time and can fail. **`createAsyncThunk`** is Redux Toolkit's tool for handling async work — loading, success, and failure — cleanly inside the store.

---

## Table of Contents

1. [Why Async Logic in Redux?](#1-why-async-logic-in-redux)
2. [Understanding pending, fulfilled, and rejected](#2-understanding-pending-fulfilled-and-rejected)
3. [Creating Async Actions with createAsyncThunk](#3-creating-async-actions-with-createasyncthunk)
4. [Fetching Data from API with createAsyncThunk](#4-fetching-data-from-api-with-createasyncthunk)
5. [isLoading State](#5-isloading-state)
6. [isError State](#6-iserror-state)
7. [Error Message State](#7-error-message-state)
8. [Handling API Success](#8-handling-api-success)
9. [Handling API Failure](#9-handling-api-failure)
10. [CRUD Operations with createAsyncThunk](#10-crud-operations-with-createasyncthunk)
11. [Using Axios with Redux Toolkit](#11-using-axios-with-redux-toolkit)
12. [Refactoring Async Redux Code](#12-refactoring-async-redux-code)

📁 **Code for this section:** see the [`examples/`](./examples) folder.

---

## 1. Why Async Logic in Redux?

### The problem

A normal reducer must be **synchronous** — it takes the current state and returns the next state, right away. But fetching data is **asynchronous**: you ask the server, wait, then get a result (or an error). You can't `await` inside a reducer.

### The solution: thunks

A **thunk** is a function that can do async work (like fetching) and then dispatch actions when it's done. `createAsyncThunk` builds one for you, and automatically dispatches actions for the **three stages** of any async request.

---

## 2. Understanding pending, fulfilled, and rejected

Every async request goes through three stages. `createAsyncThunk` fires an action for each:

| Stage | When | What you do |
| --- | --- | --- |
| **pending** | request started | show a loading spinner |
| **fulfilled** | request succeeded | save the data |
| **rejected** | request failed | show an error |

You handle these in the slice's `extraReducers`. This three-stage pattern is the heart of async Redux.

---

## 3. Creating Async Actions with createAsyncThunk

`createAsyncThunk` takes a **name** and an **async function**. It returns a thunk you can dispatch.

```jsx
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers", // a unique name
  async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return data; // becomes action.payload on success
  }
);
```

Whatever you `return` becomes the `fulfilled` payload. If it throws, it becomes `rejected`.

---

## 4. Fetching Data from API with createAsyncThunk

In the slice, handle the three stages in `extraReducers` using a builder.

```jsx
import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./usersThunks";

const usersSlice = createSlice({
  name: "users",
  initialState: { list: [], isLoading: false, isError: false, message: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload; // the returned data
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });
  },
});

export default usersSlice.reducer;
```

👉 See [`examples/usersSlice.js`](./examples/usersSlice.js)

---

## 5. isLoading State

`isLoading` tells the UI a request is in progress. Set it `true` on **pending**, `false` on **fulfilled** and **rejected**.

```jsx
.addCase(fetchUsers.pending, (state) => { state.isLoading = true; })
```

In the component:
```jsx
if (isLoading) return <p>Loading...</p>;
```

---

## 6. isError State

`isError` is a simple flag for "did it fail?". Set it `true` on **rejected**, and clear it when a new request starts (**pending**).

```jsx
.addCase(fetchUsers.pending, (state) => { state.isError = false; })
.addCase(fetchUsers.rejected, (state) => { state.isError = true; })
```

---

## 7. Error Message State

A flag isn't enough — show *why* it failed. Store the message from the rejected action.

```jsx
.addCase(fetchUsers.rejected, (state, action) => {
  state.message = action.error.message; // e.g. "Network Error"
});
```

In the component:
```jsx
if (isError) return <p>Error: {message}</p>;
```

> 💡 Together, `isLoading` + `isError` + `message` + the data give you a complete, professional async state.

---

## 8. Handling API Success

On **fulfilled**, save the data and turn off loading. `action.payload` is whatever your thunk returned.

```jsx
.addCase(fetchUsers.fulfilled, (state, action) => {
  state.isLoading = false;
  state.list = action.payload;
});
```

---

## 9. Handling API Failure

On **rejected**, turn off loading, set the error flag, and store the message. Axios throwing on a bad status makes this automatic.

```jsx
.addCase(fetchUsers.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.error.message;
});
```

> 🧠 For custom error messages, use `rejectWithValue` inside the thunk and read `action.payload` instead of `action.error`.

---

## 10. CRUD Operations with createAsyncThunk

Each CRUD action becomes its own thunk. You handle each one's stages.

```jsx
export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const { data } = await axios.get(API);
  return data;
});

export const addUser = createAsyncThunk("users/add", async (newUser) => {
  const { data } = await axios.post(API, newUser);
  return data; // the created user
});

export const deleteUser = createAsyncThunk("users/delete", async (id) => {
  await axios.delete(`${API}/${id}`);
  return id; // return the id so the reducer can remove it
});
```

In the slice:
```jsx
.addCase(addUser.fulfilled, (state, action) => {
  state.list.push(action.payload);
})
.addCase(deleteUser.fulfilled, (state, action) => {
  state.list = state.list.filter((u) => u.id !== action.payload);
});
```

👉 See [`examples/crudThunks.js`](./examples/crudThunks.js)

---

## 11. Using Axios with Redux Toolkit

Axios pairs perfectly with thunks:
- It **auto-parses JSON** (`data` is ready to return).
- It **throws on HTTP errors**, which becomes a `rejected` action automatically.

```jsx
export const fetchPosts = createAsyncThunk("posts/fetch", async () => {
  const { data } = await axios.get(`${API}/posts`);
  return data; // success → fulfilled
  // any throw → rejected, no extra code
});
```

Keep your API base URL in a reusable axios instance (Section 12) and import it into your thunks.

---

## 12. Refactoring Async Redux Code

As you add features, keep the code clean:

1. **Separate files:** thunks in one file, the slice in another, the axios service in a third.
2. **Reuse the API service** (Section 12) instead of calling axios directly in every thunk.
3. **A shared async-state shape** — many slices use `{ data, isLoading, isError, message }`. Keep it consistent.
4. **Helper for the three cases** — if you repeat pending/rejected logic, write a small helper that adds them for any thunk.
5. **Use `rejectWithValue`** for friendly, custom error messages.

```jsx
// A consistent initial state used across slices:
const asyncInitial = { data: [], isLoading: false, isError: false, message: "" };
```

> 🧠 **Big picture:** `createAsyncThunk` turns messy async/loading/error code into a clean, repeatable pattern. Learn it once and every data feature follows the same shape.

---

## ✅ Section 15 Recap

- Reducers are synchronous; **thunks** handle async work.
- **`createAsyncThunk`** auto-dispatches **pending / fulfilled / rejected** actions.
- Handle those in **`extraReducers`** with the builder.
- Track **`isLoading`**, **`isError`**, **`message`**, plus the data.
- **Success** → save `action.payload`; **failure** → set error + message.
- Each **CRUD** action is its own thunk.
- **Axios** fits thunks well (auto JSON, throws → rejected).
- **Refactor** into separate files and a consistent async-state shape.

### Knowledge check

1. Why can't you fetch data directly inside a normal reducer?
2. What are the three stages `createAsyncThunk` dispatches?
3. On `fulfilled`, where is the returned data?

<details>
<summary>Show answers</summary>

1. Reducers must be synchronous — they take state and return the next state immediately. Fetching is async, so it goes in a thunk.
2. `pending` (started), `fulfilled` (succeeded), and `rejected` (failed).
3. In `action.payload` (whatever the thunk's async function returned).

</details>

---

**Next up → [Section 16: Performance and Best Practices](../Section%2016%20-%20Performance%20and%20Best%20Practices/README.md)**
We make our apps fast and learn the React Compiler. 🚀

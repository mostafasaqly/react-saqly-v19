// crudThunks.js
// One thunk per CRUD action. Return what the reducer needs.

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://jsonplaceholder.typicode.com/users";

// READ
export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const { data } = await axios.get(API);
  return data;
});

// CREATE — return the created user so the reducer can add it.
export const addUser = createAsyncThunk("users/add", async (newUser) => {
  const { data } = await axios.post(API, newUser);
  return data;
});

// UPDATE — return the updated user.
export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, changes }) => {
    const { data } = await axios.put(`${API}/${id}`, changes);
    return data;
  }
);

// DELETE — return the id so the reducer can remove it.
export const deleteUser = createAsyncThunk("users/delete", async (id) => {
  await axios.delete(`${API}/${id}`);
  return id;
});

// In the slice's extraReducers:
//   .addCase(addUser.fulfilled,    (s, a) => { s.list.push(a.payload); })
//   .addCase(deleteUser.fulfilled, (s, a) => {
//      s.list = s.list.filter((u) => u.id !== a.payload);
//   })

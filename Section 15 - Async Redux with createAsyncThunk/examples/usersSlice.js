// usersSlice.js
// An async slice: fetch users and handle pending/fulfilled/rejected.

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://jsonplaceholder.typicode.com/users";

// The async thunk. Whatever it returns becomes the fulfilled payload.
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const { data } = await axios.get(API); // axios throws on errors → rejected
  return data;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // STARTED
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      // SUCCESS
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      // FAILURE
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });
  },
});

export default usersSlice.reducer;

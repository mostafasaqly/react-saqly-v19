// counterSlice.js
// A slice = one piece of state + the reducers that change it.
// createSlice generates the reducer AND the actions for you.

import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    // "Mutating" here is safe — Redux Toolkit uses Immer behind the scenes.
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    addBy: (state, action) => {
      state.value += action.payload; // payload = the data you pass in
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

// Actions are generated automatically from the reducer names.
export const { increment, decrement, addBy, reset } = counterSlice.actions;

// The reducer goes into the store.
export default counterSlice.reducer;

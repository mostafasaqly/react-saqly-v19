// favoritesSlice.js — a list of favorited product ids you toggle.

import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      return state.includes(id)
        ? state.filter((x) => x !== id)
        : [...state, id];
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;

// favoritesSlice.js
// A favorites (wishlist) slice: toggle an id in/out of a list.

import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [], // a simple array of ids
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      const exists = state.includes(id);
      // Returning a value REPLACES the state (vs mutating it).
      return exists ? state.filter((x) => x !== id) : [...state, id];
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;

// cartSlice.js
// A shopping cart slice: add, remove, and clear items.

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.qty += 1; // already in cart → bump the quantity
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

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

// Read in a component with a selector:
//   const items = useSelector((state) => state.cart.items);

// store.js — combine the three slices into one store.

import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import cartReducer from "./cartSlice";
import favoritesReducer from "./favoritesSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,   // state.products
    cart: cartReducer,           // state.cart
    favorites: favoritesReducer, // state.favorites
  },
});

// In main.jsx:
//   <Provider store={store}><App /></Provider>

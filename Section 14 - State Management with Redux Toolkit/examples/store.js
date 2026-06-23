// store.js
// The single store that holds all global state.
// Each key maps a piece of state to the slice that controls it.

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import cartReducer from "./cartSlice";
import favoritesReducer from "./favoritesSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,     // state.counter
    cart: cartReducer,           // state.cart
    favorites: favoritesReducer, // state.favorites
  },
});

// Redux DevTools are enabled automatically by configureStore.

// In main.jsx, wrap the app:
//   import { Provider } from "react-redux";
//   import { store } from "./store";
//   <Provider store={store}><App /></Provider>

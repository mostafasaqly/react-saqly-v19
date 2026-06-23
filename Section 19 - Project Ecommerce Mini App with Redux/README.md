# Section 19: Project 3 — E-commerce Mini App with Redux

> **React 19 Course** — Section 19 of 21
> Level: Project (combines Sections 12, 14, 15, 16)

Our third and biggest project: a small **online shop**. It fetches products from an API with **async Redux**, lets you add items to a **cart** and a **favorites** list, and shows a live cart total. This ties together Redux Toolkit, thunks, and everything else.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Creating Products Page](#2-creating-products-page)
3. [Creating Product Card Component](#3-creating-product-card-component)
4. [Fetching Products from API](#4-fetching-products-from-api)
5. [Creating Cart Slice](#5-creating-cart-slice)
6. [Adding Products to Cart](#6-adding-products-to-cart)
7. [Reading Cart with useSelector](#7-reading-cart-with-useselector)
8. [Updating Cart with useDispatch](#8-updating-cart-with-usedispatch)
9. [Removing Items from Cart](#9-removing-items-from-cart)
10. [Creating Favorites Slice](#10-creating-favorites-slice)
11. [Adding Favorites with Context or Redux](#11-adding-favorites-with-context-or-redux)
12. [Async Products with createAsyncThunk](#12-async-products-with-createasyncthunk)
13. [Loading and Error UI](#13-loading-and-error-ui)
14. [Cart Total with useMemo](#14-cart-total-with-usememo)
15. [Final Refactoring](#15-final-refactoring)

📁 **Code for this section:** see the [`examples/`](./examples) folder.

---

## 1. Project Overview

**What we build:** a mini shop where you can:

- 🛍️ Browse products fetched from an API
- 🛒 Add products to a cart (with quantities)
- ❤️ Mark products as favorites
- 💲 See a live cart total
- ⏳ See loading and error states (async Redux)

**API used:** `https://fakestoreapi.com/products` (free, no key).

**File plan:**
```
src/
├── store/
│   ├── store.js
│   ├── productsSlice.js   ← async thunk (fetch products)
│   ├── cartSlice.js
│   └── favoritesSlice.js
├── pages/
│   └── Products.jsx
└── components/
    ├── ProductCard.jsx
    └── Cart.jsx
```

---

## 2. Creating Products Page

The `Products` page fetches products on load and shows them as cards. It reads everything from Redux.

```jsx
function Products() {
  const dispatch = useDispatch();
  const { items, isLoading, isError } = useSelector((s) => s.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // ...render loading / error / product cards...
}
```

See [`examples/pages/Products.jsx`](./examples/pages/Products.jsx).

---

## 3. Creating Product Card Component

A reusable `ProductCard` shows one product and has "Add to cart" and "favorite" buttons. It **dispatches** Redux actions.

```jsx
function ProductCard({ product }) {
  const dispatch = useDispatch();
  return (
    <div className="card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <button onClick={() => dispatch(addToCart(product))}>Add to cart</button>
      <button onClick={() => dispatch(toggleFavorite(product.id))}>❤️</button>
    </div>
  );
}
```

See [`examples/components/ProductCard.jsx`](./examples/components/ProductCard.jsx).

---

## 4. Fetching Products from API

We load products with an **async thunk** (Section 15), so loading and errors are handled in the store.

```jsx
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const { data } = await axios.get("https://fakestoreapi.com/products");
  return data;
});
```

See [`examples/store/productsSlice.js`](./examples/store/productsSlice.js).

---

## 5. Creating Cart Slice

The cart slice holds the items and the actions to change them.

```jsx
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addToCart: (state, action) => { /* add or bump qty */ },
    removeFromCart: (state, action) => { /* filter out */ },
    clearCart: (state) => { state.items = []; },
  },
});
```

See [`examples/store/cartSlice.js`](./examples/store/cartSlice.js).

---

## 6. Adding Products to Cart

If the product is already in the cart, increase its quantity; otherwise add it with `qty: 1`.

```jsx
addToCart: (state, action) => {
  const found = state.items.find((i) => i.id === action.payload.id);
  if (found) {
    found.qty += 1;
  } else {
    state.items.push({ ...action.payload, qty: 1 });
  }
}
```

---

## 7. Reading Cart with useSelector

Any component reads the cart from the store.

```jsx
const items = useSelector((state) => state.cart.items);
const count = useSelector((state) => state.cart.items.length);
```

The cart icon in the header and the cart page both read the same source of truth.

---

## 8. Updating Cart with useDispatch

Components send actions to change the cart.

```jsx
const dispatch = useDispatch();
dispatch(addToCart(product));
dispatch(removeFromCart(product.id));
```

**The loop:** dispatch → reducer updates store → every `useSelector` reader re-renders.

---

## 9. Removing Items from Cart

Filter the item out by id.

```jsx
removeFromCart: (state, action) => {
  state.items = state.items.filter((i) => i.id !== action.payload);
}
```

See [`examples/components/Cart.jsx`](./examples/components/Cart.jsx).

---

## 10. Creating Favorites Slice

Favorites is a simple list of product ids that you toggle in and out.

```jsx
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
```

See [`examples/store/favoritesSlice.js`](./examples/store/favoritesSlice.js).

---

## 11. Adding Favorites with Context or Redux

**Which tool for favorites — Context or Redux?**

- **Context** (Section 10) would work: favorites is small, simple data.
- **Redux** is the better fit *here* because the app already uses Redux for the cart and products. Keeping all global state in one place is cleaner than mixing two systems.

> 🧠 **Lesson:** there's rarely one "right" answer. Pick the tool that keeps your app **consistent**. Since we're already in Redux, favorites goes in Redux too.

---

## 12. Async Products with createAsyncThunk

The products slice handles the three async stages (Section 15).

```jsx
extraReducers: (builder) => {
  builder
    .addCase(fetchProducts.pending, (state) => { state.isLoading = true; })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.error.message;
    });
}
```

---

## 13. Loading and Error UI

Read the async flags and show the right UI.

```jsx
if (isLoading) return <p>Loading products...</p>;
if (isError) return <p>Error: {message}</p>;
return <ProductGrid items={items} />;
```

Same loading/error pattern as every data feature in this course.

---

## 14. Cart Total with useMemo

The total is **derived** from the cart items. Wrap it in `useMemo` (Section 16) so it only recalculates when the cart changes.

```jsx
import { useMemo } from "react";
import { useSelector } from "react-redux";

function CartTotal() {
  const items = useSelector((state) => state.cart.items);

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [items]);

  return <p>Total: ${total.toFixed(2)}</p>;
}
```

> 💡 For a small cart, `useMemo` isn't strictly needed — but it's a clear, realistic example of when memoization makes sense (a calculation over a list).

See [`examples/components/Cart.jsx`](./examples/components/Cart.jsx).

---

## 15. Final Refactoring

Clean-up checklist:

- ✅ Each slice in its own file (`products`, `cart`, `favorites`).
- ✅ Async loading/error handled in the store via thunks.
- ✅ Reusable `ProductCard` and `Cart` components.
- ✅ Cart total derived with `useMemo`.
- ✅ All global state in **one** system (Redux) for consistency.

> 🧠 **Best practice:** keep slices small and focused, components dumb (read from store, dispatch actions), and the store as your single source of truth.

---

## 🎉 What you built

A real e-commerce core: API products, a working cart with quantities and totals, and favorites — all powered by Redux Toolkit and async thunks. This is the architecture behind many production shops.

### Challenges

1. Add **+/- quantity** buttons in the cart.
2. **Persist** the cart to `localStorage` so it survives reload.
3. Add a **favorites page** showing only favorited products.
4. Add **categories** and filter products by category.

---

**Next up → [Section 20: Deployment](../Section%2020%20-%20Deployment/README.md)**
Let's put your apps on the internet. 🌍

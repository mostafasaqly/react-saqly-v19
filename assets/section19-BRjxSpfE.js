const t={id:19,title:"المشروع الثالث: متجر مصغّر بـ Redux",level:"مشروع",lessons:["نظرة عامة على المشروع","إنشاء صفحة المنتجات","مكوّن بطاقة المنتج","جلب المنتجات من API","إنشاء شريحة السلّة","إضافة منتجات للسلّة","قراءة السلّة بـ useSelector","تحديث السلّة بـ useDispatch","حذف عناصر من السلّة","إنشاء شريحة المفضّلات","المفضّلات بالسياق أو Redux","منتجات غير متزامنة بـ createAsyncThunk","واجهة التحميل والخطأ","إجمالي السلّة بـ useMemo","إعادة الهيكلة النهائية","ملفات المشروع الكاملة"],intro:"مشروعنا الثالث والأكبر: متجر صغير. يجلب المنتجات من API بـ Redux غير المتزامن، ويتيح إضافة عناصر للسلّة وقائمة مفضّلات، ويعرض إجمالي سلّة حيّ. يجمع Redux Toolkit والـ thunks وكل ما سبق.",content:[{type:"heading",text:"1. نظرة عامة على المشروع"},{type:"list",items:["تصفّح منتجات مجلوبة من API","إضافة منتجات للسلّة (مع كمّيات)","تعليم المنتجات كمفضّلة","إجمالي سلّة حيّ + حالات تحميل وخطأ (Redux غير متزامن)"]},{type:"code",code:`src/
├── store/
│   ├── store.js
│   ├── productsSlice.js   ← thunk غير متزامن
│   ├── cartSlice.js
│   └── favoritesSlice.js
├── pages/Products.jsx
└── components/
    ├── ProductCard.jsx
    └── Cart.jsx`},{type:"heading",text:"2. إنشاء صفحة المنتجات"},{type:"code",code:`function Products() {
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector((s) => s.products);
  useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);
  // ...
}`},{type:"heading",text:"3. مكوّن بطاقة المنتج"},{type:"code",code:`function ProductCard({ product }) {
  const dispatch = useDispatch();
  return (
    <div className="card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>\${product.price}</p>
      <button onClick={() => dispatch(addToCart(product))}>أضف للسلّة</button>
      <button onClick={() => dispatch(toggleFavorite(product.id))}>❤️</button>
    </div>
  );
}`},{type:"heading",text:"4. جلب المنتجات من API"},{type:"code",code:`export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const { data } = await axios.get("https://fakestoreapi.com/products");
  return data;
});`},{type:"heading",text:"5. إنشاء شريحة السلّة"},{type:"code",code:`const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: { addToCart, removeFromCart, clearCart },
});`},{type:"heading",text:"6. إضافة منتجات للسلّة"},{type:"code",code:`addToCart: (state, action) => {
  const found = state.items.find((i) => i.id === action.payload.id);
  if (found) found.qty += 1;
  else state.items.push({ ...action.payload, qty: 1 });
}`},{type:"heading",text:"7. قراءة السلّة بـ useSelector"},{type:"code",code:"const items = useSelector((state) => state.cart.items);"},{type:"heading",text:"8. تحديث السلّة بـ useDispatch"},{type:"code",code:`dispatch(addToCart(product));
dispatch(removeFromCart(product.id));`},{type:"heading",text:"9. حذف عناصر من السلّة"},{type:"code",code:`removeFromCart: (state, action) => {
  state.items = state.items.filter((i) => i.id !== action.payload);
}`},{type:"heading",text:"10. إنشاء شريحة المفضّلات"},{type:"code",code:`toggleFavorite: (state, action) => {
  const id = action.payload;
  return state.includes(id) ? state.filter((x) => x !== id) : [...state, id];
}`},{type:"heading",text:"11. المفضّلات بالسياق أو Redux"},{type:"paragraph",text:"السياق يصلح لأن المفضّلات بيانات بسيطة. لكن Redux أنسب هنا لأن التطبيق يستخدمه أصلاً للسلّة والمنتجات. إبقاء كل الحالة العامة في مكان واحد أنظف."},{type:"tip",text:"الدرس: نادراً ما يوجد جواب «صحيح» واحد. اختر الأداة التي تبقي تطبيقك متّسقاً."},{type:"heading",text:"12. منتجات غير متزامنة بـ createAsyncThunk"},{type:"code",code:`.addCase(fetchProducts.fulfilled, (state, action) => {
  state.isLoading = false;
  state.items = action.payload;
})`},{type:"heading",text:"13. واجهة التحميل والخطأ"},{type:"code",code:`if (isLoading) return <p>جارٍ تحميل المنتجات...</p>;
if (isError) return <p>خطأ: {message}</p>;`},{type:"heading",text:"14. إجمالي السلّة بـ useMemo"},{type:"code",code:`const total = useMemo(
  () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
  [items]
);`},{type:"heading",text:"15. إعادة الهيكلة النهائية"},{type:"list",items:["كل شريحة في ملفها (products، cart، favorites)","التحميل/الخطأ غير المتزامن في المتجر عبر الـ thunks","إجمالي السلّة مشتقّ بـ useMemo","كل الحالة العامة في نظام واحد (Redux) للاتّساق"]},{type:"heading",text:"🎉 ما بنيته"},{type:"paragraph",text:"جوهر متجر إلكتروني حقيقي: منتجات من API، وسلّة عاملة بكمّيات وإجمالي، ومفضّلات — كلها مدعومة بـ Redux Toolkit والـ thunks غير المتزامنة."},{type:"heading",text:"ملفات المشروع الكاملة"},{type:"paragraph",text:"فيما يلي الكود الكامل لكل ملف في المشروع. كل مقطع مُعنوَن باسم الملف الذي ينتمي إليه."},{type:"heading",text:"store/productsSlice.js"},{type:"code",code:`// store/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const { data } = await axios.get("https://fakestoreapi.com/products");
  return data;
});

const productsSlice = createSlice({
  name: "products",
  initialState: { items: [], isLoading: false, isError: false, message: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });
  },
});

export default productsSlice.reducer;`},{type:"heading",text:"store/cartSlice.js"},{type:"code",code:`// store/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addToCart: (state, action) => {
      const found = state.items.find((i) => i.id === action.payload.id);
      if (found) {
        found.qty += 1;
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
export default cartSlice.reducer;`},{type:"heading",text:"store/favoritesSlice.js"},{type:"code",code:`// store/favoritesSlice.js
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
export default favoritesSlice.reducer;`},{type:"heading",text:"store/store.js"},{type:"code",code:`// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import cartReducer from "./cartSlice";
import favoritesReducer from "./favoritesSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
  },
});`},{type:"heading",text:"components/Cart.jsx"},{type:"code",code:`// components/Cart.jsx
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../store/cartSlice";

function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  );

  if (items.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div style={{ border: "1px solid #ccc", padding: 12, marginBottom: 16 }}>
      <h2>Cart ({items.length})</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.title} × {item.qty} — \${(item.price * item.qty).toFixed(2)}{" "}
            <button onClick={() => dispatch(removeFromCart(item.id))}>
              remove
            </button>
          </li>
        ))}
      </ul>
      <p>
        <strong>Total: \${total.toFixed(2)}</strong>
      </p>
      <button onClick={() => dispatch(clearCart())}>Clear cart</button>
    </div>
  );
}

export default Cart;`},{type:"heading",text:"components/ProductCard.jsx"},{type:"code",code:`// components/ProductCard.jsx
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { toggleFavorite } from "../store/favoritesSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) =>
    state.favorites.includes(product.id)
  );

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
      <img
        src={product.image}
        alt={product.title}
        style={{ height: 120, objectFit: "contain", width: "100%" }}
      />
      <h3 style={{ fontSize: 14 }}>{product.title}</h3>
      <p>\${product.price}</p>
      <button onClick={() => dispatch(addToCart(product))}>Add to cart</button>
      <button onClick={() => dispatch(toggleFavorite(product.id))}>
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </div>
  );
}

export default ProductCard;`},{type:"heading",text:"pages/Products.jsx"},{type:"code",code:`// pages/Products.jsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import ProductCard from "../components/ProductCard.jsx";
import Cart from "../components/Cart.jsx";

function Products() {
  const dispatch = useDispatch();
  const { items, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p style={{ color: "red" }}>Error: {message}</p>;

  return (
    <div>
      <Cart />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 16,
        }}
      >
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;`}],titleEn:"Project 3: Mini Store with Redux",levelEn:"Project",lessonsEn:["Project Overview","Creating the Products Page","Product Card Component","Fetching Products from API","Creating the Cart Slice","Adding Products to Cart","Reading the Cart with useSelector","Updating the Cart with useDispatch","Removing Items from Cart","Creating the Favorites Slice","Favorites: Context vs Redux","Async Products with createAsyncThunk","Loading and Error UI","Cart Total with useMemo","Final Refactor","Complete Project Files"],introEn:"Our third and biggest project: a mini store. It fetches products from an API using async Redux, lets users add items to a cart and a favorites list, and displays a live cart total. It brings together Redux Toolkit, thunks, and everything learned so far.",contentEn:[{type:"heading",text:"1. Project Overview"},{type:"paragraph",text:"This is the most complex project in the course. Plan carefully before coding — understand what state lives where and why."},{type:"list",items:["Browse products fetched from a real API (Fake Store API)","Add products to a shopping cart with quantity tracking","Mark products as favorites (toggle heart icon)","Live cart total + async loading/error states managed by Redux"]},{type:"code",code:`src/
├── store/
│   ├── store.js           ← configureStore
│   ├── productsSlice.js   ← async thunk, loading/error
│   ├── cartSlice.js       ← add/remove/clear, qty
│   └── favoritesSlice.js  ← toggle by id
├── pages/
│   └── Products.jsx
└── components/
    ├── ProductCard.jsx
    └── Cart.jsx`},{type:"tip",text:"One slice = one concern. Products, cart, and favorites are separate slices so they can evolve independently."},{type:"heading",text:"2. Creating the Products Page"},{type:"paragraph",text:"Products.jsx is the main page. It dispatches the async thunk on mount and reads the products list from the Redux store."},{type:"code",code:`// pages/Products.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import ProductCard from "../components/ProductCard";

function Products() {
  const dispatch = useDispatch();
  const { items, isLoading, isError, message } =
    useSelector((s) => s.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) return <p>Loading products...</p>;
  if (isError)   return <p>Error: {message}</p>;

  return (
    <div className="grid">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}`},{type:"heading",text:"3. Product Card Component"},{type:"paragraph",text:"ProductCard displays one product and lets the user add it to the cart or toggle it as a favorite. It dispatches actions — it does NOT own any state."},{type:"code",code:`// components/ProductCard.jsx
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { toggleFavorite } from "../store/favoritesSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const favorites = useSelector((s) => s.favorites);
  const isFav = favorites.includes(product.id);

  return (
    <div className="card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>\${product.price}</p>
      <button onClick={() => dispatch(addToCart(product))}>
        Add to Cart
      </button>
      <button onClick={() => dispatch(toggleFavorite(product.id))}>
        {isFav ? "❤️" : "🤍"}
      </button>
    </div>
  );
}`},{type:"heading",text:"4. Fetching Products from API"},{type:"paragraph",text:"createAsyncThunk handles the async lifecycle automatically: pending → fulfilled → rejected. You write the async logic once and Redux generates the action types."},{type:"code",code:`// store/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async () => {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    return data;   // becomes action.payload in fulfilled
  }
);`},{type:"tip",text:"The first argument to createAsyncThunk ('products/fetch') is the action type prefix. Redux Toolkit auto-generates products/fetch/pending, /fulfilled, /rejected."},{type:"heading",text:"5. Creating the Cart Slice"},{type:"paragraph",text:"createSlice generates action creators and the reducer in one place. The initialState defines the exact shape of the cart state."},{type:"code",code:`// store/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addToCart:      (state, action) => { /* see next step */ },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart:      (state) => { state.items = []; },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;`},{type:"tip",text:"Redux Toolkit uses Immer under the hood, so you CAN mutate state directly inside a reducer. It's translated to immutable updates automatically."},{type:"heading",text:"6. Adding Products to Cart"},{type:"paragraph",text:"If the product is already in the cart, increment its quantity. Otherwise push a new entry with qty: 1. This is the most important cart logic."},{type:"code",code:`addToCart: (state, action) => {
  const product = action.payload;
  const found = state.items.find((i) => i.id === product.id);
  if (found) {
    found.qty += 1;            // Immer makes this safe
  } else {
    state.items.push({ ...product, qty: 1 });
  }
},`},{type:"heading",text:"7. Reading the Cart with useSelector"},{type:"paragraph",text:"useSelector subscribes to the Redux store. Whenever the selected slice of state changes, the component re-renders automatically."},{type:"code",code:`// In Cart.jsx or any component
import { useSelector } from "react-redux";

function Cart() {
  const items = useSelector((state) => state.cart.items);

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          {item.title} × {item.qty}
        </div>
      ))}
    </div>
  );
}`},{type:"heading",text:"8. Updating the Cart with useDispatch"},{type:"paragraph",text:"useDispatch gives you the store's dispatch function. Call it with an action creator to update state. Action creators are just functions that return an action object."},{type:"code",code:`import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";

function SomeComponent({ product }) {
  const dispatch = useDispatch();

  return (
    <>
      <button onClick={() => dispatch(addToCart(product))}>Add</button>
      <button onClick={() => dispatch(removeFromCart(product.id))}>Remove</button>
    </>
  );
}`},{type:"heading",text:"9. Removing Items from Cart"},{type:"paragraph",text:"removeFromCart filters out the item by id. The payload is the product's id (a number), not the whole product object."},{type:"code",code:`removeFromCart: (state, action) => {
  // action.payload = product id
  state.items = state.items.filter((i) => i.id !== action.payload);
},`},{type:"tip",text:"When dispatching: dispatch(removeFromCart(product.id)) — pass just the id, not the whole object. Keep payloads minimal."},{type:"heading",text:"10. Creating the Favorites Slice"},{type:"paragraph",text:"Favorites are just an array of product ids. The toggleFavorite reducer adds the id if it's not there, removes it if it is."},{type:"code",code:`// store/favoritesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],   // array of product ids
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      const index = state.indexOf(id);
      if (index >= 0) {
        state.splice(index, 1);   // remove
      } else {
        state.push(id);           // add
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;`},{type:"heading",text:"11. Favorites: Context vs Redux"},{type:"paragraph",text:"Context would work technically for favorites (it's simple data). But this app already uses Redux for products and cart — keeping all global state in one system is cleaner and avoids a mix of patterns."},{type:"tip",text:"Rule: pick the simplest tool that fits, but be consistent. Adding Context on top of Redux in the same app creates two competing state systems that are harder to debug."},{type:"heading",text:"12. Async Products with createAsyncThunk"},{type:"paragraph",text:"Wire the thunk's lifecycle (pending / fulfilled / rejected) into the slice using extraReducers. This is how Redux knows to update isLoading and items when the fetch settles."},{type:"code",code:`// store/productsSlice.js
const productsSlice = createSlice({
  name: "products",
  initialState: { items: [], isLoading: false, isError: false, message: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.isError   = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items     = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError   = true;
        state.message   = action.error.message;
      });
  },
});`},{type:"heading",text:"13. Loading and Error UI"},{type:"paragraph",text:"Read isLoading and isError from the store and show the appropriate UI. Return early so the product grid only renders when data is ready."},{type:"code",code:`const { items, isLoading, isError, message } =
  useSelector((s) => s.products);

if (isLoading) return <p>Loading products...</p>;
if (isError)   return <p className="error">Error: {message}</p>;
if (!items.length) return <p>No products found.</p>;

return (
  <div className="grid">
    {items.map((p) => <ProductCard key={p.id} product={p} />)}
  </div>
);`},{type:"heading",text:"14. Cart Total with useMemo"},{type:"paragraph",text:"The cart total is derived from the items array. useMemo caches the result and only recalculates when items changes — important when the cart has many items."},{type:"code",code:`import { useMemo } from "react";
import { useSelector } from "react-redux";

function Cart() {
  const items = useSelector((s) => s.cart.items);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  );

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          {item.title} × {item.qty} = \${(item.price * item.qty).toFixed(2)}
        </div>
      ))}
      <strong>Total: \${total.toFixed(2)}</strong>
    </div>
  );
}`},{type:"tip",text:"toFixed(2) formats the price to two decimal places. Without it, floating-point arithmetic produces values like $29.990000000003."},{type:"heading",text:"15. Final Refactor"},{type:"paragraph",text:"Audit the codebase for consistency and separation of concerns before calling it done."},{type:"list",items:["Each slice in its own file: products, cart, favorites — easy to locate and modify","Async loading/error handled in the store via extraReducers — components stay clean","Cart total derived with useMemo — not stored in state, never out of sync","All global state in one Redux store — no mixing with Context or local state","Components only dispatch and select — no business logic inside JSX"]},{type:"heading",text:"What You Built"},{type:"paragraph",text:"The core of a real e-commerce frontend: products from an API, a working cart with quantities and a live total, and favorites — all powered by Redux Toolkit and async thunks. Add authentication, checkout, and a backend, and this is a production app."},{type:"qa",question:"1. Why use createAsyncThunk instead of fetching in useEffect?",answer:"createAsyncThunk integrates with Redux: loading/error state lives in the store and is accessible from any component. useEffect keeps fetch logic local to one component and requires you to manage loading/error state manually."},{type:"qa",question:"2. Why is the cart total computed with useMemo instead of stored in a cartTotal slice?",answer:"Because total is always derivable from items. Storing it separately creates a risk of it going out of sync with the real data. Derived state (computed from source of truth) is always preferable to duplicated state."},{type:"heading",text:"Complete Project Files"},{type:"paragraph",text:"Below is the full code for every file in the project. Each snippet is labeled with the file name it belongs to."},{type:"heading",text:"store/productsSlice.js"},{type:"code",code:`// store/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const { data } = await axios.get("https://fakestoreapi.com/products");
  return data;
});

const productsSlice = createSlice({
  name: "products",
  initialState: { items: [], isLoading: false, isError: false, message: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });
  },
});

export default productsSlice.reducer;`},{type:"heading",text:"store/cartSlice.js"},{type:"code",code:`// store/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addToCart: (state, action) => {
      const found = state.items.find((i) => i.id === action.payload.id);
      if (found) {
        found.qty += 1;
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
export default cartSlice.reducer;`},{type:"heading",text:"store/favoritesSlice.js"},{type:"code",code:`// store/favoritesSlice.js
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
export default favoritesSlice.reducer;`},{type:"heading",text:"store/store.js"},{type:"code",code:`// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import cartReducer from "./cartSlice";
import favoritesReducer from "./favoritesSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
  },
});`},{type:"heading",text:"components/Cart.jsx"},{type:"code",code:`// components/Cart.jsx
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../store/cartSlice";

function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  );

  if (items.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div style={{ border: "1px solid #ccc", padding: 12, marginBottom: 16 }}>
      <h2>Cart ({items.length})</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.title} × {item.qty} — \${(item.price * item.qty).toFixed(2)}{" "}
            <button onClick={() => dispatch(removeFromCart(item.id))}>
              remove
            </button>
          </li>
        ))}
      </ul>
      <p>
        <strong>Total: \${total.toFixed(2)}</strong>
      </p>
      <button onClick={() => dispatch(clearCart())}>Clear cart</button>
    </div>
  );
}

export default Cart;`},{type:"heading",text:"components/ProductCard.jsx"},{type:"code",code:`// components/ProductCard.jsx
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { toggleFavorite } from "../store/favoritesSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) =>
    state.favorites.includes(product.id)
  );

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
      <img
        src={product.image}
        alt={product.title}
        style={{ height: 120, objectFit: "contain", width: "100%" }}
      />
      <h3 style={{ fontSize: 14 }}>{product.title}</h3>
      <p>\${product.price}</p>
      <button onClick={() => dispatch(addToCart(product))}>Add to cart</button>
      <button onClick={() => dispatch(toggleFavorite(product.id))}>
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </div>
  );
}

export default ProductCard;`},{type:"heading",text:"pages/Products.jsx"},{type:"code",code:`// pages/Products.jsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import ProductCard from "../components/ProductCard.jsx";
import Cart from "../components/Cart.jsx";

function Products() {
  const dispatch = useDispatch();
  const { items, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p style={{ color: "red" }}>Error: {message}</p>;

  return (
    <div>
      <Cart />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 16,
        }}
      >
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;`}]};export{t as default};

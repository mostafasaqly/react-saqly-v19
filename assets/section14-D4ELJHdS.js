const e={id:14,title:"إدارة State بـ Redux Toolkit",level:"متوسط إلى متقدّم",lessons:["لماذا Redux؟","Context مقابل Redux","تثبيت Redux Toolkit و React Redux","إنشاء Store","توفير Store لReact","إنشاء Slice بـ createSlice","Initial State","Reducers وActions (Reducers & Actions)","قراءة State بـ useSelector","تحديث State بـ useDispatch","Slices متعدّدة","دمج Reducers","Redux DevTools","مثال السلّة","مثال المفضّلات"],intro:"Context ممتاز للبيانات البسيطة المشتركة. لكن للتطبيقات الكبيرة بحالة كثيرة تتغيّر في أماكن متعدّدة — سلّة تسوّق، مفضّلات — نريد أداة مخصّصة. Redux Toolkit هو الطريقة الحديثة الرسمية، وأبسط بكثير من Redux القديم.",content:[{type:"heading",text:"1. لماذا Redux؟"},{type:"paragraph",text:"مع نمو التطبيق، نفس الحالة تُحتاج وتتغيّر في أماكن متباعدة. تمرير الـ props أو حتى Context يصبح مُعقّداً. Redux يحفظ كل الحالة العامة في مكان واحد (Store)، وأي Component يقرأ منه أو يرسل تحديثاً بقواعد واضحة."},{type:"code",code:"Component → dispatch(action) → Reducer يحدّث Store → Components تعيد القراءة"},{type:"tip",text:"Redux Toolkit (RTK) هو Redux الرسمي الحديث. استخدمه دائماً — لا تستخدم Redux «العادي»."},{type:"heading",text:"2. Context مقابل Redux"},{type:"list",items:["Context: للثيم والمستخدم واللغة (يُضبط مرة، يُقرأ كثيراً)","Redux: لحالة كثيرة تتغيّر كثيراً (سلّة، مفضّلات، بيانات كبيرة)","Redux فيه DevTools قويّة وأداء دقيق مع Selectors"]},{type:"heading",text:"3. تثبيت Redux Toolkit و React Redux"},{type:"code",code:"npm install @reduxjs/toolkit react-redux"},{type:"heading",text:"4. إنشاء Store"},{type:"code",code:`import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: { counter: counterReducer },
});`},{type:"heading",text:"5. توفير Store لReact"},{type:"code",code:`import { Provider } from "react-redux";
import { store } from "./store";

<Provider store={store}><App /></Provider>`},{type:"heading",text:"6. إنشاء Slice بـ createSlice"},{type:"paragraph",text:"Slice قطعة حالة واحدة مع الدوال التي تغيّرها. createSlice يولّد Reducer وActions نيابةً عنك."},{type:"code",code:`const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    addBy: (state, action) => { state.value += action.payload; },
  },
});
export const { increment, addBy } = counterSlice.actions;
export default counterSlice.reducer;`},{type:"tip",text:"«تعدّل الحالة؟» RTK يستخدم Immer داخلياً، فيمكنك كتابة state.value += 1 بأمان داخل Slices فقط."},{type:"heading",text:"7. Initial State"},{type:"code",code:`initialState: { value: 0 }            // عدّاد
initialState: { items: [], total: 0 } // سلّة
initialState: []                      // مفضّلات`},{type:"heading",text:"8. Reducers وActions"},{type:"paragraph",text:"Action رسالة تصف ما حدث. Reducer دالة تحدّث الحالة استجابةً للAction. createSlice يولّد الاثنين."},{type:"code",code:`dispatch(increment());  // Action بدون بيانات
dispatch(addBy(5));     // Action مع payload = 5`},{type:"heading",text:"9. قراءة State بـ useSelector"},{type:"code",code:"const value = useSelector((state) => state.counter.value);"},{type:"paragraph",text:"Component يعيد الرسم فقط عند تغيّر القيمة التي اخترتها — فعّال افتراضياً."},{type:"heading",text:"10. تحديث State بـ useDispatch"},{type:"code",code:`const dispatch = useDispatch();
<button onClick={() => dispatch(increment())}>+1</button>`},{type:"heading",text:"11. Slices متعدّدة"},{type:"paragraph",text:"التطبيقات الحقيقية فيها عدّة Slices — واحدة لكل ميزة. كل Slice تدير جزءها (state.cart، state.favorites). احفظها في ملفات منفصلة."},{type:"heading",text:"12. دمج Reducers"},{type:"code",code:`configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
  },
});`},{type:"heading",text:"13. Redux DevTools"},{type:"paragraph",text:"RTK يفعّل إضافة Redux DevTools تلقائياً. ترى كل Action، وتفحص الحالة كاملة، وتتنقّل في الزمن (time-travel) عبر التغييرات."},{type:"heading",text:"14. مثال السلّة"},{type:"code",code:`addToCart: (state, action) => {
  const item = state.items.find((i) => i.id === action.payload.id);
  if (item) item.qty += 1;
  else state.items.push({ ...action.payload, qty: 1 });
}`},{type:"heading",text:"15. مثال المفضّلات"},{type:"code",code:`toggleFavorite: (state, action) => {
  const id = action.payload;
  return state.includes(id)
    ? state.filter((x) => x !== id)
    : [...state, id];
}`},{type:"heading",text:"✅ ملخص القسم"},{type:"list",items:["Redux يحفظ كل الحالة العامة في Store واحد بتحديثات متوقّعة","configureStore للStore، <Provider> لربطه بReact","createSlice يولّد Reducer وActions (يمكن «التعديل» بفضل Immer)","useSelector للقراءة، useDispatch للإرسال"]},{type:"qa",question:"1. متى تختار Redux بدل Context؟",answer:"عند حالة عامة معقّدة وكثيرة التغيّر تُستخدم عبر Components كثيرة (سلّة، مفضّلات، بيانات كبيرة)."},{type:"qa",question:"2. ماذا يفعل useSelector و useDispatch؟",answer:"useSelector يقرأ جزءاً من الحالة؛ useDispatch يُرجع دالة dispatch لإرسال Actions تحدّث الحالة."}],titleEn:"State Management with Redux Toolkit",levelEn:"Intermediate to Advanced",lessonsEn:["Why Redux?","Context vs Redux","Installing Redux Toolkit and React Redux","Creating the Store","Providing the Store to React","Creating a Slice with createSlice","Initial State","Reducers and Actions","Reading State with useSelector","Updating State with useDispatch","Multiple Slices","Combining Reducers","Redux DevTools","Cart Example","Favorites Example"],introEn:"Context is great for simple shared data. But for large apps with lots of state that changes in many places — a cart, favorites — we want a dedicated tool. Redux Toolkit is the modern official way, and far simpler than old Redux.",contentEn:[{type:"heading",text:"1. Why Redux?"},{type:"paragraph",text:"As an app grows, the same state is needed and changed in many separate places. Passing props or even context becomes complex. Redux stores all global state in one place (the store), and any component reads from it or sends an update following clear rules."},{type:"code",code:"Component → dispatch(action) → Reducer updates store → Components re-read"},{type:"tip",text:"Redux Toolkit (RTK) is the modern official Redux. Always use it — don't use 'plain' Redux."},{type:"heading",text:"2. Context vs Redux"},{type:"list",items:["Context: for theme, user, language (set once, read often)","Redux: for state that changes a lot (cart, favorites, large data sets)","Redux has powerful DevTools and fine-grained performance with selectors"]},{type:"heading",text:"3. Installing Redux Toolkit and React Redux"},{type:"code",code:"npm install @reduxjs/toolkit react-redux"},{type:"heading",text:"4. Creating the Store"},{type:"code",code:`import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: { counter: counterReducer },
});`},{type:"heading",text:"5. Providing the Store to React"},{type:"code",code:`import { Provider } from "react-redux";
import { store } from "./store";

<Provider store={store}><App /></Provider>`},{type:"heading",text:"6. Creating a Slice with createSlice"},{type:"paragraph",text:"A slice is one piece of state with the functions that change it. createSlice generates the reducer and actions for you."},{type:"code",code:`const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    addBy: (state, action) => { state.value += action.payload; },
  },
});
export const { increment, addBy } = counterSlice.actions;
export default counterSlice.reducer;`},{type:"tip",text:"'Mutating state?' RTK uses Immer internally, so you can write state.value += 1 safely inside slices."},{type:"heading",text:"7. Initial State"},{type:"code",code:`initialState: { value: 0 }            // counter
initialState: { items: [], total: 0 } // cart
initialState: []                      // favorites`},{type:"heading",text:"8. Reducers and Actions"},{type:"paragraph",text:"An action is a message describing what happened. A reducer is a function that updates state in response to an action. createSlice generates both."},{type:"code",code:`dispatch(increment());  // action with no data
dispatch(addBy(5));     // action with payload = 5`},{type:"heading",text:"9. Reading State with useSelector"},{type:"code",code:"const value = useSelector((state) => state.counter.value);"},{type:"paragraph",text:"The component only re-renders when the selected value changes — efficient by default."},{type:"heading",text:"10. Updating State with useDispatch"},{type:"code",code:`const dispatch = useDispatch();
<button onClick={() => dispatch(increment())}>+1</button>`},{type:"heading",text:"11. Multiple Slices"},{type:"paragraph",text:"Real apps have several slices — one per feature. Each slice manages its own part (state.cart, state.favorites). Keep them in separate files."},{type:"heading",text:"12. Combining Reducers"},{type:"code",code:`configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
  },
});`},{type:"heading",text:"13. Redux DevTools"},{type:"paragraph",text:"RTK enables the Redux DevTools extension automatically. You can see every action, inspect the full state, and time-travel through changes."},{type:"heading",text:"14. Cart Example"},{type:"code",code:`addToCart: (state, action) => {
  const item = state.items.find((i) => i.id === action.payload.id);
  if (item) item.qty += 1;
  else state.items.push({ ...action.payload, qty: 1 });
}`},{type:"heading",text:"15. Favorites Example"},{type:"code",code:`toggleFavorite: (state, action) => {
  const id = action.payload;
  return state.includes(id)
    ? state.filter((x) => x !== id)
    : [...state, id];
}`},{type:"heading",text:"✅ Section Summary"},{type:"list",items:["Redux stores all global state in one store with predictable updates","configureStore for the store; <Provider> to connect it to React","createSlice generates the reducer and actions (mutation-safe via Immer)","useSelector to read, useDispatch to send"]},{type:"qa",question:"1. When do you choose Redux over Context?",answer:"When you have complex, frequently-changing global state used across many components (cart, favorites, large data sets)."},{type:"qa",question:"2. What do useSelector and useDispatch do?",answer:"useSelector reads a piece of state; useDispatch returns a dispatch function to send actions that update the state."}]};export{e as default};

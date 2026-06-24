const e={id:14,title:"إدارة الحالة بـ Redux Toolkit",level:"متوسط إلى متقدّم",lessons:["لماذا Redux؟","السياق مقابل Redux","تثبيت Redux Toolkit و React Redux","إنشاء المتجر (Store)","توفير المتجر لرياكت","إنشاء شريحة بـ createSlice","الحالة الابتدائية","المخفّضات والإجراءات (Reducers & Actions)","قراءة الحالة بـ useSelector","تحديث الحالة بـ useDispatch","شرائح متعدّدة","دمج المخفّضات","Redux DevTools","مثال السلّة","مثال المفضّلات"],intro:"السياق ممتاز للبيانات البسيطة المشتركة. لكن للتطبيقات الكبيرة بحالة كثيرة تتغيّر في أماكن متعدّدة — سلّة تسوّق، مفضّلات — نريد أداة مخصّصة. Redux Toolkit هو الطريقة الحديثة الرسمية، وأبسط بكثير من Redux القديم.",content:[{type:"heading",text:"1. لماذا Redux؟"},{type:"paragraph",text:"مع نمو التطبيق، نفس الحالة تُحتاج وتتغيّر في أماكن متباعدة. تمرير الـ props أو حتى السياق يصبح مُعقّداً. Redux يحفظ كل الحالة العامة في مكان واحد (المتجر)، وأي مكوّن يقرأ منه أو يرسل تحديثاً بقواعد واضحة."},{type:"code",code:"المكوّن → dispatch(action) → المخفّض يحدّث المتجر → المكوّنات تعيد القراءة"},{type:"tip",text:"Redux Toolkit (RTK) هو Redux الرسمي الحديث. استخدمه دائماً — لا تستخدم Redux «العادي»."},{type:"heading",text:"2. السياق مقابل Redux"},{type:"list",items:["السياق: للثيم والمستخدم واللغة (يُضبط مرة، يُقرأ كثيراً)","Redux: لحالة كثيرة تتغيّر كثيراً (سلّة، مفضّلات، بيانات كبيرة)","Redux فيه DevTools قويّة وأداء دقيق مع المحدّدات (selectors)"]},{type:"heading",text:"3. تثبيت Redux Toolkit و React Redux"},{type:"code",code:"npm install @reduxjs/toolkit react-redux"},{type:"heading",text:"4. إنشاء المتجر (Store)"},{type:"code",code:`import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: { counter: counterReducer },
});`},{type:"heading",text:"5. توفير المتجر لرياكت"},{type:"code",code:`import { Provider } from "react-redux";
import { store } from "./store";

<Provider store={store}><App /></Provider>`},{type:"heading",text:"6. إنشاء شريحة بـ createSlice"},{type:"paragraph",text:"الشريحة (slice) قطعة حالة واحدة مع الدوال التي تغيّرها. createSlice يولّد المخفّض والإجراءات نيابةً عنك."},{type:"code",code:`const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    addBy: (state, action) => { state.value += action.payload; },
  },
});
export const { increment, addBy } = counterSlice.actions;
export default counterSlice.reducer;`},{type:"tip",text:"«تعدّل الحالة؟» RTK يستخدم Immer داخلياً، فيمكنك كتابة state.value += 1 بأمان داخل الشرائح فقط."},{type:"heading",text:"7. الحالة الابتدائية"},{type:"code",code:`initialState: { value: 0 }            // عدّاد
initialState: { items: [], total: 0 } // سلّة
initialState: []                      // مفضّلات`},{type:"heading",text:"8. المخفّضات والإجراءات"},{type:"paragraph",text:"الإجراء (action) رسالة تصف ما حدث. المخفّض (reducer) دالة تحدّث الحالة استجابةً للإجراء. createSlice يولّد الاثنين."},{type:"code",code:`dispatch(increment());  // إجراء بدون بيانات
dispatch(addBy(5));     // إجراء مع payload = 5`},{type:"heading",text:"9. قراءة الحالة بـ useSelector"},{type:"code",code:"const value = useSelector((state) => state.counter.value);"},{type:"paragraph",text:"المكوّن يعيد الرسم فقط عند تغيّر القيمة التي اخترتها — فعّال افتراضياً."},{type:"heading",text:"10. تحديث الحالة بـ useDispatch"},{type:"code",code:`const dispatch = useDispatch();
<button onClick={() => dispatch(increment())}>+1</button>`},{type:"heading",text:"11. شرائح متعدّدة"},{type:"paragraph",text:"التطبيقات الحقيقية فيها عدّة شرائح — واحدة لكل ميزة. كل شريحة تدير جزءها (state.cart، state.favorites). احفظها في ملفات منفصلة."},{type:"heading",text:"12. دمج المخفّضات"},{type:"code",code:`configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
  },
});`},{type:"heading",text:"13. Redux DevTools"},{type:"paragraph",text:"RTK يفعّل إضافة Redux DevTools تلقائياً. ترى كل إجراء، وتفحص الحالة كاملة، وتتنقّل في الزمن (time-travel) عبر التغييرات."},{type:"heading",text:"14. مثال السلّة"},{type:"code",code:`addToCart: (state, action) => {
  const item = state.items.find((i) => i.id === action.payload.id);
  if (item) item.qty += 1;
  else state.items.push({ ...action.payload, qty: 1 });
}`},{type:"heading",text:"15. مثال المفضّلات"},{type:"code",code:`toggleFavorite: (state, action) => {
  const id = action.payload;
  return state.includes(id)
    ? state.filter((x) => x !== id)
    : [...state, id];
}`},{type:"heading",text:"✅ ملخص القسم"},{type:"list",items:["Redux يحفظ كل الحالة العامة في متجر واحد بتحديثات متوقّعة","configureStore للمتجر، <Provider> لربطه برياكت","createSlice يولّد المخفّض والإجراءات (يمكن «التعديل» بفضل Immer)","useSelector للقراءة، useDispatch للإرسال"]},{type:"qa",question:"1. متى تختار Redux بدل السياق؟",answer:"عند حالة عامة معقّدة وكثيرة التغيّر تُستخدم عبر مكوّنات كثيرة (سلّة، مفضّلات، بيانات كبيرة)."},{type:"qa",question:"2. ماذا يفعل useSelector و useDispatch؟",answer:"useSelector يقرأ جزءاً من الحالة؛ useDispatch يُرجع دالة dispatch لإرسال إجراءات تحدّث الحالة."}],titleEn:"State Management with Redux Toolkit"};export{e as default};

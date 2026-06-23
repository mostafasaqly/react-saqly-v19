// القسم 19 — المشروع الثالث: متجر مصغّر بـ Redux
export default {
  id: 19,
  title: "المشروع الثالث: متجر مصغّر بـ Redux",
  level: "مشروع",
  lessons: [
    "نظرة عامة على المشروع",
    "إنشاء صفحة المنتجات",
    "مكوّن بطاقة المنتج",
    "جلب المنتجات من API",
    "إنشاء شريحة السلّة",
    "إضافة منتجات للسلّة",
    "قراءة السلّة بـ useSelector",
    "تحديث السلّة بـ useDispatch",
    "حذف عناصر من السلّة",
    "إنشاء شريحة المفضّلات",
    "المفضّلات بالسياق أو Redux",
    "منتجات غير متزامنة بـ createAsyncThunk",
    "واجهة التحميل والخطأ",
    "إجمالي السلّة بـ useMemo",
    "إعادة الهيكلة النهائية",
  ],
  intro:
    "مشروعنا الثالث والأكبر: متجر صغير. يجلب المنتجات من API بـ Redux غير المتزامن، ويتيح إضافة عناصر للسلّة وقائمة مفضّلات، ويعرض إجمالي سلّة حيّ. يجمع Redux Toolkit والـ thunks وكل ما سبق.",
  content: [
    { type: "heading", text: "1. نظرة عامة على المشروع" },
    {
      type: "list",
      items: [
        "تصفّح منتجات مجلوبة من API",
        "إضافة منتجات للسلّة (مع كمّيات)",
        "تعليم المنتجات كمفضّلة",
        "إجمالي سلّة حيّ + حالات تحميل وخطأ (Redux غير متزامن)",
      ],
    },
    {
      type: "code",
      code: `src/
├── store/
│   ├── store.js
│   ├── productsSlice.js   ← thunk غير متزامن
│   ├── cartSlice.js
│   └── favoritesSlice.js
├── pages/Products.jsx
└── components/
    ├── ProductCard.jsx
    └── Cart.jsx`,
    },

    { type: "heading", text: "2. إنشاء صفحة المنتجات" },
    {
      type: "code",
      code: `function Products() {
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector((s) => s.products);
  useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);
  // ...
}`,
    },

    { type: "heading", text: "3. مكوّن بطاقة المنتج" },
    {
      type: "code",
      code: `function ProductCard({ product }) {
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
}`,
    },

    { type: "heading", text: "4. جلب المنتجات من API" },
    {
      type: "code",
      code: `export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const { data } = await axios.get("https://fakestoreapi.com/products");
  return data;
});`,
    },

    { type: "heading", text: "5. إنشاء شريحة السلّة" },
    {
      type: "code",
      code: `const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: { addToCart, removeFromCart, clearCart },
});`,
    },

    { type: "heading", text: "6. إضافة منتجات للسلّة" },
    {
      type: "code",
      code: `addToCart: (state, action) => {
  const found = state.items.find((i) => i.id === action.payload.id);
  if (found) found.qty += 1;
  else state.items.push({ ...action.payload, qty: 1 });
}`,
    },

    { type: "heading", text: "7. قراءة السلّة بـ useSelector" },
    {
      type: "code",
      code: `const items = useSelector((state) => state.cart.items);`,
    },

    { type: "heading", text: "8. تحديث السلّة بـ useDispatch" },
    {
      type: "code",
      code: `dispatch(addToCart(product));
dispatch(removeFromCart(product.id));`,
    },

    { type: "heading", text: "9. حذف عناصر من السلّة" },
    {
      type: "code",
      code: `removeFromCart: (state, action) => {
  state.items = state.items.filter((i) => i.id !== action.payload);
}`,
    },

    { type: "heading", text: "10. إنشاء شريحة المفضّلات" },
    {
      type: "code",
      code: `toggleFavorite: (state, action) => {
  const id = action.payload;
  return state.includes(id) ? state.filter((x) => x !== id) : [...state, id];
}`,
    },

    { type: "heading", text: "11. المفضّلات بالسياق أو Redux" },
    {
      type: "paragraph",
      text: "السياق يصلح لأن المفضّلات بيانات بسيطة. لكن Redux أنسب هنا لأن التطبيق يستخدمه أصلاً للسلّة والمنتجات. إبقاء كل الحالة العامة في مكان واحد أنظف.",
    },
    {
      type: "tip",
      text: "الدرس: نادراً ما يوجد جواب «صحيح» واحد. اختر الأداة التي تبقي تطبيقك متّسقاً.",
    },

    { type: "heading", text: "12. منتجات غير متزامنة بـ createAsyncThunk" },
    {
      type: "code",
      code: `.addCase(fetchProducts.fulfilled, (state, action) => {
  state.isLoading = false;
  state.items = action.payload;
})`,
    },

    { type: "heading", text: "13. واجهة التحميل والخطأ" },
    {
      type: "code",
      code: `if (isLoading) return <p>جارٍ تحميل المنتجات...</p>;
if (isError) return <p>خطأ: {message}</p>;`,
    },

    { type: "heading", text: "14. إجمالي السلّة بـ useMemo" },
    {
      type: "code",
      code: `const total = useMemo(
  () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
  [items]
);`,
    },

    { type: "heading", text: "15. إعادة الهيكلة النهائية" },
    {
      type: "list",
      items: [
        "كل شريحة في ملفها (products، cart، favorites)",
        "التحميل/الخطأ غير المتزامن في المتجر عبر الـ thunks",
        "إجمالي السلّة مشتقّ بـ useMemo",
        "كل الحالة العامة في نظام واحد (Redux) للاتّساق",
      ],
    },

    { type: "heading", text: "🎉 ما بنيته" },
    {
      type: "paragraph",
      text: "جوهر متجر إلكتروني حقيقي: منتجات من API، وسلّة عاملة بكمّيات وإجمالي، ومفضّلات — كلها مدعومة بـ Redux Toolkit والـ thunks غير المتزامنة.",
    },
  ],
};

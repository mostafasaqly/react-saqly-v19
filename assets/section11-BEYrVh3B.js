const e={id:11,title:"التوجيه بـ React Router DOM",level:"متوسط",lessons:["ما هو التوجيه من جهة العميل؟","تثبيت React Router DOM","BrowserRouter و Routes و Route","إنشاء الصفحات","مسارات التخطيط (Layout)","Link مقابل NavLink","تنسيق الرابط النشط","التنقّل البرمجي بـ useNavigate","إعادة التوجيه بعد الإجراءات","إرسال بيانات مع navigate","قراءة البيانات بـ useLocation","المسارات الديناميكية","معاملات المسار بـ useParams","معاملات الاستعلام (Query Params)","صفحة غير موجود (404)","المسارات المحميّة","إعادة التوجيه بعد تسجيل الدخول"],intro:"تطبيق رياكت صفحة واحدة، لكن المواقع الحقيقية فيها صفحات كثيرة. React Router DOM يتيح عرض مكوّنات مختلفة لعناوين URL مختلفة — دون إعادة تحميل الصفحة.",content:[{type:"heading",text:"1. ما هو التوجيه من جهة العميل؟"},{type:"paragraph",text:"في تطبيق رياكت، المتصفح يملك الكود كله. التوجيه من جهة العميل يبدّل المكوّن المعروض بناءً على الـ URL — دون طلب من الخادم ولا إعادة تحميل. يبدو فورياً، والحالة محفوظة."},{type:"heading",text:"2. تثبيت React Router DOM"},{type:"code",code:"npm install react-router-dom"},{type:"heading",text:"3. BrowserRouter و Routes و Route"},{type:"code",code:`// main.jsx
<BrowserRouter><App /></BrowserRouter>

// App.jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>`},{type:"heading",text:"4. إنشاء الصفحات"},{type:"paragraph",text:"«الصفحة» مجرد مكوّن عادي توجّه إليه مساراً. احفظها في مجلد pages."},{type:"heading",text:"5. مسارات التخطيط (Layout)"},{type:"paragraph",text:"معظم الصفحات تشترك في نفس الهيدر والتنقّل. اصنع Layout فيه الأجزاء المشتركة و <Outlet />، حيث تظهر الصفحة المطابقة."},{type:"code",code:`function Layout() {
  return (
    <div>
      <nav>...</nav>
      <main><Outlet /></main>
    </div>
  );
}`},{type:"heading",text:"6. Link مقابل NavLink"},{type:"paragraph",text:"<a> العادي يعيد تحميل الصفحة. <Link> يغيّر الـ URL دون إعادة تحميل. <NavLink> مثله لكنه يعرف الصفحة النشطة."},{type:"code",code:'<Link to="/about">About</Link>'},{type:"heading",text:"7. تنسيق الرابط النشط"},{type:"code",code:`<NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>
  About
</NavLink>`},{type:"heading",text:"8. التنقّل البرمجي بـ useNavigate"},{type:"code",code:`const navigate = useNavigate();
navigate("/dashboard"); // انتقال من الكود
navigate(-1);           // رجوع للخلف`},{type:"heading",text:"9. إعادة التوجيه بعد الإجراءات"},{type:"code",code:`async function handleSave(formData) {
  await saveItem(formData);
  navigate("/items"); // انتقل للقائمة بعد الحفظ
}`},{type:"heading",text:"10. إرسال بيانات مع navigate"},{type:"paragraph",text:"أحياناً تريد حمل بيانات صغيرة للصفحة التالية دون وضعها في الـ URL. استخدم خيار state."},{type:"code",code:'navigate("/details", { state: { from: "dashboard", id: 42 } });'},{type:"heading",text:"11. قراءة البيانات بـ useLocation"},{type:"code",code:`const location = useLocation();
const data = location.state; // { from, id }`},{type:"heading",text:"12. المسارات الديناميكية"},{type:"code",code:`<Route path="/product/:id" element={<Product />} />
// يطابق /product/1 و /product/42 و /product/anything`},{type:"heading",text:"13. معاملات المسار بـ useParams"},{type:"code",code:`const { id } = useParams();
// إذا كان الـ URL /product/42 فإن id = "42"`},{type:"heading",text:"14. معاملات الاستعلام (Query Params)"},{type:"paragraph",text:"للقيم الاختيارية مثل البحث: /search?q=shoes&page=2. استخدم useSearchParams. ميزتها أن الـ URL يصبح قابلاً للمشاركة والحفظ."},{type:"code",code:`const [searchParams, setSearchParams] = useSearchParams();
const q = searchParams.get("q") || "";
setSearchParams({ q: text, page: "1" });`},{type:"heading",text:"15. صفحة غير موجود (404)"},{type:"code",code:'<Route path="*" element={<NotFound />} /> // يطابق كل ما عداه'},{type:"heading",text:"16. المسارات المحميّة"},{type:"code",code:`function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
}`},{type:"heading",text:"17. إعادة التوجيه بعد تسجيل الدخول"},{type:"paragraph",text:"عند إرسال المستخدم لتسجيل الدخول، تذكّر إلى أين كان ذاهباً (في state)، وبعد الدخول أرجِعه إليه بدل الصفحة الرئيسية."},{type:"code",code:`const from = location.state?.from || "/";
navigate(from, { replace: true });`},{type:"heading",text:"✅ ملخص القسم"},{type:"list",items:["التوجيه من جهة العميل يبدّل المكوّنات حسب الـ URL دون إعادة تحميل","BrowserRouter و Routes و Route، ومسارات التخطيط بـ <Outlet />","<Link>/<NavLink> للتنقّل، و useNavigate من الكود","المسارات الديناميكية (:id) و useParams، ومعاملات الاستعلام للبحث"]},{type:"qa",question:"1. لماذا تستخدم <Link> بدل <a>؟",answer:"<Link> يغيّر الـ URL دون إعادة تحميل كاملة، فيبقى رياكت سريعاً والحالة محفوظة."},{type:"qa",question:"2. ما الفرق بين معامل المسار (:id) ومعامل الاستعلام (?q=)؟",answer:"المعامل جزء من المسار وغالباً مطلوب (/product/42)؛ معامل الاستعلام اختياري بعد ?، ممتاز للبحث والفلترة."}],titleEn:"Routing with React Router DOM"};export{e as default};

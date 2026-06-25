const e={id:11,title:"Routing بـ React Router DOM",level:"متوسط",lessons:["ما هو Routing من جهة العميل؟","تثبيت React Router DOM","BrowserRouter و Routes و Route","إنشاء الصفحات","مسارات التخطيط (Layout)","Link مقابل NavLink","تنسيق الرابط النشط","التنقّل البرمجي بـ useNavigate","إعادة Routing بعد Actions","إرسال بيانات مع navigate","قراءة البيانات بـ useLocation","المسارات الديناميكية","معاملات المسار بـ useParams","معاملات الاستعلام (Query Params)","صفحة غير موجود (404)","المسارات المحميّة","إعادة Routing بعد تسجيل الدخول"],intro:"تطبيق React صفحة واحدة، لكن المواقع الحقيقية فيها صفحات كثيرة. React Router DOM يتيح عرض Components مختلفة لعناوين URL مختلفة — دون إعادة تحميل الصفحة.",content:[{type:"heading",text:"1. ما هو Routing من جهة العميل؟"},{type:"paragraph",text:"في تطبيق React، المتصفح يملك الكود كله. Routing من جهة العميل يبدّل Component المعروض بناءً على الـ URL — دون طلب من الخادم ولا إعادة تحميل. يبدو فورياً، والحالة محفوظة."},{type:"heading",text:"2. تثبيت React Router DOM"},{type:"code",code:"npm install react-router-dom"},{type:"heading",text:"3. BrowserRouter و Routes و Route"},{type:"code",code:`// main.jsx
<BrowserRouter><App /></BrowserRouter>

// App.jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>`},{type:"heading",text:"4. إنشاء الصفحات"},{type:"paragraph",text:"«الصفحة» مجرد Component عادي توجّه إليه مساراً. احفظها في مجلد pages."},{type:"heading",text:"5. مسارات التخطيط (Layout)"},{type:"paragraph",text:"معظم الصفحات تشترك في نفس الهيدر والتنقّل. اصنع Layout فيه الأجزاء المشتركة و <Outlet />، حيث تظهر الصفحة المطابقة."},{type:"code",code:`function Layout() {
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
navigate(-1);           // رجوع للخلف`},{type:"heading",text:"9. إعادة Routing بعد Actions"},{type:"code",code:`async function handleSave(formData) {
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
}`},{type:"heading",text:"17. إعادة Routing بعد تسجيل الدخول"},{type:"paragraph",text:"عند إرسال المستخدم لتسجيل الدخول، تذكّر إلى أين كان ذاهباً (في state)، وبعد الدخول أرجِعه إليه بدل الصفحة الرئيسية."},{type:"code",code:`const from = location.state?.from || "/";
navigate(from, { replace: true });`},{type:"heading",text:"✅ ملخص القسم"},{type:"list",items:["Routing من جهة العميل يبدّل Components حسب الـ URL دون إعادة تحميل","BrowserRouter و Routes و Route، ومسارات التخطيط بـ <Outlet />","<Link>/<NavLink> للتنقّل، و useNavigate من الكود","المسارات الديناميكية (:id) و useParams، ومعاملات الاستعلام للبحث"]},{type:"qa",question:"1. لماذا تستخدم <Link> بدل <a>؟",answer:"<Link> يغيّر الـ URL دون إعادة تحميل كاملة، فيبقى React سريعاً والحالة محفوظة."},{type:"qa",question:"2. ما الفرق بين معامل المسار (:id) ومعامل الاستعلام (?q=)؟",answer:"المعامل جزء من المسار وغالباً مطلوب (/product/42)؛ معامل الاستعلام اختياري بعد ?، ممتاز للبحث والفلترة."}],titleEn:"Routing with React Router DOM",levelEn:"Intermediate",lessonsEn:["What is Client-Side Routing?","Installing React Router DOM","BrowserRouter, Routes, and Route","Creating Pages","Layout Routes","Link vs NavLink","Styling the Active Link","Programmatic Navigation with useNavigate","Redirecting After Actions","Passing Data with navigate","Reading Data with useLocation","Dynamic Routes","Route Parameters with useParams","Query Parameters","Not Found Page (404)","Protected Routes","Redirecting After Login"],introEn:"A React app is a single page, but real websites have many pages. React Router DOM lets you display different components for different URLs — without reloading the page.",contentEn:[{type:"heading",text:"1. What is Client-Side Routing?"},{type:"paragraph",text:"In a React app, the browser already has all the code. Client-side routing switches the displayed component based on the URL — no server request, no page reload. It feels instant and state is preserved."},{type:"heading",text:"2. Installing React Router DOM"},{type:"code",code:"npm install react-router-dom"},{type:"heading",text:"3. BrowserRouter, Routes, and Route"},{type:"code",code:`// main.jsx
<BrowserRouter><App /></BrowserRouter>

// App.jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>`},{type:"heading",text:"4. Creating Pages"},{type:"paragraph",text:'A "page" is just a regular component that you route to. Keep them in a pages folder.'},{type:"heading",text:"5. Layout Routes"},{type:"paragraph",text:"Most pages share the same header and nav. Create a Layout with the shared parts and <Outlet />, where the matching page appears."},{type:"code",code:`function Layout() {
  return (
    <div>
      <nav>...</nav>
      <main><Outlet /></main>
    </div>
  );
}`},{type:"heading",text:"6. Link vs NavLink"},{type:"paragraph",text:"A regular <a> reloads the page. <Link> changes the URL without a reload. <NavLink> is the same but knows which page is active."},{type:"code",code:'<Link to="/about">About</Link>'},{type:"heading",text:"7. Styling the Active Link"},{type:"code",code:`<NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>
  About
</NavLink>`},{type:"heading",text:"8. Programmatic Navigation with useNavigate"},{type:"code",code:`const navigate = useNavigate();
navigate("/dashboard"); // navigate from code
navigate(-1);           // go back`},{type:"heading",text:"9. Redirecting After Actions"},{type:"code",code:`async function handleSave(formData) {
  await saveItem(formData);
  navigate("/items"); // go to list after saving
}`},{type:"heading",text:"10. Passing Data with navigate"},{type:"paragraph",text:"Sometimes you want to carry small data to the next page without putting it in the URL. Use the state option."},{type:"code",code:'navigate("/details", { state: { from: "dashboard", id: 42 } });'},{type:"heading",text:"11. Reading Data with useLocation"},{type:"code",code:`const location = useLocation();
const data = location.state; // { from, id }`},{type:"heading",text:"12. Dynamic Routes"},{type:"code",code:`<Route path="/product/:id" element={<Product />} />
// matches /product/1, /product/42, /product/anything`},{type:"heading",text:"13. Route Parameters with useParams"},{type:"code",code:`const { id } = useParams();
// if the URL is /product/42 then id = "42"`},{type:"heading",text:"14. Query Parameters"},{type:"paragraph",text:"For optional values like search: /search?q=shoes&page=2. Use useSearchParams. The URL becomes shareable and bookmarkable."},{type:"code",code:`const [searchParams, setSearchParams] = useSearchParams();
const q = searchParams.get("q") || "";
setSearchParams({ q: text, page: "1" });`},{type:"heading",text:"15. Not Found Page (404)"},{type:"code",code:'<Route path="*" element={<NotFound />} /> // matches everything else'},{type:"heading",text:"16. Protected Routes"},{type:"code",code:`function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
}`},{type:"heading",text:"17. Redirecting After Login"},{type:"paragraph",text:"When sending the user to login, remember where they were going (in state), and after login send them there instead of the home page."},{type:"code",code:`const from = location.state?.from || "/";
navigate(from, { replace: true });`},{type:"heading",text:"✅ Section Summary"},{type:"list",items:["Client-side routing switches components by URL without a reload","BrowserRouter, Routes, Route; layout routes with <Outlet />","<Link>/<NavLink> for navigation, useNavigate from code","Dynamic routes (:id) and useParams; query params for search"]},{type:"qa",question:"1. Why use <Link> instead of <a>?",answer:"<Link> changes the URL without a full reload, keeping React fast and state preserved."},{type:"qa",question:"2. What is the difference between a route param (:id) and a query param (?q=)?",answer:"A route param is part of the path and usually required (/product/42); a query param is optional after ?, great for search and filtering."}]};export{e as default};

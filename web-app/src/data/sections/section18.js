// القسم 18 — المشروع الثاني: لوحة بيانات API
export default {
  id: 18,
  title: "المشروع الثاني: لوحة بيانات API",
  level: "مشروع",
  lessons: [
    "نظرة عامة على المشروع",
    "بناء تخطيط اللوحة",
    "إنشاء بطاقات اللوحة",
    "جلب بيانات API بـ Axios",
    "حالة التحميل",
    "حالة الخطأ",
    "البحث والفلترة",
    "إنشاء صفحة التفاصيل",
    "مسار ديناميكي للتفاصيل",
    "إرسال بيانات مع navigate",
    "قراءة البيانات بـ useLocation",
    "بديل معاملات المسار",
    "هياكل التحميل (Skeletons)",
    "خدمة API قابلة لإعادة الاستخدام",
    "إعادة الهيكلة النهائية",
  ],
  intro:
    "مشروعنا الثاني يجلب بيانات حقيقية بـ Axios ويعرضها في لوحة أنيقة: بطاقات، وبحث، وصفحة تفاصيل، وهياكل تحميل، ومعالجة أخطاء سليمة. هذا نوع التطبيقات التي ستبنيها في عمل حقيقي.",
  content: [
    { type: "heading", text: "1. نظرة عامة على المشروع" },
    {
      type: "list",
      items: [
        "عرض المستخدمين كبطاقات",
        "بحث وفلترة بالاسم",
        "النقر على مستخدم لرؤية صفحة تفاصيله",
        "هياكل تحميل وواجهة أخطاء لطيفة",
      ],
    },
    {
      type: "code",
      code: `src/
├── App.jsx
├── services/api.js     ← نسخة axios + دوال
├── hooks/useFetch.jsx  ← تحميل/خطأ/بيانات (Axios)
├── pages/
│   ├── Dashboard.jsx
│   └── UserDetail.jsx
└── components/
    ├── UserCard.jsx
    ├── SearchBar.jsx
    ├── Skeleton.jsx
    └── ErrorMessage.jsx`,
    },

    { type: "heading", text: "2. بناء تخطيط اللوحة" },
    {
      type: "code",
      code: `<Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/users/:id" element={<UserDetail />} />
</Routes>`,
    },

    { type: "heading", text: "3. إنشاء بطاقات اللوحة" },
    {
      type: "paragraph",
      text: "البطاقة تعرض مستخدماً واحداً في صندوق أنيق وترتبط بصفحة تفاصيله. البطاقات تجعل القائمة سهلة المسح والنقر.",
    },
    {
      type: "code",
      code: `function UserCard({ user }) {
  return (
    <Link to={\`/users/\${user.id}\`} state={{ user }} className="card">
      <strong>{user.name}</strong>
      <div>{user.email}</div>
    </Link>
  );
}`,
    },

    { type: "heading", text: "4. جلب بيانات API بـ Axios" },
    {
      type: "code",
      code: `const { data: users, loading, error } = useFetch(URLS.users);`,
    },

    { type: "heading", text: "5. حالة التحميل" },
    {
      type: "code",
      code: `{loading && (
  <div><Skeleton /><Skeleton /><Skeleton /></div>
)}`,
    },

    { type: "heading", text: "6. حالة الخطأ" },
    {
      type: "code",
      code: `{error && <ErrorMessage message={error} onRetry={reload} />}`,
    },

    { type: "heading", text: "7. البحث والفلترة" },
    {
      type: "code",
      code: `const visibleUsers = (users || []).filter((user) =>
  user.name.toLowerCase().includes(search.toLowerCase())
);`,
    },

    { type: "heading", text: "8. إنشاء صفحة التفاصيل" },
    {
      type: "paragraph",
      text: "النقر على بطاقة ينتقل إلى /users/:id. صفحة التفاصيل تجلب وتعرض ذلك المستخدم الواحد.",
    },

    { type: "heading", text: "9. مسار ديناميكي للتفاصيل" },
    {
      type: "code",
      code: `<Route path="/users/:id" element={<UserDetail />} />`,
    },

    { type: "heading", text: "10. إرسال بيانات مع navigate" },
    {
      type: "paragraph",
      text: "بما أن بيانات المستخدم موجودة في اللوحة، نمرّرها مع الانتقال لتجنّب جلبها مرة أخرى.",
    },
    {
      type: "code",
      code: `navigate(\`/users/\${user.id}\`, { state: { user } });`,
    },

    { type: "heading", text: "11. قراءة البيانات بـ useLocation" },
    {
      type: "code",
      code: `const passedUser = location.state?.user;
const { data: fetchedUser } = useFetch(passedUser ? null : URLS.user(id));
const user = passedUser || fetchedUser;`,
    },

    { type: "heading", text: "12. بديل معاملات المسار" },
    {
      type: "paragraph",
      text: "إذا فتح المستخدم /users/5 مباشرةً (رابط مُشارَك)، لا يوجد state. فنرجع لمعاملات المسار + الجلب. المعاملات هي المصدر الموثوق دائماً.",
    },
    {
      type: "tip",
      text: "navigate state تسريع جميل، لكن معاملات المسار هي المصدر الموثوق — تعمل للروابط المشارَكة والمحفوظة.",
    },

    { type: "heading", text: "13. هياكل التحميل (Skeletons)" },
    {
      type: "paragraph",
      text: "الهيكل صندوق رمادي بشكل المحتوى الحقيقي. يخبر المستخدم أن المحتوى قادم، ويبقي التخطيط ثابتاً (بلا قفزات).",
    },

    { type: "heading", text: "14. خدمة API قابلة لإعادة الاستخدام" },
    {
      type: "code",
      code: `const api = axios.create({ baseURL: "https://..." });
export const URLS = { users: "/users", user: (id) => \`/users/\${id}\` };`,
    },

    { type: "heading", text: "15. إعادة الهيكلة النهائية" },
    {
      type: "list",
      items: [
        "كل منطق الجلب في services/api.js",
        "خطّاف useFetch (Axios) قابل لإعادة الاستخدام",
        "مكوّنات صغيرة ذات مهمّة واحدة",
        "حالة مشتقّة للبحث، و navigate state مع معاملات كبديل موثوق",
      ],
    },

    { type: "heading", text: "🎉 ما بنيته" },
    {
      type: "paragraph",
      text: "لوحة بيانات حقيقية بتوجيه وبحث وصفحات تفاصيل وهياكل تحميل ومعالجة أخطاء — جوهر عدد لا يُحصى من تطبيقات الإنتاج.",
    },
  ],
  titleEn: "Project 2: API Data Dashboard",
};

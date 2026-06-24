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
    "ملفات المشروع الكاملة",
  ],
  intro:
    "مشروعنا الثاني يجلب بيانات حقيقية بـ Axios ويعرضها في لوحة أنيقة: بطاقات، وبحث، وصفحة تفاصيل، وهياكل تحميل، ومعالجة أخطاء سليمة. هذا نوع التطبيقات التي ستبنيها في عمل حقيقي.",
  content: [
    { type: "heading", text: "1. نظرة عامة على المشروع" },
    {
      type: "paragraph",
      text: "خطّط للمزايا وهيكل الملفات قبل لمس الكود. معرفة مسؤولية كل ملف قبل إنشائه تمنع المعمارية المتشابكة.",
    },
    {
      type: "list",
      items: [
        "عرض المستخدمين كبطاقات مجلوبة من API عام",
        "بحث وفلترة بالاسم في الوقت الحقيقي",
        "النقر على بطاقة للانتقال إلى صفحة تفاصيل مخصّصة",
        "هياكل تحميل وواجهة أخطاء لطيفة مع زر إعادة المحاولة",
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
    {
      type: "tip",
      text: "افصل الاهتمامات من اليوم الأول: services/ لنداءات الشبكة، hooks/ للمنطق القابل لإعادة الاستخدام، pages/ لمكوّنات المسارات، components/ لقطع الواجهة.",
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
      type: "paragraph",
      text: "خطّاف useFetch المخصّص يغلّف منطق التحميل/الخطأ/البيانات، فيستطيع أي مكوّن يحتاج بيانات استخدامه في سطر واحد.",
    },
    {
      type: "code",
      code: `const { data: users, loading, error } = useFetch(URLS.users);`,
    },

    { type: "heading", text: "5. حالة التحميل" },
    {
      type: "paragraph",
      text: "أثناء تنفيذ الطلب، اعرض هياكل تحميل بدلاً من شاشة فارغة. الهياكل تحافظ على التخطيط وتُشعر المستخدم أن المحتوى قادم.",
    },
    {
      type: "code",
      code: `{loading && (
  <div><Skeleton /><Skeleton /><Skeleton /></div>
)}`,
    },

    { type: "heading", text: "6. حالة الخطأ" },
    {
      type: "paragraph",
      text: "طلبات الشبكة تفشل. اعرض رسالة مفهومة وزرّ إعادة محاولة — لا تترك المستخدم أمام شاشة فارغة دون مخرج.",
    },
    {
      type: "code",
      code: `{error && <ErrorMessage message={error} onRetry={reload} />}`,
    },

    { type: "heading", text: "7. البحث والفلترة" },
    {
      type: "paragraph",
      text: "البحث حالة مشتقّة — افلتر القائمة المجلوبة أثناء الرسم. لا تُرسل طلب شبكة جديداً مع كل ضغطة مفتاح.",
    },
    {
      type: "code",
      code: `const visibleUsers = (users || []).filter((user) =>
  user.name.toLowerCase().includes(search.toLowerCase())
);`,
    },
    {
      type: "tip",
      text: "‏users || [] يحمي من الحالة الأولية null قبل اكتمال أول جلب.",
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
      text: "لوحة بيانات حقيقية بتوجيه وبحث وصفحات تفاصيل وهياكل تحميل ومعالجة أخطاء — جوهر عدد لا يُحصى من تطبيقات الإنتاج. كل نمط هنا (الخطّافات المخصّصة، طبقة الخدمات، حالة التنقّل + المعاملات كبديل) يُستخدم في أكواد رياكت الاحترافية يومياً.",
    },
    {
      type: "qa",
      question: "1. لماذا يعيش useFetch في مجلد hooks/ بدلاً من داخل المكوّن؟",
      answer:
        "لأن منطق التحميل/الخطأ/البيانات واحد لكل جلب — استخراجه في خطّاف يعني أن تكتبه مرة وتستخدمه في كل مكان. ويبقى المكوّن مركّزاً على الرسم.",
    },
    {
      type: "qa",
      question: "2. لماذا نحتاج معاملات المسار كبديل إن كنا نمرّر البيانات عبر حالة التنقّل أصلاً؟",
      answer:
        "حالة التنقّل توجد فقط عند الوصول عبر تنقّل داخلي في نفس الجلسة. الرابط المُشارَك أو المحفوظ أو إعادة تحميل الصفحة لا يحمل state — معاملات المسار + جلب جديد هي الطريق الوحيد لتحميل البيانات الصحيحة.",
    },

    { type: "heading", text: "ملفات المشروع الكاملة" },
    {
      type: "paragraph",
      text: "فيما يلي الكود الكامل لكل ملف في المشروع. كل مقطع مُعنوَن باسم الملف الذي ينتمي إليه.",
    },

    { type: "heading", text: "services/api.js" },
    {
      type: "code",
      code: `// services/api.js
import axios from "axios";

const BASE = "https://jsonplaceholder.typicode.com";

const api = axios.create({ baseURL: BASE });

export async function getUsers() {
  const { data } = await api.get("/users");
  return data;
}

export async function getUser(id) {
  const { data } = await api.get(\`/users/\${id}\`);
  return data;
}

export const URLS = {
  users: \`\${BASE}/users\`,
  user: (id) => \`\${BASE}/users/\${id}\`,
};

export default api;`,
    },

    { type: "heading", text: "hooks/useFetch.jsx" },
    {
      type: "code",
      code: `// hooks/useFetch.jsx
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!url) return;
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load };
}

export default useFetch;`,
    },

    { type: "heading", text: "components/ErrorMessage.jsx" },
    {
      type: "code",
      code: `// components/ErrorMessage.jsx
function ErrorMessage({ message, onRetry }) {
  return (
    <div
      style={{
        padding: 16,
        margin: "12px 0",
        background: "#fcdcdc",
        color: "#b00020",
        borderRadius: 8,
      }}
    >
      <p>⚠️ {message}</p>
      {onRetry && <button onClick={onRetry}>Try again</button>}
    </div>
  );
}

export default ErrorMessage;`,
    },

    { type: "heading", text: "components/Skeleton.jsx" },
    {
      type: "code",
      code: `// components/Skeleton.jsx
function Skeleton() {
  return (
    <div
      style={{
        height: 60,
        margin: "8px 0",
        borderRadius: 8,
        background: "linear-gradient(90deg, #eee, #f5f5f5, #eee)",
        backgroundSize: "200% 100%",
        animation: "pulse 1.2s ease-in-out infinite",
      }}
    />
  );
}

export default Skeleton;`,
    },

    { type: "heading", text: "components/SearchBar.jsx" },
    {
      type: "code",
      code: `// components/SearchBar.jsx
function SearchBar({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by name..."
      style={{
        width: "100%",
        padding: 10,
        margin: "12px 0",
        boxSizing: "border-box",
      }}
    />
  );
}

export default SearchBar;`,
    },

    { type: "heading", text: "components/UserCard.jsx" },
    {
      type: "code",
      code: `// components/UserCard.jsx
import { Link } from "react-router-dom";

function UserCard({ user }) {
  return (
    <Link
      to={\`/users/\${user.id}\`}
      state={{ user }}
      style={{
        display: "block",
        padding: 12,
        margin: "8px 0",
        border: "1px solid #ddd",
        borderRadius: 8,
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <strong>{user.name}</strong>
      <div style={{ color: "#666", fontSize: 14 }}>{user.email}</div>
    </Link>
  );
}

export default UserCard;`,
    },

    { type: "heading", text: "pages/Dashboard.jsx" },
    {
      type: "code",
      code: `// pages/Dashboard.jsx
import { useState } from "react";
import useFetch from "../hooks/useFetch.jsx";
import { URLS } from "../services/api.js";
import SearchBar from "../components/SearchBar.jsx";
import UserCard from "../components/UserCard.jsx";
import Skeleton from "../components/Skeleton.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

function Dashboard() {
  const { data: users, loading, error, reload } = useFetch(URLS.users);
  const [search, setSearch] = useState("");

  const visibleUsers = (users || []).filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h1>Users Dashboard</h1>
      <SearchBar value={search} onChange={setSearch} />

      {loading && (
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      )}

      {error && <ErrorMessage message={error} onRetry={reload} />}

      {!loading &&
        !error &&
        visibleUsers.map((user) => <UserCard key={user.id} user={user} />)}

      {!loading && !error && visibleUsers.length === 0 && (
        <p>No users match your search.</p>
      )}
    </div>
  );
}

export default Dashboard;`,
    },

    { type: "heading", text: "pages/UserDetail.jsx" },
    {
      type: "code",
      code: `// pages/UserDetail.jsx
import { useParams, useLocation, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch.jsx";
import { URLS } from "../services/api.js";
import Skeleton from "../components/Skeleton.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

function UserDetail() {
  const { id } = useParams();
  const location = useLocation();
  const passedUser = location.state?.user;

  const { data: fetchedUser, loading, error, reload } = useFetch(
    passedUser ? null : URLS.user(id)
  );

  const user = passedUser || fetchedUser;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <Link to="/">← Back to list</Link>

      {loading && <Skeleton />}
      {error && <ErrorMessage message={error} onRetry={reload} />}

      {user && (
        <div>
          <h1>{user.name}</h1>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
          <p>Company: {user.company?.name}</p>
          <p>City: {user.address?.city}</p>
        </div>
      )}
    </div>
  );
}

export default UserDetail;`,
    },

    { type: "heading", text: "App.jsx" },
    {
      type: "code",
      code: `// App.jsx
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import UserDetail from "./pages/UserDetail.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/users/:id" element={<UserDetail />} />
    </Routes>
  );
}

export default App;`,
    },
  ],
  titleEn: "Project 2: API Data Dashboard",
  levelEn: "Project",
  lessonsEn: [
    "Project Overview",
    "Building the Dashboard Layout",
    "Creating Dashboard Cards",
    "Fetching API Data with Axios",
    "Loading State",
    "Error State",
    "Search and Filter",
    "Creating the Detail Page",
    "Dynamic Route for Details",
    "Passing Data with navigate",
    "Reading Data with useLocation",
    "Route Params as Fallback",
    "Loading Skeletons",
    "Reusable API Service",
    "Final Refactor",
    "Complete Project Files",
  ],
  introEn:
    "Our second project fetches real data with Axios and displays it in a polished dashboard: cards, search, a detail page, loading skeletons, and proper error handling. This is the kind of app you'll build in a real job.",
  contentEn: [
    { type: "heading", text: "1. Project Overview" },
    {
      type: "paragraph",
      text: "Plan the features and file structure before touching code. Knowing what each file is responsible for before you create it prevents spaghetti architecture.",
    },
    {
      type: "list",
      items: [
        "Display users as cards fetched from a public API",
        "Search and filter by name in real time",
        "Click a card to navigate to a dedicated detail page",
        "Loading skeletons and a friendly error UI with a retry button",
      ],
    },
    {
      type: "code",
      code: `src/
├── App.jsx
├── services/api.js     ← axios instance + URL constants
├── hooks/useFetch.jsx  ← loading/error/data (Axios-based)
├── pages/
│   ├── Dashboard.jsx
│   └── UserDetail.jsx
└── components/
    ├── UserCard.jsx
    ├── SearchBar.jsx
    ├── Skeleton.jsx
    └── ErrorMessage.jsx`,
    },
    {
      type: "tip",
      text: "Separate concerns from day one: services/ for network calls, hooks/ for reusable logic, pages/ for route-level components, components/ for UI building blocks.",
    },

    { type: "heading", text: "2. Building the Dashboard Layout" },
    {
      type: "paragraph",
      text: "Set up React Router so the app has two routes: the main dashboard and an individual user detail page.",
    },
    {
      type: "code",
      code: `// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard  from "./pages/Dashboard";
import UserDetail from "./pages/UserDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<Dashboard />} />
        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </BrowserRouter>
  );
}`,
    },

    { type: "heading", text: "3. Creating Dashboard Cards" },
    {
      type: "paragraph",
      text: "Each card displays one user and links to their detail page. Cards make a list easy to scan and click — use the Link component so the URL updates and the browser back button works.",
    },
    {
      type: "code",
      code: `// components/UserCard.jsx
import { Link } from "react-router-dom";

function UserCard({ user }) {
  return (
    <Link to={\`/users/\${user.id}\`} state={{ user }} className="card">
      <strong>{user.name}</strong>
      <div>{user.email}</div>
      <div>{user.company.name}</div>
    </Link>
  );
}`,
    },
    {
      type: "tip",
      text: "Passing state={{ user }} with Link avoids a second network request when the user navigates to the detail page — the data is already in memory.",
    },

    { type: "heading", text: "4. Fetching API Data with Axios" },
    {
      type: "paragraph",
      text: "A custom useFetch hook encapsulates loading/error/data logic so every component that needs data can use it in one line.",
    },
    {
      type: "code",
      code: `// hooks/useFetch.jsx
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export function useFetch(url) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error,   setError]   = useState(null);

  const load = useCallback(async () => {
    if (!url) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => { load(); }, [load]);

  return { data, loading, error, reload: load };
}`,
    },
    {
      type: "code",
      code: `// Usage in Dashboard.jsx
const { data: users, loading, error, reload } = useFetch(URLS.users);`,
    },

    { type: "heading", text: "5. Loading State" },
    {
      type: "paragraph",
      text: "While the request is in-flight, show skeleton placeholders instead of a blank screen. Skeletons preserve the layout and signal to the user that content is coming.",
    },
    {
      type: "code",
      code: `{loading && (
  <div className="grid">
    <Skeleton /><Skeleton /><Skeleton />
    <Skeleton /><Skeleton /><Skeleton />
  </div>
)}`,
    },

    { type: "heading", text: "6. Error State" },
    {
      type: "paragraph",
      text: "Network requests fail. Show a human-readable message and a retry button — never leave the user staring at a blank screen with no way forward.",
    },
    {
      type: "code",
      code: `{error && (
  <ErrorMessage
    message={error}
    onRetry={reload}
  />
)}

// components/ErrorMessage.jsx
function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-box">
      <p>Error: {message}</p>
      <button onClick={onRetry}>Try again</button>
    </div>
  );
}`,
    },

    { type: "heading", text: "7. Search and Filter" },
    {
      type: "paragraph",
      text: "Search is derived state — filter the fetched list during render. Do NOT make a new network request on every keystroke.",
    },
    {
      type: "code",
      code: `const [search, setSearch] = useState("");

const visibleUsers = (users || []).filter((user) =>
  user.name.toLowerCase().includes(search.toLowerCase())
);

// In JSX:
<SearchBar value={search} onChange={setSearch} />
<div className="grid">
  {visibleUsers.map((user) => <UserCard key={user.id} user={user} />)}
</div>`,
    },
    {
      type: "tip",
      text: "users || [] guards against the null initial state before the first fetch completes.",
    },

    { type: "heading", text: "8. Creating the Detail Page" },
    {
      type: "paragraph",
      text: "UserDetail shows all fields for one user. It has two data sources: navigation state (fast, no request) and a fresh fetch (for direct URLs or page refreshes).",
    },
    {
      type: "code",
      code: `// pages/UserDetail.jsx
import { useParams, useLocation } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { URLS } from "../services/api";

function UserDetail() {
  const { id } = useParams();
  const { state } = useLocation();

  const passedUser = state?.user;
  const { data: fetchedUser, loading, error } = useFetch(
    passedUser ? null : URLS.user(id)  // skip fetch if data is already here
  );
  const user = passedUser || fetchedUser;

  if (loading) return <Skeleton />;
  if (error)   return <ErrorMessage message={error} />;
  if (!user)   return null;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <p>{user.website}</p>
    </div>
  );
}`,
    },

    { type: "heading", text: "9. Dynamic Route for Details" },
    {
      type: "paragraph",
      text: ":id in the route path is a URL parameter. React Router captures whatever is in that segment and makes it available via useParams().",
    },
    {
      type: "code",
      code: `// Route definition
<Route path="/users/:id" element={<UserDetail />} />

// In UserDetail.jsx
const { id } = useParams();   // "5" when URL is /users/5`,
    },

    { type: "heading", text: "10. Passing Data with navigate" },
    {
      type: "paragraph",
      text: "If you navigate programmatically (not via Link), you can still pass state the same way. This is useful when the navigation is triggered by a button click with extra logic.",
    },
    {
      type: "code",
      code: `import { useNavigate } from "react-router-dom";
const navigate = useNavigate();

function handleCardClick(user) {
  navigate(\`/users/\${user.id}\`, { state: { user } });
}`,
    },

    { type: "heading", text: "11. Reading Data with useLocation" },
    {
      type: "paragraph",
      text: "useLocation gives you the current location object, including the state passed via Link or navigate. Use optional chaining because state is null when the page is opened directly.",
    },
    {
      type: "code",
      code: `const { state } = useLocation();
const passedUser = state?.user;              // may be undefined

const { data: fetchedUser } = useFetch(
  passedUser ? null : URLS.user(id)          // skip fetch if we have data
);
const user = passedUser || fetchedUser;      // prefer passed, fallback to fetched`,
    },

    { type: "heading", text: "12. Route Params as Fallback" },
    {
      type: "paragraph",
      text: "Navigation state only exists if the user came from the dashboard in the same session. If they open /users/5 directly (shared link, bookmark, refresh), state is null. Route params + a fresh fetch are the reliable fallback.",
    },
    {
      type: "tip",
      text: "Rule: route params are the source of truth — they work for shared URLs and bookmarks. Navigation state is a performance shortcut, not a replacement.",
    },

    { type: "heading", text: "13. Loading Skeletons" },
    {
      type: "paragraph",
      text: "A skeleton is a grey box that mimics the shape of the real content. It communicates 'content is loading' without the jarring layout shift of a spinner that takes up no space.",
    },
    {
      type: "code",
      code: `// components/Skeleton.jsx
function Skeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-line title" />
      <div className="skeleton-line" />
      <div className="skeleton-line short" />
    </div>
  );
}

/* CSS */
.skeleton-line {
  background: #e0e0e0;
  border-radius: 4px;
  height: 14px;
  margin-bottom: 8px;
  animation: pulse 1.4s ease-in-out infinite;
}`,
    },

    { type: "heading", text: "14. Reusable API Service" },
    {
      type: "paragraph",
      text: "Centralise all network configuration in one file. This means one place to add auth headers, base URLs, or interceptors — not scattered across every component.",
    },
    {
      type: "code",
      code: `// services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 8000,
});

export const URLS = {
  users:      "/users",
  user: (id) => \`/users/\${id}\`,
  posts:      "/posts",
};

export default api;`,
    },

    { type: "heading", text: "15. Final Refactor" },
    {
      type: "paragraph",
      text: "Walk through the codebase and verify that every file has a clear, single responsibility.",
    },
    {
      type: "list",
      items: [
        "services/api.js owns all network configuration — components never import axios directly",
        "useFetch is a generic, reusable hook — works for any URL, any data shape",
        "Small components: UserCard, Skeleton, ErrorMessage each do one thing",
        "Derived state for search — no extra network calls",
        "navigation state + route params fallback — works for both in-app navigation and direct URLs",
      ],
    },

    { type: "heading", text: "What You Built" },
    {
      type: "paragraph",
      text: "A real data dashboard with routing, search, detail pages, loading skeletons, and error handling — the core of countless production apps. Every pattern here (custom hooks, services layer, navigation state + params fallback) is used in professional React codebases daily.",
    },
    {
      type: "qa",
      question: "1. Why does useFetch live in a hooks/ folder instead of inside the component?",
      answer:
        "Because loading/error/data logic is the same for every fetch — extracting it into a hook means you write it once and use it everywhere. The component stays focused on rendering.",
    },
    {
      type: "qa",
      question: "2. Why do we need route params as a fallback if we already pass data via navigation state?",
      answer:
        "Navigation state only exists when the user arrived via in-app navigation in the same session. A shared link, bookmark, or page refresh has no state — route params + a fresh fetch are the only way to load the right data.",
    },

    { type: "heading", text: "Complete Project Files" },
    {
      type: "paragraph",
      text: "Below is the full code for every file in the project. Each snippet is labeled with the file name it belongs to.",
    },

    { type: "heading", text: "services/api.js" },
    {
      type: "code",
      code: `// services/api.js
import axios from "axios";

const BASE = "https://jsonplaceholder.typicode.com";

const api = axios.create({ baseURL: BASE });

export async function getUsers() {
  const { data } = await api.get("/users");
  return data;
}

export async function getUser(id) {
  const { data } = await api.get(\`/users/\${id}\`);
  return data;
}

export const URLS = {
  users: \`\${BASE}/users\`,
  user: (id) => \`\${BASE}/users/\${id}\`,
};

export default api;`,
    },

    { type: "heading", text: "hooks/useFetch.jsx" },
    {
      type: "code",
      code: `// hooks/useFetch.jsx
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!url) return;
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load };
}

export default useFetch;`,
    },

    { type: "heading", text: "components/ErrorMessage.jsx" },
    {
      type: "code",
      code: `// components/ErrorMessage.jsx
function ErrorMessage({ message, onRetry }) {
  return (
    <div
      style={{
        padding: 16,
        margin: "12px 0",
        background: "#fcdcdc",
        color: "#b00020",
        borderRadius: 8,
      }}
    >
      <p>⚠️ {message}</p>
      {onRetry && <button onClick={onRetry}>Try again</button>}
    </div>
  );
}

export default ErrorMessage;`,
    },

    { type: "heading", text: "components/Skeleton.jsx" },
    {
      type: "code",
      code: `// components/Skeleton.jsx
function Skeleton() {
  return (
    <div
      style={{
        height: 60,
        margin: "8px 0",
        borderRadius: 8,
        background: "linear-gradient(90deg, #eee, #f5f5f5, #eee)",
        backgroundSize: "200% 100%",
        animation: "pulse 1.2s ease-in-out infinite",
      }}
    />
  );
}

export default Skeleton;`,
    },

    { type: "heading", text: "components/SearchBar.jsx" },
    {
      type: "code",
      code: `// components/SearchBar.jsx
function SearchBar({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by name..."
      style={{
        width: "100%",
        padding: 10,
        margin: "12px 0",
        boxSizing: "border-box",
      }}
    />
  );
}

export default SearchBar;`,
    },

    { type: "heading", text: "components/UserCard.jsx" },
    {
      type: "code",
      code: `// components/UserCard.jsx
import { Link } from "react-router-dom";

function UserCard({ user }) {
  return (
    <Link
      to={\`/users/\${user.id}\`}
      state={{ user }}
      style={{
        display: "block",
        padding: 12,
        margin: "8px 0",
        border: "1px solid #ddd",
        borderRadius: 8,
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <strong>{user.name}</strong>
      <div style={{ color: "#666", fontSize: 14 }}>{user.email}</div>
    </Link>
  );
}

export default UserCard;`,
    },

    { type: "heading", text: "pages/Dashboard.jsx" },
    {
      type: "code",
      code: `// pages/Dashboard.jsx
import { useState } from "react";
import useFetch from "../hooks/useFetch.jsx";
import { URLS } from "../services/api.js";
import SearchBar from "../components/SearchBar.jsx";
import UserCard from "../components/UserCard.jsx";
import Skeleton from "../components/Skeleton.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

function Dashboard() {
  const { data: users, loading, error, reload } = useFetch(URLS.users);
  const [search, setSearch] = useState("");

  const visibleUsers = (users || []).filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h1>Users Dashboard</h1>
      <SearchBar value={search} onChange={setSearch} />

      {loading && (
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      )}

      {error && <ErrorMessage message={error} onRetry={reload} />}

      {!loading &&
        !error &&
        visibleUsers.map((user) => <UserCard key={user.id} user={user} />)}

      {!loading && !error && visibleUsers.length === 0 && (
        <p>No users match your search.</p>
      )}
    </div>
  );
}

export default Dashboard;`,
    },

    { type: "heading", text: "pages/UserDetail.jsx" },
    {
      type: "code",
      code: `// pages/UserDetail.jsx
import { useParams, useLocation, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch.jsx";
import { URLS } from "../services/api.js";
import Skeleton from "../components/Skeleton.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

function UserDetail() {
  const { id } = useParams();
  const location = useLocation();
  const passedUser = location.state?.user;

  const { data: fetchedUser, loading, error, reload } = useFetch(
    passedUser ? null : URLS.user(id)
  );

  const user = passedUser || fetchedUser;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <Link to="/">← Back to list</Link>

      {loading && <Skeleton />}
      {error && <ErrorMessage message={error} onRetry={reload} />}

      {user && (
        <div>
          <h1>{user.name}</h1>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
          <p>Company: {user.company?.name}</p>
          <p>City: {user.address?.city}</p>
        </div>
      )}
    </div>
  );
}

export default UserDetail;`,
    },

    { type: "heading", text: "App.jsx" },
    {
      type: "code",
      code: `// App.jsx
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import UserDetail from "./pages/UserDetail.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/users/:id" element={<UserDetail />} />
    </Routes>
  );
}

export default App;`,
    },
  ],
};

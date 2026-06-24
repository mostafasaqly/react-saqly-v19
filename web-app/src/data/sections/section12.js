// القسم 12 — جلب البيانات و Axios
export default {
  id: 12,
  title: "جلب البيانات و Axios",
  level: "متوسط",
  lessons: [
    "أساسيات Fetch API",
    "حالات التحميل والخطأ",
    "مقدّمة عن Axios",
    "تثبيت Axios",
    "طلبات GET بـ Axios",
    "طلبات POST بـ Axios",
    "طلبات PUT و PATCH",
    "طلبات DELETE",
    "إنشاء خدمة API قابلة لإعادة الاستخدام",
    "العمل مع REST APIs",
    "عمليات CRUD",
    "معالجة أخطاء API",
    "متغيّرات البيئة لعناوين API",
    "خطّاف جلب بيانات قابل لإعادة الاستخدام",
  ],
  intro:
    "معظم التطبيقات تعرض بيانات من خادم. نبدأ بـ fetch المدمج، ثم نتعلّم Axios — مكتبة شهيرة تجعل الطلبات أقصر وأنظف. وننهي بخدمات وخطّافات قابلة لإعادة الاستخدام.",
  content: [
    { type: "heading", text: "1. أساسيات Fetch API" },
    {
      type: "paragraph",
      text: "fetch دالة مدمجة في المتصفح للتحدّث مع الخوادم. تُرجع وعداً (Promise) فنستخدم async/await. خطوتان دائماً: await fetch(url) ثم await res.json().",
    },
    {
      type: "warning",
      text: "fetch لا يرمي خطأً على 404 أو 500. يجب أن تفحص res.ok بنفسك.",
    },

    { type: "heading", text: "2. حالات التحميل والخطأ" },
    {
      type: "paragraph",
      text: "تعامل دائماً مع الحالات الثلاث: تحميل، خطأ، بيانات.",
    },
    {
      type: "code",
      code: `if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error}</p>;
return <DataView data={data} />;`,
    },

    { type: "heading", text: "3. مقدّمة عن Axios" },
    {
      type: "paragraph",
      text: "Axios مكتبة صغيرة تبسّط الطلبات: تحوّل JSON تلقائياً (البيانات في res.data)، ترمي على الأخطاء تلقائياً، POST أقصر، وتدعم عناوين أساسية (base URL).",
    },
    {
      type: "code",
      code: `// fetch
const res = await fetch(url);
if (!res.ok) throw new Error("Failed");
const data = await res.json();

// axios — أقصر، والأخطاء تُرمى تلقائياً
const { data } = await axios.get(url);`,
    },

    { type: "heading", text: "4. تثبيت Axios" },
    { type: "code", code: `npm install axios` },

    { type: "heading", text: "5. طلبات GET بـ Axios" },
    {
      type: "code",
      code: `const response = await axios.get(url);
return response.data; // JSON محلّل بالفعل`,
    },

    { type: "heading", text: "6. طلبات POST بـ Axios" },
    {
      type: "paragraph",
      text: "مرّر الجسم كوسيط ثانٍ — Axios يحوّله ويضبط الترويسات تلقائياً.",
    },
    { type: "code", code: `const { data } = await axios.post(url, { title });` },

    { type: "heading", text: "7. طلبات PUT و PATCH" },
    {
      type: "code",
      code: `await axios.put(\`\${API}/posts/1\`, { title, body }); // استبدال كامل
await axios.patch(\`\${API}/posts/1\`, { title });       // تعديل جزئي`,
    },

    { type: "heading", text: "8. طلبات DELETE" },
    { type: "code", code: `await axios.delete(\`\${API}/posts/\${id}\`);` },

    { type: "heading", text: "9. إنشاء خدمة API قابلة لإعادة الاستخدام" },
    {
      type: "paragraph",
      text: "أنشئ نسخة axios واحدة بعنوان أساسي، ثم ابنِ دوالاً صغيرة فوقها. العنوان الأساسي يعيش في مكان واحد.",
    },
    {
      type: "code",
      code: `const api = axios.create({ baseURL: "https://..." });
export const getPosts = () => api.get("/posts").then((r) => r.data);`,
    },

    { type: "heading", text: "10. العمل مع REST APIs" },
    {
      type: "list",
      items: [
        "GET → قراءة → axios.get(url)",
        "POST → إنشاء → axios.post(url, data)",
        "PUT/PATCH → تحديث → axios.put(url, data)",
        "DELETE → حذف → axios.delete(url)",
      ],
    },

    { type: "heading", text: "11. عمليات CRUD" },
    {
      type: "paragraph",
      text: "CRUD = إنشاء، قراءة، تحديث، حذف — الأربعة معاً مع خدمتك. نستخدمها كاملة في المشاريع (الأقسام 17–19).",
    },

    { type: "heading", text: "12. معالجة أخطاء API" },
    {
      type: "code",
      code: `try {
  const { data } = await axios.get("/posts");
} catch (err) {
  if (err.response) setError(\`خطأ الخادم: \${err.response.status}\`);
  else if (err.request) setError("لا استجابة. تحقّق من الاتصال.");
  else setError("حدث خطأ ما.");
}`,
    },

    { type: "heading", text: "13. متغيّرات البيئة لعناوين API" },
    {
      type: "paragraph",
      text: "عنوان API يختلف بين جهازك والموقع المباشر. لا تكتبه ثابتاً. في Vite يجب أن يبدأ المتغيّر بـ VITE_.",
    },
    {
      type: "code",
      code: `// .env
VITE_API_URL=https://...

// الاستخدام:
axios.create({ baseURL: import.meta.env.VITE_API_URL });`,
    },
    {
      type: "warning",
      text: "متغيّرات البيئة في الواجهة مرئية للمستخدمين — قيم عامة فقط، لا أسرار.",
    },

    { type: "heading", text: "14. خطّاف جلب بيانات قابل لإعادة الاستخدام" },
    {
      type: "code",
      code: `function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let active = true;
    axios.get(url)
      .then((res) => active && setData(res.data))
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [url]);
  return { data, loading, error };
}`,
    },

    { type: "heading", text: "✅ ملخص القسم" },
    {
      type: "list",
      items: [
        "fetch يُرجع وعداً؛ افحص res.ok",
        "Axios أقصر: البيانات في res.data، يحلّل JSON، يرمي على الأخطاء",
        "GET/POST/PUT/DELETE تغطّي CRUD",
        "ضع كل النداءات في خدمة واحدة، وعنوان API في .env",
      ],
    },
    {
      type: "qa",
      question: "1. اذكر شيئين يفعلهما Axios ولا يفعلهما fetch.",
      answer:
        "يحلّل JSON تلقائياً، ويرمي على أخطاء HTTP تلقائياً (ويمكن تمرير الجسم مباشرةً).",
    },
    {
      type: "qa",
      question: "2. أين توجد بيانات الاستجابة في نداء Axios؟",
      answer: "في response.data (غالباً نفكّكها: const { data } = await axios.get(url)).",
    },
  ],
  titleEn: "Data Fetching }; Axios",
};

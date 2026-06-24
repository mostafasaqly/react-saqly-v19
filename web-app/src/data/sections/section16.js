// القسم 16 — الأداء وأفضل الممارسات
export default {
  id: 16,
  title: "الأداء وأفضل الممارسات",
  level: "متوسط إلى متقدّم",
  lessons: [
    "أساسيات الرسم في رياكت",
    "لماذا تعيد المكوّنات الرسم",
    "تجنّب إعادة الرسم غير الضرورية",
    "React.memo",
    "useMemo",
    "useCallback",
    "memo مقابل useMemo مقابل useCallback",
    "متى لا تستخدم الـ memoization",
    "نظرة عامة على مُترجِم رياكت",
    "تقسيم الكود بالتحميل الكسول",
    "lazy و Suspense",
    "أفضل ممارسات هيكل المجلدات",
    "تصميم مكوّنات نظيف",
  ],
  intro:
    "تطبيقك يعمل — الآن لنجعله سريعاً ونظيفاً. هذا القسم يشرح لماذا يعيد رياكت الرسم، وكيف نتجنّب العمل الزائد، وكيف يقوم مُترجِم رياكت 19 بمعظم ذلك نيابةً عنك، وكيف تنظّم المشروع جيّداً.",
  content: [
    { type: "heading", text: "1. أساسيات الرسم في رياكت" },
    {
      type: "paragraph",
      text: "«الرسم» يعني أن رياكت يشغّل دالة المكوّن لمعرفة الواجهة. الرسم رخيص عادةً. التكلفة تأتي عندما ترسم مكوّنات كثيرة كثيراً دون سبب.",
    },
    {
      type: "tip",
      text: "لا تُحسّن مبكّراً. معظم التطبيقات سريعة بلا حيل. قِس أولاً (Profiler)، ثم حسّن البطيء.",
    },

    { type: "heading", text: "2. لماذا تعيد المكوّنات الرسم" },
    {
      type: "list",
      items: [
        "تغيّر حالتها",
        "تغيّر خصائصها (props)",
        "إعادة رسم الأب — كل الأبناء يعيدون الرسم حتى لو لم تتغيّر props",
      ],
    },

    { type: "heading", text: "3. تجنّب إعادة الرسم غير الضرورية" },
    {
      type: "list",
      items: [
        "React.memo — يتخطّى إعادة رسم مكوّن إن لم تتغيّر props",
        "useMemo — يخزّن قيمة محسوبة مكلفة",
        "useCallback — يخزّن دالة لئلا تُعاد كل رسم",
      ],
    },

    { type: "heading", text: "4. React.memo" },
    {
      type: "code",
      code: `const ExpensiveList = memo(function ExpensiveList({ items }) {
  return <ul>{items.map((i) => <li key={i.id}>{i.name}</li>)}</ul>;
});`,
    },

    { type: "heading", text: "5. useMemo" },
    {
      type: "code",
      code: `const filtered = useMemo(() => {
  return products.filter((p) => p.name.includes(search));
}, [products, search]);`,
    },

    { type: "heading", text: "6. useCallback" },
    {
      type: "code",
      code: `const handleClick = useCallback(() => {
  console.log("clicked");
}, []); // لا اعتماديّات → لا يُعاد إنشاؤها`,
    },

    { type: "heading", text: "7. memo مقابل useMemo مقابل useCallback" },
    {
      type: "list",
      items: [
        "memo: يغلّف مكوّناً — عند props ثابتة",
        "useMemo: يخزّن قيمة — عند حساب مكلف يتكرّر",
        "useCallback: يخزّن دالة — عند تمرير دالة لابن memo",
      ],
    },
    {
      type: "tip",
      text: "اختصار: useCallback(fn, deps) يساوي useMemo(() => fn, deps).",
    },

    { type: "heading", text: "8. متى لا تستخدم الـ memoization" },
    {
      type: "list",
      items: [
        "إذا كان المكوّن/الحساب رخيصاً أصلاً (معظمها كذلك)",
        "إذا تغيّرت props كل رسم على أي حال",
        "إذا أضفته «تحسّباً» دون قياس",
      ],
    },
    {
      type: "warning",
      text: "التحسين المبكّر يجعل الكود أصعب قراءةً بلا فائدة حقيقية. قِس أولاً.",
    },

    { type: "heading", text: "9. نظرة عامة على مُترجِم رياكت" },
    {
      type: "paragraph",
      text: "مُترجِم رياكت أداة وقت بناء تقوم بكل أعمال memo/useMemo/useCallback تلقائياً. يقرأ مكوّناتك ويفهم الاعتماديّات ويضيف التحسين بنفسه. تكتب كوداً أبسط، والمُترجِم يجعله سريعاً.",
    },

    { type: "heading", text: "10. تقسيم الكود بالتحميل الكسول" },
    {
      type: "code",
      code: `const Dashboard = lazy(() => import("./Dashboard.jsx"));`,
    },
    {
      type: "paragraph",
      text: "حمّل المكوّن فقط عند الحاجة. قويّ جداً مع التوجيه: حمّل كل مسار بشكل كسول.",
    },

    { type: "heading", text: "11. lazy و Suspense" },
    {
      type: "code",
      code: `<Suspense fallback={<p>Loading page...</p>}>
  <Dashboard />
</Suspense>`,
    },

    { type: "heading", text: "12. أفضل ممارسات هيكل المجلدات" },
    {
      type: "code",
      code: `src/
├── components/   ← قطع واجهة قابلة لإعادة الاستخدام
├── pages/        ← مكوّن لكل مسار
├── features/     ← مجلدات الميزات (cart/, auth/)
├── hooks/        ← خطّافات مخصّصة
├── services/     ← نداءات API
├── store/        ← متجر Redux والشرائح
└── utils/        ← مساعدات صغيرة`,
    },

    { type: "heading", text: "13. تصميم مكوّنات نظيف" },
    {
      type: "list",
      items: [
        "مهمّة واحدة لكل مكوّن",
        "صغير ومركّز",
        "props للداخل، أحداث للخارج",
        "افصل المنطق عن الواجهة (خطّافات مخصّصة)",
        "اشتقّ ولا تكرّر، وسمِّ الأشياء بوضوح",
      ],
    },

    { type: "heading", text: "✅ ملخص القسم" },
    {
      type: "list",
      items: [
        "المكوّنات تعيد الرسم عند تغيّر الحالة أو props أو الأب",
        "memo يتخطّى مكوّناً، useMemo يخزّن قيمة، useCallback يخزّن دالة",
        "لا تُحسّن الرخيص — قِس أولاً",
        "مُترجِم رياكت يؤتمت الـ memoization، و lazy يقسّم الكود",
      ],
    },
    {
      type: "qa",
      question: "1. اذكر ثلاثة أسباب لإعادة رسم المكوّن.",
      answer: "تغيّر حالته، أو تغيّر props، أو إعادة رسم الأب.",
    },
    {
      type: "qa",
      question: "2. ما الفرق بين useMemo و useCallback؟",
      answer: "useMemo يخزّن قيمة محسوبة؛ useCallback يخزّن دالة.",
    },
  ],
  titleEn: "Performance }; Best Practices",
};

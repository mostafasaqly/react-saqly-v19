// القسم 2 — إعداد بيئة التطوير
export default {
  id: 2,
  title: "إعداد بيئة التطوير",
  level: "مبتدئ",
  lessons: [
    "تثبيت Node.js و npm",
    "إنشاء مشروع رياكت 19 بـ Vite",
    "هيكل مجلدات المشروع",
    "تشغيل خادم التطوير",
    "بناء التطبيق للإنتاج",
    "إضافات VS Code المقترحة",
    "تثبيت React Developer Tools",
  ],
  intro:
    "قبل أن نكتب رياكت، نحتاج إلى إعداد الجهاز. في هذا القسم نثبّت الأدوات، وننشئ مشروعاً جديداً، ونشغّله، ونبنيه.",
  content: [
    { type: "heading", text: "1. تثبيت Node.js و npm" },
    {
      type: "paragraph",
      text: "Node.js يتيح تشغيل جافاسكريبت على جهازك، ومعه يأتي npm الذي يحمّل الحزم ويديرها. حمّل إصدار LTS (المستقر) من nodejs.org وثبّته.",
    },
    {
      type: "code",
      code: `node -v
npm -v
# يجب أن ترى أرقام إصدارات، مثل:
# v22.11.0
# 10.9.0`,
    },

    { type: "heading", text: "2. إنشاء مشروع رياكت 19 بـ Vite" },
    {
      type: "paragraph",
      text: "Vite (تُنطق «ڤيت») أداة سريعة تنشئ مشاريع رياكت وتشغّلها. شغّل الأمر التالي، واختر React ثم JavaScript:",
    },
    {
      type: "code",
      code: `npm create vite@latest my-react-app
cd my-react-app
npm install`,
    },
    {
      type: "warning",
      text: "تأكّد أن إصدار react و react-dom في ملف package.json يبدأ بـ 19.",
    },

    { type: "heading", text: "3. هيكل مجلدات المشروع" },
    {
      type: "code",
      code: `my-react-app/
├── node_modules/   ← الحزم (لا تلمسها)
├── public/         ← ملفات ثابتة
├── src/            ← كودك يعيش هنا
│   ├── App.jsx     ← المكوّن الرئيسي
│   ├── main.jsx    ← نقطة البداية
│   └── index.css   ← أنماط عامة
├── index.html      ← الصفحة الوحيدة
└── package.json`,
    },
    {
      type: "paragraph",
      text: "ملف index.html فيه صندوق فارغ <div id=\"root\"></div>، ورياكت يضع تطبيقك بالكامل داخله من خلال main.jsx.",
    },

    { type: "heading", text: "4. تشغيل خادم التطوير" },
    {
      type: "paragraph",
      text: "أثناء العمل، شغّل خادم التطوير. عند حفظ أي ملف تتحدّث الصفحة فوراً (إعادة تحميل ساخنة - hot reload).",
    },
    { type: "code", code: `npm run dev` },
    {
      type: "tip",
      text: "اترك هذا الأمر يعمل طوال فترة عملك. للإيقاف اضغط Ctrl + C.",
    },

    { type: "heading", text: "5. بناء التطبيق للإنتاج" },
    {
      type: "paragraph",
      text: "عند الانتهاء، أنشئ نسخة إنتاج مصغّرة وسريعة في مجلد dist، ثم اختبرها محلياً قبل النشر.",
    },
    {
      type: "code",
      code: `npm run build    # ينشئ مجلد dist
npm run preview  # يختبر نسخة الإنتاج محلياً`,
    },

    { type: "heading", text: "6. إضافات VS Code المقترحة" },
    {
      type: "list",
      items: [
        "ES7+ React snippets — اكتب rafce لإنشاء مكوّن بسرعة",
        "Prettier — ينسّق الكود عند الحفظ",
        "ESLint — يحذّرك من الأخطاء أثناء الكتابة",
        "Auto Rename Tag — يعيد تسمية الوسم المقابل تلقائياً",
      ],
    },

    { type: "heading", text: "7. تثبيت React Developer Tools" },
    {
      type: "paragraph",
      text: "إضافة متصفح مجانية تضيف تبويبين: «Components» لفحص props و state و hooks لأي مكوّن مباشرةً، و«Profiler» لاكتشاف عمليات الرسم البطيئة.",
    },
    {
      type: "tip",
      text: "عندما لا تكون قيمة كما تتوقع، افتح تبويب Components واضغط على المكوّن — رؤية قيمه الحقيقية تكشف الخطأ فوراً.",
    },

    { type: "heading", text: "✅ ملخص القسم" },
    {
      type: "list",
      items: [
        "ثبّت Node.js و npm",
        "أنشئ مشروع رياكت بـ Vite، كودك في مجلد src",
        "الأوامر: dev (للكتابة)، build (للنشر)، preview (لاختبار البناء)",
        "ثبّت إضافات VS Code و React DevTools",
      ],
    },
    {
      type: "qa",
      question: "1. ماذا يفعل npm install؟",
      answer: "يحمّل كل الحزم التي يحتاجها المشروع إلى مجلد node_modules.",
    },
    {
      type: "qa",
      question: "2. ما الأمر الذي يبدأ خادم التطوير؟",
      answer: "npm run dev",
    },
  ],
};

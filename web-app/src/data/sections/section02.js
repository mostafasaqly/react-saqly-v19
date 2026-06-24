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
      text: "عندما لا تكون قيمة كما تتوقع، افتح تبويب Components واضغط على المكوّن — رؤية قيمه للحقيقة تكشف الخطأ فوراً.",
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

  titleEn: "Setting Up the Dev Environment",
  levelEn: "Beginner",
  lessonsEn: [
    "Installing Node.js & npm",
    "Creating a React 19 Project with Vite",
    "Project Folder Structure",
    "Running the Dev Server",
    "Building for Production",
    "Recommended VS Code Extensions",
    "Installing React Developer Tools",
  ],
  introEn:
    "Before we write React, we need to set up the machine. In this section we install the tools, create a new project, run it, and build it.",
  contentEn: [
    { type: "heading", text: "1. Installing Node.js & npm" },
    {
      type: "paragraph",
      text: "Node.js lets you run JavaScript on your machine, and npm comes with it to download and manage packages. Download the LTS (stable) version from nodejs.org and install it.",
    },
    {
      type: "code",
      code: `node -v\nnpm -v\n# You should see version numbers, e.g.:\n# v22.11.0\n# 10.9.0`,
    },

    { type: "heading", text: "2. Creating a React 19 Project with Vite" },
    {
      type: "paragraph",
      text: 'Vite (pronounced "veet") is a fast tool that creates and runs React projects. Run the command below, then choose React and JavaScript:',
    },
    {
      type: "code",
      code: `npm create vite@latest my-react-app\ncd my-react-app\nnpm install`,
    },
    {
      type: "warning",
      text: "Make sure the react and react-dom version in package.json starts with 19.",
    },

    { type: "heading", text: "3. Project Folder Structure" },
    {
      type: "code",
      code: `my-react-app/\n├── node_modules/   ← packages (don't touch)\n├── public/         ← static files\n├── src/            ← your code lives here\n│   ├── App.jsx     ← root component\n│   ├── main.jsx    ← entry point\n│   └── index.css   ← global styles\n├── index.html      ← single HTML page\n└── package.json`,
    },
    {
      type: "paragraph",
      text: 'index.html has an empty <div id="root"></div> and React puts your entire app inside it via main.jsx.',
    },

    { type: "heading", text: "4. Running the Dev Server" },
    {
      type: "paragraph",
      text: "While working, run the dev server. When you save any file the page updates instantly (hot reload).",
    },
    { type: "code", code: `npm run dev` },
    {
      type: "tip",
      text: "Keep this command running while you work. Press Ctrl + C to stop.",
    },

    { type: "heading", text: "5. Building for Production" },
    {
      type: "paragraph",
      text: "When done, create a minified production build in the dist folder, then test it locally before deploying.",
    },
    {
      type: "code",
      code: `npm run build    # creates dist folder\nnpm run preview  # tests the production build locally`,
    },

    { type: "heading", text: "6. Recommended VS Code Extensions" },
    {
      type: "list",
      items: [
        "ES7+ React snippets — type rafce to scaffold a component fast",
        "Prettier — formats code on save",
        "ESLint — warns you about errors while typing",
        "Auto Rename Tag — renames the matching closing tag automatically",
      ],
    },

    { type: "heading", text: "7. Installing React Developer Tools" },
    {
      type: "paragraph",
      text: 'A free browser extension that adds two tabs: "Components" to inspect props, state, and hooks on any component directly, and "Profiler" to find slow renders.',
    },
    {
      type: "tip",
      text: "When a value isn't what you expect, open the Components tab and click the component — seeing its real values reveals the bug immediately.",
    },

    { type: "heading", text: "✅ Section Summary" },
    {
      type: "list",
      items: [
        "Installed Node.js & npm",
        "Created a React project with Vite — your code lives in src/",
        "Commands: dev (development), build (deploy), preview (test build)",
        "Installed VS Code extensions & React DevTools",
      ],
    },
    {
      type: "qa",
      question: "1. What does npm install do?",
      answer: "Downloads all packages the project needs into the node_modules folder.",
    },
    {
      type: "qa",
      question: "2. Which command starts the dev server?",
      answer: "npm run dev",
    },
  ],
};

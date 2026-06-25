// القسم 13 — Suspense وواجهة use في React 19
export default {
  id: 13,
  title: "Suspense وواجهة use في React 19",
  level: "متوسط إلى متقدّم",
  lessons: [
    "ما هو Suspense؟",
    "Suspense لواجهة التحميل",
    "حدود Suspense (Boundaries)",
    "نظرة عامة على Hook use",
    "استخدام use مع الوعود",
    "استخدام use مع Context",
    "حدود التحميل والخطأ",
    "أفضل ممارسات Suspense",
  ],
  intro:
    "في القسم 12 كتبنا علامات التحميل يدوياً. لReact طريقة أنظف: Suspense يتيح لComponent أن «يتوقّف» أثناء تحميل بياناته، وReact يعرض بديلاً نيابةً عنك. ومع واجهة use الجديدة يقلّ الكود كثيراً.",
  content: [
    { type: "heading", text: "1. ما هو Suspense؟" },
    {
      type: "paragraph",
      text: "<Suspense> غلاف. إن كان Component بداخله ينتظر شيئاً (مثل بيانات)، يعرض Suspense تلقائياً بديلاً (fallback) حتى يجهز. Component نفسه لا يحتاج علامة تحميل.",
    },
    {
      type: "code",
      code: `<Suspense fallback={<p>Loading...</p>}>
  <Profile />
</Suspense>`,
    },

    { type: "heading", text: "2. Suspense لواجهة التحميل" },
    {
      type: "paragraph",
      text: "البديل يمكن أن يكون أي شيء — نص، أو مؤشّر، أو هياكل تحميل (skeletons). بينما يحمّل UserProfile بياناته، يرى المستخدم البديل.",
    },

    { type: "heading", text: "3. حدود Suspense (Boundaries)" },
    {
      type: "paragraph",
      text: "حدّ Suspense هو المنطقة التي يغطّيها <Suspense> واحد. يمكنك استخدام عدة حدود لتحميل أجزاء مختلفة باستقلال.",
    },
    {
      type: "code",
      code: `<Suspense fallback={<p>Loading profile...</p>}>
  <Profile />
</Suspense>
<Suspense fallback={<p>Loading posts...</p>}>
  <Posts />
</Suspense>`,
    },
    {
      type: "tip",
      text: "غلّف كل جزء مستقلّ بحدّ خاصّ به حتى لا يحجب جزء بطيء البقية.",
    },

    { type: "heading", text: "4. نظرة عامة على Hook use" },
    {
      type: "paragraph",
      text: "use دالة جديدة في React 19 تقرأ مورداً — وعداً (Promise) أو سياقاً (Context). تعمل مع Suspense، ويمكن استدعاؤها بشكل شرطي عكس Hooks العادية.",
    },

    { type: "heading", text: "5. استخدام use مع الوعود" },
    {
      type: "paragraph",
      text: "use يفكّ الوعد. أثناء الانتظار يعرض أقرب حدّ Suspense بديله. عند التحقّق تحصل على القيمة — بدون حالة تحميل ولا useEffect.",
    },
    {
      type: "code",
      code: `function Comments({ commentsPromise }) {
  const comments = use(commentsPromise);
  return comments.map((c) => <li key={c.id}>{c.text}</li>);
}`,
    },
    {
      type: "warning",
      text: "لا تنشئ الوعد داخل Component الذي يستدعي use، وإلا صنع وعداً جديداً كل رسم. أنشئه بالأعلى أو مرّره كـ prop أو من موجّه/إطار عمل.",
    },

    { type: "heading", text: "6. استخدام use مع Context" },
    {
      type: "code",
      code: `function Button({ themed }) {
  if (themed) {
    const theme = use(ThemeContext); // مسموح داخل if
    return <button className={theme}>Themed</button>;
  }
  return <button>Plain</button>;
}`,
    },

    { type: "heading", text: "7. حدود التحميل والخطأ" },
    {
      type: "paragraph",
      text: "Suspense يتعامل مع التحميل. والأخطاء؟ مهمّة حدّ الخطأ (Error Boundary) — Component يلتقط الأخطاء من أبنائه ويعرض بديلاً. تقرنهما معاً.",
    },
    {
      type: "code",
      code: `<ErrorBoundary fallback={<p>حدث خطأ.</p>}>
  <Suspense fallback={<p>Loading...</p>}>
    <Comments commentsPromise={commentsPromise} />
  </Suspense>
</ErrorBoundary>`,
    },

    { type: "heading", text: "8. أفضل ممارسات Suspense" },
    {
      type: "list",
      items: [
        "حدّ واحد لكل جزء مستقلّ",
        "استخدم هياكل التحميل كبديل لتخطيط ثابت",
        "لا تنشئ الوعود في الرسم — أنشئها بالخارج أو من إطار العمل",
        "اقرن Suspense بحدّ خطأ لتغطية التحميل والفشل معاً",
      ],
    },

    { type: "heading", text: "✅ ملخص القسم" },
    {
      type: "list",
      items: [
        "<Suspense> يعرض بديلاً أثناء انتظار الابن",
        "الحدود تتيح تحميل الأجزاء باستقلال",
        "use يقرأ وعداً أو سياقاً، ويمكن استدعاؤه شرطياً",
        "حدود الخطأ تلتقط الأعطال؛ اقرنها بـ Suspense",
      ],
    },
    {
      type: "qa",
      question: "1. ماذا يعرض <Suspense> أثناء تحميل ابنه؟",
      answer: "بديله (fallback) — نص أو مؤشّر أو هياكل تحميل.",
    },
    {
      type: "qa",
      question: "2. ما الذي يتعامل مع الأخطاء بينما Suspense يتعامل مع التحميل؟",
      answer: "حدّ الخطأ (Error Boundary) — اقرنه بـ Suspense لتغطية الكلّ.",
    },
  ],
  titleEn: "Suspense & the use API in React 19",
  levelEn: "Intermediate to Advanced",
  lessonsEn: [
    "What is Suspense?",
    "Suspense for Loading UI",
    "Suspense Boundaries",
    "Overview of the use Hook",
    "Using use with Promises",
    "Using use with Context",
    "Loading and Error Boundaries",
    "Suspense Best Practices",
  ],
  introEn:
    "In section 12 we wrote loading flags by hand. React has a cleaner way: Suspense lets a component 'pause' while its data loads, and React shows a fallback on your behalf. With the new use API, there's even less code.",
  contentEn: [
    { type: "heading", text: "1. What is Suspense?" },
    {
      type: "paragraph",
      text: "<Suspense> is a wrapper. If a component inside it is waiting for something (like data), Suspense automatically shows a fallback until it's ready. The component itself needs no loading flag.",
    },
    {
      type: "code",
      code: `<Suspense fallback={<p>Loading...</p>}>
  <Profile />
</Suspense>`,
    },

    { type: "heading", text: "2. Suspense for Loading UI" },
    {
      type: "paragraph",
      text: "The fallback can be anything — text, a spinner, or skeleton placeholders. While UserProfile loads its data, the user sees the fallback.",
    },

    { type: "heading", text: "3. Suspense Boundaries" },
    {
      type: "paragraph",
      text: "A Suspense boundary is the area one <Suspense> covers. You can use multiple boundaries to load different parts independently.",
    },
    {
      type: "code",
      code: `<Suspense fallback={<p>Loading profile...</p>}>
  <Profile />
</Suspense>
<Suspense fallback={<p>Loading posts...</p>}>
  <Posts />
</Suspense>`,
    },
    {
      type: "tip",
      text: "Wrap each independent section in its own boundary so a slow part doesn't block the rest.",
    },

    { type: "heading", text: "4. Overview of the use Hook" },
    {
      type: "paragraph",
      text: "use is a new function in React 19 that reads a resource — a Promise or a Context. It works with Suspense, and unlike regular hooks, it can be called conditionally.",
    },

    { type: "heading", text: "5. Using use with Promises" },
    {
      type: "paragraph",
      text: "use unwraps the Promise. While waiting, the nearest Suspense boundary shows its fallback. When resolved you get the value — no loading state, no useEffect.",
    },
    {
      type: "code",
      code: `function Comments({ commentsPromise }) {
  const comments = use(commentsPromise);
  return comments.map((c) => <li key={c.id}>{c.text}</li>);
}`,
    },
    {
      type: "warning",
      text: "Don't create the Promise inside the component that calls use — that creates a new Promise on every render. Create it outside, pass it as a prop, or get it from a router/framework.",
    },

    { type: "heading", text: "6. Using use with Context" },
    {
      type: "code",
      code: `function Button({ themed }) {
  if (themed) {
    const theme = use(ThemeContext); // allowed inside if!
    return <button className={theme}>Themed</button>;
  }
  return <button>Plain</button>;
}`,
    },

    { type: "heading", text: "7. Loading and Error Boundaries" },
    {
      type: "paragraph",
      text: "Suspense handles loading. What about errors? That's the job of an Error Boundary — a component that catches errors from its children and shows a fallback. Pair them together.",
    },
    {
      type: "code",
      code: `<ErrorBoundary fallback={<p>Something went wrong.</p>}>
  <Suspense fallback={<p>Loading...</p>}>
    <Comments commentsPromise={commentsPromise} />
  </Suspense>
</ErrorBoundary>`,
    },

    { type: "heading", text: "8. Suspense Best Practices" },
    {
      type: "list",
      items: [
        "One boundary per independent section",
        "Use skeleton placeholders as fallback for a stable layout",
        "Don't create Promises during render — create them outside or from the framework",
        "Pair Suspense with an Error Boundary to cover both loading and failure",
      ],
    },

    { type: "heading", text: "✅ Section Summary" },
    {
      type: "list",
      items: [
        "<Suspense> shows a fallback while a child is waiting",
        "Boundaries let sections load independently",
        "use reads a Promise or Context, and can be called conditionally",
        "Error Boundaries catch failures; pair them with Suspense",
      ],
    },
    {
      type: "qa",
      question: "1. What does <Suspense> show while its child is loading?",
      answer: "Its fallback — text, a spinner, or skeleton placeholders.",
    },
    {
      type: "qa",
      question: "2. What handles errors while Suspense handles loading?",
      answer: "An Error Boundary — pair it with Suspense to cover both.",
    },
  ],
};

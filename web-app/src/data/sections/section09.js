// القسم 9 — الواجهة غير المتزامنة والتحديثات التفاؤلية
export default {
  id: 9,
  title: "الواجهة غير المتزامنة والتحديثات التفاؤلية",
  level: "متوسط",
  lessons: [
    "الواجهة غير المتزامنة في React 19",
    "فهم الانتقالات (Transitions)",
    "useTransition",
    "أنماط واجهة الانتظار",
    "useOptimistic",
    "إضافة تفاؤلية",
    "تحديث تفاؤلي",
    "حذف تفاؤلي",
    "معالجة الأخطاء في Actions غير المتزامنة",
    "متى تستخدم التحديثات التفاؤلية",
  ],
  intro:
    "التطبيقات الجيّدة تبدو سريعة. في هذا القسم نتعلّم أدوات React 19 التي تبقي الواجهة سلسة أثناء العمل غير المتزامن وتجعل التحديثات تبدو فورية، حتى قبل ردّ الخادم.",
  content: [
    { type: "heading", text: "1. الواجهة غير المتزامنة في React 19" },
    {
      type: "paragraph",
      text: "عند عمل بطيء (جلب أو حفظ) قد تتجمّد الواجهة أو تبدو عالقة. الواجهة الجيّدة تجيب على سؤالين: «هل نجح ما فعلته؟» (أظهر ردّاً فورياً) و«هل يحدث شيء؟» (أظهر حالة انتظار).",
    },

    { type: "heading", text: "2. فهم الانتقالات (Transitions)" },
    {
      type: "paragraph",
      text: "الانتقال يخبر React: «هذا التحديث ليس عاجلاً — أبقِ التطبيق متجاوباً، وأعطني علامة انتظار». التحديثات العاجلة (الكتابة) تبقى فورية، وتحديثات الانتقال (تحميل تبويب) يمكن أن تأخذ وقتاً.",
    },

    { type: "heading", text: "3. useTransition" },
    {
      type: "paragraph",
      text: "يعطيك علامة انتظار ودالة startTransition. تغلّف العمل البطيء داخلها فتبقى بقية الواجهة قابلة للنقر.",
    },
    {
      type: "code",
      code: `const [isPending, startTransition] = useTransition();

function handleClick() {
  startTransition(async () => {
    await saveToServer();
    setSaved(true);
  });
}`,
    },

    { type: "heading", text: "4. أنماط واجهة الانتظار" },
    {
      type: "list",
      items: [
        "تعطيل الزر وتغيير نصّه: «جارٍ...»",
        "إظهار مؤشّر تحميل (spinner)",
        "تعتيم المحتوى (opacity)",
        "هياكل تحميل (skeletons)",
      ],
    },
    {
      type: "tip",
      text: "القاعدة: أي Action يستغرق أكثر من ~300 مللي ثانية يجب أن يُظهر انتظاراً.",
    },

    { type: "heading", text: "5. useOptimistic" },
    {
      type: "paragraph",
      text: "يتيح عرض النتيجة المتوقّعة فوراً، بينما يجري الطلب الحقيقي في الخلفية. وإن فشل الطلب، يرجع React تلقائياً للقيمة الحقيقية.",
    },
    {
      type: "code",
      code: `const [optimisticLikes, addOptimisticLike] = useOptimistic(
  likes,
  (current) => current + 1
);

async function handleLike() {
  addOptimisticLike(); // تتحدّث فوراً
  await onLike();      // الطلب الحقيقي في الخلفية
}`,
    },

    { type: "heading", text: "6. إضافة تفاؤلية" },
    {
      type: "paragraph",
      text: "أظهر العنصر الجديد فوراً (باهتاً)، ثم اجعله دائماً عند تأكيد الخادم.",
    },
    {
      type: "code",
      code: `const [optimisticTodos, addOptimisticTodo] = useOptimistic(
  todos,
  (current, newTodo) => [...current, { ...newTodo, sending: true }]
);`,
    },

    { type: "heading", text: "7. تحديث تفاؤلي" },
    {
      type: "code",
      code: `useOptimistic(items, (current, edited) =>
  current.map((i) => (i.id === edited.id ? edited : i))
);`,
    },

    { type: "heading", text: "8. حذف تفاؤلي" },
    {
      type: "code",
      code: `useOptimistic(items, (current, idToRemove) =>
  current.filter((i) => i.id !== idToRemove)
);`,
    },

    { type: "heading", text: "9. معالجة الأخطاء في Actions غير المتزامنة" },
    {
      type: "list",
      items: [
        "غلّف الطلب الحقيقي بـ try/catch",
        "React يرجع للقيمة الحقيقية تلقائياً عند الفشل",
        "أخبر المستخدم برسالة خطأ ليعرف أن يعيد المحاولة",
      ],
    },

    { type: "heading", text: "10. متى تستخدم التحديثات التفاؤلية" },
    {
      type: "list",
      items: [
        "✅ جيّدة لActions تنجح غالباً وصغيرة وقابلة للتراجع (إعجاب، إكمال)",
        "❌ تجنّبها إذا فشلت كثيراً أو احتاجت تأكيد الخادم (دفع، حجز آخر مقعد)",
        "❌ تجنّبها إذا اعتمدت النتيجة على بيانات خادم لا يمكن تخمينها",
      ],
    },
    {
      type: "tip",
      text: "القاعدة: إن كنت ستُحرَج من «التراجع» أمام المستخدم، فلا تفعلها تفاؤلياً.",
    },

    { type: "heading", text: "✅ ملخص القسم" },
    {
      type: "list",
      items: [
        "الانتقالات تبقي الواجهة متجاوبة أثناء العمل غير المتزامن",
        "useTransition يعطي [isPending, startTransition]",
        "useOptimistic يعرض النتيجة فوراً ويرجع عند الفشل",
        "الإضافة/التحديث/الحذف كلها يمكن أن تكون تفاؤلية",
      ],
    },
    {
      type: "qa",
      question: "1. ماذا يعطيك useTransition؟",
      answer: "علامة انتظار ودالة startTransition لتشغيل تحديثات غير عاجلة.",
    },
    {
      type: "qa",
      question: "2. ماذا يفعل useOptimistic عند فشل الطلب الحقيقي؟",
      answer: "يرجع تلقائياً للقيمة الحقيقية الحالية.",
    },
  ],
  titleEn: "Async UI & Optimistic Updates",
  levelEn: "Intermediate",
  lessonsEn: [
    "Async UI in React 19",
    "Understanding Transitions",
    "useTransition",
    "Pending UI Patterns",
    "useOptimistic",
    "Optimistic Add",
    "Optimistic Update",
    "Optimistic Delete",
    "Error Handling in Async Actions",
    "When to Use Optimistic Updates",
  ],
  introEn:
    "Good apps feel fast. In this section we learn React 19 tools that keep the UI smooth during async work and make updates feel instant — even before the server responds.",
  contentEn: [
    { type: "heading", text: "1. Async UI in React 19" },
    {
      type: "paragraph",
      text: "During slow work (fetching or saving) the UI might freeze or appear stuck. Good UI answers two questions: 'Did what I did succeed?' (show instant feedback) and 'Is something happening?' (show a pending state).",
    },

    { type: "heading", text: "2. Understanding Transitions" },
    {
      type: "paragraph",
      text: "A transition tells React: 'This update is not urgent — keep the app responsive and give me a pending flag.' Urgent updates (typing) stay instant; transition updates (loading a tab) can take time.",
    },

    { type: "heading", text: "3. useTransition" },
    {
      type: "paragraph",
      text: "Gives you a pending flag and a startTransition function. Wrap slow work inside it so the rest of the UI stays clickable.",
    },
    {
      type: "code",
      code: `const [isPending, startTransition] = useTransition();

function handleClick() {
  startTransition(async () => {
    await saveToServer();
    setSaved(true);
  });
}`,
    },

    { type: "heading", text: "4. Pending UI Patterns" },
    {
      type: "list",
      items: [
        "Disable the button and change its text: 'Saving...'",
        "Show a loading spinner",
        "Dim the content (opacity)",
        "Show skeleton placeholders",
      ],
    },
    {
      type: "tip",
      text: "Rule: any action taking more than ~300 ms should show a pending state.",
    },

    { type: "heading", text: "5. useOptimistic" },
    {
      type: "paragraph",
      text: "Shows the expected result immediately while the real request runs in the background. If the request fails, React automatically rolls back to the real value.",
    },
    {
      type: "code",
      code: `const [optimisticLikes, addOptimisticLike] = useOptimistic(
  likes,
  (current) => current + 1
);

async function handleLike() {
  addOptimisticLike(); // updates immediately
  await onLike();      // real request in background
}`,
    },

    { type: "heading", text: "6. Optimistic Add" },
    {
      type: "paragraph",
      text: "Show the new item immediately (faded), then make it permanent once the server confirms.",
    },
    {
      type: "code",
      code: `const [optimisticTodos, addOptimisticTodo] = useOptimistic(
  todos,
  (current, newTodo) => [...current, { ...newTodo, sending: true }]
);`,
    },

    { type: "heading", text: "7. Optimistic Update" },
    {
      type: "code",
      code: `useOptimistic(items, (current, edited) =>
  current.map((i) => (i.id === edited.id ? edited : i))
);`,
    },

    { type: "heading", text: "8. Optimistic Delete" },
    {
      type: "code",
      code: `useOptimistic(items, (current, idToRemove) =>
  current.filter((i) => i.id !== idToRemove)
);`,
    },

    { type: "heading", text: "9. Error Handling in Async Actions" },
    {
      type: "list",
      items: [
        "Wrap the real request in try/catch",
        "React automatically rolls back to the real value on failure",
        "Inform the user with an error message so they know to retry",
      ],
    },

    { type: "heading", text: "10. When to Use Optimistic Updates" },
    {
      type: "list",
      items: [
        "✅ Good for actions that usually succeed and are small and reversible (like, complete)",
        "❌ Avoid if they fail often or need server confirmation (payment, last seat booking)",
        "❌ Avoid if the result depends on server data that can't be guessed",
      ],
    },
    {
      type: "tip",
      text: "Rule: if you'd be embarrassed to 'undo' it in front of the user, don't do it optimistically.",
    },

    { type: "heading", text: "✅ Section Summary" },
    {
      type: "list",
      items: [
        "Transitions keep the UI responsive during async work",
        "useTransition gives [isPending, startTransition]",
        "useOptimistic shows the result immediately and rolls back on failure",
        "Add / update / delete can all be optimistic",
      ],
    },
    {
      type: "qa",
      question: "1. What does useTransition give you?",
      answer: "A pending flag and a startTransition function to run non-urgent updates.",
    },
    {
      type: "qa",
      question: "2. What does useOptimistic do when the real request fails?",
      answer: "It automatically rolls back to the current real value.",
    },
  ],
};

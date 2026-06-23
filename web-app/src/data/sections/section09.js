// القسم 9 — الواجهة غير المتزامنة والتحديثات التفاؤلية
export default {
  id: 9,
  title: "الواجهة غير المتزامنة والتحديثات التفاؤلية",
  level: "متوسط",
  lessons: [
    "الواجهة غير المتزامنة في رياكت 19",
    "فهم الانتقالات (Transitions)",
    "useTransition",
    "أنماط واجهة الانتظار",
    "useOptimistic",
    "إضافة تفاؤلية",
    "تحديث تفاؤلي",
    "حذف تفاؤلي",
    "معالجة الأخطاء في الإجراءات غير المتزامنة",
    "متى تستخدم التحديثات التفاؤلية",
  ],
  intro:
    "التطبيقات الجيّدة تبدو سريعة. في هذا القسم نتعلّم أدوات رياكت 19 التي تبقي الواجهة سلسة أثناء العمل غير المتزامن وتجعل التحديثات تبدو فورية، حتى قبل ردّ الخادم.",
  content: [
    { type: "heading", text: "1. الواجهة غير المتزامنة في رياكت 19" },
    {
      type: "paragraph",
      text: "عند عمل بطيء (جلب أو حفظ) قد تتجمّد الواجهة أو تبدو عالقة. الواجهة الجيّدة تجيب على سؤالين: «هل نجح ما فعلته؟» (أظهر ردّاً فورياً) و«هل يحدث شيء؟» (أظهر حالة انتظار).",
    },

    { type: "heading", text: "2. فهم الانتقالات (Transitions)" },
    {
      type: "paragraph",
      text: "الانتقال يخبر رياكت: «هذا التحديث ليس عاجلاً — أبقِ التطبيق متجاوباً، وأعطني علامة انتظار». التحديثات العاجلة (الكتابة) تبقى فورية، وتحديثات الانتقال (تحميل تبويب) يمكن أن تأخذ وقتاً.",
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
      text: "القاعدة: أي إجراء يستغرق أكثر من ~300 مللي ثانية يجب أن يُظهر انتظاراً.",
    },

    { type: "heading", text: "5. useOptimistic" },
    {
      type: "paragraph",
      text: "يتيح عرض النتيجة المتوقّعة فوراً، بينما يجري الطلب الحقيقي في الخلفية. وإن فشل الطلب، يرجع رياكت تلقائياً للقيمة الحقيقية.",
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

    { type: "heading", text: "9. معالجة الأخطاء في الإجراءات غير المتزامنة" },
    {
      type: "list",
      items: [
        "غلّف الطلب الحقيقي بـ try/catch",
        "رياكت يرجع للقيمة الحقيقية تلقائياً عند الفشل",
        "أخبر المستخدم برسالة خطأ ليعرف أن يعيد المحاولة",
      ],
    },

    { type: "heading", text: "10. متى تستخدم التحديثات التفاؤلية" },
    {
      type: "list",
      items: [
        "✅ جيّدة لإجراءات تنجح غالباً وصغيرة وقابلة للتراجع (إعجاب، إكمال)",
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
};

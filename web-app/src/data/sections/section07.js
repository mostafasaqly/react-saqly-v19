// القسم 7 — النماذج في رياكت 19
export default {
  id: 7,
  title: "النماذج في رياكت 19",
  level: "متوسط",
  lessons: [
    "مراجعة النماذج المتحكَّم بها",
    "إرسال النموذج",
    "التحقّق اليدوي من النموذج",
    "إجراءات رياكت 19 (Actions)",
    "useActionState",
    "useFormStatus",
    "حالات الانتظار والخطأ",
    "إعادة تعيين النماذج",
    "معالجة أخطاء النموذج",
    "أفضل ممارسات نماذج رياكت 19",
  ],
  intro:
    "النماذج في كل مكان: تسجيل دخول، بحث، تعليقات، دفع. رياكت 19 يجعل النماذج أسهل بكثير عبر ميزة الإجراءات (Actions) وثلاثة خطّافات مفيدة. هذا من أكبر أسباب تعلّم رياكت 19.",
  content: [
    { type: "heading", text: "1. مراجعة النماذج المتحكَّم بها" },
    {
      type: "paragraph",
      text: "المدخل المتحكَّم به يحفظ قيمته في الحالة (value + onChange). مفيد للمعاينة الحيّة أو التحقّق الفوري. لكن للإرسال، رياكت 19 يعطي طريقة أبسط.",
    },

    { type: "heading", text: "2. إرسال النموذج" },
    {
      type: "paragraph",
      text: "الطريقة القديمة: استمع لـ onSubmit واستدعِ e.preventDefault() لمنع إعادة تحميل الصفحة. تعمل، لكنك تدير الحالة والانتظار والأخطاء يدوياً.",
    },
    {
      type: "code",
      code: `function handleSubmit(e) {
  e.preventDefault();
  console.log("Submitting:", email);
}`,
    },

    { type: "heading", text: "3. التحقّق اليدوي من النموذج" },
    {
      type: "paragraph",
      text: "تفحص القيم بنفسك وتخزّن رسائل الأخطاء في الحالة. معرفة هذا تساعدك على فهم ما تؤتمته الأدوات الأحدث.",
    },
    {
      type: "code",
      code: `function validate() {
  const next = {};
  if (!email.includes("@")) next.email = "بريد غير صحيح";
  if (password.length < 6) next.password = "6 أحرف على الأقل";
  setErrors(next);
  return Object.keys(next).length === 0;
}`,
    },

    { type: "heading", text: "4. إجراءات رياكت 19 (Actions)" },
    {
      type: "paragraph",
      text: "مرّر دالة async إلى خاصية action في النموذج. رياكت يستدعيها ببيانات النموذج ويدير حالة الانتظار. بدون preventDefault، بدون حالة يدوية. اقرأ المدخلات بـ formData.get(\"name\").",
    },
    {
      type: "code",
      code: `function CommentForm() {
  async function submitComment(formData) {
    const text = formData.get("text");
    await saveToServer(text);
  }
  return (
    <form action={submitComment}>
      <input name="text" />
      <button type="submit">Post</button>
    </form>
  );
}`,
    },

    { type: "heading", text: "5. useActionState" },
    {
      type: "paragraph",
      text: "هذا الخطّاف يغلّف إجراءك ويُرجع: الحالة (النتيجة)، والإجراء المغلَّف، ومنطقي للانتظار.",
    },
    {
      type: "code",
      code: `const [state, formAction, isPending] = useActionState(
  async (prevState, formData) => {
    const text = formData.get("text");
    if (!text) return { error: "النص مطلوب" };
    await saveToServer(text);
    return { success: "تم النشر!" };
  },
  null
);`,
    },

    { type: "heading", text: "6. useFormStatus" },
    {
      type: "paragraph",
      text: "يتيح لمكوّن ابن قراءة حالة النموذج فوقه دون props. ملاحظة: يُستورد من react-dom، ويجب أن يكون المكوّن داخل النموذج.",
    },
    {
      type: "code",
      code: `import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "جارٍ الإرسال..." : "إرسال"}
    </button>
  );
}`,
    },

    { type: "heading", text: "7. حالات الانتظار والخطأ" },
    {
      type: "list",
      items: [
        "الانتظار: استخدم isPending أو pending لتعطيل الزر وإظهار «جارٍ...»",
        "الخطأ: أرجِع { error } من الإجراء واعرضه",
        "النجاح: أرجِع { success } واعرضه",
      ],
    },

    { type: "heading", text: "8. إعادة تعيين النماذج" },
    {
      type: "paragraph",
      text: "عند استخدام خاصية action (لا الحالة المتحكَّم بها)، رياكت يعيد تعيين المدخلات تلقائياً بعد النجاح. تحصل على هذا مجاناً غالباً.",
    },

    { type: "heading", text: "9. معالجة أخطاء النموذج" },
    {
      type: "list",
      items: [
        "أخطاء التحقّق (مدخل خاطئ): أرجِع رسالة من الإجراء",
        "أخطاء الخادم/الشبكة: غلّف الطلب بـ try/catch وأرجِع { error }",
        "أبقِ ما كتبه المستخدم لكي لا يبدأ من جديد",
      ],
    },

    { type: "heading", text: "10. أفضل ممارسات نماذج رياكت 19" },
    {
      type: "list",
      items: [
        "فضّل الإجراءات على onSubmit اليدوي",
        "تحقّق داخل الإجراء وأرجِع { error }",
        "غلّف نداءات الخادم بـ try/catch",
        "أظهر حالة الانتظار وعطّل الزر",
        "اصنع SubmitButton قابلاً لإعادة الاستخدام",
        "استخدم type و name الصحيحة و required و minLength",
      ],
    },

    { type: "heading", text: "✅ ملخص القسم" },
    {
      type: "list",
      items: [
        "الإجراءات: دالة async على <form action={...}>",
        "useActionState يُرجع [state, formAction, isPending]",
        "useFormStatus يقرأ انتظار النموذج (من react-dom)",
        "تعامل مع التحقّق وأخطاء الخادم، وأبقِ مدخلات المستخدم",
      ],
    },
    {
      type: "qa",
      question: "1. كيف تقرأ قيمة مدخل داخل إجراء؟",
      answer: "بـ formData.get(\"name\")، حيث name هو خاصية name للمدخل.",
    },
    {
      type: "qa",
      question: "2. ماذا يُرجع useActionState؟",
      answer: "[state, formAction, isPending] — النتيجة، والإجراء المغلَّف، ومنطقي الانتظار.",
    },
  ],
};

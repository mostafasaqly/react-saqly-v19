// القسم 7 — النماذج في React 19
export default {
  id: 7,
  title: "النماذج في React 19",
  level: "متوسط",
  lessons: [
    "مراجعة النماذج المتحكَّم بها",
    "إرسال النموذج",
    "التحقّق اليدوي من النموذج",
    "Actions React 19 (Actions)",
    "useActionState",
    "useFormStatus",
    "حالات الانتظار والخطأ",
    "إعادة تعيين النماذج",
    "معالجة أخطاء النموذج",
    "أفضل ممارسات نماذج React 19",
  ],
  intro:
    "النماذج في كل مكان: تسجيل دخول، بحث، تعليقات، دفع. React 19 يجعل النماذج أسهل بكثير عبر ميزة Actions وثلاثة Hooks مفيدة. هذا من أكبر أسباب تعلّم React 19.",
  content: [
    { type: "heading", text: "1. مراجعة النماذج المتحكَّم بها" },
    {
      type: "paragraph",
      text: "المدخل المتحكَّم به يحفظ قيمته في الحالة (value + onChange). مفيد للمعاينة الحيّة أو التحقّق الفوري. لكن للإرسال، React 19 يعطي طريقة أبسط.",
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

    { type: "heading", text: "4. Actions React 19 (Actions)" },
    {
      type: "paragraph",
      text: "مرّر دالة async إلى خاصية action في النموذج. React يستدعيها ببيانات النموذج ويدير حالة الانتظار. بدون preventDefault، بدون حالة يدوية. اقرأ المدخلات بـ formData.get(\"name\").",
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
      text: "هذا Hook يغلّف Actionك ويُرجع: الحالة (النتيجة)، وAction المغلَّف، ومنطقي للانتظار.",
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
      text: "يتيح لComponent ابن قراءة حالة النموذج فوقه دون props. ملاحظة: يُستورد من react-dom، ويجب أن يكون Component داخل النموذج.",
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
        "الخطأ: أرجِع { error } من Action واعرضه",
        "النجاح: أرجِع { success } واعرضه",
      ],
    },

    { type: "heading", text: "8. إعادة تعيين النماذج" },
    {
      type: "paragraph",
      text: "عند استخدام خاصية action (لا الحالة المتحكَّم بها)، React يعيد تعيين المدخلات تلقائياً بعد النجاح. تحصل على هذا مجاناً غالباً.",
    },

    { type: "heading", text: "9. معالجة أخطاء النموذج" },
    {
      type: "list",
      items: [
        "أخطاء التحقّق (مدخل خاطئ): أرجِع رسالة من Action",
        "أخطاء الخادم/الشبكة: غلّف الطلب بـ try/catch وأرجِع { error }",
        "أبقِ ما كتبه المستخدم لكي لا يبدأ من جديد",
      ],
    },

    { type: "heading", text: "10. أفضل ممارسات نماذج React 19" },
    {
      type: "list",
      items: [
        "فضّل Actions على onSubmit اليدوي",
        "تحقّق داخل Action وأرجِع { error }",
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
        "Actions: دالة async على <form action={...}>",
        "useActionState يُرجع [state, formAction, isPending]",
        "useFormStatus يقرأ انتظار النموذج (من react-dom)",
        "تعامل مع التحقّق وأخطاء الخادم، وأبقِ مدخلات المستخدم",
      ],
    },
    {
      type: "qa",
      question: "1. كيف تقرأ قيمة مدخل داخل Action؟",
      answer: "بـ formData.get(\"name\")، حيث name هو خاصية name للمدخل.",
    },
    {
      type: "qa",
      question: "2. ماذا يُرجع useActionState؟",
      answer: "[state, formAction, isPending] — النتيجة، وAction المغلَّف، ومنطقي الانتظار.",
    },
  ],

  titleEn: "Forms in React 19",
  levelEn: "Intermediate",
  lessonsEn: [
    "Revisiting Controlled Forms",
    "Submitting a Form",
    "Manual Form Validation",
    "React 19 Actions",
    "useActionState",
    "useFormStatus",
    "Pending & Error States",
    "Resetting Forms",
    "Handling Form Errors",
    "React 19 Form Best Practices",
  ],
  introEn:
    "Forms are everywhere: login, search, comments, checkout. React 19 makes forms much easier with Actions and three helpful hooks. This is one of the biggest reasons to learn React 19.",
  contentEn: [
    { type: "heading", text: "1. Revisiting Controlled Forms" },
    {
      type: "paragraph",
      text: "A controlled input stores its value in state (value + onChange). Useful for live previews or instant validation. But for submission, React 19 gives a simpler way.",
    },

    { type: "heading", text: "2. Submitting a Form" },
    {
      type: "paragraph",
      text: "The old way: listen to onSubmit and call e.preventDefault() to prevent a page reload. It works, but you manage state, pending, and errors manually.",
    },
    {
      type: "code",
      code: `function handleSubmit(e) {\n  e.preventDefault();\n  console.log("Submitting:", email);\n}`,
    },

    { type: "heading", text: "3. Manual Form Validation" },
    {
      type: "paragraph",
      text: "You check values yourself and store error messages in state. Knowing this helps you understand what newer tools automate.",
    },
    {
      type: "code",
      code: `function validate() {\n  const next = {};\n  if (!email.includes("@")) next.email = "Invalid email";\n  if (password.length < 6) next.password = "At least 6 characters";\n  setErrors(next);\n  return Object.keys(next).length === 0;\n}`,
    },

    { type: "heading", text: "4. React 19 Actions" },
    {
      type: "paragraph",
      text: 'Pass an async function to the form\'s action prop. React calls it with the form data and manages the pending state. No preventDefault, no manual state. Read inputs with formData.get("name").',
    },
    {
      type: "code",
      code: `function CommentForm() {\n  async function submitComment(formData) {\n    const text = formData.get("text");\n    await saveToServer(text);\n  }\n  return (\n    <form action={submitComment}>\n      <input name="text" />\n      <button type="submit">Post</button>\n    </form>\n  );\n}`,
    },

    { type: "heading", text: "5. useActionState" },
    {
      type: "paragraph",
      text: "This hook wraps your action and returns: the state (result), the wrapped action, and a pending boolean.",
    },
    {
      type: "code",
      code: `const [state, formAction, isPending] = useActionState(\n  async (prevState, formData) => {\n    const text = formData.get("text");\n    if (!text) return { error: "Text is required" };\n    await saveToServer(text);\n    return { success: "Posted!" };\n  },\n  null\n);`,
    },

    { type: "heading", text: "6. useFormStatus" },
    {
      type: "paragraph",
      text: "Lets a child component read the state of the form above it without props. Note: imported from react-dom, and the component must be inside the form.",
    },
    {
      type: "code",
      code: `import { useFormStatus } from "react-dom";\n\nfunction SubmitButton() {\n  const { pending } = useFormStatus();\n  return (\n    <button type="submit" disabled={pending}>\n      {pending ? "Submitting..." : "Submit"}\n    </button>\n  );\n}`,
    },

    { type: "heading", text: "7. Pending & Error States" },
    {
      type: "list",
      items: [
        "Pending: use isPending or pending to disable the button and show 'Loading...'",
        "Error: return { error } from the action and display it",
        "Success: return { success } and display it",
      ],
    },

    { type: "heading", text: "8. Resetting Forms" },
    {
      type: "paragraph",
      text: "When using the action prop (not controlled state), React automatically resets inputs after success. You get this for free most of the time.",
    },

    { type: "heading", text: "9. Handling Form Errors" },
    {
      type: "list",
      items: [
        "Validation errors (bad input): return a message from the action",
        "Server/network errors: wrap the request in try/catch and return { error }",
        "Keep what the user typed so they don't start over",
      ],
    },

    { type: "heading", text: "10. React 19 Form Best Practices" },
    {
      type: "list",
      items: [
        "Prefer Actions over manual onSubmit",
        "Validate inside the action and return { error }",
        "Wrap server calls in try/catch",
        "Show pending state and disable the button",
        "Make SubmitButton a reusable component",
        "Use correct type, name, required, and minLength",
      ],
    },

    { type: "heading", text: "✅ Section Summary" },
    {
      type: "list",
      items: [
        "Actions: async function on <form action={...}>",
        "useActionState returns [state, formAction, isPending]",
        "useFormStatus reads form pending state (from react-dom)",
        "Handle validation and server errors, keep user input",
      ],
    },
    {
      type: "qa",
      question: "1. How do you read an input value inside an action?",
      answer: 'With formData.get("name"), where name is the input\'s name attribute.',
    },
    {
      type: "qa",
      question: "2. What does useActionState return?",
      answer: "[state, formAction, isPending] — the result, the wrapped action, and a pending boolean.",
    },
  ],
};

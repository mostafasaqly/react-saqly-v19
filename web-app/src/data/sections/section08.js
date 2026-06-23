// القسم 8 — React Hook Form
export default {
  id: 8,
  title: "React Hook Form",
  level: "متوسط",
  lessons: [
    "لماذا React Hook Form؟",
    "تثبيت React Hook Form",
    "إنشاء أول نموذج",
    "تسجيل المدخلات (register)",
    "معالجة الإرسال",
    "التحقّق من الحقول المطلوبة",
    "التحقّق من النمط والطول",
    "إظهار رسائل الأخطاء",
    "القيم الافتراضية",
    "إعادة تعيين النماذج",
    "الإرسال إلى API",
    "RHF مقابل إجراءات رياكت 19",
  ],
  intro:
    "في القسم 7 كتبنا التحقّق يدوياً. للنماذج الكبيرة يصبح ذلك طويلاً ومكرّراً. React Hook Form مكتبة شهيرة تتعامل مع المدخلات والتحقّق والأخطاء بكود قليل جداً — وبسرعة عالية.",
  content: [
    { type: "heading", text: "1. لماذا React Hook Form؟" },
    {
      type: "paragraph",
      text: "النماذج اليدوية تحتاج useState لكل حقل و onChange لكل مدخل وتحققاً خاصاً. RHF يعطيك: كوداً أقل، تحقّقاً مدمجاً، سرعة عالية (مدخلات غير متحكَّم بها)، وأخطاءً جاهزة للعرض.",
    },

    { type: "heading", text: "2. تثبيت React Hook Form" },
    { type: "code", code: `npm install react-hook-form` },

    { type: "heading", text: "3. إنشاء أول نموذج" },
    {
      type: "paragraph",
      text: "كل شيء يبدأ من خطّاف useForm. لا useState، لا onChange — RHF يجمع القيم ويسلّمها لـ onSubmit ككائن واحد.",
    },
    {
      type: "code",
      code: `import { useForm } from "react-hook-form";

function MyForm() {
  const { register, handleSubmit } = useForm();
  function onSubmit(data) {
    console.log(data); // { username, email }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} />
      <input {...register("email")} />
      <button type="submit">Submit</button>
    </form>
  );
}`,
    },

    { type: "heading", text: "4. تسجيل المدخلات (register)" },
    {
      type: "paragraph",
      text: "register(\"name\") يربط المدخل بالنموذج. النص يصبح المفتاح في كائن data، والـ spread يضيف الخصائص اللازمة تلقائياً.",
    },
    { type: "code", code: `<input {...register("email")} />
// data: { email: "ما كتبه المستخدم" }` },

    { type: "heading", text: "5. معالجة الإرسال" },
    {
      type: "paragraph",
      text: "غلّف دالة الإرسال بـ handleSubmit. يشغّل التحقّق، وإن كان صحيحاً يستدعي دالتك بالبيانات. لا تستدعي preventDefault بنفسك.",
    },
    { type: "code", code: `<form onSubmit={handleSubmit(onSubmit)}>...</form>` },

    { type: "heading", text: "6. التحقّق من الحقول المطلوبة" },
    {
      type: "paragraph",
      text: "مرّر القواعد كوسيط ثانٍ لـ register. أبسطها required.",
    },
    {
      type: "code",
      code: `<input {...register("username", { required: "الاسم مطلوب" })} />`,
    },

    { type: "heading", text: "7. التحقّق من النمط والطول" },
    {
      type: "code",
      code: `<input {...register("email", {
  required: "البريد مطلوب",
  pattern: { value: /^\\S+@\\S+$/, message: "بريد غير صحيح" },
})} />

<input {...register("password", {
  minLength: { value: 6, message: "6 أحرف على الأقل" },
})} />`,
    },

    { type: "heading", text: "8. إظهار رسائل الأخطاء" },
    {
      type: "code",
      code: `const { register, handleSubmit, formState: { errors } } = useForm();

{errors.email && <small>{errors.email.message}</small>}`,
    },

    { type: "heading", text: "9. القيم الافتراضية" },
    {
      type: "paragraph",
      text: "أعطِ النموذج قيماً ابتدائية بـ defaultValues. ممتاز لنماذج «التعديل» التي تحمّل بيانات موجودة.",
    },
    {
      type: "code",
      code: `useForm({
  defaultValues: { username: "sara", email: "sara@example.com" },
});`,
    },

    { type: "heading", text: "10. إعادة تعيين النماذج" },
    {
      type: "code",
      code: `const { reset } = useForm();
function onSubmit(data) {
  console.log(data);
  reset(); // تفريغ الحقول
}`,
    },

    { type: "heading", text: "11. الإرسال إلى API" },
    {
      type: "paragraph",
      text: "اجعل onSubmit غير متزامنة. isSubmitting (من formState) يخبرك أنها مشغولة.",
    },
    {
      type: "code",
      code: `const { formState: { isSubmitting } } = useForm();

<button type="submit" disabled={isSubmitting}>
  {isSubmitting ? "جارٍ الحفظ..." : "تسجيل"}
</button>`,
    },

    { type: "heading", text: "12. RHF مقابل إجراءات رياكت 19" },
    {
      type: "list",
      items: [
        "React Hook Form: مكتبة تُثبّت، تحقّق غنيّ مدمج، الأفضل للنماذج الكبيرة المعقّدة",
        "إجراءات رياكت 19: مدمجة في رياكت، الأفضل للنماذج البسيطة وإجراءات الخادم",
        "ليسا عدوّين — كثير من التطبيقات يستخدم الاثنين معاً",
      ],
    },

    { type: "heading", text: "✅ ملخص القسم" },
    {
      type: "list",
      items: [
        "useForm يعطي register و handleSubmit و reset و formState",
        "register(\"name\") يربط المدخل ويجعله مفتاحاً في data",
        "القواعد في الوسيط الثاني (required، minLength، pattern)",
        "defaultValues للملء، reset للتفريغ، isSubmitting للانتظار",
      ],
    },
    {
      type: "qa",
      question: "1. ماذا يفعل register(\"email\")؟",
      answer: "يربط المدخل بالنموذج ويجعل email مفتاحاً في كائن data المُرسَل.",
    },
    {
      type: "qa",
      question: "2. متى تختار RHF بدل إجراءات رياكت 19؟",
      answer: "للنماذج الكبيرة بحقول كثيرة وتحقّق معقّد.",
    },
  ],
};

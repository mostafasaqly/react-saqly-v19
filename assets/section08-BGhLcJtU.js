const e={id:8,title:"React Hook Form",level:"متوسط",lessons:["لماذا React Hook Form؟","تثبيت React Hook Form","إنشاء أول نموذج","تسجيل المدخلات (register)","معالجة الإرسال","التحقّق من الحقول المطلوبة","التحقّق من النمط والطول","إظهار رسائل الأخطاء","القيم الافتراضية","إعادة تعيين النماذج","الإرسال إلى API","RHF مقابل Actions React 19"],intro:"في القسم 7 كتبنا التحقّق يدوياً. للنماذج الكبيرة يصبح ذلك طويلاً ومكرّراً. React Hook Form مكتبة شهيرة تتعامل مع المدخلات والتحقّق والأخطاء بكود قليل جداً — وبسرعة عالية.",content:[{type:"heading",text:"1. لماذا React Hook Form؟"},{type:"paragraph",text:"النماذج اليدوية تحتاج useState لكل حقل و onChange لكل مدخل وتحققاً خاصاً. RHF يعطيك: كوداً أقل، تحقّقاً مدمجاً، سرعة عالية (مدخلات غير متحكَّم بها)، وأخطاءً جاهزة للعرض."},{type:"heading",text:"2. تثبيت React Hook Form"},{type:"code",code:"npm install react-hook-form"},{type:"heading",text:"3. إنشاء أول نموذج"},{type:"paragraph",text:"كل شيء يبدأ من Hook useForm. لا useState، لا onChange — RHF يجمع القيم ويسلّمها لـ onSubmit ككائن واحد."},{type:"code",code:`import { useForm } from "react-hook-form";

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
}`},{type:"heading",text:"4. تسجيل المدخلات (register)"},{type:"paragraph",text:'register("name") يربط المدخل بالنموذج. النص يصبح المفتاح في كائن data، والـ spread يضيف Props اللازمة تلقائياً.'},{type:"code",code:`<input {...register("email")} />
// data: { email: "ما كتبه المستخدم" }`},{type:"heading",text:"5. معالجة الإرسال"},{type:"paragraph",text:"غلّف دالة الإرسال بـ handleSubmit. يشغّل التحقّق، وإن كان صحيحاً يستدعي دالتك بالبيانات. لا تستدعي preventDefault بنفسك."},{type:"code",code:"<form onSubmit={handleSubmit(onSubmit)}>...</form>"},{type:"heading",text:"6. التحقّق من الحقول المطلوبة"},{type:"paragraph",text:"مرّر القواعد كوسيط ثانٍ لـ register. أبسطها required."},{type:"code",code:'<input {...register("username", { required: "الاسم مطلوب" })} />'},{type:"heading",text:"7. التحقّق من النمط والطول"},{type:"code",code:`<input {...register("email", {
  required: "البريد مطلوب",
  pattern: { value: /^\\S+@\\S+$/, message: "بريد غير صحيح" },
})} />

<input {...register("password", {
  minLength: { value: 6, message: "6 أحرف على الأقل" },
})} />`},{type:"heading",text:"8. إظهار رسائل الأخطاء"},{type:"code",code:`const { register, handleSubmit, formState: { errors } } = useForm();

{errors.email && <small>{errors.email.message}</small>}`},{type:"heading",text:"9. القيم الافتراضية"},{type:"paragraph",text:"أعطِ النموذج قيماً ابتدائية بـ defaultValues. ممتاز لنماذج «التعديل» التي تحمّل بيانات موجودة."},{type:"code",code:`useForm({
  defaultValues: { username: "sara", email: "sara@example.com" },
});`},{type:"heading",text:"10. إعادة تعيين النماذج"},{type:"code",code:`const { reset } = useForm();
function onSubmit(data) {
  console.log(data);
  reset(); // تفريغ الحقول
}`},{type:"heading",text:"11. الإرسال إلى API"},{type:"paragraph",text:"اجعل onSubmit غير متزامنة. isSubmitting (من formState) يخبرك أنها مشغولة."},{type:"code",code:`const { formState: { isSubmitting } } = useForm();

<button type="submit" disabled={isSubmitting}>
  {isSubmitting ? "جارٍ الحفظ..." : "تسجيل"}
</button>`},{type:"heading",text:"12. RHF مقابل Actions React 19"},{type:"list",items:["React Hook Form: مكتبة تُثبّت، تحقّق غنيّ مدمج، الأفضل للنماذج الكبيرة المعقّدة","Actions React 19: مدمجة في React، الأفضل للنماذج البسيطة وActions الخادم","ليسا عدوّين — كثير من التطبيقات يستخدم الاثنين معاً"]},{type:"heading",text:"✅ ملخص القسم"},{type:"list",items:["useForm يعطي register و handleSubmit و reset و formState",'register("name") يربط المدخل ويجعله مفتاحاً في data',"القواعد في Middleware الثاني (required، minLength، pattern)","defaultValues للملء، reset للتفريغ، isSubmitting للانتظار"]},{type:"qa",question:'1. ماذا يفعل register("email")؟',answer:"يربط المدخل بالنموذج ويجعل email مفتاحاً في كائن data المُرسَل."},{type:"qa",question:"2. متى تختار RHF بدل Actions React 19؟",answer:"للنماذج الكبيرة بحقول كثيرة وتحقّق معقّد."}],titleEn:"React Hook Form",levelEn:"Intermediate",lessonsEn:["Why React Hook Form?","Installing React Hook Form","Creating Your First Form","Registering Inputs","Handling Submit","Required Field Validation","Pattern and Length Validation","Displaying Error Messages","Default Values","Resetting Forms","Submitting to an API","RHF vs React 19 Actions"],introEn:"In section 7 we wrote validation by hand. For large forms that becomes long and repetitive. React Hook Form is a popular library that handles inputs, validation, and errors with very little code — and at high speed.",contentEn:[{type:"heading",text:"1. Why React Hook Form?"},{type:"paragraph",text:"Manual forms need useState for every field, onChange for every input, and custom validation. RHF gives you: less code, built-in validation, high performance (uncontrolled inputs), and ready-to-display errors."},{type:"heading",text:"2. Installing React Hook Form"},{type:"code",code:"npm install react-hook-form"},{type:"heading",text:"3. Creating Your First Form"},{type:"paragraph",text:"Everything starts from the useForm hook. No useState, no onChange — RHF collects values and delivers them to onSubmit as one object."},{type:"code",code:`import { useForm } from "react-hook-form";

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
}`},{type:"heading",text:"4. Registering Inputs"},{type:"paragraph",text:'register("name") connects the input to the form. The string becomes the key in the data object, and the spread automatically adds the necessary props.'},{type:"code",code:`<input {...register("email")} />
// data: { email: "what the user typed" }`},{type:"heading",text:"5. Handling Submit"},{type:"paragraph",text:"Wrap your submit function with handleSubmit. It runs validation, and if valid, calls your function with the data. You don't call preventDefault yourself."},{type:"code",code:"<form onSubmit={handleSubmit(onSubmit)}>...</form>"},{type:"heading",text:"6. Required Field Validation"},{type:"paragraph",text:"Pass rules as a second argument to register. The simplest is required."},{type:"code",code:'<input {...register("username", { required: "Name is required" })} />'},{type:"heading",text:"7. Pattern and Length Validation"},{type:"code",code:`<input {...register("email", {
  required: "Email is required",
  pattern: { value: /^\\S+@\\S+$/, message: "Invalid email" },
})} />

<input {...register("password", {
  minLength: { value: 6, message: "At least 6 characters" },
})} />`},{type:"heading",text:"8. Displaying Error Messages"},{type:"code",code:`const { register, handleSubmit, formState: { errors } } = useForm();

{errors.email && <small>{errors.email.message}</small>}`},{type:"heading",text:"9. Default Values"},{type:"paragraph",text:'Give the form initial values with defaultValues. Great for "edit" forms that load existing data.'},{type:"code",code:`useForm({
  defaultValues: { username: "sara", email: "sara@example.com" },
});`},{type:"heading",text:"10. Resetting Forms"},{type:"code",code:`const { reset } = useForm();
function onSubmit(data) {
  console.log(data);
  reset(); // clear all fields
}`},{type:"heading",text:"11. Submitting to an API"},{type:"paragraph",text:"Make onSubmit async. isSubmitting (from formState) tells you it's busy."},{type:"code",code:`const { formState: { isSubmitting } } = useForm();

<button type="submit" disabled={isSubmitting}>
  {isSubmitting ? "Saving..." : "Register"}
</button>`},{type:"heading",text:"12. RHF vs React 19 Actions"},{type:"list",items:["React Hook Form: an installed library, rich built-in validation, best for large complex forms","React 19 Actions: built into React, best for simple forms and server actions","They're not enemies — many apps use both together"]},{type:"heading",text:"✅ Section Summary"},{type:"list",items:["useForm gives register, handleSubmit, reset, and formState",'register("name") connects the input and makes it a key in data',"Rules in the second argument (required, minLength, pattern)","defaultValues to pre-fill, reset to clear, isSubmitting for loading"]},{type:"qa",question:'1. What does register("email") do?',answer:"It connects the input to the form and makes email a key in the submitted data object."},{type:"qa",question:"2. When do you choose RHF over React 19 Actions?",answer:"For large forms with many fields and complex validation rules."}]};export{e as default};

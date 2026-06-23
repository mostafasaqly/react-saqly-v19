// القسم 5 — الحالة والتفاعلية
export default {
  id: 5,
  title: "الحالة والتفاعلية",
  level: "مبتدئ إلى متوسط",
  lessons: [
    "فهم الحالة (State)",
    "خطّاف useState",
    "تحديث الحالة البسيطة",
    "تحديث الكائنات في الحالة",
    "تحديث المصفوفات في الحالة",
    "الحالة المشتقّة",
    "المدخلات المتحكَّم بها",
    "رفع الحالة لأعلى",
    "مشاركة الحالة بين المكوّنات",
    "أخطاء شائعة في الحالة",
  ],
  intro:
    "هنا تبدأ التطبيقات في الحياة. الحالة (State) هي كيف يتذكّر المكوّن الأشياء ويحدّث الشاشة عند تغيّرها. أتقن هذا القسم وتستطيع بناء أي شيء تقريباً.",
  content: [
    { type: "heading", text: "1. فهم الحالة (State)" },
    {
      type: "paragraph",
      text: "المتغيّر العادي لا يحدّث الشاشة. رياكت يعيد الرسم فقط عند تغيّر الحالة. الحالة ذاكرة خاصة يراقبها رياكت — عند تغييرها يعيد رسم المكوّن ويحدّث الشاشة.",
    },
    {
      type: "tip",
      text: "النموذج الذهني: الحالة = بيانات + وعد بأن الشاشة تبقى متزامنة معها.",
    },

    { type: "heading", text: "2. خطّاف useState" },
    {
      type: "paragraph",
      text: "useState يعطيك قيمة حالية ودالة لتغييرها. لا تغيّر الحالة مباشرةً أبداً — استخدم الدالة دائماً.",
    },
    {
      type: "code",
      code: `import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}`,
    },

    { type: "heading", text: "3. تحديث الحالة البسيطة" },
    {
      type: "paragraph",
      text: "القيم البسيطة (رقم، نص، منطقي) أسهل تحديثاً — مرّر القيمة الجديدة فقط. تبديل المنطقي نمط شائع جداً.",
    },
    {
      type: "code",
      code: `setCount((prev) => prev + 1);   // أكثر أماناً
setIsOpen((prev) => !prev);     // تبديل true/false`,
    },

    { type: "heading", text: "4. تحديث الكائنات في الحالة" },
    {
      type: "paragraph",
      text: "لا تغيّر حقلاً مباشرةً. اصنع كائناً جديداً بعامل الانتشار، ثم غيّر الحقل الذي تريده.",
    },
    {
      type: "code",
      code: `setUser({ ...user, age: 26 });
// { ...user } ينسخ الحقول القديمة، ثم age: 26 يستبدل age`,
    },

    { type: "heading", text: "5. تحديث المصفوفات في الحالة" },
    {
      type: "paragraph",
      text: "نفس القاعدة: اصنع مصفوفة جديدة دائماً. استخدم [...] و filter و map — لا تستخدم push أو splice على الحالة.",
    },
    {
      type: "code",
      code: `setItems([...items, "Cherry"]);                    // إضافة
setItems(items.filter((i) => i !== "Banana"));     // حذف
setItems(items.map((i) => i === "Apple" ? "Avocado" : i)); // تعديل`,
    },

    { type: "heading", text: "6. الحالة المشتقّة" },
    {
      type: "paragraph",
      text: "إذا كان بإمكانك حساب قيمة من حالة موجودة، فلا تخزّنها — احسبها أثناء الرسم. هذا يتجنّب أخطاء عدم التزامن.",
    },
    {
      type: "code",
      code: `const doneCount = tasks.filter((t) => t.done).length;
return <p>{doneCount} من {tasks.length} مكتملة</p>;`,
    },

    { type: "heading", text: "7. المدخلات المتحكَّم بها" },
    {
      type: "paragraph",
      text: "المدخل المتحكَّم به يأخذ قيمته من الحالة ويحدّثها مع كل ضغطة. رياكت هو المصدر الوحيد للحقيقة.",
    },
    {
      type: "code",
      code: `<input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>`,
    },

    { type: "heading", text: "8. رفع الحالة لأعلى" },
    {
      type: "paragraph",
      text: "عندما يحتاج مكوّنان شقيقان نفس البيانات، انقل الحالة إلى أقرب أب مشترك، ثم مرّرها لأسفل كـ props. البيانات تنزل عبر props، والأحداث تصعد عبر callbacks.",
    },
    {
      type: "code",
      code: `function Parent() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Display count={count} />
      <Controls onAdd={() => setCount(count + 1)} />
    </>
  );
}`,
    },

    { type: "heading", text: "9. مشاركة الحالة بين المكوّنات" },
    {
      type: "paragraph",
      text: "تشاركها بتمرير نوعين من props: القيمة (للقراءة) ودالة التغيير (للتحديث). أبقِ الحالة في أدنى مكوّن يقع فوق كل من يحتاجها.",
    },
    {
      type: "code",
      code: `<SearchBar value={search} onChange={setSearch} />
<Results query={search} />`,
    },
    {
      type: "tip",
      text: "القاعدة: أبقِ الحالة منخفضة قدر الإمكان، لكن مرتفعة بما يكفي ليصل إليها كل من يحتاجها.",
    },

    { type: "heading", text: "10. أخطاء شائعة في الحالة" },
    {
      type: "list",
      items: [
        "تغيير الحالة مباشرةً (count = count + 1) — لا يلاحظه رياكت",
        "استخدام push/splice على مصفوفة الحالة — نفس المرجع، لا إعادة رسم",
        "تخزين ما يمكن حسابه — استخدم الحالة المشتقّة بدلاً منه",
        "توقّع تغيّر الحالة فوراً — setState يجدول التحديث، لا يغيّر السطر التالي",
        "في التحديثات السريعة استخدم صيغة الدالة (prev) => ...",
      ],
    },
    {
      type: "warning",
      text: "القاعدة الذهبية للحالة: لا تعدّل أبداً. اصنع دائماً قيمة جديدة ({ ... } أو [ ... ]) ومرّرها للدالة.",
    },

    { type: "heading", text: "✅ ملخص القسم" },
    {
      type: "list",
      items: [
        "الحالة ذاكرة يراقبها رياكت؛ تغييرها يعيد الرسم",
        "useState يعطي [value, setValue]؛ لا تعدّل مباشرةً",
        "الكائنات: { ...obj, field }؛ المصفوفات: [...arr] و filter و map",
        "الحالة المشتقّة: احسب بدل أن تخزّن",
        "رفع/مشاركة الحالة: البيانات لأسفل، الأحداث لأعلى",
      ],
    },
    {
      type: "qa",
      question: "1. لماذا لا يحدّث المتغيّر العادي الشاشة؟",
      answer:
        "رياكت يعيد الرسم فقط عند تغيّر الحالة. المتغيّر العادي يتغيّر في الذاكرة لكن رياكت لا يلاحظه.",
    },
    {
      type: "qa",
      question: "2. كيف تحدّث حقلاً واحداً في كائن داخل الحالة؟",
      answer: "اصنع كائناً جديداً: setUser({ ...user, age: 26 }).",
    },
  ],
};

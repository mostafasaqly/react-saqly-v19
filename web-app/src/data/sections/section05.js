// القسم 5 — الحالة والتفاعلية
export default {
  id: 5,
  title: "State والتفاعلية",
  level: "مبتدئ إلى متوسط",
  lessons: [
    "فهم الحالة (State)",
    "Hook : useState",
    "تحديث Simple State",
    "تحديث الكائنات في الحالة",
    "تحديث المصفوفات في الحالة",
    "Derived State",
    "المدخلات المتحكَّم بها",
    "رفع الحالة لأعلى",
    "مشاركة الحالة بين Components",
    "أخطاء شائعة في الحالة",
  ],
  intro:
    "هنا تبدأ التطبيقات في الحياة. الحالة (State) هي كيف يتذكّر Component الأشياء ويحدّث الشاشة عند تغيّرها. أتقن هذا القسم وتستطيع بناء أي شيء تقريباً.",
  content: [
    { type: "heading", text: "1. فهم الحالة (State)" },
    {
      type: "paragraph",
      text: "المتغيّر العادي لا يحدّث الشاشة. React يعيد الرسم فقط عند تغيّر الحالة. الحالة ذاكرة خاصة يراقبها React — عند تغييرها يعيد رسم Component ويحدّث الشاشة.",
    },
    {
      type: "tip",
      text: "النموذج الذهني: الحالة = بيانات + وعد بأن الشاشة تبقى متزامنة معها.",
    },

    { type: "heading", text: "2. Hook : useState" },
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

    { type: "heading", text: "3. تحديث Simple State" },
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

    { type: "heading", text: "6. Derived State" },
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
      text: "المدخل المتحكَّم به يأخذ قيمته من الحالة ويحدّثها مع كل ضغطة. React هو المصدر الوحيد للحقيقة.",
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
      text: "عندما يحتاج Componentان شقيقان نفس البيانات، انقل الحالة إلى أقرب أب مشترك، ثم مرّرها لأسفل كـ props. البيانات تنزل عبر props، والأحداث تصعد عبر callbacks.",
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

    { type: "heading", text: "9. مشاركة الحالة بين Components" },
    {
      type: "paragraph",
      text: "تشاركها بتمرير نوعين من props: القيمة (للقراءة) ودالة التغيير (للتحديث). أبقِ الحالة في أدنى Component يقع فوق كل من يحتاجها.",
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
        "تغيير الحالة مباشرةً (count = count + 1) — لا يلاحظه React",
        "استخدام push/splice على مصفوفة الحالة — نفس المرجع، لا Re-render",
        "تخزين ما يمكن حسابه — استخدم Derived State بدلاً منه",
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
        "الحالة ذاكرة يراقبها React؛ تغييرها يعيد الرسم",
        "useState يعطي [value, setValue]؛ لا تعدّل مباشرةً",
        "الكائنات: { ...obj, field }؛ المصفوفات: [...arr] و filter و map",
        "Derived State: احسب بدل أن تخزّن",
        "رفع/مشاركة الحالة: البيانات لأسفل، الأحداث لأعلى",
      ],
    },
    {
      type: "qa",
      question: "1. لماذا لا يحدّث المتغيّر العادي الشاشة؟",
      answer:
        "React يعيد الرسم فقط عند تغيّر الحالة. المتغيّر العادي يتغيّر في الذاكرة لكن React لا يلاحظه.",
    },
    {
      type: "qa",
      question: "2. كيف تحدّث حقلاً واحداً في كائن داخل الحالة؟",
      answer: "اصنع كائناً جديداً: setUser({ ...user, age: 26 }).",
    },
  ],

  titleEn: "State & Interactivity",
  levelEn: "Beginner to Intermediate",
  lessonsEn: [
    "Understanding State",
    "Hook: useState",
    "Updating Simple State",
    "Updating Objects in State",
    "Updating Arrays in State",
    "Derived State",
    "Controlled Inputs",
    "Lifting State Up",
    "Sharing State Between Components",
    "Common State Mistakes",
  ],
  introEn:
    "This is where applications come alive. State is how a component remembers things and updates the screen when they change. Master this section and you can build almost anything.",
  contentEn: [
    { type: "heading", text: "1. Understanding State", term: "State" },
    {
      type: "paragraph",
      text: "A regular variable doesn't update the screen. React only re-renders when state changes. State is a special memory React watches — when you change it, React re-renders the component and updates the screen.",
    },
    {
      type: "tip",
      text: "Mental model: state = data + a promise that the screen stays in sync with it.",
    },

    { type: "heading", text: "2. Hook: useState", term: "useState" },
    {
      type: "paragraph",
      text: "useState gives you the current value and a function to change it. Never mutate state directly — always use the setter function.",
    },
    {
      type: "code",
      code: `import { useState } from "react";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;\n}`,
    },

    { type: "heading", text: "3. Updating Simple State" },
    {
      type: "paragraph",
      text: "Simple values (number, string, boolean) are easiest to update — just pass the new value. Toggling a boolean is a very common pattern.",
    },
    {
      type: "code",
      code: `setCount((prev) => prev + 1);   // safer\nsetIsOpen((prev) => !prev);     // toggle true/false`,
    },

    { type: "heading", text: "4. Updating Objects in State" },
    {
      type: "paragraph",
      text: "Never mutate a field directly. Create a new object with the spread operator, then change the field you want.",
    },
    {
      type: "code",
      code: `setUser({ ...user, age: 26 });\n// { ...user } copies old fields, then age: 26 replaces age`,
    },

    { type: "heading", text: "5. Updating Arrays in State" },
    {
      type: "paragraph",
      text: "Same rule: always create a new array. Use [...], filter, and map — never use push or splice on state.",
    },
    {
      type: "code",
      code: `setItems([...items, "Cherry"]);                         // add\nsetItems(items.filter((i) => i !== "Banana"));          // remove\nsetItems(items.map((i) => i === "Apple" ? "Avocado" : i)); // update`,
    },

    { type: "heading", text: "6. Derived State", term: "Derived State" },
    {
      type: "paragraph",
      text: "If you can calculate a value from existing state, don't store it — compute it during rendering. This avoids sync bugs.",
    },
    {
      type: "code",
      code: `const doneCount = tasks.filter((t) => t.done).length;\nreturn <p>{doneCount} of {tasks.length} completed</p>;`,
    },

    { type: "heading", text: "7. Controlled Inputs", term: "Controlled Inputs" },
    {
      type: "paragraph",
      text: "A controlled input takes its value from state and updates it on every keystroke. React is the single source of truth.",
    },
    {
      type: "code",
      code: `<input\n  value={name}\n  onChange={(e) => setName(e.target.value)}\n/>`,
    },

    { type: "heading", text: "8. Lifting State Up", term: "Lifting State Up" },
    {
      type: "paragraph",
      text: "When two sibling components need the same data, move state up to their closest common parent, then pass it down as props. Data flows down via props, events flow up via callbacks.",
    },
    {
      type: "code",
      code: `function Parent() {\n  const [count, setCount] = useState(0);\n  return (\n    <>\n      <Display count={count} />\n      <Controls onAdd={() => setCount(count + 1)} />\n    </>\n  );\n}`,
    },

    { type: "heading", text: "9. Sharing State Between Components", term: "Sharing State" },
    {
      type: "paragraph",
      text: "Share it by passing two kinds of props: the value (to read) and the setter (to update). Keep state in the lowest component that sits above everyone who needs it.",
    },
    {
      type: "code",
      code: `<SearchBar value={search} onChange={setSearch} />\n<Results query={search} />`,
    },
    {
      type: "tip",
      text: "Rule: keep state as low as possible, but high enough for everyone who needs it to reach it.",
    },

    { type: "heading", text: "10. Common State Mistakes" },
    {
      type: "list",
      items: [
        "Mutating state directly (count = count + 1) — React won't notice",
        "Using push/splice on a state array — same reference, no re-render",
        "Storing what can be computed — use derived state instead",
        "Expecting state to change immediately — setState schedules the update",
        "For rapid updates use the function form (prev) => ...",
      ],
    },
    {
      type: "warning",
      text: "Golden rule of state: never mutate. Always create a new value ({ ... } or [ ... ]) and pass it to the setter.",
    },

    { type: "heading", text: "✅ Section Summary" },
    {
      type: "list",
      items: [
        "State is memory React watches; changing it triggers a re-render",
        "useState gives [value, setValue]; never mutate directly",
        "Objects: { ...obj, field }; Arrays: [...arr], filter, map",
        "Derived state: compute instead of store",
        "Lifting/sharing state: data down, events up",
      ],
    },
    {
      type: "qa",
      question: "1. Why doesn't a regular variable update the screen?",
      answer:
        "React only re-renders when state changes. A regular variable changes in memory but React doesn't notice.",
    },
    {
      type: "qa",
      question: "2. How do you update a single field in an object stored in state?",
      answer: "Create a new object: setUser({ ...user, age: 26 }).",
    },
  ],
};

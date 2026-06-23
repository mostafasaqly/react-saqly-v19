// القسم 17 — المشروع الأول: تطبيق إدارة المهام
export default {
  id: 17,
  title: "المشروع الأول: تطبيق إدارة المهام",
  level: "مشروع",
  lessons: [
    "نظرة عامة على المشروع",
    "إنشاء تخطيط التطبيق",
    "إنشاء مكوّنات قابلة لإعادة الاستخدام",
    "إنشاء نموذج بيانات المهمة",
    "إضافة المهام",
    "تحديث المهام",
    "حذف المهام",
    "تعليم المهام كمكتملة",
    "فلترة المهام",
    "البحث في المهام",
    "حفظ البيانات في Local Storage",
    "إضافة إجراءات النماذج",
    "إضافة واجهة الانتظار",
    "إضافة التحديثات التفاؤلية",
    "إعادة الهيكلة النهائية",
  ],
  intro:
    "مشروعنا الأول! تطبيق إدارة مهام تضيف وتعدّل وتكمل وتحذف وتفلتر وتبحث في المهام، وتحفظها بعد إعادة التحميل، وتستخدم إجراءات رياكت 19 وواجهة الانتظار والتحديثات التفاؤلية. أول قطعة في معرض أعمالك.",
  content: [
    { type: "heading", text: "1. نظرة عامة على المشروع" },
    {
      type: "list",
      items: [
        "إضافة مهمة، وتعليمها مكتملة/نشطة، وتعديلها، وحذفها",
        "فلترة (الكل / النشطة / المكتملة) وبحث بالنص",
        "حفظ في localStorage",
        "إجراءات النماذج + واجهة انتظار + إضافة تفاؤلية",
      ],
    },
    {
      type: "code",
      code: `src/
├── App.jsx
├── components/
│   ├── TaskForm.jsx
│   ├── TaskList.jsx
│   ├── TaskItem.jsx
│   ├── FilterBar.jsx
│   └── SearchBar.jsx
├── hooks/useLocalStorage.jsx
└── utils/task.js`,
    },

    { type: "heading", text: "2. إنشاء تخطيط التطبيق" },
    {
      type: "paragraph",
      text: "App.jsx هو «العقل». يملك المهام والفلتر والبحث، ويمرّر البيانات والدوال لأسفل (رفع الحالة لأعلى).",
    },

    { type: "heading", text: "3. إنشاء مكوّنات قابلة لإعادة الاستخدام" },
    {
      type: "paragraph",
      text: "نقسّم الواجهة لقطع صغيرة ذات مهمّة واحدة: TaskForm و TaskList و TaskItem و FilterBar و SearchBar. المكوّنات الصغيرة أسهل قراءةً وإعادة استخدام.",
    },

    { type: "heading", text: "4. إنشاء نموذج بيانات المهمة" },
    {
      type: "paragraph",
      text: "قبل كتابة الميزات، حدّد شكل المهمة. نموذج واضح يمنع الأخطاء.",
    },
    {
      type: "code",
      code: `export function createTask(text) {
  return {
    id: crypto.randomUUID(),
    text: text.trim(),
    done: false,
    createdAt: Date.now(),
  };
}`,
    },

    { type: "heading", text: "5. إضافة المهام" },
    {
      type: "code",
      code: `function addTask(text) {
  setTasks([...tasks, createTask(text)]);
}`,
    },

    { type: "heading", text: "6. تحديث المهام" },
    {
      type: "code",
      code: `function editTask(id, newText) {
  setTasks(tasks.map((t) => (t.id === id ? { ...t, text: newText } : t)));
}`,
    },

    { type: "heading", text: "7. حذف المهام" },
    {
      type: "code",
      code: `function deleteTask(id) {
  setTasks(tasks.filter((t) => t.id !== id));
}`,
    },

    { type: "heading", text: "8. تعليم المهام كمكتملة" },
    {
      type: "code",
      code: `function toggleTask(id) {
  setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
}`,
    },

    { type: "heading", text: "9. فلترة المهام" },
    {
      type: "code",
      code: `const byFilter = tasks.filter((task) => {
  if (filter === "active") return !task.done;
  if (filter === "completed") return task.done;
  return true;
});`,
    },

    { type: "heading", text: "10. البحث في المهام" },
    {
      type: "code",
      code: `const visibleTasks = byFilter.filter((task) =>
  task.text.toLowerCase().includes(search.toLowerCase())
);`,
    },

    { type: "heading", text: "11. حفظ البيانات في Local Storage" },
    {
      type: "paragraph",
      text: "نريد بقاء المهام بعد إعادة التحميل. خطّاف useLocalStorage يتولّى ذلك — فقط بدّل useState به.",
    },
    {
      type: "code",
      code: `const [tasks, setTasks] = useLocalStorage("tasks", []);`,
    },

    { type: "heading", text: "12. إضافة إجراءات النماذج" },
    {
      type: "code",
      code: `async function handleAdd(formData) {
  const text = formData.get("text");
  if (!text || !text.trim()) return;
  onAdd(text.trim());
}`,
    },

    { type: "heading", text: "13. إضافة واجهة الانتظار" },
    {
      type: "code",
      code: `import { useFormStatus } from "react-dom";
function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? "جارٍ..." : "إضافة"}</button>;
}`,
    },

    { type: "heading", text: "14. إضافة التحديثات التفاؤلية" },
    {
      type: "code",
      code: `const [optimisticTasks, addOptimisticTask] = useOptimistic(
  tasks,
  (current, newTask) => [...current, { ...newTask, sending: true }]
);`,
    },

    { type: "heading", text: "15. إعادة الهيكلة النهائية" },
    {
      type: "list",
      items: [
        "شكل المهمة في نموذج واحد",
        "مكوّنات صغيرة ذات مهمّة واحدة",
        "حالة مشتقّة للفلتر والبحث",
        "useLocalStorage و SubmitButton قابلان لإعادة الاستخدام",
      ],
    },
    {
      type: "tip",
      text: "تحدّيات: زر «مسح المكتملة»، عدّاد «3 من 7 مكتملة»، تاريخ استحقاق، تعديل بالنقر المزدوج.",
    },

    { type: "heading", text: "🎉 ما بنيته" },
    {
      type: "paragraph",
      text: "تطبيق إدارة مهام كامل ودائم يستخدم رياكت الأساسي مع إجراءات رياكت 19 وواجهة الانتظار والتحديثات التفاؤلية. يستحق معرض الأعمال!",
    },
  ],
};

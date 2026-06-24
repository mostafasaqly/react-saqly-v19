// sections.js — metadata فقط للـ sidebar (بدون content)
// الـ content بيتحمّل lazily في useSectionContent

export const sections = [
  { id: 1,  title: "مقدمة الكورس",                    titleEn: "Course Introduction" },
  { id: 2,  title: "إعداد بيئة التطوير",               titleEn: "Setting Up the Dev Environment" },
  { id: 3,  title: "أساسيات رياكت",                   titleEn: "React Fundamentals" },
  { id: 4,  title: "تنسيق تطبيقات رياكت",              titleEn: "Styling React Apps" },
  { id: 5,  title: "الحالة والتفاعلية",                titleEn: "State & Interactivity" },
  { id: 6,  title: "التأثيرات ودورة الحياة",            titleEn: "Effects & Lifecycle" },
  { id: 7,  title: "النماذج في رياكت 19",              titleEn: "Forms in React 19" },
  { id: 8,  title: "React Hook Form",                  titleEn: "React Hook Form" },
  { id: 9,  title: "واجهة المستخدم غير المتزامنة",     titleEn: "Async UI; Optimistic Updates" },
  { id: 10, title: "التواصل بين المكوّنات",             titleEn: "Component Communication" },
  { id: 11, title: "التوجيه مع React Router DOM",      titleEn: "Routing with React Router DOM" },
  { id: 12, title: "جلب البيانات و Axios",             titleEn: "Data Fetching ); Axios" },
  { id: 13, title: "Redux Toolkit",                    titleEn: "Redux Toolkit" },
  { id: 14, title: "TypeScript مع رياكت",              titleEn: "TypeScript with React" },
  { id: 15, title: "الاختبار مع Vitest",               titleEn: "Testing with Vitest" },
  { id: 16, title: "Next.js — المقدمة",                titleEn: "Next.js — Introduction" },
  { id: 17, title: "المشروع الأول: تطبيق إدارة المهام",  titleEn: "Project 1: Task Manager App" },
  { id: 18, title: "المشروع الثاني: لوحة بيانات API",   titleEn: "Project 2: API Data Dashboard" },
  { id: 19, title: "المشروع الثالث: متجر مصغّر بـ Redux", titleEn: "Project 3: Mini Store with Redux" },
];

// dynamic loader — يُستخدم في useSectionContent
export function loadSection(id) {
  return import(`./sections/section${String(id).padStart(2, "0")}.js`).then(
    (m) => m.default
  );
}

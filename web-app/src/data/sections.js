// sections.js — metadata فقط للـ sidebar (بدون content)
// الـ content بيتحمّل lazily في useSectionContent.
//
// ⚠️ مصدر الحقيقة للعناوين هو ملفات الأقسام نفسها (sections/sectionNN.js).
// لازم تتطابق القيم هنا مع title/titleEn في كل ملف قسم، وإلا يظهر للمستخدم
// عنوان في القائمة الجانبية يختلف عن عنوان الصفحة عند النقر عليه.

export const sections = [
  { id: 1,  title: "مقدمة الكورس",                          titleEn: "Course Introduction" },
  { id: 2,  title: "إعداد بيئة التطوير",                     titleEn: "Setting Up the Dev Environment" },
  { id: 3,  title: "أساسيات رياكت",                         titleEn: "React Fundamentals" },
  { id: 4,  title: "تنسيق تطبيقات رياكت",                    titleEn: "Styling React Apps" },
  { id: 5,  title: "الحالة والتفاعلية",                      titleEn: "State & Interactivity" },
  { id: 6,  title: "التأثيرات ودورة الحياة",                  titleEn: "Effects & Lifecycle" },
  { id: 7,  title: "النماذج في رياكت 19",                    titleEn: "Forms in React 19" },
  { id: 8,  title: "React Hook Form",                        titleEn: "React Hook Form" },
  { id: 9,  title: "الواجهة غير المتزامنة والتحديثات التفاؤلية", titleEn: "Async UI & Optimistic Updates" },
  { id: 10, title: "التواصل بين المكوّنات",                   titleEn: "Component Communication" },
  { id: 11, title: "التوجيه بـ React Router DOM",            titleEn: "Routing with React Router DOM" },
  { id: 12, title: "جلب البيانات و Axios",                   titleEn: "Data Fetching & Axios" },
  { id: 13, title: "Suspense وواجهة use في رياكت 19",        titleEn: "Suspense & the use API in React 19" },
  { id: 14, title: "إدارة الحالة بـ Redux Toolkit",          titleEn: "State Management with Redux Toolkit" },
  { id: 15, title: "Redux غير المتزامن بـ createAsyncThunk",  titleEn: "Async Redux with createAsyncThunk" },
  { id: 16, title: "الأداء وأفضل الممارسات",                 titleEn: "Performance & Best Practices" },
  { id: 17, title: "المشروع الأول: تطبيق إدارة المهام",        titleEn: "Project 1: Task Manager App" },
  { id: 18, title: "المشروع الثاني: لوحة بيانات API",         titleEn: "Project 2: API Data Dashboard" },
  { id: 19, title: "المشروع الثالث: متجر مصغّر بـ Redux",      titleEn: "Project 3: Mini Store with Redux" },
];

// dynamic loader — يُستخدم في useSectionContent
export function loadSection(id) {
  return import(`./sections/section${String(id).padStart(2, "0")}.js`).then(
    (m) => m.default
  );
}

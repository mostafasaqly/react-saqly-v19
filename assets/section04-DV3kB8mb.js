const e={id:4,title:"تنسيق تطبيقات رياكت",level:"مبتدئ",lessons:["CSS العام (Global CSS)","وحدات CSS (CSS Modules)","الكلاسات الديناميكية","الأنماط المضمّنة (Inline Styles)","التنسيق الشرطي","أساسيات التخطيط المتجاوب","تنظيم الأنماط في المشاريع"],intro:"التطبيق الذي يعمل جيّد، لكن التطبيق الجميل أفضل. في هذا القسم نتعلّم طرق إضافة CSS لرياكت، ومتى نستخدم كلاً منها، وكيف ننظّم الأنماط مع نمو المشروع.",content:[{type:"heading",text:"1. CSS العام (Global CSS)"},{type:"paragraph",text:"بعض الأنماط تخصّ التطبيق كله — مثل خلفية الصفحة والخط الافتراضي. أنشئ ملفاً واحداً (Vite يعطيك index.css) واستورده مرة واحدة في main.jsx."},{type:"code",code:`* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: system-ui, sans-serif;
  background: #f5f5f5;
}`},{type:"heading",text:"2. وحدات CSS (CSS Modules)"},{type:"paragraph",text:"في المشاريع الكبيرة قد يتعارض كلاسان بنفس الاسم. وحدة CSS تجعل الأنماط محلّية لمكوّن واحد. سمّ الملف Something.module.css ورياكت يجعل أسماء الكلاسات فريدة."},{type:"code",code:`import styles from "./Button.module.css";

function Button() {
  return <button className={styles.button}>Save</button>;
}`},{type:"tip",text:"استخدم وحدات CSS عندما تخصّ الأنماط مكوّناً معيّناً. هذا هو الخيار الافتراضي الآمن."},{type:"heading",text:"3. الكلاسات الديناميكية"},{type:"paragraph",text:"بما أن className مجرد نص، يمكنك تحديده بجافاسكريبت بناءً على البيانات."},{type:"code",code:`function Alert({ type }) {
  const className = \`alert alert-\${type}\`;
  return <div className={className}>Saved!</div>;
}
// النتيجة: class="alert alert-success"`},{type:"heading",text:"4. الأنماط المضمّنة (Inline Styles)"},{type:"paragraph",text:"في رياكت، خاصية style تأخذ كائن جافاسكريبت (وليس نصاً)، والخصائص بصيغة camelCase. مفيدة للقيم الديناميكية مثل عرض شريط تقدّم من الحالة."},{type:"code",code:'<div style={{ width: `${percent}%`, background: "green", height: 10 }} />'},{type:"warning",text:"لا تفرط في الأنماط المضمّنة — جيّدة للقيم الديناميكية لكن يصعب إعادة استخدامها."},{type:"heading",text:"5. التنسيق الشرطي"},{type:"paragraph",text:"غيّر الشكل بناءً على الحالة — زر يبدو «نشطاً» عند اختياره، أو صف مشطوب عند إكمال المهمة."},{type:"code",code:`<button className={isActive ? "btn active" : "btn"}>القائمة</button>

<li style={{ textDecoration: task.done ? "line-through" : "none" }}>
  {task.text}
</li>`},{type:"heading",text:"6. أساسيات التخطيط المتجاوب"},{type:"paragraph",text:"يجب أن يبدو تطبيقك جيّداً على الهاتف والتابلت والشاشة الكبيرة. هذه أدوات CSS عادية: Flexbox و Grid و media queries."},{type:"code",code:`.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

@media (max-width: 600px) {
  .sidebar { width: 100%; }
}`},{type:"tip",text:"صمّم للهاتف أولاً، ثم أضِف media queries للشاشات الأكبر."},{type:"heading",text:"7. تنظيم الأنماط في المشاريع"},{type:"list",items:["CSS العام: للإعادة (reset) والخطوط ومتغيّرات الألوان (CSS variables)","أنماط المكوّن: في وحدة CSS بجانب المكوّن","مصدر واحد لقيم الثيم — غيّر اللون مرة في :root فيتحدّث في كل مكان","الأنماط المضمّنة للقيم الديناميكية فقط"]},{type:"code",code:`:root {
  --primary: royalblue;
  --radius: 8px;
}
/* استخدمها: color: var(--primary); */`},{type:"heading",text:"✅ ملخص القسم"},{type:"list",items:["CSS العام للأنماط الشاملة، ووحدات CSS لأنماط المكوّن","الكلاسات الديناميكية تُبنى بجافاسكريبت","style يأخذ كائناً (camelCase) للقيم الديناميكية","المتجاوب: Flexbox و Grid و media queries"]},{type:"qa",question:"1. ما اسم الملف الذي يجعله وحدة CSS؟",answer:"ملف ينتهي بـ .module.css، مثل Card.module.css."},{type:"qa",question:"2. أين يجب أن توضع ألوان الثيم المستخدمة في كل مكان؟",answer:"في CSS العام كمتغيّرات (CSS variables) تحت :root."}],titleEn:"Styling React Apps",levelEn:"Beginner",lessonsEn:["Global CSS","CSS Modules","Dynamic Classes","Inline Styles","Conditional Styling","Responsive Layout Basics","Organizing Styles in Projects"],introEn:"An app that works is good, but a beautiful app is better. In this section we learn the ways to add CSS to React, when to use each, and how to organize styles as the project grows.",contentEn:[{type:"heading",text:"1. Global CSS",term:"Global CSS"},{type:"paragraph",text:"Some styles apply to the whole app — like the page background and default font. Create one file (Vite gives you index.css) and import it once in main.jsx."},{type:"code",code:`* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: system-ui, sans-serif;
  background: #f5f5f5;
}`},{type:"heading",text:"2. CSS Modules",term:"CSS Modules"},{type:"paragraph",text:"In large projects two classes with the same name can clash. A CSS Module makes styles local to one component. Name the file Something.module.css and React makes class names unique."},{type:"code",code:`import styles from "./Button.module.css";

function Button() {
  return <button className={styles.button}>Save</button>;
}`},{type:"tip",text:"Use CSS Modules when styles belong to a specific component. It's the safe default."},{type:"heading",text:"3. Dynamic Classes",term:"Dynamic Classes"},{type:"paragraph",text:"Since className is just a string, you can build it with JavaScript based on data."},{type:"code",code:`function Alert({ type }) {
  const className = \`alert alert-\${type}\`;
  return <div className={className}>Saved!</div>;
}
// Result: class="alert alert-success"`},{type:"heading",text:"4. Inline Styles",term:"Inline Styles"},{type:"paragraph",text:"In React, the style prop takes a JavaScript object (not a string), and properties are camelCase. Useful for dynamic values like a progress bar width from state."},{type:"code",code:'<div style={{ width: `${percent}%`, background: "green", height: 10 }} />'},{type:"warning",text:"Don't overuse inline styles — good for dynamic values but hard to reuse."},{type:"heading",text:"5. Conditional Styling",term:"Conditional Styling"},{type:"paragraph",text:"Change appearance based on state — a button looks 'active' when selected, or a row is struck through when a task is done."},{type:"code",code:`<button className={isActive ? "btn active" : "btn"}>Menu</button>

<li style={{ textDecoration: task.done ? "line-through" : "none" }}>
  {task.text}
</li>`},{type:"heading",text:"6. Responsive Layout Basics"},{type:"paragraph",text:"Your app should look good on phones, tablets, and large screens. These are regular CSS tools: Flexbox, Grid, and media queries."},{type:"code",code:`.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

@media (max-width: 600px) {
  .sidebar { width: 100%; }
}`},{type:"tip",text:"Design for mobile first, then add media queries for larger screens."},{type:"heading",text:"7. Organizing Styles in Projects"},{type:"list",items:["Global CSS: for reset, fonts, and color variables (CSS variables)","Component styles: in a CSS Module next to the component","Single source for theme values — change one color in :root and it updates everywhere","Inline styles for dynamic values only"]},{type:"code",code:`:root {
  --primary: royalblue;
  --radius: 8px;
}
/* Usage: color: var(--primary); */`},{type:"heading",text:"✅ Section Summary"},{type:"list",items:["Global CSS for app-wide styles, CSS Modules for component styles","Dynamic classes are built with JavaScript","style takes an object (camelCase) for dynamic values","Responsive: Flexbox, Grid, and media queries"]},{type:"qa",question:"1. What file naming makes it a CSS Module?",answer:"A file ending in .module.css, e.g. Card.module.css."},{type:"qa",question:"2. Where should theme colors used everywhere be placed?",answer:"In global CSS as variables (CSS variables) under :root."}]};export{e as default};

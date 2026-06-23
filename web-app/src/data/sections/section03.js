// القسم 3 — أساسيات رياكت
export default {
  id: 3,
  title: "أساسيات رياكت",
  level: "مبتدئ",
  lessons: [
    "ما هو رياكت؟",
    "كيف يعمل رياكت",
    "المكوّنات و JSX",
    "عرض العناصر",
    "الخصائص (Props)",
    "خاصية children",
    "العرض الشرطي",
    "عرض القوائم",
    "التعامل مع الأحداث",
    "إعادة استخدام المكوّنات",
  ],
  intro:
    "هذا قلب رياكت. بمجرد أن تفهم المكوّنات و JSX و props والأحداث، كل ما بعده مجرد إضافات فوقها. خذ وقتك هنا.",
  content: [
    { type: "heading", text: "1. ما هو رياكت؟" },
    {
      type: "paragraph",
      text: "بدلاً من البحث عن كل عنصر وتحديثه يدوياً (كما في جافاسكريبت العادية)، رياكت يتيح لك وصف شكل الشاشة لبيانات معيّنة، ويتولّى هو التحديث بسرعة وصحّة. الوحدة الأساسية هي المكوّن: دالة جافاسكريبت تُرجع واجهة.",
    },

    { type: "heading", text: "2. كيف يعمل رياكت" },
    { type: "subheading", text: "الـ Virtual DOM" },
    {
      type: "paragraph",
      text: "رياكت يحتفظ بنسخة خفيفة من الصفحة في الذاكرة تُسمّى Virtual DOM. عند تغيّر الحالة: يرسم نسخة جديدة، يقارنها بالقديمة (diff)، ثم يحدّث فقط العناصر التي تغيّرت في الـ DOM الحقيقي.",
    },
    {
      type: "code",
      code: `الحالة تتغيّر → Virtual DOM جديد → مقارنة → تحديث ما تغيّر فقط`,
    },
    {
      type: "tip",
      text: "النموذج الذهني: أنت تغيّر البيانات، ورياكت يحدّث الشاشة. لا تلمس الـ DOM مباشرةً.",
    },

    { type: "heading", text: "3. المكوّنات و JSX" },
    {
      type: "paragraph",
      text: "المكوّن دالة تُرجع واجهة، واسمه يجب أن يبدأ بحرف كبير. ما بداخله يُسمّى JSX — يشبه HTML لكنه جافاسكريبت في الحقيقة.",
    },
    {
      type: "code",
      code: `function Welcome() {
  return <h1>Hello, React!</h1>;
}`,
    },
    {
      type: "list",
      items: [
        "أرجِع عنصراً أباً واحداً (أو استخدم <> </>)",
        "استخدم className بدل class",
        "ضع جافاسكريبت داخل { }",
        "أغلق كل وسم، حتى <img />",
      ],
    },

    { type: "heading", text: "4. عرض العناصر" },
    {
      type: "paragraph",
      text: "«العرض» يعني إظهار المكوّن على الشاشة، تكتبه كوسم. وقوّة المكوّنات: اكتب مرة واحدة وأعد الاستخدام في أي مكان.",
    },
    {
      type: "code",
      code: `function App() {
  return (
    <div>
      <Welcome />
      <Welcome />
    </div>
  );
}`,
    },

    { type: "heading", text: "5. الخصائص (Props)" },
    {
      type: "paragraph",
      text: "الـ props قيم تمرّرها للمكوّن مثل وسائط الدالة. النصوص بعلامات تنصيص، والقيم البرمجية داخل { }. الـ props للقراءة فقط — لا يغيّرها المكوّن.",
    },
    {
      type: "code",
      code: `function Greeting({ name, age }) {
  return <p>{name} is {age} years old.</p>;
}

<Greeting name="Sara" age={25} />`,
    },

    { type: "heading", text: "6. خاصية children" },
    {
      type: "paragraph",
      text: "ما تضعه بين وسمي المكوّن (الفتح والإغلاق) يصل كخاصية خاصة اسمها children. مفيدة لبناء صناديق وتخطيطات قابلة لإعادة الاستخدام.",
    },
    {
      type: "code",
      code: `function Card({ children }) {
  return <div className="card">{children}</div>;
}

<Card>
  <h2>Title</h2>
  <p>Some text.</p>
</Card>`,
    },

    { type: "heading", text: "7. العرض الشرطي" },
    {
      type: "paragraph",
      text: "بما أن JSX جافاسكريبت، استخدم منطق جافاسكريبت العادي:",
    },
    {
      type: "code",
      code: `{/* && : يعرض شيئاً أو لا شيء */}
{isLoggedIn && <p>مرحباً بعودتك!</p>}

{/* ? : : يعرض أحد شيئين */}
{isLoggedIn ? <p>أهلاً</p> : <p>سجّل الدخول</p>}`,
    },

    { type: "heading", text: "8. عرض القوائم" },
    {
      type: "paragraph",
      text: "استخدم .map() لتحويل كل عنصر في المصفوفة إلى JSX. وكل عنصر يحتاج key فريداً ليتتبّعه رياكت.",
    },
    {
      type: "code",
      code: `const fruits = ["Apple", "Banana", "Cherry"];

<ul>
  {fruits.map((fruit) => (
    <li key={fruit}>{fruit}</li>
  ))}
</ul>`,
    },
    {
      type: "warning",
      text: "نسيان الـ key يعطي تحذيراً وقد يسبب أخطاءً غريبة. أضِفه دائماً.",
    },

    { type: "heading", text: "9. التعامل مع الأحداث" },
    {
      type: "paragraph",
      text: "مرّر دالة لأحداث مثل onClick. أسماء الأحداث بصيغة camelCase، ومرّر الدالة نفسها بدون أقواس.",
    },
    {
      type: "code",
      code: `function Button() {
  function handleClick() {
    alert("ضغطت عليّ!");
  }
  return <button onClick={handleClick}>اضغط</button>;
}

// لتمرير وسيط: غلّفها بدالة سهمية
<button onClick={() => greet("Sara")}>تحية</button>`,
    },

    { type: "heading", text: "10. إعادة استخدام المكوّنات" },
    {
      type: "paragraph",
      text: "هدف المكوّنات هو إعادة الاستخدام. اكتب القطعة مرة واحدة، وغيّر شكلها أو محتواها عبر props. نفس الزر يصبح «حفظ» أو «حذف» أو «إلغاء».",
    },
    {
      type: "code",
      code: `function Button({ label, color, onClick }) {
  return (
    <button onClick={onClick} style={{ background: color }}>
      {label}
    </button>
  );
}

<Button label="حفظ" color="green" onClick={save} />
<Button label="حذف" color="red" onClick={remove} />`,
    },
    {
      type: "tip",
      text: "القاعدة: إذا كتبت نفس الـ JSX مرتين، اجعله مكوّناً قابلاً لإعادة الاستخدام بـ props.",
    },

    { type: "heading", text: "✅ ملخص القسم" },
    {
      type: "list",
      items: [
        "المكوّنات دوال تُرجع JSX، وأسماؤها بحرف كبير",
        "رياكt يبني Virtual DOM، يقارنه، ويحدّث ما تغيّر فقط",
        "props لتمرير البيانات (للقراءة فقط)، و children للتغليف",
        "العرض الشرطي بـ && و ? :، والقوائم بـ .map() مع key",
        "الأحداث مثل onClick تأخذ دالة بدون أقواس",
      ],
    },
    {
      type: "qa",
      question: "1. لماذا يجب أن يبدأ اسم المكوّن بحرف كبير؟",
      answer:
        "ليميّزه رياكت عن وسوم HTML العادية. الأسماء الصغيرة تُعامَل كعناصر HTML.",
    },
    {
      type: "qa",
      question: "2. لماذا يحتاج كل عنصر في القائمة إلى key؟",
      answer: "ليتتبّع رياكت كل عنصر بكفاءة ويحدّث ما تغيّر فقط.",
    },
  ],
};

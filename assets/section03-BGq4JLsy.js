const e={id:3,title:"أساسيات React",level:"مبتدئ",lessons:["ما هو React؟","كيف يعمل React","Components و JSX","Rendering Elements","Props","children Prop","العرض الشرطي","عرض القوائم","التعامل مع الأحداث","إعادة استخدام Components"],intro:"هذا قلب React. بمجرد أن تفهم Components و JSX و props والأحداث، كل ما بعده مجرد إضافات فوقها. خذ وقتك هنا.",content:[{type:"heading",text:"1. ما هو React؟"},{type:"paragraph",text:"بدلاً من البحث عن كل عنصر وتحديثه يدوياً (كما في جافاسكريبت العادية)، React يتيح لك وصف شكل الشاشة لبيانات معيّنة، ويتولّى هو التحديث بسرعة وصحّة. الوحدة الأساسية هي Component: دالة جافاسكريبت تُرجع واجهة."},{type:"heading",text:"2. كيف يعمل React"},{type:"subheading",text:"الـ Virtual DOM"},{type:"paragraph",text:"React يحتفظ بنسخة خفيفة من الصفحة في الذاكرة تُسمّى Virtual DOM. عند تغيّر الحالة: يرسم نسخة جديدة، يقارنها بالقديمة (diff)، ثم يحدّث فقط العناصر التي تغيّرت في Real DOM."},{type:"code",code:"الحالة تتغيّر → Virtual DOM جديد → مقارنة → تحديث ما تغيّر فقط"},{type:"tip",text:"النموذج الذهني: أنت تغيّر البيانات، وReact يحدّث الشاشة. لا تلمس الـ DOM مباشرةً."},{type:"heading",text:"3. Components و JSX"},{type:"paragraph",text:"Component دالة تُرجع واجهة، واسمه يجب أن يبدأ بحرف كبير. ما بداخله يُسمّى JSX — يشبه HTML لكنه جافاسكريبت في الحقيقة."},{type:"code",code:`function Welcome() {
  return <h1>Hello, React!</h1>;
}`},{type:"list",items:["أرجِع عنصراً أباً واحداً (أو استخدم <> </>)","استخدم className بدل class","ضع جافاسكريبت داخل { }","أغلق كل وسم، حتى <img />"]},{type:"heading",text:"4. Rendering Elements"},{type:"paragraph",text:"«العرض» يعني إظهار Component على الشاشة، تكتبه كوسم. وقوّة Components: اكتب مرة واحدة وأعد الاستخدام في أي مكان."},{type:"code",code:`function App() {
  return (
    <div>
      <Welcome />
      <Welcome />
    </div>
  );
}`},{type:"heading",text:"5. Props"},{type:"paragraph",text:"الـ props قيم تمرّرها للComponent مثل وسائط الدالة. النصوص بعلامات تنصيص، والقيم البرمجية داخل { }. الـ props للقراءة فقط — لا يغيّرها Component."},{type:"code",code:`function Greeting({ name, age }) {
  return <p>{name} is {age} years old.</p>;
}

<Greeting name="Sara" age={25} />`},{type:"heading",text:"6. children Prop"},{type:"paragraph",text:"ما تضعه بين وسمي Component (الفتح والإغلاق) يصل كخاصية خاصة اسمها children. مفيدة لبناء صناديق وتخطيطات قابلة لإعادة الاستخدام."},{type:"code",code:`function Card({ children }) {
  return <div className="card">{children}</div>;
}

<Card>
  <h2>Title</h2>
  <p>Some text.</p>
</Card>`},{type:"heading",text:"7. العرض الشرطي"},{type:"paragraph",text:"بما أن JSX جافاسكريبت، استخدم منطق جافاسكريبت العادي:"},{type:"code",code:`{/* && : يعرض شيئاً أو لا شيء */}
{isLoggedIn && <p>مرحباً بعودتك!</p>}

{/* ? : : يعرض أحد شيئين */}
{isLoggedIn ? <p>أهلاً</p> : <p>سجّل الدخول</p>}`},{type:"heading",text:"8. عرض القوائم"},{type:"paragraph",text:"استخدم .map() لتحويل كل عنصر في المصفوفة إلى JSX. وكل عنصر يحتاج key فريداً ليتتبّعه React."},{type:"code",code:`const fruits = ["Apple", "Banana", "Cherry"];

<ul>
  {fruits.map((fruit) => (
    <li key={fruit}>{fruit}</li>
  ))}
</ul>`},{type:"warning",text:"نسيان الـ key يعطي تحذيراً وقد يسبب أخطاءً غريبة. أضِفه دائماً."},{type:"heading",text:"9. التعامل مع الأحداث"},{type:"paragraph",text:"مرّر دالة لأحداث مثل onClick. أسماء الأحداث بصيغة camelCase، ومرّر الدالة نفسها بدون أقواس."},{type:"code",code:`function Button() {
  function handleClick() {
    alert("ضغطت عليّ!");
  }
  return <button onClick={handleClick}>اضغط</button>;
}

// لتمرير وسيط: غلّفها بدالة سهمية
<button onClick={() => greet("Sara")}>تحية</button>`},{type:"heading",text:"10. إعادة استخدام Components"},{type:"paragraph",text:"هدف Components هو إعادة الاستخدام. اكتب القطعة مرة واحدة، وغيّر شكلها أو محتواها عبر props. نفس الزر يصبح «حفظ» أو «حذف» أو «إلغاء»."},{type:"code",code:`function Button({ label, color, onClick }) {
  return (
    <button onClick={onClick} style={{ background: color }}>
      {label}
    </button>
  );
}

<Button label="حفظ" color="green" onClick={save} />
<Button label="حذف" color="red" onClick={remove} />`},{type:"tip",text:"القاعدة: إذا كتبت نفس الـ JSX مرتين، اجعله Componentاً قابلاً لإعادة الاستخدام بـ props."},{type:"heading",text:"✅ ملخص القسم"},{type:"list",items:["Components دوال تُرجع JSX، وأسماؤها بحرف كبير","React يبني Virtual DOM، يقارنه، ويحدّث ما تغيّر فقط","props لتمرير البيانات (للقراءة فقط)، و children للتغليف","العرض الشرطي بـ && و ? :، والقوائم بـ .map() مع key","الأحداث مثل onClick تأخذ دالة بدون أقواس"]},{type:"qa",question:"1. لماذا يجب أن يبدأ اسم Component بحرف كبير؟",answer:"ليميّزه React عن وسوم HTML العادية. الأسماء الصغيرة تُعامَل كعناصر HTML."},{type:"qa",question:"2. لماذا يحتاج كل عنصر في القائمة إلى key؟",answer:"ليتتبّع React كل عنصر بكفاءة ويحدّث ما تغيّر فقط."}],titleEn:"React Fundamentals",levelEn:"Beginner",lessonsEn:["What is React?","How React Works","Components & JSX","Rendering Elements","Props","The children Prop","Conditional Rendering","Rendering Lists","Event Handling","Reusing Components"],introEn:"This is the heart of React. Once you understand components, JSX, props, and events, everything else is just layers on top. Take your time here.",contentEn:[{type:"heading",text:"1. What is React?"},{type:"paragraph",text:"Instead of manually finding every element and updating it (as in vanilla JavaScript), React lets you describe what the screen should look like for given data, and it handles updates efficiently. The basic unit is a component: a JavaScript function that returns UI."},{type:"heading",text:"2. How React Works"},{type:"subheading",text:"The Virtual DOM"},{type:"paragraph",text:"React keeps a lightweight copy of the page in memory called the Virtual DOM. When state changes: it renders a new copy, diffs it against the old one, then updates only the changed elements in the real DOM."},{type:"code",code:"State changes → New Virtual DOM → Diff → Update only what changed"},{type:"tip",text:"Mental model: you change the data, React updates the screen. Never touch the DOM directly."},{type:"heading",text:"3. Components & JSX",term:"Components & JSX"},{type:"paragraph",text:"A component is a function that returns UI, and its name must start with a capital letter. What's inside is called JSX — it looks like HTML but is actually JavaScript."},{type:"code",code:`function Welcome() {
  return <h1>Hello, React!</h1>;
}`},{type:"list",items:["Return a single parent element (or use <> </>)","Use className instead of class","Put JavaScript inside { }","Close every tag, even <img />"]},{type:"heading",text:"4. Rendering Elements"},{type:"paragraph",text:'"Rendering" means showing the component on screen by writing it as a tag. The power of components: write once, reuse anywhere.'},{type:"code",code:`function App() {
  return (
    <div>
      <Welcome />
      <Welcome />
    </div>
  );
}`},{type:"heading",text:"5. Props",term:"Props"},{type:"paragraph",text:"Props are values you pass to a component like function arguments. Strings use quotes, other values go inside { }. Props are read-only — the component must not change them."},{type:"code",code:`function Greeting({ name, age }) {
  return <p>{name} is {age} years old.</p>;
}

<Greeting name="Sara" age={25} />`},{type:"heading",text:"6. The children Prop",term:"children prop"},{type:"paragraph",text:"Whatever you place between a component's opening and closing tags arrives as a special prop called children. Useful for building reusable wrappers and layouts."},{type:"code",code:`function Card({ children }) {
  return <div className="card">{children}</div>;
}

<Card>
  <h2>Title</h2>
  <p>Some text.</p>
</Card>`},{type:"heading",text:"7. Conditional Rendering",term:"Conditional Rendering"},{type:"paragraph",text:"Since JSX is JavaScript, use regular JavaScript logic:"},{type:"code",code:`{/* && : show something or nothing */}
{isLoggedIn && <p>Welcome back!</p>}

{/* ? : : show one of two things */}
{isLoggedIn ? <p>Hello</p> : <p>Please log in</p>}`},{type:"heading",text:"8. Rendering Lists",term:"Rendering Lists"},{type:"paragraph",text:"Use .map() to transform every item in an array into JSX. Each item needs a unique key so React can track it."},{type:"code",code:`const fruits = ["Apple", "Banana", "Cherry"];

<ul>
  {fruits.map((fruit) => (
    <li key={fruit}>{fruit}</li>
  ))}
</ul>`},{type:"warning",text:"Forgetting the key gives a warning and can cause strange bugs. Always add it."},{type:"heading",text:"9. Event Handling",term:"Event Handling"},{type:"paragraph",text:"Pass a function to events like onClick. Event names are camelCase, and you pass the function itself without calling it."},{type:"code",code:`function Button() {
  function handleClick() {
    alert("You clicked me!");
  }
  return <button onClick={handleClick}>Click</button>;
}

// To pass an argument: wrap in an arrow function
<button onClick={() => greet("Sara")}>Greet</button>`},{type:"heading",text:"10. Reusing Components"},{type:"paragraph",text:"The goal of components is reuse. Write the piece once and vary its appearance or content via props. The same button becomes 'Save', 'Delete', or 'Cancel'."},{type:"code",code:`function Button({ label, color, onClick }) {
  return (
    <button onClick={onClick} style={{ background: color }}>
      {label}
    </button>
  );
}

<Button label="Save" color="green" onClick={save} />
<Button label="Delete" color="red" onClick={remove} />`},{type:"tip",text:"Rule: if you wrote the same JSX twice, make it a reusable component with props."},{type:"heading",text:"✅ Section Summary"},{type:"list",items:["Components are functions that return JSX, names start with a capital letter","React builds a Virtual DOM, diffs it, and updates only what changed","props to pass data (read-only), children for wrapping","Conditional rendering with && and ? :, lists with .map() and key","Events like onClick receive a function without parentheses"]},{type:"qa",question:"1. Why must a component name start with a capital letter?",answer:"So React can distinguish it from regular HTML tags. Lowercase names are treated as HTML elements."},{type:"qa",question:"2. Why does each list item need a key?",answer:"So React can efficiently track each item and update only what changed."}]};export{e as default};

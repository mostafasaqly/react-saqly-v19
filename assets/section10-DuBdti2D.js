const e={id:10,title:"التواصل بين Components",level:"متوسط",lessons:["مشكلة تمرير الـ props العميق","نمط التركيب (Composition)","واجهة Context (Context API)","إنشاء Context","توفير Context","قراءة Context بـ useContext","تحديث بيانات Context","مثال عملي على Context","قراءة Context بـ use في React 19","Hooks المخصّصة","متى تستخدم Context ومتى لا"],intro:"مع نمو التطبيق، تحتاج Components لمشاركة البيانات عبر مستويات كثيرة. تمرير الـ props عبر كل طبقة مُتعِب. هذا القسم يعرض طرقاً أنظف: التركيب، وContext، وHooks المخصّصة.",content:[{type:"heading",text:"1. مشكلة تمرير الـ props العميق"},{type:"paragraph",text:"تخيّل أن user في أعلى التطبيق لكن يحتاجه Component عميق فقط. تضطرّ لتمريره عبر كل Component بينهما حتى لو لم يستخدمه. هذا يُسمّى prop drilling. الحلّان: التركيب وContext."},{type:"heading",text:"2. نمط التركيب (Composition)"},{type:"paragraph",text:"أحياناً لا تحتاج Context — فقط مرّر JSX كـ children. بدل أن يصنع Component ابنه العميق، الأب يمرّره."},{type:"code",code:`function App() {
  const user = { name: "Sara" };
  return (
    <Layout>
      <Profile user={user} />
    </Layout>
  );
}
// Layout لا يحتاج معرفة user إطلاقاً`},{type:"heading",text:"3. واجهة Context (Context API)"},{type:"paragraph",text:"بعض البيانات تحتاجها أماكن كثيرة: المستخدم الحالي، الثيم، اللغة. Context مثل البثّ: Component «يوفّر» قيمة، وأي Component بالأسفل «يقرؤها» مباشرةً. ثلاث خطوات: إنشاء، توفير، قراءة."},{type:"heading",text:"4. إنشاء Context"},{type:"code",code:`import { createContext } from "react";
export const ThemeContext = createContext("light");`},{type:"heading",text:"5. توفير Context"},{type:"code",code:`<ThemeContext value="dark">
  <Page />
</ThemeContext>`},{type:"tip",text:"في React 19 تستخدم <ThemeContext value={...}> مباشرةً. (الصيغة القديمة <ThemeContext.Provider> تعمل أيضاً.)"},{type:"heading",text:"6. قراءة Context بـ useContext"},{type:"code",code:`import { useContext } from "react";

function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click</button>;
}`},{type:"heading",text:"7. تحديث بيانات Context"},{type:"paragraph",text:"يمكن أن يحمل Context بيانات ودالة لتغييرها معاً. ضع useState في Provider، ثم شارك القيمة والدالة."},{type:"code",code:`<ThemeContext value={{ theme, toggle }}>{children}</ThemeContext>

// في الابن:
const { theme, toggle } = useContext(ThemeContext);`},{type:"heading",text:"8. مثال عملي على Context"},{type:"paragraph",text:"ثيم يستطيع أي Component قراءته وتبديله. Provider يملك حالة theme ودالة toggle، ويوفّر { theme, toggle } لكل ما بداخله. هكذا تتعامل التطبيقات الحقيقية مع الثيم والمستخدم واللغة."},{type:"heading",text:"9. قراءة Context بـ use في React 19"},{type:"paragraph",text:"React 19 يضيف use. للسياق يعمل مثل useContext، لكن يمكن استدعاؤه بشكل شرطي — داخل if مثلاً. Hooks العادية لا تستطيع ذلك."},{type:"code",code:`if (showThemed) {
  const theme = use(ThemeContext); // مسموح مع use!
  return <button className={theme}>Themed</button>;
}`},{type:"heading",text:"10. Hooks المخصّصة"},{type:"paragraph",text:"Hook المخصّص دالة اسمها يبدأ بـ use وتستدعي Hooks أخرى. يتيح إعادة استخدام المنطق."},{type:"code",code:`function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : initialValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}`},{type:"heading",text:"11. متى تستخدم Context ومتى لا"},{type:"list",items:["✅ للبيانات الشاملة بطيئة التغيّر: الثيم، المستخدم، اللغة","❌ إذا احتاجها Components قليلة قريبة — ارفع الحالة لأعلى","❌ إذا تغيّرت كثيراً (كل ضغطة) — يعيد رسم كل القرّاء","❌ للحالة العامة المعقّدة — استخدم Redux Toolkit (القسم 14)"]},{type:"heading",text:"✅ ملخص القسم"},{type:"list",items:["prop drilling = تمرير props عبر Components لا تحتاجها","التركيب (children) يزيل الكثير من التمرير","Context: إنشاء → توفير → قراءة","use يقرأ Context شرطياً، وHooks المخصّصة تعيد استخدام المنطق"]},{type:"qa",question:"1. ما الخطوات الثلاث لاستخدام Context؟",answer:"الإنشاء (createContext)، التوفير (<Context value>)، القراءة (useContext)."},{type:"qa",question:"2. اذكر حالة يكون فيها Context أداة خاطئة.",answer:"عند تغيّر البيانات كثيراً، أو عند الحاجة لحالة عامة معقّدة — استخدم رفع الحالة أو Redux."}],titleEn:"Component Communication",levelEn:"Intermediate",lessonsEn:["The Problem with Deep Prop Drilling","Composition Pattern","The Context API","Creating a Context","Providing a Context","Reading Context with useContext","Updating Context Data","Practical Context Example","Reading Context with use in React 19","Custom Hooks","When to Use Context and When Not To"],introEn:"As an app grows, components need to share data across many levels. Passing props through every layer is tedious. This section presents cleaner approaches: composition, context, and custom hooks.",contentEn:[{type:"heading",text:"1. The Problem with Deep Prop Drilling"},{type:"paragraph",text:"Imagine user lives at the top of the app but only a deep component needs it. You're forced to pass it through every component in between even if they don't use it. This is called prop drilling. The two solutions: composition and context."},{type:"heading",text:"2. Composition Pattern"},{type:"paragraph",text:"Sometimes you don't need context — just pass JSX as children. Instead of a component creating its deep child, the parent passes it down."},{type:"code",code:`function App() {
  const user = { name: "Sara" };
  return (
    <Layout>
      <Profile user={user} />
    </Layout>
  );
}
// Layout doesn't need to know about user at all`},{type:"heading",text:"3. The Context API"},{type:"paragraph",text:"Some data is needed in many places: current user, theme, language. Context is like a broadcast: one component 'provides' a value, and any component below 'reads' it directly. Three steps: create, provide, read."},{type:"heading",text:"4. Creating a Context"},{type:"code",code:`import { createContext } from "react";
export const ThemeContext = createContext("light");`},{type:"heading",text:"5. Providing a Context"},{type:"code",code:`<ThemeContext value="dark">
  <Page />
</ThemeContext>`},{type:"tip",text:"In React 19 you use <ThemeContext value={...}> directly. (The old <ThemeContext.Provider> syntax still works too.)"},{type:"heading",text:"6. Reading Context with useContext"},{type:"code",code:`import { useContext } from "react";

function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click</button>;
}`},{type:"heading",text:"7. Updating Context Data"},{type:"paragraph",text:"Context can carry both data and a function to change it. Put useState in the provider, then share both the value and the setter."},{type:"code",code:`<ThemeContext value={{ theme, toggle }}>{children}</ThemeContext>

// In a child:
const { theme, toggle } = useContext(ThemeContext);`},{type:"heading",text:"8. Practical Context Example"},{type:"paragraph",text:"A theme that any component can read and toggle. The provider owns theme state and a toggle function, and provides { theme, toggle } to everything inside. This is how real apps handle theme, user, and language."},{type:"heading",text:"9. Reading Context with use in React 19"},{type:"paragraph",text:"React 19 adds use. For context it works like useContext, but can be called conditionally — inside an if for example. Regular hooks can't do that."},{type:"code",code:`if (showThemed) {
  const theme = use(ThemeContext); // allowed with use!
  return <button className={theme}>Themed</button>;
}`},{type:"heading",text:"10. Custom Hooks"},{type:"paragraph",text:"A custom hook is a function whose name starts with use and calls other hooks. It lets you reuse logic."},{type:"code",code:`function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : initialValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}`},{type:"heading",text:"11. When to Use Context and When Not To"},{type:"list",items:["✅ For global data that changes slowly: theme, user, language","❌ If only a few nearby components need it — lift state up instead","❌ If it changes frequently (every keystroke) — re-renders all readers","❌ For complex global state — use Redux Toolkit (Section 14)"]},{type:"heading",text:"✅ Section Summary"},{type:"list",items:["Prop drilling = passing props through components that don't need them","Composition (children) eliminates a lot of drilling","Context: create → provide → read","use reads context conditionally; custom hooks reuse logic"]},{type:"qa",question:"1. What are the three steps for using context?",answer:"Create (createContext), provide (<Context value>), read (useContext)."},{type:"qa",question:"2. Name a situation where context is the wrong tool.",answer:"When data changes frequently, or when you need complex global state — use state lifting or Redux."}]};export{e as default};

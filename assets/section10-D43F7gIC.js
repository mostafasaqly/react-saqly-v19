const e={id:10,title:"التواصل بين المكوّنات",level:"متوسط",lessons:["مشكلة تمرير الـ props العميق","نمط التركيب (Composition)","واجهة السياق (Context API)","إنشاء السياق","توفير السياق","قراءة السياق بـ useContext","تحديث بيانات السياق","مثال عملي على السياق","قراءة السياق بـ use في رياكت 19","الخطّافات المخصّصة","متى تستخدم السياق ومتى لا"],intro:"مع نمو التطبيق، تحتاج المكوّنات لمشاركة البيانات عبر مستويات كثيرة. تمرير الـ props عبر كل طبقة مُتعِب. هذا القسم يعرض طرقاً أنظف: التركيب، والسياق، والخطّافات المخصّصة.",content:[{type:"heading",text:"1. مشكلة تمرير الـ props العميق"},{type:"paragraph",text:"تخيّل أن user في أعلى التطبيق لكن يحتاجه مكوّن عميق فقط. تضطرّ لتمريره عبر كل مكوّن بينهما حتى لو لم يستخدمه. هذا يُسمّى prop drilling. الحلّان: التركيب والسياق."},{type:"heading",text:"2. نمط التركيب (Composition)"},{type:"paragraph",text:"أحياناً لا تحتاج السياق — فقط مرّر JSX كـ children. بدل أن يصنع المكوّن ابنه العميق، الأب يمرّره."},{type:"code",code:`function App() {
  const user = { name: "Sara" };
  return (
    <Layout>
      <Profile user={user} />
    </Layout>
  );
}
// Layout لا يحتاج معرفة user إطلاقاً`},{type:"heading",text:"3. واجهة السياق (Context API)"},{type:"paragraph",text:"بعض البيانات تحتاجها أماكن كثيرة: المستخدم الحالي، الثيم، اللغة. السياق مثل البثّ: مكوّن «يوفّر» قيمة، وأي مكوّن بالأسفل «يقرؤها» مباشرةً. ثلاث خطوات: إنشاء، توفير، قراءة."},{type:"heading",text:"4. إنشاء السياق"},{type:"code",code:`import { createContext } from "react";
export const ThemeContext = createContext("light");`},{type:"heading",text:"5. توفير السياق"},{type:"code",code:`<ThemeContext value="dark">
  <Page />
</ThemeContext>`},{type:"tip",text:"في رياكت 19 تستخدم <ThemeContext value={...}> مباشرةً. (الصيغة القديمة <ThemeContext.Provider> تعمل أيضاً.)"},{type:"heading",text:"6. قراءة السياق بـ useContext"},{type:"code",code:`import { useContext } from "react";

function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click</button>;
}`},{type:"heading",text:"7. تحديث بيانات السياق"},{type:"paragraph",text:"يمكن أن يحمل السياق بيانات ودالة لتغييرها معاً. ضع useState في المزوّد، ثم شارك القيمة والدالة."},{type:"code",code:`<ThemeContext value={{ theme, toggle }}>{children}</ThemeContext>

// في الابن:
const { theme, toggle } = useContext(ThemeContext);`},{type:"heading",text:"8. مثال عملي على السياق"},{type:"paragraph",text:"ثيم يستطيع أي مكوّن قراءته وتبديله. المزوّد يملك حالة theme ودالة toggle، ويوفّر { theme, toggle } لكل ما بداخله. هكذا تتعامل التطبيقات الحقيقية مع الثيم والمستخدم واللغة."},{type:"heading",text:"9. قراءة السياق بـ use في رياكت 19"},{type:"paragraph",text:"رياكت 19 يضيف use. للسياق يعمل مثل useContext، لكن يمكن استدعاؤه بشكل شرطي — داخل if مثلاً. الخطّافات العادية لا تستطيع ذلك."},{type:"code",code:`if (showThemed) {
  const theme = use(ThemeContext); // مسموح مع use!
  return <button className={theme}>Themed</button>;
}`},{type:"heading",text:"10. الخطّافات المخصّصة"},{type:"paragraph",text:"الخطّاف المخصّص دالة اسمها يبدأ بـ use وتستدعي خطّافات أخرى. يتيح إعادة استخدام المنطق."},{type:"code",code:`function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : initialValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}`},{type:"heading",text:"11. متى تستخدم السياق ومتى لا"},{type:"list",items:["✅ للبيانات الشاملة بطيئة التغيّر: الثيم، المستخدم، اللغة","❌ إذا احتاجها مكوّنات قليلة قريبة — ارفع الحالة لأعلى","❌ إذا تغيّرت كثيراً (كل ضغطة) — يعيد رسم كل القرّاء","❌ للحالة العامة المعقّدة — استخدم Redux Toolkit (القسم 14)"]},{type:"heading",text:"✅ ملخص القسم"},{type:"list",items:["prop drilling = تمرير props عبر مكوّنات لا تحتاجها","التركيب (children) يزيل الكثير من التمرير","السياق: إنشاء → توفير → قراءة","use يقرأ السياق شرطياً، والخطّافات المخصّصة تعيد استخدام المنطق"]},{type:"qa",question:"1. ما الخطوات الثلاث لاستخدام السياق؟",answer:"الإنشاء (createContext)، التوفير (<Context value>)، القراءة (useContext)."},{type:"qa",question:"2. اذكر حالة يكون فيها السياق أداة خاطئة.",answer:"عند تغيّر البيانات كثيراً، أو عند الحاجة لحالة عامة معقّدة — استخدم رفع الحالة أو Redux."}],titleEn:"Component Communication"};export{e as default};

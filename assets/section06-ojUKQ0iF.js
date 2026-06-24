const e={id:6,title:"التأثيرات ودورة الحياة",level:"متوسط",lessons:["ما هو التأثير الجانبي؟","خطّاف useEffect","اعتماديّات التأثير","دوال التنظيف","جلب البيانات بـ useEffect","أخطاء useEffect الشائعة","متى لا تحتاج useEffect"],intro:"حتى الآن مكوّناتنا ترسم واجهة من props و state فقط. لكن التطبيقات الحقيقية تتحدّث مع العالم الخارجي: مؤقّتات، وواجهات المتصفح، وخوادم. هذا ما تفعله التأثيرات (Effects).",content:[{type:"heading",text:"1. ما هو التأثير الجانبي؟"},{type:"paragraph",text:"التأثير الجانبي هو أي شيء يفعله المكوّن خارج رياكت: ضبط مؤقّت، جلب بيانات، القراءة/الكتابة في localStorage، تغيير عنوان الصفحة. هذه لا تحدث أثناء الرسم — تحتاج مكاناً خاصاً يعمل بعد تحديث الشاشة، وهو useEffect."},{type:"heading",text:"2. خطّاف useEffect"},{type:"paragraph",text:"useEffect يشغّل كوداً بعد رسم المكوّن. الوسيط الثاني (المصفوفة) يتحكّم في موعد التشغيل."},{type:"code",code:`useEffect(() => {
  document.title = "Welcome!";
}, [/* الاعتماديّات */]);`},{type:"heading",text:"3. اعتماديّات التأثير"},{type:"list",items:["بدون مصفوفة → بعد كل رسم","[] فارغة → مرة واحدة بعد أول رسم","[count] → بعد أول رسم وكلما تغيّر count"]},{type:"code",code:`useEffect(() => {
  console.log("mounted");
}, []); // مرة واحدة

useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]); // عند تغيّر count`},{type:"heading",text:"4. دوال التنظيف"},{type:"paragraph",text:"بعض التأثيرات تبدأ شيئاً يستمرّ (مؤقّت أو اشتراك). أرجِع دالة تنظيف لإيقافه قبل التشغيل التالي وعند إزالة المكوّن."},{type:"code",code:`useEffect(() => {
  const id = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(id); // تنظيف
}, []);`},{type:"tip",text:"نظّف دائماً المؤقّتات والمستمعين والاشتراكات لمنع تسرّب الذاكرة."},{type:"heading",text:"5. جلب البيانات بـ useEffect"},{type:"paragraph",text:"الاستخدام الكلاسيكي: تحميل بيانات من خادم عند ظهور المكوّن. تعامل دائماً مع الحالات الثلاث: تحميل، خطأ، بيانات."},{type:"code",code:`useEffect(() => {
  async function load() {
    try {
      setLoading(true);
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed");
      setData(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  load();
}, []);`},{type:"heading",text:"6. أخطاء useEffect الشائعة"},{type:"list",items:["نسيان اعتماديّة تستخدمها داخل التأثير","تحديث الحالة بدون شرط → حلقة لا نهائية","نسيان التنظيف للمؤقّتات والمستمعين"]},{type:"warning",text:"في وضع التطوير، StrictMode يشغّل التأثيرات مرّتين عمداً لمساعدتك على اكتشاف التنظيف الناقص. هذا طبيعي."},{type:"heading",text:"7. متى لا تحتاج useEffect"},{type:"paragraph",text:"useEffect يُساء استخدامه كثيراً. كثير مما يضعه الناس فيه لا ينتمي إليه."},{type:"list",items:["لا تحتاجه لحساب قيمة من حالة موجودة — اشتقّها أثناء الرسم","لا تحتاجه للردّ على حدث مستخدم — افعل ذلك في معالج الحدث","تحتاجه لـ: جلب البيانات، الاشتراك في شيء خارجي، المزامنة مع نظام غير رياكت"]},{type:"tip",text:"اسأل نفسك: هل هذا يتحدّث مع العالم الخارجي؟ نعم → تأثير. مجرد حساب أو ردّ على حدث → لا تأثير."},{type:"heading",text:"✅ ملخص القسم"},{type:"list",items:["التأثير الجانبي يصل خارج رياكت (مؤقّتات، جلب، localStorage)","useEffect يعمل بعد الرسم؛ المصفوفة تتحكّم في الموعد","أرجِع دالة تنظيف للمؤقّتات والمستمعين","نمط الجلب: تحميل / خطأ / بيانات","لا تستخدم تأثيراً لما يمكن اشتقاقه أو للردّ على حدث"]},{type:"qa",question:"1. متى يعمل التأثير ذو المصفوفة الفارغة []؟",answer:"مرة واحدة، بعد أول رسم مباشرةً."},{type:"qa",question:"2. اذكر شيئاً يضعه الناس في useEffect ولا ينبغي.",answer:"حساب قيمة من حالة موجودة (اشتقّها)، أو الردّ على حدث مستخدم (في المعالج)."}],titleEn:"Effects & Lifecycle",levelEn:"Intermediate",lessonsEn:["What is a Side Effect?","The useEffect Hook","Effect Dependencies","Cleanup Functions","Fetching Data with useEffect","Common useEffect Mistakes","When You Don't Need useEffect"],introEn:"So far our components just render UI from props and state. But real apps talk to the outside world: timers, browser APIs, servers. That's what Effects do.",contentEn:[{type:"heading",text:"1. What is a Side Effect?",term:"Side Effect"},{type:"paragraph",text:"A side effect is anything a component does outside React: setting a timer, fetching data, reading/writing localStorage, changing the page title. These can't happen during rendering — they need a special place that runs after the screen updates, which is useEffect."},{type:"heading",text:"2. The useEffect Hook",term:"useEffect"},{type:"paragraph",text:"useEffect runs code after a component renders. The second argument (the array) controls when it runs."},{type:"code",code:`useEffect(() => {
  document.title = "Welcome!";
}, [/* dependencies */]);`},{type:"heading",text:"3. Effect Dependencies",term:"Dependencies"},{type:"list",items:["No array → after every render","[] empty → once after the first render","[count] → after first render and whenever count changes"]},{type:"code",code:`useEffect(() => {
  console.log("mounted");
}, []); // once

useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]); // when count changes`},{type:"heading",text:"4. Cleanup Functions",term:"Cleanup Functions"},{type:"paragraph",text:"Some effects start something ongoing (a timer or subscription). Return a cleanup function to stop it before the next run and when the component unmounts."},{type:"code",code:`useEffect(() => {
  const id = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(id); // cleanup
}, []);`},{type:"tip",text:"Always clean up timers, listeners, and subscriptions to prevent memory leaks."},{type:"heading",text:"5. Fetching Data with useEffect"},{type:"paragraph",text:"The classic use case: loading data from a server when the component appears. Always handle the three states: loading, error, data."},{type:"code",code:`useEffect(() => {
  async function load() {
    try {
      setLoading(true);
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed");
      setData(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  load();
}, []);`},{type:"heading",text:"6. Common useEffect Mistakes"},{type:"list",items:["Forgetting a dependency you use inside the effect","Updating state without a condition → infinite loop","Forgetting cleanup for timers and listeners"]},{type:"warning",text:"In dev mode, StrictMode runs effects twice on purpose to help you catch missing cleanups. This is normal."},{type:"heading",text:"7. When You Don't Need useEffect"},{type:"paragraph",text:"useEffect is widely misused. A lot of what people put in it doesn't belong there."},{type:"list",items:["Don't use it to compute a value from existing state — derive it during rendering","Don't use it to respond to a user event — do that in the event handler","Do use it for: fetching data, subscribing to something external, syncing with a non-React system"]},{type:"tip",text:"Ask yourself: does this talk to the outside world? Yes → effect. Just a calculation or event response → no effect."},{type:"heading",text:"✅ Section Summary"},{type:"list",items:["Side effects reach outside React (timers, fetch, localStorage)","useEffect runs after render; the array controls when","Return a cleanup function for timers and listeners","Fetch pattern: loading / error / data","Don't use an effect for what can be derived or for event responses"]},{type:"qa",question:"1. When does an effect with an empty array [] run?",answer:"Once, immediately after the first render."},{type:"qa",question:"2. Name something people put in useEffect that doesn't belong there.",answer:"Computing a value from existing state (derive it), or responding to a user event (use the handler)."}]};export{e as default};

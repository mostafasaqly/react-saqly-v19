const e={id:13,title:"Suspense وواجهة use في رياكت 19",level:"متوسط إلى متقدّم",lessons:["ما هو Suspense؟","Suspense لواجهة التحميل","حدود Suspense (Boundaries)","نظرة عامة على خطّاف use","استخدام use مع الوعود","استخدام use مع السياق","حدود التحميل والخطأ","أفضل ممارسات Suspense"],intro:"في القسم 12 كتبنا علامات التحميل يدوياً. لرياكت طريقة أنظف: Suspense يتيح لمكوّن أن «يتوقّف» أثناء تحميل بياناته، ورياكت يعرض بديلاً نيابةً عنك. ومع واجهة use الجديدة يقلّ الكود كثيراً.",content:[{type:"heading",text:"1. ما هو Suspense؟"},{type:"paragraph",text:"<Suspense> غلاف. إن كان مكوّن بداخله ينتظر شيئاً (مثل بيانات)، يعرض Suspense تلقائياً بديلاً (fallback) حتى يجهز. المكوّن نفسه لا يحتاج علامة تحميل."},{type:"code",code:`<Suspense fallback={<p>Loading...</p>}>
  <Profile />
</Suspense>`},{type:"heading",text:"2. Suspense لواجهة التحميل"},{type:"paragraph",text:"البديل يمكن أن يكون أي شيء — نص، أو مؤشّر، أو هياكل تحميل (skeletons). بينما يحمّل UserProfile بياناته، يرى المستخدم البديل."},{type:"heading",text:"3. حدود Suspense (Boundaries)"},{type:"paragraph",text:"حدّ Suspense هو المنطقة التي يغطّيها <Suspense> واحد. يمكنك استخدام عدة حدود لتحميل أجزاء مختلفة باستقلال."},{type:"code",code:`<Suspense fallback={<p>Loading profile...</p>}>
  <Profile />
</Suspense>
<Suspense fallback={<p>Loading posts...</p>}>
  <Posts />
</Suspense>`},{type:"tip",text:"غلّف كل جزء مستقلّ بحدّ خاصّ به حتى لا يحجب جزء بطيء البقية."},{type:"heading",text:"4. نظرة عامة على خطّاف use"},{type:"paragraph",text:"use دالة جديدة في رياكت 19 تقرأ مورداً — وعداً (Promise) أو سياقاً (Context). تعمل مع Suspense، ويمكن استدعاؤها بشكل شرطي عكس الخطّافات العادية."},{type:"heading",text:"5. استخدام use مع الوعود"},{type:"paragraph",text:"use يفكّ الوعد. أثناء الانتظار يعرض أقرب حدّ Suspense بديله. عند التحقّق تحصل على القيمة — بدون حالة تحميل ولا useEffect."},{type:"code",code:`function Comments({ commentsPromise }) {
  const comments = use(commentsPromise);
  return comments.map((c) => <li key={c.id}>{c.text}</li>);
}`},{type:"warning",text:"لا تنشئ الوعد داخل المكوّن الذي يستدعي use، وإلا صنع وعداً جديداً كل رسم. أنشئه بالأعلى أو مرّره كـ prop أو من موجّه/إطار عمل."},{type:"heading",text:"6. استخدام use مع السياق"},{type:"code",code:`function Button({ themed }) {
  if (themed) {
    const theme = use(ThemeContext); // مسموح داخل if
    return <button className={theme}>Themed</button>;
  }
  return <button>Plain</button>;
}`},{type:"heading",text:"7. حدود التحميل والخطأ"},{type:"paragraph",text:"Suspense يتعامل مع التحميل. والأخطاء؟ مهمّة حدّ الخطأ (Error Boundary) — مكوّن يلتقط الأخطاء من أبنائه ويعرض بديلاً. تقرنهما معاً."},{type:"code",code:`<ErrorBoundary fallback={<p>حدث خطأ.</p>}>
  <Suspense fallback={<p>Loading...</p>}>
    <Comments commentsPromise={commentsPromise} />
  </Suspense>
</ErrorBoundary>`},{type:"heading",text:"8. أفضل ممارسات Suspense"},{type:"list",items:["حدّ واحد لكل جزء مستقلّ","استخدم هياكل التحميل كبديل لتخطيط ثابت","لا تنشئ الوعود في الرسم — أنشئها بالخارج أو من إطار العمل","اقرن Suspense بحدّ خطأ لتغطية التحميل والفشل معاً"]},{type:"heading",text:"✅ ملخص القسم"},{type:"list",items:["<Suspense> يعرض بديلاً أثناء انتظار الابن","الحدود تتيح تحميل الأجزاء باستقلال","use يقرأ وعداً أو سياقاً، ويمكن استدعاؤه شرطياً","حدود الخطأ تلتقط الأعطال؛ اقرنها بـ Suspense"]},{type:"qa",question:"1. ماذا يعرض <Suspense> أثناء تحميل ابنه؟",answer:"بديله (fallback) — نص أو مؤشّر أو هياكل تحميل."},{type:"qa",question:"2. ما الذي يتعامل مع الأخطاء بينما Suspense يتعامل مع التحميل؟",answer:"حدّ الخطأ (Error Boundary) — اقرنه بـ Suspense لتغطية الكلّ."}],titleEn:"Suspense }; the use API in React 19"};export{e as default};

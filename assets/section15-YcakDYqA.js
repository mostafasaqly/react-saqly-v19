const e={id:15,title:"Redux غير المتزامن بـ createAsyncThunk",level:"متقدّم",lessons:["لماذا المنطق غير المتزامن في Redux؟","فهم pending و fulfilled و rejected","إنشاء إجراءات غير متزامنة","جلب البيانات من API","حالة isLoading","حالة isError","حالة رسالة الخطأ","معالجة نجاح API","معالجة فشل API","عمليات CRUD مع createAsyncThunk","استخدام Axios مع Redux Toolkit","إعادة هيكلة كود Redux غير المتزامن"],intro:"شرائح Redux تحدّث الحالة فوراً. لكن جلب البيانات يأخذ وقتاً وقد يفشل. createAsyncThunk هو أداة Redux Toolkit للتعامل مع العمل غير المتزامن — التحميل والنجاح والفشل — بشكل نظيف داخل المتجر.",content:[{type:"heading",text:"1. لماذا المنطق غير المتزامن في Redux؟"},{type:"paragraph",text:"المخفّض العادي يجب أن يكون متزامناً — يأخذ الحالة ويُرجع التالية فوراً. لكن الجلب غير متزامن. الـ thunk دالة تستطيع عملاً غير متزامن ثم تُرسل إجراءات عند الانتهاء. createAsyncThunk يبنيها لك."},{type:"heading",text:"2. فهم pending و fulfilled و rejected"},{type:"list",items:["pending: بدأ الطلب → أظهر مؤشّر تحميل","fulfilled: نجح الطلب → احفظ البيانات","rejected: فشل الطلب → أظهر خطأ"]},{type:"heading",text:"3. إنشاء إجراءات غير متزامنة"},{type:"code",code:`export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const { data } = await axios.get(API);
    return data; // يصبح payload عند النجاح
  }
);`},{type:"heading",text:"4. جلب البيانات من API"},{type:"paragraph",text:"في الشريحة، تعامل مع المراحل الثلاث في extraReducers."},{type:"code",code:`extraReducers: (builder) => {
  builder
    .addCase(fetchUsers.pending, (state) => { state.isLoading = true; })
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.list = action.payload;
    })
    .addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.error.message;
    });
}`},{type:"heading",text:"5. حالة isLoading"},{type:"code",code:`.addCase(fetchUsers.pending, (state) => { state.isLoading = true; })
// في المكوّن:
if (isLoading) return <p>Loading...</p>;`},{type:"heading",text:"6. حالة isError"},{type:"code",code:".addCase(fetchUsers.rejected, (state) => { state.isError = true; })"},{type:"heading",text:"7. حالة رسالة الخطأ"},{type:"code",code:`.addCase(fetchUsers.rejected, (state, action) => {
  state.message = action.error.message;
});`},{type:"tip",text:"isLoading + isError + message + البيانات = حالة غير متزامنة كاملة واحترافية."},{type:"heading",text:"8. معالجة نجاح API"},{type:"code",code:`.addCase(fetchUsers.fulfilled, (state, action) => {
  state.isLoading = false;
  state.list = action.payload;
});`},{type:"heading",text:"9. معالجة فشل API"},{type:"paragraph",text:"عند rejected: أوقف التحميل، اضبط علامة الخطأ، واحفظ الرسالة. رمي Axios على الحالة السيّئة يجعل هذا تلقائياً."},{type:"heading",text:"10. عمليات CRUD مع createAsyncThunk"},{type:"code",code:`export const addUser = createAsyncThunk("users/add", async (newUser) => {
  const { data } = await axios.post(API, newUser);
  return data;
});

export const deleteUser = createAsyncThunk("users/delete", async (id) => {
  await axios.delete(\`\${API}/\${id}\`);
  return id; // أرجِع الـ id لحذفه من المخفّض
});`},{type:"heading",text:"11. استخدام Axios مع Redux Toolkit"},{type:"paragraph",text:"Axios يناسب الـ thunks تماماً: يحلّل JSON (data جاهز للإرجاع)، ويرمي على الأخطاء فتصبح rejected تلقائياً."},{type:"heading",text:"12. إعادة هيكلة كود Redux غير المتزامن"},{type:"list",items:["ملفات منفصلة: الـ thunks، والشريحة، وخدمة Axios","أعد استخدام خدمة API بدل نداء axios في كل thunk","شكل حالة موحّد: { data, isLoading, isError, message }","استخدم rejectWithValue لرسائل أخطاء مخصّصة"]},{type:"heading",text:"✅ ملخص القسم"},{type:"list",items:["المخفّضات متزامنة؛ الـ thunks تتعامل مع العمل غير المتزامن","createAsyncThunk يُرسل تلقائياً pending/fulfilled/rejected","تعامل معها في extraReducers","تتبّع isLoading و isError و message والبيانات"]},{type:"qa",question:"1. لماذا لا يمكن الجلب مباشرةً داخل مخفّض عادي؟",answer:"المخفّضات يجب أن تكون متزامنة — تُرجع الحالة التالية فوراً. الجلب غير متزامن، فيذهب في thunk."},{type:"qa",question:"2. ما المراحل الثلاث التي يُرسلها createAsyncThunk؟",answer:"pending (بدأ)، fulfilled (نجح)، rejected (فشل)."}],titleEn:"Async Redux with createAsyncThunk"};export{e as default};

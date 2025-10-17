# 🔗 دليل الربط بين Frontend و Backend

## 📋 نظرة عامة

هذا الدليل يشرح كيفية ربط الواجهة الأمامية (Frontend) بالواجهة الخلفية (Backend) بشكل صحيح.

## 🏗️ البنية المعمارية

```
┌─────────────────┐         ┌─────────────────┐
│   Frontend      │ ──────► │    Backend      │
│  (React/Vite)   │  API    │   (Express)     │
│  Port: 3000     │ ◄────── │   Port: 5000    │
└─────────────────┘         └─────────────────┘
```

## ⚙️ إعدادات الربط

### 1️⃣ Backend Configuration

**الملف:** `backend/server.js`

```javascript
// إعدادات CORS للسماح بالطلبات من Frontend
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};
```

**البورت:** 5000

**Endpoints المتاحة:**
- `GET /api/health` - فحص صحة الخادم
- `GET /api/articles` - جلب جميع المقالات
- `GET /api/articles/:id` - جلب مقال معين
- `GET /api/articles/category/:category` - جلب مقالات حسب الفئة

### 2️⃣ Frontend Configuration

**الملف:** `frontend/blog-frontend/vite.config.js`

```javascript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      secure: false,
    },
  },
}
```

**الملف:** `frontend/blog-frontend/src/config/api.js`

```javascript
// في Development: يستخدم Proxy
// في Production: يستخدم URL الكامل
const API_BASE_URL = isDevelopment ? '' : 'http://localhost:5000';
```

## 🚀 طرق التشغيل

### الطريقة الأولى: التشغيل التلقائي (موصى به)

#### Windows:
```bash
start-all.bat
```

#### Linux/Mac:
```bash
chmod +x start-all.sh
./start-all.sh
```

### الطريقة الثانية: التشغيل اليدوي

#### 1. تشغيل Backend
```bash
cd backend
npm install  # أول مرة فقط
npm start
```

انتظر حتى ترى رسالة:
```
╔════════════════════════════════════════════════════╗
║  🚀 Personal Blog Backend Server                  ║
║  📡 Server: http://localhost:5000                 ║
║  ✅ Status: Running                               ║
╚════════════════════════════════════════════════════╝
```

#### 2. تشغيل Frontend (في نافذة terminal جديدة)
```bash
cd frontend/blog-frontend
pnpm install  # أول مرة فقط
pnpm dev
```

انتظر حتى ترى:
```
VITE ready in XXX ms
➜  Local:   http://localhost:3000/
```

## 🧪 اختبار الربط

### 1. فحص Backend مباشرة
افتح المتصفح وانتقل إلى:
```
http://localhost:5000/api/health
```

يجب أن ترى:
```json
{
  "status": "OK",
  "message": "Backend server is running",
  "articlesCount": 6
}
```

### 2. فحص جلب المقالات
```
http://localhost:5000/api/articles
```

يجب أن ترى مصفوفة JSON بجميع المقالات.

### 3. فحص Frontend
افتح:
```
http://localhost:3000
```

يجب أن ترى المقالات تظهر في الصفحة الرئيسية.

### 4. فحص Console
افتح Developer Tools (F12) في المتصفح:
- تحقق من علامة التبويب **Console**
- يجب أن ترى رسائل مثل:
  ```
  Fetching from: /api/articles
  Data received from /api/articles: [...]
  ```

- تحقق من علامة التبويب **Network**
- ابحث عن طلبات `/api/articles`
- يجب أن تكون الحالة `200 OK`

## 🔍 حل المشاكل الشائعة

### ❌ المشكلة: "Failed to fetch" أو "Network Error"

**الأسباب المحتملة:**
1. Backend غير مشغل
2. البورت 5000 مستخدم من تطبيق آخر
3. Firewall يحجب الاتصال

**الحل:**
```bash
# 1. تأكد من أن Backend يعمل
cd backend
npm start

# 2. تحقق من البورت المستخدم
netstat -ano | findstr :5000  # Windows
lsof -i :5000                  # Linux/Mac

# 3. جرب بورت آخر
# في backend/server.js غير PORT إلى 5001 مثلاً
# ثم حدّث vite.config.js و api.js
```

### ❌ المشكلة: CORS Error

**الرسالة:**
```
Access to fetch at 'http://localhost:5000/api/articles' from origin 
'http://localhost:3000' has been blocked by CORS policy
```

**الحل:**
تأكد من أن `backend/server.js` يحتوي على:
```javascript
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
};
app.use(cors(corsOptions));
```

### ❌ المشكلة: 404 Not Found

**الأسباب:**
1. Backend endpoint غير صحيح
2. Proxy في Vite غير مضبوط

**الحل:**
تحقق من:
- `vite.config.js` - يجب أن يحتوي على proxy
- `src/config/api.js` - تأكد من صحة URLs
- Backend يعمل على البورت الصحيح

### ❌ المشكلة: البيانات لا تظهر في Frontend

**خطوات التحقق:**

1. **افحص Backend مباشرة:**
   ```
   http://localhost:5000/api/articles
   ```
   إذا رأيت البيانات هنا، Backend يعمل بشكل صحيح.

2. **افحص Console في المتصفح:**
   - هل هناك أخطاء؟
   - هل الطلبات تصل إلى Backend؟

3. **افحص Network Tab:**
   - هل Status Code = 200?
   - هل Response يحتوي على بيانات؟

## 📝 ملاحظات مهمة

### Development vs Production

#### في Development:
- Frontend يستخدم Vite Proxy
- الطلبات تذهب إلى `/api/articles`
- Vite يحولها تلقائياً إلى `http://localhost:5000/api/articles`

#### في Production:
- يجب تحديد URL الكامل
- استخدم متغيرات البيئة (Environment Variables)
- مثال: `VITE_API_URL=https://your-api.com`

### متغيرات البيئة

أنشئ ملف `.env` في `frontend/blog-frontend/`:

```env
# Development
VITE_API_URL=http://localhost:5000

# Production
# VITE_API_URL=https://your-production-api.com
```

**ملاحظة:** ملفات `.env` لا تُرفع إلى Git (موجودة في `.gitignore`)

## 🎯 Best Practices

1. **دائماً شغّل Backend أولاً** قبل Frontend
2. **استخدم الـ Health Endpoint** للتحقق من حالة Backend
3. **راقب Console Logs** في كل من Frontend و Backend
4. **استخدم Developer Tools** لفحص Network Requests
5. **لا تنسَ حفظ التغييرات** في جميع الملفات

## 📞 المساعدة

إذا واجهت مشاكل:

1. تحقق من Logs في Terminal
2. افحص Browser Console
3. تأكد من أن كلا الخادمين يعملان
4. جرب إعادة تشغيل كل من Frontend و Backend
5. امسح Cache المتصفح (Ctrl+Shift+Delete)

---

<div align="center">

**تم التحديث:** 2025-10-16

</div>


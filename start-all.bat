@echo off
chcp 65001 >nul
echo.
echo ╔════════════════════════════════════════════════════╗
echo ║  🚀 تشغيل المدونة الشخصية - Personal Blog       ║
echo ╚════════════════════════════════════════════════════╝
echo.

echo [1/2] 🔧 تشغيل Backend Server...
cd backend
start "Backend Server" cmd /k "npm start"
timeout /t 3 >nul

echo [2/2] 🎨 تشغيل Frontend Application...
cd ../frontend/blog-frontend
start "Frontend App" cmd /k "pnpm dev"

echo.
echo ✅ تم تشغيل المشروع بنجاح!
echo.
echo 📡 Backend: http://localhost:5000
echo 🌐 Frontend: http://localhost:3000
echo.
echo 💡 لإيقاف المشروع، أغلق نوافذ Terminal
echo.
pause


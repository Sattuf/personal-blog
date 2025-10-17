#!/bin/bash

echo ""
echo "╔════════════════════════════════════════════════════╗"
echo "║  🚀 تشغيل المدونة الشخصية - Personal Blog       ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""

echo "[1/2] 🔧 تشغيل Backend Server..."
cd backend
npm start &
BACKEND_PID=$!

sleep 3

echo "[2/2] 🎨 تشغيل Frontend Application..."
cd ../frontend/blog-frontend
pnpm dev &
FRONTEND_PID=$!

echo ""
echo "✅ تم تشغيل المشروع بنجاح!"
echo ""
echo "📡 Backend: http://localhost:5000"
echo "🌐 Frontend: http://localhost:3000"
echo ""
echo "💡 لإيقاف المشروع، اضغط Ctrl+C"
echo ""

# Wait for background processes
wait $BACKEND_PID $FRONTEND_PID


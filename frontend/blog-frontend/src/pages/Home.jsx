import { useEffect, useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import { Loader2, Sparkles, TrendingUp, BookMarked } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/articles');
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-12 h-12 text-primary" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-primary to-purple-600 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-pink-600 to-purple-600 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-full mb-6 border border-primary/20"
          >
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              مرحباً بك في عالم الإبداع
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-gray-900 via-primary to-purple-600 dark:from-white dark:via-primary dark:to-purple-400 bg-clip-text text-transparent">
              مدونتي الشخصية
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            مساحة للتأمل والكتابة في{' '}
            <span className="text-purple-600 dark:text-purple-400 font-semibold">الأدب</span>
            {' '}و{' '}
            <span className="text-blue-600 dark:text-blue-400 font-semibold">الفكر</span>
            {' '}و{' '}
            <span className="text-green-600 dark:text-green-400 font-semibold">الإسلام</span>
          </motion.p>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-8 mt-12"
          >
            <div className="flex items-center gap-3 px-6 py-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
              <BookMarked className="w-6 h-6 text-primary" />
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">{articles.length}</div>
                <div className="text-xs text-muted-foreground">مقالة منشورة</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">جديد</div>
                <div className="text-xs text-muted-foreground">محتوى متجدد</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Articles Section */}
        {articles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center py-20"
          >
            <div className="inline-block p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-xl">
              <BookMarked className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">لا توجد مقالات متاحة حالياً</p>
              <p className="text-sm text-muted-foreground mt-2">تابعنا لمعرفة المزيد قريباً</p>
            </div>
          </motion.div>
        ) : (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-1 w-12 bg-gradient-to-r from-primary to-purple-600 rounded-full" />
              <h2 className="text-3xl font-bold text-foreground">أحدث المقالات</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;


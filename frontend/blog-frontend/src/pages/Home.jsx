import { useEffect, useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { TrendingUp, BookMarked, Sparkles, Filter, Grid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_ENDPOINTS, fetchAPI } from '../config/api';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [activeFilter, articles]);

  const fetchArticles = async () => {
    try {
      const data = await fetchAPI(API_ENDPOINTS.ARTICLES);
      setArticles(data);
      setFilteredArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles([]);
      setFilteredArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const filterArticles = () => {
    if (activeFilter === 'all') {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(articles.filter(article => article.category === activeFilter));
    }
  };

  const categories = [
    { id: 'all', label: 'الكل', icon: '🌟', count: articles.length, gradient: 'from-indigo-500 to-purple-500' },
    { id: 'literary', label: 'أدبي', icon: '📖', count: articles.filter(a => a.category === 'literary').length, gradient: 'from-purple-500 to-pink-500' },
    { id: 'intellectual', label: 'فكري', icon: '💭', count: articles.filter(a => a.category === 'intellectual').length, gradient: 'from-blue-500 to-cyan-500' },
    { id: 'islamic', label: 'إسلامي', icon: '🕌', count: articles.filter(a => a.category === 'islamic').length, gradient: 'from-green-500 to-emerald-500' },
  ];

  if (loading) {
    return <LoadingSpinner message="جاري تحميل المقالات..." />;
  }

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 120, 0],
            opacity: [0.03, 0.08, 0.03]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-primary via-secondary to-accent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, -120, 0],
            opacity: [0.03, 0.08, 0.03]
          }}
          transition={{ duration: 30, repeat: Infinity }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-accent via-secondary to-primary rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -100, 0],
            opacity: [0.02, 0.06, 0.02]
          }}
          transition={{ duration: 35, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 w-1/3 h-1/3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-full mb-8 border-2 border-primary/20 backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-primary" />
            </motion.div>
            <span className="text-base font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              مرحباً بك في عالم الإبداع والمعرفة
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8"
          >
            <span className="text-gradient-enhanced">
              مدونتي الشخصية
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-xl md:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12"
          >
            مساحة للتأمل والكتابة في{' '}
            <motion.span 
              whileHover={{ scale: 1.1 }}
              className="text-purple-600 dark:text-purple-400 font-bold cursor-pointer inline-block"
            >
              الأدب
            </motion.span>
            {' '}و{' '}
            <motion.span 
              whileHover={{ scale: 1.1 }}
              className="text-blue-600 dark:text-blue-400 font-bold cursor-pointer inline-block"
            >
              الفكر
            </motion.span>
            {' '}و{' '}
            <motion.span 
              whileHover={{ scale: 1.1 }}
              className="text-green-600 dark:text-green-400 font-bold cursor-pointer inline-block"
            >
              الإسلام
            </motion.span>
          </motion.p>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex items-center gap-4 px-8 py-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-3xl shadow-xl border-2 border-white dark:border-gray-700"
            >
              <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-secondary">
                <BookMarked className="w-7 h-7 text-white" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {articles.length}
                </div>
                <div className="text-sm text-muted-foreground font-semibold">مقالة منشورة</div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex items-center gap-4 px-8 py-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-3xl shadow-xl border-2 border-white dark:border-gray-700"
            >
              <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-black bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                  جديد
                </div>
                <div className="text-sm text-muted-foreground font-semibold">محتوى متجدد</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            {/* Category Filters */}
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Filter className="w-5 h-5" />
                <span className="font-semibold">التصنيف:</span>
              </div>
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.08, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(category.id)}
                  className={`relative px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                    activeFilter === category.id
                      ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg`
                      : 'bg-white/70 dark:bg-gray-800/70 text-foreground hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xl">{category.icon}</span>
                    <span>{category.label}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activeFilter === category.id
                        ? 'bg-white/30'
                        : 'bg-primary/10'
                    }`}>
                      {category.count}
                    </span>
                  </span>
                  {activeFilter === category.id && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 -z-10 bg-gradient-to-r from-primary to-accent rounded-2xl blur-lg opacity-50"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-white/70 dark:bg-gray-800/70 rounded-2xl p-1.5">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                    : 'text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Grid className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                    : 'text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <List className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Articles Section */}
        {filteredArticles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center py-32"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block p-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl"
            >
              <BookMarked className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
              <p className="text-muted-foreground text-2xl font-bold mb-3">لا توجد مقالات في هذا التصنيف</p>
              <p className="text-base text-muted-foreground">جرّب تصنيفاً آخر أو تابعنا لمعرفة المزيد قريباً</p>
            </motion.div>
          </motion.div>
        ) : (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="h-1.5 w-16 bg-gradient-to-r from-primary via-secondary to-accent rounded-full" />
              <h2 className="text-4xl font-black text-foreground">أحدث المقالات</h2>
              <div className="flex-1 h-1 bg-gradient-to-r from-primary/20 to-transparent rounded-full" />
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter + viewMode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className={`grid gap-8 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1 max-w-4xl mx-auto'
                }`}
              >
                {filteredArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 60, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      delay: index * 0.1, 
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100
                    }}
                  >
                    <ArticleCard article={article} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

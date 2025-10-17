import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { BookOpen, Lightbulb, Heart, Filter, Grid, List, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_ENDPOINTS, fetchAPI } from '../config/api';

const Category = () => {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    fetchArticlesByCategory();
  }, [category]);

  const fetchArticlesByCategory = async () => {
    setLoading(true);
    try {
      const data = await fetchAPI(API_ENDPOINTS.ARTICLES_BY_CATEGORY(category));
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryInfo = (cat) => {
    const info = {
      literary: {
        title: 'المقالات الأدبية',
        subtitle: 'رحلة في عالم الكلمات',
        description: 'استكشف عالم الكلمات والجمال اللغوي من خلال مقالاتنا الأدبية التي تجمع بين الإبداع والتعبير الفني',
        icon: BookOpen,
        gradient: 'from-purple-500 via-fuchsia-500 to-pink-500',
        bgGradient: 'from-purple-500/10 to-pink-500/10',
        iconColor: 'text-purple-600 dark:text-purple-400',
        emoji: '📚'
      },
      intellectual: {
        title: 'المقالات الفكرية',
        subtitle: 'تأملات في عالم الفكر',
        description: 'تأملات عميقة في القضايا الفلسفية والثقافية المعاصرة التي تثري العقل وتوسع الآفاق',
        icon: Lightbulb,
        gradient: 'from-blue-500 via-cyan-500 to-teal-500',
        bgGradient: 'from-blue-500/10 to-teal-500/10',
        iconColor: 'text-blue-600 dark:text-blue-400',
        emoji: '💭'
      },
      islamic: {
        title: 'المقالات الإسلامية',
        subtitle: 'نور من القيم الإسلامية',
        description: 'مقالات تتناول الدين والروحانية والقيم الإسلامية بأسلوب معاصر يلامس القلوب ويرشد العقول',
        icon: Heart,
        gradient: 'from-green-500 via-emerald-500 to-lime-500',
        bgGradient: 'from-green-500/10 to-lime-500/10',
        iconColor: 'text-green-600 dark:text-green-400',
        emoji: '🕌'
      }
    };
    return info[cat] || {
      title: cat,
      subtitle: '',
      description: '',
      icon: Filter,
      gradient: 'from-gray-500 to-gray-600',
      bgGradient: 'from-gray-500/10 to-gray-600/10',
      iconColor: 'text-gray-600 dark:text-gray-400',
      emoji: '📖'
    };
  };

  const categoryInfo = getCategoryInfo(category);
  const CategoryIcon = categoryInfo.icon;

  const sortedArticles = [...articles].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    }
    return 0;
  });

  if (loading) {
    return <LoadingSpinner message="جاري تحميل المقالات..." />;
  }

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 120, 0],
            opacity: [0.03, 0.07, 0.03]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className={`absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br ${categoryInfo.gradient} rounded-full blur-3xl`}
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -90, 0],
            opacity: [0.02, 0.05, 0.02]
          }}
          transition={{ duration: 30, repeat: Infinity }}
          className={`absolute bottom-1/4 -left-1/4 w-1/3 h-1/3 bg-gradient-to-tr ${categoryInfo.gradient} rounded-full blur-3xl`}
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-8"
          >
            <div className={`relative p-8 rounded-3xl bg-gradient-to-br ${categoryInfo.bgGradient} backdrop-blur-sm shadow-2xl border-2 border-white/20 dark:border-gray-700/20`}>
              <CategoryIcon className={`w-16 h-16 ${categoryInfo.iconColor}`} />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-2 -right-2 text-4xl"
              >
                {categoryInfo.emoji}
              </motion.div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <p className="text-muted-foreground text-lg mb-3 font-semibold">{categoryInfo.subtitle}</p>
            <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span className={`bg-gradient-to-r ${categoryInfo.gradient} bg-clip-text text-transparent`}>
              {categoryInfo.title}
            </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10"
          >
            {categoryInfo.description}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <div className="flex items-center gap-4 px-8 py-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-3xl shadow-xl border-2 border-white dark:border-gray-700">
              <div className={`p-3 rounded-2xl bg-gradient-to-br ${categoryInfo.bgGradient}`}>
                <Filter className={`w-6 h-6 ${categoryInfo.iconColor}`} />
              </div>
              <div className="text-right">
                <div className={`text-3xl font-black bg-gradient-to-r ${categoryInfo.gradient} bg-clip-text text-transparent`}>
                  {articles.length}
                </div>
                <div className="text-sm text-muted-foreground font-semibold">مقالة منشورة</div>
              </div>
            </div>

            <div className="flex items-center gap-4 px-8 py-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-3xl shadow-xl border-2 border-white dark:border-gray-700">
              <div className={`p-3 rounded-2xl bg-gradient-to-br ${categoryInfo.bgGradient}`}>
                <TrendingUp className={`w-6 h-6 ${categoryInfo.iconColor}`} />
              </div>
              <div className="text-right">
                <div className={`text-3xl font-black bg-gradient-to-r ${categoryInfo.gradient} bg-clip-text text-transparent`}>
                  جديد
                </div>
                <div className="text-sm text-muted-foreground font-semibold">محتوى متجدد</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Filter and View Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12"
        >
          <div className="flex items-center gap-4">
            <div className={`h-1.5 w-16 bg-gradient-to-r ${categoryInfo.gradient} rounded-full`} />
            <h2 className="text-3xl font-black text-foreground">جميع المقالات</h2>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-1.5 shadow-lg">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl transition-all ${
                viewMode === 'grid'
                  ? `bg-gradient-to-r ${categoryInfo.gradient} text-white shadow-md`
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
                  ? `bg-gradient-to-r ${categoryInfo.gradient} text-white shadow-md`
                  : 'text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <List className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center py-32"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block p-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl"
            >
              <CategoryIcon className={`w-24 h-24 ${categoryInfo.iconColor} mx-auto mb-6`} />
              <p className="text-muted-foreground text-2xl font-bold mb-3">لا توجد مقالات في هذا التصنيف حالياً</p>
              <p className="text-base text-muted-foreground">تابعنا لمعرفة المزيد قريباً</p>
            </motion.div>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
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
              {sortedArticles.map((article, index) => (
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
        )}
      </div>
    </div>
  );
};

export default Category;

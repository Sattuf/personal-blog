import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import { Loader2, BookOpen, Lightbulb, Heart, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const Category = () => {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticlesByCategory();
  }, [category]);

  const fetchArticlesByCategory = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/articles/category/${category}`);
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryInfo = (cat) => {
    const info = {
      literary: {
        title: 'المقالات الأدبية',
        description: 'استكشف عالم الكلمات والجمال اللغوي من خلال مقالاتنا الأدبية',
        icon: BookOpen,
        gradient: 'from-purple-500 to-pink-500',
        bgGradient: 'from-purple-500/10 to-pink-500/10',
        iconColor: 'text-purple-600 dark:text-purple-400'
      },
      intellectual: {
        title: 'المقالات الفكرية',
        description: 'تأملات عميقة في القضايا الفلسفية والثقافية المعاصرة',
        icon: Lightbulb,
        gradient: 'from-blue-500 to-cyan-500',
        bgGradient: 'from-blue-500/10 to-cyan-500/10',
        iconColor: 'text-blue-600 dark:text-blue-400'
      },
      islamic: {
        title: 'المقالات الإسلامية',
        description: 'مقالات تتناول الدين والروحانية والقيم الإسلامية',
        icon: Heart,
        gradient: 'from-green-500 to-emerald-500',
        bgGradient: 'from-green-500/10 to-emerald-500/10',
        iconColor: 'text-green-600 dark:text-green-400'
      }
    };
    return info[cat] || {
      title: cat,
      description: '',
      icon: Filter,
      gradient: 'from-gray-500 to-gray-600',
      bgGradient: 'from-gray-500/10 to-gray-600/10',
      iconColor: 'text-gray-600 dark:text-gray-400'
    };
  };

  const categoryInfo = getCategoryInfo(category);
  const CategoryIcon = categoryInfo.icon;

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
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className={`absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br ${categoryInfo.gradient} rounded-full blur-3xl`}
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Category Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${categoryInfo.bgGradient} mb-6 shadow-lg`}
          >
            <CategoryIcon className={`w-10 h-10 ${categoryInfo.iconColor}`} />
          </motion.div>

          {/* Category Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            <span className={`bg-gradient-to-r ${categoryInfo.gradient} bg-clip-text text-transparent`}>
              {categoryInfo.title}
            </span>
          </motion.h1>

          {/* Category Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            {categoryInfo.description}
          </motion.p>

          {/* Article Count */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50 dark:border-gray-700/50"
          >
            <Filter className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">
              {articles.length} {articles.length === 1 ? 'مقالة' : 'مقالات'}
            </span>
          </motion.div>
        </motion.div>

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center py-20"
          >
            <div className="inline-block p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-xl">
              <CategoryIcon className={`w-16 h-16 ${categoryInfo.iconColor} mx-auto mb-4`} />
              <p className="text-muted-foreground text-lg mb-2">لا توجد مقالات في هذا التصنيف حالياً</p>
              <p className="text-sm text-muted-foreground">تابعنا لمعرفة المزيد قريباً</p>
            </div>
          </motion.div>
        ) : (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className={`h-1 w-12 bg-gradient-to-r ${categoryInfo.gradient} rounded-full`} />
              <h2 className="text-2xl font-bold text-foreground">جميع المقالات</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
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

export default Category;


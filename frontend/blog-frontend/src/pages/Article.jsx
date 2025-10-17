import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Tag, ArrowRight, Share2, BookmarkPlus, Clock, Eye, ThumbsUp, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '../components/LoadingSpinner';
import { API_ENDPOINTS, fetchAPI } from '../config/api';

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    fetchArticle();
    setLikes(Math.floor(Math.random() * 100) + 10);
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchArticle = async () => {
    try {
      const data = await fetchAPI(API_ENDPOINTS.ARTICLE_BY_ID(id));
      setArticle(data);
    } catch (error) {
      console.error('Error fetching article:', error);
      setArticle(null);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryLabel = (category) => {
    const labels = {
      literary: 'أدبي',
      intellectual: 'فكري',
      islamic: 'إسلامي'
    };
    return labels[category] || category;
  };

  const getCategoryStyle = (category) => {
    const styles = {
      literary: {
        gradient: 'from-purple-500 via-fuchsia-500 to-pink-500',
        glow: 'shadow-purple-500/40',
        bg: 'from-purple-500/10 to-pink-500/10'
      },
      intellectual: {
        gradient: 'from-blue-500 via-cyan-500 to-teal-500',
        glow: 'shadow-blue-500/40',
        bg: 'from-blue-500/10 to-teal-500/10'
      },
      islamic: {
        gradient: 'from-green-500 via-emerald-500 to-lime-500',
        glow: 'shadow-green-500/40',
        bg: 'from-green-500/10 to-lime-500/10'
      }
    };
    return styles[category] || {
      gradient: 'from-gray-500 to-gray-600',
      glow: 'shadow-gray-500/40',
      bg: 'from-gray-500/10 to-gray-600/10'
    };
  };

  const calculateReadingTime = () => {
    if (!article) return 5;
    const wordsPerMinute = 200;
    const wordCount = article.content ? article.content.split(' ').length : 300;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  if (loading) {
    return <LoadingSpinner message="جاري تحميل المقال..." />;
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto p-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">المقال غير موجود</h2>
          <p className="text-muted-foreground mb-6">عذراً، لم نتمكن من العثور على المقال المطلوب</p>
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-bold flex items-center gap-2 mx-auto shadow-lg"
            >
              <ArrowRight className="w-5 h-5" />
              العودة للرئيسية
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const categoryStyle = getCategoryStyle(article.category);

  return (
    <div className="relative min-h-screen">
      {/* Reading Progress Bar */}
      <motion.div
        className={`fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${categoryStyle.gradient} z-50 origin-left shadow-lg`}
        style={{ scaleX: readingProgress / 100 }}
      />

      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 90, 0],
            opacity: [0.03, 0.06, 0.03]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className={`absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br ${categoryStyle.gradient} rounded-full blur-3xl`}
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            opacity: [0.02, 0.05, 0.02]
          }}
          transition={{ duration: 30, repeat: Infinity }}
          className={`absolute bottom-1/4 -left-1/4 w-1/3 h-1/3 bg-gradient-to-tr ${categoryStyle.gradient} rounded-full blur-3xl`}
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl font-semibold hover:bg-white dark:hover:bg-gray-800 transition-all shadow-lg border border-gray-200/50 dark:border-gray-700/50"
            >
              <ArrowRight className="w-5 h-5" />
              العودة للرئيسية
            </motion.button>
          </Link>
        </motion.div>

        <article className="max-w-4xl mx-auto">
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <span className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-base font-bold bg-gradient-to-r ${categoryStyle.gradient} text-white shadow-xl ${categoryStyle.glow}`}>
              <Tag className="w-5 h-5" />
              {getCategoryLabel(article.category)}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight"
          >
            <span className={`bg-gradient-to-r ${categoryStyle.gradient} bg-clip-text text-transparent`}>
              {article.title}
            </span>
          </motion.h1>

          {/* Meta Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-6 mb-10 pb-8 border-b-2 border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className={`p-2 rounded-xl bg-gradient-to-r ${categoryStyle.bg}`}>
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold">{new Date(article.date).toLocaleDateString('ar-SA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className={`p-2 rounded-xl bg-gradient-to-r ${categoryStyle.bg}`}>
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold">{calculateReadingTime()} دقائق قراءة</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className={`p-2 rounded-xl bg-gradient-to-r ${categoryStyle.bg}`}>
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold">{Math.floor(Math.random() * 500) + 100} مشاهدة</span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4 mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${categoryStyle.gradient} text-white rounded-2xl font-bold shadow-lg ${categoryStyle.glow} hover:shadow-xl transition-all`}
            >
              <Share2 className="w-5 h-5" />
              مشاركة المقال
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold shadow-lg transition-all ${
                isBookmarked
                  ? `bg-gradient-to-r ${categoryStyle.gradient} text-white ${categoryStyle.glow}`
                  : 'bg-white dark:bg-gray-800 text-foreground border-2 border-gray-200 dark:border-gray-700'
              }`}
            >
              <BookmarkPlus className="w-5 h-5" />
              {isBookmarked ? 'محفوظ' : 'حفظ'}
            </motion.button>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 mb-12"
          >
            {article.content.split('\n\n').map((paragraph, index) => (
              paragraph.trim() && (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="mb-8 text-foreground leading-loose text-lg md:text-xl first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-2 first-letter:float-right"
                >
                  {paragraph}
                </motion.p>
              )
            ))}
          </motion.div>

          {/* Interaction Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setLikes(likes + 1)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all bg-gradient-to-r ${categoryStyle.gradient} text-white ${categoryStyle.glow}`}
            >
              <ThumbsUp className="w-6 h-6" />
              <span>{likes}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg bg-white dark:bg-gray-800 text-foreground shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:border-primary transition-all"
            >
              <MessageCircle className="w-6 h-6" />
              <span>تعليق</span>
            </motion.button>
          </motion.div>

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className={`text-center p-10 bg-gradient-to-r ${categoryStyle.bg} backdrop-blur-sm rounded-3xl shadow-xl border-2 ${categoryStyle.gradient.split(' ').map(c => `border-${c.split('-')[0]}-500/30`).join(' ')}`}
          >
            <h3 className="text-3xl font-black text-foreground mb-4">هل أعجبك المقال؟</h3>
            <p className="text-muted-foreground mb-8 text-lg">شاركه مع أصدقائك ليستفيدوا منه أيضاً</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 bg-gradient-to-r ${categoryStyle.gradient} text-white rounded-2xl font-bold shadow-lg ${categoryStyle.glow} flex items-center gap-2`}
              >
                <Share2 className="w-5 h-5" />
                مشاركة الآن
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white dark:bg-gray-800 text-foreground rounded-2xl font-bold shadow-lg border-2 border-gray-200 dark:border-gray-700 flex items-center gap-2"
              >
                <BookmarkPlus className="w-5 h-5" />
                حفظ للقراءة لاحقاً
              </motion.button>
            </div>
          </motion.div>
        </article>
      </div>
    </div>
  );
};

export default Article;

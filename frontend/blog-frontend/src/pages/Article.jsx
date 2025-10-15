import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Tag, ArrowRight, Loader2, Share2, BookmarkPlus, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { motion } from 'framer-motion';

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    fetchArticle();
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
      const response = await fetch(`http://localhost:5000/api/articles/${id}`);
      const data = await response.json();
      setArticle(data);
    } catch (error) {
      console.error('Error fetching article:', error);
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

  const getCategoryColor = (category) => {
    const colors = {
      literary: {
        bg: 'bg-gradient-to-r from-purple-500 to-pink-500',
        text: 'text-white',
        glow: 'shadow-purple-500/50'
      },
      intellectual: {
        bg: 'bg-gradient-to-r from-blue-500 to-cyan-500',
        text: 'text-white',
        glow: 'shadow-blue-500/50'
      },
      islamic: {
        bg: 'bg-gradient-to-r from-green-500 to-emerald-500',
        text: 'text-white',
        glow: 'shadow-green-500/50'
      }
    };
    return colors[category] || {
      bg: 'bg-gradient-to-r from-gray-500 to-gray-600',
      text: 'text-white',
      glow: 'shadow-gray-500/50'
    };
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

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-4">المقال غير موجود</h2>
          <Link to="/">
            <Button>
              <ArrowRight className="w-4 h-4 ml-2" />
              العودة للرئيسية
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const categoryStyle = getCategoryColor(article.category);

  return (
    <div className="relative">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-600 to-pink-600 z-50 origin-left"
        style={{ scaleX: readingProgress / 100 }}
      />

      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-primary to-purple-600 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 py-8 relative">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="inline-block mb-8">
            <Button variant="outline" size="sm" className="group">
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              العودة للرئيسية
            </Button>
          </Link>
        </motion.div>

        <article className="max-w-4xl mx-auto">
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${categoryStyle.bg} ${categoryStyle.text} shadow-lg ${categoryStyle.glow}`}>
              <Tag className="w-4 h-4" />
              {getCategoryLabel(article.category)}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-gray-900 via-primary to-purple-600 dark:from-white dark:via-primary dark:to-purple-400 bg-clip-text text-transparent">
              {article.title}
            </span>
          </motion.h1>

          {/* Meta Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-sm">{new Date(article.date).toLocaleDateString('ar-SA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm">٥ دقائق قراءة</span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-3 mb-12"
          >
            <Button variant="outline" size="sm" className="group">
              <Share2 className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
              مشاركة
            </Button>
            <Button variant="outline" size="sm" className="group">
              <BookmarkPlus className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
              حفظ
            </Button>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            {article.content.split('\n').map((paragraph, index) => (
              paragraph.trim() && (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="mb-6 text-foreground leading-relaxed text-lg"
                >
                  {paragraph}
                </motion.p>
              )
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="my-12 flex items-center gap-4"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
            <div className="text-muted-foreground text-sm">نهاية المقال</div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
          </motion.div>

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-center p-8 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl"
          >
            <h3 className="text-xl font-bold text-foreground mb-4">هل أعجبك المقال؟</h3>
            <p className="text-muted-foreground mb-6">شاركه مع أصدقائك</p>
            <div className="flex justify-center gap-3">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 ml-2" />
                مشاركة
              </Button>
              <Button variant="outline" size="sm">
                <BookmarkPlus className="w-4 h-4 ml-2" />
                حفظ للقراءة لاحقاً
              </Button>
            </div>
          </motion.div>
        </article>
      </div>
    </div>
  );
};

export default Article;


import { Link } from 'react-router-dom';
import { Calendar, Tag, ArrowLeft, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const ArticleCard = ({ article }) => {
  const [isHovered, setIsHovered] = useState(false);

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

  const categoryStyle = getCategoryColor(article.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <Link to={`/article/${article.id}`} className="block">
        {/* Card Container */}
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50">
          {/* Gradient Overlay on Hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.05 : 0 }}
            className="absolute inset-0 bg-gradient-to-br from-primary via-purple-600 to-pink-600 pointer-events-none"
          />

          {/* Glow Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-600/20 to-pink-600/20 blur-xl" />
          </div>

          <div className="relative p-6">
            {/* Category Badge */}
            <div className="flex items-center justify-between mb-4">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${categoryStyle.bg} ${categoryStyle.text} shadow-lg ${categoryStyle.glow}`}
              >
                <Tag className="w-3.5 h-3.5" />
                {getCategoryLabel(article.category)}
              </motion.span>

              {/* Eye Icon with Animation */}
              <motion.div
                animate={{
                  scale: isHovered ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <Eye className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {article.title}
            </h2>

            {/* Excerpt */}
            <p className="text-muted-foreground mb-5 line-clamp-3 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.date).toLocaleDateString('ar-SA')}</span>
              </div>

              {/* Read More Button */}
              <motion.div
                className="flex items-center gap-2 text-sm font-semibold text-primary"
                animate={{
                  x: isHovered ? -5 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <span>اقرأ المزيد</span>
                <ArrowLeft className="w-4 h-4" />
              </motion.div>
            </div>
          </div>

          {/* Decorative Corner Element */}
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: isHovered ? 1 : 0,
              rotate: isHovered ? 45 : 0
            }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full"
          />
        </div>

        {/* Shadow Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/30 via-purple-600/30 to-pink-600/30 blur-2xl rounded-2xl"
        />
      </Link>
    </motion.div>
  );
};

export default ArticleCard;


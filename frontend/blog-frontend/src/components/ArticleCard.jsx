import { Link } from 'react-router-dom';
import { Calendar, Tag, ArrowLeft, Eye, Clock } from 'lucide-react';
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

  const getCategoryStyle = (category) => {
    const styles = {
      literary: {
        gradient: 'from-purple-500 via-fuchsia-500 to-pink-500',
        glow: 'shadow-purple-500/40',
        hover: 'hover:shadow-purple-500/60',
        border: 'border-purple-500/30'
      },
      intellectual: {
        gradient: 'from-blue-500 via-cyan-500 to-teal-500',
        glow: 'shadow-blue-500/40',
        hover: 'hover:shadow-blue-500/60',
        border: 'border-blue-500/30'
      },
      islamic: {
        gradient: 'from-green-500 via-emerald-500 to-lime-500',
        glow: 'shadow-green-500/40',
        hover: 'hover:shadow-green-500/60',
        border: 'border-green-500/30'
      }
    };
    return styles[category] || {
      gradient: 'from-gray-500 to-gray-600',
      glow: 'shadow-gray-500/40',
      hover: 'hover:shadow-gray-500/60',
      border: 'border-gray-500/30'
    };
  };

  const categoryStyle = getCategoryStyle(article.category);

  // Calculate reading time (assuming 200 words per minute)
  const calculateReadingTime = () => {
    const wordsPerMinute = 200;
    const wordCount = article.content ? article.content.split(' ').length : 300;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative h-full"
    >
      <Link to={`/article/${article.id}`} className="block h-full">
        {/* Main Card Container */}
        <div className="relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden transition-all duration-500 border-2 border-gray-100 dark:border-gray-700 hover:border-transparent h-full flex flex-col">
          
          {/* Animated Gradient Border */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className={`absolute inset-0 bg-gradient-to-r ${categoryStyle.gradient} -z-10 rounded-3xl blur-sm`}
          />

          {/* Gradient Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.08 : 0 }}
            className={`absolute inset-0 bg-gradient-to-br ${categoryStyle.gradient} pointer-events-none transition-opacity duration-500`}
          />

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
            <motion.div
              animate={{
                scale: isHovered ? [1, 1.2, 1] : 1,
                rotate: isHovered ? [0, 180, 360] : 0
              }}
              transition={{ duration: 2 }}
              className={`w-full h-full bg-gradient-to-br ${categoryStyle.gradient} rounded-full blur-2xl`}
            />
          </div>

          <div className="relative p-7 flex flex-col flex-1">
            {/* Header Section */}
            <div className="flex items-start justify-between mb-5">
              {/* Category Badge */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold bg-gradient-to-r ${categoryStyle.gradient} text-white shadow-lg ${categoryStyle.glow} ${categoryStyle.hover} transition-all duration-300`}>
                  <Tag className="w-4 h-4" />
                  {getCategoryLabel(article.category)}
                </span>
              </motion.div>

              {/* View Icon */}
              <motion.div
                animate={{
                  scale: isHovered ? [1, 1.3, 1] : 1,
                  rotate: isHovered ? [0, 15, 0] : 0
                }}
                transition={{ duration: 0.5 }}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-primary/10 transition-all"
              >
                <Eye className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.div>
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 line-clamp-2 leading-tight group-hover:text-primary transition-all duration-300">
              {article.title}
            </h2>

            {/* Excerpt */}
            <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed text-base flex-1">
              {article.excerpt}
            </p>

            {/* Footer */}
            <div className="space-y-4 mt-auto">
              {/* Date and Reading Time */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(article.date).toLocaleDateString('ar-SA', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{calculateReadingTime()} دقائق</span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>

              {/* Read More Button */}
              <motion.div
                className="flex items-center justify-between"
                animate={{
                  x: isHovered ? -8 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <span className={`text-base font-bold bg-gradient-to-r ${categoryStyle.gradient} bg-clip-text text-transparent`}>
                  اقرأ المزيد
                </span>
                <motion.div
                  animate={{
                    x: isHovered ? -5 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className={`p-2 rounded-full bg-gradient-to-r ${categoryStyle.gradient} text-white shadow-lg ${categoryStyle.glow}`}
                >
                  <ArrowLeft className="w-4 h-4" />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Decorative Corner */}
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: isHovered ? 1 : 0,
              rotate: isHovered ? 45 : 0
            }}
            transition={{ duration: 0.4 }}
            className={`absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr ${categoryStyle.gradient} opacity-20 rounded-tr-full`}
          />

          {/* Bottom Accent Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${categoryStyle.gradient} origin-left`}
          />
        </div>

        {/* External Glow Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 -z-20 bg-gradient-to-r ${categoryStyle.gradient} blur-3xl opacity-30 rounded-3xl scale-105`}
        />
      </Link>
    </motion.div>
  );
};

export default ArticleCard;

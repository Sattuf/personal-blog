import { Link } from 'react-router-dom';
import { Calendar, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const ArticleCard = ({ article }) => {
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
      literary: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      intellectual: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      islamic: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all"
    >
      <Link to={`/article/${article.id}`}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(article.category)}`}>
              <Tag className="w-3 h-3 inline mr-1" />
              {getCategoryLabel(article.category)}
            </span>
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-3 hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h2>
          
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {article.excerpt}
          </p>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{new Date(article.date).toLocaleDateString('ar-SA')}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ArticleCard;


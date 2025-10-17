import { motion } from 'framer-motion';

const ArticleCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 p-6"
    >
      {/* Category Badge Skeleton */}
      <div className="flex items-center justify-between mb-4">
        <div className="loading-skeleton w-20 h-6 rounded-full" />
        <div className="loading-skeleton w-5 h-5 rounded" />
      </div>

      {/* Title Skeleton */}
      <div className="space-y-2 mb-3">
        <div className="loading-skeleton w-full h-6 rounded" />
        <div className="loading-skeleton w-3/4 h-6 rounded" />
      </div>

      {/* Excerpt Skeleton */}
      <div className="space-y-2 mb-5">
        <div className="loading-skeleton w-full h-4 rounded" />
        <div className="loading-skeleton w-full h-4 rounded" />
        <div className="loading-skeleton w-2/3 h-4 rounded" />
      </div>

      {/* Footer Skeleton */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="loading-skeleton w-24 h-4 rounded" />
        <div className="loading-skeleton w-20 h-4 rounded" />
      </div>
    </motion.div>
  );
};

const ArticleGridSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(count)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ArticleCardSkeleton />
        </motion.div>
      ))}
    </div>
  );
};

export { ArticleCardSkeleton, ArticleGridSkeleton };



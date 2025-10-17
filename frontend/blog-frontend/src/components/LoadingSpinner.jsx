import { motion } from 'framer-motion';
import { BookOpen, Sparkles } from 'lucide-react';

const LoadingSpinner = ({ message = "جاري التحميل..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
      {/* Main Spinner */}
      <div className="relative">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full"
        />
        
        {/* Inner Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full"
        />
        
        {/* Center Icon */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <BookOpen className="w-8 h-8 text-primary" />
        </motion.div>
        
        {/* Floating Sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
            className="absolute"
            style={{
              top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 40}px`,
              left: `${20 + Math.cos(i * 60 * Math.PI / 180) * 40}px`,
            }}
          >
            <Sparkles className="w-3 h-3 text-yellow-500" />
          </motion.div>
        ))}
      </div>

      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center space-y-2"
      >
        <motion.h3
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-xl font-semibold text-foreground"
        >
          {message}
        </motion.h3>
        
        {/* Loading Dots */}
        <div className="flex justify-center space-x-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="w-2 h-2 bg-primary rounded-full"
            />
          ))}
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
      >
        <motion.div
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="h-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-full"
        />
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;



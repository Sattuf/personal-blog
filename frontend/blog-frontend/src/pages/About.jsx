import { BookOpen, Lightbulb, Heart, Sparkles, Quote, Target, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const categories = [
    {
      icon: BookOpen,
      title: 'الأدب',
      description: 'استكشاف عالم الكلمات والجمال اللغوي',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      icon: Lightbulb,
      title: 'الفكر',
      description: 'تأملات في القضايا الفلسفية والثقافية',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: Heart,
      title: 'الإسلام',
      description: 'مقالات في الدين والروحانية والقيم',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
      iconColor: 'text-green-600 dark:text-green-400'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'الهدف',
      description: 'إنشاء مساحة للحوار والتفكير العميق'
    },
    {
      icon: Sparkles,
      title: 'الجودة',
      description: 'محتوى يجمع بين العمق الفكري والأسلوب الأدبي'
    },
    {
      icon: Users,
      title: 'المجتمع',
      description: 'بناء مجتمع من القراء المهتمين بالمعرفة'
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-primary to-purple-600 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-pink-600 to-purple-600 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-full mb-6 border border-primary/20"
            >
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                تعرف علينا
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-gray-900 via-primary to-purple-600 dark:from-white dark:via-primary dark:to-purple-400 bg-clip-text text-transparent">
                من أنا
              </span>
            </motion.h1>
          </motion.div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="flex items-start gap-4 mb-6">
              <Quote className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
                  مرحباً بك في مدونتي الشخصية. هذه المساحة مخصصة للكتابة والتأمل في مختلف جوانب الحياة، من خلال ثلاثة محاور رئيسية:{' '}
                  <span className="font-semibold text-purple-600 dark:text-purple-400">الأدب</span>،{' '}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">الفكر</span>، و{' '}
                  <span className="font-semibold text-green-600 dark:text-green-400">الإسلام</span>.
                </p>

                <p className="text-lg md:text-xl text-foreground leading-relaxed">
                  أؤمن بأن الكتابة هي وسيلة للتعبير عن الذات، وللتواصل مع الآخرين، ولمشاركة الأفكار والتجارب التي قد تكون مفيدة أو ملهمة للقراء.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Categories */}
          <div className="mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-3xl font-bold text-foreground mb-8 text-center"
            >
              محاور المدونة
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative"
                >
                  <div className={`bg-gradient-to-br ${category.bgGradient} rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50`}>
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className="inline-block mb-4"
                    >
                      <category.icon className={`w-14 h-14 ${category.iconColor}`} />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">{category.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {category.description}
                    </p>

                    {/* Gradient Border on Hover */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">قيمنا</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-200/50 dark:border-gray-700/50 hover:border-primary/50 transition-all duration-300"
                >
                  <value.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="bg-gradient-to-r from-primary/5 via-purple-600/5 to-pink-600/5 rounded-3xl shadow-xl p-8 md:p-12 border border-primary/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 bg-gradient-to-r from-primary to-purple-600 rounded-full" />
              <h2 className="text-3xl font-bold text-foreground">رسالة المدونة</h2>
            </div>
            <p className="text-lg md:text-xl text-foreground leading-relaxed">
              هدفي من هذه المدونة هو إنشاء مساحة للحوار والتفكير، حيث يمكن للقراء أن يجدوا محتوى يثري عقولهم ويلامس قلوبهم. أسعى لتقديم مقالات تجمع بين{' '}
              <span className="font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                العمق الفكري والأسلوب الأدبي الجميل
              </span>
              ، مع الحفاظ على القيم الإسلامية الأصيلة.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;


import { BookOpen, Lightbulb, Heart, Sparkles, Quote, Target, Users, Mail, MessageCircle, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const categories = [
    {
      icon: BookOpen,
      title: 'الأدب',
      description: 'استكشاف عالم الكلمات والجمال اللغوي من خلال الشعر والنثر والقصص',
      gradient: 'from-purple-500 via-fuchsia-500 to-pink-500',
      bgGradient: 'from-purple-50 via-fuchsia-50 to-pink-50 dark:from-purple-900/20 dark:via-fuchsia-900/20 dark:to-pink-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400',
      emoji: '📚'
    },
    {
      icon: Lightbulb,
      title: 'الفكر',
      description: 'تأملات عميقة في القضايا الفلسفية والثقافية والاجتماعية المعاصرة',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      bgGradient: 'from-blue-50 via-cyan-50 to-teal-50 dark:from-blue-900/20 dark:via-cyan-900/20 dark:to-teal-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
      emoji: '💭'
    },
    {
      icon: Heart,
      title: 'الإسلام',
      description: 'مقالات في الدين والروحانية والقيم الإسلامية الأصيلة',
      gradient: 'from-green-500 via-emerald-500 to-lime-500',
      bgGradient: 'from-green-50 via-emerald-50 to-lime-50 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-lime-900/20',
      iconColor: 'text-green-600 dark:text-green-400',
      emoji: '🕌'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'الهدف',
      description: 'إنشاء مساحة للحوار والتفكير العميق والتأمل في قضايا الحياة',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Sparkles,
      title: 'الجودة',
      description: 'محتوى يجمع بين العمق الفكري والأسلوب الأدبي الراقي',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      icon: Users,
      title: 'المجتمع',
      description: 'بناء مجتمع من القراء المهتمين بالمعرفة والثقافة الأصيلة',
      gradient: 'from-pink-500 to-rose-500'
    }
  ];

  const stats = [
    { number: '100+', label: 'مقالة', icon: BookOpen, gradient: 'from-purple-500 to-pink-500' },
    { number: '10K+', label: 'قارئ', icon: Users, gradient: 'from-blue-500 to-cyan-500' },
    { number: '50+', label: 'موضوع', icon: Lightbulb, gradient: 'from-green-500 to-emerald-500' },
    { number: '5*', label: 'تقييم', icon: Award, gradient: 'from-amber-500 to-orange-500' },
  ];

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
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-primary via-secondary to-accent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, -120, 0],
            opacity: [0.03, 0.07, 0.03]
          }}
          transition={{ duration: 30, repeat: Infinity }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-accent via-secondary to-primary rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-full mb-8 border-2 border-primary/20 backdrop-blur-sm"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-primary" />
              </motion.div>
              <span className="text-base font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                تعرف علينا أكثر
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-6xl md:text-8xl font-black mb-8"
            >
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                من نحن
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              مساحة إبداعية للتعبير والتأمل في عالم الأدب والفكر والإسلام
            </motion.p>
          </motion.div>

          {/* Introduction Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 md:p-16 mb-16 border-2 border-white dark:border-gray-700 relative overflow-hidden"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex items-start gap-6 mb-8">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="flex-shrink-0"
                >
                  <Quote className="w-16 h-16 text-primary" />
                </motion.div>
              <div>
                  <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-8">
                  مرحباً بك في مدونتي الشخصية. هذه المساحة مخصصة للكتابة والتأمل في مختلف جوانب الحياة، من خلال ثلاثة محاور رئيسية:{' '}
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      className="font-bold text-purple-600 dark:text-purple-400 cursor-pointer inline-block"
                    >
                      الأدب
                    </motion.span>
                    ،{' '}
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      className="font-bold text-blue-600 dark:text-blue-400 cursor-pointer inline-block"
                    >
                      الفكر
                    </motion.span>
                    ، و{' '}
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      className="font-bold text-green-600 dark:text-green-400 cursor-pointer inline-block"
                    >
                      الإسلام
                    </motion.span>
                    .
                  </p>

                  <p className="text-xl md:text-2xl text-foreground leading-relaxed">
                  أؤمن بأن الكتابة هي وسيلة للتعبير عن الذات، وللتواصل مع الآخرين، ولمشاركة الأفكار والتجارب التي قد تكون مفيدة أو ملهمة للقراء.
                </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-3xl p-8 text-center shadow-xl border-2 border-white dark:border-gray-700"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} mb-4`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className={`text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Categories Section */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-center mb-12"
            >
              <h2 className="text-5xl font-black text-foreground mb-4">محاور المدونة</h2>
              <p className="text-xl text-muted-foreground">استكشف المواضيع التي نغطيها</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.15 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative"
                >
                  <div className={`bg-gradient-to-br ${category.bgGradient} backdrop-blur-sm rounded-3xl p-10 text-center shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 border-white dark:border-gray-700 relative overflow-hidden h-full`}>
                    {/* Gradient Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.1 }}
                      className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`}
                    />

                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.15 }}
                      transition={{ duration: 0.7 }}
                      className="relative inline-block mb-6"
                    >
                      <div className={`p-6 rounded-3xl bg-gradient-to-br ${category.gradient} shadow-xl`}>
                        <category.icon className="w-12 h-12 text-white" />
                      </div>
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-2 -right-2 text-4xl"
                      >
                        {category.emoji}
                      </motion.div>
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-3xl font-black text-foreground mb-4">{category.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg relative z-10">
                      {category.description}
                    </p>

                    {/* Bottom Accent */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.5 }}
                      className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${category.gradient} origin-left`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="mb-20"
          >
            <h2 className="text-5xl font-black text-foreground mb-12 text-center">قيمنا الأساسية</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 text-center border-2 border-white dark:border-gray-700 hover:border-primary/50 transition-all duration-300 shadow-xl group"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${value.gradient} mb-6 shadow-lg group-hover:shadow-xl`}
                  >
                    <value.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-black text-foreground mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 }}
            className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-sm rounded-3xl shadow-2xl p-10 md:p-16 border-2 border-primary/30 mb-16 relative overflow-hidden"
          >
            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary to-secondary rounded-full opacity-10"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-secondary to-accent rounded-full opacity-10"
            />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-2 w-20 bg-gradient-to-r from-primary via-secondary to-accent rounded-full" />
                <h2 className="text-4xl font-black text-foreground">رسالة المدونة</h2>
            </div>
              <p className="text-xl md:text-2xl text-foreground leading-loose">
              هدفي من هذه المدونة هو إنشاء مساحة للحوار والتفكير، حيث يمكن للقراء أن يجدوا محتوى يثري عقولهم ويلامس قلوبهم. أسعى لتقديم مقالات تجمع بين{' '}
                <span className="font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                العمق الفكري والأسلوب الأدبي الجميل
              </span>
                ، مع الحفاظ على{' '}
                <span className="font-black text-green-600 dark:text-green-400">
                  القيم الإسلامية الأصيلة
                </span>
                .
              </p>
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9 }}
            className="text-center bg-gradient-to-br from-primary via-secondary to-accent rounded-3xl p-12 shadow-2xl relative overflow-hidden"
          >
            {/* Animated Background */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />

            <div className="relative z-10">
              <h3 className="text-4xl font-black text-white mb-6">لنتواصل معاً</h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                هل لديك أفكار أو اقتراحات؟ نحن نحب أن نسمع منك!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-8 py-4 bg-white text-primary rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
                >
                  <Mail className="w-6 h-6" />
                  تواصل بالبريد
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all border-2 border-white/30"
                >
                  <MessageCircle className="w-6 h-6" />
                  ابدأ محادثة
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;

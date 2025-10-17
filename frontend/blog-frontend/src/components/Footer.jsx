import { Heart, Github, Twitter, Linkedin, Mail, ArrowUp, BookOpen, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub', color: 'hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-blue-400 hover:text-white' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-600 hover:text-white' },
    { icon: Mail, href: '#', label: 'Email', color: 'hover:bg-red-500 hover:text-white' },
  ];

  const quickLinks = [
    { label: 'الرئيسية', path: '/' },
    { label: 'مقالات أدبية', path: '/category/literary' },
    { label: 'مقالات فكرية', path: '/category/intellectual' },
    { label: 'مقالات إسلامية', path: '/category/islamic' },
    { label: 'من أنا', path: '/about' },
    { label: 'اتصل بنا', path: '#' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-black mt-24 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 90, 0],
            opacity: [0.05, 0.10, 0.05]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -top-1/2 -right-1/4 w-1/2 h-full bg-gradient-to-br from-primary via-secondary to-accent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, -90, 0],
            opacity: [0.05, 0.10, 0.05]
          }}
          transition={{ duration: 30, repeat: Infinity }}
          className="absolute -bottom-1/2 -left-1/4 w-1/2 h-full bg-gradient-to-tr from-accent via-secondary to-primary rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        {/* Top Section with Logo and Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur-lg opacity-50"></div>
                <BookOpen className="w-12 h-12 text-primary relative z-10" />
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.8, 0.4],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-1 -right-1 z-20"
                >
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                </motion.div>
              </motion.div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                مدونة شخصية
              </h3>
            </div>
            <p className="text-muted-foreground text-base leading-relaxed mb-6 max-w-md">
              مساحة للإبداع والتأمل في عالم الأدب والفكر والإسلام. نسعى لتقديم محتوى عربي أصيل يثري العقل ويغذي الروح.
            </p>
            <div className="flex items-center gap-3">
              <div className="h-1 w-20 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"></div>
              <span className="text-sm text-muted-foreground">نكتب بشغف ونشارك بحب</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
              روابط سريعة
            </h4>
            <div className="flex flex-col gap-3">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-all text-sm"
                  >
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="w-2 h-2 rounded-full bg-primary/30 group-hover:bg-primary transition-all"
                    />
                    <span>{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-secondary to-accent rounded-full"></div>
              تواصل معنا
            </h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  className={`relative p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-lg text-muted-foreground ${social.color} transition-all duration-300 group`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 relative z-10" />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 blur-md transition-opacity -z-10"></div>
                </motion.a>
              ))}
            </div>

            {/* Newsletter Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <p className="text-sm text-muted-foreground mb-3">اشترك في نشرتنا البريدية</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="flex-1 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  اشترك
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Divider */}
        <div className="relative mb-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center">
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="px-6 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-950 dark:to-black"
            >
              <div className="p-3 rounded-full bg-gradient-to-r from-red-500 via-pink-500 to-red-500">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-2 flex-wrap text-muted-foreground text-sm">
            <span>صُنع بـ</span>
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500 inline" />
            </motion.div>
            <span>في عام {new Date().getFullYear()}</span>
          </div>
          
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground flex-wrap">
            <span>جميع الحقوق محفوظة © مدونة شخصية</span>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">سياسة الخصوصية</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">شروط الاستخدام</a>
          </div>

          <p className="text-xs text-muted-foreground">
            تم التطوير بأحدث التقنيات لتجربة مستخدم مثالية
          </p>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 left-8 p-4 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-2xl shadow-2xl hover:shadow-primary/50 transition-all duration-300 z-50 group"
            aria-label="العودة للأعلى"
          >
            <ArrowUp className="w-6 h-6 group-hover:animate-bounce" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-accent blur-lg opacity-50 group-hover:opacity-75 -z-10"></div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bottom Gradient Line */}
      <div className="h-2 bg-gradient-to-r from-primary via-secondary to-accent"></div>
    </footer>
  );
};

export default Footer;

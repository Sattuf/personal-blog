import { Heart, Github, Twitter, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-gray-900 dark:hover:text-white' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-600' },
    { icon: Mail, href: '#', label: 'Email', color: 'hover:text-red-500' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 mt-20 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -top-1/2 -right-1/4 w-1/2 h-full bg-gradient-to-br from-primary to-purple-600 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -bottom-1/2 -left-1/4 w-1/2 h-full bg-gradient-to-tr from-pink-600 to-purple-600 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-right"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              مدونة شخصية
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              مساحة للإبداع والتأمل في عالم الأدب والفكر والإسلام
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center"
          >
            <h4 className="text-lg font-semibold text-foreground mb-4">روابط سريعة</h4>
            <div className="flex flex-col gap-2">
              {['الرئيسية', 'المقالات', 'من أنا', 'اتصل بنا'].map((link, index) => (
                <motion.a
                  key={link}
                  href="#"
                  whileHover={{ x: 5 }}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h4 className="text-lg font-semibold text-foreground mb-4">تواصل معنا</h4>
            <div className="flex justify-center md:justify-start gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg text-muted-foreground ${social.color} transition-all duration-300 hover:shadow-xl`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="px-4 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950"
            >
              <Heart className="w-6 h-6 text-red-500 fill-red-500" />
            </motion.div>
          </div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-2 flex-wrap">
            <span>صُنع بـ</span>
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500 inline" />
            </motion.span>
            <span>في {new Date().getFullYear()}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            جميع الحقوق محفوظة © مدونة شخصية
          </p>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-8 left-8 p-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300 z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </footer>
  );
};

export default Footer;


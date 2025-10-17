import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X, Sparkles, ChevronDown, Sun, Moon, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDarkMode(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  const toggleDarkMode = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const navItems = [
    { path: '/', label: 'الرئيسية', icon: '🏠' },
    { 
      label: 'المقالات', 
      icon: '📚',
      hasDropdown: true,
      dropdownItems: [
        { path: '/category/literary', label: 'مقالات أدبية', icon: '📖', description: 'روايات وقصص وشعر', gradient: 'from-purple-500 to-pink-500' },
        { path: '/category/intellectual', label: 'مقالات فكرية', icon: '💭', description: 'تأملات وفلسفة', gradient: 'from-blue-500 to-cyan-500' },
        { path: '/category/islamic', label: 'مقالات إسلامية', icon: '🕌', description: 'دين وروحانيات', gradient: 'from-green-500 to-emerald-500' },
        { path: '/articles/all', label: 'جميع المقالات', icon: '📚', description: 'مكتبة شاملة', gradient: 'from-indigo-500 to-purple-500' }
      ]
    },
    { path: '/about', label: 'من أنا', icon: '👤' },
  ];

  return (
    <motion.header 
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-xl border-b border-gray-200/50 dark:border-gray-800/50' 
          : 'bg-white dark:bg-gray-900 shadow-md'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.15 }}
              transition={{ duration: 0.7, type: "spring" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <BookOpen className="w-10 h-10 text-primary relative z-10" />
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
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                مدونة شخصية
              </span>
              <span className="text-xs text-muted-foreground hidden md:block">أدب · فكر · إسلام</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-foreground hover:text-primary transition-all font-semibold hover:bg-primary/5"
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    </motion.button>
                    
                    {/* Enhanced Dropdown Menu */}
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 15, scale: 0.95 }}
                          transition={{ duration: 0.3, type: "spring" }}
                          className="absolute top-full left-0 mt-3 w-96 bg-white/95 dark:bg-gray-800/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden z-50"
                        >
                          {/* Gradient Header */}
                          <div className="bg-gradient-to-r from-primary via-secondary to-accent p-4">
                            <h3 className="text-white font-bold text-lg flex items-center gap-2">
                              <span>{item.icon}</span>
                              <span>تصفح {item.label}</span>
                            </h3>
                          </div>

                          <div className="p-3">
                            {item.dropdownItems.map((dropdownItem, index) => (
                              <motion.div
                                key={dropdownItem.path}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.07 }}
                              >
                                <Link
                                  to={dropdownItem.path}
                                  className="group/item flex items-start gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 transition-all duration-300 mb-2"
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${dropdownItem.gradient} flex items-center justify-center text-white text-xl shadow-lg group-hover/item:scale-110 transition-transform`}>
                                    {dropdownItem.icon}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-bold text-foreground group-hover/item:text-primary transition-colors flex items-center gap-2">
                                      {dropdownItem.label}
                                      <motion.span
                                        initial={{ opacity: 0, x: -5 }}
                                        whileHover={{ opacity: 1, x: 0 }}
                                        className="text-primary"
                                      >
                                        ←
                                      </motion.span>
                                    </div>
                                    <div className="text-sm text-muted-foreground mt-1">
                                      {dropdownItem.description}
                                    </div>
                                  </div>
                                  <motion.div
                                    className="w-2 h-2 bg-primary rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity"
                                    whileHover={{ scale: 1.5 }}
                                  />
                                </Link>
                              </motion.div>
                            ))}
                          </div>

                          {/* Footer Accent */}
                          <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className="relative group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-foreground hover:text-primary transition-all font-semibold hover:bg-primary/5"
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </motion.div>
                    {location.pathname === item.path && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Search and Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            {/* Search Bar */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <input
                type="text"
                placeholder="ابحث عن مقالة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-5 py-2.5 pr-12 bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus:border-primary dark:border-gray-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-300 placeholder:text-muted-foreground"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </motion.div>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="relative p-3 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 group"
              aria-label="تبديل الوضع المظلم"
            >
              <AnimatePresence mode="wait">
                {isDarkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="w-5 h-5 text-yellow-500 group-hover:text-yellow-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="w-5 h-5 text-blue-600 group-hover:text-blue-500" />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-foreground p-2.5 rounded-xl hover:bg-primary/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-7 h-7" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-7 h-7" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-3 pt-6 pb-4">
                {/* Mobile Search */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="px-2 mb-2"
                >
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="ابحث عن مقالة..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-5 py-3.5 pr-12 bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                    />
                    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  </div>
                </motion.div>

                {/* Mobile Theme Toggle */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="px-2 mb-3"
                >
                  <button
                    onClick={toggleDarkMode}
                    className="w-full flex items-center justify-center gap-3 px-5 py-3.5 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl hover:from-primary/20 hover:to-secondary/20 transition-all font-semibold"
                  >
                    {isDarkMode ? (
                      <>
                        <Sun className="w-5 h-5 text-yellow-500" />
                        <span>الوضع الفاتح</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-5 h-5 text-blue-600" />
                        <span>الوضع المظلم</span>
                      </>
                    )}
                  </button>
                </motion.div>

                {/* Mobile Menu Items */}
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="px-2"
                  >
                    {item.hasDropdown ? (
                      <div>
                        <div className="text-sm font-bold text-muted-foreground mb-3 px-3 flex items-center gap-2">
                          <span>{item.icon}</span>
                          <span>{item.label}</span>
                        </div>
                        <div className="space-y-2 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-2xl">
                          {item.dropdownItems.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.path}
                              to={dropdownItem.path}
                              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all ${
                                location.pathname === dropdownItem.path
                                  ? `bg-gradient-to-r ${dropdownItem.gradient} text-white shadow-lg`
                                  : 'text-foreground hover:bg-white dark:hover:bg-gray-700'
                              }`}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <span className="text-xl">{dropdownItem.icon}</span>
                              <div className="flex-1">
                                <div className="font-semibold">{dropdownItem.label}</div>
                                <div className={`text-xs mt-0.5 ${location.pathname === dropdownItem.path ? 'text-white/80' : 'text-muted-foreground'}`}>
                                  {dropdownItem.description}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all ${
                          location.pathname === item.path
                            ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                            : 'text-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span>{item.label}</span>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;

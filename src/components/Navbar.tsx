import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Menu, X, Mail, Github, Linkedin, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navKeys = ['home', 'about', 'experience', 'education', 'skills', 'certifications', 'projects', 'awards', 'contact'];

const Navbar = () => {
  const { t, toggleLanguage, isRTL, language } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navKeys.map(key => document.getElementById(key)).filter(Boolean);
      const scrollPos = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navKeys[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = id === 'home' ? 0 : el.offsetTop - 60;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed w-full top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-navbar shadow-lg py-0'
            : 'bg-transparent py-1'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-6 py-2.5 flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => scrollTo('home')}
            className="group relative text-xl font-bold md:text-2xl text-foreground font-display"
          >
            <span className="relative z-10">{t('hero.name')}</span>
            <motion.span
              className="absolute -bottom-1 left-0 h-0.5 bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="flex items-center bg-[hsl(var(--glass-card))] backdrop-blur-md rounded-full px-2 py-1.5 border border-[hsl(var(--glass-border))]">
              {navKeys.map(key => (
                <button
                  key={key}
                  onClick={() => scrollTo(key)}
                  className={`relative px-3 py-1.5 text-sm rounded-full transition-all duration-300 ${
                    activeSection === key
                      ? 'text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {activeSection === key && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-0 bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{t(`nav.${key}`)}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 ms-3">
              {/* Social icons */}
              <a
                href="mailto:mr.sheikholeslami84@gmail.com"
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
              >
                <Mail size={16} />
              </a>
              <a
                href="https://github.com/MohammadrezaSheikholeslami84"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
              >
                <Github size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/mohammadrezasheikholeslami/"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
              >
                <Linkedin size={16} />
              </a>

              {/* Divider */}
              <div className="w-px h-5 bg-[hsl(var(--glass-border))] mx-1" />

              {/* Theme toggle */}
              <motion.button
                onClick={toggleTheme}
                className="relative p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200 overflow-hidden"
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isDark ? (
                    <motion.div
                      key="sun"
                      initial={{ y: -20, opacity: 0, rotate: -90 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ y: 20, opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun size={16} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ y: -20, opacity: 0, rotate: 90 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ y: 20, opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Language toggle */}
              <button
                onClick={toggleLanguage}
                className="px-3 py-1.5 rounded-full border border-primary/30 text-xs font-medium text-primary hover:bg-primary/10 transition-all duration-200 font-persian"
              >
                {t('langSwitch')}
              </button>
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 rounded-full border border-primary/30 text-sm text-primary hover:bg-primary/10 transition-colors font-persian"
            >
              {t('langSwitch')}
            </button>
            <button onClick={() => setMobileOpen(true)} className="p-2 text-foreground">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 bg-background/95 backdrop-blur-xl z-[100] flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button onClick={() => setMobileOpen(false)} className="absolute top-6 right-6 text-foreground">
              <X size={28} />
            </button>
            <motion.ul
              className="space-y-5 text-center"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
              }}
            >
              {navKeys.map(key => (
                <motion.li
                  key={key}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <button
                    onClick={() => scrollTo(key)}
                    className={`text-xl font-semibold transition-colors ${
                      activeSection === key ? 'text-primary' : 'text-foreground hover:text-primary'
                    }`}
                  >
                    {t(`nav.${key}`)}
                  </button>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div
              className="flex gap-5 mt-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <a href="mailto:mr.sheikholeslami84@gmail.com" className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"><Mail size={22} /></a>
              <a href="https://github.com/MohammadrezaSheikholeslami84" target="_blank" rel="noreferrer" className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"><Github size={22} /></a>
              <a href="https://www.linkedin.com/in/mohammadrezasheikholeslami/" target="_blank" rel="noreferrer" className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"><Linkedin size={22} /></a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

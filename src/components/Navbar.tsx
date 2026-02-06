import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X, Mail, Github, Linkedin } from 'lucide-react';

const navKeys = ['home', 'about', 'experience', 'education', 'skills', 'certifications', 'projects', 'awards', 'contact'];

const Navbar = () => {
  const { t, toggleLanguage, isRTL, language } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
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
      <nav className="glass-navbar fixed w-full top-0 z-50 shadow-xl">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <button onClick={() => scrollTo('home')} className="text-xl font-bold md:text-2xl text-foreground font-display">
            {t('hero.name')}
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            <ul className="flex gap-6 text-sm">
              {navKeys.map(key => (
                <li key={key}>
                  <button
                    onClick={() => scrollTo(key)}
                    className={`nav-link-underline ${activeSection === key ? 'active text-foreground' : 'text-muted-foreground'}`}
                  >
                    {t(`nav.${key}`)}
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              <a href="mailto:mr.sheikholeslami84@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail size={18} />
              </a>
              <a href="https://github.com/MohammadrezaSheikholeslami84" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github size={18} />
              </a>
              <a href="https://www.linkedin.com/in/mohammadrezasheikholeslami/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin size={18} />
              </a>
              <button
                onClick={toggleLanguage}
                className="px-3 py-1 rounded-full border border-primary/30 text-sm text-primary hover:bg-primary/10 transition-colors font-persian"
              >
                {t('langSwitch')}
              </button>
            </div>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 rounded-full border border-primary/30 text-sm text-primary hover:bg-primary/10 transition-colors font-persian"
            >
              {t('langSwitch')}
            </button>
            <button onClick={() => setMobileOpen(true)} className="text-foreground">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-background/95 backdrop-blur-xl z-[100] flex flex-col items-center justify-center transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : isRTL ? '-translate-x-full' : 'translate-x-full'
        }`}
      >
        <button onClick={() => setMobileOpen(false)} className="absolute top-6 right-6 text-foreground">
          <X size={28} />
        </button>
        <ul className="space-y-6 text-center">
          {navKeys.map(key => (
            <li key={key}>
              <button
                onClick={() => scrollTo(key)}
                className="text-xl font-semibold text-foreground hover:text-primary transition-colors"
              >
                {t(`nav.${key}`)}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex gap-6 mt-8">
          <a href="mailto:mr.sheikholeslami84@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors"><Mail size={22} /></a>
          <a href="https://github.com/MohammadrezaSheikholeslami84" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><Github size={22} /></a>
          <a href="https://www.linkedin.com/in/mohammadrezasheikholeslami/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><Linkedin size={22} /></a>
        </div>
      </div>
    </>
  );
};

export default Navbar;

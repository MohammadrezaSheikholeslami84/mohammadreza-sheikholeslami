import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import profileImg from '@/assets/profile.jpg';

const HeroSection = () => {
  const { t, isRTL, language } = useLanguage();
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const textRef = useRef('');

  useEffect(() => {
    setTypedText('');
    setShowCursor(true);

    if (language === 'fa') {
      textRef.current = t('hero.greeting');
    } else {
      textRef.current = `${t('hero.greeting')} ${t('hero.name')}`;
    }

    let i = 0;
    const fullText = textRef.current;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < fullText.length) {
          setTypedText(fullText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setTimeout(() => setShowCursor(false), 2000);
        }
      }, 60);
      return () => clearInterval(interval);
    }, 600);

    return () => clearTimeout(timer);
  }, [t, language]);

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) {
      window.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' });
    }
  };

  const renderTypedText = () => {
    if (language === 'fa') {
      return (
        <span className="text-primary" style={{ textShadow: '0 0 30px rgba(56, 120, 223, 0.4)' }}>
          {typedText}
        </span>
      );
    }

    const greeting = t('hero.greeting');
    const greetingPart = typedText.slice(0, greeting.length + 1);
    const namePart = typedText.slice(greeting.length + 1);

    return (
      <>
        <span style={{ textShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
          {greetingPart}
        </span>
        {namePart && (
          <span className="text-primary" style={{ textShadow: '0 0 30px rgba(56, 120, 223, 0.4)' }}>
            {namePart}
          </span>
        )}
      </>
    );
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative z-10 pt-20">
      <div className="flex flex-col items-center gap-6 max-w-3xl">
        {/* Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/60 via-primary/20 to-primary/60 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src={profileImg}
              alt="Mohammadreza Sheikholeslami"
              className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full border-[3px] border-primary/40 shadow-2xl object-cover"
            />
          </div>
        </motion.div>

        {/* Typing text */}
        <motion.h1
          className="text-[1.6rem] sm:text-[2rem] md:text-[3rem] font-bold font-display leading-tight min-h-[2.5em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {renderTypedText()}
          {showCursor && (
            <span className="inline-block border-r-[3px] border-primary ml-0.5" style={{ animation: 'blinkCaret 0.75s step-end infinite' }}>
              &nbsp;
            </span>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-[560px] mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-4 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.button
            onClick={scrollToAbout}
            className="hero-btn group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="flex items-center gap-2">
              {t('hero.cta')}
              <svg
                className={`w-4 h-4 transition-transform duration-300 group-hover:translate-y-1 ${isRTL ? 'rotate-0' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </span>
          </motion.button>

          <motion.a
            href="/Mohammadreza-Sheikholeslami-cv.pdf"
            download="Mohammadreza-Sheikholeslami-CV.pdf"
            className="px-8 py-3.5 rounded-full font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 inline-flex items-center gap-2"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Download size={18} />
            {t('hero.downloadCv')}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

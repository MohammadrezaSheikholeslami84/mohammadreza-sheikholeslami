import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection = () => {
  const { t, isRTL } = useLanguage();
  const [typedName, setTypedName] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [greetingVisible, setGreetingVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const nameRef = useRef(t('hero.name'));

  useEffect(() => {
    // Reset animation on language change
    setTypedName('');
    setGreetingVisible(false);
    setSubtitleVisible(false);
    setButtonVisible(false);
    nameRef.current = t('hero.name');

    const greetTimer = setTimeout(() => setGreetingVisible(true), 300);
    const typeTimer = setTimeout(() => {
      let i = 0;
      const name = nameRef.current;
      const interval = setInterval(() => {
        if (i < name.length) {
          setTypedName(name.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setTimeout(() => setShowCursor(false), 2000);
        }
      }, 80);
      return () => clearInterval(interval);
    }, 1000);

    const subTimer = setTimeout(() => setSubtitleVisible(true), 1600);
    const btnTimer = setTimeout(() => setButtonVisible(true), 2200);

    return () => {
      clearTimeout(greetTimer);
      clearTimeout(typeTimer);
      clearTimeout(subTimer);
      clearTimeout(btnTimer);
    };
  }, [t]);

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) {
      window.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="h-screen flex flex-col justify-center items-center text-center px-4 relative z-10">
      <div>
        <h1 className="text-[2rem] sm:text-[2.4rem] md:text-[3.5rem] font-bold font-display leading-tight">
          <span
            className={`transition-all duration-700 ${greetingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ textShadow: '0 4px 15px rgba(0,0,0,0.5)' }}
          >
            {t('hero.greeting')}{' '}
          </span>
          <span className="text-primary" style={{ textShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
            {typedName}
            {showCursor && (
              <span className="inline-block border-r-[3px] border-primary ml-0.5" style={{ animation: 'blinkCaret 0.75s step-end infinite' }}>
                &nbsp;
              </span>
            )}
          </span>
        </h1>

        <p
          className={`mt-4 text-base sm:text-lg md:text-xl text-muted-foreground max-w-[600px] mx-auto transition-all duration-700 delay-300 ${
            subtitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {t('hero.subtitle')}
        </p>

        <div className={`mt-10 transition-all duration-700 ${buttonVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-80'}`}>
          <button onClick={scrollToAbout} className="hero-btn">
            {t('hero.cta')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import profileImg from '@/assets/profile.jpg';

const HeroSection = () => {
  const { t, isRTL, language } = useLanguage();
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [photoVisible, setPhotoVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const textRef = useRef('');

  useEffect(() => {
    setTypedText('');
    setPhotoVisible(false);
    setSubtitleVisible(false);
    setButtonVisible(false);
    setShowCursor(true);

    // For Persian, type the full greeting. For English, type greeting + name.
    if (language === 'fa') {
      textRef.current = t('hero.greeting');
    } else {
      textRef.current = `${t('hero.greeting')} ${t('hero.name')}`;
    }

    const photoTimer = setTimeout(() => setPhotoVisible(true), 200);
    const typeTimer = setTimeout(() => {
      let i = 0;
      const fullText = textRef.current;
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

    const subTimer = setTimeout(() => setSubtitleVisible(true), 1400);
    const btnTimer = setTimeout(() => setButtonVisible(true), 2000);

    return () => {
      clearTimeout(photoTimer);
      clearTimeout(typeTimer);
      clearTimeout(subTimer);
      clearTimeout(btnTimer);
    };
  }, [t, language]);

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) {
      window.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' });
    }
  };

  // For English, split typed text into greeting part and name part
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
        <div
          className={`transition-all duration-1000 ease-out ${
            photoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/60 via-primary/20 to-primary/60 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src={profileImg}
              alt="Mohammadreza Sheikholeslami"
              className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full border-[3px] border-primary/40 shadow-2xl object-cover"
            />
          </div>
        </div>

        {/* Name / Typing */}
        <h1 className="text-[1.6rem] sm:text-[2rem] md:text-[3rem] font-bold font-display leading-tight min-h-[2.5em]">
          {renderTypedText()}
          {showCursor && (
            <span className="inline-block border-r-[3px] border-primary ml-0.5" style={{ animation: 'blinkCaret 0.75s step-end infinite' }}>
              &nbsp;
            </span>
          )}
        </h1>

        {/* Subtitle */}
        <p
          className={`text-sm sm:text-base md:text-lg text-muted-foreground max-w-[560px] mx-auto transition-all duration-700 leading-relaxed ${
            subtitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {t('hero.subtitle')}
        </p>

        {/* CTA Button */}
        <div className={`mt-4 transition-all duration-700 ${buttonVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <button onClick={scrollToAbout} className="hero-btn group">
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
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

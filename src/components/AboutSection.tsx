import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { User } from 'lucide-react';

const AboutSection = () => {
  const { t, isRTL } = useLanguage();
  const ref = useScrollReveal();

  const renderText = (text: string) => {
    // Parse custom markup: <university>...</university> and <hl>...</hl>
    const parts = text.split(/(<university>.*?<\/university>|<hl>.*?<\/hl>)/g);
    return parts.map((part, i) => {
      if (part.startsWith('<university>')) {
        const content = part.replace(/<\/?university>/g, '');
        return <span key={i} className="university-text font-semibold">{content}</span>;
      }
      if (part.startsWith('<hl>')) {
        const content = part.replace(/<\/?hl>/g, '');
        return <span key={i} className="font-medium text-highlight">{content}</span>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <section id="about" ref={ref} className="glass-section p-6 md:p-10 stagger-in">
      <h2 className="section-title mb-6">
        <User className={`${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        {t('about.title')}
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <img
          src="https://avatars.githubusercontent.com/u/166950228?v=4"
          alt="Mohammadreza Sheikholeslami Profile"
          loading="lazy"
          className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-primary shadow-xl object-cover flex-shrink-0"
        />
        <p className="text-base md:text-lg leading-relaxed max-w-2xl text-muted-foreground">
          {renderText(t('about.text'))}
          {' '}
          <a
            href="https://quera.org/qcv/assessment_report/8dvlbzo"
            target="_blank"
            rel="noreferrer"
            className="link-highlight hover:underline"
          >
            {t('about.queraLink')}
          </a>
        </p>
      </div>
    </section>
  );
};

export default AboutSection;

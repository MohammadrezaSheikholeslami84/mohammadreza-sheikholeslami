import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Trophy } from 'lucide-react';

const AwardsSection = () => {
  const { t, isRTL } = useLanguage();
  const ref = useScrollReveal();
  const items = t('awards.items') as unknown as Array<{
    name: string; place: string; date: string; description: string;
  }>;

  return (
    <section id="awards" ref={ref} className="glass-section p-6 md:p-10 stagger-in">
      <h2 className="section-title mb-6">
        <Trophy className={`${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        {t('awards.title')}
      </h2>
      <div className="relative">
        {Array.isArray(items) && items.map((item, idx) => (
          <div
            key={idx}
            className={`relative ${isRTL ? 'pr-[30px]' : 'pl-[30px]'} ${idx < items.length - 1 ? 'pb-8' : ''}`}
          >
            <div className={`timeline-dot ${isRTL ? 'right-0' : 'left-0'}`} />
            {idx < items.length - 1 && (
              <div className={`timeline-line ${isRTL ? 'right-[6px]' : 'left-[6px]'}`} />
            )}
            <h3 className="text-xl md:text-2xl font-bold text-foreground font-display">{item.name}</h3>
            <p className="text-base md:text-lg mb-3 text-muted-foreground">
              <span className="university-text">{item.place}</span> | {item.date}
            </p>
            <p className="leading-relaxed text-base text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AwardsSection;

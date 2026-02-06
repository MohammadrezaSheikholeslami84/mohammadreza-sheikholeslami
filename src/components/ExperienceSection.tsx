import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Briefcase } from 'lucide-react';

const ExperienceSection = () => {
  const { t, isRTL } = useLanguage();
  const ref = useScrollReveal();
  const items = t('experience.items') as unknown as Array<{
    role: string; place: string; location: string; date: string; instructor: string; details: string[];
  }>;

  return (
    <section id="experience" ref={ref} className="glass-section p-6 md:p-10 stagger-in">
      <h2 className="section-title mb-6">
        <Briefcase className={`${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        {t('experience.title')}
      </h2>
      <div className="relative">
        {Array.isArray(items) && items.map((item, idx) => (
          <div
            key={idx}
            className={`relative ${isRTL ? 'pr-[30px]' : 'pl-[30px]'} ${idx < items.length - 1 ? 'pb-8' : ''}`}
          >
            {/* Timeline dot */}
            <div className={`timeline-dot ${isRTL ? 'right-0' : 'left-0'}`} />
            {/* Timeline line */}
            {idx < items.length - 1 && (
              <div className={`timeline-line ${isRTL ? 'right-[6px]' : 'left-[6px]'}`} />
            )}
            <h3 className="text-xl md:text-2xl font-bold text-foreground font-display">{item.role}</h3>
            <p className="text-base md:text-lg mb-2 text-muted-foreground">
              <span className="university-text">{item.place}</span>, {item.location} | {item.date}
            </p>
            <p className="text-base md:text-lg mb-3 text-muted-foreground">{item.instructor}</p>
            <ul className={`list-disc space-y-1.5 text-base text-muted-foreground ${isRTL ? 'mr-4' : 'ml-4'}`}>
              {item.details.map((detail, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: detail }} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;

import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { GraduationCap } from 'lucide-react';

const EducationSection = () => {
  const { t, isRTL } = useLanguage();
  const ref = useScrollReveal();
  const items = t('education.items') as unknown as Array<{
    degree: string; place: string; location: string; date: string; gpa: string;
  }>;

  return (
    <section id="education" ref={ref} className="glass-section p-6 md:p-10 stagger-in">
      <h2 className="section-title mb-6">
        <GraduationCap className={`${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        {t('education.title')}
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
            <h3 className="text-xl md:text-2xl font-bold text-foreground font-display">{item.degree}</h3>
            <p className="text-base md:text-lg mb-2 text-muted-foreground">
              <span className="university-text">{item.place}</span>, {item.location} | {item.date}
            </p>
            <p className="text-base md:text-lg text-muted-foreground">{item.gpa}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;

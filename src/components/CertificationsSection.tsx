import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Award, ExternalLink } from 'lucide-react';

const CertificationsSection = () => {
  const { t, isRTL } = useLanguage();
  const ref = useScrollReveal();
  const items = t('certifications.items') as unknown as Array<{
    name: string; issuer: string; date: string; details: string[]; tags: string[]; link: string;
  }>;

  return (
    <section id="certifications" ref={ref} className="glass-section p-6 md:p-10 stagger-in">
      <h2 className="section-title mb-6">
        <Award className={`${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        {t('certifications.title')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.isArray(items) && items.map((item, idx) => (
          <div key={idx} className="glass-card p-6 flex flex-col stagger-in">
            <h3 className="text-xl font-bold mb-2 text-primary font-display">{item.name}</h3>
            <p className="text-sm mb-3 text-muted-foreground">
              <span className="university-text">{item.issuer}</span> | {item.date}
            </p>
            <ul className={`list-disc space-y-2 flex-grow text-muted-foreground ${isRTL ? 'mr-4' : 'ml-4'}`}>
              {item.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mt-4">
              {item.tags.map((tag, i) => (
                <span key={i} className="skill-tag">{tag}</span>
              ))}
            </div>
            <div className="mt-4">
              <a href={item.link} target="_blank" rel="noreferrer" className="link-highlight inline-flex items-center gap-1">
                {t('viewCredential')} <ExternalLink size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CertificationsSection;

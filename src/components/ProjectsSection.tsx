import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Lightbulb, ArrowRight } from 'lucide-react';

const ProjectsSection = () => {
  const { t, isRTL } = useLanguage();
  const ref = useScrollReveal();
  const items = t('projects.items') as unknown as Array<{
    name: string; description: string; tags: string[]; link: string;
  }>;

  return (
    <section id="projects" ref={ref} className="glass-section p-6 md:p-10 stagger-in">
      <h2 className="section-title mb-6">
        <Lightbulb className={`${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        {t('projects.title')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.isArray(items) && items.map((item, idx) => (
          <div key={idx} className="glass-card p-6 flex flex-col stagger-in">
            <h3 className="text-xl font-bold mb-2 text-primary font-display">{item.name}</h3>
            <p className="mb-4 flex-grow text-muted-foreground leading-relaxed">{item.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {item.tags.map((tag, i) => (
                <span key={i} className="skill-tag">{tag}</span>
              ))}
            </div>
            <div className="mt-auto pt-4">
              <a href={item.link} target="_blank" rel="noreferrer" className="link-highlight inline-flex items-center gap-1">
                {t('viewProject')} <ArrowRight size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;

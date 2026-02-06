import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Code, Brain, Cog, Database, Wrench, Globe } from 'lucide-react';

const iconMap: Record<string, typeof Code> = {
  'laptop-code': Code,
  brain: Brain,
  cogs: Cog,
  database: Database,
  tools: Wrench,
  globe: Globe,
};

const SkillsSection = () => {
  const { t, isRTL } = useLanguage();
  const ref = useScrollReveal();
  const categories = t('skills.categories') as unknown as Array<{
    name: string;
    icon: string;
    items: (string | { name: string; icon: string })[];
  }>;

  return (
    <section id="skills" ref={ref} className="glass-section p-6 md:p-10 stagger-in">
      <h2 className="section-title mb-6">
        <Code className={`${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        {t('skills.title')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(categories) && categories.map((cat, idx) => {
          const IconComponent = iconMap[cat.icon] || Code;
          return (
            <div key={idx} className="glass-card p-6 stagger-in">
              <h3 className="text-xl font-bold mb-3 text-primary font-display flex items-center gap-2">
                <IconComponent size={20} />
                {cat.name}
              </h3>
              <ul className={`space-y-2 text-muted-foreground ${typeof cat.items[0] === 'string' ? `list-disc ${isRTL ? 'mr-4' : 'ml-4'}` : ''}`}>
                {cat.items.map((item, i) => (
                  <li key={i} className={typeof item === 'object' ? 'flex items-center gap-2' : ''}>
                    {typeof item === 'string' ? item : item.name}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SkillsSection;

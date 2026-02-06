import { useLanguage } from '@/contexts/LanguageContext';
import { Code, Brain, Cog, Database, Wrench, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const categories = t('skills.categories') as unknown as Array<{
    name: string;
    icon: string;
    items: (string | { name: string; icon: string })[];
  }>;

  return (
    <motion.section
      id="skills"
      className="glass-section p-6 md:p-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.h2
        className="section-title mb-6"
        initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Code className={`${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        {t('skills.title')}
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
        }}
      >
        {Array.isArray(categories) && categories.map((cat, idx) => {
          const IconComponent = iconMap[cat.icon] || Code;
          return (
            <motion.div
              key={idx}
              className="glass-card p-6"
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
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
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
};

export default SkillsSection;

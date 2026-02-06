import { useLanguage } from '@/contexts/LanguageContext';
import { Lightbulb, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectsSection = () => {
  const { t, isRTL } = useLanguage();
  const items = t('projects.items') as unknown as Array<{
    name: string; description: string; tags: string[]; link: string;
  }>;

  return (
    <motion.section
      id="projects"
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
        <Lightbulb className={`${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        {t('projects.title')}
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
        }}
      >
        {Array.isArray(items) && items.map((item, idx) => (
          <motion.div
            key={idx}
            className="glass-card p-6 flex flex-col"
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
          >
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
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default ProjectsSection;

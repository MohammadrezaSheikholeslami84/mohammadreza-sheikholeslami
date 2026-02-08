import { useLanguage } from '@/contexts/LanguageContext';
import { Lightbulb, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const ProjectsSection = () => {
  const { t, isRTL } = useLanguage();
  const items = t('projects.items') as unknown as Array<{
    name: string; description: string; tags: string[]; link: string;
  }>;

  return (
    <motion.section
      id="projects"
      className="glass-section p-6 md:p-10"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.h2
        className="section-title mb-8"
        initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <Lightbulb className={`${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        {t('projects.title')}
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
        }}
      >
        {Array.isArray(items) && items.map((item, idx) => (
          <motion.div
            key={idx}
            className="glass-card p-6 flex flex-col group"
            variants={cardVariants}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{
              y: -8,
              scale: 1.02,
              transition: { duration: 0.3, ease: 'easeOut' },
            }}
          >
            <h3 className="text-xl font-bold mb-2 text-primary font-display">{item.name}</h3>
            <p className="mb-4 flex-grow text-muted-foreground leading-relaxed">{item.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {item.tags.map((tag, i) => (
                <motion.span
                  key={i}
                  className="skill-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.03 }}
                  whileHover={{ scale: 1.1, y: -2, transition: { duration: 0.2 } }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
            <div className="mt-auto pt-4">
              <motion.a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="link-highlight inline-flex items-center gap-1"
                whileHover={{ x: isRTL ? -4 : 4 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {t('viewProject')}
                <motion.span
                  className="inline-flex"
                  initial={{ x: 0 }}
                  whileHover={{ x: isRTL ? -3 : 3 }}
                >
                  <ArrowRight size={14} />
                </motion.span>
              </motion.a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default ProjectsSection;

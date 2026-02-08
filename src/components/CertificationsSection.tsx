import { useLanguage } from '@/contexts/LanguageContext';
import { Award, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const CertificationsSection = () => {
  const { t, isRTL } = useLanguage();
  const items = t('certifications.items') as unknown as Array<{
    name: string; issuer: string; date: string; details: string[]; tags: string[]; link: string;
  }>;

  return (
    <motion.section
      id="certifications"
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
        <Award className={`${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        {t('certifications.title')}
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
            <p className="text-sm mb-3 text-muted-foreground">
              <span className="university-text">{item.issuer}</span> | {item.date}
            </p>
            <ul className={`list-disc space-y-2 flex-grow text-muted-foreground ${isRTL ? 'mr-4' : 'ml-4'}`}>
              {item.details.map((detail, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: isRTL ? 15 : -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                >
                  {detail}
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mt-4">
              {item.tags.map((tag, i) => (
                <motion.span
                  key={i}
                  className="skill-tag"
                  whileHover={{ scale: 1.1, y: -2, transition: { duration: 0.2 } }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
            <div className="mt-4">
              <motion.a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="link-highlight inline-flex items-center gap-1"
                whileHover={{ x: isRTL ? -4 : 4 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {t('viewCredential')} <ExternalLink size={12} />
              </motion.a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default CertificationsSection;

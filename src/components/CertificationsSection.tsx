import { useLanguage } from '@/contexts/LanguageContext';
import { Award, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const CertificationsSection = () => {
  const { t, isRTL } = useLanguage();
  const items = t('certifications.items') as unknown as Array<{
    name: string; issuer: string; date: string; details: string[]; tags: string[]; link: string;
  }>;

  return (
    <motion.section
      id="certifications"
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
        <Award className={`${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        {t('certifications.title')}
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
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default CertificationsSection;

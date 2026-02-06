import { useLanguage } from '@/contexts/LanguageContext';
import { Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const ExperienceSection = () => {
  const { t, isRTL } = useLanguage();
  const items = t('experience.items') as unknown as Array<{
    role: string; place: string; location: string; date: string; instructor: string; details: string[];
  }>;

  return (
    <motion.section
      id="experience"
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
        <Briefcase className={`${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        {t('experience.title')}
      </motion.h2>
      <div className="relative">
        {Array.isArray(items) && items.map((item, idx) => (
          <motion.div
            key={idx}
            className={`relative ${isRTL ? 'pr-[30px]' : 'pl-[30px]'} ${idx < items.length - 1 ? 'pb-8' : ''}`}
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 + idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={`timeline-dot ${isRTL ? 'right-0' : 'left-0'}`} />
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
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default ExperienceSection;

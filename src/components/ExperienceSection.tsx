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
        <Briefcase className={`${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        {t('experience.title')}
      </motion.h2>
      <div className="relative">
        {Array.isArray(items) && items.map((item, idx) => (
          <motion.div
            key={idx}
            className={`relative ${isRTL ? 'pr-[30px]' : 'pl-[30px]'} ${idx < items.length - 1 ? 'pb-8' : ''}`}
            initial={{ opacity: 0, x: isRTL ? 40 : -40, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 + idx * 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className={`timeline-dot ${isRTL ? 'right-0' : 'left-0'}`}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + idx * 0.18, type: 'spring', stiffness: 300 }}
            />
            {idx < items.length - 1 && (
              <motion.div
                className={`timeline-line ${isRTL ? 'right-[6px]' : 'left-[6px]'}`}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + idx * 0.18 }}
                style={{ transformOrigin: 'top' }}
              />
            )}
            <h3 className="text-xl md:text-2xl font-bold text-foreground font-display">{item.role}</h3>
            <p className="text-base md:text-lg mb-2 text-muted-foreground">
              <span className="university-text">{item.place}</span>, {item.location} | {item.date}
            </p>
            <p className="text-base md:text-lg mb-3 text-muted-foreground">{item.instructor}</p>
            <ul className={`list-disc space-y-1.5 text-base text-muted-foreground ${isRTL ? 'mr-4' : 'ml-4'}`}>
              {item.details.map((detail, i) => (
                <motion.li
                  key={i}
                  dangerouslySetInnerHTML={{ __html: detail }}
                  initial={{ opacity: 0, x: isRTL ? 15 : -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + idx * 0.18 + i * 0.06 }}
                />
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default ExperienceSection;

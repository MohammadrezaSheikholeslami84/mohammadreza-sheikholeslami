import { useLanguage } from '@/contexts/LanguageContext';
import { GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const EducationSection = () => {
  const { t, isRTL } = useLanguage();
  const items = t('education.items') as unknown as Array<{
    degree: string; place: string; location: string; date: string; gpa: string;
  }>;

  return (
    <motion.section
      id="education"
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
        <GraduationCap className={`${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        {t('education.title')}
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
            <h3 className="text-xl md:text-2xl font-bold text-foreground font-display">{item.degree}</h3>
            <p className="text-base md:text-lg mb-2 text-muted-foreground">
              <span className="university-text">{item.place}</span>, {item.location} | {item.date}
            </p>
            <p className="text-base md:text-lg text-muted-foreground">{item.gpa}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default EducationSection;

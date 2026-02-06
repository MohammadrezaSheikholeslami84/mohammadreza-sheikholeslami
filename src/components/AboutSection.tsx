import { useLanguage } from '@/contexts/LanguageContext';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';
import profileImg from '@/assets/profile.jpg';

const AboutSection = () => {
  const { t, isRTL } = useLanguage();

  const renderText = (text: string) => {
    const parts = text.split(/(<university>.*?<\/university>|<hl>.*?<\/hl>)/g);
    return parts.map((part, i) => {
      if (part.startsWith('<university>')) {
        const content = part.replace(/<\/?university>/g, '');
        return <span key={i} className="university-text font-semibold">{content}</span>;
      }
      if (part.startsWith('<hl>')) {
        const content = part.replace(/<\/?hl>/g, '');
        return <span key={i} className="font-medium text-highlight">{content}</span>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <motion.section
      id="about"
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
        <User className={`${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        {t('about.title')}
      </motion.h2>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <motion.div
          className="relative group flex-shrink-0"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/40 to-primary/10 rounded-full blur-md opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
          <img
            src={profileImg}
            alt="Mohammadreza Sheikholeslami Profile"
            loading="lazy"
            className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-[3px] border-primary/30 shadow-2xl object-cover"
          />
        </motion.div>
        <motion.p
          className="text-base md:text-lg leading-relaxed max-w-2xl text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {renderText(t('about.text'))}
          {' '}
          <a
            href="https://quera.org/qcv/assessment_report/8dvlbzo"
            target="_blank"
            rel="noreferrer"
            className="link-highlight hover:underline"
          >
            {t('about.queraLink')}
          </a>
        </motion.p>
      </div>
    </motion.section>
  );
};

export default AboutSection;

import { useLanguage } from '@/contexts/LanguageContext';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <motion.footer
      className="text-foreground py-6 mt-16 relative z-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm md:text-base">
          &copy; {year} {t('hero.name')}. {t('footer.rights')}
        </p>
        <p className="text-xs mt-1 text-muted-foreground flex items-center justify-center gap-1">
          {t('footer.builtWith')}{' '}
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Heart size={12} className="text-destructive" />
          </motion.span>{' '}
          {t('footer.andCoffee')}
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;

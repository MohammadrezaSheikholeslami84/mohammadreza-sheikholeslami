import { useLanguage } from '@/contexts/LanguageContext';
import { Heart } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="text-foreground py-6 mt-16 relative z-10">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm md:text-base">
          &copy; {year} {t('hero.name')}. {t('footer.rights')}
        </p>
        <p className="text-xs mt-1 text-muted-foreground flex items-center justify-center gap-1">
          {t('footer.builtWith')} <Heart size={12} className="text-red-500" /> {t('footer.andCoffee')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

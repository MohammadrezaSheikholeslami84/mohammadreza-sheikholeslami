import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type Language = 'en' | 'fa';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  isRTL: boolean;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};

// Import translations
import { translations } from '@/data/translations';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'en' ? 'fa' : 'en');
  }, []);

  const isRTL = language === 'fa';

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, isRTL, t }}>
      <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'font-persian' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

import { useLanguage } from '@/contexts/LanguageContext';
import { Bot } from 'lucide-react';
import { motion } from 'framer-motion';

const ChatbotSection = () => {
  const { t, isRTL } = useLanguage();

  return (
    <motion.section
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
        <Bot className={`${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        {t('chatbot.title')}
      </motion.h2>
      <motion.div
        className="w-full h-[500px] md:h-[800px] border border-[hsl(var(--glass-border))] rounded-lg overflow-hidden shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <iframe
          src="https://financial-llm.streamlit.app/?embed=true&embed_options=show_toolbar"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          title="Financial LLM Chatbot"
        />
      </motion.div>
    </motion.section>
  );
};

export default ChatbotSection;

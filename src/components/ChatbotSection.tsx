import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Bot } from 'lucide-react';

const ChatbotSection = () => {
  const { t, isRTL } = useLanguage();
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="glass-section p-6 md:p-10 stagger-in">
      <h2 className="section-title mb-6">
        <Bot className={`${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        {t('chatbot.title')}
      </h2>
      <div className="w-full h-[500px] md:h-[800px] border border-[hsl(var(--glass-border))] rounded-lg overflow-hidden shadow-lg">
        <iframe
          src="https://financial-llm.streamlit.app/?embed=true&embed_options=show_toolbar"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          title="Financial LLM Chatbot"
        />
      </div>
    </section>
  );
};

export default ChatbotSection;

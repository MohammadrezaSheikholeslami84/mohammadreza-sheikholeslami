import { useState, FormEvent } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactSection = () => {
  const { t, isRTL } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/xdkzqqok', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <motion.section
      id="contact"
      className="glass-section p-6 md:p-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.h2
        className="section-title mb-6 mx-auto flex justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Send className={`${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        {t('contact.title')}
      </motion.h2>
      <motion.p
        className="text-center max-w-2xl mx-auto mb-8 text-muted-foreground"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {t('contact.subtitle')}
      </motion.p>
      <motion.form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto flex flex-col gap-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="flex flex-col md:flex-row gap-6">
          <input type="text" name="name" placeholder={t('contact.namePlaceholder')} className="form-field w-full" required />
          <input type="email" name="email" placeholder={t('contact.emailPlaceholder')} className="form-field w-full" required />
        </div>
        <textarea name="message" rows={5} placeholder={t('contact.messagePlaceholder')} className="form-field" required />
        <motion.button
          type="submit"
          disabled={status === 'sending'}
          className="hero-btn disabled:opacity-50 disabled:cursor-not-allowed text-center"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {t('contact.send')}
        </motion.button>
        {status === 'sent' && (
          <p className="text-center text-green-400 font-medium">✓ Message sent successfully!</p>
        )}
        {status === 'error' && (
          <p className="text-center text-destructive font-medium">Something went wrong. Please try again.</p>
        )}
      </motion.form>
    </motion.section>
  );
};

export default ContactSection;

import { useState, FormEvent } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Send } from 'lucide-react';

const ContactSection = () => {
  const { t, isRTL } = useLanguage();
  const ref = useScrollReveal();
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
    <section id="contact" ref={ref} className="glass-section p-6 md:p-10 stagger-in">
      <h2 className="section-title mb-6 mx-auto flex justify-center">
        <Send className={`${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        {t('contact.title')}
      </h2>
      <p className="text-center max-w-2xl mx-auto mb-8 text-muted-foreground">
        {t('contact.subtitle')}
      </p>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-6">
          <input type="text" name="name" placeholder={t('contact.namePlaceholder')} className="form-field w-full" required />
          <input type="email" name="email" placeholder={t('contact.emailPlaceholder')} className="form-field w-full" required />
        </div>
        <textarea name="message" rows={5} placeholder={t('contact.messagePlaceholder')} className="form-field" required />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="hero-btn disabled:opacity-50 disabled:cursor-not-allowed text-center"
        >
          {t('contact.send')}
        </button>
        {status === 'sent' && (
          <p className="text-center text-green-400 font-medium">✓ Message sent successfully!</p>
        )}
        {status === 'error' && (
          <p className="text-center text-destructive font-medium">Something went wrong. Please try again.</p>
        )}
      </form>
    </section>
  );
};

export default ContactSection;

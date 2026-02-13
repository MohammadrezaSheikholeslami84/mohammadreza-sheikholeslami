import { useState, useRef, useEffect, useCallback } from 'react';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useTheme } from '@/contexts/ThemeContext';
import Navbar from '@/components/Navbar';
import WaveBackground from '@/components/WaveBackground';
import { Send, Bot, User, Loader2, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const CHATBOT_API_URL = import.meta.env.VITE_CHATBOT_API_URL || 'http://127.0.0.1:8000';

type MessageRole = 'user' | 'assistant';

interface ChatMessage {
  role: MessageRole;
  content: string;
  type?: 'text' | 'image';
  caption?: string | null;
}

const STORAGE_KEY = 'chatbot_messages';

function loadMessages(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveMessages(msgs: ChatMessage[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
}

const ChatUI = () => {
  const { t, isRTL } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>(loadMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: text, type: 'text' };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);

    // Build history: last 5 text messages before current
    const history = updated
      .filter(m => m.type !== 'image')
      .slice(-6, -1) // last 5 excluding current
      .map(m => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch(`${CHATBOT_API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });

      if (!res.ok) throw new Error(`خطا: ${res.status}`);

      const data = await res.json();

      const assistantMsg: ChatMessage = {
        role: 'assistant',
        content: data.type === 'image' ? 'نمودار دریافت شد' : (data.answer || ''),
        type: data.type || 'text',
        caption: data.caption || null,
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (e: any) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: `خطا: ${e.message || 'مشکلی پیش آمد'}`, type: 'text' },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }, [input, loading, messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] max-w-4xl mx-auto px-4 pt-24 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Bot size={22} className="text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">{t('chatbot.title')}</h1>
            <p className="text-xs text-muted-foreground">{t('chatbot.subtitle')}</p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="text-xs text-muted-foreground hover:text-destructive transition-colors px-3 py-1.5 rounded-lg hover:bg-destructive/10"
        >
          {t('chatbot.clear')}
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-3 p-4 rounded-2xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-card))] backdrop-blur-md"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-3">
            <Bot size={48} className="opacity-30" />
            <p className="text-sm">{t('chatbot.empty')}</p>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                  msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-tr-sm'
                    : 'bg-muted text-foreground rounded-tl-sm'
                }`}>
                  {msg.type === 'image' ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/50 border border-[hsl(var(--glass-border))]">
                        <span className="text-lg">📊</span>
                        <span className="font-medium">{msg.content}</span>
                      </div>
                      {msg.caption && (
                        <p className="text-xs text-muted-foreground">{msg.caption}</p>
                      )}
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                <Bot size={14} />
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-2.5 text-sm text-muted-foreground flex items-center gap-2">
                <Loader2 size={14} className="animate-spin" />
                در حال پردازش…
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="mt-3 flex gap-2 items-end">
        <textarea
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('chatbot.placeholder')}
          rows={1}
          className="flex-1 resize-none rounded-xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-card))] backdrop-blur-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          disabled={loading}
        />
        <motion.button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          whileTap={{ scale: 0.9 }}
          className="h-11 w-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 transition-opacity shrink-0"
        >
          <Send size={18} className={isRTL ? 'rotate-180' : ''} />
        </motion.button>
      </div>
    </div>
  );
};

const Chatbot = () => (
  <ThemeProvider>
    <LanguageProvider>
      <WaveBackground />
      <div className="relative z-[2]">
        <Navbar />
        <ChatUI />
      </div>
    </LanguageProvider>
  </ThemeProvider>
);

export default Chatbot;

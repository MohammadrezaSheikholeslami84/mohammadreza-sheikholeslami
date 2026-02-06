import { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollButtons = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed right-5 bottom-5 flex flex-col gap-2.5 z-50"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-11 h-11 rounded-full glass-navbar border border-[hsl(var(--glass-border))] flex items-center justify-center text-foreground hover:bg-primary transition-all duration-300"
            aria-label="Scroll to top"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp size={18} />
          </motion.button>
          <motion.button
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            className="w-11 h-11 rounded-full glass-navbar border border-[hsl(var(--glass-border))] flex items-center justify-center text-foreground hover:bg-primary transition-all duration-300"
            aria-label="Scroll to bottom"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowDown size={18} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollButtons;

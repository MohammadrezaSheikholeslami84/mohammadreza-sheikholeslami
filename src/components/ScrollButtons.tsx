import { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

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
    <div
      className={`fixed right-5 bottom-5 flex flex-col gap-2.5 z-50 transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-11 h-11 rounded-full glass-navbar border border-[hsl(var(--glass-border))] flex items-center justify-center text-foreground hover:bg-primary hover:scale-110 transition-all duration-300"
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} />
      </button>
      <button
        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
        className="w-11 h-11 rounded-full glass-navbar border border-[hsl(var(--glass-border))] flex items-center justify-center text-foreground hover:bg-primary hover:scale-110 transition-all duration-300"
        aria-label="Scroll to bottom"
      >
        <ArrowDown size={18} />
      </button>
    </div>
  );
};

export default ScrollButtons;

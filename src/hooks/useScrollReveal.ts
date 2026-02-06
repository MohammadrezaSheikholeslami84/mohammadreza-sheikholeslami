import { useEffect, useRef } from 'react';

export const useScrollReveal = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe the ref element and all stagger-in children
    const el = ref.current;
    if (el) {
      if (el.classList.contains('stagger-in')) observer.observe(el);
      el.querySelectorAll('.stagger-in').forEach((child) => observer.observe(child));
    }

    return () => observer.disconnect();
  }, []);

  return ref;
};

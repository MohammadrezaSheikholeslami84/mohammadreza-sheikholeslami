import { motion, type Variants } from 'framer-motion';
import { ReactNode } from 'react';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1 },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0 },
};

export const variantMap = {
  'fade-up': fadeInUp,
  'fade-left': fadeInLeft,
  'fade-right': fadeInRight,
  'scale-in': scaleIn,
  'stagger-container': staggerContainer,
  'stagger-item': staggerItem,
} as const;

type VariantType = keyof typeof variantMap;

interface MotionSectionProps {
  children: ReactNode;
  variant?: VariantType;
  className?: string;
  id?: string;
  delay?: number;
  as?: 'section' | 'div' | 'ul';
}

const MotionSection = ({
  children,
  variant = 'fade-up',
  className = '',
  id,
  delay = 0,
  as = 'section',
}: MotionSectionProps) => {
  const Component = motion[as];
  
  return (
    <Component
      id={id}
      className={className}
      variants={variantMap[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
};

interface MotionItemProps {
  children: ReactNode;
  className?: string;
  index?: number;
}

export const MotionItem = ({ children, className = '', index = 0 }: MotionItemProps) => (
  <motion.div
    className={className}
    variants={variantMap['stagger-item']}
    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export const MotionCard = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <motion.div
    className={className}
    variants={variantMap['stagger-item']}
    whileHover={{ y: -6, transition: { duration: 0.3 } }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export default MotionSection;

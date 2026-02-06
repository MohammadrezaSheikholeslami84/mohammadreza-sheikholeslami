import { useLanguage } from '@/contexts/LanguageContext';
import {
  Code, Brain, Cog, Database, Wrench, Globe,
  Terminal, Coffee, FileCode2, DollarSign, CandlestickChart,
  BrainCircuit, Network, MessageSquareText, Bot, TrendingUp, ScanSearch, BarChart3,
  Cpu, Table2, Palette, Languages, Link, LineChart,
  Server, HardDrive, GitBranch, GitMerge, Github, Container,
  BookOpen, PenTool,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const categoryIconMap: Record<string, LucideIcon> = {
  'laptop-code': Code,
  brain: Brain,
  cogs: Cog,
  database: Database,
  tools: Wrench,
  globe: Globe,
};

const skillIconMap: Record<string, LucideIcon> = {
  terminal: Terminal,
  coffee: Coffee,
  'file-code-2': FileCode2,
  'dollar-sign': DollarSign,
  'candlestick-chart': CandlestickChart,
  'brain-circuit': BrainCircuit,
  network: Network,
  'message-square-text': MessageSquareText,
  bot: Bot,
  'trending-up': TrendingUp,
  'scan-search': ScanSearch,
  'bar-chart-3': BarChart3,
  cog: Cog,
  cpu: Cpu,
  'table-2': Table2,
  palette: Palette,
  languages: Languages,
  link: Link,
  'line-chart': LineChart,
  database: Database,
  server: Server,
  'hard-drive': HardDrive,
  'git-branch': GitBranch,
  'git-merge': GitMerge,
  github: Github,
  container: Container,
  'book-open': BookOpen,
  'pen-tool': PenTool,
};

const SkillsSection = () => {
  const { t, isRTL } = useLanguage();
  const categories = t('skills.categories') as unknown as Array<{
    name: string;
    icon: string;
    items: { name: string; icon: string }[];
  }>;

  return (
    <motion.section
      id="skills"
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
        <Code className={`${isRTL ? 'ml-3' : 'mr-3'}`} size={28} />
        {t('skills.title')}
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
        }}
      >
        {Array.isArray(categories) && categories.map((cat, idx) => {
          const CategoryIcon = categoryIconMap[cat.icon] || Code;
          return (
            <motion.div
              key={idx}
              className="glass-card p-6"
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              <h3 className="text-xl font-bold mb-4 text-primary font-display flex items-center gap-2">
                <CategoryIcon size={20} />
                {cat.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item, i) => {
                  const itemName = typeof item === 'string' ? item : item.name;
                  const itemIconKey = typeof item === 'object' ? item.icon : null;
                  const ItemIcon = itemIconKey ? skillIconMap[itemIconKey] : null;

                  return (
                    <motion.span
                      key={i}
                      className="skill-tag inline-flex items-center gap-1.5"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                      whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
                    >
                      {ItemIcon && <ItemIcon size={13} className="shrink-0" />}
                      {itemName}
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
};

export default SkillsSection;

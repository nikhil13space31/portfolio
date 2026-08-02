import { motion } from 'framer-motion';

interface SkillCategoryProps {
  title: string;
  items: string[];
  index?: number;
}

export default function SkillCategory({ title, items, index = 0 }: SkillCategoryProps) {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 4 + (index % 2),
        repeat: Infinity,
        ease: 'easeInOut',
        delay: index * 0.3,
      }}
      className="border border-border p-4 bg-background h-full"
    >
      <h4 className="font-mono text-sm text-primary mb-4 border-b border-border/50 pb-2">{title}</h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-muted-foreground flex items-center before:content-['▹'] before:text-primary before:mr-2">
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

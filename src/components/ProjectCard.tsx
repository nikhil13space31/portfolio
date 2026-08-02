import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  tags: string[];
  description: string;
  link?: string;
  icon: React.ReactNode;
  index?: number;
}

export default function ProjectCard({
  title,
  tags,
  description,
  link,
  icon,
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 5 + (index % 3),
        repeat: Infinity,
        ease: 'easeInOut',
        delay: index * 0.5,
      }}
      className="border border-border bg-muted/20 p-6 flex flex-col group hover:border-primary transition-colors h-full"
    >
      <div className="flex justify-between items-start mb-6">
        {icon}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors p-1"
            title="Open Link"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        )}
      </div>

      <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{title}</h4>
      <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">{description}</p>

      <div className="flex flex-wrap gap-3 font-mono text-xs text-primary mb-4">
        {tags.map((tag, i) => (
          <span key={i}>{tag}</span>
        ))}
      </div>

      {link && (
        <div className="pt-2 border-t border-border/50">
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold text-primary hover:underline group-hover:translate-x-1 transition-all"
          >
            Visit Live Platform <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </motion.div>
  );
}

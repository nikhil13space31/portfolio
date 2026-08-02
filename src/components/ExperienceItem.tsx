import React from 'react';
import { Layers } from 'lucide-react';

interface ExperienceItemProps {
  title: string;
  company: string;
  date: string;
  description: string[];
  imagePlaceholder?: string;
  customEmbed?: React.ReactNode;
}

export default function ExperienceItem({
  title,
  company,
  date,
  description,
  imagePlaceholder,
  customEmbed,
}: ExperienceItemProps) {
  return (
    <div className="relative group">
      {/* Timeline dot */}
      <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3 h-3 bg-background border-2 border-primary rounded-full group-hover:bg-primary transition-colors z-10" />

      <div className="mb-2 flex flex-col md:flex-row md:justify-between md:items-baseline">
        <h4 className="text-xl font-bold text-foreground">
          {title} <span className="text-primary">@ {company}</span>
        </h4>
        <span className="text-sm font-mono text-muted-foreground mt-1 md:mt-0">{date}</span>
      </div>

      <ul className="space-y-3 mt-4">
        {description.map((item, i) => (
          <li key={i} className="text-muted-foreground flex items-start">
            <span className="text-primary mr-2 mt-1">▹</span>
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>

      {customEmbed && <div className="mt-6 z-20 relative">{customEmbed}</div>}

      {imagePlaceholder && !customEmbed && (
        <div className="mt-6 border border-border border-dashed p-12 flex flex-col items-center justify-center text-center bg-muted/10 z-20 relative">
          <Layers className="w-8 h-8 text-muted-foreground mb-4" />
          <p className="text-sm font-mono text-muted-foreground max-w-sm">
            {imagePlaceholder}
            <br />
            <br />
            (Please upload the results/photos so I can update this component!)
          </p>
        </div>
      )}
    </div>
  );
}

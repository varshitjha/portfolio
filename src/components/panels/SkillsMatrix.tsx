import React, { useState } from 'react';
import { Code, Terminal, Wrench } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface SkillItem {
  name: string;
  level: string;
  category: 'frontend' | 'languages' | 'tools';
}

export const SkillsMatrix: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'languages' | 'tools'>('all');

  const skills: SkillItem[] = [
    // Frontend
    { name: 'HTML5', level: 'Strong', category: 'frontend' },
    { name: 'CSS3 / Modern Layouts', level: 'Strong', category: 'frontend' },
    { name: 'JavaScript (ES6+)', level: 'Advanced', category: 'frontend' },
    { name: 'React.js', level: 'Intermediate', category: 'frontend' },
    { name: 'TypeScript', level: 'Intermediate', category: 'frontend' },
    { name: 'Tailwind CSS', level: 'Strong', category: 'frontend' },

    // Languages
    { name: 'C Programming', level: 'Strong', category: 'languages' },
    { name: 'Python', level: 'Intermediate', category: 'languages' },
    { name: 'JavaScript', level: 'Advanced', category: 'languages' },
    { name: 'TypeScript', level: 'Intermediate', category: 'languages' },

    // Tools & CS
    { name: 'Git & GitHub', level: 'Strong', category: 'tools' },
    { name: 'VS Code', level: 'Advanced', category: 'tools' },
    { name: 'Vercel Deployment', level: 'Strong', category: 'tools' },
    { name: 'REST APIs & Fetch', level: 'Strong', category: 'tools' },
    { name: 'Data Structures (DSA)', level: 'Learning', category: 'tools' },
  ];

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-light)] px-3 py-1 rounded-full bg-[var(--color-accent-glow)] border border-[var(--color-accent)]/30 inline-block">
          // Skills Matrix
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Technical Stack &amp; Tooling
        </h2>
        <p className="text-base text-[var(--color-text-secondary)]">
          Grouped by category with proficiency labels—no fake percentages.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 text-xs font-mono rounded-full transition-all duration-200 cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-[var(--color-accent)] text-white shadow-md shadow-[var(--color-accent-glow)]'
              : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-accent)]'
          }`}
        >
          All Technologies
        </button>
        <button
          onClick={() => setActiveCategory('frontend')}
          className={`px-4 py-2 text-xs font-mono rounded-full transition-all duration-200 cursor-pointer ${
            activeCategory === 'frontend'
              ? 'bg-[var(--color-accent)] text-white shadow-md shadow-[var(--color-accent-glow)]'
              : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-accent)]'
          }`}
        >
          Frontend &amp; Frameworks
        </button>
        <button
          onClick={() => setActiveCategory('languages')}
          className={`px-4 py-2 text-xs font-mono rounded-full transition-all duration-200 cursor-pointer ${
            activeCategory === 'languages'
              ? 'bg-[var(--color-accent)] text-white shadow-md shadow-[var(--color-accent-glow)]'
              : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-accent)]'
          }`}
        >
          Programming Languages
        </button>
        <button
          onClick={() => setActiveCategory('tools')}
          className={`px-4 py-2 text-xs font-mono rounded-full transition-all duration-200 cursor-pointer ${
            activeCategory === 'tools'
              ? 'bg-[var(--color-accent)] text-white shadow-md shadow-[var(--color-accent-glow)]'
              : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-accent)]'
          }`}
        >
          Tools &amp; CS Fundamentals
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredSkills.map((skill, index) => (
          <Card
            key={`${skill.name}-${index}`}
            className="p-4 flex flex-col justify-between items-start gap-3 hover:border-[var(--color-accent)] transition-all hover:scale-105"
          >
            <div className="flex items-center gap-2">
              {skill.category === 'frontend' && <Code className="w-4 h-4 text-sky-400" />}
              {skill.category === 'languages' && <Terminal className="w-4 h-4 text-amber-400" />}
              {skill.category === 'tools' && <Wrench className="w-4 h-4 text-emerald-400" />}
              <span className="text-sm font-semibold text-[var(--color-text-primary)]">{skill.name}</span>
            </div>

            <Badge variant={skill.level === 'Advanced' ? 'accent' : 'secondary'}>
              {skill.level}
            </Badge>
          </Card>
        ))}
      </div>
    </div>
  );
};

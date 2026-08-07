import React, { useState } from 'react';
import { Code, Terminal, Wrench } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { skillsData, SkillItem } from '@/data/skills';

export const SkillsMatrix: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'languages' | 'tools'>('all');

  const categoriesToDisplay = activeCategory === 'all'
    ? skillsData
    : skillsData.filter((cat) => cat.id === activeCategory);

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-light)] px-3 py-1 rounded-full bg-[var(--color-accent-glow)] border border-[var(--color-accent)]/30 inline-block">
          // Skills Taxonomy
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Technical Stack &amp; Skill Matrix
        </h2>
        <p className="text-base text-[var(--color-text-secondary)]">
          Grouped by engineering category with proficiency labels—no fake percentages.
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

      {/* Grouped Categories */}
      <div className="space-y-8">
        {categoriesToDisplay.map((cat) => (
          <div key={cat.id} className="space-y-4">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
              {cat.id === 'frontend' && <Code className="w-5 h-5 text-sky-400" />}
              {cat.id === 'languages' && <Terminal className="w-5 h-5 text-amber-400" />}
              {cat.id === 'tools' && <Wrench className="w-5 h-5 text-emerald-400" />}
              <span>{cat.categoryName}</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {cat.skills.map((skill: SkillItem) => (
                <Card
                  key={skill.name}
                  className="p-4 flex flex-col justify-between items-start gap-3 hover:border-[var(--color-accent)] transition-all hover:scale-105"
                >
                  <span className="text-sm font-semibold text-[var(--color-text-primary)]">{skill.name}</span>
                  <Badge variant={skill.level === 'Advanced' ? 'accent' : 'secondary'}>
                    {skill.level}
                  </Badge>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

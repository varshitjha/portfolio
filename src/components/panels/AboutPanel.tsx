import React from 'react';
import { GraduationCap, ShieldCheck, Smartphone, BookOpen, UserCheck } from 'lucide-react';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

export const AboutPanel: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-light)] px-3 py-1 rounded-full bg-[var(--color-accent-glow)] border border-[var(--color-accent)]/30 inline-block">
          // About &amp; Background
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Who I Am &amp; How I Work
        </h2>
        <p className="text-base text-[var(--color-text-secondary)]">
          A dedicated CS student building software skills, shipping real projects, and learning continuously.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Bio & Education Timeline */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4 text-base text-[var(--color-text-secondary)] leading-relaxed">
            <p>
              I'm a Computer Science student at <strong className="text-[var(--color-text-primary)]">Parul University</strong> in Gujarat, India. My passion lies in engineering clean, functional, and accessible web applications.
            </p>
            <p>
              I believe in practical application. From core CS concepts in C and Python to modern frontend development with React, TypeScript, and Tailwind CSS, I build and document software openly on GitHub.
            </p>
          </div>

          <div className="space-y-6 pt-4">
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[var(--color-accent-light)]" />
              <span>Education &amp; Journey Timeline</span>
            </h3>

            <div className="relative pl-6 space-y-6 border-l-2 border-[var(--color-border)] ml-2">
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[var(--color-accent)] ring-4 ring-[var(--color-bg)]" />
                <span className="font-mono text-xs text-[var(--color-accent-light)]">2024 – Present</span>
                <h4 className="text-base font-semibold text-[var(--color-text-primary)] mt-1">
                  B.Tech in Computer Science &amp; Engineering
                </h4>
                <p className="text-sm text-[var(--color-text-secondary)]">Parul University, Gujarat, India</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[var(--color-accent)] ring-4 ring-[var(--color-bg)]" />
                <span className="font-mono text-xs text-[var(--color-accent-light)]">2025 – Present</span>
                <h4 className="text-base font-semibold text-[var(--color-text-primary)] mt-1">
                  Full-Stack &amp; Web Development
                </h4>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  React · TypeScript · Tailwind CSS · REST APIs · Data Structures (DSA)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="lg:col-span-5 space-y-4">
          <Card>
            <div className="flex gap-4">
              <div className="p-3 rounded-xl bg-[var(--color-accent-glow)] text-[var(--color-accent-light)] shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-lg">Clean Architecture First</CardTitle>
                <CardDescription className="mt-1">
                  Writing readable, documented code with explicit type safety and maintainable patterns.
                </CardDescription>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex gap-4">
              <div className="p-3 rounded-xl bg-[var(--color-accent-glow)] text-[var(--color-accent-light)] shrink-0">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-lg">Responsive &amp; Accessible</CardTitle>
                <CardDescription className="mt-1">
                  Crafting mobile-first layouts designed for smooth rendering across all screen sizes.
                </CardDescription>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex gap-4">
              <div className="p-3 rounded-xl bg-[var(--color-accent-glow)] text-[var(--color-accent-light)] shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-lg">Continuous Growth</CardTitle>
                <CardDescription className="mt-1">
                  Consistently refining engineering skills across frontend frameworks, APIs, and algorithms.
                </CardDescription>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

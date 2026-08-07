import React from 'react';
import { GraduationCap, Code2, Sparkles, ShieldCheck, Smartphone, BookOpen } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[var(--color-bg-surface)]/50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-light)] px-3 py-1 rounded-full bg-[var(--color-accent-glow)] border border-[var(--color-accent)]/30 inline-block">
            // About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Who I Am
          </h2>
          <p className="text-base text-[var(--color-text-secondary)]">
            A passionate CS student building software skills, shipping real projects, and growing every day.
          </p>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Bio & Education */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4 text-base text-[var(--color-text-secondary)] leading-relaxed">
              <p>
                I'm a Computer Science student at <strong className="text-[var(--color-text-primary)] font-semibold">Parul University</strong> in Gujarat, India. My passion lies in engineering clean, functional, and modern web applications that provide real utility.
              </p>
              <p>
                I believe in learning by building. From fundamental programming concepts in C and Python to modern frontend engineering with React, TypeScript, and Tailwind CSS, I document my progress openly on GitHub.
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-6 pt-4">
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[var(--color-accent-light)]" />
                <span>Education &amp; Journey</span>
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
                    Full-Stack &amp; Web Engineering
                  </h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    React · TypeScript · Tailwind CSS · REST APIs · Data Structures &amp; Algorithms
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Highlights Cards */}
          <div className="lg:col-span-5 space-y-4">
            <Card>
              <div className="flex gap-4">
                <div className="p-3 rounded-xl bg-[var(--color-accent-glow)] text-[var(--color-accent-light)] shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-lg">Clean Code First</CardTitle>
                  <CardDescription className="mt-1">
                    I write structured, maintainable code with clear documentation and proper type safety.
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
                  <CardTitle className="text-lg">Responsive by Default</CardTitle>
                  <CardDescription className="mt-1">
                    Every project is crafted mobile-first to ensure fluid performance across all viewports.
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
                  <CardTitle className="text-lg">Always Learning</CardTitle>
                  <CardDescription className="mt-1">
                    Consistently expanding skills in modern frameworks, state management, and cloud deployment.
                  </CardDescription>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-surface)] py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand */}
        <div className="space-y-1 text-center md:text-left">
          <a href="#home" className="font-mono text-lg font-bold text-[var(--color-text-primary)]">
            &lt;varshitjha /&gt;
          </a>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Building software one project at a time.
          </p>
        </div>

        {/* Center: Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/varshitjha"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-secondary)] hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/varshit-jha-975a6b1a5/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-secondary)] hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:varshitjha17@gmail.com"
            className="text-[var(--color-text-secondary)] hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Right: Copyright & Back to Top */}
        <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
          <span>© {new Date().getFullYear()} Varshit Jha. Built with React &amp; Tailwind.</span>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 text-[var(--color-accent-light)] hover:underline cursor-pointer"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

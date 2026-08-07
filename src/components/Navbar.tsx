import React, { useState, useEffect } from 'react';
import { Sun, Moon, Zap, Menu, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/Toast';

export const Navbar: React.FC<{
  currentTheme: string;
  setTheme: (theme: string) => void;
}> = ({ currentTheme, setTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cycleTheme = () => {
    const themes = ['dark', 'light', 'cyberpunk'];
    const nextTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
    setTheme(nextTheme);
    showToast(`Switched to ${nextTheme.toUpperCase()} theme`, 'info');
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--color-bg)]/80 backdrop-blur-md border-b border-[var(--color-border)] py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          className="font-mono text-xl font-bold tracking-tight text-[var(--color-text-primary)] hover:text-[var(--color-accent-light)] transition-colors"
        >
          &lt;varshit /&gt;
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-accent-light)] transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 border-l border-[var(--color-border)] pl-6">
            {/* Theme Switcher Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={cycleTheme}
              title={`Current theme: ${currentTheme}. Click to switch.`}
              aria-label="Switch theme mode"
            >
              {currentTheme === 'dark' && <Sun className="w-4 h-4 text-amber-400" />}
              {currentTheme === 'light' && <Moon className="w-4 h-4 text-indigo-600" />}
              {currentTheme === 'cyberpunk' && <Zap className="w-4 h-4 text-cyan-400" />}
            </Button>

            {/* Resume Button */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                const a = document.createElement('a');
                a.href = 'assets/resume/resume.pdf';
                a.download = 'Varshit_Jha_Resume.pdf';
                a.click();
                showToast('Downloading Resume...', 'success');
              }}
            >
              <Download className="w-4 h-4" />
              <span>Resume</span>
            </Button>
          </div>
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-3 md:hidden">
          <Button variant="outline" size="icon" onClick={cycleTheme} aria-label="Switch theme">
            {currentTheme === 'dark' && <Sun className="w-4 h-4 text-amber-400" />}
            {currentTheme === 'light' && <Moon className="w-4 h-4 text-indigo-600" />}
            {currentTheme === 'cyberpunk' && <Zap className="w-4 h-4 text-cyan-400" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[70px] bg-[var(--color-bg-surface)] border-b border-[var(--color-border)] p-6 shadow-2xl animate-in slide-in-from-top duration-200">
          <ul className="flex flex-col gap-4 mb-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent-light)] block py-2"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button
            variant="primary"
            className="w-full"
            onClick={() => {
              setMenuOpen(false);
              const a = document.createElement('a');
              a.href = 'assets/resume/resume.pdf';
              a.download = 'Varshit_Jha_Resume.pdf';
              a.click();
              showToast('Downloading Resume...', 'success');
            }}
          >
            <Download className="w-4 h-4" />
            <span>Download Resume</span>
          </Button>
        </div>
      )}
    </header>
  );
};

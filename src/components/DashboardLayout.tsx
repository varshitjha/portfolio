import React, { useState } from 'react';
import {
  LayoutDashboard,
  User,
  Wrench,
  FolderCode,
  Github,
  Mail,
  Sun,
  Moon,
  Zap,
  Download,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/Toast';

export type PanelId = 'overview' | 'about' | 'skills' | 'projects' | 'github' | 'contact';

interface DashboardLayoutProps {
  activePanel: PanelId;
  setActivePanel: (panel: PanelId) => void;
  currentTheme: string;
  setTheme: (theme: string) => void;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  activePanel,
  setActivePanel,
  currentTheme,
  setTheme,
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { showToast } = useToast();

  const navItems: Array<{ id: PanelId; label: string; icon: React.ReactNode }> = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'about', label: 'About & Journey', icon: <User className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills Matrix', icon: <Wrench className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects Explorer', icon: <FolderCode className="w-4 h-4" /> },
    { id: 'github', label: 'GitHub Feed', icon: <Github className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact & Hire', icon: <Mail className="w-4 h-4" /> },
  ];

  const cycleTheme = () => {
    const themes = ['dark', 'light', 'cyberpunk'];
    const nextTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
    setTheme(nextTheme);
    showToast(`Switched theme to ${nextTheme.toUpperCase()}`, 'info');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      {/* Sidebar Command Navigation (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 border-r border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6 shrink-0 justify-between sticky top-0 h-screen z-30">
        <div className="space-y-8">
          {/* Logo Brand */}
          <div>
            <a
              href="#overview"
              onClick={() => setActivePanel('overview')}
              className="font-mono text-xl font-bold tracking-tight text-[var(--color-text-primary)] hover:text-[var(--color-accent-light)] transition-colors block"
            >
              &lt;varshit /&gt;
            </a>
            <span className="text-xs text-[var(--color-text-muted)] font-mono mt-1 block">
              Portfolio OS v2.5
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = activePanel === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePanel(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[var(--color-accent)] text-white shadow-md shadow-[var(--color-accent-glow)]'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Info */}
        <div className="space-y-4 pt-6 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Open to Opportunities</span>
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={cycleTheme}
              title={`Current theme: ${currentTheme}. Click to switch.`}
            >
              {currentTheme === 'dark' && <Sun className="w-3.5 h-3.5 text-amber-400" />}
              {currentTheme === 'light' && <Moon className="w-3.5 h-3.5 text-indigo-600" />}
              {currentTheme === 'cyberpunk' && <Zap className="w-3.5 h-3.5 text-cyan-400" />}
              <span className="capitalize">{currentTheme}</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Command Dashboard Section */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Command Bar */}
        <header className="sticky top-0 z-20 bg-[var(--color-bg-surface)]/80 backdrop-blur-md border-b border-[var(--color-border)] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle menu"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>

            <span className="text-sm font-semibold capitalize hidden sm:inline-block text-[var(--color-text-secondary)]">
              Panel: <strong className="text-[var(--color-text-primary)]">{activePanel}</strong>
            </span>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-3">
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
              <span className="hidden sm:inline">Resume</span>
            </Button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {sidebarOpen && (
          <div className="md:hidden bg-[var(--color-bg-surface)] border-b border-[var(--color-border)] p-4 space-y-2 z-30">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePanel(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  activePanel === item.id
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Active Panel Viewport Stage */}
        <main className="flex-1 p-6 md:p-10 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

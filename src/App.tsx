import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastProvider } from '@/components/Toast';
import { DashboardLayout, PanelId } from '@/components/DashboardLayout';
import { CommandPalette } from '@/components/CommandPalette';
import { HeroStage } from '@/components/panels/HeroStage';
import { AboutPanel } from '@/components/panels/AboutPanel';
import { SkillsMatrix } from '@/components/panels/SkillsMatrix';
import { ProjectsExplorer } from '@/components/panels/ProjectsExplorer';
import { GitHubPanel } from '@/components/panels/GitHubPanel';
import { ContactPanel } from '@/components/panels/ContactPanel';

export function App() {
  const [activePanel, setActivePanel] = useState<PanelId>('overview');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <ToastProvider>
      <div className="relative min-h-screen">
        {/* Background Cursor Radial Glow */}
        <div className="cursor-glow" />

        {/* Command Palette (Cmd+K) Modal */}
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          onNavigate={setActivePanel}
        />

        <DashboardLayout
          activePanel={activePanel}
          setActivePanel={setActivePanel}
          currentTheme={theme}
          setTheme={setTheme}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activePanel}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {activePanel === 'overview' && <HeroStage onNavigate={setActivePanel} />}
              {activePanel === 'about' && <AboutPanel />}
              {activePanel === 'skills' && <SkillsMatrix />}
              {activePanel === 'projects' && <ProjectsExplorer />}
              {activePanel === 'github' && <GitHubPanel />}
              {activePanel === 'contact' && <ContactPanel />}
            </motion.div>
          </AnimatePresence>
        </DashboardLayout>
      </div>
    </ToastProvider>
  );
}

export default App;

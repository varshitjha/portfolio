import React, { useEffect } from 'react';
import {
  LayoutDashboard,
  User,
  Wrench,
  FolderCode,
  Github,
  Mail,
  Download,
  Copy,
  ExternalLink,
  Code,
} from 'lucide-react';
import {
  CommandDialog,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import { PanelId } from '@/components/DashboardLayout';
import { useToast } from '@/components/Toast';
import { projectsData } from '@/data/projects';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (panel: PanelId) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const { showToast } = useToast();

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or state
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSelectPanel = (panel: PanelId) => {
    onNavigate(panel);
    onClose();
    showToast(`Navigated to ${panel.toUpperCase()}`, 'info');
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('varshitjha17@gmail.com');
    onClose();
    showToast('Email address copied to clipboard!', 'success');
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+917250725745');
    onClose();
    showToast('Phone number copied to clipboard!', 'success');
  };

  const handleDownloadResume = () => {
    onClose();
    const a = document.createElement('a');
    a.href = 'assets/resume/resume.pdf';
    a.download = 'Varshit_Jha_Resume.pdf';
    a.click();
    showToast('Downloading Resume...', 'success');
  };

  const handleOpenGithub = () => {
    onClose();
    window.open('https://github.com/varshitjha', '_blank');
  };

  return (
    <CommandDialog isOpen={isOpen} onClose={onClose}>
      <Command>
        <CommandInput placeholder="Type a command or search portfolio (e.g. projects, resume, email)..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {/* Navigation Views */}
          <CommandGroup heading="Navigation Surfaces">
            <CommandItem onSelect={() => handleSelectPanel('overview')}>
              <LayoutDashboard className="w-4 h-4 text-[var(--color-accent-light)]" />
              <span>Go to Overview / Hero Stage</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelectPanel('projects')}>
              <FolderCode className="w-4 h-4 text-sky-400" />
              <span>Go to Projects Explorer</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelectPanel('skills')}>
              <Wrench className="w-4 h-4 text-emerald-400" />
              <span>Go to Skills Matrix</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelectPanel('about')}>
              <User className="w-4 h-4 text-amber-400" />
              <span>Go to About &amp; Journey</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelectPanel('github')}>
              <Github className="w-4 h-4 text-purple-400" />
              <span>Go to GitHub Live Feed</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelectPanel('contact')}>
              <Mail className="w-4 h-4 text-rose-400" />
              <span>Go to Contact &amp; Hire Panel</span>
            </CommandItem>
          </CommandGroup>

          {/* Quick Projects */}
          <CommandGroup heading="Featured Projects">
            {projectsData.map((project) => (
              <CommandItem
                key={project.id}
                onSelect={() => {
                  handleSelectPanel('projects');
                }}
              >
                <Code className="w-4 h-4 text-[var(--color-accent-light)]" />
                <span className="font-medium">{project.title}</span>
                <span className="ml-auto text-[10px] font-mono text-[var(--color-text-muted)]">{project.category}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          {/* Recruiter Actions */}
          <CommandGroup heading="Recruiter Quick Actions">
            <CommandItem onSelect={handleCopyEmail}>
              <Copy className="w-4 h-4 text-emerald-400" />
              <span>Copy Email (varshitjha17@gmail.com)</span>
            </CommandItem>
            <CommandItem onSelect={handleCopyPhone}>
              <Copy className="w-4 h-4 text-emerald-400" />
              <span>Copy Phone (+91 7250725745)</span>
            </CommandItem>
            <CommandItem onSelect={handleDownloadResume}>
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download Resume PDF</span>
            </CommandItem>
            <CommandItem onSelect={handleOpenGithub}>
              <ExternalLink className="w-4 h-4 text-sky-400" />
              <span>Open GitHub Profile (github.com/varshitjha)</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
};

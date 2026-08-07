import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail, Terminal, Trash2, Code, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/Toast';
import { PanelId } from '@/components/DashboardLayout';

export const HeroStage: React.FC<{ onNavigate: (panel: PanelId) => void }> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState<'visual' | 'terminal'>('visual');

  // Parallax Scroll Transform setup
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroContainerRef,
    offset: ['start start', 'end start'],
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  // Terminal State
  const [terminalLogs, setTerminalLogs] = useState<Array<{ type: 'user' | 'system'; text: string }>>([
    { type: 'system', text: 'Varshit Jha Developer Shell v2.5 initialized.' },
    { type: 'system', text: "Type 'help' for commands or 'sudo hire' for fast-track hire protocol." },
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const roles = [
    'Software Engineer',
    'Frontend Developer',
    'React Specialist',
    'Problem Solver',
  ];

  // Typing effect logic
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentRole.substring(0, typedText.length + 1));
        if (typedText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setTypedText(currentRole.substring(0, typedText.length - 1));
        if (typedText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex]);

  // Terminal command execution
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setTerminalLogs([{ type: 'system', text: "Screen cleared. Type 'help'." }]);
      setTerminalInput('');
      return;
    }

    const newLogs = [...terminalLogs, { type: 'user' as const, text: `guest@varshit-dev:~$ ${cmd}` }];

    if (cmd === 'help') {
      newLogs.push({
        type: 'system',
        text: 'Available Commands: about | skills | projects | contact | sudo hire | clear',
      });
    } else if (cmd === 'about') {
      newLogs.push({
        type: 'system',
        text: 'CS Student at Parul University, India. Building modern, scalable web applications with React & TypeScript.',
      });
    } else if (cmd === 'skills') {
      newLogs.push({
        type: 'system',
        text: 'HTML5, CSS3, JavaScript (ES6+), React, TypeScript, C, Python, Tailwind CSS, Git, REST APIs.',
      });
    } else if (cmd === 'projects') {
      newLogs.push({
        type: 'system',
        text: 'Featured: 1. Developer Portfolio 2. Weather Dashboard 3. TaskFlow Board 4. GitHub Finder',
      });
    } else if (cmd === 'contact') {
      newLogs.push({
        type: 'system',
        text: 'Email: varshitjha17@gmail.com | Phone: +91 7250725745 | GitHub: github.com/varshitjha',
      });
    } else if (cmd === 'sudo hire') {
      newLogs.push({
        type: 'system',
        text: '[SUCCESS] Hire protocol activated! Switching to Contact Panel...',
      });
      setTimeout(() => {
        onNavigate('contact');
        showToast('Hire Protocol Activated! Inbox ready.', 'success');
      }, 500);
    } else {
      newLogs.push({
        type: 'system',
        text: `Command not found: '${cmd}'. Type 'help' for available commands.`,
      });
    }

    setTerminalLogs(newLogs);
    setTerminalInput('');

    setTimeout(() => {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="space-y-12" ref={heroContainerRef}>
      {/* Background Motion Parallax Centerpiece */}
      <motion.div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none rounded-3xl overflow-hidden"
        style={{ y: yParallax }}
      >
        <img
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80"
          alt="Developer Code Parallax Background"
          className="w-full h-full object-cover filter grayscale contrast-125"
        />
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Text & CTAs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Open for Engineering Roles &amp; Internships
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--color-text-primary)] leading-[1.1]">
            Hi, I'm <span className="text-[var(--color-accent-light)]">Varshit Jha</span>
          </h1>

          {/* Typing Subheadline */}
          <div className="text-xl font-mono text-[var(--color-text-secondary)] flex items-center h-8">
            <span className="mr-2 text-[var(--color-text-muted)]">I'm a </span>
            <span className="text-[var(--color-accent-light)] font-semibold">{typedText}</span>
            <span className="w-0.5 h-6 bg-[var(--color-accent-light)] ml-1 animate-ping" />
          </div>

          {/* Bio Description */}
          <p className="text-base text-[var(--color-text-secondary)] leading-relaxed max-w-xl">
            Computer Science student at Parul University engineering responsive, accessible, high-performance web applications with React, TypeScript, and clean code principles.
          </p>

          {/* 2 CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('projects')}
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const a = document.createElement('a');
                a.href = 'assets/resume/resume.pdf';
                a.download = 'Varshit_Jha_Resume.pdf';
                a.click();
                showToast('Downloading Resume...', 'success');
              }}
            >
              <span>Download Resume</span>
              <Download className="w-4 h-4" />
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 pt-4">
            <a
              href="https://github.com/varshitjha"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-white hover:border-[var(--color-accent)] transition-all hover:scale-110"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/varshit-jha-975a6b1a5/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-white hover:border-[var(--color-accent)] transition-all hover:scale-110"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:varshitjha17@gmail.com"
              className="p-2.5 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-white hover:border-[var(--color-accent)] transition-all hover:scale-110"
              aria-label="Email Me"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right Column: Stage Viewport Centerpiece */}
        <div className="lg:col-span-5">
          <div className="relative rounded-2xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] shadow-2xl shadow-[var(--color-accent-glow)] overflow-hidden transition-all hover:border-[var(--color-accent)]">
            {/* Header Controls */}
            <div className="flex items-center justify-between px-4 py-3 bg-[var(--color-bg-card)] border-b border-[var(--color-border)]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>

              {/* Mode Toggle Pills */}
              <div className="flex items-center bg-[var(--color-bg-surface)] p-1 rounded-lg border border-[var(--color-border)] text-xs font-mono">
                <button
                  onClick={() => setActiveTab('visual')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeTab === 'visual'
                      ? 'bg-[var(--color-accent)] text-white font-semibold'
                      : 'text-[var(--color-text-muted)] hover:text-white'
                  }`}
                >
                  Code Visual
                </button>
                <button
                  onClick={() => setActiveTab('terminal')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeTab === 'terminal'
                      ? 'bg-[var(--color-accent)] text-white font-semibold'
                      : 'text-[var(--color-text-muted)] hover:text-white'
                  }`}
                >
                  CLI Shell
                </button>
              </div>

              {activeTab === 'terminal' ? (
                <button
                  onClick={() => setTerminalLogs([{ type: 'system', text: "Screen cleared. Type 'help'." }])}
                  className="text-xs font-mono text-[var(--color-text-muted)] hover:text-white flex items-center gap-1 transition-colors"
                  title="Clear screen"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              ) : (
                <Code className="w-4 h-4 text-[var(--color-accent-light)]" />
              )}
            </div>

            {/* Stage Body */}
            {activeTab === 'visual' ? (
              <div className="p-6 h-80 font-mono text-xs space-y-2 leading-relaxed bg-black/40 overflow-y-auto">
                <div><span className="text-purple-400">const</span> <span className="text-sky-300">developer</span> = &#123;</div>
                <div className="pl-4"><span className="text-emerald-300">name</span>: <span className="text-amber-300">"Varshit Jha"</span>,</div>
                <div className="pl-4"><span className="text-emerald-300">role</span>: <span className="text-amber-300">"Software Engineer"</span>,</div>
                <div className="pl-4"><span className="text-emerald-300">education</span>: <span className="text-amber-300">"Parul University (B.Tech CS)"</span>,</div>
                <div className="pl-4">
                  <span className="text-emerald-300">stack</span>: [
                  <span className="text-amber-300">"React"</span>, <span className="text-amber-300">"TypeScript"</span>, <span className="text-amber-300">"Tailwind"</span>, <span className="text-amber-300">"C++"</span>
                  ],
                </div>
                <div className="pl-4"><span className="text-emerald-300">status</span>: <span className="text-emerald-400 font-semibold">"Open for Internships &amp; Roles"</span></div>
                <div>&#125;;</div>
                <div className="pt-3"><span className="text-purple-400">function</span> <span className="text-sky-300">hire</span>(<span className="text-amber-300">candidate</span>) &#123;</div>
                <div className="pl-4"><span className="text-purple-400">return</span> <span className="text-emerald-400">"Best decision for your engineering team!"</span>;</div>
                <div>&#125;</div>
              </div>
            ) : (
              <div className="flex flex-col h-80">
                <div className="p-4 flex-1 overflow-y-auto font-mono text-xs space-y-2 bg-black/40">
                  {terminalLogs.map((log, i) => (
                    <div
                      key={i}
                      className={
                        log.type === 'user'
                          ? 'text-emerald-400 font-semibold'
                          : 'text-[var(--color-text-secondary)] leading-relaxed'
                      }
                    >
                      {log.text}
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                </div>

                <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 px-4 py-3 bg-[var(--color-bg-card)] border-t border-[var(--color-border)] font-mono text-xs">
                  <span className="text-emerald-400 font-semibold">guest@varshit-dev:~$</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="type help..."
                    className="flex-1 bg-transparent text-[var(--color-text-primary)] outline-none border-none"
                  />
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

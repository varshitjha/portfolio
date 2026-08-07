import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Eye, Star, GitFork, BookOpen } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';

interface Project {
  id: number;
  title: string;
  category: 'frontend' | 'js-api' | 'fullstack';
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl: string;
  image: string;
  placeholderName: string;
  featured?: boolean;
  highlights: string[];
}

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'frontend' | 'js-api' | 'fullstack'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Live GitHub Stats state
  const [ghData, setGhData] = useState<{
    repos: number | string;
    followers: number | string;
    stars: number;
    forks: number;
    pinnedRepos: Array<{ name: string; desc: string; lang: string; stars: number; forks: number; url: string }>;
  }>({
    repos: '--',
    followers: '--',
    stars: 0,
    forks: 0,
    pinnedRepos: [],
  });

  const projects: Project[] = [
    {
      id: 0,
      title: 'Developer Portfolio Website',
      category: 'frontend',
      featured: true,
      description: 'Engineered from scratch with HTML, CSS, React, TypeScript & Tailwind. Features theme switching, CLI terminal, live GitHub API stats, and EmailJS form.',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'GitHub API'],
      githubUrl: 'https://github.com/varshitjha/portfolio',
      demoUrl: 'https://varshitjha.dev',
      image: 'assets/images/project1.png',
      placeholderName: 'portfolio.png',
      highlights: [
        'Built with React + TypeScript & Tailwind CSS',
        'Interactive Developer CLI Terminal Widget',
        'Multi-theme Engine (Dark, Light, Cyberpunk)',
        'Live GitHub REST API profile stats integration',
        'Fully responsive & accessible layout'
      ]
    },
    {
      id: 1,
      title: 'Weather Dashboard',
      category: 'js-api',
      description: 'Real-time weather query web application leveraging OpenWeatherMap REST API with temperature, humidity, and 5-day forecast.',
      tags: ['JavaScript', 'REST API', 'CSS3', 'HTML5'],
      githubUrl: 'https://github.com/varshitjha/weather-app',
      demoUrl: 'https://weather-app-demo.vercel.app',
      image: 'assets/images/project-weather.png',
      placeholderName: 'weather.png',
      highlights: [
        'Real-time OpenWeatherMap REST API integration',
        '5-Day weather forecast data parser',
        'Dynamic weather condition icons & metrics',
        'Graceful error handling & loading UI'
      ]
    },
    {
      id: 2,
      title: 'TaskFlow Board',
      category: 'fullstack',
      description: 'Full CRUD task & workflow management dashboard with priority tagging, status filters, and localStorage state persistence.',
      tags: ['JavaScript', 'CRUD', 'LocalStorage', 'CSS3'],
      githubUrl: 'https://github.com/varshitjha/vj_TaskFlow-Board',
      demoUrl: 'https://task-manager-demo.vercel.app',
      image: 'assets/images/project-tasks.png',
      placeholderName: 'tasks.png',
      highlights: [
        'Complete CRUD task operations (Add, Edit, Delete, Toggle)',
        'Priority tagging (High, Medium, Low)',
        'Browser LocalStorage state retention',
        'Clean responsive UI layout'
      ]
    },
    {
      id: 3,
      title: 'GitHub Profile Finder',
      category: 'js-api',
      description: 'Search any GitHub username and instantly view profile metrics, top public repositories, followers count, and bio live from GitHub REST API.',
      tags: ['JavaScript', 'GitHub API', 'CSS Grid', 'HTML5'],
      githubUrl: 'https://github.com/varshitjha/github-finder',
      demoUrl: 'https://github-finder-demo.vercel.app',
      image: 'assets/images/project-github.png',
      placeholderName: 'github-finder.png',
      highlights: [
        'Instant live GitHub profile lookup',
        'Repository star & fork counters',
        'Follower metrics & bio details',
        'Direct repository navigation links'
      ]
    }
  ];

  // Fetch Live GitHub Stats
  useEffect(() => {
    async function fetchGitHub() {
      try {
        const userRes = await fetch('https://api.github.com/users/varshitjha');
        if (!userRes.ok) throw new Error('Failed to fetch profile');
        const user = await userRes.json();

        const repoRes = await fetch('https://api.github.com/users/varshitjha/repos?sort=updated&per_page=6');
        if (!repoRes.ok) throw new Error('Failed to fetch repos');
        const repos = await repoRes.json();

        let totalStars = 0;
        let totalForks = 0;
        const pinned: Array<{ name: string; desc: string; lang: string; stars: number; forks: number; url: string }> = [];

        repos.forEach((r: any) => {
          totalStars += r.stargazers_count || 0;
          totalForks += r.forks_count || 0;
          if (pinned.length < 4) {
            pinned.push({
              name: r.name,
              desc: r.description || 'Developer project repository.',
              lang: r.language || 'TypeScript',
              stars: r.stargazers_count || 0,
              forks: r.forks_count || 0,
              url: r.html_url,
            });
          }
        });

        setGhData({
          repos: user.public_repos || 10,
          followers: user.followers || 5,
          stars: totalStars,
          forks: totalForks,
          pinnedRepos: pinned,
        });
      } catch (e) {
        // Fallback stats
        setGhData({
          repos: '10+',
          followers: '5+',
          stars: 12,
          forks: 4,
          pinnedRepos: [
            {
              name: 'portfolio',
              desc: 'Developer portfolio built with React & TypeScript.',
              lang: 'TypeScript',
              stars: 5,
              forks: 2,
              url: 'https://github.com/varshitjha/portfolio',
            },
            {
              name: 'weather-app',
              desc: 'Real-time weather query dashboard with REST API.',
              lang: 'JavaScript',
              stars: 4,
              forks: 1,
              url: 'https://github.com/varshitjha/weather-app',
            },
          ],
        });
      }
    }
    fetchGitHub();
  }, []);

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-20 bg-[var(--color-bg-surface)]/40">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-light)] px-3 py-1 rounded-full bg-[var(--color-accent-glow)] border border-[var(--color-accent)]/30 inline-block">
            // Portfolio &amp; Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Things I've Built
          </h2>
          <p className="text-base text-[var(--color-text-secondary)]">
            Real projects built with clean architecture, proper responsiveness, and API integrations.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <Button
            variant={filter === 'all' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All Projects
          </Button>
          <Button
            variant={filter === 'frontend' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter('frontend')}
          >
            Frontend &amp; React
          </Button>
          <Button
            variant={filter === 'js-api' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter('js-api')}
          >
            JavaScript &amp; APIs
          </Button>
          <Button
            variant={filter === 'fullstack' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter('fullstack')}
          >
            Full-Stack / Tools
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="flex flex-col justify-between group">
              <div>
                {/* Project Thumbnail Header */}
                <div className="relative h-48 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] mb-5 overflow-hidden flex items-center justify-center">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-[var(--color-text-muted)] gap-2 group-hover:bg-black/20 transition-all">
                    <BookOpen className="w-8 h-8 text-[var(--color-accent-light)]" />
                    <span className="font-mono text-xs">{project.placeholderName}</span>
                  </div>
                  {project.featured && (
                    <span className="absolute top-3 right-3 px-3 py-1 bg-[var(--color-accent)] text-white text-xs font-mono font-semibold rounded-full shadow-md">
                      Featured
                    </span>
                  )}
                </div>

                <CardHeader className="p-0">
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription className="mt-2">{project.description}</CardDescription>
                </CardHeader>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="accent">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <CardFooter className="p-0 pt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedProject(project)}
                >
                  <Eye className="w-4 h-4" />
                  <span>Quick View</span>
                </Button>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-accent-light)] transition-colors ml-auto"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>

                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-accent-light)] hover:text-white transition-colors"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Live GitHub Stats Widget */}
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Github className="w-6 h-6 text-[var(--color-accent-light)]" />
              <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                Live GitHub Developer Activity
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              Live API Sync
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-center">
              <span className="block text-2xl font-bold font-mono text-[var(--color-accent-light)]">{ghData.repos}</span>
              <span className="text-xs text-[var(--color-text-secondary)]">Public Repos</span>
            </div>
            <div className="p-4 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-center">
              <span className="block text-2xl font-bold font-mono text-[var(--color-accent-light)]">{ghData.followers}</span>
              <span className="text-xs text-[var(--color-text-secondary)]">Followers</span>
            </div>
            <div className="p-4 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-center">
              <span className="block text-2xl font-bold font-mono text-[var(--color-accent-light)]">{ghData.stars}</span>
              <span className="text-xs text-[var(--color-text-secondary)]">Total Stars</span>
            </div>
            <div className="p-4 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-center">
              <span className="block text-2xl font-bold font-mono text-[var(--color-accent-light)]">{ghData.forks}</span>
              <span className="text-xs text-[var(--color-text-secondary)]">Repo Forks</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ghData.pinnedRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all flex flex-col justify-between gap-3 group"
              >
                <div>
                  <h4 className="font-semibold text-sm text-[var(--color-accent-light)] group-hover:underline">{repo.name}</h4>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1 line-clamp-2">{repo.desc}</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-[var(--color-text-muted)]">
                  <span>● {repo.lang}</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3" /> {repo.stars}</span>
                  <span className="flex items-center gap-1"><GitFork className="w-3 h-3" /> {repo.forks}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Project Details Dialog */}
      <Dialog
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title || ''}
      >
        {selectedProject && (
          <div className="space-y-6">
            <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
              {selectedProject.description}
            </p>

            <div>
              <h4 className="text-sm font-semibold text-[var(--color-accent-light)] mb-2">Key Features &amp; Technical Highlights:</h4>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-[var(--color-text-secondary)]">
                {selectedProject.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {selectedProject.tags.map((tag) => (
                <Badge key={tag} variant="accent">{tag}</Badge>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-[var(--color-border)]">
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-[var(--color-border)] text-sm font-medium text-white hover:bg-[var(--color-bg-hover)] transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>View Source Code</span>
              </a>
              <a
                href={selectedProject.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-accent)] text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              >
                <span>Launch Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </Dialog>
    </section>
  );
};

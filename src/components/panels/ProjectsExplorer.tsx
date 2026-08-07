import React, { useState } from 'react';
import { ExternalLink, Github, Eye, BookOpen } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { projectsData, Project } from '@/data/projects';

export const ProjectsExplorer: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'frontend' | 'js-api' | 'fullstack'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = filter === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === filter);

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-light)] px-3 py-1 rounded-full bg-[var(--color-accent-glow)] border border-[var(--color-accent)]/30 inline-block">
          // Project Explorer
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Featured Engineering Work
        </h2>
        <p className="text-base text-[var(--color-text-secondary)]">
          Data-driven project cards with technical specs and quick-view case study modals.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-3">
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

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="flex flex-col justify-between group">
            <div>
              {/* Thumbnail */}
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

              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="accent">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

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

      {/* Quick View Dialog */}
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
              <h4 className="text-sm font-semibold text-[var(--color-accent-light)] mb-2">Key Highlights &amp; Features:</h4>
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
    </div>
  );
};

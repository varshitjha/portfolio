import React from 'react';
import { Github, Star, GitFork, BookOpen, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useGithubStats } from '@/hooks/useGithubStats';

export const GitHubPanel: React.FC = () => {
  const { stats, loading, error } = useGithubStats('varshitjha');

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="space-y-2">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-light)] px-3 py-1 rounded-full bg-[var(--color-accent-glow)] border border-[var(--color-accent)]/30 inline-block">
          // Live GitHub REST API Hook
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Live Developer Activity &amp; Repositories
        </h2>
        <p className="text-base text-[var(--color-text-secondary)]">
          Isolated data hook with 30-min TTL caching, error boundaries, and skeleton loading UI.
        </p>
      </div>

      {/* Error / Fallback Notice */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Notice: Showing cached/fallback metrics ({error})</span>
        </div>
      )}

      {/* Metrics Cards / Skeletons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          {loading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-8 bg-[var(--color-border)] rounded w-16 mx-auto" />
              <div className="h-3 bg-[var(--color-border)] rounded w-20 mx-auto" />
            </div>
          ) : (
            <>
              <span className="block text-3xl font-bold font-mono text-[var(--color-accent-light)]">{stats.repos}</span>
              <span className="text-xs text-[var(--color-text-secondary)] mt-1 block">Public Repositories</span>
            </>
          )}
        </Card>

        <Card className="p-4 text-center">
          {loading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-8 bg-[var(--color-border)] rounded w-16 mx-auto" />
              <div className="h-3 bg-[var(--color-border)] rounded w-20 mx-auto" />
            </div>
          ) : (
            <>
              <span className="block text-3xl font-bold font-mono text-[var(--color-accent-light)]">{stats.followers}</span>
              <span className="text-xs text-[var(--color-text-secondary)] mt-1 block">GitHub Followers</span>
            </>
          )}
        </Card>

        <Card className="p-4 text-center">
          {loading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-8 bg-[var(--color-border)] rounded w-16 mx-auto" />
              <div className="h-3 bg-[var(--color-border)] rounded w-20 mx-auto" />
            </div>
          ) : (
            <>
              <span className="block text-3xl font-bold font-mono text-[var(--color-accent-light)]">{stats.stars}</span>
              <span className="text-xs text-[var(--color-text-secondary)] mt-1 block">Total Stars</span>
            </>
          )}
        </Card>

        <Card className="p-4 text-center">
          {loading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-8 bg-[var(--color-border)] rounded w-16 mx-auto" />
              <div className="h-3 bg-[var(--color-border)] rounded w-20 mx-auto" />
            </div>
          ) : (
            <>
              <span className="block text-3xl font-bold font-mono text-[var(--color-accent-light)]">{stats.forks}</span>
              <span className="text-xs text-[var(--color-text-secondary)] mt-1 block">Repository Forks</span>
            </>
          )}
        </Card>
      </div>

      {/* Pinned Repos Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-[var(--color-text-primary)] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[var(--color-accent-light)]" />
            <span>Featured Repositories</span>
          </h3>

          <a
            href="https://github.com/varshitjha"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-accent-light)] hover:underline"
          >
            <span>View All on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] animate-pulse space-y-3">
                <div className="h-4 bg-[var(--color-border)] rounded w-1/2" />
                <div className="h-3 bg-[var(--color-border)] rounded w-3/4" />
                <div className="h-3 bg-[var(--color-border)] rounded w-1/3 pt-4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.pinnedRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all flex flex-col justify-between gap-4 group"
              >
                <div>
                  <h4 className="font-semibold text-base text-[var(--color-accent-light)] group-hover:underline flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    <span>{repo.name}</span>
                  </h4>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-2 leading-relaxed line-clamp-2">
                    {repo.desc}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-[var(--color-text-muted)] pt-3 border-t border-[var(--color-border)]">
                  <span className="text-sky-400">● {repo.lang}</span>
                  <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5" /> {repo.stars}</span>
                  <span className="flex items-center gap-1"><GitFork className="w-3.5 h-3.5" /> {repo.forks}</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

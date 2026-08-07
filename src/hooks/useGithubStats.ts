import { useState, useEffect } from 'react';

export interface PinnedRepo {
  name: string;
  desc: string;
  lang: string;
  stars: number;
  forks: number;
  url: string;
}

export interface GithubStats {
  repos: number | string;
  followers: number | string;
  stars: number;
  forks: number;
  pinnedRepos: PinnedRepo[];
}

const CACHE_KEY = 'varshit_github_stats';
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes in ms

export function useGithubStats(username: string = 'varshitjha') {
  const [stats, setStats] = useState<GithubStats>({
    repos: '--',
    followers: '--',
    stars: 0,
    forks: 0,
    pinnedRepos: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      // 1. Check local cache
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_TTL) {
            setStats(data);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn('Cache read error:', e);
      }

      // 2. Fetch live data from GitHub API
      try {
        setLoading(true);
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error(`HTTP error! Status: ${userRes.status}`);
        const user = await userRes.json();

        const repoRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        if (!repoRes.ok) throw new Error(`HTTP error! Status: ${repoRes.status}`);
        const repos = await repoRes.json();

        let totalStars = 0;
        let totalForks = 0;
        const pinned: PinnedRepo[] = [];

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

        const fetchedStats: GithubStats = {
          repos: user.public_repos || 10,
          followers: user.followers || 5,
          stars: totalStars,
          forks: totalForks,
          pinnedRepos: pinned,
        };

        setStats(fetchedStats);
        setError(null);

        // Save to local cache
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ data: fetchedStats, timestamp: Date.now() })
          );
        } catch (e) {
          console.warn('Cache write error:', e);
        }
      } catch (err: any) {
        console.warn('GitHub API fetch failed, using fallback data:', err);
        setError(err.message || 'Failed to fetch live GitHub stats');
        
        // Fallback data
        setStats({
          repos: '10+',
          followers: '5+',
          stars: 12,
          forks: 4,
          pinnedRepos: [
            {
              name: 'portfolio',
              desc: 'Developer portfolio OS built with React & TypeScript.',
              lang: 'TypeScript',
              stars: 5,
              forks: 2,
              url: `https://github.com/${username}/portfolio`,
            },
            {
              name: 'weather-app',
              desc: 'Real-time weather query dashboard with REST API.',
              lang: 'JavaScript',
              stars: 4,
              forks: 1,
              url: `https://github.com/${username}/weather-app`,
            },
          ],
        });
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [username]);

  return { stats, loading, error };
}

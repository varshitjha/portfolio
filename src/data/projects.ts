export interface Project {
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

export const projectsData: Project[] = [
  {
    id: 0,
    title: 'Developer Portfolio Website',
    category: 'frontend',
    featured: true,
    description: 'Engineered with React, TypeScript & Tailwind CSS. Features Portfolio OS command dashboard, Command Palette (Cmd+K), CLI shell, live GitHub REST API stats, and EmailJS drawer.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'GitHub API', 'Framer Motion'],
    githubUrl: 'https://github.com/varshitjha/portfolio',
    demoUrl: 'https://varshitjha.dev',
    image: 'assets/images/project1.png',
    placeholderName: 'portfolio.png',
    highlights: [
      'Built with React + TypeScript & Tailwind CSS',
      'Command Palette (Cmd/Ctrl+K) quick navigation',
      'Interactive Developer CLI Terminal Shell',
      '3-Mode Theme Engine (Dark, Light, Cyberpunk)',
      'Live GitHub REST API profile stats integration with caching',
      'Fully responsive Portfolio OS Dashboard layout'
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

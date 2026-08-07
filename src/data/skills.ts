export interface SkillItem {
  name: string;
  level: 'Advanced' | 'Strong' | 'Intermediate' | 'Learning';
}

export interface SkillCategory {
  id: 'frontend' | 'languages' | 'tools';
  categoryName: string;
  skills: SkillItem[];
}

export const skillsData: SkillCategory[] = [
  {
    id: 'frontend',
    categoryName: 'Frontend & Frameworks',
    skills: [
      { name: 'HTML5', level: 'Strong' },
      { name: 'CSS3 / Modern Layouts', level: 'Strong' },
      { name: 'JavaScript (ES6+)', level: 'Advanced' },
      { name: 'React.js', level: 'Intermediate' },
      { name: 'TypeScript', level: 'Intermediate' },
      { name: 'Tailwind CSS', level: 'Strong' },
    ],
  },
  {
    id: 'languages',
    categoryName: 'Programming Languages',
    skills: [
      { name: 'C Programming', level: 'Strong' },
      { name: 'Python', level: 'Intermediate' },
      { name: 'JavaScript', level: 'Advanced' },
      { name: 'TypeScript', level: 'Intermediate' },
    ],
  },
  {
    id: 'tools',
    categoryName: 'Tools & CS Fundamentals',
    skills: [
      { name: 'Git & GitHub', level: 'Strong' },
      { name: 'VS Code', level: 'Advanced' },
      { name: 'Vercel Deployment', level: 'Strong' },
      { name: 'REST APIs & Fetch', level: 'Strong' },
      { name: 'Data Structures (DSA)', level: 'Learning' },
    ],
  },
];

import { Project, SkillCategory } from './types';

export const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Skills', path: '/skills' },
  { label: 'Contact', path: '/contact' },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Stock-X-Master',
    description: 'A complete stock-market simulation app. Features real-time pricing, authentication, portfolio tracking, ML forecast module, and admin dashboard.',
    tech: ['React', 'Node.js', 'Express', 'Machine Learning'],
    color: '#dc2626', // Red
    github: 'https://github.com/kshitij-raj-shukla/StockX',
    // demo: 'https://github.com/kshitij-raj-shukla/StockX'
  },
  {
    id: 2,
    title: 'Employee Attendance System',
    description: 'Backend system handling authentication, attendance marking, and admin operations with proper controllers and middleware.',
    tech: ['Node.js', 'MySQL', 'Express.js'],
    color: '#b91c1c', // Dark Red
    github: 'https://github.com/kshitij-raj-shukla/Employee_Manegment',
  },
  {
    id: 3,
    title: 'Khabar (Fake News Detection)',
    description: 'AI system classifying Hindi, Hinglish, and English news as Real or Fake using NLP and Transformer-based models.',
    tech: ['NLP', 'Transformers', 'Python', 'React'],
    color: '#ef4444', // Light Red
    github: 'https://github.com/kshitij-raj-shukla/fake-news-detector',
  }
];

export const SKILLS: SkillCategory[] = [
  {
    title: 'Development Skills',
    skills: ['Javascript', 'ReactJS', 'Node.js', 'Express.js', 'MongoDB', 'MySQL']
  },
  {
    title: 'Languages',
    skills: ['Java', 'C++', 'TypeScript']
  },
  {
    title: 'Concepts',
    skills: ['DSA and OOPS', 'REST API Development', 'MVC Architecture']
  },
  {
    title: 'Tools & Extra',
    skills: ['Figma', 'Photoshop', 'Git/GitHub', 'JWT Auth', 'API Integration']
  }
];
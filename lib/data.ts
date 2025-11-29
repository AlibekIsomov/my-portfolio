import { UserData } from './types';

export const USER_DATA: UserData = {
  name: "Your Name",
  role: "Senior Developer",
  company: "Tech Corp",
  bio: "I build software that helps people at scale. Obsessed with clean code, developer experience, and aesthetics.",
  location: "New York, USA",
  email: "contact@yourname.com",
  social: {
    github: "https://github.com",
    linkedin: "https://linkedin.com"
  },
  stats: {
    views: "885,353",
    commits: "1,240"
  },
  projects: [
    {
      title: "Anubis",
      description: "Weighs the soul of incoming HTTP requests using proof-of-work to stop AI crawlers.",
      tags: ["Go", "Security", "AI"],
      stars: 120
    },
    {
      title: "Abacus",
      description: "A scalable, secure, and easy-to-use analytics counter built from the ground up.",
      tags: ["Go", "Redis", "Docker"],
      stars: 85
    },
    {
      title: "Nyx",
      description: "The source code for this very website. Built with React and Tailwind.",
      tags: ["React", "Tailwind", "Vite"],
      stars: 200
    }
  ],
  commits: [
    { id: 1, message: "feat: add dark mode toggle", change: "+120 / -45" },
    { id: 2, message: "fix: mobile responsiveness on grid", change: "+12 / -8" },
    { id: 3, message: "docs: update readme", change: "+5 / -2" },
  ]
};

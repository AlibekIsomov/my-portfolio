import { UserData } from './types';

export const USER_DATA: UserData = {
  name: "Alibek Isomov",
  role: "Middle Software Engineer",
  company: "Gross Insurance",
  bio: "I build software that helps people at scale. Obsessed with clean code, developer experience, and aesthetics.",
  location: "Tashkent, Uzbekisan",
  email: "aisomov.dev@gmail.com",
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
      title: "dotenv",
      description: "Just find ur fuckn environment variables",
      tags: [ "Spring Boot", "Java"],
      stars: 69
    },
    {
      title: "IDK",
      description: "A scalable, secure, and easy-to-use analytics counter built from the ground up.",
      tags: ["Go", "Redis", "Docker"],
      stars: 69
    },
    {
      title: "IDK",
      description: "The source code for this very website. Built with React and Tailwind.",
      tags: ["React", "Tailwind", "Vite"],
      stars: 69
    }
  ],
  commits: [
    { id: 1, message: "feat: add dark mode toggle", change: "+120 / -45" },
    { id: 2, message: "fix: mobile responsiveness on grid", change: "+12 / -8" },
    { id: 3, message: "docs: update readme", change: "+5 / -2" },
  ]
};

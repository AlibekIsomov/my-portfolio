import type { ContentItem, ContentMap, UserData } from './types';

export const DEFAULT_CONTENT: ContentMap = {
  global: {
    navHomeLabel: 'Home',
    navAboutLabel: 'About',
    navProjectsLabel: 'Projects',
    navContactLabel: 'Contact',
    navAdminLabel: 'Admin',
    featuredProjectsTitle: 'Featured Projects',
    featuredProjectsLink: 'View all →',
    dashboardTitle: 'Dashboard',
    footerLine: '© 2025 {name} - All Services Nominal',
    footerStats: '{views} views • {commits} commits',
  },
  profile: {
    name: 'Alibek Isomov',
    role: 'Middle Software Engineer',
    company: 'Gross Insurance',
    bio: 'I build software that helps people at scale. Obsessed with clean code, developer experience, and aesthetics.',
    location: 'Tashkent, Uzbekisan',
    email: 'aisomov.dev@gmail.com',
    github: 'https://github.com/AlibekIsomov',
    linkedin: 'https://www.linkedin.com/in/alibek-isomov',
    views: '885,353',
    commits: '1,240',
  },
  home: {
    heroBadgePrefix: 'Currently working @',
    heroGreeting: "Hey! I'm",
    heroRoleLine: "I'm currently working as a {role} @ {company}.",
    heroTrustedLine: "I've written software that is trusted by {trusted}.",
    heroTrustedEmphasis: 'major organizations',
    heroClosing:
      'Seeing code I wrote actually help people at scale is what keeps me building.',
    heroGithubLabel: 'GitHub',
    heroLinkedinLabel: 'LinkedIn',
    heroMoreLabel: 'More about me',
    dashboardConnectTitle: "Let's Connect",
    dashboardConnectBody: 'Always open to interesting projects and conversations.',
    dashboardConnectButton: 'Get in Touch',
    dashboardBasedInLabel: 'Based In',
    dashboardClicksLabel: 'Clicks',
    dashboardClicksHint: 'Try clicking me!',
    dashboardCommitsTitle: 'Recent Commits',
    dashboardLanguageTitle: 'Language Stats',
    dashboardLanguageGo: 'Java 40%',
    dashboardLanguageJs: 'PHP 40%',
    dashboardLanguageTs: 'JS 20%',
  },
  about: {
    pageTitle: 'About Me',
    backgroundTitle: 'Background',
    backgroundBody:
      "I'm a passionate developer with a focus on building scalable, performant web applications. My journey in tech started with a curiosity about how things work, which led me to dive deep into software engineering.",
    interestsTitle: 'Interests',
    interestsItem1: 'Full-stack web development',
    interestsItem2: 'Open source contributions',
    interestsItem3: 'Developer experience & tooling',
    interestsItem4: 'Clean code architecture',
    interestsItem5: 'Performance optimization',
    skillsTitle: 'Skills',
    skillsLanguagesTitle: 'Languages',
    skillsLanguagesBody: 'Go, JavaScript, TypeScript, Python',
    skillsFrontendTitle: 'Frontend',
    skillsFrontendBody: 'React, Next.js, Tailwind CSS, Vite',
    skillsBackendTitle: 'Backend & DevOps',
    skillsBackendBody: 'Node.js, Docker, Redis, PostgreSQL',
  },
  contact: {
    pageTitle: 'Get in Touch',
    pageSubtitle: "Have a project in mind or want to collaborate? I'd love to hear from you!",
    formTitle: 'Send me a message',
    formNameLabel: 'Name',
    formNamePlaceholder: 'Your name',
    formEmailLabel: 'Email',
    formEmailPlaceholder: 'your@email.com',
    formMessageLabel: 'Message',
    formMessagePlaceholder: 'Your message here...',
    formSubmitLabel: 'Send Message',
    formSuccessMessage: "Thanks for reaching out! I'll get back to you soon.",
    infoEmailLabel: 'Email',
    infoLinkedinLabel: 'LinkedIn',
    infoGithubLabel: 'GitHub',
    infoLinkedinCta: 'Connect with me',
    infoGithubCta: 'Check out my repos',
  },
  projects: {
    pageTitle: 'All Projects',
    ctaTitle: 'Want to collaborate?',
    ctaBody: "I'm always interested in working on exciting projects even open sources. Feel free to reach out!",
    ctaButton: 'Get in Touch',
  },
};

export const buildContentMap = (items: ContentItem[], defaults: ContentMap): ContentMap => {
  const map: ContentMap = structuredClone(defaults);
  for (const item of items) {
    if (!map[item.pageSlug]) {
      map[item.pageSlug] = {};
    }
    map[item.pageSlug][item.key] = item.value;
  }
  return map;
};

export const interpolate = (template: string, values: Record<string, string | undefined>) => {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? '');
};

export const applyContentToUserData = (user: UserData, content: ContentMap) => {
  const profile = content.profile ?? {};

  return {
    ...user,
    name: profile.name ?? user.name,
    role: profile.role ?? user.role,
    company: profile.company ?? user.company,
    bio: profile.bio ?? user.bio,
    location: profile.location ?? user.location,
    email: profile.email ?? user.email,
    social: {
      ...user.social,
      github: profile.github ?? user.social?.github,
      linkedin: profile.linkedin ?? user.social?.linkedin,
    },
    stats: {
      ...user.stats,
      views: profile.views ?? user.stats?.views,
      commits: profile.commits ?? user.stats?.commits,
    },
  };
};

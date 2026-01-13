export interface ThemeColors {
  bg: string;
  surface: string;
  surfaceHighlight: string;
  text: string;
  subtext: string;
  accent: string;
  highlight: string;
  border: string;
}

export interface Theme {
  name: string;
  type: 'dark' | 'light';
  colors: ThemeColors;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  stars: number;
}

export interface Commit {
  id: number;
  message: string;
  change: string;
}

export interface UserData {
  name: string;
  role: string;
  company: string;
  bio: string;
  location: string;
  stats: {
    views: string;
    commits: string;
  };
  projects: Project[];
  commits: Commit[];
  email?: string;
  social?: {
    github?: string;
    linkedin?: string;
  };
}

export interface ContentItem {
  id: number;
  pageSlug: string;
  key: string;
  value: string;
}

export type ContentMap = Record<string, Record<string, string>>;

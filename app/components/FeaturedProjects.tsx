'use client';

import type { ContentMap, Project, Theme, UserData } from '@/lib/types';
import { ProjectCard } from './ProjectCard';

export const FeaturedProjects = ({
  data,
  theme,
  content,
  projects
}: {
  data: UserData;
  theme: Theme;
  content: ContentMap;
  projects: Project[];
}) => {
  // Use passed projects or fallback to static data
  const displayProjects = projects.length > 0 ? projects : data.projects.slice(0, 3);

  return (
    <section className="mb-32">
      <div className="flex items-center justify-between mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <h2 className={`text-3xl font-bold font-mono ${theme.colors.highlight}`}>
          {content.global?.featuredProjectsTitle ?? 'Featured Projects'}
        </h2>
        <a href="/projects" className={`text-sm font-mono hover:underline decoration-2 underline-offset-4 ${theme.colors.accent} hover:animate-glow transition-all`}>
          {content.global?.featuredProjectsLink ?? 'View all →'}
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayProjects.map((proj, i) => (
          <ProjectCard key={proj.id || i} project={proj} theme={theme} delay={300 + (i * 100)} />
        ))}
      </div>
    </section>
  );
};

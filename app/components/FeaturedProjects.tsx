'use client';

import { Theme, UserData } from '@/lib/types';
import { ProjectCard } from './ProjectCard';

export const FeaturedProjects = ({ data, theme }: { data: UserData; theme: Theme }) => (
  <section className="mb-32">
    <div className="flex items-center justify-between mb-12 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
      <h2 className={`text-3xl font-bold font-mono ${theme.colors.text}`}>Featured Projects</h2>
      <a href="/projects" className={`text-sm font-mono hover:underline decoration-2 underline-offset-4 ${theme.colors.accent}`}>View all →</a>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.projects.map((proj, i) => (
        <ProjectCard key={i} project={proj} theme={theme} delay={300 + (i * 100)} />
      ))}
    </div>
  </section>
);

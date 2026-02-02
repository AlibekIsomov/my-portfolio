'use client';

import { useEffect, useState } from 'react';
import type { ContentMap, Project, Theme, UserData } from '@/lib/types';
import { ProjectCard } from './ProjectCard';

export const FeaturedProjects = ({ data, theme, content }: { data: UserData; theme: Theme; content: ContentMap }) => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch('/api/projects?featured=true');
        if (res.ok) {
          const json = await res.json();
          // If we have featured projects in DB, use them
          if (json.projects && json.projects.length > 0) {
            setFeaturedProjects(json.projects);
          } else {
            // Fallback to static data filtered for optimization (assumption: first 3 are featured if no flag)
            // Or if static data had a 'featured' flag, we'd use that. 
            // For now, let's just use the first 3 static projects as fallback.
            setFeaturedProjects(data.projects.slice(0, 3));
          }
        }
      } catch (e) {
        setFeaturedProjects(data.projects.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, [data.projects]);

  const displayProjects = featuredProjects.length > 0 ? featuredProjects : data.projects.slice(0, 3);

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

'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/app/components/ThemeProvider';
import { USER_DATA } from '@/lib/data';
import { applyContentToUserData } from '@/lib/content';
import { useContent } from '@/app/hooks/useContent';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { ProjectCard } from '@/app/components/ProjectCard';
import { Project } from '@/lib/types';

export default function Projects() {
  const { theme: t } = useTheme();
  const { content } = useContent();
  const copy = content.projects ?? {};
  const userData = applyContentToUserData(USER_DATA, content);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          setProjects(data.projects || []);
        } else {
          // Fallback to static data if API fails or empty
          setProjects(userData.projects);
        }
      } catch (e) {
        console.error("Failed to fetch projects", e);
        setProjects(userData.projects);
      }
    };
    fetchProjects();
  }, [userData.projects]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${t.colors.bg}`}>
      <Navbar content={content} />

      <main className="max-w-5xl mx-auto px-6 md:px-8 py-16 pb-28">
        <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <h1 className={`text-5xl md:text-6xl font-extrabold tracking-tight mb-12 ${t.colors.highlight}`}>
            {copy.pageTitle ?? 'All Projects'}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(projects.length > 0 ? projects : userData.projects).map((project, i) => (
              <ProjectCard
                key={i}
                project={project}
                theme={t}
                delay={200 + (i * 100)}
              />
            ))}
          </div>

          <div className={`mt-16 p-8 rounded-2xl text-center ${t.colors.surface} border ${t.colors.border}`}>
            <h2 className={`text-2xl font-bold mb-4 ${t.colors.highlight}`}>
              {copy.ctaTitle ?? 'Want to collaborate?'}
            </h2>
            <p className={`mb-6 ${t.colors.subtext}`}>
              {copy.ctaBody ?? "I'm always interested in working on exciting projects. Feel free to reach out!"}
            </p>
            <a
              href="/contact"
              className={`inline-block px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 ${t.colors.accent === 'text-[#89b4fa]' ? 'bg-[#89b4fa] text-[#1e1e2e]' : 'bg-[#1e66f5] text-white'}`}
            >
              {copy.ctaButton ?? 'Get in Touch'}
            </a>
          </div>
        </div>
      </main>

      <Footer data={userData} theme={t} content={content} />
    </div>
  );
}

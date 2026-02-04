'use client';

import { useTheme } from './ThemeProvider';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ProjectCard } from './ProjectCard';
import type { ContentMap, Project, UserData } from '@/lib/types';

export const ProjectsClient = ({
    content,
    userData,
    projects,
    stats,
    slug = 'projects',
}: {
    content: ContentMap;
    userData: UserData;
    projects: Project[];
    stats?: { views: number; clicks: number; commits: number };
    slug?: string;
}) => {
    const { theme } = useTheme();
    const copy = { ...content.projects, ...(content[slug ?? 'projects'] ?? {}) };

    return (
        <div className={`min-h-screen transition-colors duration-500 selection:bg-blue-500 selection:text-white ${theme.colors.bg}`}>
            <Navbar content={content} />

            <main className="max-w-5xl mx-auto px-6 md:px-8 py-16 pb-28">
                <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    <h1 className={`text-5xl md:text-6xl font-extrabold tracking-tight mb-12 ${theme.colors.highlight}`}>
                        {copy.pageTitle ?? 'All Projects'}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, i) => (
                            <ProjectCard
                                key={i}
                                project={project}
                                theme={theme}
                                delay={200 + (i * 100)}
                            />
                        ))}
                    </div>

                    <div className={`mt-16 p-8 rounded-2xl text-center ${theme.colors.surface} border ${theme.colors.border}`}>
                        <h2 className={`text-2xl font-bold mb-4 ${theme.colors.highlight}`}>
                            {copy.ctaTitle ?? 'Want to collaborate?'}
                        </h2>
                        <p className={`mb-6 ${theme.colors.subtext}`}>
                            {copy.ctaBody ?? "I'm always interested in working on exciting projects. Feel free to reach out!"}
                        </p>
                        <a
                            href="/contact"
                            className={`inline-block px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 ${theme.colors.accent === 'text-[#89b4fa]' ? 'bg-[#89b4fa] text-[#1e1e2e]' : 'bg-[#1e66f5] text-white'}`}
                        >
                            {copy.ctaButton ?? 'Get in Touch'}
                        </a>
                    </div>
                </div>
            </main>

            <Footer data={userData} theme={theme} content={content} stats={stats} />
        </div>
    );
};

'use client';

import { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { FeaturedProjects } from './FeaturedProjects';
import { Dashboard } from './Dashboard';
import { Footer } from './Footer';
import type { ContentMap, Project, UserData } from '@/lib/types';

export const HomeClient = ({
    content,
    userData,
    featuredProjects,
    stats,
}: {
    content: ContentMap;
    userData: UserData;
    featuredProjects: Project[];
    stats?: { views: number; clicks: number; commits: number };
}) => {
    const { theme } = useTheme();
    const [clickCount, setClickCount] = useState(0);

    const handleCounterClick = () => {
        setClickCount((prev) => prev + 1);
    };

    return (
        <div className={`min-h-screen transition-colors duration-500 selection:bg-blue-500 selection:text-white ${theme.colors.bg}`}>
            <Navbar content={content} />

            <main className="max-w-5xl mx-auto px-4 md:px-8 pb-20 md:pb-28">
                <HeroSection data={userData} theme={theme} content={content} />
                <FeaturedProjects
                    data={userData}
                    theme={theme}
                    content={content}
                    projects={featuredProjects}
                />
                <Dashboard
                    data={userData}
                    theme={theme}
                    clickCount={clickCount}
                    onCounterClick={handleCounterClick}
                    content={content}
                />
            </main>

            <Footer data={userData} theme={theme} content={content} stats={stats} />
        </div>
    );
};

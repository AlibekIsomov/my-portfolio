'use client';

import { useState } from 'react';
import { useTheme } from './components/ThemeProvider';
import { USER_DATA } from '@/lib/data';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedProjects } from './components/FeaturedProjects';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';
import { useContent } from './hooks/useContent';
import { applyContentToUserData } from '@/lib/content';

export default function Home() {
  const { theme: t } = useTheme();
  const [clickCount, setClickCount] = useState(0);
  const { content } = useContent();
  const userData = applyContentToUserData(USER_DATA, content);

  const handleCounterClick = () => {
    setClickCount(prev => prev + 1);
  };

  return (
    <>
      <div className={`min-h-screen transition-colors duration-500 selection:bg-blue-500 selection:text-white ${t.colors.bg}`}>
        <Navbar content={content} />

        <main className="max-w-5xl mx-auto px-4 md:px-8 pb-20 md:pb-28">
          <HeroSection data={userData} theme={t} content={content} />
          <FeaturedProjects data={userData} theme={t} content={content} />
          <Dashboard data={userData} theme={t} clickCount={clickCount} onCounterClick={handleCounterClick} content={content} />
        </main>

        <Footer data={userData} theme={t} content={content} />
      </div>
    </>
  );
}

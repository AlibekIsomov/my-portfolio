'use client';

import { useState } from 'react';
import { THEMES } from '@/lib/theme';
import { USER_DATA } from '@/lib/data';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedProjects } from './components/FeaturedProjects';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';
import { useContent } from './hooks/useContent';
import { applyContentToUserData } from '@/lib/content';

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState<'mocha' | 'latte'>('mocha');
  const [clickCount, setClickCount] = useState(0);
  const { content } = useContent();
  const userData = applyContentToUserData(USER_DATA, content);
  
  const t = THEMES[currentTheme];

  const handleCounterClick = () => {
    setClickCount(prev => prev + 1);
  };

  return (
    <>
      <div className={`min-h-screen transition-colors duration-500 selection:bg-blue-500 selection:text-white ${t.colors.bg}`}>
        <Navbar currentTheme={currentTheme} onThemeChange={setCurrentTheme} theme={t} content={content} />
        
        <main className="max-w-5xl mx-auto px-6 md:px-8 pb-28">
          <HeroSection data={userData} theme={t} content={content} />
          <FeaturedProjects data={userData} theme={t} content={content} />
          <Dashboard data={userData} theme={t} clickCount={clickCount} onCounterClick={handleCounterClick} content={content} />
        </main>

        <Footer data={userData} theme={t} content={content} />
      </div>
    </>
  );
}

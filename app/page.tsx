'use client';

import { useState } from 'react';
import { THEMES } from '@/lib/theme';
import { USER_DATA } from '@/lib/data';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedProjects } from './components/FeaturedProjects';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState<'mocha' | 'latte'>('mocha');
  const [clickCount, setClickCount] = useState(0);
  
  const t = THEMES[currentTheme];

  const handleCounterClick = () => {
    setClickCount(prev => prev + 1);
  };

  return (
    <>
      <div className={`min-h-screen transition-colors duration-500 selection:bg-blue-500 selection:text-white ${t.colors.bg}`}>
        <Navbar currentTheme={currentTheme} onThemeChange={setCurrentTheme} theme={t} />
        
        <main className="max-w-5xl mx-auto px-6 md:px-8 pb-28">
          <HeroSection data={USER_DATA} theme={t} />
          <FeaturedProjects data={USER_DATA} theme={t} />
          <Dashboard data={USER_DATA} theme={t} clickCount={clickCount} onCounterClick={handleCounterClick} />
        </main>

        <Footer data={USER_DATA} theme={t} />
      </div>
    </>
  );
}

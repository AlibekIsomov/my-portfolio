'use client';

import { useState } from 'react';
import { THEMES } from '@/lib/theme';
import { USER_DATA } from '@/lib/data';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { ProjectCard } from '@/app/components/ProjectCard';

export default function Projects() {
  const [currentTheme, setCurrentTheme] = useState<'mocha' | 'latte'>('mocha');
  const t = THEMES[currentTheme];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${t.colors.bg}`}>
      <Navbar currentTheme={currentTheme} onThemeChange={setCurrentTheme} theme={t} />
      
      <main className="max-w-5xl mx-auto px-6 md:px-8 py-16 pb-28">
        <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <h1 className={`text-5xl md:text-6xl font-extrabold tracking-tight mb-12 ${t.colors.highlight}`}>All Projects</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {USER_DATA.projects.map((project, i) => (
              <ProjectCard 
                key={i} 
                project={project} 
                theme={t} 
                delay={200 + (i * 100)} 
              />
            ))}
          </div>

          <div className={`mt-16 p-8 rounded-2xl text-center ${t.colors.surface} border ${t.colors.border}`}>
            <h2 className={`text-2xl font-bold mb-4 ${t.colors.highlight}`}>Want to collaborate?</h2>
            <p className={`mb-6 ${t.colors.subtext}`}>
              I'm always interested in <span className={t.colors.highlight}>working on exciting projects</span>. Feel free to reach out!
            </p>
            <a 
              href="/contact" 
              className={`inline-block px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 ${t.colors.accent === 'text-[#89b4fa]' ? 'bg-[#89b4fa] text-[#1e1e2e]' : 'bg-[#1e66f5] text-white'}`}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </main>

      <Footer data={USER_DATA} theme={t} />
    </div>
  );
}

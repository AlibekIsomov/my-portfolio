'use client';

import { useState } from 'react';
import { THEMES } from '@/lib/theme';
import { USER_DATA } from '@/lib/data';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';

export default function About() {
  const [currentTheme, setCurrentTheme] = useState<'mocha' | 'latte'>('mocha');
  const t = THEMES[currentTheme];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${t.colors.bg}`}>
      <Navbar currentTheme={currentTheme} onThemeChange={setCurrentTheme} theme={t} />
      
      <main className="max-w-5xl mx-auto px-6 md:px-8 py-16 pb-28">
        <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <h1 className={`text-5xl md:text-6xl font-extrabold tracking-tight mb-8 ${t.colors.text}`}>About Me</h1>
          
          <div className="space-y-8">
            <p className={`text-lg leading-relaxed ${t.colors.subtext}`}>
              {USER_DATA.bio}
            </p>
            
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 p-8 rounded-2xl ${t.colors.surface} border ${t.colors.border}`}>
              <div>
                <h2 className={`text-2xl font-bold mb-4 ${t.colors.highlight}`}>Background</h2>
                <p className={`${t.colors.subtext}`}>
                  I'm a <span className={t.colors.highlight}>passionate developer</span> with a focus on building scalable, performant web applications.
                  My journey in tech started with a curiosity about how things work, which led me to dive deep into software engineering.
                </p>
              </div>
              
              <div>
                <h2 className={`text-2xl font-bold mb-4 ${t.colors.highlight}`}>Interests</h2>
                <ul className={`space-y-2 ${t.colors.subtext}`}>
                  <li>• <span className={t.colors.highlight}>Full-stack web development</span></li>
                  <li>• Open source contributions</li>
                  <li>• Developer experience & tooling</li>
                  <li>• Clean code architecture</li>
                  <li>• Performance optimization</li>
                </ul>
              </div>
            </div>

            <div className={`p-8 rounded-2xl ${t.colors.surface} border ${t.colors.border}`}>
              <h2 className={`text-2xl font-bold mb-6 ${t.colors.highlight}`}>Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className={`font-bold mb-3 ${t.colors.highlight}`}>Languages</h3>
                  <p className={t.colors.subtext}>Go, JavaScript, TypeScript, Python</p>
                </div>
                <div>
                  <h3 className={`font-bold mb-3 ${t.colors.highlight}`}>Frontend</h3>
                  <p className={t.colors.subtext}>React, Next.js, Tailwind CSS, Vite</p>
                </div>
                <div>
                  <h3 className={`font-bold mb-3 ${t.colors.highlight}`}>Backend & DevOps</h3>
                  <p className={t.colors.subtext}>Node.js, Docker, Redis, PostgreSQL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer data={USER_DATA} theme={t} />
    </div>
  );
}

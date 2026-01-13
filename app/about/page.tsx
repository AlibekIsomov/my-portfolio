'use client';

import { useState } from 'react';
import { THEMES } from '@/lib/theme';
import { USER_DATA } from '@/lib/data';
import { applyContentToUserData } from '@/lib/content';
import { useContent } from '@/app/hooks/useContent';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';

export default function About() {
  const [currentTheme, setCurrentTheme] = useState<'mocha' | 'latte'>('mocha');
  const { content } = useContent();
  const t = THEMES[currentTheme];
  const copy = content.about ?? {};
  const userData = applyContentToUserData(USER_DATA, content);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${t.colors.bg}`}>
      <Navbar currentTheme={currentTheme} onThemeChange={setCurrentTheme} theme={t} content={content} />
      
      <main className="max-w-5xl mx-auto px-6 md:px-8 py-16 pb-28">
        <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <h1 className={`text-5xl md:text-6xl font-extrabold tracking-tight mb-8 ${t.colors.text}`}>
            {copy.pageTitle ?? 'About Me'}
          </h1>
          
          <div className="space-y-8">
            <p className={`text-lg leading-relaxed ${t.colors.subtext}`}>
              {userData.bio}
            </p>
            
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 p-8 rounded-2xl ${t.colors.surface} border ${t.colors.border}`}>
              <div>
                <h2 className={`text-2xl font-bold mb-4 ${t.colors.highlight}`}>{copy.backgroundTitle ?? 'Background'}</h2>
                <p className={`${t.colors.subtext}`}>
                  {copy.backgroundBody ??
                    "I'm a passionate developer with a focus on building scalable, performant web applications. My journey in tech started with a curiosity about how things work, which led me to dive deep into software engineering."}
                </p>
              </div>
              
              <div>
                <h2 className={`text-2xl font-bold mb-4 ${t.colors.highlight}`}>{copy.interestsTitle ?? 'Interests'}</h2>
                <ul className={`space-y-2 ${t.colors.subtext}`}>
                  <li>• <span className={t.colors.highlight}>{copy.interestsItem1 ?? 'Full-stack web development'}</span></li>
                  <li>• {copy.interestsItem2 ?? 'Open source contributions'}</li>
                  <li>• {copy.interestsItem3 ?? 'Developer experience & tooling'}</li>
                  <li>• {copy.interestsItem4 ?? 'Clean code architecture'}</li>
                  <li>• {copy.interestsItem5 ?? 'Performance optimization'}</li>
                </ul>
              </div>
            </div>

            <div className={`p-8 rounded-2xl ${t.colors.surface} border ${t.colors.border}`}>
              <h2 className={`text-2xl font-bold mb-6 ${t.colors.highlight}`}>{copy.skillsTitle ?? 'Skills'}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className={`font-bold mb-3 ${t.colors.highlight}`}>{copy.skillsLanguagesTitle ?? 'Languages'}</h3>
                  <p className={t.colors.subtext}>{copy.skillsLanguagesBody ?? 'Go, JavaScript, TypeScript, Python'}</p>
                </div>
                <div>
                  <h3 className={`font-bold mb-3 ${t.colors.highlight}`}>{copy.skillsFrontendTitle ?? 'Frontend'}</h3>
                  <p className={t.colors.subtext}>{copy.skillsFrontendBody ?? 'React, Next.js, Tailwind CSS, Vite'}</p>
                </div>
                <div>
                  <h3 className={`font-bold mb-3 ${t.colors.highlight}`}>{copy.skillsBackendTitle ?? 'Backend & DevOps'}</h3>
                  <p className={t.colors.subtext}>{copy.skillsBackendBody ?? 'Node.js, Docker, Redis, PostgreSQL'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer data={userData} theme={t} content={content} />
    </div>
  );
}

'use client';

import { useTheme } from '@/app/components/ThemeProvider';
import { USER_DATA } from '@/lib/data';
import { applyContentToUserData } from '@/lib/content';
import { useContent } from '@/app/hooks/useContent';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { SpotlightCard } from '@/app/components/ui/SpotlightCard';

export default function About() {
  const { theme: t } = useTheme();
  const { content } = useContent();
  const copy = content.about ?? {};
  const userData = applyContentToUserData(USER_DATA, content);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${t.colors.bg}`}>
      <Navbar content={content} />

      <main className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-16 pb-24 md:pb-28">
        <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <h1 className={`text-4xl md:text-6xl font-extrabold tracking-tight mb-6 md:mb-8 ${t.colors.highlight}`}>
            {copy.pageTitle ?? 'About Me'}
          </h1>

          <div className="space-y-8">
            <p className={`text-lg md:text-xl leading-relaxed ${t.colors.subtext}`}>
              {userData.bio}
            </p>

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 mt-12`}>
              <SpotlightCard theme={t} contentClassName="p-8">
                <h2 className={`text-2xl font-bold mb-4 ${t.colors.highlight}`}>{copy.backgroundTitle ?? 'Background'}</h2>
                <p className={`${t.colors.subtext}`}>
                  {copy.backgroundBody ??
                    "A passionate developer who loves exploring new technologies. I started coding when I realized I could build things that live on the internet."}
                </p>
              </SpotlightCard>

              <SpotlightCard theme={t} contentClassName="p-8">
                <h2 className={`text-2xl font-bold mb-4 ${t.colors.highlight}`}>{copy.sTitle ?? 'Interests'}</h2>
                <ul className={`space-y-2 ${t.colors.subtext}`}>
                  <li>• {copy.interestsItem1 ?? 'Full-stack web development'}</li>
                  <li>• {copy.interestsItem2 ?? 'System design & architecture'}</li>
                  <li>• {copy.interestsItem3 ?? 'Cloud infrastructure'}</li>
                  <li>• {copy.interestsItem4 ?? 'Clean code architecture'}</li>
                  <li>• {copy.interestsItem5 ?? 'Performance optimization'}</li>
                </ul>
              </SpotlightCard>
            </div>

            <SpotlightCard theme={t} contentClassName="p-8">
              <h2 className={`text-2xl font-bold mb-6 ${t.colors.highlight}`}>{copy.skillsTitle ?? 'Skills'}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className={`font-bold mb-2 ${t.colors.text}`}>{copy.skillsFrontendLabel ?? 'Frontend'}</h3>
                  <p className={t.colors.subtext}>{copy.skillsFrontendBody ?? 'React, Next.js, Tailwind, TypeScript'}</p>
                </div>
                <div>
                  <h3 className={`font-bold mb-2 ${t.colors.text}`}>{copy.skillsBackendLabel ?? 'Backend'}</h3>
                  <p className={t.colors.subtext}>{copy.skillsBackendBody ?? 'Node.js, Go, Python, PostgreSQL'}</p>
                </div>
                <div>
                  <h3 className={`font-bold mb-2 ${t.colors.text}`}>{copy.skillsToolsLabel ?? 'Tools'}</h3>
                  <p className={t.colors.subtext}>{copy.skillsToolsBody ?? 'Git, Docker, VS Code, Linux'}</p>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </main>

      <Footer data={userData} theme={t} content={content} />
    </div>
  );
}

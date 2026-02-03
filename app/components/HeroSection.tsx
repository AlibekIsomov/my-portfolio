'use client';

import { Github, Linkedin, Zap, ArrowRight } from 'lucide-react';
import { Typewriter } from './ui/Typewriter';
import { interpolate } from '@/lib/content';
import type { ContentMap, Theme, UserData } from '@/lib/types';

export const HeroSection = ({ data, theme, content }: { data: UserData; theme: Theme; content: ContentMap }) => {
  const copy = content.home ?? {};

  return (
    <header className="py-20 md:py-32 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
      <div className="flex flex-col gap-8">
        <div className="inline-block w-fit hover:scale-105 transition-transform duration-300 animate-scale-in" style={{ animationDelay: '200ms' }}>
          <span className={`text-xs md:text-sm font-mono px-3 py-1.5 rounded-full border ${theme.colors.border} ${theme.colors.accent} bg-opacity-10 flex items-center gap-2 hover:animate-glow`}>
            <Zap size={14} className="fill-current animate-float" />
            {copy.heroBadgePrefix ?? 'Currently working @'} {data.company}
          </span>
        </div>

        {/* Main heading with monospace styling */}
        <div className="space-y-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-mono font-bold tracking-wide ${theme.colors.text}`}>
            {copy.heroGreeting ?? "Hey! I'm"}{' '}
            <span className={`${theme.colors.highlight} text-nowrap`}>
              <Typewriter
                text={data.name}
                initialText={`${data.name.split(' ')[0]} ${data.name.split(' ')[1][0]}z${data.name.split(' ')[1].slice(2)}`}
                speed={80}
                deleteSpeed={50}
              />
            </span>
          </h1>

          <p className={`text-base md:text-lg font-mono leading-relaxed max-w-3xl ${theme.colors.subtext}`}>
            {interpolate(copy.heroRoleLine ?? "I'm currently working as a {role} @ {company}.", {
              role: data.role,
              company: data.company,
            })}{' '}
            {interpolate(copy.heroTrustedLine ?? "I've written software that is trusted by {trusted}.", {
              trusted: copy.heroTrustedEmphasis ?? 'major organizations',
            })}{' '}
            {copy.heroClosing ??
              'Seeing code I wrote actually help people at scale is what keeps me building. Currently building AI that helps people articulate their ideas and share them at scale.'}
          </p>
        </div>

        {/* Action buttons and links */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <a
            href={data.social?.github || '#'}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-mono transition-all hover:scale-105 active:scale-95 ${theme.colors.surface} ${theme.colors.text} hover:brightness-110 shadow-sm border ${theme.colors.border} hover:animate-glow`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={18} /> {copy.heroGithubLabel ?? 'GitHub'}
          </a>
          <a
            href={data.social?.linkedin || '#'}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-mono transition-all hover:scale-105 active:scale-95 ${theme.colors.surface} ${theme.colors.text} hover:brightness-110 shadow-sm border ${theme.colors.border} hover:animate-glow`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={18} /> {copy.heroLinkedinLabel ?? 'LinkedIn'}
          </a>
          <a
            href="/about"
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-mono transition-all hover:scale-105 active:scale-95 ml-auto ${theme.colors.accent} hover:animate-glow`}
          >
            {copy.heroMoreLabel ?? 'More about me'} <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </header>
  );
};

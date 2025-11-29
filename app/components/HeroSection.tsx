'use client';

import { Github, Linkedin, Zap, ArrowRight } from 'lucide-react';
import { Theme, UserData } from '@/lib/types';

export const HeroSection = ({ data, theme }: { data: UserData; theme: Theme }) => (
  <header className="py-20 md:py-32 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
    <div className="flex flex-col gap-8">
      <div className="inline-block w-fit hover:scale-105 transition-transform duration-300">
        <span className={`text-xs md:text-sm font-mono px-3 py-1.5 rounded-full border ${theme.colors.border} ${theme.colors.accent} bg-opacity-10 flex items-center gap-2`}>
          <Zap size={14} className="fill-current" />
          Currently building @ {data.company}
        </span>
      </div>
      
      {/* Main heading with monospace styling */}
      <div className="space-y-4">
        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-mono font-bold tracking-wide ${theme.colors.text}`}>
          Hey! I'm{' '}
          <span className={`${theme.colors.accent}`} style={{ textDecoration: 'underline', textDecorationColor: theme.colors.accent === 'text-[#89b4fa]' ? '#f9e2af' : '#f38ba8', textDecorationThickness: '3px', textUnderlineOffset: '4px' }}>
            {data.name}
          </span>
        </h1>
        
        <p className={`text-base md:text-lg font-mono leading-relaxed max-w-3xl ${theme.colors.subtext}`}>
          I'm currently working as a {data.role} @{' '}
          <span className={`${theme.colors.accent} underline`}>{data.company}</span>. I've written
          software that is trusted by{' '}
          <span className={`${theme.colors.accent} underline`}>major organizations</span>. Seeing code I
          wrote actually help people at scale is what keeps me building. Currently building AI that helps people articulate
          their ideas and share them at scale.
        </p>
      </div>

      {/* Action buttons and links */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <a 
          href={data.social?.github || '#'} 
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-mono transition-all hover:scale-105 active:scale-95 ${theme.colors.surface} ${theme.colors.text} hover:brightness-110 shadow-sm border ${theme.colors.border}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github size={18} /> GitHub
        </a>
        <a 
          href={data.social?.linkedin || '#'} 
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-mono transition-all hover:scale-105 active:scale-95 ${theme.colors.surface} ${theme.colors.text} hover:brightness-110 shadow-sm border ${theme.colors.border}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin size={18} /> LinkedIn
        </a>
        <a 
          href="#"
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-mono transition-all hover:scale-105 active:scale-95 ml-auto ${theme.colors.accent}`}
        >
          More about me <ArrowRight size={18} />
        </a>
      </div>
    </div>
  </header>
);

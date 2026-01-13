'use client';

import { interpolate } from '@/lib/content';
import type { ContentMap, Theme, UserData } from '@/lib/types';

export const Footer = ({ data, theme, content }: { data: UserData; theme: Theme; content: ContentMap }) => {
  const footerLine = content.global?.footerLine ?? '© 2025 {name} - All Services Nominal';
  const footerStats = content.global?.footerStats ?? '{views} views • {commits} commits';

  return (
    <footer className={`border-t py-12 text-left text-sm ${theme.colors.surface} ${theme.colors.border} ${theme.colors.subtext}`}>
      <div className="flex flex-col gap-4 animate-fade-in-up ml-5" style={{ animationDelay: '800ms' }}>
        <p className="font-medium font-mono">
          {interpolate(footerLine, { name: data.name })}
        </p>
        <p className="opacity-40 font-mono text-xs tracking-wider">
          {interpolate(footerStats, { views: data.stats.views, commits: data.stats.commits })}
        </p>
      </div>
    </footer>
  );
};

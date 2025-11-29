'use client';

import { Theme, UserData } from '@/lib/types';

export const Footer = ({ data, theme }: { data: UserData; theme: Theme }) => (
  <footer className={`border-t py-12 text-center text-sm ${theme.colors.surface} ${theme.colors.border} ${theme.colors.subtext}`}>
    <div className="flex flex-col gap-4 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
      <p className="font-medium font-mono">© 2025 {data.name} - All Services Nominal</p>
      <p className="opacity-40 font-mono text-xs tracking-wider">{data.stats.views} views • {data.stats.commits} commits</p>
    </div>
  </footer>
);

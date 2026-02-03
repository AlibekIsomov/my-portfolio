'use client';

import { useEffect, useState, useRef } from 'react';
import { interpolate } from '@/lib/content';
import type { ContentMap, Theme, UserData } from '@/lib/types';
import { Github, Linkedin, Mail, ArrowUpRight, Activity } from 'lucide-react';

interface FooterProps {
  data: UserData;
  theme: Theme;
  content: ContentMap;
  stats?: { views: number; clicks: number; commits: number };
}

export const Footer = ({ data, theme, content, stats }: FooterProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Trigger view count increment once per session
    const visited = sessionStorage.getItem('visited');
    if (!visited) {
      sessionStorage.setItem('visited', 'true');
      fetch('/api/stats/views', { method: 'POST' }).catch(() => { });
    }
  }, []);

  const footerLine = content.global?.footerLine ?? '© 2025 {name} - All Services Nominal';

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' },
  ];

  const socials = [
    { icon: Github, href: data.social?.github, label: 'GitHub' },
    { icon: Linkedin, href: data.social?.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${data.email}`, label: 'Email' },
  ];

  return (
    <footer className={`border-t py-16 transition-colors duration-500 ${theme.colors.surface} ${theme.colors.border}`}>
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2 space-y-4">
            <h3 className={`text-xl font-bold font-mono ${theme.colors.highlight}`}>
              {data.name}
            </h3>
            <p className={`max-w-sm leading-relaxed ${theme.colors.subtext}`}>
              {data.bio}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className={`font-mono text-sm font-semibold uppercase tracking-wider ${theme.colors.text}`}>
              Navigation
            </h4>
            <ul className="space-y-2">
              {links.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`text-sm hover:underline decoration-1 underline-offset-4 ${theme.colors.subtext} hover:${theme.colors.highlight} transition-colors`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className={`font-mono text-sm font-semibold uppercase tracking-wider ${theme.colors.text}`}>
              Connect
            </h4>
            <div className="flex gap-4">
              {socials.map((social, i) => (
                social.href && (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg border transition-all hover:-translate-y-1 ${theme.colors.border} hover:border-gray-400 dark:hover:border-gray-500 ${theme.colors.subtext} hover:${theme.colors.highlight}`}
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </a>
                )
              ))}
            </div>
          </div>
        </div>

        <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono opacity-60 ${theme.colors.border} ${theme.colors.subtext}`}>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${theme.colors.accent === 'text-[#89b4fa]' ? 'bg-blue-400' : 'bg-green-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${theme.colors.accent === 'text-[#89b4fa]' ? 'bg-blue-500' : 'bg-green-500'}`}></span>
            </span>
            {interpolate(footerLine, { name: data.name })}
          </div>

          {mounted && (
            <div className="flex items-center gap-6 animate-fade-in">
              <div className="flex items-center gap-2" title="Total Page Views">
                <Activity size={14} />
                <span>{(stats?.views ?? 0).toLocaleString()} views</span>
              </div>
              <div className="flex items-center gap-2" title="Github Commits (Approx)">
                <Github size={14} />
                <span>{(stats?.commits ?? 1240).toLocaleString()} commits</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

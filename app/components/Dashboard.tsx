'use client';

import { useState, useEffect, useRef } from 'react';
import { GitCommit, Code, Cpu, MapPin, Terminal } from 'lucide-react';
import type { ContentMap, Theme, UserData } from '@/lib/types';
import { SpotlightCard } from './ui/SpotlightCard';

export const Dashboard = ({
  data,
  theme,
  clickCount,
  onCounterClick,
  content,
}: {
  data: UserData;
  theme: Theme;
  clickCount: number;
  onCounterClick: () => void;
  content: ContentMap;
}) => {
  const copy = content.home ?? {};

  // Use local state for immediate feedback, but sync with DB
  const [localClicks, setLocalClicks] = useState(clickCount);
  const [pendingClicks, setPendingClicks] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchClicks = async () => {
      try {
        const res = await fetch('/api/stats/clicks');
        if (res.ok) {
          const data = await res.json();
          setLocalClicks(data.clicks);
        }
      } catch (e) {
        console.error('Failed to fetch clicks:', e);
      }
    };
    fetchClicks();
  }, []);

  // Debounced save
  useEffect(() => {
    if (pendingClicks === 0) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      const amountToSend = pendingClicks;
      setPendingClicks(0); // Reset pending immediately to avoid double send

      try {
        await fetch('/api/stats/clicks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: amountToSend }),
        });
      } catch (e) {
        console.error('Failed to update clicks:', e);
      }
    }, 1000); // Wait 1 second after last click

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [pendingClicks]);

  const [recentCommits, setRecentCommits] = useState<any[]>([]); // eslint-disable-line @typescript-eslint/no-explicit-any

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const res = await fetch('/api/stats/commits');
        if (res.ok) {
          const data = await res.json();
          setRecentCommits(data.commits);
        }
      } catch (e) {
        console.error('Failed to fetch commits:', e);
      }
    };
    fetchCommits();
  }, []);

  const handleClick = () => {
    // Optimistic update
    setLocalClicks(prev => prev + 1);
    setPendingClicks(prev => prev + 1);
    onCounterClick();
  };

  return (
    <section className="opacity-0 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
      <div className="flex items-center gap-3 mb-6 md:mb-10">
        <Terminal size={20} className={`${theme.colors.accent} animate-float md:w-6 md:h-6`} />
        <h2 className={`text-2xl md:text-3xl font-bold font-mono ${theme.colors.highlight}`}>
          {content.global?.dashboardTitle ?? 'Dashboard'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(160px,auto)]">

        {/* Widget 1: Connect */}
        <SpotlightCard
          theme={theme}
          className={`md:col-span-2 transition-all hover:shadow-lg hover:animate-glow opacity-0 animate-fade-in-up`}
          contentClassName="p-6 md:p-8 flex flex-col justify-between"
          style={{ animationDelay: '550ms' }}
        >
          <div>
            <h3 className={`text-xl md:text-2xl font-bold font-mono ${theme.colors.highlight}`}>
              {copy.dashboardConnectTitle ?? "Let's Connect"}
            </h3>
            <p className={`mt-2 md:mt-3 text-base md:text-lg font-mono ${theme.colors.subtext}`}>
              {copy.dashboardConnectBody ?? 'Always open to interesting projects and conversations.'}
            </p>
          </div>
          <a
            href="/contact"
            className={`w-fit mt-6 px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-bold font-mono text-sm md:text-base transition-all hover:scale-105 active:scale-95 shadow-lg hover:animate-glow ${theme.colors.accent === 'text-[#89b4fa]' ? 'bg-[#89b4fa] text-[#1e1e2e]' : 'bg-[#1e66f5] text-white'}`}
          >
            {copy.dashboardConnectButton ?? 'Get in Touch'}
          </a>
        </SpotlightCard>

        {/* Widget 2: Location */}
        <SpotlightCard
          theme={theme}
          className={`md:col-span-1 transition-all hover:-translate-y-1 hover:shadow-lg opacity-0 animate-fade-in-up hover:animate-glow`}
          contentClassName="p-8 flex flex-col items-center justify-center text-center"
          style={{ animationDelay: '600ms' }}
        >
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${theme.colors.surfaceHighlight} group-hover:animate-scale-in transition-all`}>
            <MapPin size={32} className={`${theme.colors.accent} `} />
          </div>
          <span className={`text-xs uppercase font-bold tracking-widest opacity-50 mb-2 font-mono ${theme.colors.text}`}>
            {copy.dashboardBasedInLabel ?? 'Based In'}
          </span>
          <span className={`text-xl font-bold font-mono ${theme.colors.highlight}`}>{data.location}</span>
        </SpotlightCard>

        {/* Widget 3: Counter (Interactive) */}
        <SpotlightCard
          theme={theme}
          onClick={handleClick}
          className={`md:col-span-1 cursor-pointer select-none transition-all active:scale-95 hover:scale-[1.02] hover:shadow-xl opacity-0 animate-fade-in-up hover:animate-glow`}
          contentClassName="p-6 md:p-8 flex flex-col items-center justify-center text-center"
          style={{ animationDelay: '650ms' }}
        >
          <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 md:mb-6 ${theme.colors.surfaceHighlight} group-hover:animate-scale-in transition-all`}>
            <Cpu className={`${localClicks > 0 ? 'text-red-400 animate-pulse' : theme.colors.accent} w-6 h-6 md:w-8 md:h-8`} />
          </div>
          <span className={`text-3xl md:text-5xl font-mono font-bold mb-1 ${theme.colors.highlight}`}>{localClicks}</span>
          <span className={`text-[10px] md:text-xs uppercase font-bold tracking-widest opacity-50 font-mono ${theme.colors.text}`}>
            {copy.dashboardClicksLabel ?? 'Clicks'}
          </span>
          <span className="text-[10px] opacity-30 mt-2 md:mt-3 font-mono">
            {copy.dashboardClicksHint ?? 'Try clicking me!'}
          </span>
        </SpotlightCard>

        {/* Widget 4: Recent Commits */}
        <SpotlightCard
          theme={theme}
          className={`md:col-span-2 transition-all hover:shadow-lg opacity-0 animate-fade-in-up hover:animate-glow`}
          contentClassName="p-8"
          style={{ animationDelay: '700ms' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <GitCommit size={20} className={`${theme.colors.accent}`} />
            <h3 className={`text-lg font-bold font-mono ${theme.colors.highlight}`}>
              {copy.dashboardCommitsTitle ?? 'Recent Activity'}
            </h3>
          </div>
          <div className="space-y-4">
            {recentCommits.length > 0 ? (
              recentCommits.map((commit) => (
                <a
                  key={commit.id}
                  href={commit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-between items-start text-sm font-mono group cursor-pointer hover:opacity-80 transition-all"
                >
                  <div className="flex flex-col overflow-hidden mr-4">
                    <span className={`truncate transition-colors group-hover:${theme.colors.highlight} ${theme.colors.subtext}`}>
                      {commit.message}
                    </span>
                    <span className="text-[10px] opacity-40">{new Date(commit.date).toLocaleDateString()}</span>
                  </div>
                  <span className={`${theme.colors.accent} whitespace-nowrap opacity-80 text-xs border border-current px-2 py-0.5 rounded-full`}>
                    {commit.repo}
                  </span>
                </a>
              ))
            ) : (
              <p className={`text-sm opacity-50 ${theme.colors.subtext}`}>No recent commits found.</p>
            )}
          </div>
        </SpotlightCard>

        {/* Widget 5: Tech Stack / Stats */}
        <SpotlightCard
          theme={theme}
          className={`md:col-span-2 transition-all hover:shadow-lg opacity-0 animate-fade-in-up hover:animate-glow`}
          contentClassName="p-8"
          style={{ animationDelay: '750ms' }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Code size={20} className={`${theme.colors.accent}`} />
            <h3 className={`text-lg font-bold font-mono ${theme.colors.highlight}`}>
              {copy.dashboardLanguageTitle}
            </h3>
          </div>

          {/* Bar Chart */}
          <div className="flex w-full h-6 rounded-full overflow-hidden mb-6 shadow-inner bg-opacity-20 bg-black group">
            <div className="h-full bg-[#89b4fa] w-[40%] transition-all duration-1000 ease-out hover:brightness-110 group-hover:animate-shimmer" title="Go" />
            <div className="h-full bg-[#f9e2af] w-[30%] transition-all duration-1000 ease-out hover:brightness-110 group-hover:animate-shimmer" title="JS" />
            <div className="h-full bg-[#cba6f7] w-[20%] transition-all duration-1000 ease-out hover:brightness-110 group-hover:animate-shimmer" title="TS" />
            <div className="h-full bg-[#45475a] w-[10%] transition-all duration-1000 ease-out hover:brightness-110 group-hover:animate-shimmer" title="Other" />
          </div>

          <div className="flex gap-6 flex-wrap text-sm font-mono">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#89b4fa] animate-pulse" /><span className={theme.colors.highlight}>{copy.dashboardLanguageGo ?? 'Go 40%'}</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#f9e2af] animate-pulse" /><span className={theme.colors.highlight}>{copy.dashboardLanguageJs ?? 'JS 30%'}</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#cba6f7] animate-pulse" /><span className={theme.colors.highlight}>{copy.dashboardLanguageTs ?? 'TS 20%'}</span></div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
};

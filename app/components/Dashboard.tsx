'use client';

import { GitCommit, Code, Cpu, MapPin, Terminal } from 'lucide-react';
import { Theme, UserData } from '@/lib/types';

export const Dashboard = ({ data, theme, clickCount, onCounterClick }: { data: UserData; theme: Theme; clickCount: number; onCounterClick: () => void }) => (
  <section className="opacity-0 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
    <div className="flex items-center gap-3 mb-10">
      <Terminal size={24} className={`${theme.colors.accent} animate-float`} />
      <h2 className={`text-3xl font-bold font-mono ${theme.colors.highlight}`}>Dashboard</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
      
      {/* Widget 1: Connect */}
      <div className={`md:col-span-2 p-8 rounded-3xl flex flex-col justify-between border transition-all hover:shadow-lg hover:animate-glow opacity-0 animate-fade-in-up ${theme.colors.surface} ${theme.colors.border}`} style={{ animationDelay: '550ms' }}>
        <div>
          <h3 className={`text-2xl font-bold font-mono ${theme.colors.highlight}`}>Let's Connect</h3>
          <p className={`mt-3 text-lg font-mono ${theme.colors.subtext}`}>Always open to interesting projects and conversations.</p>
        </div>
        <a 
          href={`mailto:${data.email || 'contact@example.com'}`}
          className={`w-fit mt-6 px-8 py-4 rounded-2xl font-bold font-mono transition-all hover:scale-105 active:scale-95 shadow-lg hover:animate-glow ${theme.colors.accent === 'text-[#89b4fa]' ? 'bg-[#89b4fa] text-[#1e1e2e]' : 'bg-[#1e66f5] text-white'}`}
        >
          Book a Chat
        </a>
      </div>

      {/* Widget 2: Location */}
      <div className={`md:col-span-1 p-8 rounded-3xl flex flex-col items-center justify-center text-center border transition-all hover:-translate-y-1 hover:shadow-lg opacity-0 animate-fade-in-up hover:animate-glow ${theme.colors.surface} ${theme.colors.border}`} style={{ animationDelay: '600ms' }}>
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${theme.colors.surfaceHighlight} group-hover:animate-scale-in transition-all`}>
          <MapPin size={32} className={`${theme.colors.accent} animate-float`} />
        </div>
        <span className={`text-xs uppercase font-bold tracking-widest opacity-50 mb-2 font-mono ${theme.colors.text}`}>Based In</span>
        <span className={`text-xl font-bold font-mono ${theme.colors.highlight}`}>{data.location}</span>
      </div>

      {/* Widget 3: Counter (Interactive) */}
      <div 
        onClick={onCounterClick}
        className={`md:col-span-1 p-8 rounded-3xl flex flex-col items-center justify-center text-center cursor-pointer select-none transition-all active:scale-95 hover:scale-[1.02] hover:shadow-xl border opacity-0 animate-fade-in-up hover:animate-glow ${theme.colors.surface} ${theme.colors.border}`}
        style={{ animationDelay: '650ms' }}
      >
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${theme.colors.surfaceHighlight} group-hover:animate-scale-in transition-all`}>
          <Cpu size={32} className={`${clickCount > 0 ? 'text-red-400 animate-pulse' : theme.colors.accent} animate-float`} />
        </div>
        <span className={`text-5xl font-mono font-bold mb-1 ${theme.colors.highlight}`}>{clickCount}</span>
        <span className={`text-xs uppercase font-bold tracking-widest opacity-50 font-mono ${theme.colors.text}`}>Clicks</span>
        <span className="text-[10px] opacity-30 mt-3 font-mono">Try clicking me!</span>
      </div>

      {/* Widget 4: Recent Commits */}
      <div className={`md:col-span-2 p-8 rounded-3xl border transition-all hover:shadow-lg opacity-0 animate-fade-in-up hover:animate-glow ${theme.colors.surface} ${theme.colors.border}`} style={{ animationDelay: '700ms' }}>
        <div className="flex items-center gap-3 mb-6">
          <GitCommit size={20} className={`${theme.colors.accent} animate-float`} />
          <h3 className={`text-lg font-bold font-mono ${theme.colors.highlight}`}>Recent Commits</h3>
        </div>
        <div className="space-y-4">
          {data.commits.map((commit) => (
            <div key={commit.id} className="flex justify-between items-start text-sm font-mono group cursor-default hover:opacity-80 transition-all">
              <span className={`truncate mr-4 transition-colors group-hover:${theme.colors.highlight} ${theme.colors.subtext}`}>{commit.message}</span>
              <span className="text-green-400 whitespace-nowrap opacity-80">{commit.change}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Widget 5: Tech Stack / Stats */}
      <div className={`md:col-span-2 p-8 rounded-3xl border transition-all hover:shadow-lg opacity-0 animate-fade-in-up hover:animate-glow ${theme.colors.surface} ${theme.colors.border}`} style={{ animationDelay: '750ms' }}>
        <div className="flex items-center gap-3 mb-8">
          <Code size={20} className={`${theme.colors.accent} animate-float`} />
          <h3 className={`text-lg font-bold font-mono ${theme.colors.highlight}`}>Language Stats</h3>
        </div>
        
        {/* Bar Chart */}
        <div className="flex w-full h-6 rounded-full overflow-hidden mb-6 shadow-inner bg-opacity-20 bg-black group">
          <div className="h-full bg-[#89b4fa] w-[40%] transition-all duration-1000 ease-out hover:brightness-110 group-hover:animate-shimmer" title="Go" />
          <div className="h-full bg-[#f9e2af] w-[30%] transition-all duration-1000 ease-out hover:brightness-110 group-hover:animate-shimmer" title="JS" />
          <div className="h-full bg-[#cba6f7] w-[20%] transition-all duration-1000 ease-out hover:brightness-110 group-hover:animate-shimmer" title="TS" />
          <div className="h-full bg-[#45475a] w-[10%] transition-all duration-1000 ease-out hover:brightness-110 group-hover:animate-shimmer" title="Other" />
        </div>
        
        <div className="flex gap-6 flex-wrap text-sm font-mono">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#89b4fa] animate-pulse" /><span className={theme.colors.highlight}>Go 40%</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#f9e2af] animate-pulse" /><span className={theme.colors.highlight}>JS 30%</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#cba6f7] animate-pulse" /><span className={theme.colors.highlight}>TS 20%</span></div>
        </div>
      </div>

    </div>
  </section>
);

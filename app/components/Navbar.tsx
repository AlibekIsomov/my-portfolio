'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Theme } from '@/lib/types';
import { NavItem } from './NavItem';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = ({ 
  currentTheme, 
  onThemeChange, 
  theme 
}: { 
  currentTheme: 'mocha' | 'latte'; 
  onThemeChange: (theme: 'mocha' | 'latte') => void; 
  theme: Theme;
}) => {
  const pathname = usePathname();
  
  return (
    <nav className={`max-w-5xl mx-auto p-6 md:p-8 flex items-center justify-between animate-fade-in-up border-b ${theme.colors.border}`} style={{ animationDelay: '0ms' }}>
      <Link href="/" className={`flex items-center gap-2 font-mono text-sm ${theme.colors.text} hover:opacity-80 transition`}>
        <span className={`font-bold text-lg ${theme.colors.accent}`}>~ /</span>
        <div className="hidden sm:flex gap-6 ml-6">
          <Link href="/about">
            <NavItem label="About" active={pathname === '/about'} theme={theme} />
          </Link>
          <Link href="/projects">
            <NavItem label="Projects" active={pathname === '/projects'} theme={theme} />
          </Link>
          <Link href="/contact">
            <NavItem label="Contact" active={pathname === '/contact'} theme={theme} />
          </Link>
        </div>
      </Link>
      
      <ThemeToggle currentTheme={currentTheme} onThemeChange={onThemeChange} theme={theme} />
    </nav>
  );
};

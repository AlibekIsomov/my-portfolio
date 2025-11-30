'use client';

import { Clock } from './Clock';
import { THEMES } from '@/lib/theme';
import { useState } from 'react';

export function TopHeader() {
  const [currentTheme, setCurrentTheme] = useState<'mocha' | 'latte'>('mocha');
  const theme = THEMES[currentTheme];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-sm border-b ${theme.colors.border} ${theme.colors.surface}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex justify-between items-center">
        <div className={`text-sm font-mono tracking-wider ${theme.colors.accent}`}>
          ~ / portfolio
        </div>
        
        <Clock theme={theme} compact={false} />
      </div>
    </header>
  );
}

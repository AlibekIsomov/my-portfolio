import { Theme } from './types';

export const THEMES: Record<'mocha' | 'latte', Theme> = {
  mocha: {
    name: 'Mocha',
    type: 'dark',
    colors: {
      bg: 'bg-[#1e1e2e]',
      surface: 'bg-[#313244]',
      surfaceHighlight: 'bg-[#45475a]',
      text: 'text-[#cdd6f4]',
      subtext: 'text-[#a6adc8]',
      accent: 'text-[#89b4fa]',
      highlight: 'text-[#fab387]',
      border: 'border-[#45475a]'
    }
  },
  latte: {
    name: 'Latte',
    type: 'light',
    colors: {
      bg: 'bg-[#f0f2f5]', // Slightly cleaner gray-blue
      surface: 'bg-[#ffffff]', // White cards for pop
      surfaceHighlight: 'bg-[#e6e9ef]', // Subtle highlight
      text: 'text-[#4c4f69]', // Keep readable dark text
      subtext: 'text-[#8c8fa1]', // Lighter subtext
      accent: 'text-[#1e66f5]', // Keep energetic blue
      highlight: 'text-[#df8e1d]', // Warmer orange
      border: 'border-[#dce0e8]' // Lighter border
    }
  }
};

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
      bg: 'bg-[#eff1f5]',
      surface: 'bg-[#e6e9ef]',
      surfaceHighlight: 'bg-[#bcc0cc]',
      text: 'text-[#4c4f69]',
      subtext: 'text-[#6c6f85]',
      accent: 'text-[#1e66f5]',
      highlight: 'text-[#d08552]',
      border: 'border-[#bcc0cc]'
    }
  }
};

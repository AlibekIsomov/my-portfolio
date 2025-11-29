import { Sun, Moon } from 'lucide-react';
import { Theme } from '@/lib/types';

export const ThemeToggle = ({ 
  currentTheme, 
  onThemeChange, 
  theme 
}: { 
  currentTheme: 'mocha' | 'latte'; 
  onThemeChange: (theme: 'mocha' | 'latte') => void; 
  theme: Theme;
}) => (
  <div className={`flex gap-2 p-1.5 rounded-full border ${theme.colors.border} ${theme.colors.surface}`}>
    <button 
      onClick={() => onThemeChange('latte')}
      className={`p-2 rounded-full transition-all duration-300 ${currentTheme === 'latte' ? 'bg-white shadow-md text-yellow-600 scale-110' : 'text-gray-400 hover:text-gray-200'}`}
      aria-label="Light theme"
    >
      <Sun size={18} />
    </button>
    <button 
      onClick={() => onThemeChange('mocha')}
      className={`p-2 rounded-full transition-all duration-300 ${currentTheme === 'mocha' ? 'bg-[#45475a] text-white shadow-md scale-110' : 'text-gray-400 hover:text-gray-600'}`}
      aria-label="Dark theme"
    >
      <Moon size={18} />
    </button>
  </div>
);

import { Theme } from '@/lib/types';

export const Tag = ({ text, theme }: { text: string; theme: Theme }) => (
  <span className={`text-[10px] md:text-xs px-2 py-1 rounded-md font-mono transition-colors ${theme.colors.surfaceHighlight} ${theme.colors.text}`}>
    {text}
  </span>
);

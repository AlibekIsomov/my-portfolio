import { Theme } from '@/lib/types';

export const NavItem = ({ label, active = false, theme }: { label: string; active?: boolean; theme: Theme }) => (
  <span className={`cursor-pointer hover:underline underline-offset-4 transition-all duration-200 ${active ? 'font-bold' : 'opacity-70 hover:opacity-100'}`}>
    {label}
  </span>
);

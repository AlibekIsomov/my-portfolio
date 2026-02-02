'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Info, Code, Mail, Moon, Sun, Clock, Settings } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import type { ContentMap, Theme } from '@/lib/types';
import { Clock as ClockComponent } from './Clock';

const DockItem = ({
  href,
  icon: Icon,
  label,
  active,
  theme,
  onClick
}: {
  href: string;
  icon: ReactNode;
  label: string;
  active: boolean;
  theme: Theme;
  onClick?: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={href} onClick={onClick}>
      <motion.div
        className={`relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-2xl transition-all ${active
          ? `${theme.colors.surface} border ${theme.colors.border} scale-110`
          : `${theme.colors.surfaceHighlight} hover:${theme.colors.surface}`
          }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className={theme.colors.accent}>{Icon}</span>

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isHovered ? { opacity: 1, y: -40 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className={`absolute whitespace-nowrap px-3 py-1 rounded-lg text-xs font-mono ${theme.colors.surface} border ${theme.colors.border} pointer-events-none`}
        >
          {label}
        </motion.div>

        {/* Active indicator */}
        {active && (
          <motion.div
            layoutId="activeIndicator"
            className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${theme.colors.accent}`}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export const Navbar = ({
  content,
}: {
  content: ContentMap;
}) => {
  const { themeName: currentTheme, toggleTheme, theme } = useTheme();
  const pathname = usePathname();
  const labels = content.global ?? {};

  return (
    <>
      {/* Dock Navigation - Fixed at Bottom */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-fit`}
      >
        <motion.div
          className={`flex items-center gap-1 md:gap-3 px-3 md:px-6 py-3 md:py-4 rounded-3xl border backdrop-blur-md overflow-x-auto md:overflow-visible no-scrollbar ${theme.colors.surface} ${theme.colors.border}`}
          style={{
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Home */}
          <DockItem
            href="/"
            icon={<Home size={24} />}
            label={labels.navHomeLabel ?? 'Home'}
            active={pathname === '/'}
            theme={theme}
          />

          {/* Divider */}
          <div className={`w-px h-8 ${theme.colors.border}`} />

          {/* About */}
          <DockItem
            href="/about"
            icon={<Info size={24} />}
            label={labels.navAboutLabel ?? 'About'}
            active={pathname === '/about'}
            theme={theme}
          />

          {/* Projects */}
          <DockItem
            href="/projects"
            icon={<Code size={24} />}
            label={labels.navProjectsLabel ?? 'Projects'}
            active={pathname === '/projects'}
            theme={theme}
          />

          {/* Contact */}
          <DockItem
            href="/contact"
            icon={<Mail size={24} />}
            label={labels.navContactLabel ?? 'Contact'}
            active={pathname === '/contact'}
            theme={theme}
          />



          {/* Divider */}
          <div className={`w-px h-8 ${theme.colors.border}`} />

          {/* Clock */}
          <div className={`hidden sm:flex px-4 py-2 rounded-xl items-center gap-2 ${theme.colors.surfaceHighlight}`}>
            <Clock size={16} className={theme.colors.accent} />
            <ClockComponent theme={theme} compact={true} />
          </div>

          {/* Divider */}
          <div className={`w-px h-8 ${theme.colors.border}`} />

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-2xl transition-all ${theme.colors.surfaceHighlight}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentTheme === 'latte' ? (
              <Moon size={24} className={theme.colors.accent} />
            ) : (
              <Sun size={24} className={theme.colors.accent} />
            )}
          </motion.button>
        </motion.div>
      </motion.nav>
    </>
  );
};

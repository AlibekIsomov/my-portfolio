'use client';

import { useState, useEffect } from 'react';
import { Theme } from '@/lib/types';

interface ClockProps {
  theme: Theme;
  compact?: boolean;
}

export function Clock({ theme, compact = false }: ClockProps) {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [timezone, setTimezone] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Detect user's timezone
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(userTimezone);

    const updateTime = () => {
      const now = new Date();
      const userTime = new Date(
        now.toLocaleString('en-US', { timeZone: userTimezone })
      );

      const hours = String(userTime.getHours()).padStart(2, '0');
      const minutes = String(userTime.getMinutes()).padStart(2, '0');
      const seconds = String(userTime.getSeconds()).padStart(2, '0');
      
      const day = String(userTime.getDate()).padStart(2, '0');
      const month = String(userTime.getMonth() + 1).padStart(2, '0');
      const year = userTime.getFullYear();

      if (compact) {
        setTime(`${hours}:${minutes}`);
      } else {
        setTime(`${hours}:${minutes}:${seconds}`);
        setDate(`${day}.${month}.${year}`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [compact, timezone]);

  if (!mounted) return null;

  return (
    <div className={`font-mono tracking-wider ${theme.colors.text}`}>
      {compact ? (
        <span className="text-xs">{time}</span>
      ) : (
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm">{time}</span>
          <span className="text-xs opacity-60">{date}</span>
        </div>
      )}
    </div>
  );
}

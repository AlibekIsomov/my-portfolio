'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { THEMES } from '@/lib/theme';
import { Theme } from '@/lib/types';

type ThemeName = 'mocha' | 'latte';

interface ThemeContextType {
    themeName: ThemeName;
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [themeName, setThemeName] = useState<ThemeName>('mocha');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('theme') as ThemeName;
        if (saved && (saved === 'mocha' || saved === 'latte')) {
            setThemeName(saved);
        }
        setMounted(true);
    }, [setThemeName]);

    const setTheme = (name: ThemeName) => {
        setThemeName(name);
        localStorage.setItem('theme', name);
    };

    const toggleTheme = () => {
        setTheme(themeName === 'mocha' ? 'latte' : 'mocha');
    };

    return (
        <ThemeContext.Provider value={{ themeName, theme: THEMES[themeName], toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

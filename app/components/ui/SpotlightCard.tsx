'use client';

import { useRef, useState } from 'react';
import { Theme } from '@/lib/types';

interface SpotlightCardProps {
    children: React.ReactNode;
    className?: string;
    contentClassName?: string;
    theme: Theme;
    onClick?: () => void;
    style?: React.CSSProperties;
}

export const SpotlightCard = ({ children, className = '', contentClassName = '', theme, onClick, style }: SpotlightCardProps) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    const glowColor = theme.colors.accent === 'text-[#89b4fa]'
        ? 'rgba(137, 180, 250, 0.15)'
        : 'rgba(30, 102, 245, 0.15)';

    const borderGlow = theme.colors.accent === 'text-[#89b4fa]'
        ? 'rgba(137, 180, 250, 0.5)'
        : 'rgba(30, 102, 245, 0.5)';

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={`relative overflow-hidden rounded-3xl border transition-all duration-300 ${className} ${theme.colors.surface} ${theme.colors.border} group`}
            style={{
                ...style,
            }}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${borderGlow}, transparent 40%)`,
                }}
            />
            <div
                className={`absolute inset-[1px] rounded-[22px] z-0 ${theme.colors.surface}`}
            />
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-10"
                style={{
                    opacity,
                    background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 40%)`,
                }}
            />
            <div className={`relative z-20 h-full ${contentClassName}`}>
                {children}
            </div>
        </div>
    );
};

'use client';

import { useState, useEffect } from 'react';

interface TypewriterProps {
    text: string;
    initialText?: string; // Text to type first (with typo)
    speed?: number;
    deleteSpeed?: number;
    pauseDuration?: number; // How long to pause before fixing typo
}

export const Typewriter = ({
    text,
    initialText = '',
    speed = 100,
    deleteSpeed = 50,
    pauseDuration = 800,
}: TypewriterProps) => {
    const [displayedText, setDisplayedText] = useState('');
    const [phase, setPhase] = useState<'typing_initial' | 'pausing' | 'deleting' | 'typing_final'>('typing_initial');

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (phase === 'typing_initial') {
            if (displayedText.length < initialText.length) {
                timeout = setTimeout(() => {
                    setDisplayedText(initialText.slice(0, displayedText.length + 1));
                }, speed);
            } else {
                setPhase('pausing');
            }
        } else if (phase === 'pausing') {
            timeout = setTimeout(() => {
                setPhase('deleting');
            }, pauseDuration);
        } else if (phase === 'deleting') {
            // Find the common prefix to know where to stop deleting
            // e.g., initial: "Alibek Izomov", final: "Alibek Isomov" -> common: "Alibek I"
            let commonIndex = 0;
            while (
                commonIndex < text.length &&
                commonIndex < initialText.length &&
                text[commonIndex] === initialText[commonIndex]
            ) {
                commonIndex++;
            }

            if (displayedText.length > commonIndex) {
                timeout = setTimeout(() => {
                    setDisplayedText(displayedText.slice(0, -1));
                }, deleteSpeed);
            } else {
                setPhase('typing_final');
            }
        } else if (phase === 'typing_final') {
            if (displayedText.length < text.length) {
                timeout = setTimeout(() => {
                    setDisplayedText(text.slice(0, displayedText.length + 1));
                }, speed);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayedText, phase, initialText, text, speed, deleteSpeed, pauseDuration]);

    return (
        <>
            {displayedText}
            <span className="animate-blink border-r-2 border-current ml-1 h-[1em] inline-block align-middle" style={{ animationDuration: '1s' }}></span>
        </>
    );
};

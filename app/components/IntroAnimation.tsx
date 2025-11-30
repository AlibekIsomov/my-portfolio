'use client';

import { useEffect, useState } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Animation duration: 2.5 seconds (2s animation + 0.5s fade out)
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
      {/* Grid burst animation */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Center burst lines */}
        <svg 
          className="absolute w-full h-full" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Horizontal burst lines */}
          {[...Array(8)].map((_, i) => (
            <line
              key={`horizontal-${i}`}
              x1="0"
              y1={50 + (i - 3.5) * 8}
              x2="100"
              y2={50 + (i - 3.5) * 8}
              stroke="#fab387"
              strokeWidth="0.5"
              opacity="0.8"
              className="animate-burst-line"
              style={{
                animationDelay: `${i * 0.08}s`,
              } as React.CSSProperties}
            />
          ))}

          {/* Vertical burst lines */}
          {[...Array(8)].map((_, i) => (
            <line
              key={`vertical-${i}`}
              x1={50 + (i - 3.5) * 8}
              y1="0"
              x2={50 + (i - 3.5) * 8}
              y2="100"
              stroke="#fab387"
              strokeWidth="0.5"
              opacity="0.8"
              className="animate-burst-line"
              style={{
                animationDelay: `${i * 0.08}s`,
              } as React.CSSProperties}
            />
          ))}

          {/* Diagonal lines */}
          {[...Array(6)].map((_, i) => (
            <g key={`diagonal-${i}`}>
              <line
                key={`d1-${i}`}
                x1={50 - 50}
                y1={50 - 50 + i * 16.67}
                x2={150}
                y2={150 + i * 16.67 - 100}
                stroke="#fab387"
                strokeWidth="0.4"
                opacity="0.6"
                className="animate-burst-line"
                style={{
                  animationDelay: `${i * 0.1}s`,
                } as React.CSSProperties}
              />
              <line
                key={`d2-${i}`}
                x1={50 + 50}
                y1={50 - 50 + i * 16.67}
                x2={-50}
                y2={150 + i * 16.67 - 100}
                stroke="#fab387"
                strokeWidth="0.4"
                opacity="0.6"
                className="animate-burst-line"
                style={{
                  animationDelay: `${i * 0.1}s`,
                } as React.CSSProperties}
              />
            </g>          ))}
        </svg>

        {/* Center circle */}
        <div className="absolute w-16 h-16 rounded-full border-2 border-[#fab387] animate-pulse" />

        {/* Center dot */}
        <div className="absolute w-3 h-3 bg-[#fab387] rounded-full" />

        {/* Fade out overlay */}
        <div 
          className="absolute inset-0 bg-black"
          style={{
            animation: 'fadeOutOverlay 0.8s ease-in forwards',
            animationDelay: '1.7s',
          }}
        />
      </div>

      <style>{`
        @keyframes burstLine {
          0% {
            opacity: 0;
            stroke-dasharray: 0, 100;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            stroke-dasharray: 100, 0;
          }
        }

        @keyframes fadeOutOverlay {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-burst-line {
          animation: burstLine 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>
    </div>
  );
}

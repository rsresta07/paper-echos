import React from 'react';

interface SunflowerIconProps {
  className?: string;
  size?: number;
}

export const SunflowerIcon: React.FC<SunflowerIconProps> = ({ className = '', size = 32 }) => {
  const petalsCount = 16;
  const petals = Array.from({ length: petalsCount });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none drop-shadow-sm ${className}`}
    >
      <defs>
        <radialGradient id="sunflowerCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3d210b" />
          <stop offset="60%" stopColor="#5c3413" />
          <stop offset="100%" stopColor="#784719" />
        </radialGradient>
        <linearGradient id="petalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
      </defs>

      {/* Petals radiating around center */}
      <g>
        {petals.map((_, i) => {
          const angle = (i * 360) / petalsCount;
          return (
            <path
              key={i}
              d="M50 50 C44 25, 46 5, 50 2 C54 5, 56 25, 50 50 Z"
              fill="url(#petalGrad)"
              stroke="#ca8a04"
              strokeWidth="0.5"
              transform={`rotate(${angle} 50 50)`}
            />
          );
        })}
      </g>

      {/* Outer Sunflower Disk Ring */}
      <circle cx="50" cy="50" r="22" fill="#784719" stroke="#b45309" strokeWidth="1" />

      {/* Center Seed Texture */}
      <circle cx="50" cy="50" r="18" fill="url(#sunflowerCenter)" />

      {/* Seed Dots */}
      <circle cx="50" cy="50" r="14" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
      <circle cx="50" cy="50" r="8" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.8" />
      <circle cx="50" cy="50" r="3" fill="#fbbf24" opacity="0.9" />
    </svg>
  );
};

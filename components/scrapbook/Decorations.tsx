"use client";

import React from 'react';
import { SunflowerIcon } from '@/components/ui/SunflowerIcon';

interface TapeProps {
  color?: string;
  className?: string;
  position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-center';
}

export const Tape: React.FC<TapeProps> = ({ 
  color = "bg-amber-200/80 border-amber-300", 
  className = "",
  position = "top-center"
}) => {
  const positionClasses = {
    'top-left': '-top-3 left-4 -rotate-6',
    'top-right': '-top-3 right-4 rotate-6',
    'top-center': '-top-3 left-1/2 -translate-x-1/2 -rotate-1',
    'bottom-center': '-bottom-3 left-1/2 -translate-x-1/2 rotate-2'
  };

  return (
    <div 
      className={`absolute z-20 w-24 h-6 ${color} border-t border-b border-dashed shadow-xs opacity-90 pointer-events-none ${positionClasses[position]} ${className}`}
      style={{
        clipPath: 'polygon(0% 0%, 5% 100%, 95% 95%, 100% 5%)',
        backdropFilter: 'blur(1px)'
      }}
    />
  );
};

export const Stamp: React.FC<{ text: string; color?: string; className?: string }> = ({ 
  text, 
  color = "border-amber-700 text-amber-800", 
  className = "" 
}) => {
  return (
    <div className={`inline-block border-2 border-dashed px-3 py-1 text-xs uppercase tracking-widest font-mono font-bold rounded-xs transform -rotate-12 opacity-80 ${color} ${className}`}>
      {text}
    </div>
  );
};

export const Doodle: React.FC<{ type?: 'heart' | 'arrow' | 'star' | 'sparkle' | 'smile'; className?: string }> = ({ 
  type = 'heart', 
  className = "w-6 h-6 text-rose-500" 
}) => {
  if (type === 'heart') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    );
  }

  if (type === 'star') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );
  }

  if (type === 'sparkle') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20M17 7l-10 10M7 7l10 10" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
};

export const SunflowerSticker: React.FC<{ size?: number; className?: string; rotation?: string }> = ({
  size = 48,
  className = "",
  rotation = "rotate-6"
}) => {
  return (
    <div className={`inline-block transform ${rotation} filter drop-shadow-md transition-transform hover:scale-110 cursor-pointer ${className}`}>
      <SunflowerIcon size={size} />
    </div>
  );
};

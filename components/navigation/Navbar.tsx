"use client";

import React, { useState } from 'react';
import { CHAPTERS } from '@/content/chapters';
import { BookOpen, LogOut, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  activeChapter: number;
  onSelectChapter: (id: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeChapter, onSelectChapter }) => {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/auth', { method: 'DELETE' });
      router.push('/login');
      router.refresh();
    } catch (e) {
      console.error(e);
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6EE]/90 backdrop-blur-md border-b border-amber-200/60 shadow-xs px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        {/* Title */}
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-800 shrink-0" />
          <span className="font-handwriting text-xl font-bold text-stone-800 tracking-tight">
            Paper Echoes
          </span>
        </div>

        {/* Chapter Tabs */}
        <div className="hidden sm:flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          {CHAPTERS.map((ch) => (
            <button
              key={ch.id}
              onClick={() => onSelectChapter(ch.id)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                activeChapter === ch.id
                  ? 'bg-amber-800 text-amber-50 font-bold shadow-xs'
                  : 'bg-amber-100/70 text-stone-700 hover:bg-amber-200/80'
              }`}
            >
              Ch {ch.id}
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          title="Logout"
          className="flex items-center gap-1 text-xs font-mono text-stone-500 hover:text-stone-800 bg-stone-200/60 hover:bg-stone-200 px-2.5 py-1.5 rounded border border-stone-300 transition-colors cursor-pointer shrink-0"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Lock</span>
        </button>
      </div>
    </header>
  );
};

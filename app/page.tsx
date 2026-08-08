"use client";

import React, { useState, useEffect } from 'react';
import { CHAPTERS } from '@/content/chapters';
import { MEMORIES } from '@/content/memories';
import { QUOTES } from '@/content/quotes';
import { PolaroidCard } from '@/components/scrapbook/PolaroidCard';
import { QuoteCard } from '@/components/scrapbook/QuoteCard';
import { BirthdayReveal } from '@/components/scrapbook/BirthdayReveal';
import { Tape, Doodle, Stamp } from '@/components/scrapbook/Decorations';
import { Navbar } from '@/components/navigation/Navbar';
import { MusicPlayer } from '@/components/navigation/MusicPlayer';
import { ChevronDown, Sparkles, Heart } from 'lucide-react';

export default function ScrapbookPage() {
  const [activeChapter, setActiveChapter] = useState(1);

  const scrollToChapter = (chapterId: number) => {
    setActiveChapter(chapterId);
    const element = document.getElementById(`chapter-${chapterId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Sync active chapter based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const chapterElements = CHAPTERS.map((ch) => ({
        id: ch.id,
        el: document.getElementById(`chapter-${ch.id}`),
      }));

      const scrollPosition = window.scrollY + 200;

      for (let i = chapterElements.length - 1; i >= 0; i--) {
        const item = chapterElements[i];
        if (item.el && item.el.offsetTop <= scrollPosition) {
          setActiveChapter(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen paper-texture text-stone-800 pb-24">
      {/* Navigation Header */}
      <Navbar activeChapter={activeChapter} onSelectChapter={scrollToChapter} />

      {/* Hero Welcome Cover */}
      <section className="relative max-w-4xl mx-auto px-4 pt-12 pb-16 text-center">
        <div className="relative inline-block bg-white p-6 sm:p-10 rounded-xs polaroid-shadow border border-stone-200 transform -rotate-1">
          <Tape color="bg-amber-200/90 border-amber-300" position="top-center" />
          
          <Stamp text="PRIVATE MEMORY ALBUM" color="border-amber-700 text-amber-800" className="mb-4" />

          <h1 className="text-4xl sm:text-6xl font-bold font-handwriting text-stone-800 mb-3 tracking-tight">
            Whispers of Our Favorite Moments
          </h1>
          <p className="font-handwriting text-xl sm:text-2xl text-stone-600 max-w-xl mx-auto leading-relaxed">
            A small digital corner filled with photos, chaotic notes, funny quotes, and quiet memories.
          </p>

          <div className="mt-8 flex justify-center items-center gap-2 text-stone-400 font-mono text-xs animate-bounce">
            <span>Scroll down to turn the pages</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </section>

      {/* Storyline Chapters */}
      <div className="max-w-5xl mx-auto px-4 space-y-24">
        {CHAPTERS.map((chapter) => {
          const chapterMemories = MEMORIES.filter((m) => m.chapterId === chapter.id);
          const chapterQuotes = QUOTES.filter((q) => q.chapterId === chapter.id);

          return (
            <section
              key={chapter.id}
              id={`chapter-${chapter.id}`}
              className="scroll-mt-20 relative"
            >
              {/* Chapter Header Banner */}
              <div className={`relative p-6 sm:p-8 rounded-lg scrapbook-shadow bg-gradient-to-r ${chapter.bgGradient} border border-amber-200/60 mb-10`}>
                <Tape color={chapter.tapeColor} position="top-left" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-300/40 pb-3 mb-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold ${chapter.stickerBg} w-fit`}>
                    CHAPTER {chapter.id}
                  </span>
                  <span className="font-mono text-xs text-stone-500">
                    {chapter.subtitle}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold font-handwriting text-stone-900">
                  {chapter.title}
                </h2>
                <p className="font-handwriting text-xl text-stone-700 mt-1 italic">
                  "{chapter.tagline}"
                </p>
              </div>

              {/* Grid of Chapter Memories & Quotes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Render Memories */}
                {chapterMemories.map((mem) => (
                  <PolaroidCard key={mem.id} memory={mem} />
                ))}

                {/* Render Quotes */}
                {chapterQuotes.map((q) => (
                  <QuoteCard key={q.id} quoteItem={q} />
                ))}
              </div>

              {/* Chapter 5 Special Birthday Reveal Section */}
              {chapter.id === 5 && <BirthdayReveal />}
            </section>
          );
        })}
      </div>

      {/* Footer */}
      <footer className="mt-32 text-center text-xs font-mono text-stone-400 border-t border-stone-200/60 pt-8 max-w-xl mx-auto px-4">
        <p>Made with ❤️ for {process.env.NEXT_PUBLIC_RECIPIENT_NAME || 'You'} • Private Digital Scrapbook</p>
        <p className="mt-1 text-[11px] text-stone-400/80">
          August 23rd • Keep the surprise safe
        </p>
      </footer>

      {/* Optional Music Player */}
      <MusicPlayer />
    </div>
  );
}

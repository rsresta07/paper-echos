"use client";

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { BIRTHDAY_MESSAGE } from '@/content/memories';
import { Tape, Doodle, Stamp, SunflowerSticker } from './Decorations';
import { SunflowerIcon } from '@/components/ui/SunflowerIcon';
import { Heart, Sparkles, Gift } from 'lucide-react';

export const BirthdayReveal: React.FC = () => {
  const [opened, setOpened] = useState(false);

  const handleOpenEnvelope = () => {
    setOpened(true);
    // Fire confetti sequence
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 250);
  };

  return (
    <div className="relative my-12 max-w-2xl mx-auto px-4">
      {!opened ? (
        <div className="bg-gradient-to-br from-amber-100 to-rose-100 border-2 border-dashed border-rose-300 p-8 rounded-lg scrapbook-shadow text-center relative overflow-hidden">
          <Tape color="bg-yellow-300/90 border-yellow-400" position="top-center" />

          <div className="absolute top-3 right-3 z-10">
            <SunflowerSticker size={48} rotation="rotate-12" />
          </div>

          <Stamp text="CONFIDENTIAL • FOR YOUR EYES ONLY" color="border-rose-400 text-rose-700" className="mb-4" />

          <h2 className="text-3xl font-bold font-handwriting text-stone-800 mb-2">
            The Final Surprise Envelope
          </h2>
          <p className="font-handwriting text-xl text-stone-600 mb-6">
            You&apos;ve made it through all the chaotic notes, silly photos, and quiet memories. Click below to open your letter!
          </p>

          <button
            onClick={handleOpenEnvelope}
            className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold px-8 py-3.5 rounded-full shadow-lg transition-transform active:scale-95 text-lg cursor-pointer"
          >
            <Sparkles className="w-5 h-5" />
            <span>Open Birthday Letter</span>
            <Heart className="w-5 h-5 fill-current" />
          </button>
        </div>
      ) : (
        <div className="relative bg-white/95 border-2 border-amber-200/90 p-8 sm:p-12 rounded-xs polaroid-shadow transition-all duration-700 animate-fade-in">
          <Tape color="bg-rose-300/90 border-rose-400" position="top-left" />
          <Tape color="bg-yellow-300/90 border-yellow-400" position="top-right" />

          <div className="flex justify-between items-start mb-6 border-b border-stone-200 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold block mb-1">
                SPECIAL EDITION • {BIRTHDAY_MESSAGE.date}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-handwriting text-rose-600">
                {BIRTHDAY_MESSAGE.title}
              </h2>
            </div>
            <Doodle type="heart" className="w-8 h-8 text-rose-500 animate-pulse shrink-0" />
          </div>

          <p className="font-handwriting text-xl text-amber-900/90 font-medium mb-6 leading-relaxed bg-amber-50/80 p-4 rounded-md border border-amber-200/60 italic">
            &ldquo;{BIRTHDAY_MESSAGE.subtitle}&rdquo;
          </p>

          <div className="space-y-4 font-handwriting text-xl text-stone-700 leading-relaxed">
            {BIRTHDAY_MESSAGE.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-sm font-handwriting text-stone-500 block">
                {BIRTHDAY_MESSAGE.closing}
              </span>
              <span className="text-2xl font-bold font-handwriting text-rose-600 block">
                {BIRTHDAY_MESSAGE.sender}
              </span>
            </div>
          </div>

          {/* Grand Final Floating Message */}
          <div className="mt-12 p-6 bg-gradient-to-r from-rose-500 via-amber-500 to-yellow-500 text-white rounded-lg text-center shadow-md relative overflow-hidden">
            <div className="absolute -left-2 -top-2 opacity-30">
              <SunflowerIcon size={64} className="animate-spin-slow" />
            </div>
            <div className="absolute -right-2 -bottom-2 opacity-30">
              <SunflowerIcon size={64} className="animate-spin-slow" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold font-handwriting tracking-wide relative z-10">
              Happy Birthday, {process.env.NEXT_PUBLIC_RECIPIENT_NAME || 'You'} 🌻❤️
            </h3>
            <p className="text-amber-100 text-sm mt-1 font-sans relative z-10">
              Thank you for being the sweetest, brightest part of every single day.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

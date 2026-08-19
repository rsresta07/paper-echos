"use client";

import React from 'react';
import { QuoteItem } from '@/content/quotes';
import { Tape } from './Decorations';
import { Quote } from 'lucide-react';

interface QuoteCardProps {
  quoteItem: QuoteItem;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ quoteItem }) => {
  const rotationClass = {
    '-3': '-rotate-3',
    '-2': '-rotate-2',
    '-1': '-rotate-1',
    '0': 'rotate-0',
    '1': 'rotate-1',
    '2': 'rotate-2',
    '3': 'rotate-3',
  }[quoteItem.rotation?.toString() || '0'] || 'rotate-1';

  const badgeStyle = {
    said: "bg-rose-100 text-rose-800 border-rose-300",
    likes: "bg-amber-100 text-amber-800 border-amber-300",
    personal: "bg-purple-100 text-purple-800 border-purple-300"
  }[quoteItem.type];

  const badgeLabel = quoteItem.customBadge || {
    said: "That's What She Said 💬",
    likes: "Special Words ✨",
    personal: "Personal Thought 💭"
  }[quoteItem.type];

  return (
    <div
      className={`relative bg-amber-50/90 border border-amber-200/80 p-6 rounded-sm scrapbook-shadow transition-transform hover:scale-[1.02] duration-300 ${rotationClass}`}
    >
      <Tape color="bg-rose-200/80 border-rose-300" position={quoteItem.tapePosition || "top-right"} />

      <div className="flex justify-between items-center mb-3">
        <span className={`text-xs px-2.5 py-0.5 rounded-full border font-mono font-medium ${badgeStyle}`}>
          {badgeLabel}
        </span>
        <Quote className="w-5 h-5 text-amber-400 opacity-60" />
      </div>

      <p className="font-handwriting text-2xl text-stone-800 leading-relaxed font-semibold italic whitespace-pre-line">
        &ldquo;{quoteItem.quote}&rdquo;
      </p>

      {quoteItem.context && (
        <p className="mt-3 text-xs font-mono text-stone-500 border-t border-amber-200/60 pt-2">
          — {quoteItem.context}
        </p>
      )}

      {quoteItem.date && (
        <span className="block mt-1 text-[10px] font-mono text-stone-400 text-right">
          {quoteItem.date}
        </span>
      )}
    </div>
  );
};

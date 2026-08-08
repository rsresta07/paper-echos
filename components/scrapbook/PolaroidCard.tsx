"use client";

import React, { useState } from 'react';
import { MemoryItem } from '@/content/memories';
import { Tape, Doodle } from './Decorations';
import { Image as ImageIcon, Video as VideoIcon, FileText, Ticket } from 'lucide-react';

interface PolaroidCardProps {
  memory: MemoryItem;
}

export const PolaroidCard: React.FC<PolaroidCardProps> = ({ memory }) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || memory.type !== 'video') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoEl.play().catch(() => {
              // If unmuted autoplay is blocked by browser policy, try muted
              videoEl.muted = true;
              videoEl.play().catch(() => {});
            });
          } else {
            videoEl.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(videoEl);
    return () => observer.disconnect();
  }, [memory.type, activePhotoIndex]);

  const rotationClass = {
    '-4': '-rotate-4',
    '-3': '-rotate-3',
    '-2': '-rotate-2',
    '-1': '-rotate-1',
    '0': 'rotate-0',
    '1': 'rotate-1',
    '2': 'rotate-2',
    '3': 'rotate-3',
    '4': 'rotate-4',
  }[memory.rotation?.toString() || '0'] || 'rotate-1';

  // Build items list with per-item details if items available, otherwise mediaUrls or single mediaUrl
  const itemsList = memory.items && memory.items.length > 0
    ? memory.items
    : (memory.mediaUrls && memory.mediaUrls.length > 0
        ? memory.mediaUrls.map(url => ({ mediaUrl: url, title: memory.title, caption: memory.caption, date: memory.date }))
        : [{ mediaUrl: memory.mediaUrl, title: memory.title, caption: memory.caption, date: memory.date }]
      );

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (itemsList.length <= 1 || isFlipping) return;

    setIsFlipping(true);
    setTimeout(() => {
      setActivePhotoIndex((prev) => (prev + 1) % itemsList.length);
      setIsFlipping(false);
    }, 220);
  };

  if (memory.type === 'note') {
    return (
      <div 
        className={`relative bg-yellow-100/90 border border-yellow-200 p-6 rounded-sm polaroid-shadow transition-transform hover:scale-[1.02] duration-300 ${rotationClass}`}
      >
        <Tape color="bg-yellow-200/90 border-yellow-300" position="top-left" />
        <div className="flex items-center gap-2 text-yellow-800 mb-3 font-mono text-xs uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          <span>{memory.date || "Personal Note"}</span>
        </div>
        <h3 className="text-xl font-bold font-handwriting text-stone-800 mb-2">
          {memory.title}
        </h3>
        <p className="font-handwriting text-lg text-stone-700 leading-relaxed">
          {memory.caption}
        </p>
        {memory.stickers && (
          <div className="mt-4 flex flex-wrap gap-1">
            {memory.stickers.map((s, idx) => (
              <span key={idx} className="text-lg">{s}</span>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (memory.type === 'ticket') {
    return (
      <div 
        className={`relative bg-amber-50 border-2 border-dashed border-amber-300 p-5 rounded-md scrapbook-shadow transition-transform hover:scale-[1.02] duration-300 ${rotationClass}`}
      >
        <Tape color="bg-pink-200/80 border-pink-300" position="top-right" />
        <div className="flex justify-between items-center mb-2">
          <span className="bg-amber-200 text-amber-900 text-xs px-2 py-0.5 rounded font-mono font-bold uppercase">
            Special Coupon
          </span>
          <Ticket className="w-5 h-5 text-amber-600" />
        </div>
        <h3 className="text-lg font-bold text-stone-800">{memory.title}</h3>
        <p className="font-handwriting text-base text-stone-600 mt-1">{memory.caption}</p>
        <div className="mt-3 text-xs text-stone-400 font-mono">VALID: FOREVER ❤️</div>
      </div>
    );
  }

  const currentItem = itemsList[activePhotoIndex] || {};
  const currentTitle = currentItem.title || memory.title;
  const currentCaption = currentItem.caption || memory.caption;
  const currentDate = currentItem.date || memory.date;
  const currentPhoto = currentItem.mediaUrl;

  return (
    <div 
      onClick={itemsList.length > 1 ? handleNextPhoto : undefined}
      className={`relative bg-white p-4 pb-6 rounded-xs polaroid-shadow border border-stone-200/70 transition-all duration-300 hover:scale-[1.02] hover:z-20 ${rotationClass} ${itemsList.length > 1 ? 'cursor-pointer group/card' : ''} ${isFlipping ? 'scale-90 rotate-6 opacity-40 blur-[0.5px]' : 'scale-100 opacity-100'}`}
    >
      <Tape color={memory.tapeColor || "bg-amber-200/80 border-amber-300"} position="top-center" />

      {/* Decorative stacked paper edge effect if multiple items */}
      {itemsList.length > 1 && (
        <>
          <div className="absolute inset-0 bg-stone-100 rounded-xs border border-stone-300 transform rotate-2 translate-x-1.5 translate-y-1.5 -z-10 transition-transform group-hover/card:rotate-3" />
          <div className="absolute inset-0 bg-stone-200 rounded-xs border border-stone-300 transform -rotate-2 -translate-x-1.5 translate-y-1 -z-20" />
        </>
      )}

      {/* Media Box */}
      <div className="relative bg-stone-100 overflow-hidden border border-stone-200 aspect-[4/3] flex items-center justify-center group">
        {currentPhoto ? (
          memory.type === 'video' ? (
            <video 
              ref={videoRef}
              src={currentPhoto} 
              controls 
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover"
              controlsList="nodownload"
            />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img 
              src={currentPhoto} 
              alt={currentTitle} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )
        ) : (
          /* Placeholder Box when media is not provided yet */
          <div className="p-6 text-center flex flex-col items-center justify-center bg-stone-100 text-stone-500 w-full h-full border-2 border-dashed border-stone-300">
            {memory.type === 'video' ? (
              <VideoIcon className="w-8 h-8 mb-2 text-stone-400 animate-pulse" />
            ) : (
              <ImageIcon className="w-8 h-8 mb-2 text-stone-400 animate-pulse" />
            )}
            <span className="font-mono text-xs font-semibold px-2 py-1 bg-amber-100 text-amber-800 rounded border border-amber-300">
              {memory.placeholderLabel || "[ADD MEDIA HERE]"}
            </span>
            <span className="text-[11px] text-stone-400 mt-2 font-mono">
              Place file in /public/media/{memory.type === 'video' ? 'videos' : 'images'}
            </span>
          </div>
        )}

        {/* Sticker Badges */}
        {memory.stickers && (
          <div className="absolute top-2 right-2 flex gap-1 z-10">
            {memory.stickers.map((st, i) => (
              <span key={i} className="text-xl drop-shadow-md">{st}</span>
            ))}
          </div>
        )}

        {/* Flip hint badge for multiple polaroids */}
        {itemsList.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-stone-900/75 text-stone-100 font-mono text-[10px] px-2 py-1 rounded-full backdrop-blur-xs flex items-center gap-1 shadow-sm">
            <span>Tap polaroid to flip</span>
            <span className="font-bold text-amber-300">({activePhotoIndex + 1}/{itemsList.length})</span>
          </div>
        )}
      </div>

      {/* Caption / Polaroid Footer */}
      <div className="mt-4 px-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-handwriting text-xl font-bold text-stone-800 leading-tight">
            {currentTitle}
          </h3>
          {memory.doodle && <Doodle type={memory.doodle} className="w-5 h-5 text-rose-400 shrink-0" />}
        </div>
        <p className="font-handwriting text-base text-stone-600 mt-1 leading-snug">
          {currentCaption}
        </p>
        
        {(currentDate || memory.location) && (
          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-stone-400 border-t border-stone-100 pt-2">
            <span>{currentDate}</span>
            <span>{memory.location}</span>
          </div>
        )}
      </div>
    </div>
  );
};

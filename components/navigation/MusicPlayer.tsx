"use client";

import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasAudio(true);
          })
          .catch((err) => {
            console.log("Autoplay waiting for user interaction:", err);
          });
      }
    };

    playAudio();

    // Also attempt playing on any user tap/click anywhere on page if blocked
    const handleFirstTouch = () => {
      playAudio();
      window.removeEventListener('click', handleFirstTouch);
      window.removeEventListener('touchstart', handleFirstTouch);
    };

    window.addEventListener('click', handleFirstTouch);
    window.addEventListener('touchstart', handleFirstTouch);

    return () => {
      window.removeEventListener('click', handleFirstTouch);
      window.removeEventListener('touchstart', handleFirstTouch);
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasAudio(true);
        })
        .catch((err) => {
          console.log("Audio playback error:", err);
          setIsPlaying(false);
        });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio 
        ref={audioRef} 
        src="/media/audio/Taylor-Swift-august.mp3" 
        autoPlay
        loop 
        preload="auto"
        onCanPlay={() => setHasAudio(true)}
      />
      <button
        onClick={toggleMusic}
        aria-label="Toggle background music"
        className="flex items-center gap-2 bg-stone-900/90 text-amber-100 hover:text-white px-3 py-2 rounded-full text-xs font-mono shadow-lg border border-amber-400/30 backdrop-blur-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
      >
        <Music className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin text-rose-400' : ''}`} />
        <span>{isPlaying ? 'Music: ON' : 'Music: OFF'}</span>
        {isPlaying ? <Volume2 className="w-3.5 h-3.5 text-rose-400" /> : <VolumeX className="w-3.5 h-3.5 opacity-60" />}
      </button>
    </div>
  );
};

"use client";

import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playAudio = async () => {
      try {
        audio.volume = 0.8;
        await audio.play();
        setIsPlaying(true);
        setHasAudio(true);
      } catch (err) {
        console.log("Autoplay waiting for user interaction:", err);
        setIsPlaying(false);
      }
    };

    // Attempt to start audio from the beginning on mount
    audio.currentTime = 0;
    playAudio();

    // Interaction fallback for browsers blocking unmuted autoplay on initial load/reload
    const handleGesture = () => {
      if (audio && audio.paused) {
        audio.currentTime = 0;
        playAudio();
      }
    };

    window.addEventListener('click', handleGesture, { capture: true });
    window.addEventListener('touchstart', handleGesture, { capture: true });
    window.addEventListener('pointerdown', handleGesture, { capture: true });
    window.addEventListener('scroll', handleGesture, { capture: true });
    window.addEventListener('wheel', handleGesture, { capture: true });
    window.addEventListener('keydown', handleGesture, { capture: true });

    return () => {
      window.removeEventListener('click', handleGesture, { capture: true });
      window.removeEventListener('touchstart', handleGesture, { capture: true });
      window.removeEventListener('pointerdown', handleGesture, { capture: true });
      window.removeEventListener('scroll', handleGesture, { capture: true });
      window.removeEventListener('wheel', handleGesture, { capture: true });
      window.removeEventListener('keydown', handleGesture, { capture: true });
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.currentTime = 0; // Play from the beginning when turning on
      audio.volume = 0.8;
      audio
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

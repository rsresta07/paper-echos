"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playAudio = async () => {
      try {
        audio.volume = 0.8;
        await audio.play();
        setIsPlaying(true);
        setHasAudio(true);
        setNeedsGesture(false);
      } catch (err) {
        console.log("Autoplay waiting for user gesture:", err);
        setIsPlaying(false);
        setNeedsGesture(true);
      }
    };

    // Attempt to start audio from the beginning on mount
    audio.currentTime = 0;
    playAudio();

    // Interaction fallback for browsers blocking unmuted autoplay on initial load/reload
    const handleUserActivation = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.currentTime = 0;
        playAudio();
      }
    };

    window.addEventListener('click', handleUserActivation, { once: true, capture: true });
    window.addEventListener('touchstart', handleUserActivation, { once: true, capture: true });
    window.addEventListener('pointerdown', handleUserActivation, { once: true, capture: true });
    window.addEventListener('keydown', handleUserActivation, { once: true, capture: true });

    return () => {
      window.removeEventListener('click', handleUserActivation, { capture: true });
      window.removeEventListener('touchstart', handleUserActivation, { capture: true });
      window.removeEventListener('pointerdown', handleUserActivation, { capture: true });
      window.removeEventListener('keydown', handleUserActivation, { capture: true });
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setNeedsGesture(false);
    } else {
      audio.currentTime = 0; // Play from the beginning when turning on
      audio.volume = 0.8;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasAudio(true);
          setNeedsGesture(false);
        })
        .catch((err) => {
          console.log("Audio playback error:", err);
          setIsPlaying(false);
        });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {needsGesture && !isPlaying && (
        <div 
          onClick={toggleMusic}
          className="bg-amber-100 text-amber-900 text-[11px] font-mono px-3 py-1.5 rounded-lg border border-amber-300 shadow-md animate-bounce cursor-pointer"
        >
          🎵 Tap anywhere to start music
        </div>
      )}
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
        className={`flex items-center gap-2 bg-stone-900/90 text-amber-100 hover:text-white px-3 py-2 rounded-full text-xs font-mono shadow-lg border border-amber-400/30 backdrop-blur-sm transition-all hover:scale-105 active:scale-95 cursor-pointer ${
          needsGesture && !isPlaying ? 'ring-2 ring-rose-400 animate-pulse' : ''
        }`}
      >
        <Music className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin text-rose-400' : ''}`} />
        <span>{isPlaying ? 'Music: ON' : 'Music: OFF'}</span>
        {isPlaying ? <Volume2 className="w-3.5 h-3.5 text-rose-400" /> : <VolumeX className="w-3.5 h-3.5 opacity-60" />}
      </button>
    </div>
  );
};

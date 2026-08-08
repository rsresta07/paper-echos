"use client";

import React, { useEffect, useState } from 'react';
import { SunflowerIcon } from '@/components/ui/SunflowerIcon';

interface Petal {
  id: number;
  left: number; // percentage 0 - 100
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  rotation: number; // initial rotation deg
  isFullFlower: boolean;
}

interface BurstPetal {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  size: number;
}

export const SunflowerPetals: React.FC = () => {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [bursts, setBursts] = useState<BurstPetal[]>([]);

  useEffect(() => {
    // Generate background floating petals
    const count = 16;
    const generated: Petal[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.floor(Math.random() * 18) + 14, // 14px to 32px
      duration: Math.random() * 10 + 10, // 10s to 20s
      delay: Math.random() * 8, // 0s to 8s
      rotation: Math.floor(Math.random() * 360),
      isFullFlower: i % 4 === 0, // 25% full flowers, 75% single petals
    }));
    setPetals(generated);

    // Click listener to spawn mini petal bursts on click/tap
    const handleClick = (e: MouseEvent) => {
      // Don't spawn on button/link clicks if target is interactive input
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('input')) {
        return;
      }

      const clickX = e.clientX;
      const clickY = e.clientY + window.scrollY;

      const newBursts: BurstPetal[] = Array.from({ length: 5 }).map((_, idx) => ({
        id: Date.now() + idx + Math.random(),
        x: clickX,
        y: clickY,
        angle: Math.random() * 360,
        speed: Math.random() * 40 + 20,
        size: Math.random() * 14 + 12,
      }));

      setBursts((prev) => [...prev.slice(-15), ...newBursts]);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {/* Background Falling Petals */}
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute animate-float-petal opacity-80"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        >
          {p.isFullFlower ? (
            <SunflowerIcon size={p.size} className="animate-spin-slow" />
          ) : (
            // Single Sunflower Petal SVG
            <svg
              width={p.size}
              height={p.size * 1.5}
              viewBox="0 0 24 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-xs"
            >
              <path
                d="M12 2 C6 14, 4 26, 12 34 C20 26, 18 14, 12 2 Z"
                fill="url(#singlePetalGrad)"
                stroke="#d97706"
                strokeWidth="0.75"
              />
              <path
                d="M12 6 L12 30"
                stroke="#b45309"
                strokeWidth="0.5"
                strokeDasharray="2 2"
                opacity="0.6"
              />
              <defs>
                <linearGradient id="singlePetalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="50%" stopColor="#facc15" />
                  <stop offset="100%" stopColor="#eab308" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </div>
      ))}

      {/* Interactive Click Bursts */}
      {bursts.map((b) => {
        const rad = (b.angle * Math.PI) / 180;
        const dx = Math.cos(rad) * b.speed;
        const dy = Math.sin(rad) * b.speed - 30; // slight upward drift

        return (
          <div
            key={b.id}
            className="absolute transition-all duration-1000 ease-out pointer-events-none opacity-90 animate-ping-once"
            style={{
              left: `${b.x}px`,
              top: `${b.y}px`,
              transform: `translate(${dx}px, ${dy}px) rotate(${b.angle}deg)`,
            }}
          >
            <SunflowerIcon size={b.size} />
          </div>
        );
      })}
    </div>
  );
};

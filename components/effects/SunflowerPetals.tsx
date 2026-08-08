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
  const [flowers, setFlowers] = useState<Petal[]>([]);
  const [bursts, setBursts] = useState<BurstPetal[]>([]);

  useEffect(() => {
    // Generate background floating FULL WHOLE sunflowers
    const count = 18;
    const generated: Petal[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.floor(Math.random() * 24) + 24, // 24px to 48px full sunflowers
      duration: Math.random() * 10 + 12, // 12s to 22s
      delay: Math.random() * 10, // 0s to 10s
      rotation: Math.floor(Math.random() * 360),
      isFullFlower: true,
    }));
    setFlowers(generated);

    // Click listener to spawn mini full sunflower bursts on click/tap
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('input')) {
        return;
      }

      const clickX = e.clientX;
      const clickY = e.clientY + window.scrollY;

      const newBursts: BurstPetal[] = Array.from({ length: 6 }).map((_, idx) => ({
        id: Date.now() + idx + Math.random(),
        x: clickX,
        y: clickY,
        angle: Math.random() * 360,
        speed: Math.random() * 50 + 25,
        size: Math.random() * 18 + 18,
      }));

      setBursts((prev) => [...prev.slice(-18), ...newBursts]);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {/* Background Falling Full Whole Sunflowers */}
      {flowers.map((f) => (
        <div
          key={f.id}
          className="absolute animate-float-petal opacity-85 hover:opacity-100"
          style={{
            left: `${f.left}%`,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            transform: `rotate(${f.rotation}deg)`,
          }}
        >
          <SunflowerIcon size={f.size} className="animate-spin-slow" />
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

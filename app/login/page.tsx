"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, KeyRound, ArrowRight } from 'lucide-react';
import { Tape, SunflowerSticker } from '@/components/scrapbook/Decorations';

export default function LoginPage() {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Warm up/unlock browser Audio Context on user gesture so video sound plays unmuted seamlessly
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
      }
    } catch {
      // Ignore if AudioContext is not supported
    }

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push('/');
        router.refresh();
      } else {
        setError(data.error || 'Incorrect passcode. Try again.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen paper-texture flex flex-col items-center justify-center p-4">
      {/* Neutral password card - completely unrevealing */}
      <div className="relative w-full max-w-md bg-amber-50/90 border border-amber-200/80 p-8 rounded-lg scrapbook-shadow overflow-hidden">
        <Tape color="bg-amber-200/90 border-amber-300" position="top-center" />

        <div className="absolute top-3 right-3 z-10">
          <SunflowerSticker size={40} rotation="rotate-12" />
        </div>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 p-3 bg-amber-100/80 rounded-full text-amber-800 mb-3 border border-amber-300/80">
            <Lock className="w-5 h-5" />
          </div>

          <h1 className="text-2xl font-bold font-sans text-stone-800 tracking-tight">
            Restricted Entry
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode..."
                required
                className="w-full px-4 py-3 bg-white border border-stone-300 rounded-md font-mono text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-base"
              />
              <KeyRound className="w-5 h-5 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-800 hover:bg-amber-900 text-amber-50 font-bold py-3 px-4 rounded-md shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-base"
          >
            <span>{loading ? 'Verifying...' : 'Unlock Collection'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </main>
  );
}

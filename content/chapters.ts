export interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  tagline: string;
  theme: 'playful' | 'funny' | 'transition' | 'romantic' | 'birthday';
  bgGradient: string;
  tapeColor: string;
  stickerBg: string;
}

export const CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: "Chapter I: Wait, what is this?",
    subtitle: "The Unofficial Record of Odd Moments",
    tagline: "Smile because this entire page is for you!",
    theme: "playful",
    bgGradient: "from-amber-50 to-orange-100/60",
    tapeColor: "bg-amber-200/80 border-amber-300",
    stickerBg: "bg-yellow-200 text-yellow-900 border-yellow-400",
  },
  {
    id: 2,
    title: "Chapter II: The Inside Joke Vault",
    subtitle: "Snacks, Silly Faces & Unnecessary Debates",
    tagline: "Proof that we somehow survived all the random weirdness.",
    theme: "funny",
    bgGradient: "from-orange-50 to-amber-100/50",
    tapeColor: "bg-pink-200/80 border-pink-300",
    stickerBg: "bg-rose-200 text-rose-900 border-rose-400",
  },
  {
    id: 3,
    title: "Chapter III: The Quiet Shifts",
    subtitle: "When Funny Turns Into Unforgettable",
    tagline: "Somewhere between all the laughter, things got warm and steady.",
    theme: "transition",
    bgGradient: "from-rose-50 to-stone-100/80",
    tapeColor: "bg-rose-200/80 border-rose-300",
    stickerBg: "bg-amber-200 text-amber-900 border-amber-400",
  },
  {
    id: 4,
    title: "Chapter IV: The Heart of It",
    subtitle: "All the Reasons You Are Loved",
    tagline: "The little details, the quiet moments, and everything in between.",
    theme: "romantic",
    bgGradient: "from-amber-50/80 via-rose-50 to-stone-100",
    tapeColor: "bg-rose-300/80 border-rose-400",
    stickerBg: "bg-pink-300 text-pink-950 border-pink-400",
  },
  {
    id: 5,
    title: "Chapter V: August 23rd",
    subtitle: "The Grand Reveal & Celebration",
    tagline: "Happy Birthday to my favorite human in the whole wide world! ❤️",
    theme: "birthday",
    bgGradient: "from-rose-100 via-amber-100 to-yellow-100",
    tapeColor: "bg-yellow-300/80 border-yellow-400",
    stickerBg: "bg-amber-300 text-amber-950 border-amber-500",
  }
];

export interface MemoryItem {
  id: string;
  chapterId: number;
  type: 'image' | 'video' | 'note' | 'ticket';
  title: string;
  caption: string;
  date?: string;
  location?: string;
  mediaUrl?: string; // Path inside /media/images/ or /media/videos/ or external
  mediaUrls?: string[]; // Multiple photos for flipping stack
  items?: { mediaUrl?: string; title?: string; caption?: string; date?: string }[]; // Flip entire polaroids with custom messages per photo
  placeholderLabel?: string; // Clear label for user to replace
  mediaType?: 'portrait' | 'landscape' | 'square';
  rotation?: number; // degrees e.g. -4 to 4
  stickers?: string[]; // Emoji or doodle badges
  doodle?: 'heart' | 'arrow' | 'star' | 'sparkle' | 'smile';
  tapeColor?: string;
}

export const MEMORIES: MemoryItem[] = [
  // CHAPTER 1 - PLAYFUL / CHAOTIC
  {
    id: "mem-1",
    chapterId: 1,
    type: "image",
    title: "Exhibit A: The Candid Chaos",
    caption: "You weren't ready for this picture, which makes it 100x better than any posed photo.",
    date: "Day 1 of shenanigans",
    location: "Somewhere silly",
    mediaUrl: "/media/images/candid.jpg", // [ADD FUNNY PHOTO]
    placeholderLabel: "[ADD FUNNY CANDID PHOTO]",
    mediaType: "portrait",
    rotation: -3,
    stickers: ["📸"],
    doodle: "smile",
    tapeColor: "bg-yellow-200/90 border-yellow-400"
  },
  {
    id: "mem-2",
    chapterId: 1,
    type: "note",
    title: "Scrapbook Rules",
    caption: "Smile because this entire page is for you!",
    date: "Official Notice",
    rotation: 2,
    stickers: ["📝", "✨"],
    doodle: "sparkle"
  },
  {
    id: "mem-3",
    chapterId: 1,
    type: "image",
    title: "The Mid-Bite Moment",
    caption: "Catching you off guard while eating is my greatest achievement in life.",
    date: "Foodie adventure",
    mediaUrl: "/media/images/food.jpg", // [ADD FUNNY PHOTO]
    placeholderLabel: "[ADD FUNNY EATING/SNACK PHOTO]",
    mediaType: "landscape",
    rotation: 4,
    stickers: ["🍕", "🙈"],
    doodle: "arrow"
  },

  // CHAPTER 2 - INSIDE JOKES & SILLY MEMORIES
  {
    id: "mem-4",
    chapterId: 2,
    type: "video",
    title: "The Unfiltered Laugh",
    caption: "The exact moment you couldn't stop laughing at something completely stupid.",
    date: "Best video clip ever",
    mediaUrl: "/media/videos/unfiltered-laughter.mp4", // [ADD VIDEO]
    placeholderLabel: "[ADD SHORT FUNNY VIDEO CLIP]",
    mediaType: "portrait",
    rotation: -2,
    stickers: ["MUST WATCH"],
    tapeColor: "bg-rose-200/90 border-rose-400"
  },
  {
    id: "mem-5",
    chapterId: 2,
    type: "ticket",
    title: "Admit One: Midnight Ramble & Random Talks",
    caption: "Valid for infinite refills of random late night talks and deep conversations.",
    date: "Every Weekend",
    rotation: -1,
    stickers: ["🧋", "☕"]
  },
  {
    id: "mem-6",
    chapterId: 2,
    type: "image",
    title: "The Signature Expression",
    caption: "That look you give me right before you say 'Are you serious right now?'",
    date: "Captured live",
    items: [
      {
        mediaUrl: "/media/images/expression-1.jpg",
        title: "Kahi pe til hai kahi pe nishana",
        caption: "Targeting hearts with that sneaky, subtle glance 😉",
        date: "Captured live"
      },
      {
        mediaUrl: "/media/images/expression-2.jpg",
        title: "They not like us.",
        caption: "The smile + filter combo. Devastatingly effective.",
        date: `Classic ${process.env.NEXT_PUBLIC_RECIPIENT_NAME || 'memory'} moment`
      },
      {
        mediaUrl: "/media/images/expression-3.jpg",
        title: "The Unfiltered Smirk",
        caption: "I love this person soooo much.",
        date: "Unforgettable"
      },
      {
        mediaUrl: "/media/images/expression-4.jpg",
        title: "Thumbs up",
        caption: `Approved by ${process.env.NEXT_PUBLIC_RECIPIENT_NAME || 'You'} 👍 (100% certified cute)`,
        date: "Iconic moment"
      },
    ],
    placeholderLabel: "[ADD SILLY FACIAL EXPRESSION PHOTOS]",
    mediaType: "square",
    rotation: 3,
    stickers: ["💖"],
    doodle: "star"
  },

  // CHAPTER 3 - THE TRANSITION / SWEET MEMORIES
  {
    id: "mem-7",
    chapterId: 3,
    type: "image",
    title: "Let me capture your soul",
    caption: "The look you gave at that moment made me forget my surroundings.",
    date: "Spring Afternoon",
    location: "Somewhere",
    mediaUrl: "/media/images/stare.jpg", // [ADD MEMORY PHOTO]
    placeholderLabel: "[ADD BEAUTIFUL/SUNSET PHOTO]",
    mediaType: "landscape",
    rotation: -2,
    stickers: [],
    doodle: "heart",
    tapeColor: "bg-amber-200/90 border-amber-400"
  },
  {
    id: "mem-8",
    chapterId: 3,
    type: "video",
    title: "Puddle Splashes & Rainy Walks",
    caption: "Walking together in the rain while you intentionally splash water all over me with your legs 🌊☔",
    date: "A rainy day",
    mediaUrl: "/media/videos/rainy.mp4", // [ADD VIDEO]
    placeholderLabel: "[ADD SWEET VIDEO OR SCENIC CLIP]",
    mediaType: "landscape",
    rotation: 2,
    stickers: ["🌧️", "🤍"]
  },
  {
    id: "mem-9",
    chapterId: 3,
    type: "note",
    title: "Things I Noticed About You",
    caption: "How your eyes get so big when you see something you love, how you get awkward and don't know what to say when I say something sus and how you make everyone around you feel comfortable instantly.",
    date: "Quiet observation",
    rotation: -1,
    stickers: ["💭", "🌷"]
  },

  // CHAPTER 4 - THE HEART & APPRECIATION
  {
    id: "mem-10",
    chapterId: 4,
    type: "image",
    title: "My Favorite Smile",
    caption: "If I could preserve one single expression for the rest of my life, it would be this one right here.",
    date: "Unforgettable Day",
    mediaUrl: "/media/images/smile.jpeg", // [ADD PERSONAL PHOTO]
    placeholderLabel: "[ADD FAVORITE PORTRAIT PHOTO OF HER]",
    mediaType: "portrait",
    rotation: 1,
    stickers: ["❤️", "FAVORITE"],
    doodle: "heart",
    tapeColor: "bg-pink-300/90 border-pink-400"
  },
  {
    id: "mem-11",
    chapterId: 4,
    type: "image",
    title: "Side by Side",
    caption: "Every place is better when you're standing right next to me.",
    date: "One of those days",
    mediaUrl: "/media/images/together.jpg", // [ADD PERSONAL PHOTO]
    placeholderLabel: "[ADD PHOTO OF BOTH OF YOU TOGETHER]",
    mediaType: "landscape",
    rotation: -3,
    stickers: ["👩‍❤️‍👨", "🌟"],
    doodle: "sparkle"
  },
  {
    id: "mem-12",
    chapterId: 4,
    type: "note",
    title: "10 Reasons Why You're Amazing",
    caption: "1. Your kindness. 2. Your laughter. 3. How genuine you are. 4. Your energy. 5. Your warm hugs. 6. Your smart brain. 7. Your beautiful soul. 8. Just being YOU.",
    date: "From the bottom of my heart",
    rotation: 2,
    stickers: ["📜", "💖"]
  },

  // CHAPTER 5 - BIRTHDAY REVEAL & WISHES
  {
    id: "mem-13",
    chapterId: 5,
    type: "image",
    title: "The Birthday Star ✨",
    caption: `To the girl who turns ordinary days into magical memories. Happy Birthday, ${process.env.NEXT_PUBLIC_RECIPIENT_NAME || 'My Love'}!`,
    date: "August 23",
    mediaUrl: "/media/images/my-hero.jpeg",
    placeholderLabel: "[ADD SPECIAL BIRTHDAY / HERO PHOTO]",
    mediaType: "portrait",
    rotation: 0,
    stickers: ["🎂", "🥳", "👑", "🎉"],
    doodle: "heart",
    tapeColor: "bg-yellow-300/90 border-yellow-500"
  }
];

const recipient = process.env.NEXT_PUBLIC_RECIPIENT_NAME || 'You';
const recipient_nickname = process.env.NEXT_PUBLIC_RECIPIENT_NICKNAME || 'You';
const sender = process.env.NEXT_PUBLIC_SENDER_NAME || 'Me';

export const BIRTHDAY_MESSAGE = {
  recipient: recipient,
  date: "August 23",
  title: `Happy Birthday, ${recipient_nickname}`,
  subtitle: "Here's to another year of laughter, adventures, late-night talks, and endless memories together.",
  paragraphs: [
    "From the moment we started sharing small moments, funny inside jokes, and random silly conversations, my world got immeasurably brighter.",
    "You have this effortless ability to bring warmth and joy everywhere you go. Thank you for being my favorite person, my best friend, and the person who makes every single day special.",
    "On your birthday, I want to remind you how deeply loved, appreciated, and cherished you are. Today and every day, I hope your heart is filled with as much happiness as you give to everyone around you.",
    "Don't call yourself sad girl today please.",
    `Happy Birthday, ${recipient}! 🎂✨`
  ],
  closing: "Forever & Always,",
  sender: `With all my love, ${sender}`
};

export interface QuoteItem {
  id: string;
  chapterId: number;
  type: 'said' | 'likes' | 'personal';
  quote: string;
  context?: string;
  date?: string;
  rotation?: number; // e.g. -3 to 3 degrees
  tapePosition?: 'top-left' | 'top-right' | 'top-center' | 'bottom-center';
}

export const QUOTES: QuoteItem[] = [
  {
    id: "q-1",
    chapterId: 1,
    type: "said",
    quote: "Bacon pani hunu parni hoina? khoi tah?",
    context: "Guilty as sin... because I was the one who ate the bacon 🥓",
    date: "Bacon theft incident",
    rotation: -2,
    tapePosition: "top-right"
  },
  {
    id: "q-2",
    chapterId: 2,
    type: "said",
    quote: "ahh bhanee",
    context: "Said with 100% conviction",
    date: "A random afternoon",
    rotation: 3,
    tapePosition: "top-left"
  },
  {
    id: "q-3",
    chapterId: 2,
    type: "likes",
    // TODO: add her quote here
    quote: "We take photos as a return ticket to a moment otherwise gone.",
    context: "Favorite saved quote on her notes app",
    date: "Saved note",
    rotation: -1,
    tapePosition: "top-center"
  },
  {
    id: "q-4",
    chapterId: 3,
    type: "personal",
    quote: "You have a way of turning ordinary days into something I want to remember forever.",
    context: "A quiet thought from late evening walks",
    rotation: 2,
    tapePosition: "top-right"
  },
  {
    id: "q-5",
    chapterId: 4,
    type: "said",
    quote: "Look at the sky right now! Quickly, before it changes color!",
    context: "Mid-conversation sunset alert",
    rotation: -3,
    tapePosition: "top-left"
  },
  {
    id: "q-6",
    chapterId: 4,
    type: "likes",
    quote: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
    context: "Maya Angelou",
    rotation: 1,
    tapePosition: "top-center"
  },
  {
    id: "q-7",
    chapterId: 5,
    type: "personal",
    quote: "August 23rd brought the brightest light into my life. Happy Birthday, my whole heart.",
    context: "Birthday wish",
    rotation: 0,
    tapePosition: "top-center"
  }
];

# Paper Echoes — Digital Scrapbook Archive

A private, mobile-first digital scrapbook website created as a surprise birthday gift. The experience is designed as an intimate storytelling journey that evolves from playful and chaotic to sentimental, warm, and romantic.

---

## 🛠️ Tech Stack & Features

- **Framework**: Next.js 16 (App Router & Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 & Custom CSS paper textures
- **Animations**: Framer Motion, 3D Polaroid Card Flips, & Canvas Confetti
- **Icons**: Lucide React
- **Audio & Media**: Auto-play viewport videos with sound, Taylor Swift bg-music, and full Web Audio Context warmup
- **Auth**: Server-side JWT Cookie authentication (`jose`)
- **SEO & Privacy**: Configured with `noindex`, `robots.txt` disallow, and neutral branding metadata.

---

## 🔒 Secret Privacy & Authentication

To ensure the surprise remains completely secret:
1. **Neutral Branding**: All public metadata, page titles, project names, and URLs use neutral names (`paper-echoes`) without referencing any names, birthdays, or gift keywords.
2. **Password Vault**: Access is protected via a passcode screen. The passcode is verified via a Next.js Server API route (`/api/auth`) and stored securely in an HTTP-only JWT session cookie.
3. **Web Audio Unlock**: Submitting the login form warms up browser `AudioContext` to enable unmuted video & background music playback seamlessly without browser restrictions.
4. **Client Security**: Passcodes are **never** exposed in client-side JS bundles.

### Changing the Passcode
Update `.env.local` (or Vercel Environment Variables in production):

```env
SITE_PASSCODE=your_custom_secret_passcode
JWT_SECRET=your_random_secret_jwt_signing_key
```

---

## 📁 Project Structure

```
paper-echoes/
├── app/
│   ├── page.tsx               # Main Scrapbook Storyline
│   ├── login/page.tsx         # Passcode Authentication Screen & Audio Warmup
│   ├── api/auth/route.ts      # Secure Server Auth Route
│   ├── globals.css            # Paper Textures, Shadows & Custom CSS
│   └── layout.tsx             # Root layout with Google Handwriting fonts
├── components/
│   ├── scrapbook/
│   │   ├── PolaroidCard.tsx   # Polaroid card with 3D multi-photo flip & viewport video autoplay
│   │   ├── QuoteCard.tsx      # Handwritten quote cards ("That's what she said 💬")
│   │   ├── BirthdayReveal.tsx # Envelope reveal with confetti
│   │   └── Decorations.tsx    # Washi tapes, stamps, doodles
│   └── navigation/
│       ├── Navbar.tsx         # Responsive Chapter navigation & logout button
│       └── MusicPlayer.tsx    # Floating background music player ("August" by Taylor Swift)
├── content/
│   ├── chapters.ts            # Emotional storyline chapters metadata
│   ├── memories.ts            # Photos, videos, notes & birthday message (supports multi-item card flips)
│   └── quotes.ts              # Quotes she said, quotes she loves, & thoughts
├── public/
│   ├── media/
│   │   ├── images/            # Directory for user photos
│   │   ├── videos/            # Directory for user videos
│   │   └── audio/             # Directory for background music (Taylor-Swift-august.mp3)
│   └── robots.txt             # Disallow search engine crawlers
├── .env.example
├── README.md
└── WALKTHROUGH.md
```

---

## 🚀 Local Development Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment File**:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser. Default passcode: `memory2026`.

4. **Production Build Verification**:
   ```bash
   npm run build
   ```

---

## 📸 How to Add Your Own Photos, Videos & Quotes

### Adding Multi-Photo Flipping Polaroids
Polaroid cards support stack flipping! Tap any card to flip through multiple photos with custom titles and captions per side:
```ts
{
  id: "mem-6",
  chapterId: 2,
  type: "image",
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
      date: "Classic moment"
    }
  ]
}
```

### Adding Videos
Place video files inside `public/media/videos/` (e.g. `public/media/videos/rainy.mp4`). Videos automatically play with sound when scrolled into the viewport:
```ts
{
  id: "mem-8",
  chapterId: 3,
  type: "video",
  title: "Puddle Splashes & Rainy Walks",
  caption: "Walking together in the rain while you intentionally splash water all over me with your legs 🌊☔",
  mediaUrl: "/media/videos/rainy.mp4",
}
```

### Background Music
- Background audio plays **Taylor Swift - August** (`/media/audio/Taylor-Swift-august.mp3`).
- Audio starts playing by default and can be toggled using the floating music button in the bottom right corner.

### Adding & Customizing Quotes
Open `content/quotes.ts` and add quotes under the appropriate category (`said`, `likes`, or `personal`):
```ts
{
  id: "q-2",
  chapterId: 2,
  type: "said",
  quote: "ahh bhanee",
  context: "Said with 100% conviction",
}
```

---

## 🌐 Deploying to Vercel

1. Push this project repository to GitHub under a neutral name (e.g., `paper-echoes`).
2. Import the repository into **Vercel**.
3. Under **Environment Variables**, add:
   - `SITE_PASSCODE`: Set your secret passcode.
   - `JWT_SECRET`: Set a long random string.
4. Deploy! Your deployed URL will look like `https://paper-echoes.vercel.app` — giving away zero details about the surprise.

---

## 📱 Mobile & Security Checklist

- [x] Neutral repo/project name and deployment URL.
- [x] No search engine indexation (`robots.txt` + `noindex`).
- [x] Passcode protection backed by HTTP-only JWT cookies.
- [x] Interactive card flipping with per-item captions.
- [x] Viewport video autoplay with sound.
- [x] Default background music ("August" by Taylor Swift).
- [x] Responsive layout tested for mobile touch screens.
- [x] Smooth scroll chapter navigation and quick-lock feature.

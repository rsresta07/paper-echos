# Paper Echoes — Digital Scrapbook Archive

A private, mobile-first digital scrapbook website created as a surprise birthday gift. The experience is designed as an intimate storytelling journey that evolves from playful and chaotic to sentimental, warm, and romantic.

---

## 🛠️ Tech Stack & Features

- **Framework**: Next.js 16 (App Router & Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 & Custom CSS paper textures
- **Animations**: Framer Motion, 3D Multi-Photo Card Stack Flips, & Canvas Confetti
- **Icons**: Lucide React & Custom SVG Sunflower Icon
- **Audio & Media**: Viewport video auto-play with sound, Taylor Swift background music (`august`), and full Web Audio Context warmup
- **Decorations**: Stationary 3D sunflower stickers, torn paper tape, vintage stamps, and hand-drawn doodles
- **Auth**: Server-side JWT Cookie authentication (`jose`)
- **SEO & Privacy**: Configured with `noindex`, `robots.txt` disallow, and neutral branding metadata.

---

## 🔒 Secret Privacy & Authentication

To ensure the surprise remains completely secret:
1. **Neutral Branding**: All public metadata, page titles, project names, and URLs use neutral names (`paper-echoes`) without referencing any names, birthdays, or gift keywords.
2. **Password Vault**: Access is protected via a passcode screen. The passcode is verified via a Next.js Server API route (`/api/auth`) and stored securely in an HTTP-only JWT session cookie.
3. **Web Audio Unlock**: Submitting the login form warms up browser `AudioContext` and sets up global user-gesture listeners (`click`, `touchstart`, `pointerdown`, `keydown`) to enable unmuted video & background music playback seamlessly without browser restrictions or state flickering on reload.
4. **Client Security**: Passcodes are **never** exposed in client-side JS bundles.

### Changing Environment Variables & Personalization Settings
Update `.env.local` (or Vercel Environment Variables in production):

```env
# Access & Session Security
SITE_PASSCODE=your_custom_secret_passcode
JWT_SECRET=your_random_secret_jwt_signing_key

# Recipient & Sender Personalization
NEXT_PUBLIC_RECIPIENT_NAME=NameOfRecipient
NEXT_PUBLIC_RECIPIENT_NICKNAME=Nickname
NEXT_PUBLIC_SENDER_NAME=YourNameOrNickname
```

---

## 📁 Project Structure

```
paper-echoes/
├── app/
│   ├── page.tsx               # Main Scrapbook Storyline & Chapters
│   ├── login/page.tsx         # Passcode Authentication Screen & Audio Warmup
│   ├── api/auth/route.ts      # Secure Server Auth Route (JWT Cookie)
│   ├── globals.css            # Paper Textures, Scrapbook Shadows & Custom CSS
│   └── layout.tsx             # Root layout with Google Handwriting fonts
├── components/
│   ├── scrapbook/
│   │   ├── PolaroidCard.tsx   # Multi-photo stack flip, viewport video auto-play & captions
│   │   ├── QuoteCard.tsx      # Custom badge handwritten quote cards ("That's what she said 💬")
│   │   ├── BirthdayReveal.tsx # Interactive envelope reveal with confetti explosion
│   │   └── Decorations.tsx    # SunflowerSticker, Tape, Stamp, & Doodle components
│   ├── navigation/
│   │   ├── Navbar.tsx         # Responsive Chapter navigation & logout button
│   │   └── MusicPlayer.tsx    # Floating background music player ("August" by Taylor Swift)
│   └── ui/
│       └── SunflowerIcon.tsx  # Detailed SVG Sunflower Graphic Component
├── content/
│   ├── chapters.ts            # 5-Chapter emotional storyline metadata
│   ├── memories.ts            # Photos, videos, notes, coupons & birthday memories
│   └── quotes.ts              # Quotes she said, quotes she loves, & personal thoughts
├── public/
│   ├── media/
│   │   ├── images/            # Directory for user photos
│   │   ├── videos/            # Directory for user videos
│   │   └── audio/             # Background music (Taylor-Swift-august.mp3)
│   └── robots.txt             # Disallow search engine crawlers
├── .env.example
├── .env.local
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

### Multi-Photo Stack Flipping Polaroids
Polaroid cards support multi-item stack flipping! Tapping a polaroid smoothly flips through multiple photos, with each side displaying its own title, caption, date, and interactive tap counter (`1/N`):
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

### Autoplay Videos with Viewport Audio
Place video files inside `public/media/videos/` (e.g. `public/media/videos/rainy.mp4`). Videos automatically play with sound when scrolled into view and reset to the beginning (`currentTime = 0`) upon entering viewport:
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

### Adding & Customizing Quotes with Custom Badges
Open `content/quotes.ts` and add quotes under the appropriate category (`said`, `likes`, or `personal`). You can also pass a `customBadge` and custom `tapePosition`:
```ts
{
  id: "q-2",
  chapterId: 2,
  type: "said",
  customBadge: "A Memory Reminder 📷",
  quote: "ahh bhanee",
  context: "Said with 100% conviction",
  tapePosition: "top-right"
}
```

---

## 🌻 Sunflower Stickers & Scrapbook Aesthetic

- **Stationary Sunflower Pins**: Realistic 3D sunflower stickers (`SunflowerSticker`) are pinned across hero banners, chapter headers, and section corners with hover scale physics and drop-shadows.
- **Custom CSS Textures**: Paper grain texture (`.paper-texture`), realistic polaroid drop-shadows (`.polaroid-shadow`), and tape clipping polygons.
- **Handwritten Fonts**: Integrates Google Fonts (`Caveat` & `Indie Flower`) alongside clean mono badges for authentic scrapbook styling.

---

## 🔊 Audio & Viewport Video Sound Unlocking

- **Background Music**: Plays **Taylor Swift - August** (`/media/audio/Taylor-Swift-august.mp3`). Toggleable via floating player in the bottom right corner.
- **W3C Audio Unlock**: Authenticating at `/login` warms up the browser's `AudioContext`.
- **Persistent Gesture Listeners**: Global event listeners for user interactions (`click`, `touchstart`, `pointerdown`, `keydown`) prevent audio state flickering on page reload and ensure unmuted video/music playback.

---

## 🌐 Deploying to Vercel

1. Push this project repository to GitHub under a neutral name (e.g., `paper-echoes`).
2. Import the repository into **Vercel**.
3. Under **Environment Variables**, add:
   - `SITE_PASSCODE`: Set your secret passcode.
   - `JWT_SECRET`: Set a long random string.
   - `NEXT_PUBLIC_RECIPIENT_NAME`: Set the name of the recipient (e.g., `Swariya`).
   - `NEXT_PUBLIC_RECIPIENT_NICKNAME`: Set the recipient's nickname (e.g., `Swa:`).
   - `NEXT_PUBLIC_SENDER_NAME`: Set your name/nickname (e.g., `Dabba`).
4. Deploy! Your deployed URL will look like `https://paper-echoes.vercel.app` — giving away zero details about the surprise.

---

## 📱 Mobile & Security Checklist

- [x] Neutral repo/project name and deployment URL.
- [x] No search engine indexation (`robots.txt` + `noindex`).
- [x] Passcode protection backed by HTTP-only JWT cookies.
- [x] Interactive multi-photo card flipping with per-item captions and stack counter.
- [x] Viewport video autoplay with sound and automatic playback reset on view.
- [x] Background music player with persistent browser audio unlock.
- [x] Stationary 3D sunflower stickers and paper decor.
- [x] Personalization via `NEXT_PUBLIC_RECIPIENT_NAME`, `NEXT_PUBLIC_RECIPIENT_NICKNAME`, and `NEXT_PUBLIC_SENDER_NAME`.
- [x] Responsive layout optimized for mobile touch screens.
- [x] Smooth scroll chapter navigation and quick-lock feature.

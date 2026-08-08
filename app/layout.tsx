import type { Metadata } from "next";
import { Caveat, Indie_Flower, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const indieFlower = Indie_Flower({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-handwriting",
});

// PRIVATE NEUTRAL METADATA (NO NAMES, DATES, OR BIRTHDAY KEYWORDS)
export const metadata: Metadata = {
  title: "Paper Echoes — Archive & Creative Notes",
  description: "A private digital archive and creative collection.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${caveat.variable} ${indieFlower.variable} h-full antialiased selection:bg-amber-200 selection:text-amber-950`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FAF6EE] text-stone-800 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

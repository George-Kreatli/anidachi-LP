import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AniDachi – Watch Anime Together",
  description:
    "AniDachi is a platform for watching anime together. Subscribe for watchrooms, real-time chat, Chrome extension, and more.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://anidachi.com"
  ),
  openGraph: {
    title: "AniDachi – Watch Anime Together",
    description:
      "AniDachi is a platform for watching anime together. Subscribe for watchrooms, real-time chat, Chrome extension, and more.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Anidachi_logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

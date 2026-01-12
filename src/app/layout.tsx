import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { DeveloperMenu } from "@/components/DeveloperMenu";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
  display: 'swap',
});

const inter = Inter({
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "WebChronicles",
    template: "%s | WebChronicles",
  },
  description: "A mobile-first time-travel experience through the internet's collective memory. Explore the mood and headlines of the past.",
  keywords: ["web chronicles", "internet history", "time travel", "news archive", "digital memory", "mood tracker"],
  authors: [{ name: "Omar" }],
  creator: "Omar",
  metadataBase: new URL("https://web-chronicles.vercel.app"),
  openGraph: {
    title: "WebChronicles",
    description: "A mobile-first time-travel experience through the internet's collective memory.",
    url: "https://web-chronicles.vercel.app",
    siteName: "WebChronicles",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "WebChronicles - Time Travel through Internet Memory",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebChronicles",
    description: "A mobile-first time-travel experience through the internet's collective memory.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'ltOHfaJHtxf2j6OxaHMl4iVZtYk7kfGFAnl8RvVxiI0',
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${outfit.variable} ${inter.variable} font-sans antialiased bg-black text-white overflow-x-hidden selection:bg-white/20`}>
        <DeveloperMenu />
        {children}
      </body>
    </html>
  );
}

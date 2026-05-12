import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Integral Media | Growth Systems & Media Intelligence",
    template: "%s | Integral Media"
  },
  description: "A next-generation media intelligence and growth systems company powering future brands and companies through strategic power and precision execution.",
  keywords: ["Media Intelligence", "Growth Systems", "AI Automation", "Performance Marketing", "Cinematic Content", "Integral Media"],
  authors: [{ name: "Integral Media" }],
  creator: "Integral Media",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://integralmedia.com",
    title: "Integral Media | Future-Facing Growth Engine",
    description: "Next-generation media intelligence and growth systems.",
    siteName: "Integral Media",
  },
  twitter: {
    card: "summary_large_image",
    title: "Integral Media | Future-Facing Growth Engine",
    description: "Next-generation media intelligence and growth systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "font-sans antialiased selection:bg-white/10"
        )}
      >
        <div className="fixed inset-0 -z-10 bg-[#050505]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,20,1)_0%,rgba(5,5,5,1)_100%)]" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
        </div>
        <main className="relative flex min-h-screen flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}

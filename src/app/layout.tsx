import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScroll";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { CustomCursor } from "@/components/ui/CustomCursor";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Daugherty & Honey | Make It Golden | Belmont SGA 2026",
  description:
    "Vote Daugherty & Honey for Belmont SGA President & Vice President 2026. A golden vision for student wellness, campus unity, academic advocacy, and sustainability.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍯</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="video" href="/hero-video.mp4" type="video/mp4" />
      </head>
      <body
        className={`${cormorant.variable} ${montserrat.variable} antialiased`}
      >
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <CustomCursor />
        <GrainOverlay />
      </body>
    </html>
  );
}

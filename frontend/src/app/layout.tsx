import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

import { Orbitron } from "next/font/google";
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ifat Ahmed Rafin | Full-Stack Architect",
  description: "Ultra-premium futuristic technology portfolio of Ifat Ahmed Rafin.",
};

import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${orbitron.variable} font-sans antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

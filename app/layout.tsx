import type { Metadata } from "next";
import { Public_Sans, Outfit, Space_Mono } from "next/font/google";
import "./globals.css";

// Heading Font: Bold, geometric, and very "Badass" for titles
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

// Body Font: The gold standard for institutional/government UIs
const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

// Data/Code Font: High-contrast for legal case numbers
const spaceMono = Space_Mono({
  weight: ['400', '700'],
  variable: "--font-space-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VERDICT | SINPF",
  description: "Legal Case Management Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${outfit.variable} 
          ${publicSans.variable} 
          ${spaceMono.variable} 
          font-body antialiased bg-[#F8FAFC] text-slate-900
        `}
      >
        {children}
      </body>
    </html>
  );
}
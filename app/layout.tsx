import type { Metadata } from "next";
import "./globals.css";
import Navbar from './Components/Navbar';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Blitz Pixel Media",
  description: "Digital Content Creation and Cinematography Agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn('h-full antialiased', "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col bg-black">
        <Navbar />
        {children}

      </body>
    </html>
  );
}

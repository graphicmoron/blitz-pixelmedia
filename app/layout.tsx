import type { Metadata } from "next";
import "./globals.css";

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
      className={'h-full antialiased'}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

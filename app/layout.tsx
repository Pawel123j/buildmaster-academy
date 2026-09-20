import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "BuildMaster Academy",
  description: "Interactive PC building academy with compatibility checks, budget builds, progress tracking, and quizzes."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Zmienne fontów muszą siedzieć na <html>, a nie na <body>: preflight
    // Tailwinda ustawia na <html> `font-family: var(--font-geist-sans), ...`.
    // Gdy zmienna jest zadeklarowana dopiero na <body>, na <html> jest pusta,
    // cała deklaracja staje się nieprawidłowa i przeglądarka schodzi do
    // domyślnego kroju — czyli Times New Roman, który <body> potem dziedziczy.
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

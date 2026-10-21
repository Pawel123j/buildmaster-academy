import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

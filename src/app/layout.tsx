import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

export const metadata: Metadata = {
  title: "Hompimpa — AI Facility Intelligence",
  description: "Monitor, analyze, and optimize your facilities in real-time with Hompimpa's advanced AI dashboard.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300..800&family=Geist:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

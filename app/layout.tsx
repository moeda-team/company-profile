'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>ACME — Build Your System, Describe Your Problem</title>
        <meta name="description" content="A powerful, flexible modular system that helps you organize work, track progress, and deliver results all in one place." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="ACME — Build Your System" />
        <meta property="og:description" content="A powerful, flexible modular system for modern businesses." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://acme.example.com" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

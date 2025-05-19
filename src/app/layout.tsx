import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import PromoBanner from '@/components/PromoBanner';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Nova e-commerce',
  description: 'An online store with a variety of products for the modern techie',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          `${geistSans.variable} ${geistMono.variable} antialiased ` +
          `flex flex-col min-h-screen`
        }
      >
        {/* Wrap client components in Suspense at layout level */}
        <Suspense fallback={null}>
          <PromoBanner />
        </Suspense>

        <Header />

        {/* Wrap all page content in a single Suspense boundary */}
        <Suspense fallback={null}>
          <main className="flex-grow">
            {children}
          </main>
        </Suspense>

        <Footer />
      </body>
    </html>
  );
}

"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-purple-100 shadow-md py-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between p-4">
        <p className="text-gray-700 text-sm">
          © {currentYear} Designed and developed by          <Link
            href="https://tara-olivia.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:underline"
          >
            Tara Olivia Bjørheim
          </Link> All rights reserved.
        </p>
        <nav className="flex items-center gap-6 mt-2 md:mt-0">
          <Link href="/contact" className="text-gray-800 hover:underline">
            Contact Us
          </Link>

        </nav>
      </div>
    </footer>
  );
}
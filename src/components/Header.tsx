"use client";

import Link from "next/link";
import CartIcon from "./CartIcon";

export default function Header() {
  return (
    <header className="w-full bg-purple-100 shadow-md pt-12 fixed z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Nova
        </Link>
        <h2 className="text-black">For all the ways you shine</h2>
        <nav className="flex items-center gap-6">
          <CartIcon />
        </nav>
      </div>
    </header>
  );
}

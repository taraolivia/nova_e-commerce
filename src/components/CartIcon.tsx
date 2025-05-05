"use client";

import Link from "next/link";

export default function CartIcon() {
  const cartCount = 3; // 🔧 Replace with context later

  return (
    <Link href="/cart" className="relative inline-block">
<span className="text-2xl">🛒</span>
{cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </Link>
  );
}

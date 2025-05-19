// components/CartOverlay.tsx
"use client";

import { useCartStore } from "@/app/stores/useCartStore";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function CartOverlay() {
  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const toggleOverlay = () => setIsOpen((prev) => !prev);
  const closeOverlay = () => setIsOpen(false);

  // 🧠 Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
        closeOverlay();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // ❌ Don't show on /cart
  if (pathname === "/cart") return null;

  return (
    <div className="relative z-50">
      <button onClick={toggleOverlay} className="relative">
        🛒
        {itemCount > 0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">{itemCount}</span>}
      </button>

      {isOpen && (
        <div ref={overlayRef} className="absolute right-0 mt-2 w-[50rem] bg-white border shadow-xl rounded-lg">
          <div className="p-4 max-h-[28rem] overflow-y-auto space-y-4">
            {items.length === 0 ? (
              <p className="text-sm text-gray-500">Your cart is empty.</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-3 items-start border-b pb-3 last:border-none">
                  <Link href={`/product/${item.id}`} onClick={closeOverlay} className="flex gap-3 flex-1 hover:opacity-90">
                    <Image src={item.image.url} alt={item.image.alt} width={70} height={70} className="rounded object-cover w-20 h-20" />
                    <div>
                      <h3 className="font-medium text-sm leading-tight">{item.title}</h3>
                      <p className="text-xs text-gray-600 mt-1">
                        {item.quantity} × ${item.discountedPrice.toFixed(2)}
                      </p>
                      <p className="text-sm font-semibold mt-1">${(item.quantity * item.discountedPrice).toFixed(2)}</p>
                    </div>
                  </Link>
                  <button onClick={() => removeFromCart(item.id)} className="text-sm text-red-500 hover:underline ml-1">
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="border-t px-4 py-3">
            <div className="flex justify-between text-sm mb-3 font-medium">
              <span>Total:</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>
            <Link href="/cart" onClick={closeOverlay} className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-medium">
              Go to cart
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

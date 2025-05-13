"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useCartStore } from "../stores/useCartStore";

export default function CheckoutSuccessPage() {
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  // 🧠 Capture a snapshot before the cart is cleared
  const orderItems = useMemo(() => cartItems, []);
  const orderNumber = useMemo(() => `#${Math.floor(100000 + Math.random() * 900000)}`, []);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-3xl font-bold mb-4 mt-35 text-green-600">🎉 Thank you for your purchase!</h1>

      <p className="mb-2 text-gray-700">
        Your order <span className="font-medium">{orderNumber}</span> has been placed and is now being processed.
      </p>

      {orderItems.length > 0 && (
        <div className="mb-6 text-left max-w-md mx-auto">
  <h2 className="text-lg font-semibold mb-4 text-gray-800">Order Summary</h2>
  <ul className="space-y-4">
    {orderItems.map((item) => (
      <li key={item.id} className="flex gap-4 items-center">
        <img
          src={item.image.url}
          alt={item.image.alt}
          className="w-16 h-16 object-cover rounded-md"
        />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-800">{item.title}</h3>
          <p className="text-xs text-gray-600">
            {item.quantity} × ${item.discountedPrice.toFixed(2)}
          </p>
        </div>
        <p className="text-sm font-semibold text-gray-800">
          ${(item.quantity * item.discountedPrice).toFixed(2)}
        </p>
      </li>
    ))}
  </ul>
  <div className="mt-6 border-t pt-4 text-sm flex justify-between font-medium text-gray-800">
    <span>Total</span>
    <span>
      $
      {orderItems
        .reduce(
          (total, item) => total + item.discountedPrice * item.quantity,
          0
        )
        .toFixed(2)}
    </span>
  </div>
</div>

      )}

      <div className="flex justify-center gap-6 text-sm font-medium">
        <Link href="/" className="text-blue-600 underline">
          ← Back to store
        </Link>
        <Link href="/contact" className="text-blue-600 underline">
          Contact support
        </Link>
      </div>
    </div>
  );
}

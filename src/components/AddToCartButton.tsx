// components/AddToCartButton.tsx
"use client";

import { useCartStore } from "@/app/stores/useCartStore";
import type { Product } from "@/app/types/Types";

export default function AddToCartButton({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <button
      onClick={() => addToCart(product)}
      className="bg-blue-600 text-white px-6 py-2 rounded mt-4"
    >
      Add to Cart
    </button>
  );
}

"use client";

import { useCartStore } from "../stores/useCartStore";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CartPage() {
  const { items, removeFromCart, clearCart, getTotal } = useCartStore();
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout-success");
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {/* Left: Cart Items */}
          <div className="md:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 bg-white shadow rounded-lg"
              >
                <Image
                  src={item.image.url}
                  alt={item.image.alt}
                  width={100}
                  height={100}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-600">
                    {item.quantity} × ${item.discountedPrice.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-800 mt-1">
                    Total: ${(item.quantity * item.discountedPrice).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Right: Summary */}
          <div className="bg-white shadow rounded-lg p-6 h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <p className="mb-4">
              Total items:{" "}
              <span className="font-medium">
                {items.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </p>
            <p className="text-lg font-semibold mb-6">
              Total: ${getTotal().toFixed(2)}
            </p>
            <button
              onClick={handleCheckout}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
            >
              Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full mt-3 text-sm text-gray-500 underline"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

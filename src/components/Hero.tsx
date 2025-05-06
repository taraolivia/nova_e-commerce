"use client";

import { useEffect, useState } from "react";
import { useProducts } from "@/app/hooks/useProducts";
import type { Product } from "@/app/types/Types";
import Image from "next/image";
import Link from "next/link";

// Expanded category colors
const tagColors: Record<string, string> = {
  perfume: "from-pink-200 to-pink-500",
  beauty: "from-rose-300 to-rose-600",
  toy: "from-yellow-300 to-yellow-500",
  headphones: "from-indigo-400 to-indigo-700",
  storage: "from-gray-400 to-gray-600",
  electronics: "from-purple-500 to-blue-600",
  audio: "from-sky-400 to-indigo-500",
  fashion: "from-red-300 to-pink-500",
  bags: "from-orange-300 to-amber-500",
  "skin care": "from-lime-200 to-emerald-400",
  shoes: "from-blue-300 to-blue-600",
  glasses: "from-amber-300 to-yellow-500",
  accessories: "from-cyan-300 to-teal-500",
  jewelry: "from-yellow-200 to-yellow-400",
  watch: "from-gray-300 to-slate-600",
  watches: "from-zinc-400 to-neutral-600",
  wearables: "from-green-300 to-green-600",
  shampoo: "from-emerald-200 to-emerald-500",
  peripherals: "from-fuchsia-300 to-violet-500",
  gaming: "from-indigo-600 to-purple-700",
  computers: "from-slate-400 to-slate-700",
  default: "from-gray-200 to-gray-400",
};

export default function HeroSection() {
  const { products, loading } = useProducts();
  const [activeIndex, setActiveIndex] = useState(0);

  const featured: Product[] = products;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featured.length);
    }, 5000); // change every 5 seconds
    return () => clearInterval(interval);
  }, [featured.length]);

  if (loading || featured.length === 0) return null;

  const product = featured[activeIndex];

  const tag =
    product.tags.find((tag) => tagColors[tag.toLowerCase()]) || "default";
  const bgGradient = tagColors[tag.toLowerCase()] || tagColors.default;

  return (
    
<section
  className={`w-full h-[80vh] bg-gradient-to-r ${bgGradient} transition-[background] duration-700 ease-in-out`}
>


  <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row h-full items-end self-end justify-between gap-8">
    
    {/* Text pinned to bottom-left */}
    <div className="flex-1 flex flex-col justify-end text-left text-white h-full pb-12">
      <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
      <p className="mb-6 max-w-lg">{product.description}</p>
      <Link href={`/product/${product.id}`}>
        <span className="inline-block bg-white text-black font-medium px-6 py-2 rounded hover:bg-opacity-80 transition">
          View Product
        </span>
      </Link>
    </div>

    {/* Image pinned to bottom-right in fixed-height container */}
    <div className="flex-1 flex items-end h-full justify-end pb-12">
  <div className="w-full max-w-md h-full flex items-end justify-end">
  <Image
  key={product.image.url}
  src={product.image.url}
  alt={product.image.alt || product.title}
  width={400}
  height={400}
  className="object-contain max-h-full drop-shadow-xl opacity-0 transition-opacity duration-750"
  onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
/>

  </div>
</div>


  </div>
</section>


  );
}

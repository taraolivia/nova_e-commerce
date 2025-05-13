// components/HeroSection.tsx
"use client";

import { useEffect, useState } from "react";
import { useProducts } from "@/app/hooks/useProducts";
import Image from "next/image";
import Link from "next/link";
import BlobLayer from "./BlobLayer";

export default function HeroSection() {
  const { products, loading } = useProducts();
  const [activeIndex, setActiveIndex] = useState(0);
  

  // Cycle through products every 8 seconds
  useEffect(() => {
    const iv = setInterval(() => {
      setActiveIndex((i) => (i + 1) % products.length);
    }, 6000);
    return () => clearInterval(iv);
  }, [products.length]);

  if (loading || products.length === 0) return null;
  const product = products[activeIndex];
  const categoryKey = product.tags?.[0]?.toLowerCase() || "default";

    

  return (
    <>

      <section
        className="relative overflow-visible w-full h-[80vh] bg-yellow-50"
        style={{
          transition: "background-image 0.7s ease-in-out",
        }}
      >
        {/* BlobLayer morphing blobs behind the content */}
        <BlobLayer category={categoryKey} step={activeIndex} />

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col md:flex-row h-full items-end justify-between gap-8">
          {/* Text */}
          <div className="flex-1 flex flex-col justify-end text-left text-black h-full pb-12">
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            <p className="mb-6 max-w-lg">{product.description}</p>
            <Link href={`/product/${product.id}`}>
              <span className="inline-block bg-white text-black font-medium px-6 py-2 rounded hover:bg-opacity-80 transition">
                View Product
              </span>
            </Link>
          </div>
          {/* Image */}
          <div className="flex-1 flex items-end h-full justify-end pb-12">
            <Image
              src={product.image.url}
              alt={product.image.alt || product.title}
              width={400}
              height={400}
              className="object-contain max-h-full drop-shadow-xl opacity-0 transition-opacity duration-750"
              onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
              priority
            />
          </div>
        </div>
      </section>
    </>
  );
}

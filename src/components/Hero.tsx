"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full bg-gray-100 py-16 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Discover Deals You’ll Love
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Explore our handpicked selection of top products — up to 75% off.
        </p>
        <Link
          href="#products"
          className="inline-block bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}

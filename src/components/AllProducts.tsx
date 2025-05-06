"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import FilterSidebar from "./FilterSidebar";
import ProductCard from "./ProductCard";
import { useProducts } from "@/app/hooks/useProducts";
import type { Product } from "@/app/types/Types"; // adjust path if needed

export default function AllProducts() {
  const [search, setSearch] = useState("");
  const { products, loading, error } = useProducts();

  // Filter based on search
  const filtered = products.filter((product: Product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="products" className="px-4 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        <FilterSidebar />

        <div className="w-full">
          <SearchBar value={search} onChange={setSearch} />

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-600">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product: Product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                image={product.image}
                price={product.price}
                discountedPrice={product.discountedPrice}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

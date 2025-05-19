"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import SearchBar from "./SearchBar";
import FilterSidebar from "./FilterSidebar";
import ProductCard from "./ProductCard";
import { useProducts } from "@/app/hooks/useProducts";
import type { Product } from "@/app/types/Types";

export default function AllProducts() {
  const [search, setSearch] = useState("");
  const { products, loading, error } = useProducts();
  const searchParams = useSearchParams();

  // URL-driven filters
  const categories = searchParams.getAll("category");
  const onSale = searchParams.get("onSale") === "true";
  const sortBy = searchParams.get("sortBy") || "";



  const filteredProducts = useMemo(() => {
    let list = products
      // Text search
      .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
      // Category filter
      .filter((p) =>
        categories.length ? p.tags.some((t) => categories.includes(t)) : true
      )
      // On-sale filter
      .filter((p) => (onSale ? p.discountedPrice < p.price : true));

    // Sorting logic
    switch (sortBy) {
      case "price-asc":
        list = [...list].sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case "discount-asc":
        list = [...list].sort(
          (a, b) => (a.price - a.discountedPrice) - (b.price - b.discountedPrice)
        );
        break;
      case "discount-desc":
        list = [...list].sort(
          (a, b) => (b.price - b.discountedPrice) - (a.price - a.discountedPrice)
        );
        break;
      default:
        break;
    }

    return list;
  }, [products, search, categories, onSale, sortBy]);

  return (
    <section id="products" className="px-4 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        <FilterSidebar products={products} />

        <div className="w-full">
          <SearchBar value={search} onChange={setSearch} />

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-600">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product: Product) => (
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

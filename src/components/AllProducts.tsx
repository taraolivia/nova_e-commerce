"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import FilterSidebar from "./FilterSidebar";
import ProductCard from "./ProductCard";

const mockProducts = [
  { id: "1", title: "Product A" },
  { id: "2", title: "Product B" },
  { id: "3", title: "Product C" },
  { id: "4", title: "Product D" },
];

export default function AllProducts() {
  const [search, setSearch] = useState("");

  const filtered = mockProducts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="products" className="px-4 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        <FilterSidebar />

        <div className="w-full">
          <SearchBar value={search} onChange={setSearch} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} title={product.title} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

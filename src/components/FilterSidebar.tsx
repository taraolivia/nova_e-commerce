"use client";

import { useRouter, useSearchParams } from "next/navigation";

import type { Product } from "@/app/types/Types";

type FilterSidebarProps = {
  products: Product[];
};

export default function FilterSidebar({ products }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // current filters
  const selectedCats = searchParams.getAll("category");
  const onSale = searchParams.get("onSale") === "true";
  const sortBy = searchParams.get("sortBy") || "";

  // derive categories
  const uniqueCategories = Array.from(
    new Set(products.flatMap((p) => p.tags))
  ).sort();

  // sort options
  const sortOptions = [
    { value: "", label: "Default" },
    { value: "price-asc", label: "Price: Low → High" },
    { value: "price-desc", label: "Price: High → Low" },
    { value: "discount-asc", label: "Discount: Low → High" },
    { value: "discount-desc", label: "Discount: High → Low" },
  ];

  function updateParams(key: string, values: string[] | string | null) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    if (Array.isArray(values) && values.length) values.forEach((v) => params.append(key, v));
    else if (typeof values === "string") params.set(key, values);

    const q = params.toString();
    router.push(q ? `/?${q}` : "/", { scroll: false });
  }

  // clear all filters
  const clearAll = () => router.push("/", { scroll: false });

  return (
    <aside className="w-full md:w-1/4 mb-6 md:mb-0 self-start sticky top-20 h-[calc(100vh-5rem)]">
      <div className="flex flex-col h-full p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
        {/* Header with Clear All */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-700">Filters</h2>
          <button
            onClick={clearAll}
            className="flex items-center space-x-1 text-sm font-medium text-purple-600 hover:text-white hover:bg-purple-600 px-2 py-1 rounded transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-.894.553L4 4H2a1 1 0 100 2h1v10a2 2 0 002 2h8a2 2 0 002-2V6h1a1 1 0 100-2h-2l-.894-1.447A1 1 0 0014 2H6zm2 6a1 1 0 012 0v6a1 1 0 11-2 0V8zm4-1a1 1 0 10-2 0v6a1 1 0 102 0V7z" clipRule="evenodd" />
            </svg>
            <span>Clear All</span>
          </button>
        </div>

        {/* Sort */}
        <div className="mb-6">
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-600 mb-2">
            Sort By
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => updateParams("sortBy", e.target.value || null)}
            className="w-full appearance-none rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-700 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {/* On Sale Toggle */}
        <div className="mb-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={onSale}
              onChange={(e) => updateParams("onSale", e.target.checked ? "true" : null)}
              className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-400"
            />
            <span className="text-sm font-medium text-gray-700 uppercase">On Sale</span>
          </label>
        </div>

        {/* Categories */}
        <div className="flex-1 overflow-auto">
          <h3 className="mb-2 text-sm font-medium text-gray-600">Categories</h3>
          <div className="space-y-3">
            {uniqueCategories.map((cat) => (
              <label key={cat} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedCats.includes(cat)}
                  onChange={(e) => {
                    const newCats = e.target.checked
                      ? [...selectedCats, cat]
                      : selectedCats.filter((c) => c !== cat);
                    updateParams("category", newCats.length ? newCats : null);
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-400"
                />
                <span className="text-sm text-gray-700 capitalize hover:text-purple-600 transition">
                  {cat}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

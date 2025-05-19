"use client";

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type="text"
      placeholder="Search products"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded border-amber-100 px-4 font-semibold py-2 mb-4 sticky top-28 bg-yellow-50"
    />
  );
}

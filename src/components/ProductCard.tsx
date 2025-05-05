"use client";

export default function ProductCard({ title }: { title: string }) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-md transition">
      <div className="h-40 bg-gray-200 mb-4" />
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );
}

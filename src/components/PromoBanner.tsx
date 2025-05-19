"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PromoBanner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const onSale = searchParams.get('onSale') === 'true';

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    // Toggle onSale param
    if (onSale) {
      params.delete('onSale');
    } else {
      params.set('onSale', 'true');
    }
    const queryString = params.toString();
    // Navigate to home with updated params
    router.push(queryString ? `/?${queryString}` : '/');
  };

  return (
    <div
      className="w-full bg-purple-300 text-black text-center py-3 px-4 text-sm font-medium tracking-wide fixed top-0 z-50 shadow-md cursor-pointer"
      onClick={handleClick}
    >
      🎉 Selected items up to <span className="font-bold">75% off</span> – shop now!
    </div>
  );
}
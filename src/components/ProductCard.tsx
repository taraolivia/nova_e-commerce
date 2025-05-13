import type { Product } from "@/app/types/Types";
import Image from "next/image";
import Link from "next/link";


type Props = Pick<Product, "id" | "title" | "image" | "price" | "discountedPrice">;

export default function ProductCard({ title, image, price, discountedPrice, id }: Props) {
  const hasDiscount = discountedPrice < price;

  return (
    <Link href={`/product/${id}`}>

    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col h-full">
<Image
  src={image.url}
  alt={image.alt}
  width={800}
  height={400}
  className="w-full h-48 object-cover rounded-t-xl"
  style={{ width: "100%", height: "12rem" }} 
  priority 
/>

      <div className="p-4 flex flex-col flex-grow justify-between">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>

        <div className="mt-auto text-sm">
          {hasDiscount ? (
            <p>
              <span className="text-gray-500 line-through mr-2">${price.toFixed(2)}</span>
              <span className="text-green-600 font-bold">${discountedPrice.toFixed(2)}</span>
            </p>
          ) : (
            <span className="font-medium">${price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
    </Link>
  );
}

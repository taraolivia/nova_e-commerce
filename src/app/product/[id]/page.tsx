// app/product/[id]/page.tsx
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Product } from "@/app/types/Types";
import AddToCartButton from "@/components/AddToCartButton";
import { notFound } from "next/navigation";

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://v2.api.noroff.dev/online-shop/${id}`);
  if (!res.ok) return notFound();
  const payload = await res.json();
  return payload.data as Product;
}

export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);
  const hasDiscount = product.price > product.discountedPrice;
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">

      <div className="grid md:grid-cols-2 gap-8  mt-35">
<div>
<Breadcrumbs tags={product.tags} productTitle={product.title} />

        <Image
          src={product.image.url}
          alt={product.image.alt}
          width={600}
          height={600}
          className="rounded-xl object-cover"
        />    
</div>


        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="mb-4">{product.description}</p>

          <div className="mb-6">
            {hasDiscount ? (
              <div className="text-lg">
                <span className="font-bold text-red-500">
                  ${product.discountedPrice.toFixed(2)}
                </span>
                <span className="line-through text-gray-400 ml-2">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-green-600 ml-2">({discountPercentage}% OFF)</span>
              </div>
            ) : (
              <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
            )}
          </div>

          <AddToCartButton product={product} />



        </div>          {product.reviews.length > 0 && (
            <div className="mt-8">
              <h2 className="font-semibold text-xl mb-4">Reviews</h2>
              {product.reviews.map((review) => (
                <div key={review.id} className="bg-gray-100 rounded-lg p-4 mb-3">
                  <p className="font-semibold">{review.username}</p>
                  <p className="text-yellow-500">Rating: {review.rating} ⭐️</p>
                  <p>{review.description}</p>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}

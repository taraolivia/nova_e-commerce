// components/Breadcrumbs.tsx
import Link from "next/link";
import { sortTagsByPriority } from "@/app/utils/sortTagsByPriority";

type BreadcrumbsProps = {
  tags: string[];
  productTitle: string;
};

export default function Breadcrumbs({ tags, productTitle }: BreadcrumbsProps) {
  const orderedTags = sortTagsByPriority(tags);

  return (
    <nav aria-label="Breadcrumb" className="text-sm mb-4">
      <ol className="flex space-x-2">
        <li>
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
        </li>

        {orderedTags.map((tag) => (
          <li key={tag}>
            <Link
              href={`/?category=${encodeURIComponent(tag)}`}
              className="text-blue-600 hover:underline capitalize"
            >
              {tag}
            </Link>
            <span className="mx-2">/</span>
          </li>
        ))}

        <li className="text-gray-500 capitalize">{productTitle}</li>
      </ol>
    </nav>
  );
}

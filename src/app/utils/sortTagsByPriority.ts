// utils/sortTagsByPriority.ts
import { tagPriority } from "./tagPriority";

export function sortTagsByPriority(tags: string[]): string[] {
  return tags.slice().sort((a, b) => {
    const indexA = tagPriority.indexOf(a);
    const indexB = tagPriority.indexOf(b);
    return indexA - indexB;
  });
}

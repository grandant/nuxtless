import type { ProductDetail } from "~~/types/product";
import type { BreadcrumbItem } from "@nuxt/ui";

export function getProductTrail(product: ProductDetail): BreadcrumbItem[] {
  const collections = product?.collections ?? [];
  return collections
    .slice()
    .filter((c) => c.slug !== "__root_collection__")
    .map((c) => ({
      label: c.name,
      to: `/category/${c.slug}`,
    }));
}

import type { BreadcrumbItem } from "@nuxt/ui";

import type { ProductDetail } from "#layers/nuxtless/validators/product";

export function getProductTrail(
  product: ProductDetail | undefined | null,
): BreadcrumbItem[] {
  const collections = product?.collections ?? [];

  return collections
    .slice()
    .filter((c) => c.slug !== "__root_collection__")
    .map((c) => ({
      label: c.name,
      to: `/category/${c.slug}`,
    }));
}

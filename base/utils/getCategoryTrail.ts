import type { BreadcrumbItem } from "@nuxt/ui";
import type { MenuCollections } from "~~/types/collection";

export function getCategoryTrail(): BreadcrumbItem[] {
  const route = useRoute();
  const slug = route.params.slug as string;

  const menuCollections = useState<MenuCollections>("menuCollections");
  const menuItems = menuCollections.value?.collections.items ?? [];

  const parent = menuItems.find((top) =>
    top.children?.some((child) => child.slug === slug),
  );

  const current = parent
    ? parent.children?.find((child) => child.slug === slug)
    : menuItems.find((top) => top.slug === slug);

  if (!current) return [];

  const collections: BreadcrumbItem[] = [];

  if (parent) {
    collections.push({
      label: parent.name,
      to: `/category/${parent.slug}`,
    });
  }

  collections.push({
    label: current.name,
    to: `/category/${current.slug}`,
  });

  return collections;
}

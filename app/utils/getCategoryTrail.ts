import { readFragment } from "gql.tada";

import { CollectionMenuFragment } from "#layers/nuxtless/gql/fragments/collection";

import type { BreadcrumbItem } from "@nuxt/ui";

export async function getCategoryTrail(): Promise<BreadcrumbItem[]> {
  const route = useRoute();
  const slug = route.params.slug as string;

  const { data: menuCollections } = await useMenuCollections();
  const menuItems = menuCollections.value?.collections.items ?? [];
  const collectionItems = readFragment(CollectionMenuFragment, menuItems);

  const parent = collectionItems.find((top) =>
    top.children?.some((child) => child.slug === slug),
  );

  const current = parent
    ? parent.children?.find((child) => child.slug === slug)
    : collectionItems.find((top) => top.slug === slug);

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

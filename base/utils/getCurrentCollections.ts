import type {
  MenuCollections,
  TopLevelCollection,
  ChildCollection,
} from "~~/types/collection";

export function getCurrentCollections(): {
  parent?: TopLevelCollection;
  current?: TopLevelCollection | ChildCollection;
} {
  /**
   * Returns the current and parent collections based on the active route slug.
   * Uses pre-fetched menuCollections state to avoid extra API calls.
   * Supports two-level collection trees: top-level and their direct children.
   *
   * If the slug matches a top-level collection, `current` will be that item and `parent` will be undefined.
   * If the slug matches a child collection, `current` will be the child and `parent` will be its top-level parent.
   */

  const route = useRoute();
  const slug = route.params.slug as string;
  // Using menuCollections because it already includes the required data
  const menuCollections = useState<MenuCollections>("menuCollections");
  const menuItems = menuCollections.value?.collections.items ?? [];

  const parent = menuItems.find((top) =>
    top.children?.some((child) => child.slug === slug),
  );

  const current: TopLevelCollection | ChildCollection | undefined = parent
    ? parent.children?.find((child) => child.slug === slug)
    : menuItems.find((top) => top.slug === slug);

  return { parent, current };
}

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import type { MenuCollections } from "~~/types/collection";

const menuCollections = useState<MenuCollections>("menuCollections");
const localePath = useLocalePath();

const items = computed<NavigationMenuItem[]>(
  () =>
    menuCollections.value?.collections.items.map((collection) => ({
      label: collection.name,
      to: localePath(`/categories/${collection.slug}`),
      avatar: { src: collection.featuredAsset?.preview },
      children: collection.children?.map((child) => ({
        label: child.name,
        to: localePath(`/categories/${child.slug}`),
      })),
    })) ?? [],
);
</script>

<template>
  <UNavigationMenu :items="items" />
</template>

<style lang="css" scoped></style>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const { data } = await useAsyncGql("GetMenuCollections");
const localePath = useLocalePath();

const items = computed<NavigationMenuItem[]>(
  () =>
    data.value?.collections.items.map((collection) => ({
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

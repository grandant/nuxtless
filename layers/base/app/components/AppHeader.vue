<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import type { MenuCollections } from "~~/types/collection";

const route = useRoute();
const menuCollections = useState<MenuCollections>("menuCollections");
const localePath = useLocalePath();

const items = computed<NavigationMenuItem[]>(
  () =>
    menuCollections.value?.collections.items.map((collection) => {
      const parentPath = localePath(`/category/${collection.slug}`);
      const isActive =
        route.path.startsWith(parentPath) ||
        collection.children?.some((child) =>
          route.path.startsWith(localePath(`/category/${child.slug}`)),
        );

      return {
        label: collection.name,
        to: parentPath,
        avatar: { src: collection.featuredAsset?.preview },
        defaultOpen: isActive,
        active: isActive,
        children: collection.children?.map((child) => ({
          label: child.name,
          to: localePath(`/category/${child.slug}`),
        })),
      };
    }) ?? [],
);
</script>

<template>
  <UHeader toggle-side="left">
    <template #left>
      <LogoElement :width="45" />
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
      content-orientation="vertical"
    />

    <template #right>
      <SearchModal />
      <AccountMenu />
      <CartTrigger />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        variant="pill"
        orientation="vertical"
        :ui="{ item: 'py-1', childItem: 'pt-2' }"
      />
    </template>
  </UHeader>
  <CartPanel />
</template>

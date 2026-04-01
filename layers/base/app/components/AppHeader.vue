<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import type { MenuCollections } from "~~/types/collection";

const { logoTop } = useAppConfig();
const route = useRoute();
const localePath = useLocalePath();

const menuCollections = useState<MenuCollections>("menuCollections");

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
      <LogoElement
        :logo-light="logoTop.light"
        :logo-dark="logoTop.dark"
        wrapper-class="w-full"
        height="50"
      />
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

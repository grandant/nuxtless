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
        children: collection.children?.map((child) => ({
          label: child.name,
          to: localePath(`/category/${child.slug}`),
        })),
      };
    }) ?? [],
);
</script>

<template>
  <header
    class="z-10 border-b bg-gray-50/80 py-2 backdrop-blur dark:bg-gray-800/80"
  >
    <div class="container flex justify-between">
      <div class="flex gap-4 sm:gap-6">
        <HeaderMobileMenu :items="items" class="flex md:hidden" />
        <LogoElement />
        <HeaderDesktopMenu :items="items" class="hidden md:flex" />
      </div>
      <div class="flex items-center gap-4 sm:gap-6">
        <SearchModal />
        <CartTrigger />
      </div>
    </div>
    <CartPanel />
  </header>
</template>

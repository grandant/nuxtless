<script setup lang="ts">
import { readFragment } from "gql.tada";

import { CollectionMenuFragment } from "#layers/nuxtless/gql/fragments/collection";

import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();
const localePath = useLocalePath();

const { data: menuCollections } = await useMenuCollections();

const items = computed<NavigationMenuItem[]>(
  () =>
    menuCollections.value?.collections.items.map((item) => {
      const collection = readFragment(CollectionMenuFragment, item);

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
      <ULink
        :to="localePath('/')"
        class="transition-opacity hover:opacity-80"
        aria-label="Home"
      >
        <LogoElement
          logo-light="logo-top.svg"
          logo-dark="logo-top.svg"
          wrapper-class="w-full h-[40px] md:h-[50px]"
        />
      </ULink>
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

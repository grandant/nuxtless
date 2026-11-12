<script setup lang="ts">
import { readFragment } from "gql.tada";

import { CollectionMenuFragment } from "#layers/nuxtless/gql/fragments/collection";

import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();
const { t } = useI18n();
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
      };
    }) ?? [],
);
</script>

<template>
  <UFooter>
    <template #top>
      <USeparator />
    </template>

    <template #left>
      <LogoElement wrapper-class="w-1/2" class="hidden md:block" />
    </template>

    <LogoElement class="me-6 block md:hidden" wrapper-class="w-1/3" />

    <UNavigationMenu
      :items="items"
      orientation="vertical"
      variant="link"
      class="block md:hidden"
    />
    <UNavigationMenu :items="items" variant="link" class="hidden md:block" />

    <template #bottom>
      <div class="flex justify-center">
        <p class="opacity-80">{{ t("messages.general.footer.unstack") }}</p>
      </div>
    </template>
  </UFooter>
</template>

<style lang="css" scoped></style>

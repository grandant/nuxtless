<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import type { MenuCollections } from "~~/types/collection";

const route = useRoute();
const { t } = useI18n();
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
      };
    }) ?? [],
);
</script>

<template>
  <UFooter>
    <template #top>
      <USeparator
        :avatar="{
          src: '/favicon.svg',
          loading: 'lazy',
        }"
      />
    </template>

    <template #left>
      <LogoElement
        logo-light="/logo-full.svg"
        logo-dark="/logo-full.svg"
        :width="115"
        class="hidden md:block"
      />
    </template>

    <LogoElement
      logo-light="/logo-full.svg"
      logo-dark="/logo-full.svg"
      :width="95"
      class="me-6 block md:hidden"
    />

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

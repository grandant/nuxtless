<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";

const localePath = useLocalePath();
const { parent, current } = getCurrentCollections();

const breadcrumbs = computed(() =>
  parent ? [parent, current] : current ? [current] : [],
);

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
  {
    label: "Home",
    icon: "i-lucide-home",
    to: localePath("/"),
  },
  ...breadcrumbs.value
    .filter(
      (item): item is Exclude<typeof item, undefined> => item !== undefined,
    )
    .map((item) => ({
      label: item.name,
      to: localePath(`/category/${item.slug}`),
    })),
]);
</script>

<template>
  <UBreadcrumb v-if="breadcrumbItems.length > 1" :items="breadcrumbItems" />
</template>

<style lang="css" scoped></style>

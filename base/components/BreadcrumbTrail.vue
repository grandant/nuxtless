<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";
import type { ProductDetail } from "~~/types/product";

const { product, trail } = withDefaults(
  defineProps<{
    product?: ProductDetail;
    trail: "category" | "product";
  }>(),
  {
    product: undefined,
  },
);

const localePath = useLocalePath();

const collections =
  trail === "category" ? getCategoryTrail() : getProductTrail(product);

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
  {
    label: "Home",
    icon: "i-lucide-home",
    to: localePath("/"),
  },
  ...collections,
]);
</script>

<template>
  <UBreadcrumb v-if="breadcrumbItems.length > 1" :items="breadcrumbItems" />
</template>

<style lang="css" scoped></style>

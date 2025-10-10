<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";
import type { ProductDetail } from "~~/types/product";

const { product = undefined, trail } = defineProps<{
  product?: ProductDetail;
  trail: "category" | "product";
}>();

const { t } = useI18n();
const localePath = useLocalePath();

const collections =
  trail === "category" ? getCategoryTrail() : getProductTrail(product);

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
  {
    label: t("messages.general.home"),
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

<script setup lang="ts">
import { UBadge } from "#components";

const { stockLevel } = defineProps<{
  stockLevel: string | undefined;
  sku: string | undefined;
}>();

const stockLevelMap = {
  IN_STOCK: { label: "In stock", color: "success" },
  LOW_STOCK: { label: "Low stock", color: "warning" },
  OUT_OF_STOCK: { label: "Out of stock", color: "error" },
} as const;

const stock = computed(
  () =>
    stockLevelMap[stockLevel as keyof typeof stockLevelMap] ??
    stockLevelMap.OUT_OF_STOCK,
);
</script>

<template>
  <div class="flex flex-row gap-4">
    <div>
      <UBadge :color="stock.color" variant="subtle">{{ stock.label }}</UBadge>
    </div>
    <div>
      <UBadge v-if="sku" color="neutral" variant="subtle">
        SKU: {{ sku }}</UBadge
      >
    </div>
  </div>
</template>

<style lang="css" scoped></style>

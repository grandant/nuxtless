<script setup lang="ts">
const { selectedVariant, stockLevel } = storeToRefs(useProductStore());
const { refreshStock } = useProductStore();

const sku = computed(() => selectedVariant.value?.sku);

const stockLevelMap = {
  IN_STOCK: { label: "In stock", color: "success" },
  LOW_STOCK: { label: "Low stock", color: "warning" },
  OUT_OF_STOCK: { label: "Out of stock", color: "error" },
} as const;

const stock = computed(
  () =>
    stockLevelMap[stockLevel.value as keyof typeof stockLevelMap] ??
    stockLevelMap.OUT_OF_STOCK,
);

watch(
  () => selectedVariant.value?.id,
  () => {
    refreshStock();
  },
  { immediate: true },
);
</script>

<template>
  <div class="flex flex-row gap-4">
    <div>
      <UBadge :color="stock.color" variant="subtle" class="uppercase">
        {{ stock.label }}
      </UBadge>
    </div>
    <div>
      <UBadge v-if="sku" color="neutral" variant="subtle" class="uppercase">
        SKU: {{ sku }}
      </UBadge>
    </div>
  </div>
</template>

<style lang="css" scoped></style>

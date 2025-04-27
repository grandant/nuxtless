<script setup lang="ts">
const { order } = useOrderStore();

const total = computed(() => order?.totalWithTax ?? 0);
</script>

<template>
  <div class="space-y-2 border-t pt-4 text-sm">
    <div class="flex justify-between text-base font-semibold">
      <span>Total</span>
      <span>{{ total / 100 }} {{ order?.currencyCode }}</span>
    </div>
  </div>
</template>

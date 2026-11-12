<script setup lang="ts">
const orderStore = useOrderStore();
const { order } = storeToRefs(orderStore);

const isCartOpen = useState<boolean>("isCartOpen", () => false);

const itemCount = computed(
  () => order.value?.lines?.reduce((sum, line) => sum + line.quantity, 0) ?? 0,
);
</script>

<template>
  <UChip :show="itemCount > 0" color="error" :text="itemCount" size="3xl">
    <UButton
      icon="i-lucide-shopping-cart"
      size="md"
      @click="isCartOpen = !isCartOpen"
    />
  </UChip>
</template>

<style lang="css" scoped></style>

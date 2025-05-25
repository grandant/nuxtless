<script setup lang="ts">
const isCartOpen = useState<boolean>("isCartOpen", () => false);
</script>

<template>
  <UButton
    icon="i-lucide-shopping-cart"
    size="xl"
    @click="isCartOpen = !isCartOpen"
  />
</template>

<style lang="css" scoped></style>

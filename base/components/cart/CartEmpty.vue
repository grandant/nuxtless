<script setup lang="ts">
const localePath = useLocalePath();
const isCartOpen = useState<boolean>("isCartOpen");
</script>

<template>
  <div class="text-center">
    <UIcon name="i-lucide-shopping-cart" class="text-4xl" />
    <p class="text-lg font-medium">Your cart is empty</p>
    <p class="text-sm">Start shopping to fill it up</p>
    <UButton
      :to="localePath('/')"
      class="mt-6 px-7"
      @click="isCartOpen = false"
    >
      Browse Products
    </UButton>
  </div>
</template>

<style lang="css" scoped></style>

<script setup lang="ts">
const localePath = useLocalePath();
const { order } = storeToRefs(useOrderStore());
const isCartOpen = useState<boolean>("isCartOpen");
</script>

<template>
  <USlideover
    v-model:open="isCartOpen"
    title="Your Cart"
    description="Cart Panel"
  >
    <template #body>
      <div class="space-y-4 p-4">
        <CartEmpty v-if="!order?.lines?.length" />
        <CartItem v-for="line in order?.lines" :key="line.id" :line="line" />
        <CartTotals v-if="order?.lines?.length" />
      </div>
    </template>

    <template #footer>
      <div class="p-4">
        <UButton
          :to="localePath('/checkout')"
          block
          size="lg"
          color="primary"
          @click="isCartOpen = !isCartOpen"
        >
          Checkout
        </UButton>
      </div>
    </template>
  </USlideover>
</template>

<style lang="css" scoped></style>

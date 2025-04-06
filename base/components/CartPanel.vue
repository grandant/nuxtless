<script setup lang="ts">
const { order } = useOrderStore();
</script>

<template>
  <USlideover title="Your Cart" description="Cart Panel">
    <template #body>
      <div class="space-y-4 p-4">
        <CartEmpty v-if="!order?.lines?.length" />
        <CartItem v-for="line in order?.lines" :key="line.id" :line="line" />
        <CartTotals v-if="order?.lines?.length" />
      </div>
    </template>

    <template #footer>
      <div class="p-4">
        <UButton label="Checkout" block size="lg" color="primary" />
      </div>
    </template>
  </USlideover>
</template>

<style lang="css" scoped></style>

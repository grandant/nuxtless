<script setup lang="ts">
const localePath = useLocalePath();
const { order } = storeToRefs(useOrderStore());
const isCartOpen = useState<boolean>("isCartOpen");
const total = computed(() => order?.value?.totalWithTax ?? 0);
</script>

<template>
  <USlideover
    v-model:open="isCartOpen"
    title="Your Cart"
    description="Items currently in your cart"
  >
    <template #body>
      <div class="space-y-4 p-4">
        <CartEmpty v-if="!order?.lines?.length" />
        <CartItem v-for="line in order?.lines" :key="line.id" :line="line" />
      </div>
    </template>

    <template #footer>
      <div class="w-full px-4">
        <UButton
          :to="localePath('/checkout')"
          size="xl"
          color="primary"
          :disabled="(order?.lines.length ?? 0) < 1"
          class="w-full justify-center"
          @click="isCartOpen = !isCartOpen"
        >
          <span>Checkout</span>
          <span v-if="(order?.lines.length ?? 0) > 0">
            {{ (total / 100).toFixed(2) }} {{ order?.currencyCode }}
          </span>
        </UButton>
      </div>
    </template>
  </USlideover>
</template>

<style lang="css" scoped></style>

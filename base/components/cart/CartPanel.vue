<script setup lang="ts">
const localePath = useLocalePath();
const orderStore = useOrderStore();
const { order, loading } = storeToRefs(orderStore);
const isCartOpen = useState<boolean>("isCartOpen");
const total = computed(() => order?.value?.totalWithTax ?? 0);

async function clearOrder() {
  const ids = order.value?.lines?.map((l) => l.id) ?? [];
  if (!ids.length) return;

  await Promise.all(ids.map((id) => orderStore.removeItemFromOrder(id)));
}
</script>

<template>
  <USlideover
    v-model:open="isCartOpen"
    title="Your Cart"
    description="Items currently in your cart"
  >
    <template #body>
      <CartEmpty v-if="!order?.lines?.length" class="my-14" />
      <CartItem v-for="line in order?.lines" :key="line.id" :line="line" />
    </template>

    <template #footer>
      <div class="flex w-full gap-4">
        <UButton
          :to="localePath('/checkout')"
          size="xl"
          color="primary"
          :loading="loading"
          :disabled="(order?.lines.length ?? 0) < 1"
          class="w-full justify-center"
          @click="isCartOpen = !isCartOpen"
        >
          <span>Checkout</span>
          <span v-if="(order?.lines.length ?? 0) > 0">
            {{ (total / 100).toFixed(2) }} {{ order?.currencyCode }}
          </span>
        </UButton>
        <UButton
          icon="i-lucide-trash"
          color="error"
          size="xl"
          variant="soft"
          :disabled="(order?.lines.length ?? 0) < 1 || loading"
          @click="clearOrder"
        />
      </div>
    </template>
  </USlideover>
</template>

<style lang="css" scoped></style>

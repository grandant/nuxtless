<script setup lang="ts">
import type { ActiveOrderDetail } from "~~/types/order";

const { activeOrder, onSubmit } = defineProps<{
  activeOrder: ActiveOrderDetail;
  onSubmit: () => Promise<void> | void;
}>();

const { loading } = storeToRefs(useOrderStore());
const subTotal = computed(() => (activeOrder?.subTotal / 100).toFixed(2));
const orderTotal = computed(() => (activeOrder?.totalWithTax / 100).toFixed(2));

const orderTaxTotal = computed(() => {
  const taxTotal = activeOrder?.taxSummary?.[0]?.taxTotal;
  return taxTotal != null ? (taxTotal / 100).toFixed(2) : null;
});

const shippingWithTax = computed(() =>
  (activeOrder?.shippingWithTax / 100).toFixed(2),
);
</script>

<template>
  <UCard variant="soft" class="h-min">
    <CartItem v-for="line in activeOrder?.lines" :key="line.id" :line="line" />

    <div class="mt-6 flex gap-4">
      <UInput
        icon="i-lucide-ticket-percent"
        placeholder="Apply coupon"
        class="w-full"
      />
      <UButton class="px-7">Apply</UButton>
    </div>

    <template #footer>
      <div class="mb-2 flex flex-col font-medium">
        <div class="flex justify-between">
          <span>Subtotal</span>
          <span>
            {{ subTotal }}
          </span>
        </div>
        <div class="flex justify-between">
          <span>VAT</span>
          <span>
            {{ orderTaxTotal }}
          </span>
        </div>
        <div class="flex justify-between">
          <span>Shipping</span>
          <span>
            {{ shippingWithTax }}
          </span>
        </div>

        <USeparator class="my-1" />

        <div class="flex justify-between font-bold">
          <span>Total </span>
          <span>
            {{ orderTotal }}
          </span>
        </div>
      </div>
      <UButton
        size="xl"
        color="primary"
        :loading="loading"
        :disabled="(activeOrder?.lines.length ?? 0) < 1"
        class="w-full justify-center"
        @click="onSubmit"
      >
        <span>Checkout</span>
        <span v-if="(activeOrder?.lines.length ?? 0) > 0">
          {{ orderTotal }} {{ activeOrder?.currencyCode }}
        </span>
      </UButton>
    </template>
  </UCard>
</template>

<style lang="css" scoped></style>

<script setup lang="ts">
import type { OrderLine } from "~~/types/order";

const props = defineProps<{ line: OrderLine }>();

const orderStore = useOrderStore();

const remove = () => {
  orderStore.removeItemFromOrder(props.line.id);
};
</script>

<template>
  <div class="flex items-start gap-4 border-b py-4">
    <img
      :src="line?.featuredAsset?.preview"
      alt=""
      class="h-16 w-16 rounded object-cover"
    />

    <div class="flex flex-1 flex-col">
      <div class="text-sm font-medium">
        {{ line.productVariant.name }}
      </div>
      <div class="text-xs">Quantity: {{ line.quantity }}</div>
      <div class="mt-1 text-sm font-semibold">
        {{ line.linePriceWithTax / 100 }} CURRENCY
      </div>

      <div class="mt-2 flex gap-2">
        <CartQuantityInput
          :quantity="line.quantity"
          @update="(val) => orderStore.adjustOrderLine(line.id, val)"
        />
        <UButton
          icon="i-lucide-trash"
          color="error"
          size="xs"
          variant="soft"
          @click="remove"
        />
      </div>
    </div>
  </div>
</template>

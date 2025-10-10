<script setup lang="ts">
import type { OrderLine } from "~~/types/order";

const { line } = defineProps<{
  line: OrderLine;
}>();

const { t } = useI18n();
const orderStore = useOrderStore();
const { loading } = storeToRefs(orderStore);
const { selectedVariant } = storeToRefs(useProductStore());

const remove = () => {
  orderStore.removeItemFromOrder(line.id);
};
</script>

<template>
  <div class="flex gap-4 border-b py-4">
    <div class="basis-[20%]">
      <NuxtImg
        :src="line?.featuredAsset?.preview"
        :alt="line?.productVariant.name ?? 'Product Image'"
        class="h-full rounded object-cover"
        width="64"
        format="webp"
        :quality="80"
      />
    </div>

    <div class="flex basis-[50%] flex-col">
      <div class="text-sm font-medium">
        {{ line.productVariant.name }}
      </div>
      <div class="text-xs">
        {{ t("messages.shop.quantity") }}: {{ line.quantity }}
      </div>
      <div class="mt-1 text-sm font-semibold">
        {{ (line.linePriceWithTax / line.quantity / 100).toFixed(2) }}
        {{ selectedVariant?.currencyCode }}
      </div>
    </div>

    <div class="flex basis-[40%] items-center justify-end gap-2">
      <CartQuantityInput
        :quantity="line.quantity"
        :disabled="loading"
        @update="(val) => orderStore.adjustOrderLine(line.id, val)"
      />
      <UButton
        icon="i-lucide-trash"
        color="error"
        size="sm"
        variant="soft"
        :disabled="loading"
        @click="remove"
      />
    </div>
  </div>
</template>

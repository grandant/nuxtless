<script setup lang="ts">
import type { ActiveOrderDetail } from "~~/types/order";

const { onSubmit } = defineProps<{ onSubmit: () => Promise<void> | void }>();

const { t } = useI18n();
const orderStore = useOrderStore();
const { order, loading } = storeToRefs(orderStore);
const activeOrder = order as Ref<ActiveOrderDetail>;

const subTotal = computed(() => (activeOrder.value?.subTotal / 100).toFixed(2));

const orderTotal = computed(() =>
  (activeOrder.value?.totalWithTax / 100).toFixed(2),
);

const orderTaxTotal = computed(() => {
  const taxTotal = activeOrder.value?.taxSummary?.[0]?.taxTotal;
  return taxTotal != null ? (taxTotal / 100).toFixed(2) : null;
});

const shippingWithTax = computed(() =>
  (activeOrder.value?.shippingWithTax / 100).toFixed(2),
);
</script>

<template>
  <UCard variant="soft" class="h-min">
    <CartItem v-for="line in activeOrder?.lines" :key="line.id" :line="line" />

    <div class="mt-6 flex gap-4">
      <UInput
        icon="i-lucide-ticket-percent"
        :placeholder="t('messages.shop.couponCode')"
        class="w-full"
      />
      <UButton class="px-7">{{ t("messages.general.apply") }}</UButton>
    </div>

    <template #footer>
      <div class="mb-2 flex flex-col font-medium">
        <div class="flex justify-between">
          <span>{{ t("messages.shop.subtotal") }}</span>
          <span>
            {{ subTotal }}
          </span>
        </div>
        <div class="flex justify-between">
          <span>{{ t("messages.general.tax") }}</span>
          <span>
            {{ orderTaxTotal }}
          </span>
        </div>
        <div class="flex justify-between">
          <span>{{ t("messages.general.shipping") }}</span>
          <span>
            {{ shippingWithTax }}
          </span>
        </div>

        <USeparator class="my-1" />

        <div class="flex justify-between font-bold">
          <span>{{ t("messages.shop.total") }}</span>
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
        <span>{{ t("messages.shop.checkout") }}</span>
        <span v-if="(activeOrder?.lines.length ?? 0) > 0">
          {{ orderTotal }} {{ activeOrder?.currencyCode }}
        </span>
      </UButton>
    </template>
  </UCard>
</template>

<style lang="css" scoped></style>

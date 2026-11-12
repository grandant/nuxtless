<script setup lang="ts">
import { h } from "vue";

import { GetOrderByCode } from "#layers/nuxtless/gql/queries/order";

import type { TableColumn } from "@nuxt/ui";

export interface OrderLineRow {
  name: string;
  qty: number;
  unitPrice: string;
  lineTotal: string;
}

const { locale, t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const code = route.params.code as string;
const isMounted = ref(false);

definePageMeta({
  alias: ["/order/:code"],
});

const {
  data: orderData,
  error,
  executeQuery,
} = await useQuery({
  query: GetOrderByCode,
  variables: { code },
});

function refresh() {
  executeQuery({ requestPolicy: "network-only" });
}

const order = computed(() => orderData.value?.orderByCode ?? null);
const hasError = computed(() => !!error.value);

async function pollOrder(maxAttempts = 20, interval = 2000) {
  let attempts = 0;
  while (attempts < maxAttempts) {
    attempts++;

    refresh();

    if (error.value) {
      console.error("Error during order polling:", error.value);
      break;
    }

    const state = order.value?.state;
    const initialStates = ["AddingItems", "ArrangingPayment"];

    if (!state) {
      console.warn("Order state missing during polling, attempt", attempts);
      await new Promise((res) => setTimeout(res, interval));
      continue;
    }

    if (!initialStates.includes(state)) break;

    await new Promise((res) => setTimeout(res, interval));
  }
}

const formatPrice = (amount: number) =>
  new Intl.NumberFormat(locale.value, {
    style: "currency",
    currency: order.value?.currencyCode || "EUR",
  }).format(amount / 100);

const tableData = computed<OrderLineRow[]>(() =>
  (order.value?.lines ?? []).map((line) => ({
    name: line.productVariant?.name ?? "",
    qty: line.quantity,
    unitPrice: formatPrice(line.unitPriceWithTax),
    lineTotal: formatPrice(line.linePriceWithTax),
  })),
);

const columns: TableColumn<OrderLineRow>[] = [
  {
    accessorKey: "name",
    header: t("messages.general.product"),
  },
  {
    accessorKey: "qty",
    header: t("messages.shop.quantity"),
  },
  {
    accessorKey: "unitPrice",
    header: t("messages.shop.price"),
  },
  {
    accessorKey: "lineTotal",
    header: () => h("div", { class: "text-right" }, t("messages.shop.total")),
    footer: () => {
      if (!order.value) return null;

      const taxTotal = order.value.taxSummary?.[0]?.taxTotal ?? 0;
      const orderTotal = formatPrice(order.value.subTotal + taxTotal);

      return h(
        "div",
        { class: "text-right font-medium" },
        `${t("messages.shop.total")}: ${orderTotal}`,
      );
    },
    cell: ({ row }) =>
      h("div", { class: "text-right font-medium" }, row.getValue("lineTotal")),
  },
];

function printReceipt() {
  if (import.meta.client) {
    window.print();
  }
}

onMounted(() => {
  isMounted.value = true;
  pollOrder();
});
</script>

<template>
  <UContainer>
    <BaseLoader v-if="!isMounted && !order" width="sm:w-xs md:w-sm" />

    <UError
      v-else-if="isMounted && hasError"
      :error="{
        statusCode: 404,
        statusMessage: t('messages.error.noOrder'),
        message: t('messages.error.orderNotFound'),
      }"
    >
      <template #links>
        <UButton
          :to="localePath('/account/login')"
          :label="t('messages.account.login')"
          class="px-7"
        />
      </template>
    </UError>

    <UPage v-else>
      <header class="mt-14">
        <h1 class="text-2xl font-semibold">
          {{ t("messages.shop.orderReceived") }}
        </h1>
        <UBadge
          color="error"
          :label="t('messages.shop.thankYou')"
          trailing-icon="i-lucide-heart"
          class="text-sm font-bold"
        />
      </header>

      <!-- Order Metadata -->
      <UPageSection
        title="Order Information"
        :ui="{ title: 'sr-only', container: 'pt-0 lg:pt-0 pb-12 lg:pb-12' }"
      >
        <dl
          class="outline-primary grid grid-cols-2 gap-4 rounded outline-2 outline-offset-4 md:grid-cols-4"
        >
          <div>
            <dt class="font-medium">{{ t("messages.shop.orderCode") }}</dt>
            <dd>{{ order?.code }}</dd>
          </div>
          <div>
            <dt class="font-medium">{{ t("messages.general.date") }}</dt>
            <dd v-if="isMounted && order?.orderPlacedAt">
              {{ new Date(order.orderPlacedAt).toLocaleDateString() }}
            </dd>
            <USkeleton v-else class="h-4 w-full md:w-1/2" />
          </div>
          <div>
            <dt class="font-medium">{{ t("messages.shop.rateEmail") }}</dt>
            <dd>{{ order?.customer?.emailAddress }}</dd>
          </div>
          <div>
            <dt class="font-medium">{{ t("messages.general.status") }}</dt>
            <dd>{{ order?.state }}</dd>
          </div>
        </dl>
      </UPageSection>

      <!-- Order Summary -->
      <UPageSection
        :title="t('messages.shop.orderSummary')"
        :ui="{ container: 'pt-0 lg:pt-0 pb-12 lg:pb-12' }"
      >
        <UTable :data="tableData" :columns="columns" class="flex-1" />
      </UPageSection>

      <!-- Order Details -->
      <UPageSection
        :title="t('messages.shop.orderDetails')"
        :ui="{ container: 'pt-0 lg:pt-0 pb-12 lg:pb-12' }"
      >
        <div
          class="order-details-grid grid grid-cols-1 gap-6 md:grid-cols-3 md:divide-x"
        >
          <div>
            <h3 class="mb-2 font-medium">
              {{ t("messages.general.shippingAddress") }}
            </h3>
            <address class="not-italic">
              <div>{{ order?.shippingAddress?.fullName }}</div>
              <div>{{ order?.shippingAddress?.streetLine1 }}</div>
              <div>
                {{ order?.shippingAddress?.city }},
                {{ order?.shippingAddress?.postalCode }}
              </div>
            </address>
          </div>

          <div>
            <h3 class="mb-2 font-medium">
              {{ t("messages.general.shippingDetails") }}
            </h3>
            <p>
              {{ t("messages.general.paymentMethod") }}:
              {{ order?.payments?.[0]?.method }}
            </p>
            <p>
              {{ t("messages.general.shippingSelect") }}:
              {{ order?.shippingLines?.[0]?.shippingMethod?.name }}
            </p>
          </div>

          <div>
            <h3 class="mb-2 font-medium">
              {{ t("messages.general.amount") }}
            </h3>
            <dl class="space-y-1">
              <div class="flex justify-between">
                <dt>{{ t("messages.shop.subtotal") }}</dt>
                <dd>{{ formatPrice(order?.subTotal ?? 0) }}</dd>
              </div>
              <div class="flex justify-between">
                <dt>{{ t("messages.general.tax") }}</dt>
                <dd>
                  {{ formatPrice(order?.taxSummary?.[0]?.taxTotal ?? 0) }}
                </dd>
              </div>
              <div class="flex justify-between">
                <dt>{{ t("messages.general.shipping") }}</dt>
                <dd>{{ formatPrice(order?.shippingWithTax ?? 0) }}</dd>
              </div>
              <div class="flex justify-between font-bold">
                <dt>{{ t("messages.shop.total") }}</dt>
                <dd>{{ formatPrice(order?.totalWithTax ?? 0) }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </UPageSection>

      <!-- Confirmation & Actions -->
      <UPageSection
        class="no-print"
        :ui="{ container: 'pt-0 lg:pt-0 pb-12 lg:pb-12' }"
      >
        <p class="text-sm">
          {{ t("messages.shop.orderThanks") }}
        </p>

        <div>
          <UButton variant="soft" @click="printReceipt">
            {{ t("messages.general.printReceipt") }}
          </UButton>
        </div>
      </UPageSection>
    </UPage>
  </UContainer>
</template>

<style lang="css">
@media print {
  nav,
  header,
  footer,
  .no-print {
    display: none !important;
  }
  main {
    padding: 0;
  }
  .order-details-grid {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 1rem !important;
  }
}
</style>

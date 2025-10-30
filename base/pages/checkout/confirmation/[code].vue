<script setup lang="ts">
import { h } from "vue";
import type { TableColumn } from "@nuxt/ui";

const { locale, t } = useI18n();
const route = useRoute();
const code = route.params.code as string;
const isStripe = computed(() => !!route.query.payment_intent);

type OrderLine = {
  name: string;
  qty: number;
  unitPrice: number;
  lineTotal: number;
  orderTotal: number;
  currency: string;
};

const { data: orderData, refresh } = await useAsyncGql("GetOrderByCode", {
  code,
});

const order = computed(() => orderData.value?.orderByCode ?? null);

async function pollOrder(maxAttempts = 20, interval = 2000) {
  let attempts = 0;
  while (attempts < maxAttempts) {
    await refresh();
    const state = order.value?.state;
    const finalStates = [
      "PaymentSettled",
      "PaymentAuthorized",
      "ArrangingFulfillment",
      "Cancelled",
    ];
    if (!state) {
      console.warn("Order state missing during polling");
      continue;
    }
    if (finalStates.includes(state)) {
      break;
    }
    attempts++;
    await new Promise((res) => setTimeout(res, interval));
  }
}

const formatPrice = (amount: number) =>
  new Intl.NumberFormat(locale.value, {
    style: "currency",
    currency: order.value?.currencyCode || "EUR",
  }).format(amount / 100);

const tableData = computed(() =>
  (order.value?.lines ?? []).map((line) => ({
    name: line.productVariant?.name ?? "",
    qty: line.quantity,
    unitPrice: formatPrice(line.unitPriceWithTax),
    lineTotal: formatPrice(line.linePriceWithTax),
  })),
);

const columns: TableColumn<OrderLine>[] = [
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
  if (isStripe.value) {
    pollOrder();
  }
});
</script>

<template>
  <!-- <BaseLoader v-if="!order" width="sm:w-xs md:w-sm" /> -->
  <main class="container mt-14">
    <!-- 1. Heading -->
    <header class="mb-14">
      <h1 class="text-2xl font-semibold">
        {{ t("messages.shop.orderReceived") }}
      </h1>
      <UBadge
        color="error"
        :label="t('messages.shop.thankYou')"
        trailing-icon="i-lucide-heart"
        class="text-sm font-bold"
      >
      </UBadge>
    </header>

    <!-- 2. Order meta -->
    <section aria-labelledby="order-meta-heading" class="mb-14">
      <h2 id="order-meta-heading" class="sr-only">Order Details</h2>
      <dl
        class="outline-primary grid grid-cols-2 gap-4 rounded outline-2 outline-offset-4 md:grid-cols-4"
      >
        <div>
          <dt class="font-medium">{{ t("messages.shop.orderCode") }}</dt>
          <dd>{{ order?.code }}</dd>
        </div>
        <div>
          <dt class="font-medium">{{ t("messages.general.date") }}</dt>
          <dd>{{ new Date(order?.orderPlacedAt).toLocaleDateString() }}</dd>
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
    </section>

    <!-- 3. Order summary -->
    <section aria-labelledby="order-summary-heading" class="mb-14">
      <h2 id="order-summary-heading" class="text-xl font-semibold underline">
        {{ t("messages.shop.orderSummary") }}
      </h2>
      <UTable :data="tableData" :columns="columns" class="flex-1" />
    </section>

    <!-- 4. Order details -->
    <section aria-labelledby="order-details-heading" class="mb-14">
      <h2
        id="order-details-heading"
        class="mb-4 text-xl font-semibold underline"
      >
        {{ t("messages.shop.orderDetails") }}
      </h2>

      <div
        class="order-details-grid grid grid-cols-1 gap-6 md:grid-cols-3 md:divide-x"
      >
        <!-- Column 1: Shipping -->
        <div class="">
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

        <!-- Column 2: Payment & Shipping method -->
        <div class="">
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

        <!-- Column 3: Totals -->
        <div>
          <h3 class="mb-2 font-medium">{{ t("messages.general.amount") }}</h3>
          <dl class="space-y-1">
            <div class="flex justify-between">
              <dt>{{ t("messages.shop.subtotal") }}</dt>
              <dd>{{ formatPrice(order?.subTotal) }}</dd>
            </div>
            <div class="flex justify-between">
              <dt>{{ t("messages.general.tax") }}</dt>
              <dd>{{ formatPrice(order?.taxSummary?.[0]?.taxTotal ?? 0) }}</dd>
            </div>
            <div class="flex justify-between">
              <dt>{{ t("messages.general.shipping") }}</dt>
              <dd>{{ formatPrice(order?.shippingWithTax) }}</dd>
            </div>
            <div class="flex justify-between font-bold">
              <dt>{{ t("messages.shop.total") }}</dt>
              <dd>
                {{ formatPrice(order?.totalWithTax) }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <!-- 4. Gratuity -->
    <section class="no-print mb-14 text-sm">
      <p>
        {{ t("messages.shop.orderThanks") }}
      </p>
    </section>

    <!-- 4. Actions -->
    <section aria-labelledby="actions-heading" class="no-print mb-14">
      <h2 id="actions-heading" class="sr-only">Actions</h2>
      <UButton variant="soft" @click="printReceipt">{{
        t("messages.general.printReceipt")
      }}</UButton>
    </section>
  </main>
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

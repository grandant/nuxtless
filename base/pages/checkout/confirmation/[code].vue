<script setup lang="ts">
import { h } from "vue";
import type { TableColumn, TableRow } from "@nuxt/ui";

const route = useRoute();
const code = route.params.code as string;

type OrderLine = {
  name: string;
  qty: number;
  price: number;
  total: number;
};

const { data: orderData } = await useAsyncGql("GetOrderByCode", { code });

const order = computed(() => orderData.value?.orderByCode ?? null);

const tableData = computed(() =>
  (order.value?.lines ?? []).map((line) => ({
    name: line.productVariant?.name ?? "",
    qty: line.quantity,
    price: line.unitPriceWithTax / 100,
    total: line.linePriceWithTax / 100,
  })),
);

const columns: TableColumn<OrderLine>[] = [
  {
    accessorKey: "name",
  },
  {
    accessorKey: "qty",
  },
  {
    accessorKey: "price",
  },
  {
    accessorKey: "total",
    header: () => h("div", { class: "text-right" }, "Total"),
    footer: ({ column }) => {
      const total = column
        .getFacetedRowModel()
        .rows.reduce(
          (acc: number, row: TableRow<OrderLine>) =>
            acc + Number.parseFloat(row.getValue("total")),
          0,
        );

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
      }).format(total);

      return h(
        "div",
        { class: "text-right font-medium" },
        `Total: ${formatted}`,
      );
    },
    cell: ({ row }) => {
      const total = Number.parseFloat(row.getValue("total"));

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
      }).format(total);

      return h("div", { class: "text-right font-medium" }, formatted);
    },
  },
];

function printReceipt() {
  if (import.meta.client) {
    window.print();
  }
}
</script>

<template>
  <main class="container mt-14">
    <!-- 1. Heading -->
    <header class="mb-14">
      <h1 class="text-2xl font-semibold">Order Confirmation</h1>
      <UBadge
        color="error"
        label="Thank you"
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
          <dt class="font-medium">Order code</dt>
          <dd>{{ order?.code }}</dd>
        </div>
        <div>
          <dt class="font-medium">Order date</dt>
          <dd>{{ new Date(order?.orderPlacedAt).toLocaleDateString() }}</dd>
        </div>
        <div>
          <dt class="font-medium">Your email</dt>
          <dd>{{ order?.customer?.emailAddress }}</dd>
        </div>
        <div>
          <dt class="font-medium">Status</dt>
          <dd>{{ order?.state }}</dd>
        </div>
      </dl>
    </section>

    <!-- 3. Order summary -->
    <section aria-labelledby="order-summary-heading" class="mb-14">
      <h2 id="order-summary-heading" class="text-xl font-semibold underline">
        Order Summary
      </h2>
      <UTable :data="tableData" :columns="columns" class="flex-1" />
    </section>

    <!-- 4. Order details -->
    <section aria-labelledby="order-details-heading" class="mb-14">
      <h2
        id="order-details-heading"
        class="mb-4 text-xl font-semibold underline"
      >
        Order Details
      </h2>

      <div
        class="order-details-grid grid grid-cols-1 gap-6 md:grid-cols-3 md:divide-x"
      >
        <!-- Column 1: Shipping -->
        <div class="">
          <h3 class="mb-2 font-medium">Delivery Address</h3>
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
          <h3 class="mb-2 font-medium">Payment & Shipping</h3>
          <p>Payment method: {{ order?.payments?.[0]?.method }}</p>
          <p>
            Shipping method:
            {{ order?.shippingLines?.[0]?.shippingMethod?.name }}
          </p>
        </div>

        <!-- Column 3: Totals -->
        <div class="">
          <h3 class="mb-2 font-medium">Totals</h3>
          <dl class="space-y-1">
            <div class="flex justify-between">
              <dt>Subtotal</dt>
              <dd>{{ order?.subTotal }}</dd>
            </div>
            <div class="flex justify-between">
              <dt>Shipping</dt>
              <dd>{{ order?.shippingWithTax }}</dd>
            </div>
            <div class="flex justify-between">
              <dt>VAT</dt>
              <dd>{{ order?.taxSummary?.[0]?.taxTotal }}</dd>
            </div>
            <div class="flex justify-between font-bold">
              <dt>Total</dt>
              <dd>{{ order?.totalWithTax }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <!-- 4. Gratuity -->
    <section class="no-print mb-14 text-sm">
      <p>
        Thank you for your order! Please check your email for further
        information and don’t forget to check your spam folder. If the email you
        provided is incorrect or you do not receive a confirmation within 5–10
        minutes, please contact our support team and quote your order code.
        Standard delivery takes around 3–5 business days. We truly appreciate
        your trust in us and look forward to serving you again.
      </p>
    </section>

    <!-- 4. Actions -->
    <section aria-labelledby="actions-heading" class="no-print mb-14">
      <h2 id="actions-heading" class="sr-only">Actions</h2>
      <UButton variant="soft" @click="printReceipt">Print receipt</UButton>
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

<script setup lang="ts">
import { h } from "vue";
import { SortOrder } from "~~/src/types/default";

import type { TableColumn } from "@nuxt/ui";

type Order = {
  id: string;
  date: Date;
  status: string;
  amount: string;
  currency: string;
};

const { locale, d, t } = useI18n();
const localePath = useLocalePath();
const { customer } = storeToRefs(useCustomerStore());
const { fetchCustomer } = useCustomerStore();
const { isAuthenticated } = storeToRefs(useAuthStore());
const loading = ref(true);

if (!customer.value) {
  await fetchCustomer();
}

const options = {
  sort: { createdAt: SortOrder.DESC },
  take: 10,
};

const { data } = await useAsyncGql("GetOrderHistory", {
  options,
});

// TODO: remove uneeded data from the GQL payload
const orders = computed(() =>
  (data.value.activeCustomer?.orders?.items ?? []).filter(
    (o) => o.state !== "AddingItems",
  ),
);

const tableData = computed<Order[]>(() =>
  orders.value.map((order, index) => ({
    id: index + 1,
    date: d(new Date(order.orderPlacedAt)),
    status: order.state,
    amount: (order.totalWithTax / 100).toFixed(2),
    currency: order.currencyCode,
  })),
);

const columns: TableColumn<Order>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => `#${row.getValue("id")}`,
  },
  {
    accessorKey: "date",
    header: t("messages.general.date"),
    cell: ({ row }) => `${row.getValue("date")}`,
  },
  {
    accessorKey: "status",
    header: t("messages.general.status"),
    cell: ({ row }) => `${row.getValue("status")}`,
  },
  {
    accessorKey: "amount",
    header: () =>
      h("div", { class: "text-right" }, t("messages.general.amount")),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"));

      const formatted = new Intl.NumberFormat(locale.value, {
        style: "currency",
        currency: row.original.currency,
      }).format(amount);

      return h("div", { class: "text-right font-medium" }, formatted);
    },
  },
];

onMounted(() => {
  if (!isAuthenticated.value) {
    navigateTo(localePath("/account/login"), { replace: true });
    return;
  }

  loading.value = false;
});
</script>

<template>
  <BaseLoader v-if="loading && !isAuthenticated" width="sm:w-xs md:w-sm" />
  <main v-else class="container">
    <header class="my-14">
      <h1 class="text-2xl font-semibold">{{ t("messages.account.orders") }}</h1>
      <ULink :to="localePath('/account')" class="mt-2">
        {{ customer?.emailAddress }}
      </ULink>
    </header>

    <div>
      <UTable
        sticky
        :data="tableData"
        :columns="columns"
        caption="My Orders"
        class="max-h-[312px] flex-1"
      />
    </div>
  </main>
</template>

<style lang="css" scoped></style>

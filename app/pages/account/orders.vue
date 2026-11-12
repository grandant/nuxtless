<script setup lang="ts">
import { h, resolveComponent } from "vue";

import { GetOrderHistory } from "#layers/nuxtless/gql/queries/order";

import type { TableColumn, TableRow } from "@nuxt/ui";

interface OrderTableRow {
  id: number;
  date: string;
  status: string;
  amount: string;
  currency: string;
  code: string;
}

const { i18NBaseUrl } = useRuntimeConfig().public;
const { locale, d, t } = useI18n();
const localePath = useLocalePath();
const { copy } = useClipboard();
const toast = useToast();

const authStore = useAuthStore();
const customerStore = useCustomerStore();

const { isAuthenticated } = storeToRefs(authStore);
const { customer } = storeToRefs(customerStore);

const loading = ref(true);

const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");

const options = {
  sort: { createdAt: "DESC" as const },
  take: 10,
};

const { data: orderHistory, executeQuery } = useQuery({
  query: GetOrderHistory,
  variables: { options },
  pause: true,
  context: {
    requestPolicy: "network-only",
  },
});

function refresh() {
  executeQuery({ requestPolicy: "network-only" });
}

// TODO: remove uneeded data from the GQL payload
const orders = computed(() =>
  (orderHistory.value?.activeCustomer?.orders?.items ?? []).filter(
    (o) => o.state !== "AddingItems",
  ),
);

const tableData = computed<OrderTableRow[]>(() =>
  orders.value.map((order, index) => ({
    id: index + 1,
    date: order.orderPlacedAt ? d(new Date(order.orderPlacedAt)) : "",
    status: order.state,
    amount: (order.totalWithTax / 100).toFixed(2),
    currency: order.currencyCode,
    code: order.code,
  })),
);

const columns: TableColumn<OrderTableRow>[] = [
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
  {
    id: "actions",
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-right" },
        h(
          UDropdownMenu,
          {
            content: {
              align: "end",
            },
            items: getRowItems(row),
            "aria-label": "Actions dropdown",
          },
          () =>
            h(UButton, {
              icon: "i-lucide-ellipsis-vertical",
              color: "neutral",
              variant: "ghost",
              class: "ml-auto",
              "aria-label": "Actions dropdown",
            }),
        ),
      );
    },
  },
];

function getRowItems(row: TableRow<OrderTableRow>) {
  return [
    {
      type: "label",
      label: t("messages.general.actions"),
    },
    {
      type: "separator",
    },
    {
      label: t("messages.general.getLink"),
      icon: "i-lucide-link",
      class: "items-center",
      onSelect() {
        const path = localePath(`/order/${row.original.code}`);
        copy(`${i18NBaseUrl}${path}`);

        toast.add({
          title: t("messages.general.getLinkSuccess"),
          color: "success",
          icon: "i-lucide-clipboard-check",
        });
      },
    },
    {
      label: t("messages.general.details"),
      icon: "i-lucide-info",
      to: localePath(`/order/${row.original.code}`),
      class: "items-center",
    },
  ];
}

onMounted(async () => {
  if (!isAuthenticated.value) {
    navigateTo(localePath("/account/login"), { replace: true });
    return;
  }

  refresh();

  loading.value = false;
});
</script>

<template>
  <UContainer>
    <BaseLoader v-if="loading || !isAuthenticated" width="sm:w-xs md:w-sm" />

    <UPage v-else>
      <header class="my-14">
        <h1 class="text-2xl font-semibold">
          {{ t("messages.account.orders") }}
        </h1>
        <ULink :to="localePath('/account')" class="mt-2">
          {{ customer?.emailAddress }}
        </ULink>
      </header>

      <UPageSection :ui="{ container: 'pt-0 lg:pt-0 pb-12' }">
        <UTable
          v-if="orders"
          sticky
          :data="tableData"
          :columns="columns"
          caption="My Orders"
          class="max-h-78 flex-1"
        />
      </UPageSection>
    </UPage>
  </UContainer>
</template>

<style lang="css" scoped></style>

<script setup lang="ts">
import { SortOrder } from "#gql/default";

const localePath = useLocalePath();
const { customer } = storeToRefs(useCustomerStore());
const { fetchCustomer } = useCustomerStore();
const { isAuthenticated } = storeToRefs(useAuthStore());

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
const orders = computed(() => data.value.activeCustomer?.orders?.items ?? []);

const tableData = computed(() =>
  orders.value.map((order, index) => ({
    "#": index + 1,
    date: order.orderPlacedAt,
    status: order.state,
    amount: order.totalWithTax / 100,
    currency: order.currencyCode,
  })),
);

onMounted(() => {
  if (!isAuthenticated.value) {
    navigateTo(localePath("/account/login"));
  }
});
</script>

<template>
  <main>
    <header class="my-14">
      <h1 class="text-2xl font-semibold">My Orders</h1>
      <ULink :to="localePath('/account')" class="mt-2">
        {{ customer?.emailAddress }}
      </ULink>
    </header>

    <div>
      <UTable
        sticky
        :data="tableData"
        caption="My Orders"
        class="max-h-[312px] flex-1"
      />
    </div>
  </main>
</template>

<style lang="css" scoped></style>

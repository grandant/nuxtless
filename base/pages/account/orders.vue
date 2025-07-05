<script setup lang="ts">
const localePath = useLocalePath();
const { customer } = storeToRefs(useCustomerStore());
const { fetchCustomer } = useCustomerStore();
const { isAuthenticated } = storeToRefs(useAuthStore());

if (!customer.value) {
  await fetchCustomer();
}

onMounted(() => {
  if (!isAuthenticated.value) {
    navigateTo(localePath("/account/login"));
  }
});
</script>

<template>
  <main>
    <header class="my-14">
      <AccountHeader :active-customer="customer" />
    </header>

    <div>
      {{ customer }}
    </div>
  </main>
</template>

<style lang="css" scoped></style>

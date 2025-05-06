<script setup lang="ts">
const { customer: activeCustomer } = storeToRefs(useCustomerStore());
const { fetchCustomer } = useCustomerStore();

if (!activeCustomer.value) {
  await fetchCustomer();
}
</script>

<template>
  <main class="prose mx-auto p-4">
    <h1>My Account</h1>
    <p>Hello, {{ activeCustomer?.firstName || "Guest" }}!</p>
  </main>
</template>

<style lang="css" scoped></style>

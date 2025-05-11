<script setup lang="ts">
const { customer } = storeToRefs(useCustomerStore());
const { fetchCustomer } = useCustomerStore();
const authStore = useAuthStore();

if (!customer.value) {
  await fetchCustomer();
}

if (customer.value) {
  authStore.setUser({
    id: customer.value.id,
    email: customer.value.emailAddress,
  });
}
</script>

<template>
  <main class="mx-auto p-4">
    <h1>My Account</h1>
    <p>Hello, {{ customer?.firstName || "Guest" }}!</p>
    <p>{{ authStore.session?.user }}</p>
  </main>
</template>

<style lang="css" scoped></style>

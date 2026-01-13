<script setup lang="ts">
import type { ActiveCustomerDetail } from "~~/src/types/customer";

const { t } = useI18n();
const localePath = useLocalePath();
const { customer } = storeToRefs(useCustomerStore());
const { fetchCustomer } = useCustomerStore();
const { isAuthenticated } = storeToRefs(useAuthStore());
const loading = ref(true);

// Safe: We fetch with "detail" below. Customer.value should always be ActiveCustomerDetail.
const activeCustomer = computed(() => customer.value as ActiveCustomerDetail);

onMounted(async () => {
  if (!isAuthenticated.value) {
    navigateTo(localePath("/account/login"), { replace: true });
    return;
  }

  if (!customer.value || !("phoneNumber" in customer.value)) {
    await fetchCustomer("detail");
  }

  loading.value = false;
});
</script>

<template>
  <BaseLoader v-if="loading || !activeCustomer?.id" width="sm:w-xs md:w-sm" />
  <main v-else class="container">
    <header class="my-14">
      <AccountHeader :active-customer="activeCustomer" />
    </header>
    <AccountContactForm class="mx-auto mb-14 flex w-full flex-col sm:w-xs md:w-sm" />
  </main>
</template>

<style lang="css" scoped></style>

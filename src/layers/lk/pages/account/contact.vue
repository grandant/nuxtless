<script setup lang="ts">


import type { ActiveCustomerDetail } from "~~/src/types/customer";

const router = useRouter();
const { t } = useI18n();
const localePath = useLocalePath();
const { isAuthenticated } = storeToRefs(useAuthStore());
const { customer } = storeToRefs(useCustomerStore());
const { fetchCustomer } = useCustomerStore();
const loading = ref(true);
if (!customer.value) {
  await fetchCustomer("detail");
}
const activeCustomer = computed(() => customer.value as ActiveCustomerDetail);
onMounted(() => {
  isMounted.value = true;

  if (isAuthenticated.value && activeCustomer.value) {
    const c = activeCustomer.value;
    state.firstName = c.firstName ?? "";
    state.lastName = c.lastName ?? "";
    state.emailAddress = c.emailAddress ?? "";
    state.streetLine1 = c.addresses?.[0]?.streetLine1 ?? "";
    state.city = c.addresses?.[0]?.city ?? "";
    state.postalCode = c.addresses?.[0]?.postalCode ?? "";
    state.countryCode = c.addresses?.[0]?.country?.code ?? "BG";
  }

  loading.value = false;
});
</script>

<template>
  <BaseLoader v-if="loading || !isAuthenticated" width="sm:w-xs md:w-sm" />
  <main v-else class="container mt-14">


    <AccountContactForm
      class="mx-auto mb-14 flex w-full flex-col sm:w-xs md:w-sm"
    />
  </main>
</template>

<style lang="css" scoped></style>

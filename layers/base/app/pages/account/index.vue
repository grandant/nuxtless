<script setup lang="ts">
import type { ActiveCustomerDetail } from "~~/types/customer";

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

    <section aria-labelledby="profile-info" class="mb-14 flex flex-col gap-4">
      <h2 id="profile-info" class="sr-only">Profile Information</h2>
      <div class="flex items-center gap-4">
        <UAvatar
          :alt="`${activeCustomer?.firstName} ${activeCustomer?.lastName}`"
          size="3xl"
        />
        <span class="text-xl">
          {{ activeCustomer?.firstName }} {{ activeCustomer?.lastName }}
        </span>
      </div>
      <dl>
        <dt class="sr-only">Phone</dt>
        <dd v-if="activeCustomer?.phoneNumber">
          {{ t("messages.account.myPhone") }}:
          {{ activeCustomer?.phoneNumber }}
        </dd>
        <dt class="sr-only">Address</dt>
        <dd class="flex gap-2">
          {{ t("messages.account.myAddress") }}:
          <address v-if="activeCustomer?.addresses?.[0]" class="wrap-anywhere">
            {{ activeCustomer.addresses[0].streetLine1 }},
            {{ activeCustomer.addresses[0].city }},
            {{ activeCustomer.addresses[0].country?.name }}
          </address>
          <span v-else>No default address</span>
        </dd>
      </dl>
    </section>

    <section aria-labelledby="account-actions" class="mb-14">
      <h2 id="account-actions" class="sr-only">Account Actions</h2>
      <UButton :to="localePath('/account/orders')" class="px-7">
        {{ t("messages.account.orders") }}
      </UButton>
    </section>
  </main>
</template>

<style lang="css" scoped></style>

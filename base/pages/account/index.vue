<script setup lang="ts">
import type { ActiveCustomerDetail } from "~~/types/customer";

const localePath = useLocalePath();
const { customer } = storeToRefs(useCustomerStore());
const { fetchCustomer } = useCustomerStore();
const { isAuthenticated } = storeToRefs(useAuthStore());
const { setUser } = useAuthStore();

if (!customer.value || !("phoneNumber" in customer.value)) {
  await fetchCustomer("detail");
}

if (customer.value) {
  setUser({
    id: customer.value.id,
    email: customer.value.emailAddress,
  });
}

// Safe: We fetch with "detail" above. Customer.value should always be ActiveCustomerDetail.
const activeCustomer = computed(() => customer.value as ActiveCustomerDetail);

onBeforeMount(() => {
  if (!isAuthenticated.value) {
    navigateTo(localePath("/account/login"));
  }
});
</script>

<template>
  <main>
    <header class="my-14">
      <h1 class="text-2xl font-semibold">My Account</h1>
      <ULink :to="localePath('/account')" class="mt-2">
        {{ activeCustomer?.emailAddress }}
      </ULink>
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
        <dd>Phone: {{ activeCustomer?.phoneNumber || "No phone provided" }}</dd>
        <dt class="sr-only">Address</dt>
        <dd>
          Address:
          <address v-if="activeCustomer?.addresses?.[0]">
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
      <UButton :to="localePath('/account/orders')">My Orders</UButton>
    </section>
  </main>
</template>

<style lang="css" scoped></style>

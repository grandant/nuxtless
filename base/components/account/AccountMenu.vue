<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

const { GQL_HOST: gqlHost, channelToken } = useRuntimeConfig().public;
const { locale } = useI18n();
const localePath = useLocalePath();
await useGqlSession(locale.value, gqlHost, channelToken, "default");
const { isAuthenticated } = storeToRefs(useAuthStore());
const { setUser, clearSession } = useAuthStore();
const { fetchCustomer, logout } = useCustomerStore();
const { order } = storeToRefs(useOrderStore());
const { customer } = storeToRefs(useCustomerStore());

if (!customer.value) {
  await fetchCustomer();
}

if (customer.value) {
  setUser({
    id: customer.value.id,
    email: customer.value.emailAddress,
  });
}

const items = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: customer.value?.firstName,
      avatar: {
        alt: `${customer.value?.firstName} ${customer.value?.lastName}`,
      },
      type: "label",
    },
  ],
  [
    { label: "Profile", icon: "i-lucide-user", to: localePath("/account") },
    {
      label: "My Orders",
      icon: "i-lucide-list",
      to: localePath("/account/orders"),
    },
  ],
  [
    {
      label: "Logout",
      icon: "i-lucide-log-out",
      kbds: ["shift", "meta", "q"],
      color: "error",
      onSelect: async () => {
        await logout();
        clearSession();
        order.value = null;
        await useGqlSession(locale.value, gqlHost, channelToken);
        navigateTo(localePath("/"));
      },
    },
  ],
]);

defineShortcuts(extractShortcuts(items.value));

const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});
</script>

<template>
  <UDropdownMenu
    v-if="isAuthenticated && isMounted"
    :items="items"
    :ui="{
      content: 'w-48',
    }"
  >
    <UButton size="xl" icon="i-lucide-user" variant="outline" />
  </UDropdownMenu>

  <UButton
    v-else
    :to="localePath('/account/login')"
    size="xl"
    icon="i-lucide-user"
    variant="outline"
    :loading="!isMounted"
  />
</template>

<style lang="css" scoped></style>

<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

const { GQL_HOST: gqlHost, channelToken } = useRuntimeConfig().public;
const { t, locale } = useI18n();
const localePath = useLocalePath();
const colorMode = useColorMode();
const { isAuthenticated } = storeToRefs(useAuthStore());
const { clearSession } = useAuthStore();
const { fetchCustomer, logout } = useCustomerStore();
const { customer } = storeToRefs(useCustomerStore());
const { fetchOrder } = useOrderStore();
const { localeItems, currentLocaleName } = useLangSwitcher();
const isOpen = ref(false);
const loading = ref(true);

if (!customer.value) {
  await fetchCustomer();
}

const colorModeItems = computed<DropdownMenuItem[]>(() => [
  {
    label: t("messages.general.system"),
    icon: "i-lucide-laptop-minimal",
    active: colorMode.preference === "system",
    class: "items-center",
    onSelect: () => (colorMode.preference = "system"),
  },
  {
    label: t("messages.general.light"),
    icon: "i-lucide-sun",
    class: "items-center",
    active: colorMode.preference === "light",
    onSelect: () => (colorMode.preference = "light"),
  },
  {
    label: t("messages.general.dark"),
    icon: "i-lucide-moon",
    class: "items-center",
    active: colorMode.preference === "dark",
    onSelect: () => (colorMode.preference = "dark"),
  },
]);

const userItems = computed<DropdownMenuItem[]>(() => [
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
    {
      label: t("messages.account.profile"),
      icon: "i-lucide-user",
      to: localePath("/account"),
      class: "items-center",
    },
    {
      label: t("messages.account.orders"),
      icon: "i-lucide-list",
      to: localePath("/account/orders"),
      class: "items-center",
    },
  ],
  [
    {
      label: t("messages.general.colorMode"),
      icon: colorMode.value === "light" ? "i-lucide-sun" : "i-lucide-moon",
      class: "items-center",
      children: colorModeItems.value,
    },
    {
      label: currentLocaleName,
      icon: "i-lucide-globe",
      class: "items-center",
      children: localeItems.value,
    },
  ],
  [
    {
      label: t("messages.account.logout"),
      icon: "i-lucide-log-out",
      kbds: ["shift", "meta", "q"],
      color: "error",
      class: "items-center",
      onSelect: async () => {
        await navigateTo(localePath("/"), { replace: true });
        clearSession();
        await logout();
        await useGqlSession(locale.value, gqlHost, channelToken, "default");
        await fetchOrder();
      },
    },
  ],
]);

const guestItems = computed<DropdownMenuItem[]>(() => [
  [
    {
      label: t("messages.account.login"),
      icon: "i-lucide-log-in",
      to: localePath("/account/login"),
      class: "items-center",
    },
  ],
  [
    {
      label: t("messages.general.colorMode"),
      icon: colorMode.value === "light" ? "i-lucide-sun" : "i-lucide-moon",
      class: "items-center",
      children: colorModeItems.value,
    },
    {
      label: currentLocaleName,
      icon: "i-lucide-globe",
      class: "items-center",
      children: localeItems.value,
    },
  ],
]);

const items = computed(() =>
  isAuthenticated.value ? userItems.value : guestItems.value,
);

defineShortcuts(extractShortcuts(items.value));

onMounted(() => {
  loading.value = false;
});
</script>

<template>
  <UDropdownMenu
    v-model:open="isOpen"
    :items="items"
    :ui="{
      content: 'w-48',
    }"
  >
    <template #language>
      <LangSwitcher color="neutral" />
    </template>

    <template #color-mode>
      <UColorModeSelect />
    </template>

    <UButton
      size="xl"
      icon="i-lucide-user"
      variant="outline"
      :loading="loading"
    />
  </UDropdownMenu>

  <!-- <UButton
    v-else
    :to="localePath('/account/login')"
    size="xl"
    icon="i-lucide-user"
    variant="outline"
    :loading="loading"
    aria-label="Login"
  /> -->
</template>

<style lang="css" scoped></style>

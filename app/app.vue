<script setup lang="ts">
// TODO: Set up useGqlError() to handle GQL errors globally
const { GQL_HOST: gqlHost, channelToken } = useRuntimeConfig().public;
const { locale } = useI18n();
const orderStore = useOrderStore();
await useGqlSession(locale.value, gqlHost, channelToken, "default");
await orderStore.fetchOrder();

// Create shared menu collections. Could be rewritten as composable.
const { data: menuCollections } = await useAsyncGql("GetMenuCollections");
useState("menuCollections", () => menuCollections.value);
</script>

<template>
  <UApp>
    <NuxtLayout>
      <!-- <UContainer> -->
      <NuxtPage />
      <!-- </UContainer> -->
    </NuxtLayout>
  </UApp>
</template>

<style lang="css" scoped></style>

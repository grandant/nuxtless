<script setup lang="ts">
const { GQL_HOST: gqlHost, channelToken } = useRuntimeConfig().public;
const { locale } = useI18n();
const orderStore = useOrderStore();

await useGqlSession(locale.value, gqlHost, channelToken, "default");
await orderStore.fetchOrder();
</script>

<template>
  <NuxtLayout>
    <UApp>
      <UContainer>
        <NuxtPage />
      </UContainer>
    </UApp>
  </NuxtLayout>
</template>

<style lang="css" scoped></style>

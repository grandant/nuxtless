<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const { locale } = useI18n();
const authStore = useAuthStore();
const orderStore = useOrderStore();

const authToken = useState<string | null>(
  "authToken",
  () => authStore.session?.token ?? null,
);

const channelToken = useState<string | null>(
  "channelToken",
  () => runtimeConfig.public?.channelToken ?? null,
);

const headers = useState<Record<string, string>>("headers", () => ({
  "Content-Type": "application/json",
}));

if (!authToken.value) {
  await useGqlSession(locale.value, runtimeConfig.public.GQL_HOST);
} else {
  authStore.setSession(authToken.value);
  headers.value.authorization = `Bearer ${authToken.value}`;
}

if (channelToken.value) {
  headers.value["vendure-token"] = channelToken.value;
}

if (locale.value) {
  headers.value["Accept-Language"] = locale.value;
}

console.log("from app.vue", headers.value.authorization);

useGqlHeaders(headers.value);
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

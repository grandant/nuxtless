<script setup lang="ts">
const { GQL_HOST: gqlHost, channelToken } = useRuntimeConfig().public;
const { t, locale } = useI18n();
const toast = useToast();
const orderStore = useOrderStore();
const { error } = storeToRefs(orderStore);

// Set initial locale for Vendure requests
useGqlHost(`?languageCode=${locale.value}`);

// Create shared menu collections. Could be rewritten as composable.
const { data: menuCollections } = await useAsyncGql("GetMenuCollections");
useState("menuCollections", () => menuCollections.value);

// Set GQL session and fetch current order
onBeforeMount(async () => {
  await useGqlSession(locale.value, gqlHost, channelToken, "default");
  await orderStore.fetchOrder();
});

// Set and watch locale for Vendure requests
watch(locale, (val, oldVal) => {
  if (val === oldVal) return;

  useGqlHost(`?languageCode=${val}`);
  // Workaround for refreshing Vendure data
  const route = useRoute();
  const localePath = useLocalePath();
  window.location.href = localePath(route.fullPath);
});

// Watch for order processing errors
watch(error, (val) => {
  if (!val) return;

  toast.add({
    title: "Order Processing Error",
    description: val,
    color: "error",
  });
});

// OgImage
defineOgImageComponent("Frame", {
  title: t("messages.site.title"),
  description: t("messages.site.tagline"),
  // image: "/logo.png",
  // logo: "/logo-full.svg",
});

// SchemaOrg
useSchemaOrg([
  defineWebPage({
    name: t("messages.site.title"),
    description: t("messages.site.tagline"),
  }),
  defineWebSite({
    name: t("messages.site.title"),
    description: t("messages.site.tagline"),
  }),
]);
</script>

<template>
  <NuxtLoadingIndicator />
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style lang="css" scoped></style>

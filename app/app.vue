<script setup lang="ts">
const { GQL_HOST: gqlHost, channelToken } = useRuntimeConfig().public;
const { t, locale } = useI18n();
const orderStore = useOrderStore();
await useGqlSession(locale.value, gqlHost, channelToken, "default");
await orderStore.fetchOrder();

// Create shared menu collections. Could be rewritten as composable.
const { data: menuCollections } = await useAsyncGql("GetMenuCollections");
useState("menuCollections", () => menuCollections.value);

// Set and watch locale for Vendure requests
watch(
  locale,
  (val) => {
    useGqlHost(`?languageCode=${val}`);
  },
  { immediate: true },
);

// OgImage
defineOgImageComponent("Frame", {
  title: t("messages.site.title"),
  description: t("messages.site.tagline"),
  // image: "/logo.png",
  // logo: "/logo.png",
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

<script setup>
const route = useRoute();
const { t } = useI18n();
const head = useLocaleHead();
const title = computed(() => t(route.meta.title || "messages.layouts.title"));

const query = `
  mutation AddItemToOrder($variantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $variantId, quantity: $quantity) {
      __typename
      ... on Order {
        id
      }
      ... on ErrorResult {
        message
      }
    }
  }
`;

const res = await fetch("http://localhost:3001/shop-api", {
  method: "POST",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    query,
    variables: { variantId: "1", quantity: 1 },
  }),
});

console.log(res.headers);

await useOrderStore().fetchOrder("base");
</script>

<template>
  <div>
    <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
      <Head>
        <Title>{{ title }}</Title>
        <template v-for="link in head.link" :key="link.hid">
          <Link
            :id="link.hid"
            :rel="link.rel"
            :href="link.href"
            :hreflang="link.hreflang"
          />
        </template>
        <template v-for="meta in head.meta" :key="meta.hid">
          <Meta
            :id="meta.hid"
            :property="meta.property"
            :content="meta.content"
          />
        </template>
      </Head>
      <Body>
        <div class="flex min-h-svh flex-col">
          <AppHeader class="sticky top-0" />
          <main class="flex-1">
            <slot />
          </main>
          <AppFooter />
        </div>
      </Body>
    </Html>
  </div>
</template>

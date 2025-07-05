<script setup>
const route = useRoute();
const { t } = useI18n();
const head = useLocaleHead();
const title = computed(() => t(route.meta.title || "messages.layouts.title"));
const isPdp = computed(() => route.path.startsWith("/product/"));
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
        <div
          :class="{ 'pb-18 sm:pb-0': isPdp }"
          class="flex min-h-svh flex-col"
        >
          <AppHeader class="sticky top-0" />
          <div class="flex-1">
            <slot />
          </div>
          <AppFooter />
        </div>
      </Body>
    </Html>
  </div>
</template>

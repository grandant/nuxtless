<script setup>
const route = useRoute();
const { t } = useI18n();
const head = useLocaleHead();
const title = computed(() => t(route.meta.title || "messages.site.title"));
const description = computed(() =>
  t(route.meta.description || "messages.site.description"),
);
const isPdp = computed(() => route.path.startsWith("/product/"));

useSeoMeta({
  title: title,
  description: description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description,
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div>
    <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
      <Head>
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

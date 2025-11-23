<script setup lang="ts">
const nuxtApp = useNuxtApp();
const { unsplashApiKey } = useRuntimeConfig().public;
const { t } = useI18n();

const { data: imgUrl } = await useFetch<{ urls: { raw: string } }>(
  "https://api.unsplash.com/photos/random",
  {
    headers: {
      Authorization: `Client-ID ${unsplashApiKey}`,
    },
    query: {
      query: "electronics",
      orientation: "landscape",
    },
    getCachedData(key) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  },
);

let bannerUrl = "/hero.avif";

if (imgUrl.value?.urls?.raw) {
  const url = new URL(imgUrl.value.urls.raw);
  url.searchParams.set("w", "1600");
  url.searchParams.set("h", "600");
  url.searchParams.set("q", "80");
  url.searchParams.set("auto", "format");
  bannerUrl = url.toString();
}
</script>

<template>
  <main>
    <h1 class="sr-only">{{ t("messages.site.tagline") }}</h1>

    <!-- Hero Banner -->
    <section class="mb-14" aria-labelledby="home-hero-heading">
      <h2 id="home-hero-heading" class="sr-only">
        {{ t("messages.pages.index.welcome") }} {{ t("messages.site.title") }}
      </h2>
      <div class="">
        <NuxtImg
          format="webp"
          class="h-[420px] w-full object-cover lg:h-[560px] xl:h-[540px]"
          :src="bannerUrl"
          alt="Hero image"
          loading="eager"
          sizes="sm:100vw md:1600px"
          fetchpriority="high"
          preload
          placeholder
          placeholder-class="blur-xl"
        />
      </div>
    </section>

    <!-- Categories Section -->
    <div class="container">
      <section class="mb-14" aria-labelledby="home-categories-heading">
        <h2 id="home-categories-heading" class="mb-4 text-2xl font-semibold">
          {{ t("messages.shop.shopByCategory") }}
        </h2>
        <HomeCategoryCarousel />
      </section>

      <!-- Shop Features -->
      <section class="mt-20 mb-14" aria-labelledby="home-features-heading">
        <h2 id="home-features-heading" class="sr-only">Why Shop With Us</h2>
        <HomeShopFeatures />
      </section>

      <!-- Featured Products -->
      <section class="mb-14" aria-labelledby="home-products-heading">
        <h2 id="home-products-heading" class="mb-4 text-2xl font-semibold">
          {{ t("messages.shop.popularProducts") }}
        </h2>
        <HomeFeaturedProducts />
      </section>
    </div>
  </main>
</template>

<style lang="css" scoped></style>

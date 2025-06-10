<script setup lang="ts">
const nuxtApp = useNuxtApp();
const { unsplashApiKey } = useRuntimeConfig().public;

const { data: imgUrl } = await useFetch<{ urls: { raw: string } }>(
  "https://api.unsplash.com/photos/random",
  {
    headers: {
      Authorization: `Client-ID ${unsplashApiKey}`,
    },
    query: {
      query: "cycling",
      orientation: "landscape",
    },
    getCachedData(key) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  },
);

let bannerUrl = "/images/placeholder-banner.jpg";

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
    <h1 class="sr-only">Nuxtless: Nuxt Level Headless E-commerce</h1>

    <!-- 1. Hero Banner -->
    <section class="mb-14" aria-labelledby="home-hero-heading">
      <h2 id="home-hero-heading" class="sr-only">Welcome to Nuxtless</h2>
      <div class="relative right-1/2 left-1/2 mr-[-50vw] ml-[-50vw] w-screen">
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

    <!-- 2. Categories Section -->
    <section class="mb-14" aria-labelledby="home-categories-heading">
      <h2 id="home-categories-heading" class="mb-4 text-2xl font-semibold">
        Shop by Category
      </h2>
      <HomeCategoryCarousel />
    </section>

    <!-- 3. Shop Features -->
    <section class="mt-8 mb-14" aria-labelledby="home-features-heading">
      <h2 id="home-features-heading" class="sr-only">Why Shop With Us</h2>
      <HomeShopFeatures />
    </section>

    <!-- 4. Featured Products -->
    <section class="mb-14" aria-labelledby="home-products-heading">
      <h2 id="home-products-heading" class="mb-4 text-2xl font-semibold">
        Featured Products
      </h2>
      <HomeFeaturedProducts />
    </section>
  </main>
</template>

<style lang="css" scoped></style>

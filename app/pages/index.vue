<script setup lang="ts">
import type { MenuCollections } from "~~/types/collection";

const nuxtApp = useNuxtApp();
const { unsplashApiKey } = useRuntimeConfig().public;

const menuCollections = useState<MenuCollections>("menuCollections");

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
    <div class="relative right-1/2 left-1/2 mr-[-50vw] ml-[-50vw] w-screen">
      <NuxtImg
        format="webp"
        width="1600"
        height="640"
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

    <!-- 2. Categories Section -->
    <section aria-labelledby="home-categories-heading">
      <h2 id="home-categories-heading" class="text-2xl">Shop by Category</h2>
      <HomeCategories />
    </section>
  </main>
</template>

<style lang="css" scoped></style>

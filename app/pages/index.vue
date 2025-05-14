<script setup lang="ts">
const { data } = await useAsyncGql("GetMenuCollections");
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

    <div class="container grid grid-cols-4 gap-4">
      <div v-for="collection in data.collections.items" :key="collection.id">
        {{ collection }}
      </div>
    </div>
  </main>
</template>

<style lang="css" scoped></style>

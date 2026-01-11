<script setup lang="ts">
const { t } = useI18n();
let bannerUrl = "/hero.avif";
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
    </div>
  </main>
</template>

<style lang="css" scoped></style>

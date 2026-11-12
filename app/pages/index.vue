<script setup lang="ts">
const { t } = useI18n();

const bannerUrl = "/hero.avif";
</script>

<template>
  <UPage>
    <h1 class="sr-only">{{ t("messages.site.tagline") }}</h1>

    <!-- Hero Banner -->
    <section aria-labelledby="home-hero-heading">
      <h2 id="home-hero-heading" class="sr-only">
        {{ t("messages.pages.index.welcome") }} {{ t("messages.site.title") }}
      </h2>
      <div class="">
        <NuxtImg
          format="webp"
          class="h-105 w-full object-cover lg:h-140 xl:h-135"
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
    <UPageSection :title="t('messages.shop.shopByCategory')">
      <HomeCategoryCarousel />
    </UPageSection>

    <!-- Shop Features -->
    <UPageSection
      aria-labelledby="home-features-heading"
      :ui="{ title: 'sr-only', container: 'lg:pt-0 pb-12' }"
    >
      <h2 id="home-features-heading" class="sr-only">Why Shop With Us</h2>

      <HomeShopFeatures />
    </UPageSection>

    <!-- Featured Products -->
    <UPageSection
      :title="t('messages.shop.popularProducts')"
      :ui="{ container: 'lg:pt-0 pb-12' }"
    >
      <HomeFeaturedProducts />
    </UPageSection>
  </UPage>
</template>

<style lang="css" scoped></style>

<script setup lang="ts">
import AccessTable from "~~/src/layers/lk/components/access/AccessTable.vue";

const { t } = useI18n();
</script>

<template>
  <main>
    <h1 class="sr-only">{{ t("messages.site.tagline") }}</h1>

    <div class="container">
      <section class="mb-14 mt-14">
<!--        <h2 id="home-categories-heading" class="mb-4 text-2xl font-semibold">
          {{ t("messages.shop.shopByCategory") }}
        </h2>-->
        <AccessTable/>
      </section>
    </div>
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

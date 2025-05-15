<script setup lang="ts">
import type { MenuCollections } from "~~/types/collection";

const carouselConfig = {
  itemsToShow: 2.5,
  wrapAround: true,
};

const menuCollections = useState<MenuCollections>("menuCollections");

const childCollections = computed(
  () =>
    menuCollections.value?.collections.items.flatMap((c) => c.children ?? []) ??
    [],
);
</script>

<template>
  <!-- TODO: Add semantic links to the collections' pages -->
  <Carousel v-bind="carouselConfig" aria-label="Browse featured categories">
    <Slide v-for="collection in childCollections" :key="collection.id">
      <div class="carousel__item p-4">
        <article>
          <UCard variant="subtle" class="overflow-hidden rounded shadow">
            <NuxtImg
              format="webp"
              width="600"
              class="h-[350px] w-[600px] object-cover"
              :src="collection.featuredAsset?.preview"
              :alt="collection.name"
              loading="eager"
              sizes="sm:100vw md:1600px"
              fetchpriority="high"
              preload
              placeholder
              placeholder-class="blur-xl"
            />

            <template #footer>
              <h3>{{ collection.name }}</h3>
            </template>
          </UCard>
        </article>
      </div>
    </Slide>
    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<style lang="css" scoped></style>

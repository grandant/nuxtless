<script setup lang="ts">
import type { MenuCollections } from "~~/types/collection";

const localePath = useLocalePath();

const menuCollections = useState<MenuCollections>("menuCollections");

const childCollections = computed(
  () =>
    menuCollections.value?.collections.items.flatMap((c) => c.children ?? []) ??
    [],
);
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    dots
    :items="childCollections"
    class="mt-4 mb-10"
    :ui="{
      item: 'basis-full sm:basis-1/2 xl:basis-2/5 ',
    }"
  >
    <article>
      <UCard
        variant="subtle"
        class="relative isolate shadow"
        :ui="{ body: 'sm:p-0' }"
      >
        <NuxtImg
          format="webp"
          width="600"
          height="350"
          class="h-[350px] w-full object-cover"
          :src="item.featuredAsset?.preview"
          :alt="item.name"
          loading="lazy"
          placeholder
          placeholder-class="blur-xl"
        />

        <template #footer>
          <h3>
            <ULink :to="localePath(`/categories/${item.slug}`)">
              <span class="absolute inset-0 z-10"></span>
              {{ item.name }}
            </ULink>
          </h3>
        </template>
      </UCard>
    </article>
  </UCarousel>
</template>

<style lang="css" scoped></style>

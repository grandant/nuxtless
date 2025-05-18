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
    class="mt-4 mb-12"
    :ui="{
      item: 'basis-full sm:basis-[60%] lg:basis-[45%] xl:basis-2/5',
    }"
  >
    <article>
      <UCard
        variant="outline"
        class="relative isolate mb-4 shadow"
        :ui="{ body: 'sm:p-0 p-0' }"
      >
        <NuxtImg
          format="webp"
          class="h-[250px] w-full rounded object-cover sm:h-[300px] lg:h-[325px] xl:h-[350px]"
          :src="item.featuredAsset?.preview"
          :alt="item.name"
          loading="lazy"
          placeholder
          placeholder-class="blur-xl"
          sizes="100vw sm:50vw lg:33vw xl:25vw"
        />

        <template #footer>
          <h3>
            <ULink :to="localePath(`/category/${item.slug}`)">
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

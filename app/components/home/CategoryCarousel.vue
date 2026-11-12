<script setup lang="ts">
import { readFragment } from "gql.tada";

import { CollectionMenuFragment } from "#layers/nuxtless/gql/fragments/collection";

const { data: menuCollections } = await useMenuCollections();

const childCollections = computed(
  () =>
    menuCollections.value?.collections.items.flatMap(
      (c) => readFragment(CollectionMenuFragment, c).children ?? [],
    ) ?? [],
);
</script>

<template>
  <UCarousel
    v-slot="{ item, index }"
    dots
    :items="childCollections"
    :ui="{
      item: 'basis-full sm:basis-[60%] lg:basis-[45%] xl:basis-2/5',
    }"
  >
    <CategoryCard :collection="item" :eager="index < 3" />
  </UCarousel>
</template>

<style lang="css" scoped></style>

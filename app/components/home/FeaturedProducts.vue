<script setup lang="ts">
import { SearchProducts } from "#layers/nuxtless/gql/queries/product";

const { data } = await useQuery({
  query: SearchProducts,
  variables: {
    term: "",
    take: 4,
  },
});

const items = computed(() => data.value?.search?.items ?? []);
</script>

<template>
  <div
    v-if="items.length"
    class="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4"
  >
    <ProductCard
      v-for="product in items"
      :key="product.slug"
      :product="product"
    />
  </div>
</template>

<style lang="css" scoped></style>

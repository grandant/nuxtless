<script setup lang="ts">
const { data } = await useAsyncGql("SearchProducts", {
  term: "",
  take: 4,
});

const products = data.value.search.items;
</script>

<template>
  <div class="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
    <ProductCard
      v-for="product in products"
      :key="product.slug"
      :product="product"
    />
  </div>
</template>

<style lang="css" scoped></style>

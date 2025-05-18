<script setup lang="ts">
const { data } = await useAsyncGql("GetProducts", { take: 5 });
const products = data.value.products.items;
</script>

<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<style lang="css" scoped></style>

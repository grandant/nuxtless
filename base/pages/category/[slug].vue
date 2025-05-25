<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;

const { data: collectionData } = await useAsyncGql("GetPageCollection", {
  slug,
});

const { data: collection } = await useAsyncGql("GetCollectionProducts", {
  slug,
  skip: 0,
  take: 12,
});

const products = collection.value.search?.items ?? [];
</script>

<template>
  <div>
    <h1 class="text-2xl">{{ collectionData.collection?.name }}</h1>

    <div class="container grid grid-cols-2 gap-4">
      <div v-for="product in products" :key="product.slug">
        <ULink :to="`/product/${product.slug}`">
          {{ product }}
        </ULink>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>

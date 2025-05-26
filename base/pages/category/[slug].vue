<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;

const { current } = getCurrentCollections();

const childCollections = computed(() =>
  current && "children" in current && Array.isArray(current.children)
    ? current.children
    : [],
);

const { data: collectionProducts } = await useAsyncGql(
  "GetCollectionProducts",
  {
    slug,
    skip: 0,
    take: 12,
  },
);

const products = collectionProducts.value.search?.items ?? [];
</script>

<template>
  <main>
    <h1 class="pt-14 text-2xl font-semibold">{{ current?.name }}</h1>
    <BaseBreadcrumbs class="pt-2 pb-14" />

    <section
      v-if="childCollections.length"
      class="pb-14"
      aria-labelledby="child-collections-heading"
    >
      <h2 id="child-collections-heading" class="pb-4 text-xl font-semibold">
        Collections
      </h2>
      <div
        class="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-6"
      >
        <CategoryCard
          v-for="collection in childCollections"
          :key="collection.id"
          :collection="collection"
          :eager="true"
        />
      </div>
    </section>

    <section class="pb-14" aria-labelledby="category-products-heading">
      <h2 id="category-products-heading" class="sr-only">Products</h2>
      <div
        class="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4"
      >
        <ProductCard
          v-for="(product, index) in products"
          :key="product.slug"
          :product="product"
          :eager="index < 4"
        />
      </div>
    </section>
  </main>
</template>

<style lang="css" scoped></style>

<script setup lang="ts">
import type { MenuCollections, ChildCollection } from "~~/types/collection";

const route = useRoute();
const slug = route.params.slug as string;

const menuCollections = useState<MenuCollections>("menuCollections");
const menuItems = menuCollections.value?.collections.items ?? [];

const currentCollection =
  menuItems.find((top) => top.slug === slug) ??
  menuItems
    .flatMap((top) => top.children ?? [])
    .find((child) => child.slug === slug);

const childCollections = computed(() =>
  currentCollection && "children" in currentCollection
    ? (currentCollection.children ?? [])
    : [],
) as ComputedRef<ChildCollection[]>;

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
    <h1 class="mt-14 text-2xl font-semibold">{{ currentCollection?.name }}</h1>
    <BreadcrumbTrail trail="category" class="mt-2 mb-14" />

    <!-- Child Collections -->
    <section
      v-if="childCollections.length"
      class="mb-14"
      aria-labelledby="child-collections-heading"
    >
      <h2 id="child-collections-heading" class="mb-4 text-xl font-semibold">
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

    <!-- Collection Products -->
    <section class="mb-14" aria-labelledby="category-products-heading">
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

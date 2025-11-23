<script setup lang="ts">
import { usePagination } from "#imports";
import type { MenuCollections, ChildCollection } from "~~/src/types/collection";

const { i18NBaseUrl } = useRuntimeConfig().public;
const route = useRoute();
const slug = route.params.slug as string;
const { t, locale } = useI18n();

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

const { take, page, skip, to } = usePagination(12);

const { data: collectionProducts } = await useAsyncGql(
  "GetCollectionProducts",
  {
    slug,
    skip: skip,
    take: take,
  },
);

const products = computed(() => collectionProducts.value?.search?.items ?? []);
const total = computed(() => collectionProducts.value?.search?.totalItems ?? 0);
const totalPages = computed(() => Math.ceil(total.value / take));

const nextUrl = computed(() =>
  page.value < totalPages.value ? `?page=${page.value + 1}` : null,
);

const prevUrl = computed(() =>
  page.value > 1 ? `?page=${page.value - 1}` : null,
);

watch(page, () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Head Props
useHead(() => ({
  link: [
    ...(prevUrl.value
      ? [{ rel: "prev", href: `${i18NBaseUrl}${route.path}${prevUrl.value}` }]
      : []),
    ...(nextUrl.value
      ? [{ rel: "next", href: `${i18NBaseUrl}${route.path}${nextUrl.value}` }]
      : []),
  ],
}));

// SEO Meta
useSeoMeta({
  title: currentCollection?.name,
  // description: currentCollection?.description,
  ogTitle: currentCollection?.name,
  // ogDescription: currentCollection?.description,
  twitterTitle: currentCollection?.name,
  // twitterDescription: currentCollection?.description,
});

// OgImage
defineOgImageComponent("Frame", {
  title: t("messages.site.title"),
  description: currentCollection?.name,
  image: currentCollection?.featuredAsset?.preview,
  // logo: "/logo.png",
});

// SchemaOrg
useSchemaOrg([
  defineWebPage({
    "@type": "CollectionPage",
    name: currentCollection.name,
    // description: currentCollection.description,
    inLanguage: locale.value,
    url: `${i18NBaseUrl}${route.path}`,
    nextItem: nextUrl.value
      ? `${i18NBaseUrl}${route.path}${nextUrl.value}`
      : undefined,
    previousItem: prevUrl.value
      ? `${i18NBaseUrl}${route.path}${prevUrl.value}`
      : undefined,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.value.map((p, i) => ({
        "@type": "ListItem",
        position: skip + i + 1,
        name: p.productName,
        url: `${i18NBaseUrl}/products/${p.slug}`,
      })),
      numberOfItems: total.value,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
    },
  }),

  defineBreadcrumb({
    itemListElement: getCategoryTrail().map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${i18NBaseUrl}${c.to}`,
    })),
  }),
]);
</script>

<template>
  <main class="container">
    <header class="mt-14">
      <h1 class="text-2xl font-semibold">{{ currentCollection?.name }}</h1>
      <BreadcrumbTrail trail="category" class="mt-2 mb-14" />
    </header>

    <!-- Child Collections -->
    <section
      v-if="childCollections.length"
      class="mb-14"
      aria-labelledby="child-collections-heading"
    >
      <h2 id="child-collections-heading" class="mb-4 text-xl font-semibold">
        <!-- Second argument is '2' because we always need plural here -->
        {{ t("messages.shop.category", 2) }}
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
    <section class="mb-8" aria-labelledby="category-products-heading">
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

    <nav
      v-if="total > take"
      class="mb-14 flex justify-center"
      role="navigation"
      aria-label="Pagination Navigation"
    >
      <UPagination
        :page="page"
        :total="total"
        :items-per-page="take"
        :to="to"
      />
    </nav>
  </main>
</template>

<style lang="css" scoped></style>

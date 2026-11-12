<script setup lang="ts">
import { readFragment } from "gql.tada";

import { CollectionMenuFragment } from "#layers/nuxtless/gql/fragments/collection";
import { ProductSearchFragment } from "#layers/nuxtless/gql/fragments/product";
import { GetCollectionProducts } from "#layers/nuxtless/gql/queries/collection";

import type { ChildCollection } from "#layers/nuxtless/types";

const { i18NBaseUrl } = useRuntimeConfig().public;
const route = useRoute();
const slug = route.params.slug as string;
const { t, locale } = useI18n();

const { data: menuCollections } = await useMenuCollections();

const menuItems = readFragment(
  CollectionMenuFragment,
  menuCollections.value?.collections.items ?? [],
);

const currentCollection =
  menuItems.find((top) => top.slug === slug) ??
  menuItems
    .flatMap((top) => top.children ?? [])
    .find((child) => child.slug === slug);

if (!currentCollection) {
  throw new Error(`Collection not found for slug: ${slug}`);
}

const childCollections = computed(() =>
  currentCollection && "children" in currentCollection
    ? (currentCollection.children ?? [])
    : [],
) as ComputedRef<ChildCollection[]>;

// TODO: Implement pagination with NuxtUI and remove usePagination
const { take, page, skip, to } = usePagination(12);

const { data: collectionProducts } = await useQuery({
  query: GetCollectionProducts,
  variables: computed(() => ({
    slug,
    skip: skip.value,
    take,
  })),
});

const products = computed(() =>
  readFragment(
    ProductSearchFragment,
    collectionProducts.value?.search?.items ?? [],
  ),
);

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
      ? [
          {
            rel: "prev" as const,
            href: `${i18NBaseUrl}${route.path}${prevUrl.value}`,
          },
        ]
      : []),
    ...(nextUrl.value
      ? [
          {
            rel: "next" as const,
            href: `${i18NBaseUrl}${route.path}${nextUrl.value}`,
          },
        ]
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
defineOgImage("Frame", {
  title: t("messages.site.title"),
  description: currentCollection?.name,
  image: currentCollection?.featuredAsset?.preview,
  // logo: "/logo.png",
});

// SchemaOrg
const categoryTrail = await getCategoryTrail();

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
      itemListElement: readFragment(ProductSearchFragment, products.value).map(
        (p, i) => ({
          "@type": "ListItem",
          position: skip.value + i + 1,
          name: p.productName,
          url: `${i18NBaseUrl}/products/${p.slug}`,
        }),
      ),
      numberOfItems: total.value,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
    },
  }),

  defineBreadcrumb({
    itemListElement: categoryTrail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${i18NBaseUrl}${c.to}`,
    })),
  }),
]);
</script>

<template>
  <UPage>
    <UContainer>
      <header class="mt-14">
        <h1 class="text-2xl font-semibold">{{ currentCollection?.name }}</h1>
        <BreadcrumbTrail trail="category" class="mt-2" />
      </header>

      <!-- Child Collections -->
      <UPageSection
        v-if="childCollections.length"
        :title="t('messages.shop.category', 2)"
        :ui="{ container: 'pt-0 lg:pt-0 pb-12 lg:pb-12' }"
      >
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
      </UPageSection>

      <!-- Collection Products -->
      <UPageSection
        title="Products"
        :ui="{ title: 'sr-only', container: 'pt-0 lg:pt-0 pb-12 lg:pb-12' }"
      >
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
      </UPageSection>

      <UPagination
        v-if="total > take"
        as="nav"
        aria-label="Pagination"
        class="flex justify-center"
        :page="page"
        :total="total"
        :items-per-page="take"
        :to="to"
      />
    </UContainer>
  </UPage>
</template>

<style lang="css" scoped></style>

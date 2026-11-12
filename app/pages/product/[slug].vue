<script setup lang="ts">
import { parse } from "valibot";

import { GetProductDetail } from "#layers/nuxtless/gql/queries/product";

import { ProductDetail } from "#layers/nuxtless/validators/product";

const route = useRoute();
const slug = route.params.slug as string;
const { t, locale } = useI18n();

// TODO: i18NBaseUrl should be replaced by siteUrl in NuxtSEO
const { i18NBaseUrl } = useRuntimeConfig().public;

const productStore = useProductStore();
const { hasOptions, selectedVariant } = storeToRefs(productStore);

const { data } = await useQuery({
  query: GetProductDetail,
  variables: { slug },
});

const product = computed(() =>
  data.value?.product ? parse(ProductDetail, data.value.product) : null,
);

watch(
  product,
  (p) => {
    if (p) productStore.init(p);
  },
  { immediate: true, flush: "post" },
);

const formatPrice = (amount: number) =>
  new Intl.NumberFormat(locale.value, {
    style: "currency",
    currency: selectedVariant.value?.currencyCode || "EUR",
  }).format(amount / 100);

// SEO Meta
useSeoMeta({
  title: product.value?.name,
  description: product.value?.description,
  ogTitle: product.value?.name,
  ogDescription: product.value?.description,
  twitterTitle: product.value?.name,
  twitterDescription: product.value?.description,
});

// OgImage
defineOgImage("Frame", {
  title: t("messages.site.title"),
  description: `${product.value?.name}: ${product.value?.description}`,
  image: product.value?.featuredAsset?.preview,
  // logo: "/logo.png",
});

// SchemaOrg
if (product.value && selectedVariant.value) {
  const images = product.value.assets?.map((a) => a.preview) ?? [];

  useSchemaOrg([
    defineProduct({
      name: selectedVariant.value.name,
      description: product.value.description,
      sku: selectedVariant.value.sku,
      // brand: {
      //   "@type": "Brand",
      //   name: product.value.facetValues.brand,
      // },
      image: images,
      inLanguage: locale.value,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${i18NBaseUrl}/products/${product.value.slug}`,
      },

      // Offers
      offers: {
        "@type": "Offer",
        url: `${i18NBaseUrl}/products/${product.value.slug}`,
        price: (selectedVariant.value.priceWithTax ?? 0) / 100,
        priceCurrency: selectedVariant.value.currencyCode ?? "EUR",
        availability:
          selectedVariant.value.stockLevel === "IN_STOCK"
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        itemCondition: "https://schema.org/NewCondition",
        seller: {
          "@type": "Organization",
          name: t("messages.site.title"),
        },
      },
    }),

    defineBreadcrumb({
      itemListElement: [
        ...getProductTrail(product.value).map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.label,
          item: `${i18NBaseUrl}${c.to}`,
        })),
        {
          "@type": "ListItem",
          position: (getProductTrail(product.value).length ?? 0) + 1,
          name: product.value.name,
          item: `${i18NBaseUrl}/products/${product.value.slug}`,
        },
      ],
    }),
  ]);
}
</script>

<template>
  <UPage>
    <UContainer>
      <header class="mt-14">
        <div class="flex gap-4">
          <h1 class="text-2xl font-semibold">
            {{ selectedVariant?.name ?? product?.name }}
          </h1>
        </div>
        <UBadge
          v-if="selectedVariant?.priceWithTax"
          color="info"
          trailing-icon="i-lucide-circle-small"
          class="rounded-e-full"
        >
          <div class="flex flex-row gap-2 text-sm font-bold">
            <span>
              {{ formatPrice(selectedVariant.priceWithTax) }}
            </span>
          </div>
        </UBadge>
        <BreadcrumbTrail :product="product" trail="product" class="mt-2" />
      </header>

      <!-- Product Overview -->
      <UPageSection
        title="Product Overview"
        :ui="{ title: 'sr-only', container: 'pt-0 lg:pt-0 pb-12 lg:pb-12' }"
      >
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ProductGallery />

          <div>
            <!-- Product Details -->
            <ProductDetails
              :stock-level="selectedVariant?.stockLevel"
              :sku="selectedVariant?.sku"
            />

            <ProductDescription class="mt-8 line-clamp-2" />

            <USeparator class="my-8" />

            <!-- Product Variants -->
            <ProductVariants />

            <CartAddButton
              :class="{ 'sm:mt-12': hasOptions }"
              class="hidden sm:flex"
            />
          </div>
        </div>
      </UPageSection>

      <USeparator />

      <!-- Full Description -->
      <UPageSection
        title="Product Description"
        :ui="{ title: 'sr-only', container: 'pt-0 lg:pt-0 pb-12 lg:pb-12' }"
      >
        <ProductDescription
          v-if="product?.description"
          :description="product?.description"
        />
      </UPageSection>

      <!-- Featured Products -->
      <UPageSection
        :title="t('messages.shop.popularProducts')"
        :ui="{ container: 'pt-0 lg:pt-0 pb-12 lg:pb-12' }"
      >
        <HomeFeaturedProducts />
      </UPageSection>

      <CartAddButton :class="{ 'sm:mt-12': hasOptions }" class="sm:hidden" />
    </UContainer>
  </UPage>
</template>

<style lang="css" scoped></style>

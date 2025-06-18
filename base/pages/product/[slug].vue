<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;
const orderStore = useOrderStore();
const productStore = useProductStore();

const { data: productData } = await useAsyncGql("GetProductDetail", {
  slug,
});

const product = productData.value.product;
productStore.init(product);
const { selectedVariant } = storeToRefs(productStore);

// TODO: Should be refactored to a composable/component
const addToCart = async () => {
  const variantId = product?.variants?.[0]?.id;
  if (variantId) {
    await orderStore.addItemToOrder(variantId, 1);
  }
};
</script>

<template>
  <main>
    <div
      class="grid grid-flow-row grid-cols-1 gap-10 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-[auto_auto_auto_auto]"
    >
      <header class="mt-14">
        <h1 class="text-2xl font-semibold">{{ product?.name }}</h1>
        <BreadcrumbTrail :product="product" trail="product" class="mt-2" />
      </header>

      <!-- Prouct Galley -->
      <section aria-labelledby="product-gallery-heading">
        <h2 id="product-gallery-heading" class="sr-only">Product Gallery</h2>
        <ProductGallery />
      </section>

      <div class="row-span-3 grid grid-rows-subgrid gap-4">
        <div class="row-start-2 mt-2 flex flex-col">
          <!-- Product Details -->
          <section aria-labelledby="product-details-heading">
            <h2 id="product-details-heading" class="sr-only">
              Product Details
            </h2>

            <ProductDetails
              :stock-level="selectedVariant?.stockLevel"
              :sku="selectedVariant?.sku"
            />

            <ProductDescription class="mt-8 line-clamp-2" />
          </section>

          <hr class="mt-8" />

          <!-- Product Variants -->
          <section aria-labelledby="product-variants-heading">
            <h2 id="product-variants-heading" class="sr-only">
              Product Variants
            </h2>
            <ProductVariants class="mt-8" />
          </section>

          <section
            class="mt-auto"
            aria-labelledby="product-add-to-cart-heading"
          >
            <h2 id="product-add-to-cart-heading" class="sr-only">
              Add to Cart
            </h2>
            <UButton label="Add to Cart" @click="addToCart" />
          </section>
        </div>
      </div>
    </div>

    <hr class="mb-8" />

    <!-- Full Description -->
    <section aria-labelledby="product-description-heading">
      <h2 id="product-description-heading" class="sr-only">
        Product Description
      </h2>
      <ProductDescription
        v-if="product?.description"
        :description="product?.description"
      />
    </section>

    <!-- Featured Products -->
    <section class="mt-14 mb-14" aria-labelledby="related-products-heading">
      <h2 id="related-products-heading" class="mb-4 text-2xl font-semibold">
        You Might Also Like
      </h2>
      <HomeFeaturedProducts />
    </section>
  </main>
</template>

<style lang="css" scoped></style>

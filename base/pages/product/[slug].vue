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
      <div class="mt-14">
        <h1 class="text-2xl font-semibold">
          {{ product?.name }}
        </h1>

        <BreadcrumbTrail :product="product" trail="product" class="mt-2" />
      </div>

      <ProductGallery />

      <div class="row-span-3 grid grid-rows-subgrid gap-4">
        <div class="row-start-2 mt-2 flex flex-col">
          <ProductDetails
            :stock-level="selectedVariant?.stockLevel"
            :sku="selectedVariant?.sku"
          />

          <ProductDescription class="mt-8 line-clamp-2" />

          <hr class="mt-8" />

          <ProductVariants class="mt-8" />

          <div class="mt-auto">
            <UButton label="Add to Cart" @click="addToCart" />
          </div>
        </div>
      </div>
    </div>

    <hr class="mb-8" />

    <!-- Full Description -->
    <ProductDescription
      v-if="product?.description"
      :description="product?.description"
    />
  </main>
</template>

<style lang="css" scoped></style>

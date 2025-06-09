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
    <div class="grid grid-flow-col grid-cols-2 gap-4">
      <div class="pt-14">
        <h1 class="text-2xl font-semibold">
          {{ product?.name }}
        </h1>
        <BreadcrumbTrail :product="product" trail="product" class="pt-2" />
      </div>
      <div class="row-span-2">
        <ProductGallery class="pt-4" />
      </div>
      <div class="row-span-3 grid grid-rows-subgrid">
        <div class="row-start-2 pt-4">
          <ProductDetails
            :stock-level="selectedVariant?.stockLevel"
            :sku="selectedVariant?.sku"
          />
          <ProductDescription :lines="2" />
        </div>
      </div>
    </div>

    <!-- <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
      <div class="grid grid-rows-[auto_auto_auto] pt-14">
        <div>
          <h1 class="text-2xl font-semibold">
            {{ product?.name }}
          </h1>

          <BreadcrumbTrail :product="product" trail="product" class="pt-2" />
        </div>

        <ProductGallery class="pt-4" />

        <hr />
      </div>

      <div class="grid grid-rows-[auto_auto_auto_auto] pt-14">
        <div class="row-span-2 row-start-2">
          <ProductDetails
            :stock-level="selectedVariant?.stockLevel"
            :sku="selectedVariant?.sku"
          />

          <ProductDescription :lines="2" />
        </div>

        <hr class="row-start-3" />

        <ProductVariants />
      </div>
    </div> -->

    <hr />
    <UButton label="Add to Cart" class="mt-4" @click="addToCart" />

    <!-- Full Description -->
    <ProductDescription
      v-if="product?.description"
      :description="product?.description"
    />
  </main>
</template>

<style lang="css" scoped></style>

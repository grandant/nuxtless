<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug as string;
const orderStore = useOrderStore();

const { data: productData } = await useAsyncGql("GetProductDetail", {
  slug,
});

const product = productData.value.product;
const { selectedVariant } = useProductVariants(product);

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
    <div class="grid grid-cols-1 sm:grid-cols-2">
      <div>
        <h1 class="pt-14 text-2xl font-semibold">
          {{ product?.name }}
        </h1>

        <BreadcrumbTrail
          :product="product"
          trail="product"
          class="pt-2 pb-14"
        />

        <ProductDetails
          :stock-level="selectedVariant?.stockLevel"
          :sku="selectedVariant?.sku"
        />

        <ProductDescription
          v-if="product?.description"
          :description="product?.description"
          :lines="2"
        />

        <hr />

        <ProductVariants :product="product" />

        <UButton label="Add to Cart" class="mt-4" @click="addToCart" />

        <hr />
      </div>

      <div>
        {{ product }}
      </div>
    </div>

    <hr />

    <ProductDescription
      v-if="product?.description"
      :description="product?.description"
    />
  </main>
</template>

<style lang="css" scoped></style>

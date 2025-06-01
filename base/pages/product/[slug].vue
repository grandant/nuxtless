<script setup lang="ts">
import { BreadcrumbTrail } from "#components";

const route = useRoute();
const slug = route.params.slug as string;
const orderStore = useOrderStore();

const { data: productData } = await useAsyncGql("GetProductDetail", {
  slug,
});

const product = productData.value.product;

const addToCart = async () => {
  const variantId = product?.variants?.[0]?.id;
  if (variantId) {
    await orderStore.addItemToOrder(variantId, 1);
  }
};
</script>

<template>
  <main>
    <div class="grid grid-cols-2">
      <div>
        <h1 class="pt-14 text-2xl font-semibold">
          {{ product?.name }}
        </h1>

        <BreadcrumbTrail
          :product="product"
          trail="product"
          class="pt-2 pb-14"
        />
        <span>
          {{ product?.description }}
        </span>
      </div>
      <div>
        <h1 class="text-2xl">{{ product?.name }}</h1>
      </div>
    </div>
    <UButton label="Add to Cart" class="mt-4" @click="addToCart" />
  </main>
</template>

<style lang="css" scoped></style>

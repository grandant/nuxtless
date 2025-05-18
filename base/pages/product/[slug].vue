<script setup lang="ts">
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
  <div>
    <h1 class="text-2xl">{{ product?.name }}</h1>
    <div>
      {{ product?.description }}
    </div>
    <UButton label="Add to Cart" class="mt-4" @click="addToCart" />
  </div>
</template>

<style lang="css" scoped></style>

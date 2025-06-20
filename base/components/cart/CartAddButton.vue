<script setup lang="ts">
const { variantId = undefined, disabled } = defineProps<{
  variantId?: string;
  disabled?: boolean;
}>();

const toast = useToast();
const { loading, error } = storeToRefs(useOrderStore());
const { addItemToOrder } = useOrderStore();
const quantity = ref(1);

watch(error, (val) => {
  if (val) {
    toast.add({
      title: "Failed to Add Product",
      description: "Failed adding product to cart. Please try again later.",
      color: "error",
    });
  }
});

async function addToCart() {
  if (!variantId || disabled) return;

  await addItemToOrder(variantId, quantity.value);
}
</script>

<template>
  <div class="flex w-md gap-4">
    <UInputNumber v-model="quantity" size="xl" :min="1" :max="10" />
    <UButton
      label="Add to Cart"
      :loading="loading"
      :disabled="loading || disabled"
      size="xl"
      class="w-full justify-center"
      @click="addToCart"
    />
  </div>
</template>

<style lang="css" scoped></style>

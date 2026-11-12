<script setup lang="ts">
const { disabled } = defineProps<{
  disabled?: boolean;
}>();

const { t } = useI18n();
const toast = useToast();

const orderStore = useOrderStore();
const productStore = useProductStore();

const { loading, error } = storeToRefs(orderStore);
const { selectedVariant, stockLevel } = storeToRefs(productStore);

const { addItemToOrder } = orderStore;

const variantId = computed(() => selectedVariant.value?.id);
const quantity = ref(1);

const hasStock = computed(
  () => stockLevel.value === "IN_STOCK" || stockLevel.value === "LOW_STOCK",
);

const mobileClasses =
  "fixed start-0 bottom-0 z-10 bg-gray-50/80 p-4 backdrop-blur dark:bg-gray-800/80";

watch(error, (val) => {
  if (val) {
    console.error(val);

    toast.add({
      title: "Failed to Add Product",
      description: val,
      color: "error",
    });
  }
});

async function addToCart() {
  if (!variantId.value || disabled || !hasStock.value) return;

  await addItemToOrder(variantId.value, quantity.value);
}
</script>

<template>
  <div
    :class="mobileClasses"
    class="flex w-full gap-4 sm:static sm:bg-none sm:p-0 sm:backdrop-blur-none"
  >
    <UInputNumber v-model="quantity" size="xl" :min="1" :max="10" />
    <UButton
      :label="t('messages.shop.addToCart')"
      :loading="loading"
      :disabled="disabled || !hasStock"
      size="xl"
      class="w-full justify-center"
      @click="addToCart"
    />
  </div>
</template>

<style lang="css" scoped></style>

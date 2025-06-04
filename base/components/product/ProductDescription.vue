<script setup lang="ts">
const { lines = null } = defineProps<{
  lines?: number | null;
}>();

const { product } = storeToRefs(useProductStore());
const description = product.value?.description;
</script>

<template>
  <p :class="[lines ? `line-clamp-${lines}` : '']" class="prose">
    {{ description }}
  </p>
</template>

<style lang="css" scoped></style>

<script setup lang="ts">
const { product } = storeToRefs(useProductStore());
const description = product.value?.description;
</script>

<template>
  <p class="prose">
    {{ description }}
  </p>
</template>

<style lang="css" scoped></style>

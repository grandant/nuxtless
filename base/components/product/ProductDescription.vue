<script setup lang="ts">
const { product } = storeToRefs(useProductStore());
const description = product.value?.description;
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div class="prose" v-html="description" />
</template>

<style lang="css" scoped></style>

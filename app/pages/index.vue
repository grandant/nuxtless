<script setup lang="ts">
const { data } = await useAsyncGql("GetMenuCollections");
</script>

<template>
  <div class="container grid grid-cols-4 gap-4">
    <div v-for="collection in data.collections.items" :key="collection.id">
      {{ collection }}
    </div>
  </div>
</template>

<style lang="css" scoped></style>

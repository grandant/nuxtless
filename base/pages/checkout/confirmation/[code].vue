<script setup lang="ts">
const route = useRoute();
const code = route.params.code as string;

const { data } = await useAsyncGql("GetOrderByCode", { code });

const order = computed(() => data.value?.orderByCode ?? null);
</script>

<template>
  <main class="mx-auto p-4">
    <h1>Order Confirmation</h1>

    <p>{{ order }}</p>
  </main>
</template>

<style lang="css" scoped></style>

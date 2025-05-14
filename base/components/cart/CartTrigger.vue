<script setup lang="ts">
const isCartOpen = useState<boolean>("isCartOpen");
</script>

<template>
  <UButton label="Cart" @click="isCartOpen = !isCartOpen" />
</template>

<style lang="css" scoped></style>

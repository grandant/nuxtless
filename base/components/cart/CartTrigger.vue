<script setup lang="ts">
import { LazyCartPanel } from "#components";

const overlay = useOverlay();

const slideover = overlay.create(LazyCartPanel);
const openCart = async () => await slideover.open();
</script>

<template>
  <UButton label="Cart" @click="openCart()" />
</template>

<style lang="css" scoped></style>

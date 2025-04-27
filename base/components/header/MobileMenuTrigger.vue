<script setup lang="ts">
import LazyMobileMenu from "./MobileMenu.vue";
const overlay = useOverlay();

const mobileMenu = overlay.create(LazyMobileMenu);
const openMobileMenu = async () => await mobileMenu.open();
</script>

<template>
  <UButton
    class="block md:hidden"
    label="Open"
    color="neutral"
    variant="subtle"
    @click="openMobileMenu"
  />
</template>

<style lang="css" scoped></style>

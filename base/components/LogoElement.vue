<script setup lang="ts">
const props = defineProps<{
  width?: number;
}>();

const logoWidth = props.width || 32;
const faviconUrl = "/favicon.ico";
</script>

<template>
  <NuxtLinkLocale
    to="/"
    class="inline-flex items-center gap-2 text-lg font-bold transition-opacity hover:opacity-80"
  >
    <img :src="faviconUrl" alt="Logo" :width="logoWidth" />
  </NuxtLinkLocale>
</template>

<style lang="css" scoped></style>

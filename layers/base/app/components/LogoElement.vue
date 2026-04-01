<script setup lang="ts">
const {
  logoLight = "/logo-full.svg",
  logoDark = "/logo-full.svg",
  wrapperClass = "w-full",
} = defineProps<{
  logoLight?: string;
  logoDark?: string;
  wrapperClass?: string;
}>();
</script>

<template>
  <div :class="wrapperClass" class="flex">
    <UColorModeImage :light="logoLight" :dark="logoDark" alt="Site Logo" />
  </div>
</template>

<style lang="css" scoped></style>

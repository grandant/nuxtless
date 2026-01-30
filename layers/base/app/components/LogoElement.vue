<script setup lang="ts">
const {
  logoLight = "/logo-top.svg",
  logoDark = "/logo-top.svg",
  width = 32,
} = defineProps<{
  logoLight?: string;
  logoDark?: string;
  width?: number;
}>();

const localePath = useLocalePath();
</script>

<template>
  <ULink
    :to="localePath('/')"
    class="inline-flex items-center gap-2 text-lg font-bold transition-opacity hover:opacity-80"
    aria-label="Home"
  >
    <UColorModeImage
      :light="logoLight"
      :dark="logoDark"
      :width="width"
      alt="Site Logo"
    />
  </ULink>
</template>

<style lang="css" scoped></style>

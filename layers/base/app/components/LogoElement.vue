<script setup lang="ts">
const {
  logoLight = "/logo-full.svg",
  logoDark = "/logo-full.svg",
  wrapperClass = "w-full",
  height = "50",
} = defineProps<{
  logoLight?: string;
  logoDark?: string;
  wrapperClass?: string;
  height?: string;
}>();

const localePath = useLocalePath();
</script>

<template>
  <div :class="wrapperClass" class="flex w-auto">
    <ULink
      :to="localePath('/')"
      class="flex items-center gap-2 transition-opacity hover:opacity-80"
      aria-label="Home"
    >
      <UColorModeImage
        :light="logoLight"
        :dark="logoDark"
        :class="`h-[${height}px]`"
        alt="Site Logo"
        class="w-full object-cover"
      />
    </ULink>
  </div>
</template>

<style lang="css" scoped></style>

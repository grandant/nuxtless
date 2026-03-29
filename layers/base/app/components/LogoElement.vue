<script setup lang="ts">
const props = defineProps<{
  logoLight?: string;
  logoDark?: string;
  width?: number;
}>();

const appConfig = useAppConfig();
const localePath = useLocalePath();

const logoLight = computed(() => props.logoLight ?? appConfig.logo.light);
const logoDark = computed(() => props.logoDark ?? appConfig.logo.dark);
const width = computed(() => props.width ?? appConfig.logo.width);
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

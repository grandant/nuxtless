<script setup lang="ts">
const {
  logoLight = "/logo-top.svg",
  logoDark = "/logo-top.svg",
  width = 32,
} = defineProps<{
  logoLight?: string;
  logoDark?: string;
  isFull?: boolean;
  width?: number;
}>();

const colorMode = useColorMode();
const localePath = useLocalePath();
const logoUrl = ref(logoLight);

onMounted(() => {
  logoUrl.value = colorMode.value === "dark" ? logoDark : logoLight;
});

watch(
  () => colorMode.value,
  (newMode) => {
    logoUrl.value = newMode === "dark" ? logoDark : logoLight;
  },
);
</script>

<template>
  <ULink
    :to="localePath('/')"
    class="inline-flex items-center gap-2 text-lg font-bold transition-opacity hover:opacity-80"
    aria-label="Home"
  >
    <NuxtImg :src="logoUrl" alt="Site Logo" :width="width" />
  </ULink>
</template>

<style lang="css" scoped></style>

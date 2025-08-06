<script setup lang="ts">
const {
  logoLight = "/favicon.ico",
  logoDark = "/favicon.ico",
  width = 32,
} = defineProps<{
  logoLight?: string;
  logoDark?: string;
  width?: number;
}>();

const colorMode = useColorMode();
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
  <NuxtLinkLocale
    to="/"
    class="inline-flex items-center gap-2 text-lg font-bold transition-opacity hover:opacity-80"
  >
    <img :src="logoUrl" alt="Logo" :width="width" />
  </NuxtLinkLocale>
</template>

<style lang="css" scoped></style>

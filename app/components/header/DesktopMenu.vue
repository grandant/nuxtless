<script setup lang="ts">
// TODO: Deprecated
import type { NavigationMenuItem } from "@nuxt/ui";

defineProps<{
  items: NavigationMenuItem[];
}>();
</script>

<template>
  <UNavigationMenu :items="items" />
</template>

<style lang="css" scoped></style>

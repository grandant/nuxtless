<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

const {
  appLocales = ["bg", "de", "en", "es", "fr", "it", "pt"],
  color = "primary",
} = defineProps<{ appLocales?: string[]; color?: string }>();

const { locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const items = computed<DropdownMenuItem[]>(() =>
  locales.value
    .filter((l) => appLocales.includes(l.code))
    .map((l) => ({
      label: l.name,
      to: switchLocalePath(l.code),
    })),
);
</script>

<template>
  <UDropdownMenu :items="items">
    <UButton
      icon="i-lucide-globe"
      variant="outline"
      :color="color"
      size="xl"
      aria-label="Language"
    />
  </UDropdownMenu>
</template>

<style lang="css" scoped></style>

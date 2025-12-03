<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui";

const {
  label = false,
  color = "primary",
  variant = "outline",
} = defineProps<{
  label?: boolean | string;
  color?: ButtonProps["color"];
  variant?: ButtonProps["variant"];
}>();

const { localeItems, currentLocaleName } = useLangSwitcher();
</script>

<template>
  <UDropdownMenu :items="localeItems">
    <UButton
      icon="i-lucide-globe"
      :label="
        label
          ? typeof label === 'string'
            ? label
            : currentLocaleName
          : undefined
      "
      :variant="variant"
      :color="color"
      size="xl"
      aria-label="Language"
    />
  </UDropdownMenu>
</template>

<style lang="css" scoped></style>

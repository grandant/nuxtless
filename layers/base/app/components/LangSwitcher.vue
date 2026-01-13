<script setup lang="ts">
import type { ButtonProps, DropdownMenuItem } from "@nuxt/ui";

const {
  locales = undefined,
  label = false,
  color = "primary",
  variant = "outline",
} = defineProps<{
  locales?: DropdownMenuItem[];
  label?: boolean | string;
  color?: ButtonProps["color"];
  variant?: ButtonProps["variant"];
}>();

const { localeItems, currentLocaleName } = useLangSwitcher();
</script>

<template>
  <UDropdownMenu :items="locales || localeItems">
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

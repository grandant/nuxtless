<script setup lang="ts">
import type { ButtonProps, DropdownMenuItem } from "@nuxt/ui";

const {
  label = false,
  color = "neutral",
  variant = "ghost",
} = defineProps<{
  label?: boolean | string;
  color?: ButtonProps["color"];
  variant?: ButtonProps["variant"];
}>();

const { t, locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const localeItems = computed<DropdownMenuItem[]>(() =>
  locales.value.map((localeItem) => ({
    label: localeItem.name,
    to: switchLocalePath(localeItem.code),
    locale: false,
  })),
);

const currentLocaleName = computed(
  () => locales.value.find((option) => option.code === locale.value)?.name,
);
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
      :aria-label="t('messages.navigation.language')"
    />
  </UDropdownMenu>
</template>

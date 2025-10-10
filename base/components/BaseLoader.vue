<script setup lang="ts">
const { t } = useI18n();

const { message = undefined, width = "w-full" } = defineProps<{
  message?: string;
  width?: string;
}>();
</script>

<template>
  <div
    class="container my-14 flex flex-col items-center justify-center gap-3"
    aria-busy="true"
    aria-live="polite"
  >
    <UProgress :animation="'swing'" :class="width" />
    <span>
      {{ message ?? t("messages.general.loading") }}
    </span>
  </div>
</template>

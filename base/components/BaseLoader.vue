<script setup lang="ts">
const { message = "Please wait...", width = "w-full" } = defineProps<{
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
    <span v-if="message" class="">
      {{ message }}
    </span>
  </div>
</template>

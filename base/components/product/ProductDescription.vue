<script setup lang="ts">
const { description, lines = null } = defineProps<{
  description: string;
  lines?: number | null;
}>();
</script>

<template>
  <p :class="[lines ? `line-clamp-${lines}` : '']" class="prose">
    {{ description }}
  </p>
</template>

<style lang="css" scoped></style>

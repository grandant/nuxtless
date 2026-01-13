<script setup lang="ts">
const { quantity, size = "sm" } = defineProps<{
  quantity: number;
  size?: "sm" | "xs" | "md" | "lg" | "xl" | undefined;
}>();

const emit = defineEmits<{
  (e: "update", value: number): void;
}>();

const input = computed({
  get: () => quantity,
  // UInputNumber emits on blur.
  // Only emit if the value actually changed.
  set: (val: number) => {
    if (val !== quantity) {
      emit("update", val);
    }
  },
});
</script>

<template>
  <UInputNumber v-model="input" :size="size" :min="1" :max="10" />
</template>

<style lang="css" scoped></style>

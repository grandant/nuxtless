<script setup lang="ts">
const props = defineProps<{
  quantity: number;
}>();

const emit = defineEmits<{
  (e: "update", value: number): void;
}>();

const increase = () => emit("update", props.quantity + 1);
const decrease = () => {
  if (props.quantity > 1) emit("update", props.quantity - 1);
};
</script>

<template>
  <div class="flex items-center gap-2">
    <UButton size="xs" @click="decrease">−</UButton>
    <span class="min-w-[2ch] text-center text-sm">{{ quantity }}</span>
    <UButton size="xs" @click="increase">+</UButton>
  </div>
</template>

<style lang="css" scoped></style>

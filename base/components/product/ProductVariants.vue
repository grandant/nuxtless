<script setup lang="ts">
import type { RadioGroupItem } from "@nuxt/ui";

const { optionGroups, selectedOptions } = storeToRefs(useProductStore());

const groupItems = computed(() => {
  const result: Record<string, RadioGroupItem[]> = {};

  for (const group of optionGroups.value) {
    result[group.name] = group.values.map((value) => ({
      label: value,
      value,
    }));
  }

  return result;
});
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2">
    <URadioGroup
      v-for="group in optionGroups"
      :key="group.name"
      v-model="selectedOptions[group.name]"
      indicator="hidden"
      orientation="horizontal"
      variant="table"
      :items="groupItems[group.name]"
      :legend="group.name"
      class="mb-4"
    />
  </div>
</template>

<style lang="css" scoped></style>

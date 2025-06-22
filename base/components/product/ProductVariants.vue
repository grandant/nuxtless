<script setup lang="ts">
import { USelect } from "#components";
import type { RadioGroupItem, SelectItem } from "@nuxt/ui";

interface OptionItem {
  label: string;
  value: string;
}

const { optionGroups, selectedOptions } = storeToRefs(useProductStore());

const groupItems = computed<Record<string, OptionItem[]>>(() => {
  const result: Record<string, OptionItem[]> = {};

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
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:gap-8">
    <div
      v-for="group in optionGroups"
      :key="group.name"
      :class="group.values.length > 4 ? 'order-first sm:col-span-2' : ''"
    >
      <fieldset v-if="group.values">
        <legend class="mb-2 text-sm">
          {{ group.name }}
        </legend>

        <URadioGroup
          v-if="group.values.length < 4"
          v-model="selectedOptions[group.name]"
          indicator="hidden"
          orientation="vertical"
          variant="table"
          :items="groupItems[group.name] as RadioGroupItem[]"
          class="block xl:hidden"
        />

        <URadioGroup
          v-if="group.values.length < 4"
          v-model="selectedOptions[group.name]"
          indicator="hidden"
          orientation="horizontal"
          variant="table"
          :items="groupItems[group.name] as RadioGroupItem[]"
          class="hidden xl:block"
        />

        <USelect
          v-else
          v-model="selectedOptions[group.name]"
          variant="outline"
          :highlight="true"
          :items="groupItems[group.name] as SelectItem[]"
          class="w-full xl:w-auto xl:min-w-sm"
        />
      </fieldset>
    </div>
  </div>
</template>

<style lang="css" scoped></style>

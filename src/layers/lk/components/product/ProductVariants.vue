<script setup lang="ts">
import { USelect } from "#components";
import type { RadioGroupItem, SelectItem } from "@nuxt/ui";

interface OptionItem {
  label: string;
  value: string;
}

const { optionGroups, selectedOptions } = storeToRefs(useProductStore());

const groupItems = computed<Record<string, OptionItem[]>>(() => {
  const res: Record<string, OptionItem[]> = {};
  for (const g of optionGroups.value) {
    res[g.id] = g.values.map((o) => ({ label: o.name, value: o.id }));
  }
  return res;
});
</script>

<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:gap-8">
    <div
      v-for="group in optionGroups"
      :key="group.id"
      :class="group.values.length > 4 ? 'order-first sm:col-span-2' : ''"
    >

      <fieldset v-if="group.values">
        <legend class="mb-2 text-sm">
          {{ group.name }}
        </legend>

        <URadioGroup
          v-if="group.values.length < 4"
          v-model="selectedOptions[group.id]"
          indicator="hidden"
          orientation="vertical"
          variant="table"
          :items="groupItems[group.id] as RadioGroupItem[]"
          class="block xl:hidden"
        />

        <URadioGroup
          v-if="group.values.length < 4"
          v-model="selectedOptions[group.id]"
          indicator="hidden"
          orientation="horizontal"
          variant="table"
          :items="groupItems[group.id] as RadioGroupItem[]"
          class="hidden xl:block"
        />

        <USelect
          v-else
          v-model="selectedOptions[group.id]"
          variant="outline"
          :highlight="true"
          :items="groupItems[group.id] as SelectItem[]"
          class="w-full xl:w-auto xl:min-w-sm"
        />
      </fieldset>
    </div>
  </div>
</template>

<style lang="css" scoped></style>

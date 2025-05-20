<script setup lang="ts">
import { useFocus } from "@vueuse/core";

// const inputRef = ref<HTMLElement | null>(null);
// const { focused } = useFocus(inputRef.value?.inputRef, { initialValue: true });

const { term, results, pending, error } = useSimpleSearch();

watch(error, (err) => {
  if (err) console.error(`Search error: ${err}`);
});
</script>

<template>
  <UModal
    title="Search products"
    description="Type for quick search or press enter for advanced search."
  >
    <UButton label="Search" color="primary" variant="subtle" />

    <template #body>
      <div class="h-80">
        <UInput
          ref="inputRef"
          v-model="term"
          placeholder="Search products..."
          aria-label="Search products"
        />

        <p v-if="pending">Loading</p>

        <div v-else-if="error" role="alert">
          <p>
            Something went wrong. Please try again. If the issue persists,
            please contact support.
          </p>
        </div>

        <ul v-else role="listbox">
          <li v-for="item in results" :key="item.slug" role="option">
            {{ item.productName }}
          </li>
        </ul>
      </div>
    </template>
  </UModal>
</template>

<style lang="css" scoped></style>

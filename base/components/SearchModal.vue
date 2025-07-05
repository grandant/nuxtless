<script setup lang="ts">
import { UInput } from "#components";

const localePath = useLocalePath();
const open = ref(false);
const inputElement = ref<InstanceType<typeof UInput> | null>(null);

watch(open, (isOpen) => {
  if (isOpen) {
    nextTick(() => inputElement.value?.inputRef?.focus());
  }
});

defineShortcuts({
  meta_k: () => (open.value = !open.value),
});

const { term, results, pending, error } = useSimpleSearch();

watch(error, (err) => {
  if (err) console.error(`Search error: ${err}`);
});
</script>

<template>
  <UModal
    v-model:open="open"
    title="Search products"
    description="Type for quick search or press enter for advanced search."
    :ui="{ content: 'h-screen sm:h-[32rem]' }"
  >
    <UButton variant="outline" icon="i-lucide-search" size="xl" />

    <template #body>
      <UInput
        ref="inputElement"
        v-model="term"
        icon="i-lucide-search"
        size="lg"
        variant="ghost"
        placeholder="Type to search..."
        class="mb-4 w-full"
        aria-label="Search products"
      />
      <div>
        <p v-if="pending">Loading</p>

        <div v-else-if="error" role="alert">
          <p class="text-red-500">
            Something went wrong. Please try again. If the issue persists,
            please contact support.
          </p>
        </div>

        <ul v-else class="grid gap-2" role="listbox">
          <li v-for="item in results" :key="item.slug" role="option">
            <UButton
              variant="outline"
              :avatar="{
                src: item.productAsset?.preview,
                size: '3xl',
              }"
              :to="localePath(`/product/${item.slug}`)"
              class="w-full"
              @click="open = !open"
            >
              {{ item.productName }}
            </UButton>
          </li>
        </ul>
      </div>
    </template>

    <template #footer>
      <UButton
        label="Close"
        color="neutral"
        variant="soft"
        @click="open = false"
      />
    </template>
  </UModal>
</template>

<style lang="css" scoped></style>

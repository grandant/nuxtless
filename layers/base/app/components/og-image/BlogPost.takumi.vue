<script setup lang="ts">
/**
 * @credits Takumi <https://takumi.kane.tw/>
 */

withDefaults(
  defineProps<{
    colorMode?: "dark" | "light";
    title?: string;
    author?: string;
    date?: string;
    category?: string;
    avatar?: string;
    backgroundImage?: string;
  }>(),
  {
    colorMode: "dark",
    // title: "Blog Post Title",
    // author: "Author Name",
    // date: "Jan 1, 2025",
    // category: "Technology",
  },
);
</script>

<template>
  <div
    class="flex h-full w-full flex-col justify-between bg-neutral-50 p-15 text-neutral-900 dark:bg-neutral-900 dark:text-white"
  >
    <NuxtImg
      :src="backgroundImage"
      class="absolute inset-0 w-full object-cover opacity-[0.7]"
    />

    <div class="flex items-start">
      <div
        class="rounded-full bg-gray-50 px-6 py-2 text-4xl font-semibold dark:bg-gray-950"
      >
        {{ category }}
      </div>
    </div>

    <div class="flex flex-col gap-6">
      <h1 class="m-0 text-[80px] font-extrabold" style="line-height: 1.1">
        {{ title }}
      </h1>
    </div>

    <div class="flex items-center gap-6">
      <div
        v-if="avatar"
        class="overflow-hidden border-4 border-neutral-200 dark:border-neutral-800"
        style="width: 80px; height: 80px; border-radius: 50%"
      >
        <img
          :src="avatar"
          alt="Avatar"
          class="h-full w-full"
          style="object-fit: cover; border-radius: 50%"
        />
      </div>
      <div class="flex flex-col">
        <span class="text-[32px] font-semibold">{{ author }}</span>
        <span class="text-[24px] text-neutral-400">{{ date }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @credits @arashsheyda <https://github.com/arashsheyda>
 */

withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    bg?: string;
    icon?: string;
    logo?: string;
    image?: string;
    username?: string;
    socials?: { name: string; icon: string }[];
  }>(),
  {
    bg: "linear-gradient(to bottom right, #171717, #131313)",
  },
);
</script>

<template>
  <div
    class="relative flex h-full w-full items-center justify-center border-2 border-white bg-neutral-900 text-white"
    :style="{ backgroundImage: bg }"
  >
    <div
      v-if="image"
      class="absolute inset-0 h-full w-full bg-center opacity-30"
      :style="{ backgroundImage: `url(${image})` }"
    />
    <div class="flex flex-col items-center text-center">
      <h1
        class="flex gap-4 text-7xl font-bold"
        style="display: block; line-clamp: 2; text-overflow: ellipsis"
      >
        <Icon v-if="icon" :name="icon" />
        {{ title }}
      </h1>
      <p
        class="max-w-3xl text-2xl"
        style="display: block; line-clamp: 3; text-overflow: ellipsis"
      >
        {{ description }}
      </p>
    </div>

    <img
      v-if="logo"
      :src="logo"
      class="absolute bottom-0 left-0 p-5"
      style="height: 125px; width: 153px"
    />
    <div class="absolute right-5 bottom-5 flex gap-4">
      <div v-if="username" class="absolute right-8 bottom-12 font-bold">
        {{ username }}
      </div>
      <Icon
        v-for="social of socials"
        :key="social.name"
        :name="social.icon!"
        class="h-7 w-7"
      />
    </div>
  </div>
</template>

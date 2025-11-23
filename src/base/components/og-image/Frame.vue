<script setup lang="ts">
/**
 * @credits @arashsheyda <https://github.com/arashsheyda>
 */

const {
  title = undefined,
  description = undefined,
  bg = "linear-gradient(to bottom right, #171717, #131313)",
  icon = undefined,
  logo = undefined,
  image = undefined,
  username = undefined,
  socials = undefined,
} = defineProps<{
  title?: string;
  description?: string;
  bg?: string;
  icon?: string;
  logo?: string;
  image?: string;
  username?: string;
  socials?: { name: string; icon: string }[];
}>();
</script>

<template>
  <div
    class="relative flex h-full w-full items-center justify-center border-2 border-white bg-neutral-900 text-white"
    :style="{ backgroundImage: bg }"
  >
    <NuxtImg
      v-if="image"
      format="webp"
      class="absolute inset-0 object-contain opacity-30"
      :src="image"
      sizes="1200px"
    />
    <div class="flex flex-col items-center text-center">
      <h1
        class="flex gap-4 text-7xl font-bold"
        style="display: block; line-clamp: 2; text-overflow: ellipsis"
      >
        <Icon v-if="icon" :name="icon" />
        <span> {{ title }} </span>
      </h1>
      <p
        class="max-w-3xl text-3xl"
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

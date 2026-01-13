<script setup lang="ts">
import type { ChildCollection } from "~~/types/collection";

const { collection, eager } = defineProps<{
  collection: ChildCollection;
  eager?: boolean;
}>();

if (!collection) {
  throw new Error("CollectionCard: 'collection' prop is required");
}

const localePath = useLocalePath();

const imageSrc = computed(
  () => collection?.featuredAsset?.preview || "/images/placeholder.webp",
);
</script>

<template>
  <article>
    <UCard
      variant="outline"
      class="relative isolate mb-4 shadow"
      :ui="{ body: 'sm:p-0 p-0' }"
    >
      <NuxtImg
        format="webp"
        class="h-[250px] w-full rounded object-cover sm:h-[300px] lg:h-[325px] xl:h-[350px]"
        :src="imageSrc"
        :alt="collection.name"
        :loading="eager ? 'eager' : 'lazy'"
        placeholder
        placeholder-class="blur-xl"
        sizes="100vw sm:50vw lg:33vw xl:25vw"
      />

      <template #footer>
        <h3 class="text-lg font-semibold">
          <ULink :to="localePath(`/category/${collection.slug}`)">
            <span class="absolute inset-0 z-10"></span>
            {{ collection.name }}
          </ULink>
        </h3>
      </template>
    </UCard>
  </article>
</template>

<style lang="css" scoped></style>

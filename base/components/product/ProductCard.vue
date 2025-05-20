<script setup lang="ts">
import type { ProductBase } from "~~/types/product";

const { product } = defineProps<{ product: ProductBase }>();

if (!product) {
  throw new Error("ProductCard: 'product' prop is required");
}

const localePath = useLocalePath();

const productStartPrice = computed(() => {
  const variants = product.variants ?? [];
  if (!variants.length) return "";

  const prices = variants.map((v) => v.price);
  const startPrice = Math.min(...prices);
  const priceString = (startPrice / 100).toFixed(2);
  const currencyCode = product.variants[0]?.currencyCode ?? "EUR";

  return variants.length > 1
    ? `From ${priceString} ${currencyCode}`
    : `${priceString} ${currencyCode}`;
});

const imageSrc = computed(
  () => product?.featuredAsset?.preview || "/images/placeholder.webp",
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
        :alt="product.name"
        loading="lazy"
        placeholder
        placeholder-class="blur-xl"
        sizes="100vw sm:50vw lg:33vw xl:25vw"
      />

      <template #footer>
        <h3>
          <ULink :to="localePath(`/product/${product.slug}`)">
            <span class="absolute inset-0 z-10"></span>
            {{ product.name }}
          </ULink>
        </h3>
        <span>{{ productStartPrice }}</span>
      </template>
    </UCard>
  </article>
</template>

<style lang="css" scoped></style>

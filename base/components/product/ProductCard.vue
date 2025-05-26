<script setup lang="ts">
import type { SearchResult } from "~~/types/product";

const { product, eager } = defineProps<{
  product: SearchResult[number];
  eager?: boolean;
}>();

if (!product) {
  throw new Error("ProductCard: 'product' prop is required");
}

const localePath = useLocalePath();

const productStartPrice = computed(() => {
  const price = product.priceWithTax;
  if (!price) return "";

  const currency = product.currencyCode ?? "EUR";

  if ("min" in price && "max" in price) {
    const min = (price.min / 100).toFixed(2);
    const max = (price.max / 100).toFixed(2);
    return min === max ? `${min} ${currency}` : `From ${min} ${currency}`;
  }

  const value = (price.value / 100).toFixed(2);
  return `${value} ${currency}`;
});

const imageSrc = computed(
  () => product?.productAsset?.preview || "/images/placeholder.webp",
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
        :alt="product.productName"
        :loading="eager ? 'eager' : 'lazy'"
        placeholder
        placeholder-class="blur-xl"
        sizes="100vw sm:50vw lg:33vw xl:25vw"
      />

      <template #footer>
        <h3>
          <ULink :to="localePath(`/product/${product.slug}`)">
            <span class="absolute inset-0 z-10"></span>
            {{ product.productName }}
          </ULink>
        </h3>
        <span>{{ productStartPrice }}</span>
      </template>
    </UCard>
  </article>
</template>

<style lang="css" scoped></style>

<script setup lang="ts">
import type { ShopFeature } from "~~/types/general";

const features: ShopFeature[] = [
  {
    icon: "i-lucide:truck",
    title: "Free Shipping",
    description: "Enjoy free delivery on all orders over €50.",
  },
  {
    icon: "i-lucide:rotate-ccw",
    title: "30-Day Returns",
    description: "Not satisfied? Return your order within 30 days.",
  },
  {
    icon: "i-lucide:shield-check",
    title: "Secure Checkout",
    description: "Powered by Stripe for encrypted, safe payments.",
  },
  {
    icon: "i-lucide:headphones",
    title: "Always Here",
    description: "24/7 online support for all your questions.",
  },
];
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <article v-for="feature in features" :key="feature.title">
      <UCard variant="outline" class="shadow">
        <div class="grid grid-cols-[auto_1fr] items-center gap-4">
          <UIcon
            :name="feature.icon"
            size="40"
            role="img"
            class="text-primary"
            :aria-label="feature.title"
          />
          <div class="space-y-1">
            <h3 class="text-lg font-bold">{{ feature.title }}</h3>
            <p class="text-sm">{{ feature.description }}</p>
          </div>
        </div>
      </UCard>
    </article>
  </div>
</template>

<style lang="css" scoped></style>

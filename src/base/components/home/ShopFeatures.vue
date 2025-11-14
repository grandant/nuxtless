<script setup lang="ts">
import type { ShopFeature } from "~~/src/types/general";

const { t } = useI18n();

const features: ShopFeature[] = [
  {
    icon: "i-lucide:truck",
    title: t("messages.general.shopFeatures.shipping"),
    description: t("messages.general.shopFeatures.shippingText"),
  },
  {
    icon: "i-lucide:rotate-ccw",
    title: t("messages.general.shopFeatures.returns"),
    description: t("messages.general.shopFeatures.returnsText"),
  },
  {
    icon: "i-lucide:shield-check",
    title: t("messages.general.shopFeatures.checkout"),
    description: t("messages.general.shopFeatures.checkoutText"),
  },
  {
    icon: "i-lucide:headphones",
    title: t("messages.general.shopFeatures.support"),
    description: t("messages.general.shopFeatures.supportText"),
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
            <h3 class="text-lg font-bold capitalize">{{ feature.title }}</h3>
            <p class="text-sm">{{ feature.description }}</p>
          </div>
        </div>
      </UCard>
    </article>
  </div>
</template>

<style lang="css" scoped></style>

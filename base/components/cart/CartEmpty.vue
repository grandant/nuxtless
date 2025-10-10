<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
const isCartOpen = useState<boolean>("isCartOpen");
</script>

<template>
  <div class="text-center">
    <UIcon name="i-lucide-shopping-cart" class="text-4xl" />
    <p class="text-lg font-medium">{{ t("messages.shop.cartEmpty") }}</p>
    <p class="text-sm">{{ t("messages.shop.browseOurProducts") }}</p>
    <UButton
      :to="localePath('/')"
      class="mt-6 px-7"
      @click="isCartOpen = false"
    >
      {{ t("messages.shop.browseProducts") }}
    </UButton>
  </div>
</template>

<style lang="css" scoped></style>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

defineProps<{
  items: NavigationMenuItem[];
}>();

const router = useRouter();
const open = ref(false);

router.afterEach(() => {
  open.value = false;
});
</script>

<template>
  <USlideover
    v-model:open="open"
    title="Menu"
    description="Mobile Menu"
    side="left"
  >
    <UButton
      icon="i-lucide-menu"
      size="xl"
      color="neutral"
      variant="ghost"
      :ui="{ base: `p-1`, leadingIcon: 'text-2xl' }"
    />

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" highlight />
    </template>

    <template #footer>
      <div class="flex gap-2">Footer</div>
    </template>
  </USlideover>
</template>

<style lang="css" scoped></style>

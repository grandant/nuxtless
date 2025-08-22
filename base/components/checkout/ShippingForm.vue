<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { ShippingForm } from "~~/base/validators/shippingForm";

const { triggerSubmit } = defineProps<{ triggerSubmit: boolean }>();

const emit = defineEmits<{
  (e: "success"): void;
}>();

const orderStore = useOrderStore();
await orderStore.getShippingMethods();
const { shippingMethods: shippingMethodsData } = storeToRefs(useOrderStore());

const shippingMethods = computed(
  () =>
    shippingMethodsData.value?.map((m) => ({
      label: m.name,
      value: m.id,
    })) ?? [],
);

const shippingForm = useTemplateRef("shippingForm");

const state = reactive({
  shippingMethodId: "",
});

watch(
  () => triggerSubmit,
  (val) => {
    if (val) shippingForm.value?.submit();
  },
  { immediate: false },
);

watch(
  () => state.shippingMethodId,
  async (newVal, oldVal) => {
    if (newVal !== oldVal) {
      await orderStore.setShippingMethod(state?.shippingMethodId ?? "");
    }
  },
);

async function onSubmit(event: FormSubmitEvent<ShippingForm>) {
  if (!state.shippingMethodId) return;

  await orderStore.setShippingMethod(event.data.shippingMethodId);

  if (!orderStore.error) emit("success");
}
</script>

<template>
  <UForm
    ref="shippingForm"
    :schema="ShippingForm"
    :state="state"
    class="mt-4 space-y-4"
    @submit="onSubmit"
  >
    <UFormField label="Shipping Method" class="text-md" name="shippingMethodId">
      <URadioGroup
        v-model="state.shippingMethodId"
        indicator="hidden"
        variant="table"
        orientation="vertical"
        size="xl"
        :items="shippingMethods"
        :ui="{ item: 'w-full' }"
        class="block lg:hidden"
      />
      <URadioGroup
        v-model="state.shippingMethodId"
        indicator="hidden"
        variant="table"
        orientation="horizontal"
        :items="shippingMethods"
        :ui="{ item: 'w-full' }"
        class="hidden lg:block"
      />
    </UFormField>
  </UForm>
</template>

<style lang="css" scoped></style>

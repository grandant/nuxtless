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

watch(
  () => triggerSubmit,
  (val) => {
    if (val) shippingForm.value?.submit();
  },
);

const state = reactive({
  shippingMethodId: "",
});

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
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormField label="Shipping Method" name="shippingMethodId">
      <USelect v-model="state.shippingMethodId" :items="shippingMethods" />
    </UFormField>
  </UForm>
</template>

<style lang="css" scoped></style>

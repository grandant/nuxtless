<script setup lang="ts">
import { ShippingForm } from "../../validators/shippingForm";

import type { CheckoutState } from "~~/types/general";

const isSubmitted = defineModel<boolean>({ default: false });

const shippingForm = useTemplateRef("shippingForm");
const submitShipping = () => shippingForm.value?.submit();
defineExpose({ submitShipping });

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

const checkoutState = useState<CheckoutState>("checkoutState");
const state = checkoutState.value.shippingForm as ShippingForm;
state.shippingMethodId = shippingMethods.value[0]?.value ?? "";
await orderStore.setShippingMethod(shippingMethods.value[0]?.value ?? "");

async function onSubmit() {
  if (!state.shippingMethodId) return;

  await orderStore.setShippingMethod(state.shippingMethodId);
  if (!orderStore.error) isSubmitted.value = true;
}

async function onError() {
  isSubmitted.value = false;
}
</script>

<template>
  <UForm
    ref="shippingForm"
    :schema="ShippingForm"
    :state="state"
    class="mt-4 space-y-4"
    @submit="onSubmit"
    @error="onError"
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
        :disabled="orderStore.loading"
        class="block lg:hidden"
      />
      <URadioGroup
        v-model="state.shippingMethodId"
        indicator="hidden"
        variant="table"
        orientation="horizontal"
        :items="shippingMethods"
        :ui="{ item: 'w-full' }"
        :disabled="orderStore.loading"
        class="hidden lg:block"
      />
    </UFormField>
  </UForm>
</template>

<style lang="css" scoped></style>

<script setup lang="ts">
import { PaymentForm } from "~~/layers/base/validators/paymentForm";

import type { CheckoutState } from "~~/types/general";

const isSubmitted = defineModel<boolean>({ default: false });

const { t } = useI18n();
const paymentForm = useTemplateRef("paymentForm");
const submitPayment = () => paymentForm.value?.submit();
defineExpose({ submitPayment });

const orderStore = useOrderStore();
await orderStore.getPaymentMethods();
const { paymentMethods: paymentMethodsData } = storeToRefs(useOrderStore());

const paymentMethods = computed(
  () =>
    paymentMethodsData.value?.map((m) => ({
      label: m.name,
      value: m.code,
    })) ?? [],
);

const checkoutState = useState<CheckoutState>("checkoutState");
const state = checkoutState.value.paymentForm;
const stripeElement = useTemplateRef("stripeElementRef");

async function onSubmit() {
  if (!state.code) return;

  orderStore.error = null;
  orderStore.loading = true;

  // Note: consider a switch or a composable if more methods are added later
  if (state.code === "standard-payment") {
    await orderStore.transitionToState("ArrangingPayment");
    if (orderStore.error) {
      orderStore.loading = false;
      return;
    }

    await orderStore.addPaymentToOrder({ method: state.code, metadata: {} });
    if (orderStore.error) {
      orderStore.loading = false;
      return;
    }
  } else if (state.code === "stripe-payment") {
    await orderStore.transitionToState("ArrangingPayment");
    if (orderStore.error) {
      orderStore.loading = false;
      return;
    }

    await stripeElement.value?.submitStripePayment();
  }

  orderStore.loading = false;
  isSubmitted.value = true;
}

async function onError() {
  isSubmitted.value = false;
}
</script>

<template>
  <UForm
    ref="paymentForm"
    :schema="PaymentForm"
    :state="state"
    class="mt-4 space-y-4"
    @submit="onSubmit"
    @error="onError"
  >
    <UFormField
      :label="t('messages.general.paymentMethod')"
      class="text-md"
      name="code"
    >
      <URadioGroup
        v-model="state.code"
        indicator="hidden"
        variant="table"
        orientation="vertical"
        :items="paymentMethods"
        :ui="{ item: 'w-full' }"
        class="block lg:hidden"
      />
      <URadioGroup
        v-model="state.code"
        indicator="hidden"
        variant="table"
        orientation="horizontal"
        :items="paymentMethods"
        :ui="{ item: 'w-full' }"
        class="hidden lg:block"
      />
    </UFormField>

    <CheckoutStripeElement
      v-if="state.code === 'stripe-payment'"
      ref="stripeElementRef"
    />
  </UForm>
</template>

<style lang="css" scoped></style>

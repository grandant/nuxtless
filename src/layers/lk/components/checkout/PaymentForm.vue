<script setup lang="ts">
import { PaymentForm } from "~~/src/base/validators/paymentForm";

import type { CheckoutState } from "~~/src/types/general";

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

/*const { robokassaStartPayment } = useRobokassa();*/

const checkoutState = useState<CheckoutState>("checkoutState");
const state = checkoutState.value.paymentForm;
console.log(state);
const addressForm = useTemplateRef("stripeElement");

async function onSubmit() {
  console.log(state.code);
  if (!state.code) return;

  // Note: consider a switch or a composable if more methods are added later
  if (state.code === "robokassa-payment") {
    await orderStore.transitionToState("ArrangingPayment");
    const {createRobokassaPaymentIntent:{paymentUrl, search}} = await GqlCreateRobokassaPaymentIntent();
    console.log(paymentUrl);
    console.log(search);
    await navigateTo(paymentUrl, {
      external: true
    });
  } else if (state.code === "stripe-payment") {
    orderStore.loading = true;
    await addressForm.value?.submitStripePayment();
    orderStore.loading = false;
  }

  if (!orderStore.error) {
    isSubmitted.value = true;
  }
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
    ROBO
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
      ref="stripeElement"
    />
  </UForm>
</template>

<style lang="css" scoped></style>

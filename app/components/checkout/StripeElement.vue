<script setup lang="ts">
import { CreateStripePaymentIntent } from "#layers/nuxtless/gql/mutations/payment";

import type { CheckoutState } from "#layers/nuxtless/types";

const { stripePublicKey } = useRuntimeConfig().public;
const colorMode = useColorMode();
const { locale } = useI18n();
const client = useUrqlClient();
const { onLoaded } = useScriptStripe();

const { stripe, elements, initStripe, submitStripePayment } = useStripe();

defineExpose({ submitStripePayment });

const orderStore = useOrderStore();

const { order } = storeToRefs(orderStore);

const orderTotal = computed(() => order.value?.totalWithTax ?? 0);
const checkoutState = useState<CheckoutState>("checkoutState");
const state = checkoutState.value.paymentForm;

watch(orderTotal, async (newTotal, oldTotal) => {
  if (newTotal === oldTotal) return;

  const { data, error } = await client
    .mutation(CreateStripePaymentIntent, {})
    .toPromise();

  if (error) throw error;

  if (data?.createStripePaymentIntent) {
    initStripe(data.createStripePaymentIntent);
  }
});

watch(colorMode, () => {
  elements.value?.update({
    appearance: {
      theme: colorMode.value === "dark" ? "night" : "stripe",
      labels: "floating",
    },
  });
});

onMounted(() => {
  onLoaded(async ({ Stripe }) => {
    stripe.value = Stripe(stripePublicKey, { locale: locale.value });

    if (state.code === "stripe-payment") {
      const { data, error } = await client
        .mutation(CreateStripePaymentIntent, {})
        .toPromise();

      if (error) throw error;

      if (data?.createStripePaymentIntent) {
        initStripe(data.createStripePaymentIntent);
      }
    }
  });
});
</script>

<template>
  <div ref="paymentElRef" />
</template>

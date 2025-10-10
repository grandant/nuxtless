<script setup lang="ts">
import type { CheckoutState } from "~~/types/general";

const { stripePublicKey } = useRuntimeConfig().public;
const { onLoaded } = useScriptStripe();
const { stripe, paymentElRef, initStripe, submitStripePayment } = useStripe();

defineExpose({ submitStripePayment });

const { order } = storeToRefs(useOrderStore());
const orderTotal = computed(() => order.value?.totalWithTax ?? 0);
const checkoutState = useState<CheckoutState>("checkoutState");
const state = checkoutState.value.paymentForm;

watch(
  () => orderTotal.value,
  async (n, o) => {
    if (n !== o) {
      const { createStripePaymentIntent } =
        await GqlCreateStripePaymentIntent();
      initStripe(createStripePaymentIntent);
    }
  },
);

onMounted(() => {
  onLoaded(async ({ Stripe }) => {
    stripe.value = Stripe(stripePublicKey);

    if (state.code === "stripe-payment") {
      const { createStripePaymentIntent } =
        await GqlCreateStripePaymentIntent();
      initStripe(createStripePaymentIntent);
    }
  });
});
</script>

<template>
  <div ref="paymentElRef" />
</template>

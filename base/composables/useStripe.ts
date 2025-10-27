import type {
  Stripe,
  StripeElements,
  StripePaymentElement,
  Appearance,
} from "@stripe/stripe-js";

export function useStripe() {
  const colorMode = useColorMode();
  const localePath = useLocalePath();
  const orderStore = useOrderStore();
  const { order } = storeToRefs(orderStore);
  const stripe = ref<Stripe | null>(null);
  const elements = ref<StripeElements | null>(null);
  const paymentEl = shallowRef<StripePaymentElement | null>(null);
  const paymentElRef = ref<HTMLDivElement | null>(null);

  function initStripe(clientSecret: string) {
    if (!stripe.value || !paymentElRef.value) return;

    const appearance: Appearance = {
      theme: colorMode.value === "dark" ? "night" : "stripe",
      labels: "floating",
    };

    paymentEl.value?.unmount();
    elements.value = stripe.value.elements({ clientSecret, appearance });
    paymentEl.value = elements.value.create("payment");
    paymentEl.value.mount(paymentElRef.value);
  }

  async function submitStripePayment() {
    if (!stripe.value || !elements.value) return;

    const { error } = await stripe.value.confirmPayment({
      elements: elements.value,
      confirmParams: {
        return_url: `${location.origin}${localePath(`/checkout/confirmation/${order.value?.code}`)}`,
      },
    });

    if (error) {
      orderStore.loading = false;
      throw new Error(error.message);
    }
  }

  return { stripe, elements, paymentElRef, initStripe, submitStripePayment };
}

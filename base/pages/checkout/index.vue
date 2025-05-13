<script setup lang="ts">
const router = useRouter();
const toast = useToast();
const orderStore = useOrderStore();

const isSubmitted = reactive({
  address: false,
  shipping: false,
  payment: false,
});

const triggerSubmit = reactive({
  address: false,
  shipping: false,
  payment: false,
});

async function submitStep(step: keyof typeof triggerSubmit): Promise<boolean> {
  triggerSubmit[step] = true;

  await Promise.race([
    until(() => isSubmitted[step]).toBe(true),
    until(() => !!orderStore.error).toBe(true),
  ]);

  if (orderStore.error) {
    toast.add({
      title: "Checkout Failed",
      description: orderStore.error,
      color: "error",
    });

    triggerSubmit[step] = false;
    return false;
  }

  return !orderStore.error;
}

async function onSubmit() {
  if (!(await submitStep("address"))) return;
  if (!(await submitStep("shipping"))) return;
  if (!(await submitStep("payment"))) return;

  if (isSubmitted.address && isSubmitted.shipping && isSubmitted.payment) {
    isSubmitted.address = false;
    isSubmitted.shipping = false;
    isSubmitted.payment = false;

    orderStore.error = null;
    const orderCode = orderStore.order?.code;
    router.push(`/checkout/confirmation/${orderCode}`);

    toast.add({
      title: "Order Successful",
      description: "Thank you for your order.",
      color: "success",
    });
  }
}
</script>

<template>
  <main class="mx-auto p-4">
    <h1>Checkout</h1>

    <CheckoutAddressForm
      ref="addressForm"
      :trigger-submit="triggerSubmit.address"
      @success="
        isSubmitted.address = true;
        triggerSubmit.address = false;
      "
      @error="triggerSubmit.address = false"
    />

    <CheckoutShippingForm
      ref="shippingForm"
      :trigger-submit="triggerSubmit.shipping"
      @success="
        isSubmitted.shipping = true;
        triggerSubmit.shipping = false;
      "
      @error="triggerSubmit.shipping = false"
    />

    <CheckoutPaymentForm
      ref="paymentForm"
      :trigger-submit="triggerSubmit.payment"
      @success="
        isSubmitted.payment = true;
        triggerSubmit.payment = false;
      "
      @error="triggerSubmit.payment = false"
    />

    <UButton type="submit" @click="onSubmit"> Submit </UButton>
  </main>
</template>

<style lang="css" scoped></style>

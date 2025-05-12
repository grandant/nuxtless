<script setup lang="ts">
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

async function onSubmit() {
  triggerSubmit.address = true;
  await until(() => isSubmitted.address).toBe(true);

  triggerSubmit.shipping = true;
  await until(() => isSubmitted.shipping).toBe(true);

  triggerSubmit.payment = true;
  await until(() => isSubmitted.payment).toBe(true);
}
</script>

<template>
  <main class="mx-auto p-4">
    <h1>Checkout</h1>

    <CheckoutAddressForm
      ref="addressForm"
      :trigger-submit="triggerSubmit.address"
      @success="isSubmitted.address = true"
    />

    <CheckoutShippingForm
      ref="shippingForm"
      :trigger-submit="triggerSubmit.shipping"
      @success="isSubmitted.shipping = true"
    />

    <CheckoutPaymentForm
      ref="paymentForm"
      :trigger-submit="triggerSubmit.payment"
      @success="isSubmitted.payment = true"
    />

    <UButton type="submit" @click="onSubmit"> Submit </UButton>
  </main>
</template>

<style lang="css" scoped></style>

<script setup lang="ts">
import type { ActiveOrderDetail } from "~~/types/order";

const router = useRouter();
const toast = useToast();
const orderStore = useOrderStore();
const { order } = storeToRefs(orderStore);
const loading = ref(true);

if (!order.value || !("shippingWithTax" in order.value)) {
  await orderStore.fetchOrder("detail");
}

// Safe: We fetch with "detail" above. Order should always be ActiveCustomerDetail.
const activeOrder = computed(() => order.value as ActiveOrderDetail);

watch(activeOrder, async (newOrder, oldOrder) => {
  if (newOrder?.totalWithTax !== oldOrder?.totalWithTax) {
    await orderStore.fetchOrder("detail");
    await orderStore.getShippingMethods();
  }
});

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
    const orderCode = activeOrder.value?.code;
    await router.push(`/checkout/confirmation/${orderCode}`);
    order.value = null;

    toast.add({
      title: "Order Successful",
      description: "Thank you for your order.",
      color: "success",
    });
  }
}

onMounted(() => {
  loading.value = false;
});
</script>

<template>
  <BaseLoader v-if="loading" width="sm:w-xs md:w-sm" />
  <main
    v-else
    class="container my-14 flex flex-col md:flex-row"
    aria-labelledby="checkout-title"
  >
    <h1 id="checkout-title" class="sr-only">Checkout</h1>

    <div v-if="(activeOrder?.lines.length ?? 0) < 1">
      <section aria-labelledby="cart-empty-title">
        <h2 id="cart-empty-title" class="sr-only">Cart empty</h2>
        <CartEmpty />
      </section>

      <section aria-labelledby="home-products-heading">
        <h2 id="home-products-heading" class="mb-4 text-2xl font-semibold">
          Featured Products
        </h2>
        <HomeFeaturedProducts />
      </section>
    </div>

    <div v-else class="flex w-full flex-col gap-12 md:flex-row md:gap-12">
      <div class="w-full md:w-1/2 lg:w-2/3">
        <section id="address" aria-labelledby="address-heading">
          <h2 id="address-heading" class="mb-4 text-2xl font-semibold">
            Delivery Information
          </h2>

          <div id="address-errors" role="status" aria-live="polite" />

          <CheckoutAddressForm
            ref="addressForm"
            aria-labelledby="address-heading"
            aria-describedby="address-errors"
            novalidate
            :trigger-submit="triggerSubmit.address"
            @success="
              isSubmitted.address = true;
              triggerSubmit.address = false;
            "
            @error="triggerSubmit.address = false"
          />
        </section>

        <!-- Shipping -->
        <section id="shipping" aria-labelledby="shipping-heading">
          <h2 id="shipping-heading" class="sr-only">Shipping</h2>

          <div id="shipping-errors" role="status" aria-live="polite" />

          <CheckoutShippingForm
            ref="shippingForm"
            aria-labelledby="shipping-heading"
            aria-describedby="shipping-errors"
            novalidate
            :trigger-submit="triggerSubmit.shipping"
            @success="
              isSubmitted.shipping = true;
              triggerSubmit.shipping = false;
            "
            @error="triggerSubmit.shipping = false"
          />
        </section>

        <!-- Payment -->
        <section id="payment" aria-labelledby="payment-heading">
          <h2 id="payment-heading" class="sr-only">Payment</h2>

          <div id="payment-errors" role="status" aria-live="polite" />

          <CheckoutPaymentForm
            ref="paymentForm"
            aria-labelledby="payment-heading"
            aria-describedby="payment-errors"
            novalidate
            :trigger-submit="triggerSubmit.payment"
            @success="
              isSubmitted.payment = true;
              triggerSubmit.payment = false;
            "
            @error="triggerSubmit.payment = false"
          />
        </section>
      </div>

      <aside
        role="complementary"
        aria-labelledby="order-summary-heading"
        class="sticky top-30 h-fit w-full md:w-2/3 lg:w-1/3"
      >
        <h2 id="order-summary-heading" class="mb-4 text-2xl font-semibold">
          Order summary
        </h2>
        <CheckoutOrderSummary
          :active-order="activeOrder"
          :on-submit="onSubmit"
        />
      </aside>
    </div>
  </main>
</template>

<style lang="css" scoped></style>

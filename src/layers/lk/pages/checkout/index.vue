<script setup lang="ts">
import type { ActiveOrderDetail } from "~~/src/types/order";
import type { CheckoutState } from "~~/src/types/general";

const router = useRouter();
const { t } = useI18n();
const localePath = useLocalePath();
const toast = useToast();
const orderStore = useOrderStore();
const { order } = storeToRefs(orderStore);
const isMounted = ref(false);

if (!order.value || !("shippingWithTax" in order.value)) {
  await orderStore.fetchOrder("detail");
}

// Safe: We fetch with "detail" above. Order should always be ActiveCustomerDetail.
const activeOrder = computed(() => order.value as ActiveOrderDetail);

watch(activeOrder, async (newOrder, oldOrder) => {
  if (newOrder?.totalWithTax !== oldOrder?.totalWithTax) {
    await orderStore.fetchOrder("detail");
  }
});

const addressForm = useTemplateRef("addressForm");
const shippingForm = useTemplateRef("shippingForm");
const paymentForm = useTemplateRef("paymentForm");

useState<CheckoutState>("checkoutState", () => ({
  addressForm: {
    firstName: "",
    lastName: "",
    emailAddress: "",
    streetLine1: "",
    streetLine2: "",
    city: "",
    postalCode: "",
    countryCode: "BG",
    billingSameAsShipping: true,
  },
  shippingForm: {
    shippingMethodId: "",
  },
  paymentForm: {
    code: "standard-payment",
  },
}));

const isSubmitted = shallowReactive({
  address: false,
  shipping: false,
  payment: false,
});

// watchEffect(() => {
//   console.log(orderStore.error);
//   console.log(isSubmitted);
// });

async function onSubmit() {
  await addressForm.value?.submitAddress();
  await shippingForm.value?.submitShipping();
  if (!(isSubmitted.address && isSubmitted.shipping)) return;
  await paymentForm.value?.submitPayment();

  if (isSubmitted.address && isSubmitted.shipping && isSubmitted.payment) {
    isSubmitted.address = false;
    isSubmitted.shipping = false;
    isSubmitted.payment = false;

    orderStore.error = null;
    const orderCode = activeOrder.value?.code;
    await router.push(localePath(`/checkout/confirmation/${orderCode}`));
    order.value = null;

    toast.add({
      title: "Order Successful",
      description: "Thank you for your order.",
      color: "success",
    });
  }
}

onMounted(() => {
  isMounted.value = true;
  //useCheckout(); // recalc shipping under certain condtitions
});
</script>

<template>
  <BaseLoader v-if="!isMounted" width="sm:w-xs md:w-sm" />
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
        <h2
          id="home-products-heading"
          class="mt-14 mb-4 text-2xl font-semibold"
        >
          {{ t("messages.shop.popularProducts") }}
        </h2>
        <HomeFeaturedProducts />
      </section>
    </div>

    <div v-else class="flex w-full flex-col gap-12 md:flex-row md:gap-12">
      <div class="w-full md:w-1/2 lg:w-2/3">
        <section id="address" aria-labelledby="address-heading">
          <h2 id="address-heading" class="mb-4 text-2xl font-semibold">
            {{ t("messages.general.shippingDetails") }}
          </h2>

          <div id="address-errors" role="status" aria-live="polite" />

          <CheckoutAddressForm
            ref="addressForm"
            v-model="isSubmitted.address"
            aria-labelledby="address-heading"
            aria-describedby="address-errors"
            novalidate
          />
        </section>

        <!-- Shipping -->
        <section id="shipping" aria-labelledby="shipping-heading">
          <h2 id="shipping-heading" class="sr-only">Shipping</h2>

          <div id="shipping-errors" role="status" aria-live="polite" />

          <CheckoutShippingForm
            ref="shippingForm"
            v-model="isSubmitted.shipping"
            aria-labelledby="shipping-heading"
            aria-describedby="shipping-errors"
            novalidate
          />
        </section>

        <!-- Payment -->
        <section id="payment" aria-labelledby="payment-heading">
          <h2 id="payment-heading" class="sr-only">Payment</h2>

          <div id="payment-errors" role="status" aria-live="polite" />

          <CheckoutPaymentForm
            ref="paymentForm"
            v-model="isSubmitted.payment"
            aria-labelledby="payment-heading"
            aria-describedby="payment-errors"
            novalidate
          />
        </section>
      </div>

      <aside
        role="complementary"
        aria-labelledby="order-summary-heading"
        class="sticky top-30 h-fit w-full md:w-2/3 lg:w-1/3"
      >
        <h2 id="order-summary-heading" class="mb-4 text-2xl font-semibold">
          {{ t("messages.shop.orderSummary") }}
        </h2>
        <CheckoutOrderSummary :on-submit="onSubmit" />
      </aside>
    </div>
  </main>
</template>

<style lang="css" scoped></style>

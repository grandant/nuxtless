<script setup lang="ts">
import type { ActiveOrderDetail } from "#layers/nuxtless/validators/order";
import type { CheckoutState } from "#layers/nuxtless/types";

const router = useRouter();
const { t } = useI18n();
const { countryCodeDefault } = useAppConfig();
const localePath = useLocalePath();
const toast = useToast();

const orderStore = useOrderStore();
const { order } = storeToRefs(orderStore);

const loading = ref(true);

if (!order.value || !("shippingWithTax" in order.value)) {
  await orderStore.fetchOrder("detail");
}

// Safe: We fetch with "detail" above. Order should always be ActiveCustomerDetail.
const activeOrder = computed(() => order.value as ActiveOrderDetail);

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
    countryCode: countryCodeDefault,
    billingSameAsShipping: true,
  },
  shippingForm: {
    shippingMethodId: "",
  },
  paymentForm: {
    code: "",
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

// TODO: Might not be needed
// watch(
//   () => order.value?.totalWithTax,
//   async (newTotal, oldTotal) => {
//     if (newTotal !== oldTotal) {
//       await orderStore.fetchOrder("detail");
//     }
//   },
// );

onMounted(() => {
  loading.value = false;
  useCheckout(); // recalc shipping under certain condtitions
});
</script>

<template>
  <UContainer>
    <BaseLoader v-if="loading" width="sm:w-xs md:w-sm" />

    <UPage v-else>
      <h1 class="sr-only">Checkout</h1>

      <template v-if="(activeOrder?.lines.length ?? 0) < 1">
        <UPageSection :ui="{ container: 'pt-0 lg:pt-0 pb-12' }">
          <CartEmpty />
        </UPageSection>

        <UPageSection
          :title="t('messages.shop.popularProducts')"
          :ui="{ container: 'pt-0 lg:pt-0 pb-12' }"
        >
          <HomeFeaturedProducts />
        </UPageSection>
      </template>

      <div v-else class="my-14 flex w-full flex-col lg:flex-row">
        <!-- Address -->
        <UPageSection
          class="min-w-0 flex-1"
          :ui="{ container: 'pt-0 lg:pt-0 pb-12 lg:pb-12' }"
        >
          <div>
            <h2 class="mb-6 text-2xl font-semibold">
              {{ t("messages.general.shippingDetails") }}
            </h2>

            <div id="address-errors" role="status" aria-live="polite" />
            <CheckoutAddressForm
              ref="addressForm"
              v-model="isSubmitted.address"
              aria-describedby="address-errors"
              novalidate
            />

            <div id="shipping-errors" role="status" aria-live="polite" />
            <CheckoutShippingForm
              ref="shippingForm"
              v-model="isSubmitted.shipping"
              aria-describedby="shipping-errors"
              novalidate
            />

            <div id="payment-errors" role="status" aria-live="polite" />
            <CheckoutPaymentForm
              ref="paymentForm"
              v-model="isSubmitted.payment"
              aria-describedby="payment-errors"
              novalidate
            />
          </div>
        </UPageSection>

        <!-- Order Summary -->
        <aside class="sticky top-30 h-fit lg:w-1/3">
          <h2 class="mb-6 text-2xl font-semibold">
            {{ t("messages.shop.orderSummary") }}
          </h2>
          <CheckoutOrderSummary :on-submit="onSubmit" />
        </aside>
      </div>
    </UPage>
  </UContainer>
</template>

<style lang="css" scoped></style>

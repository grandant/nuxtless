import type { CheckoutState } from "#layers/nuxtless/types";

export function useCheckout() {
  const orderStore = useOrderStore();

  const { error } = storeToRefs(orderStore);
  const { setOrderShippingAddress, setOrderCustomFields } = orderStore;

  const checkoutState = useState<CheckoutState>("checkoutState");

  async function recalcShipping() {
    await setOrderShippingAddress({
      fullName: `${checkoutState.value.addressForm.firstName} ${checkoutState.value.addressForm.lastName}`,
      phoneNumber: checkoutState.value.addressForm.phoneNumber,
      streetLine1: checkoutState.value.addressForm.streetLine1,
      streetLine2: checkoutState.value.addressForm.streetLine2,
      city: checkoutState.value.addressForm.city,
      postalCode: checkoutState.value.addressForm.postalCode,
      countryCode: checkoutState.value.addressForm.countryCode,
    });
  }

  watch(
    () => checkoutState.value.addressForm.postalCode,
    async (n, o) => {
      if (n !== o) await recalcShipping();
    },
  );

  watch(
    () => checkoutState.value.shippingForm.shippingMethodId,
    async (n, o) => {
      if (n !== o) await recalcShipping();
    },
  );

  watch(
    () => checkoutState.value.paymentForm.code,
    async (n, o) => {
      if (n && n !== o) {
        await setOrderCustomFields(n);
        if (error.value) return;

        await recalcShipping();
      }
    },
  );
}

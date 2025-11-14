import type { Reactive } from "vue";

export function syncOrderShippingAddress(
  state: Reactive<{
    countryCode: string;
    postalCode: string;
    streetLine1: string;
    city?: string;
    fullName?: string;
    streetLine2?: string;
  }>,
) {
  const orderStore = useOrderStore();

  return orderStore.setOrderShippingAddress({
    fullName: state.fullName ?? "",
    streetLine1: state.streetLine1,
    streetLine2: state.streetLine2 ?? "",
    city: state.city ?? "",
    postalCode: state.postalCode,
    countryCode: state.countryCode,
  });
}

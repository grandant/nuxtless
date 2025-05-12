// utils/watchShippingMethods.ts
import { watchDebounced } from "@vueuse/core";
import type { Ref } from "vue";

export function watchShippingMethods(state: {
  countryCode: Ref<string>;
  postalCode: Ref<string>;
  streetLine1: Ref<string>;
}) {
  const orderStore = useOrderStore();

  watchDebounced(
    () => [
      state.countryCode.value,
      state.postalCode.value,
      state.streetLine1.value,
    ],
    ([countryCode, postalCode, streetLine1]) => {
      if (countryCode && postalCode && streetLine1) {
        (async () => {
          await orderStore.setOrderShippingAddress({
            streetLine1,
            countryCode,
            postalCode,
            billingSameAsShipping: true,
          });

          await orderStore.getShippingMethods();
          console.log(orderStore.shippingMethods);
          console.log(orderStore.error);
        })();
      }
    },
    { debounce: 1000, maxWait: 5000 },
  );
}

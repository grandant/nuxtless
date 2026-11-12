import { ValiError, parse, flatten } from "valibot";

import {
  GetActiveOrder,
  GetActiveOrderDetail,
  GetShippingMethods,
  GetPaymentMethods,
} from "#layers/nuxtless/gql/queries/order";

import {
  AddItemToOrder,
  RemoveItemFromOrder,
  AdjustOrderLine,
  ApplyCouponCode,
  RemoveCouponCode,
  SetCustomerForOrder,
  SetOrderShippingAddress,
  SetShippingMethod,
  TransitionToState,
  AddPaymentToOrder,
  SetOrderCustomFields,
} from "#layers/nuxtless/gql/mutations/order";

import {
  ActiveOrderBase,
  ActiveOrderDetail,
} from "#layers/nuxtless/validators/order";

import type { ActiveOrder } from "#layers/nuxtless/validators/order";

import type { ShippingMethods, PaymentMethods } from "#layers/nuxtless/types";

export const useOrderStore = defineStore("order", () => {
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Status is not wired up yet
  const status = ref<string | null>(null);
  const order = ref<ActiveOrder | null>(null);
  const shippingMethods = ref<ShippingMethods | null>(null);
  const paymentMethods = ref<PaymentMethods | null>(null);

  // TODO: Add logic for multiple coupon codes
  const couponCode = computed(() => order.value?.couponCodes?.[0] ?? null);

  async function fetchOrder(type: "base" | "detail" = "base") {
    loading.value = true;
    error.value = null;

    try {
      const client = useUrqlClient();

      if (type === "detail") {
        const result = await client
          .query(GetActiveOrderDetail, {}, { requestPolicy: "network-only" })
          .toPromise();

        if (result.error) throw result.error;

        order.value = result.data?.activeOrder
          ? parse(ActiveOrderDetail, result.data.activeOrder)
          : null;
      } else {
        const result = await client
          .query(GetActiveOrder, {}, { requestPolicy: "network-only" })
          .toPromise();

        if (result.error) throw result.error;

        order.value = result.data?.activeOrder
          ? parse(ActiveOrderBase, result.data.activeOrder)
          : null;
      }
    } catch (err) {
      if (err instanceof ValiError) {
        console.error("Validation errors:", flatten(err.issues));
      }

      if (err instanceof Error) {
        error.value = err.message || "Failed to fetch order";
      }
    } finally {
      loading.value = false;
    }
  }

  async function getShippingMethods() {
    loading.value = true;
    error.value = null;

    try {
      const client = useUrqlClient();

      const { data, error: queryError } = await client
        .query(GetShippingMethods, {}, { requestPolicy: "network-only" })
        .toPromise();

      if (queryError) throw queryError;

      shippingMethods.value = data?.eligibleShippingMethods ?? [];
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message || "Failed to fetch shipping methods";
      }
    } finally {
      loading.value = false;
    }
  }

  async function getPaymentMethods() {
    loading.value = true;
    error.value = null;

    try {
      const client = useUrqlClient();

      const { data, error: queryError } = await client
        .query(GetPaymentMethods, {}, { requestPolicy: "network-only" })
        .toPromise();

      if (queryError) throw queryError;

      paymentMethods.value = data?.eligiblePaymentMethods ?? [];
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message || "Failed to fetch payment methods";
      }
    } finally {
      loading.value = false;
    }
  }

  async function addItemToOrder(variantId: string, quantity: number) {
    // TODO: Handle 'partial' status (e.g. show toast if quantity was adjusted)
    loading.value = true;
    error.value = null;

    try {
      const client = useUrqlClient();

      const { data, error: mutationError } = await client
        .mutation(AddItemToOrder, { variantId, quantity })
        .toPromise();

      if (mutationError) throw mutationError;

      const result = data?.addItemToOrder;

      if (result) {
        const res = useOrderMutation(order, result, ActiveOrderBase);

        if (res.status === "error") {
          error.value = res.message;
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message || "Failed to add item to order";
      }
    } finally {
      loading.value = false;
    }
  }

  async function removeItemFromOrder(orderLineId: string) {
    loading.value = true;
    error.value = null;

    try {
      const client = useUrqlClient();

      const { data, error: mutationError } = await client
        .mutation(RemoveItemFromOrder, { orderLineId })
        .toPromise();

      if (mutationError) throw mutationError;

      const result = data?.removeOrderLine;

      if (result) {
        const res = useOrderMutation(order, result, ActiveOrderBase);
        if (res.status === "error") {
          error.value = res.message;
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message || "Failed to remove item from order";
      }
    } finally {
      loading.value = false;
    }
  }

  async function adjustOrderLine(orderLineId: string, quantity: number) {
    loading.value = true;
    error.value = null;

    try {
      const client = useUrqlClient();

      const { data, error: mutationError } = await client
        .mutation(AdjustOrderLine, { orderLineId, quantity })
        .toPromise();

      if (mutationError) throw mutationError;

      const result = data?.adjustOrderLine;

      if (result) {
        const res = useOrderMutation(order, result, ActiveOrderBase);
        if (res.status === "error") {
          error.value = res.message;
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message || "Failed to adjust order line";
      }
    } finally {
      loading.value = false;
    }
  }

  async function applyCouponCode(couponCode: string) {
    loading.value = true;
    error.value = null;

    try {
      const client = useUrqlClient();

      const { data, error: mutationError } = await client
        .mutation(ApplyCouponCode, { couponCode })
        .toPromise();

      if (mutationError) throw mutationError;

      const result = data?.applyCouponCode;

      if (result) {
        const res = useOrderMutation(order, result, ActiveOrderBase);
        if (res.status === "error") {
          error.value = res.message;
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message || "Failed to apply coupon code";
      }
    } finally {
      loading.value = false;
    }
  }

  async function removeCouponCode() {
    loading.value = true;
    error.value = null;

    try {
      if (couponCode.value) {
        const client = useUrqlClient();

        const { data, error: mutationError } = await client
          .mutation(RemoveCouponCode, { couponCode: couponCode.value })
          .toPromise();

        if (mutationError) throw mutationError;

        const result = data?.removeCouponCode;

        if (result) {
          const res = useOrderMutation(order, result, ActiveOrderBase);
          if (res.status === "error") {
            error.value = res.message;
          }
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message || "Failed to remove coupon code";
      }
    } finally {
      loading.value = false;
    }
  }

  async function setCustomerForOrder(input: {
    emailAddress: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
  }) {
    loading.value = true;
    error.value = null;

    try {
      const client = useUrqlClient();

      const { data, error: mutationError } = await client
        .mutation(SetCustomerForOrder, { input })
        .toPromise();

      if (mutationError) throw mutationError;

      const result = data?.setCustomerForOrder;

      if (result) {
        const res = useOrderMutation(order, result, ActiveOrderDetail);

        if (res.status === "error") {
          error.value = res.message;
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message || "Failed to set customer for order";
      }
    } finally {
      loading.value = false;
    }
  }

  async function setOrderShippingAddress(input: {
    fullName?: string;
    streetLine1: string;
    streetLine2?: string;
    city?: string;
    postalCode?: string;
    countryCode: string;
  }) {
    loading.value = true;
    error.value = null;

    try {
      const client = useUrqlClient();

      const { data, error: mutationError } = await client
        .mutation(SetOrderShippingAddress, { input })
        .toPromise();

      if (mutationError) throw mutationError;

      const result = data?.setOrderShippingAddress;

      if (result) {
        const res = useOrderMutation(order, result, ActiveOrderDetail);

        if (res.status === "error") {
          error.value = res.message;
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message || "Failed to set shipping address";
      }
    } finally {
      loading.value = false;
    }
  }

  async function setShippingMethod(shippingMethodId: string) {
    loading.value = true;
    error.value = null;

    try {
      const client = useUrqlClient();

      const { data, error: mutationError } = await client
        .mutation(SetShippingMethod, { id: [shippingMethodId] })
        .toPromise();

      if (mutationError) throw mutationError;

      const result = data?.setOrderShippingMethod;

      if (result) {
        const res = useOrderMutation(order, result, ActiveOrderDetail);

        if (res.status === "error") {
          error.value = res.message;
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message || "Failed to set shipping method";
      }
    } finally {
      loading.value = false;
    }
  }

  async function transitionToState(state: string) {
    loading.value = true;
    error.value = null;

    try {
      const client = useUrqlClient();

      const { data, error: mutationError } = await client
        .mutation(TransitionToState, { state })
        .toPromise();

      if (mutationError) throw mutationError;

      const result = data?.transitionOrderToState;

      if (result) {
        const res = useOrderMutation(order, result, ActiveOrderDetail);

        if (res.status === "error") {
          error.value = res.message;
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message || "Failed to transition order state";
      }
    } finally {
      loading.value = false;
    }
  }

  async function addPaymentToOrder(input: {
    method: string;
    metadata: {
      shouldDecline?: boolean;
      shouldError?: boolean;
      shouldErrorOnSettle?: boolean;
    };
  }) {
    loading.value = true;
    error.value = null;

    try {
      const client = useUrqlClient();

      const { data, error: mutationError } = await client
        .mutation(AddPaymentToOrder, { input })
        .toPromise();

      if (mutationError) throw mutationError;

      const result = data?.addPaymentToOrder;

      if (result) {
        const res = useOrderMutation(order, result, ActiveOrderDetail);

        if (res.status === "error") {
          error.value = res.message;
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message || "Failed to add payment";
      }
    } finally {
      loading.value = false;
    }
  }

  async function setOrderCustomFields(paymentProvider: string): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      const client = useUrqlClient();

      const { error: mutationError } = await client
        .mutation(SetOrderCustomFields, {
          input: { customFields: { paymentProvider } },
        })
        .toPromise();

      if (mutationError) throw mutationError;
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message || "Failed to update order custom fields";
      }
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    error,

    status,
    order,
    shippingMethods,
    paymentMethods,

    fetchOrder,
    getShippingMethods,
    getPaymentMethods,

    addItemToOrder,
    removeItemFromOrder,
    adjustOrderLine,
    applyCouponCode,
    removeCouponCode,

    setCustomerForOrder,
    setOrderShippingAddress,
    setShippingMethod,
    transitionToState,
    addPaymentToOrder,
    setOrderCustomFields,
  };
});

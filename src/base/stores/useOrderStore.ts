import type {
  ActiveOrder,
  ShippingMethods,
  PaymentMethods,
} from "~~/src/types/order";

export const useOrderStore = defineStore("order", () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  // Status is not wired up yet
  const status = ref<string | null>(null);

  const order = ref<ActiveOrder>(null);
  // TODO: Add logic for multiple coupon codes
  const couponCode = computed(() => order.value?.couponCodes?.[0] ?? null);
  const shippingMethods = ref<ShippingMethods | null>(null);
  const paymentMethods = ref<PaymentMethods | null>(null);

  async function fetchOrder(type: "base" | "detail" = "base"): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      const { activeOrder } = await (type === "detail"
        ? GqlGetActiveOrderDetail()
        : GqlGetActiveOrder());

      order.value = activeOrder ?? null;
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message || "Failed to fetch order";
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
      const { addItemToOrder: result } = await GqlAddItemToOrder({
        variantId,
        quantity,
      });

      if (result) {
        const res = useOrderMutation(order, result);
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

  async function removeItemFromOrder(orderLineId: string): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      const { removeOrderLine: result } = await GqlRemoveItemFromOrder({
        orderLineId,
      });

      if (result) {
        const res = useOrderMutation(order, result);
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

  async function adjustOrderLine(
    orderLineId: string,
    quantity: number,
  ): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      const { adjustOrderLine: result } = await GqlAdjustOrderLine({
        orderLineId,
        quantity,
      });

      if (result) {
        const res = useOrderMutation(order, result);
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

  async function applyCouponCode(couponCode: string): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      const { applyCouponCode: result } = await GqlApplyCouponCode({
        couponCode,
      });

      if (result) {
        const res = useOrderMutation(order, result);
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

  async function removeCouponCode(): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      if (couponCode.value) {
        const { removeCouponCode: result } = await GqlRemoveCouponCode({
          couponCode: couponCode.value,
        });

        if (result) {
          const res = useOrderMutation(order, result);
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
  }): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      const result = (await GqlSetCustomerForOrder({ input }))
        .setCustomerForOrder;
      const res = useOrderMutation(order, result);

      if (res.status === "error") {
        error.value = res.message;
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
  }): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      const result = (await GqlSetOrderShippingAddress({ input }))
        .setOrderShippingAddress;
      const res = useOrderMutation(order, result);

      if (res.status === "error") {
        error.value = res.message;
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message || "Failed to set shipping address";
      }
    } finally {
      loading.value = false;
    }
  }

  async function getShippingMethods(): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      const { eligibleShippingMethods: result } = await GqlGetShippingMethods();
      shippingMethods.value = result ?? [];
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message || "Failed to fetch shipping methods";
      }
    } finally {
      loading.value = false;
    }
  }

  async function setShippingMethod(shippingMethodId: string): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      const { setOrderShippingMethod: result } = await GqlSetShippingMethod({
        id: shippingMethodId,
      });

      const res = useOrderMutation(order, result);
      if (res.status === "error") {
        error.value = res.message;
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message || "Failed to set shipping method";
      }
    } finally {
      loading.value = false;
    }
  }

  async function getPaymentMethods(): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      const { eligiblePaymentMethods: result } = await GqlGetPaymentMethods();
      paymentMethods.value = result ?? [];
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message || "Failed to fetch payment methods";
      }
    } finally {
      loading.value = false;
    }
  }

  async function transitionToState(state: string): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      const { transitionOrderToState: result } = await GqlTransitionToState({
        state,
      });
      const res = useOrderMutation(order, result);
      if (res.status === "error") {
        error.value = res.message;
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
  }): Promise<void> {
    loading.value = true;
    error.value = null;

    try {
      const { addPaymentToOrder: result } = await GqlAddPaymentToOrder({
        input,
      });
      const res = useOrderMutation(order, result);
      if (res.status === "error") {
        error.value = res.message;
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message || "Failed to add payment";
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
    addItemToOrder,
    removeItemFromOrder,
    adjustOrderLine,
    applyCouponCode,
    removeCouponCode,
    setCustomerForOrder,
    setOrderShippingAddress,
    getShippingMethods,
    setShippingMethod,
    getPaymentMethods,
    transitionToState,
    addPaymentToOrder,
  };
});

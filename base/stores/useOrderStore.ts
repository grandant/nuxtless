import type { ActiveOrder } from "~~/types/order";

export const useOrderStore = defineStore("order", () => {
  const order = ref<ActiveOrder>(null);
  // TODO: Add logic for multiple coupon codes
  const couponCode = computed(() => order.value?.couponCodes?.[0] ?? null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchOrder(type: "base" | "detail" = "detail") {
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

  async function removeItemFromOrder(orderLineId: string) {
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

  async function adjustOrderLine(orderLineId: string, quantity: number) {
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

  async function applyCouponCode(couponCode: string) {
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

  async function removeCouponCode() {
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

  return {
    order,
    loading,
    error,
    fetchOrder,
    addItemToOrder,
    removeItemFromOrder,
    adjustOrderLine,
    applyCouponCode,
    removeCouponCode,
  };
});

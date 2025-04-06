import type { ActiveOrder } from "~~/types/order";

export const useOrderStore = defineStore("order", () => {
  const order = ref<ActiveOrder>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchOrder(type: "base" | "detail" = "detail") {
    loading.value = true;
    error.value = null;

    try {
      const query = type === "detail" ? "GetOrderDetail" : "GetOrder";
      const { data } = await useAsyncGql(query);
      order.value = data.value?.activeOrder ?? null;
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
      const { data } = await useAsyncGql("RemoveItemFromOrder", {
        orderLineId,
      });

      const result = data.value?.removeOrderLine;
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
      const { data } = await useAsyncGql("AdjustOrderLine", {
        orderLineId,
        quantity,
      });

      const result = data.value?.adjustOrderLine;
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
      const { data } = await useAsyncGql("ApplyCouponCode", {
        couponCode,
      });

      const result = data.value?.applyCouponCode;
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
      const { data } = await useAsyncGql("RemoveCouponCode");

      const result = data.value?.removeCouponCode;
      if (result) {
        const res = useOrderMutation(order, result);
        if (res.status === "error") {
          error.value = res.message;
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

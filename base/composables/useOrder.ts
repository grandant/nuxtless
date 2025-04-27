import type {
  ActiveOrder,
  OrderMutationResult,
  OrderStatus,
} from "~~/types/order";

export function useOrderMutation(
  order: Ref<ActiveOrder>,
  result: OrderMutationResult,
): OrderStatus {
  switch (result?.__typename) {
    case "Order":
      order.value = result;
      return { status: "success" };

    case "InsufficientStockError":
      if ("order" in result && "quantityAvailable" in result) {
        order.value = result.order;
        return {
          status: "partial",
          quantityAvailable: result.quantityAvailable,
        };
      }
      return {
        status: "error",
        message: "Incomplete InsufficientStockError response",
      };

    case "CouponCodeInvalidError":
    case "CouponCodeExpiredError":
    case "CouponCodeLimitError":
    case "OrderInterceptorError":
    case "OrderLimitError":
    case "OrderModificationError":
    case "NegativeQuantityError":
      return {
        status: "error",
        message: result.message ?? "Unexpected Vendure error",
      };

    default:
      console.warn("[OrderMutation] Unknown mutation result:", result);
      return {
        status: "error",
        message: "Unknown response from server",
      };
  }
}

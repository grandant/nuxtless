import type {
  ActiveOrder,
  OrderMutationResult,
  OrderStatus,
} from "~~/src/types/order";

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
        message: result.message ?? "Unexpected InsufficientStockError format",
      };

    case "OrderModificationError":
    case "OrderLimitError":
    case "NegativeQuantityError":
    case "OrderInterceptorError":
    case "CouponCodeExpiredError":
    case "CouponCodeInvalidError":
    case "CouponCodeLimitError":
    case "AlreadyLoggedInError":
    case "EmailAddressConflictError":
    case "GuestCheckoutError":
    case "IneligibleShippingMethodError":
    case "NoActiveOrderError":
    case "OrderStateTransitionError":
    case "OrderPaymentStateError":
    case "IneligiblePaymentMethodError":
    case "PaymentFailedError":
    case "PaymentDeclinedError":
      return {
        status: "error",
        message: result.message ?? "Order mutation failed",
      };

    default:
      console.warn("[OrderMutation] Unknown mutation result:", result);
      return {
        status: "error",
        message: "Unknown response from server",
      };
  }
}

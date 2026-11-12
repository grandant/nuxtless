import { parse } from "valibot";

import { ActiveOrderBase } from "#layers/nuxtless/validators/order";

import type { OrderMutationResult, OrderStatus } from "#layers/nuxtless/types";
import type {
  ActiveOrder,
  ActiveOrderDetail,
} from "#layers/nuxtless/validators/order";

export function useOrderMutation(
  order: Ref<ActiveOrder | null>,
  result: OrderMutationResult,
  schema: typeof ActiveOrderBase | typeof ActiveOrderDetail = ActiveOrderBase,
): OrderStatus {
  switch (result?.__typename) {
    case "Order":
      order.value = parse(schema, result);
      return { status: "success" };

    case "InsufficientStockError":
      if ("order" in result && result.order && "quantityAvailable" in result) {
        order.value = parse(schema, result.order);
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

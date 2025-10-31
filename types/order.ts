// /types/order.ts

import type {
  GetActiveOrderQuery,
  GetActiveOrderDetailQuery,
  AddItemToOrderMutation,
  RemoveItemFromOrderMutation,
  AdjustOrderLineMutation,
  ApplyCouponCodeMutation,
  RemoveCouponCodeMutation,
  SetCustomerForOrderMutation,
  SetOrderShippingAddressMutation,
  GetShippingMethodsQuery,
  SetShippingMethodMutation,
  GetPaymentMethodsQuery,
  TransitionToStateMutation,
  AddPaymentToOrderMutation,
} from "~~/.nuxt/gql/default";

// ─────────────────────────────────────────────────────────────
// Core Order Types
// ─────────────────────────────────────────────────────────────

export type ActiveOrderBase = GetActiveOrderQuery["activeOrder"];

export type ActiveOrderDetail = GetActiveOrderDetailQuery["activeOrder"];

export type ActiveOrder = ActiveOrderBase | ActiveOrderDetail;

export type OrderLine = NonNullable<ActiveOrder>["lines"][number];

// ─────────────────────────────────────────────────────────────
// Status
// ─────────────────────────────────────────────────────────────

export type OrderStatus =
  | { status: "success" }
  | { status: "partial"; quantityAvailable: number }
  | { status: "error"; message: string };

// ─────────────────────────────────────────────────────────────
// Mutations & Queries
// ─────────────────────────────────────────────────────────────

export type AddItemResult = AddItemToOrderMutation["addItemToOrder"];

export type RemoveItemResult = RemoveItemFromOrderMutation["removeOrderLine"];

export type AdjustItemResult = AdjustOrderLineMutation["adjustOrderLine"];

export type ApplyCouponResult = ApplyCouponCodeMutation["applyCouponCode"];

export type RemoveCouponCodeResult =
  RemoveCouponCodeMutation["removeCouponCode"];

export type SetCustomerForOrderResult =
  SetCustomerForOrderMutation["setCustomerForOrder"];

export type SetOrderShippingAddressResult =
  SetOrderShippingAddressMutation["setOrderShippingAddress"];

export type ShippingMethods =
  GetShippingMethodsQuery["eligibleShippingMethods"];

export type SetShippingMethodResult =
  SetShippingMethodMutation["setOrderShippingMethod"];

export type PaymentMethods = GetPaymentMethodsQuery["eligiblePaymentMethods"];

export type TransitionToStateResult =
  TransitionToStateMutation["transitionOrderToState"];

export type AddPaymentToOrderResult =
  AddPaymentToOrderMutation["addPaymentToOrder"];

// ─────────────────────────────────────────────────────────────
// Aggregate
// ─────────────────────────────────────────────────────────────

export type OrderMutationResult =
  | AddItemResult
  | RemoveItemResult
  | AdjustItemResult
  | ApplyCouponResult
  | RemoveCouponCodeResult
  | SetCustomerForOrderResult
  | SetOrderShippingAddressResult
  | SetShippingMethodResult
  | TransitionToStateResult
  | AddPaymentToOrderResult;

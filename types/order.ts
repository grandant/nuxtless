type ActiveOrderBase = Awaited<
  ReturnType<typeof GqlGetActiveOrder>
>["activeOrder"];

export type ActiveOrderDetail = Awaited<
  ReturnType<typeof GqlGetActiveOrderDetail>
>["activeOrder"];

export type ActiveOrder = ActiveOrderBase | ActiveOrderDetail;
export type OrderLine = NonNullable<ActiveOrder>["lines"][number];

export type OrderStatus =
  | { status: "success" }
  | { status: "partial"; quantityAvailable: number }
  | { status: "error"; message: string };

export type AddItemResult = Awaited<
  ReturnType<typeof GqlAddItemToOrder>
>["addItemToOrder"];

export type RemoveItemResult = Awaited<
  ReturnType<typeof GqlRemoveItemFromOrder>
>["removeOrderLine"];

export type AdjustItemResult = Awaited<
  ReturnType<typeof GqlAdjustOrderLine>
>["adjustOrderLine"];

export type ApplyCouponResult = Awaited<
  ReturnType<typeof GqlApplyCouponCode>
>["applyCouponCode"];

export type RemoveCouponCodeResult = Awaited<
  ReturnType<typeof GqlRemoveCouponCode>
>["removeCouponCode"];

export type SetCustomerForOrderResult = Awaited<
  ReturnType<typeof GqlSetCustomerForOrder>
>["setCustomerForOrder"];

export type SetOrderShippingAddressResult = Awaited<
  ReturnType<typeof GqlSetOrderShippingAddress>
>["setOrderShippingAddress"];

export type ShippingMethods = Awaited<
  ReturnType<typeof GqlGetShippingMethods>
>["eligibleShippingMethods"];

export type SetShippingMethodResult = Awaited<
  ReturnType<typeof GqlSetShippingMethod>
>["setOrderShippingMethod"];

export type PaymentMethods = Awaited<
  ReturnType<typeof GqlGetPaymentMethods>
>["eligiblePaymentMethods"];

export type TransitionToStateResult = Awaited<
  ReturnType<typeof GqlTransitionToState>
>["transitionOrderToState"];

export type AddPaymentToOrderResult = Awaited<
  ReturnType<typeof GqlAddPaymentToOrder>
>["addPaymentToOrder"];

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

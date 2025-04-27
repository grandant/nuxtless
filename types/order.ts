type ActiveOrderBase = Awaited<
  ReturnType<typeof GqlGetActiveOrder>
>["activeOrder"];

type ActiveOrderDetail = Awaited<
  ReturnType<typeof GqlGetActiveOrderDetail>
>["activeOrder"];

export type ActiveOrder = ActiveOrderBase | ActiveOrderDetail;
export type OrderLine = NonNullable<ActiveOrder>["lines"][number];

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

export type RemoveCouponCode = Awaited<
  ReturnType<typeof GqlRemoveCouponCode>
>["removeCouponCode"];

export type OrderStatus =
  | { status: "success" }
  | { status: "partial"; quantityAvailable: number }
  | { status: "error"; message: string };

export type OrderMutationResult =
  | AddItemResult
  | RemoveItemResult
  | AdjustItemResult
  | ApplyCouponResult
  | RemoveCouponCode;

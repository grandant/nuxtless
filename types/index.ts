import type { ResultOf } from "gql.tada";

import type { CollectionMenuFragment } from "#layers/nuxtless/gql/fragments/collection";

import type {
  GetCollection,
  GetMenuCollections,
} from "#layers/nuxtless/gql/queries/collection";

import type {
  RegisterCustomerAccount,
  VerifyCustomerAccount,
  RequestPasswordReset,
  ResetPassword,
} from "#layers/nuxtless/gql/mutations/customer";

import type {
  GetShippingMethods,
  GetPaymentMethods,
} from "#layers/nuxtless/gql/queries/order";

import type { ActiveOrder } from "#layers/nuxtless/validators/order";

import type { SearchProducts } from "#layers/nuxtless/gql/queries/product";

import type {
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
} from "#layers/nuxtless/gql/mutations/order";

import type { AddressForm } from "#layers/nuxtless/validators/addressForm";
import type { ShippingForm } from "#layers/nuxtless/validators/shippingForm";
import type { PaymentForm } from "#layers/nuxtless/validators/paymentForm";

// Collection
export type Collection = ResultOf<typeof GetCollection>["collection"];

export type MenuCollections = ResultOf<typeof GetMenuCollections>;

export type TopLevelCollection = ResultOf<typeof CollectionMenuFragment>;

export type ChildCollection = NonNullable<
  TopLevelCollection["children"]
>[number];

// Customer
export type RegisterResult = ResultOf<
  typeof RegisterCustomerAccount
>["registerCustomerAccount"];

export type VerifyResult = ResultOf<
  typeof VerifyCustomerAccount
>["verifyCustomerAccount"];

export type RequestPasswordResetResult = ResultOf<
  typeof RequestPasswordReset
>["requestPasswordReset"];

export type ResetPasswordResult = ResultOf<
  typeof ResetPassword
>["resetPassword"];

// Order
export type OrderLine = ActiveOrder["lines"][number];

export type OrderStatus =
  | { status: "success" }
  | { status: "partial"; quantityAvailable: number }
  | { status: "error"; message: string };

export type ShippingMethods = ResultOf<
  typeof GetShippingMethods
>["eligibleShippingMethods"];

export type PaymentMethods = ResultOf<
  typeof GetPaymentMethods
>["eligiblePaymentMethods"];

export type AddItemResult = ResultOf<typeof AddItemToOrder>["addItemToOrder"];

export type RemoveItemResult = ResultOf<
  typeof RemoveItemFromOrder
>["removeOrderLine"];

export type AdjustItemResult = ResultOf<
  typeof AdjustOrderLine
>["adjustOrderLine"];

export type ApplyCouponResult = ResultOf<
  typeof ApplyCouponCode
>["applyCouponCode"];

export type RemoveCouponCodeResult = ResultOf<
  typeof RemoveCouponCode
>["removeCouponCode"];

export type SetCustomerForOrderResult = ResultOf<
  typeof SetCustomerForOrder
>["setCustomerForOrder"];

export type SetOrderShippingAddressResult = ResultOf<
  typeof SetOrderShippingAddress
>["setOrderShippingAddress"];

export type SetShippingMethodResult = ResultOf<
  typeof SetShippingMethod
>["setOrderShippingMethod"];

export type TransitionToStateResult = ResultOf<
  typeof TransitionToState
>["transitionOrderToState"];

export type AddPaymentToOrderResult = ResultOf<
  typeof AddPaymentToOrder
>["addPaymentToOrder"];

export type OrderMutationResult = NonNullable<
  | AddItemResult
  | RemoveItemResult
  | AdjustItemResult
  | ApplyCouponResult
  | RemoveCouponCodeResult
  | SetCustomerForOrderResult
  | SetOrderShippingAddressResult
  | SetShippingMethodResult
  | TransitionToStateResult
  | AddPaymentToOrderResult
>;

// Product
export type SearchResult = ResultOf<typeof SearchProducts>["search"]["items"];

// General
export interface CheckoutState {
  addressForm: AddressForm;
  shippingForm: ShippingForm;
  paymentForm: PaymentForm;
}

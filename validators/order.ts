import {
  array,
  nullable,
  object,
  string,
  number,
  type InferOutput,
} from "valibot";

const OrderLine = object({
  id: string(),
  unitPriceWithTax: number(),
  quantity: number(),
  linePriceWithTax: number(),
  productVariant: object({
    id: string(),
    name: string(),
    sku: string(),
  }),
  featuredAsset: nullable(
    object({
      id: string(),
      preview: string(),
    }),
  ),
});

const OrderAddress = object({
  fullName: nullable(string()),
  streetLine1: nullable(string()),
  streetLine2: nullable(string()),
  city: nullable(string()),
  postalCode: nullable(string()),
  country: nullable(string()),
});

export const ActiveOrderBase = object({
  id: string(),
  code: string(),
  couponCodes: array(string()),
  state: string(),
  totalQuantity: number(),
  totalWithTax: number(),
  currencyCode: string(),
  lines: array(OrderLine),
});

export const ActiveOrderDetail = object({
  ...ActiveOrderBase.entries,
  subTotal: number(),
  shippingWithTax: number(),
  orderPlacedAt: nullable(string()),
  customer: nullable(
    object({
      id: string(),
      firstName: string(),
      lastName: string(),
      emailAddress: string(),
    }),
  ),
  shippingAddress: OrderAddress,
  billingAddress: OrderAddress,
  discounts: array(
    object({
      description: string(),
      amountWithTax: number(),
    }),
  ),
  payments: array(
    object({
      method: string(),
    }),
  ),
  shippingLines: array(
    object({
      shippingMethod: object({
        name: string(),
      }),
    }),
  ),
  taxSummary: array(
    object({
      description: string(),
      taxTotal: number(),
    }),
  ),
});

export type ActiveOrderBase = InferOutput<typeof ActiveOrderBase>;
export type ActiveOrderDetail = InferOutput<typeof ActiveOrderDetail>;
export type ActiveOrder = ActiveOrderBase | ActiveOrderDetail;

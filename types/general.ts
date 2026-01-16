import type { AddressForm } from "~~/layers/base/validators/addressForm";
import type { ShippingForm } from "~~/layers/base/validators/shippingForm";
import type { PaymentForm } from "~~/layers/base/validators/paymentForm";

export interface CheckoutState {
  addressForm: AddressForm;
  shippingForm: ShippingForm;
  paymentForm: PaymentForm;
}

export interface OrderLineRow {
  name: string;
  qty: number;
  unitPrice: string;
  lineTotal: string;
}

export interface OrderTableRow {
  id: number;
  date: string;
  status: string;
  amount: string;
  currency: string;
  code: string;
}

export type ShopFeature = {
  icon: string;
  title: string;
  description: string;
};

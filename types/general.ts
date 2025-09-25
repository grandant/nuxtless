import type { AddressForm } from "~~/base/validators/addressForm";
import type { ShippingForm } from "~~/base/validators/shippingForm";
import type { PaymentForm } from "~~/base/validators/paymentForm";

export interface CheckoutState {
  addressForm: AddressForm;
  shippingForm: ShippingForm;
  paymentForm: PaymentForm;
}

export type ShopFeature = {
  icon: string;
  title: string;
  description: string;
};

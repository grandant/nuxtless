import { object, pipe, string, email, optional, boolean } from "valibot";
import type { InferOutput } from "valibot";

export const CheckoutForm = object({
  firstName: string(),
  lastName: string(),
  emailAddress: pipe(string(), email("Invalid email")),
  streetLine1: string(),
  streetLine2: optional(string()),
  city: string(),
  postalCode: string(),
  countryCode: string(),
  billingSameAsShipping: boolean(),
});

export type CheckoutForm = InferOutput<typeof CheckoutForm>;

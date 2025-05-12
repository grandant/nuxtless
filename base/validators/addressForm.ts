import {
  object,
  pipe,
  string,
  email,
  boolean,
  optional,
  nonEmpty,
} from "valibot";
import type { InferOutput } from "valibot";

export const AddressForm = object({
  firstName: pipe(string(), nonEmpty("First name is required")),
  lastName: pipe(string(), nonEmpty("Last name is required")),
  emailAddress: pipe(string(), email("Invalid email")),
  streetLine1: pipe(string(), nonEmpty("Street is required")),
  streetLine2: optional(string()),
  city: pipe(string(), nonEmpty("City is required")),
  postalCode: pipe(string(), nonEmpty("Postal code is required")),
  countryCode: pipe(string(), nonEmpty("Country is required")),
  billingSameAsShipping: boolean(),
});

export type AddressForm = InferOutput<typeof AddressForm>;

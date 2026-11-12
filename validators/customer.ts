import {
  type InferOutput,
  array,
  nullable,
  object,
  optional,
  string,
} from "valibot";

export const ActiveCustomerBase = object({
  id: string(),
  title: optional(nullable(string())),
  firstName: string(),
  lastName: string(),
  emailAddress: string(),
});

export const ActiveCustomerDetail = object({
  ...ActiveCustomerBase.entries,
  phoneNumber: nullable(string()),
  addresses: nullable(
    array(
      object({
        id: string(),
        fullName: nullable(string()),
        streetLine1: string(),
        city: nullable(string()),
        postalCode: nullable(string()),
        country: object({
          code: string(),
          name: string(),
        }),
      }),
    ),
  ),
  user: nullable(
    object({
      id: string(),
      identifier: string(),
    }),
  ),
});

export type ActiveCustomerBase = InferOutput<typeof ActiveCustomerBase>;
export type ActiveCustomerDetail = InferOutput<typeof ActiveCustomerDetail>;

export type ActiveCustomer = ActiveCustomerBase | ActiveCustomerDetail;

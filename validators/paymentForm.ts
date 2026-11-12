import { object, pipe, string, nonEmpty } from "valibot";
import type { InferOutput } from "valibot";

export const PaymentForm = object({
  code: pipe(string(), nonEmpty("Please select a payment method")),
});

export type PaymentForm = InferOutput<typeof PaymentForm>;

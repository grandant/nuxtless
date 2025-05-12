import { object, pipe, string, nonEmpty } from "valibot";
import type { InferOutput } from "valibot";

export const ShippingForm = object({
  shippingMethodId: pipe(string(), nonEmpty("Please select a shipping method")),
});

export type ShippingForm = InferOutput<typeof ShippingForm>;

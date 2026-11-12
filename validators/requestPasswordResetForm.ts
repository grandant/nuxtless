import { object, pipe, string, email } from "valibot";
import type { InferOutput } from "valibot";

export const RequestPasswordResetForm = object({
  emailAddress: pipe(string(), email("Invalid email")),
});

export type RequestPasswordResetForm = InferOutput<
  typeof RequestPasswordResetForm
>;

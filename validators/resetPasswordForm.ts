import {
  object,
  string,
  minLength,
  pipe,
  forward,
  partialCheck,
} from "valibot";
import type { InferOutput } from "valibot";

export const ResetPasswordForm = pipe(
  object({
    password: pipe(
      string(),
      minLength(8, "Password must be at least 8 characters long"),
    ),
    confirmPassword: string(),
  }),
  forward(
    partialCheck(
      [["password"], ["confirmPassword"]],
      (input) => input.password === input.confirmPassword,
      "The two passwords do not match.",
    ),
    ["confirmPassword"],
  ),
);

export type ResetPasswordForm = InferOutput<typeof ResetPasswordForm>;

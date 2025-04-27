import {
  object,
  string,
  email,
  minLength,
  pipe,
  forward,
  partialCheck,
} from "valibot";
import type { InferOutput } from "valibot";

export const RegisterForm = pipe(
  object({
    firstName: string(),
    lastName: string(),
    emailAddress: pipe(string(), email("Invalid email")),
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

export type RegisterForm = InferOutput<typeof RegisterForm>;

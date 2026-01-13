import {
  object,
  string,
  email,
  minLength,
  pipe,
  forward,
  partialCheck,
  nonEmpty, optional
} from "valibot";
import type { InferOutput } from "valibot";

export const RegisterForm = pipe(
  object({
    firstName: pipe(string(), nonEmpty("Please enter at least one character")),
    lastName: pipe(string(), nonEmpty("Please enter at least one character")),
    email: pipe(string(), email("Invalid email")),
    phoneNumber: pipe(
      string(),
      minLength(11, "Invalid phoneNumber"),
    ),
    password: pipe(
      string(),
      minLength(8, "Password must be at least 8 characters long"),
    ),
    confirmPassword: string(),

    socialList: object({
      VK: optional(string()),
      MAX: optional(string()),
      TG: optional(string()),
      WT: optional(string()),
      OK: optional(string()),
      OTHER: optional(string()),
    }),
    city: pipe(string(), nonEmpty("City is required")),
    countryCode: pipe(string(), nonEmpty("Country is required")),

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

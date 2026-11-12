import { object, pipe, string, email, minLength } from "valibot";
import type { InferOutput } from "valibot";

export const LoginForm = object({
  email: pipe(string(), email("Invalid email")),
  password: pipe(string(), minLength(8, "Must be at least 8 characters")),
});

export type LoginForm = InferOutput<typeof LoginForm>;

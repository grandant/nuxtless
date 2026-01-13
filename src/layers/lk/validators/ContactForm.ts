import {
  object,
  pipe,
  string,
  optional,
  nonEmpty, minLength
} from "valibot";
import type { InferOutput } from "valibot";

export const ContactForm = object({
  socialList: object({
    VK: optional(string()),
    MAX: optional(string()),
    TG: optional(string()),
    WT: optional(string()),
    OK: optional(string()),
    OTHER: optional(string()),
  }),
  phoneNumber: pipe(
    string(),
    minLength(11, "Invalid phoneNumber"),
  ),
  city: pipe(string(), nonEmpty("City is required")),
  countryCode: pipe(string(), nonEmpty("Country is required")),
});

export type ContactForm = InferOutput<typeof ContactForm>;

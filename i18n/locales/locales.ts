import type { LocaleObject } from "@nuxtjs/i18n";

export const availableLocales = [
  {
    code: "en",
    language: "en-US",
    file: "en-US.ts",
    name: "English 🇺🇸",
  },
  {
    code: "bg",
    language: "bg-BG",
    file: "bg-BG.ts",
    name: "Български 🇧🇬",
  },
  {
    code: "ru",
    language: "ru-RU",
    file: "ru-RU.ts",
    name: "Русский 🇷🇺",
  },
  {
    code: "fa",
    language: "fa-IR",
    file: "fa-IR.ts",
    name: "فارسی 🇮🇷",
    dir: "rtl",
  },
  {
    code: "de",
    language: "de-DE",
    file: "de-DE.ts",
    name: "Deutsch 🇩🇪",
  },
  {
    code: "es",
    language: "es-ES",
    file: "es-ES.ts",
    name: "Español 🇪🇸",
  },
  {
    code: "fr",
    language: "fr-FR",
    file: "fr-FR.ts",
    name: "Français 🇫🇷",
  },
  {
    code: "it",
    language: "it-IT",
    file: "it-IT.ts",
    name: "Italiano 🇮🇹",
  },
  {
    code: "pt",
    language: "pt-BR",
    file: "pt-BR.ts",
    name: "Português 🇧🇷",
  },
] satisfies LocaleObject<string>[];

const requestedCodes = (process.env.APP_LOCALES || "bg,en")
  .split(",")
  .map((code) => code.trim())
  .filter(Boolean);

const unknownCodes = requestedCodes.filter(
  (code) => !availableLocales.some((locale) => locale.code === code),
);

if (unknownCodes.length) {
  throw new Error(`Unknown APP_LOCALES: ${unknownCodes.join(", ")}`);
}

if (!requestedCodes.includes("bg")) {
  throw new Error('APP_LOCALES must include the default locale "bg"');
}

export const appLocales = availableLocales.filter((locale) =>
  requestedCodes.includes(locale.code),
);
